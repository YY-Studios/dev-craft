import { serverApi } from '@/shared/api/server/serverApi';

export async function GET() {
  const data = await serverApi('/test?select=*');
  return Response.json(data);
}
