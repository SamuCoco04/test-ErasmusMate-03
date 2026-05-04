import { PrismaClient } from '@prisma/client';
import { SocialForbiddenError, SocialNotFoundError, SocialValidationError } from './social-errors';

interface ActorContext { role: string; userId: string }
interface SendMessagePayload { body: string }

interface SafeProfile {
  id: string;
  displayName: string;
  hostCity: string | null;
  hostCountry: string | null;
  studyArea: string | null;
}

export interface MessageThreadDTO {
  connectionId: string;
  otherProfile: SafeProfile;
  latestMessage: { id: string; body: string; createdAt: Date; senderProfileId: string } | null;
}

export interface SocialMessageDTO {
  id: string;
  connectionId: string;
  senderProfileId: string;
  recipientProfileId: string;
  body: string;
  createdAt: Date;
  readAt: Date | null;
}

function ensureStudent(role: string): void { if (role !== 'STUDENT') throw new SocialForbiddenError(); }

async function requireMyProfile(prisma: PrismaClient, userId: string) {
  const profile = await prisma.socialProfile.findUnique({ where: { userId } });
  if (!profile) throw new SocialNotFoundError('Social profile not found');
  return profile;
}

async function requireParticipantAcceptedConnection(prisma: PrismaClient, myProfileId: string, connectionId: string) {
  const connection = await prisma.socialConnection.findUnique({
    where: { id: connectionId },
    include: { requesterProfile: true, receiverProfile: true },
  });
  if (!connection) throw new SocialNotFoundError('Connection not found');
  const isParticipant = connection.requesterProfileId === myProfileId || connection.receiverProfileId === myProfileId;
  if (!isParticipant) throw new SocialForbiddenError();
  if (connection.state !== 'ACCEPTED') throw new SocialForbiddenError();
  return connection;
}

function toMessageDTO(message: { id: string; connectionId: string; senderProfileId: string; recipientProfileId: string; body: string; createdAt: Date; readAt: Date | null }): SocialMessageDTO {
  return { ...message };
}

export async function listMessageThreads(prisma: PrismaClient, actor: ActorContext): Promise<MessageThreadDTO[]> {
  ensureStudent(actor.role);
  const me = await requireMyProfile(prisma, actor.userId);
  const accepted = await prisma.socialConnection.findMany({
    where: {
      state: 'ACCEPTED',
      OR: [{ requesterProfileId: me.id }, { receiverProfileId: me.id }],
    },
    include: { requesterProfile: true, receiverProfile: true },
    orderBy: { updatedAt: 'desc' },
  });

  const threadIds = accepted.map((connection) => connection.id);
  const latestByConnection = new Map<string, { id: string; body: string; createdAt: Date; senderProfileId: string }>();
  if (threadIds.length > 0) {
    const allMessages = await prisma.socialMessage.findMany({
      where: { connectionId: { in: threadIds } },
      orderBy: [{ createdAt: 'desc' }],
    });
    for (const message of allMessages) {
      if (!latestByConnection.has(message.connectionId)) {
        latestByConnection.set(message.connectionId, {
          id: message.id,
          body: message.body,
          createdAt: message.createdAt,
          senderProfileId: message.senderProfileId,
        });
      }
    }
  }

  return accepted.map((connection) => {
    const other = connection.requesterProfileId === me.id ? connection.receiverProfile : connection.requesterProfile;
    return {
      connectionId: connection.id,
      otherProfile: {
        id: other.id,
        displayName: other.displayName,
        hostCity: other.hostCity,
        hostCountry: other.hostCountry,
        studyArea: other.studyArea,
      },
      latestMessage: latestByConnection.get(connection.id) ?? null,
    };
  });
}

export async function getMessagesForConnection(prisma: PrismaClient, actor: ActorContext, connectionId: string): Promise<SocialMessageDTO[]> {
  ensureStudent(actor.role);
  const me = await requireMyProfile(prisma, actor.userId);
  await requireParticipantAcceptedConnection(prisma, me.id, connectionId);
  const messages = await prisma.socialMessage.findMany({ where: { connectionId }, orderBy: { createdAt: 'asc' } });
  return messages.map(toMessageDTO);
}

export async function sendMessage(prisma: PrismaClient, actor: ActorContext, connectionId: string, payload: SendMessagePayload): Promise<SocialMessageDTO> {
  ensureStudent(actor.role);
  const me = await requireMyProfile(prisma, actor.userId);
  const connection = await requireParticipantAcceptedConnection(prisma, me.id, connectionId);

  if (connection.requesterProfile.visibility !== 'VISIBLE' || connection.receiverProfile.visibility !== 'VISIBLE' || connection.requesterProfile.moderationState !== 'ACTIVE' || connection.receiverProfile.moderationState !== 'ACTIVE') {
    throw new SocialForbiddenError('Messaging is unavailable for this connection');
  }

  const trimmed = payload.body.trim();
  if (!trimmed) throw new SocialValidationError('Message body is required');
  if (trimmed.length > 1000) throw new SocialValidationError('Message is too long');

  const recipientProfileId = connection.requesterProfileId === me.id ? connection.receiverProfileId : connection.requesterProfileId;
  const created = await prisma.socialMessage.create({
    data: {
      id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      connectionId,
      senderProfileId: me.id,
      recipientProfileId,
      body: trimmed,
    },
  });
  return toMessageDTO(created);
}
