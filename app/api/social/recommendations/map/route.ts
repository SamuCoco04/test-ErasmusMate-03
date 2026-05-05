import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { getRecommendationMapItems } from '@/src/modules/social/recommendations';
import { SocialForbiddenError, SocialNotFoundError } from '@/src/modules/social/social-errors';

export async function GET(request: Request) {
  try {
    const actor = await getDemoContextFromRequest();
    const items = await getRecommendationMapItems(prisma, actor, new URL(request.url).searchParams);
    return NextResponse.json({ items });
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialNotFoundError) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
