import { PrismaClient } from '@prisma/client';
import { SocialDuplicateError, SocialForbiddenError, SocialInvalidTransitionError, SocialNotFoundError, SocialValidationError } from './social-errors';
import type { ConnectionCategory, ConnectionListsResponse, DiscoveryConnectionStatus, SafeConnectionItem } from './types';

function ensureStudent(role: string) { if (role !== 'STUDENT') throw new SocialForbiddenError(); }
const activeStates = ['PENDING', 'ACCEPTED', 'BLOCKED'];
const pairKey = (a: string, b: string) => [a, b].sort().join('__');

async function requireMyProfile(prisma: PrismaClient, userId: string) {
  const p = await prisma.socialProfile.findUnique({ where: { userId } });
  if (!p) throw new SocialNotFoundError('Social profile not found');
  return p;
}

function getCategory(connection: { state: string; requesterProfileId: string; receiverProfileId: string }, myProfileId: string): ConnectionCategory {
  if (connection.state === 'PENDING' && connection.receiverProfileId === myProfileId) return 'incomingPending';
  if (connection.state === 'PENDING' && connection.requesterProfileId === myProfileId) return 'outgoingPending';
  if (connection.state === 'ACCEPTED') return 'accepted';
  if (['BLOCKED', 'REJECTED', 'CANCELLED'].includes(connection.state)) return 'unavailable';
  return 'unavailable';
}

function toSafeConnectionItem(connection: any, myProfileId: string): SafeConnectionItem {
  const other = connection.requesterProfileId === myProfileId ? connection.receiverProfile : connection.requesterProfile;
  const category = getCategory(connection, myProfileId);
  return {
    connectionId: connection.id,
    state: connection.state,
    category,
    otherProfile: {
      id: other.id,
      displayName: other.displayName,
      hostCity: other.hostCity,
      hostCountry: other.hostCountry,
      studyArea: other.studyArea,
    },
    allowedActions: {
      accept: category === 'incomingPending',
      reject: category === 'incomingPending',
      cancel: category === 'outgoingPending',
      message: category === 'accepted',
      block: category === 'accepted' || category === 'incomingPending',
    },
  };
}

export async function requestConnection(prisma: PrismaClient, actor: {role: string; userId: string}, targetProfileId: string) {
  ensureStudent(actor.role);
  const me = await requireMyProfile(prisma, actor.userId);
  if (me.id === targetProfileId) throw new SocialValidationError('You cannot request yourself');
  const target = await prisma.socialProfile.findUnique({ where: { id: targetProfileId } });
  if (!target || target.visibility !== 'VISIBLE' || target.moderationState !== 'ACTIVE') throw new SocialValidationError('Target profile is unavailable');
  const existing = await prisma.socialConnection.findUnique({ where: { pairKey: pairKey(me.id, target.id) } });
  if (existing && activeStates.includes(existing.state)) throw new SocialDuplicateError('Connection already exists for this pair');
  if (existing) {
    return prisma.socialConnection.update({ where: { id: existing.id }, data: { requesterProfileId: me.id, receiverProfileId: target.id, state: 'PENDING', requestedAt: new Date(), respondedAt: null, blockedAt: null, lastActionByProfileId: me.id } });
  }
  return prisma.socialConnection.create({ data: { id: `conn-${Date.now()}-${Math.random().toString(36).slice(2,8)}`, pairKey: pairKey(me.id, target.id), requesterProfileId: me.id, receiverProfileId: target.id, state: 'PENDING', requestedAt: new Date(), lastActionByProfileId: me.id } });
}

export async function transitionConnection(prisma: PrismaClient, actor: {role:string; userId:string}, connectionId: string, action: string) {
  ensureStudent(actor.role);
  const me = await requireMyProfile(prisma, actor.userId);
  const c = await prisma.socialConnection.findUnique({ where: { id: connectionId } });
  if (!c) throw new SocialNotFoundError('Connection not found');
  const involved = c.requesterProfileId === me.id || c.receiverProfileId === me.id;
  if (!involved) throw new SocialForbiddenError();
  if (action === 'accept') { if (c.state !== 'PENDING' || c.receiverProfileId !== me.id) throw new SocialInvalidTransitionError(); return prisma.socialConnection.update({ where: { id: connectionId }, data: { state: 'ACCEPTED', respondedAt: new Date(), lastActionByProfileId: me.id } }); }
  if (action === 'reject') { if (c.state !== 'PENDING' || c.receiverProfileId !== me.id) throw new SocialInvalidTransitionError(); return prisma.socialConnection.update({ where: { id: connectionId }, data: { state: 'REJECTED', respondedAt: new Date(), lastActionByProfileId: me.id } }); }
  if (action === 'cancel') { if (c.state !== 'PENDING' || c.requesterProfileId !== me.id) throw new SocialInvalidTransitionError(); return prisma.socialConnection.update({ where: { id: connectionId }, data: { state: 'CANCELLED', respondedAt: new Date(), lastActionByProfileId: me.id } }); }
  if (action === 'block') { return prisma.socialConnection.update({ where: { id: connectionId }, data: { state: 'BLOCKED', blockedAt: new Date(), lastActionByProfileId: me.id } }); }
  throw new SocialValidationError('Unknown action');
}

export async function getMyConnections(prisma: PrismaClient, actor: {role:string; userId:string}): Promise<ConnectionListsResponse> {
  ensureStudent(actor.role);
  const me = await requireMyProfile(prisma, actor.userId);
  const all = await prisma.socialConnection.findMany({ where: { OR: [{ requesterProfileId: me.id }, { receiverProfileId: me.id }] }, include: { requesterProfile: true, receiverProfile: true }, orderBy: { updatedAt: 'desc' } });
  const safe = all.map((connection) => toSafeConnectionItem(connection, me.id));
  return {
    incomingPending: safe.filter((item) => item.category === 'incomingPending'),
    outgoingPending: safe.filter((item) => item.category === 'outgoingPending'),
    accepted: safe.filter((item) => item.category === 'accepted'),
    unavailable: safe.filter((item) => item.category === 'unavailable'),
  };
}

export async function getConnectionStateForProfile(prisma: PrismaClient, actor: {role:string; userId:string}, profileId: string): Promise<DiscoveryConnectionStatus> {
  ensureStudent(actor.role);
  const me = await requireMyProfile(prisma, actor.userId);
  if (me.id === profileId) return 'UNAVAILABLE';
  const found = await prisma.socialConnection.findUnique({ where: { pairKey: pairKey(me.id, profileId) } });
  if (!found) return 'NOT_CONNECTED';
  if (found.state === 'BLOCKED') return 'BLOCKED';
  if (found.state === 'ACCEPTED') return 'CONNECTED';
  if (found.state === 'PENDING' && found.requesterProfileId === me.id) return 'REQUEST_SENT';
  if (found.state === 'PENDING' && found.receiverProfileId === me.id) return 'REQUEST_RECEIVED';
  return 'NOT_CONNECTED';
}
