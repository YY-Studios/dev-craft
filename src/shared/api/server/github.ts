import { ApiError } from '../error/ApiError';

export async function getGithubUserByToken(token: string) {
  const res = await fetch('https://api.github.com/user', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new ApiError(res.status, 'GitHub 사용자 정보를 가져오는 데 실패했습니다.');
  }

  return res.json();
}
