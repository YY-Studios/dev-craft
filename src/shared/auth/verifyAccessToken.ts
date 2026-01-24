import jwt from 'jsonwebtoken';
export function verifyAccessToken(token: string): { user_id: string } {
  return jwt.verify(token, process.env.JWT_SECRET!) as { user_id: string };
}
