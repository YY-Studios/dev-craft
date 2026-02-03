'use client';

import { useState } from 'react';
import { useOrganizations } from '../hooks/useOrganizations';
import Pagination from '@/shared/ui/Pagination';
interface OrganizationSelectProps {
  setSelectedOrg: (org: { type: 'org' | 'user'; login: string }) => void;
}
export const OrganizationSelect = ({ setSelectedOrg }: OrganizationSelectProps) => {
  const [page, setPage] = useState(1);
  const { data: orgs, refetch, isLoading, isFetched } = useOrganizations(page);

  if (!orgs) return null;
  return (
    <>
      {isLoading && <p>데이터 불러오는 중...</p>}
      <ul className="flex flex-col gap-4">
        {isFetched &&
          orgs.data.map((org) => (
            <li key={org.login} className="flex gap-2 items-center">
              <input
                type="radio"
                id={org.login}
                name="organization"
                value={org.login}
                className="w-4 h-4 accent-gray-900 cursor-pointer"
                onChange={() => {
                  setSelectedOrg({ type: org.type, login: org.login });
                }}
              />
              <label
                htmlFor={org.login}
                className="flex items-center gap-1 font-bold text-lg cursor-pointer"
              >
                <img src={org.avatar_url} alt="" className="w-6 h-6 rounded-full" /> {org.login}
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
