import jwt from 'jsonwebtoken';

export function createAccessToken(payload: { user_id: string }) {
  return jwt.sign(payload, process.env.JWT_SECRET!, {
    expiresIn: '7d',
  });
}
