import { cookies } from 'next/headers';

import { DEMO_ROLE_VALUES, DEMO_USER_IDS } from './demo-identity';

export const DEMO_CONTEXT_COOKIE_NAME = 'erasmusmate_demo_context';

type DemoRole = (typeof DEMO_ROLE_VALUES)[number];

export type DemoContext = {
  role: DemoRole;
  userId: string;
};

const DEFAULT_DEMO_CONTEXT: DemoContext = {
  role: 'STUDENT',
  userId: DEMO_USER_IDS.STUDENT,
};

const roleToUserId: Record<DemoRole, string> = {
  STUDENT: DEMO_USER_IDS.STUDENT,
  COORDINATOR: DEMO_USER_IDS.COORDINATOR,
  ADMIN: DEMO_USER_IDS.ADMIN,
};

export function isDemoRole(value: unknown): value is DemoRole {
  return typeof value === 'string' && DEMO_ROLE_VALUES.includes(value as DemoRole);
}

export function normalizeDemoContext(input: Partial<DemoContext> | null | undefined): DemoContext {
  if (!input || !isDemoRole(input.role)) return DEFAULT_DEMO_CONTEXT;
  const expectedUserId = roleToUserId[input.role];
  if (input.userId !== expectedUserId) {
    return { role: input.role, userId: expectedUserId };
  }
  return { role: input.role, userId: input.userId };
}

export function parseDemoContextCookie(rawCookie: string | undefined): DemoContext {
  if (!rawCookie) return DEFAULT_DEMO_CONTEXT;
  try {
    const parsed = JSON.parse(rawCookie) as Partial<DemoContext>;
    return normalizeDemoContext(parsed);
  } catch {
    return DEFAULT_DEMO_CONTEXT;
  }
}

export async function getDemoContextFromRequest(): Promise<DemoContext> {
  const cookieStore = await cookies();
  const rawCookie = cookieStore.get(DEMO_CONTEXT_COOKIE_NAME)?.value;
  return parseDemoContextCookie(rawCookie);
}

export function serializeDemoContext(context: DemoContext): string {
  return JSON.stringify(context);
}

export function resolveRoleLabel(role: DemoRole): string {
  if (role === 'STUDENT') return 'Student';
  if (role === 'COORDINATOR') return 'Coordinator';
  return 'Admin';
}
