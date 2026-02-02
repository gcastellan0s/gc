import type { H3Event } from 'h3';

export interface DecodedToken {
  sub: string;
  email: string;
  'cognito:groups'?: string[];
}

export async function verifyToken(
  event: H3Event,
): Promise<DecodedToken | null> {
  const authHeader = getHeader(event, 'authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    return null;
  }

  const _token = authHeader.slice(7);

  // TODO: Implement Cognito JWT verification using aws-jwt-verify
  console.log('[auth] verifyToken called');
  return null;
}

export async function requireAuth(event: H3Event): Promise<DecodedToken> {
  const decoded = await verifyToken(event);
  if (!decoded) {
    throw createError({
      statusCode: 401,
      statusMessage: 'Unauthorized',
    });
  }
  return decoded;
}
