n8n에서 `html` 문자열로 오니까 Next.js에서 이렇게 받아서 써:

## API Route (`/api/analyze`)

```typescript
// src/app/api/analyze/route.ts
export async function POST(req: Request) {
  const body = await req.json();

  const res = await fetch('YOUR_N8N_WEBHOOK_URL', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return Response.json(data);
}
```

## 컴포넌트에서 렌더링

```typescript
// src/features/pr-analysis/ui/DependencyGraph.tsx
'use client';

interface Props {
  html: string;
}

export function DependencyGraph({ html }: Props) {
  return (
    <iframe
      srcDoc={html}
      style={{ width: '100%', height: '600px', border: 'none' }}
      sandbox="allow-scripts"
    />
  );
}
```

## 사용

```typescript
const [graphHtml, setGraphHtml] = useState<string>('');

const handleAnalyze = async () => {
  const res = await fetch('/api/analyze', {
    method: 'POST',
    body: JSON.stringify({ owner, repo, number: prNumber })
  });
  const { html } = await res.json();
  setGraphHtml(html);
};

// 렌더링
{graphHtml && <DependencyGraph html={graphHtml} />}
```

`sandbox="allow-scripts"` 꼭 넣어야 ECharts 스크립트가 실행돼!
