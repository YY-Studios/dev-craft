'use client';

import { useState } from 'react';
import { useOrganizations } from '../hooks/useOrganizations';
import Pagination from '@/shared/ui/Pagination';
import { OrgListSkeleton } from '@/shared/ui/loding/OrgListSkeleton';
import NoData from '@/shared/ui/NoData';
interface OrganizationSelectProps {
  setSelectedOrg: (org: { type: 'org' | 'user'; login: string }) => void;
}
export const OrganizationSelect = ({ setSelectedOrg }: OrganizationSelectProps) => {
  const [page, setPage] = useState(1);
  const { data: orgs, refetch, isLoading, isFetched } = useOrganizations(page);

  if (isLoading) {
    return <OrgListSkeleton count={5} />;
  }

  if (!orgs)
    return (
      <NoData message="데이터를 불러올 수 없습니다" description="로그인 상태를 확인해주세요" />
    );

  return (
    <>
      <ul className="grid grid-cols-1 gap-3">
        {isFetched &&
          orgs.data.map((org) => (
            <li key={org.login} className="relative">
              {/* 실제 라디오 버튼은 숨기고 peer 클래스로 상태만 전달 */}
              <input
                type="radio"
                id={org.login}
                name="organization"
                value={org.login}
                className="peer hidden"
                onChange={() => {
                  setSelectedOrg({ type: org.type, login: org.login });
                }}
              />

              {/* 라디오 버튼의 상태에 따라 스타일이 변하는 카드 레이아웃 */}
              <label
                htmlFor={org.login}
                className="flex items-center gap-4 p-4 rounded-xl border border-gray-300 bg-white cursor-pointer
                       hover:border-gray-600 hover:bg-gray-50
                       peer-checked:border-gray-600 peer-checked:bg-gray-600/5 peer-checked:ring-1 peer-checked:ring-gray-600/20"
              >
                {/* 조직/사용자 아바타 */}
                <div>
                  <img
                    src={org.avatar_url}
                    alt={org.login}
                    className="w-10 h-10 rounded-full bg-gray-100 object-cover border border-gray-50"
                    aria-hidden="true"
                  />
                </div>

                <div className="flex flex-col items-start">
                  <span className="font-semibold text-gray-800 peer-checked:text-primary">
                    {org.login}
                  </span>
                  <span className="text-xs text-gray-400 capitalize">{org.type}</span>
                </div>
              </label>
            </li>
          ))}
      </ul>

      <div className="flex justify-center mt-5">
        <Pagination currentPage={page} totalPages={orgs?.totalPages || 1} onPageChange={setPage} />
      </div>
    </>
  );
};
