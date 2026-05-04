import { NextResponse } from 'next/server';

import {
  DEMO_CONTEXT_COOKIE_NAME,
  getDemoContextFromRequest,
  normalizeDemoContext,
  serializeDemoContext,
} from '@/src/modules/shared/demo-context';

function setDemoCookie(response: NextResponse, context: { role: 'STUDENT' | 'COORDINATOR' | 'ADMIN'; userId: string }) {
  response.cookies.set(DEMO_CONTEXT_COOKIE_NAME, serializeDemoContext(context), {
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function GET() {
  const context = await getDemoContextFromRequest();
  return NextResponse.json({
    demoOnly: true,
    context,
    message: 'Demo mode only. This is not production authentication.',
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as { role?: string; userId?: string } | null;
  const context = normalizeDemoContext(body);
  const response = NextResponse.json({
    demoOnly: true,
    context,
    message: 'Demo mode context updated. This is not production authentication.',
  });
  setDemoCookie(response, context);
  return response;
}

export const PATCH = POST;
