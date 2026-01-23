import { z } from 'zod';

export const TestSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  user: z.string().nullable(),
  boyfriend: z.string().nullable(),
});

// 런타임 검증용 (실제 코드로 실행됨)
export const TestListSchema = z.array(TestSchema);

// 타입 정의용 (컴파일 후 사라짐)
export type Test = z.infer<typeof TestSchema>;
