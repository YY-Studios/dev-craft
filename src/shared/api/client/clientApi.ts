export async function clientApi(path: string) {
  const res = await fetch(`/api/${path}`, {
    credentials: 'include',
  });

  if (!res.ok) {
    const text = await res.text(); // JSON 가정 ❌
    throw new Error(text);
  }

  return res.json();
}
