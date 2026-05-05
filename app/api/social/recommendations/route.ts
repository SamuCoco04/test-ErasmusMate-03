import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { SocialForbiddenError, SocialNotFoundError, SocialValidationError } from '@/src/modules/social/social-errors';
import { createRecommendation, listRecommendations } from '@/src/modules/social/recommendations';

export async function GET(request: Request) {
  try {
    const actor = await getDemoContextFromRequest();
    const items = await listRecommendations(prisma, actor, new URL(request.url).searchParams);
    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const actor = await getDemoContextFromRequest();
    const body = await request.json().catch(() => ({}));
    const item = await createRecommendation(prisma, actor, body);
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: error.message }, { status: 404 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
