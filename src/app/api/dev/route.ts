import { serverApi } from '@/shared/api/server/serverApi';
import { Test, TestListSchema } from '@/shared/schemas/test';

export async function GET() {
  const data = await serverApi<Test[]>('/test?select=*', {
    schema: TestListSchema,
  });

  return Response.json(data);
}
