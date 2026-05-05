import { NextResponse } from 'next/server';
import { prisma } from '@/src/lib/prisma';
import { getDemoContextFromRequest } from '@/src/modules/shared/demo-context';
import { reportRecommendation } from '@/src/modules/social/recommendations';
import { SocialForbiddenError, SocialValidationError } from '@/src/modules/social/social-errors';

export async function POST(request: Request, { params }: { params: Promise<{ recommendationId: string }> }) {
  try {
    const actor = await getDemoContextFromRequest();
    const { recommendationId } = await params;
    const body = (await request.json().catch(() => ({}))) as { reason?: string; details?: string };
    if (!body.reason?.trim()) return NextResponse.json({ error: 'Reason is required' }, { status: 400 });
    const report = await reportRecommendation(prisma, actor, recommendationId, body.reason, body.details);
    return NextResponse.json(report, { status: 201 });
  } catch (error) {
    if (error instanceof SocialForbiddenError) return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    if (error instanceof SocialValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
