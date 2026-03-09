'use client';

import IconLikeActive from '@/shared/assets/icons/icon_like_active.svg';

import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  Cell,
} from 'recharts';
import { useTechStack } from './hooks/useTechStack';
import { useWeeklyActivity } from './hooks/useWeeklyActivity';
import { useTopLiked } from './hooks/useTopliked';
import Link from 'next/link';

export default function DashboardOverview() {
  const { data: techStack = [] } = useTechStack();
  const { data: weeklyActivity = [] } = useWeeklyActivity();
  const { data: topLiked = [] } = useTopLiked();

  return (
    <div className="border border-zinc-100 rounded-lg bg-zinc-50 overflow-hidden mb-4 shadow-lg ">
      {/* 헤더 */}
      <div className="px-5 py-3.5 border-b border-zinc-200 bg-white flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold text-zinc-800">활동 요약</p>
          <p className="text-xs text-zinc-400 mt-0.5">포스팅 · 기술 스택 · 인기 글</p>
        </div>
      </div>

      {/* 바디 */}
      <div className="grid grid-cols-1 divide-y divide-zinc-100 md:grid-cols-[1fr_1px_1fr] md:divide-y-0">
        {/* 기술 스택 */}
        <div className="p-4">
          <p className="text-xs text-zinc-400 mb-1">기술 스택</p>
          <ResponsiveContainer width="100%" height={180}>
            <RadarChart data={techStack}>
              <PolarGrid stroke="#e4e4e7" />
              <PolarAngleAxis dataKey="subject" tick={{ fontSize: 10, fill: '#a1a1aa' }} />
              <Radar
                dataKey="value"
                stroke="#08bcd8"
                fill="#08bcd8"
                fillOpacity={0.12}
                strokeWidth={1.5}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* 구분선 */}
        <div className="hidden md:block bg-zinc-200" />

        {/* 오른쪽: 7일 활동 + TOP3 */}
        <div className="flex flex-col divide-y divide-zinc-200">
          {/* 7일 활동 */}
          <div className="p-4">
            <p className="text-xs text-zinc-400 mb-1">이번 주 활동</p>
            <ResponsiveContainer width="100%" height={90}>
              <BarChart data={weeklyActivity} barSize={14}>
                <XAxis
                  dataKey="day"
                  tick={{ fontSize: 10, fill: '#a1a1aa' }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    fontSize: 11,
                    borderRadius: 6,
                    border: '1px solid #e4e4e7',
                    padding: '4px 8px',
                    boxShadow: 'none',
                  }}
                  cursor={{ fill: '#f4f4f5' }}
                />
                <Bar dataKey="count" radius={[3, 3, 0, 0]}>
                  {weeklyActivity.map((entry, i) => (
                    <Cell key={i} fill={entry.count > 0 ? '#8b5cf6' : '#e4e4e7'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TOP 3 */}
          <div className="p-4">
            <p className="text-xs text-zinc-400 mb-2">좋아요 TOP 3</p>
            <div className="flex flex-col gap-2.5">
              {topLiked.map((post, i) => (
                <div key={i} className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <Link
                      href={`/${post.users.username}/posts/${post.id}`}
                      className="flex items-center gap-2 min-w-0 hover:opacity-70"
                    >
                      <span className="text-xs font-bold text-zinc-400 w-4 shrink-0">{i + 1}</span>
                      <span className="text-xs text-zinc-600 truncate">{post.title}</span>
                    </Link>
                  </div>
                  <span className="text-xs text-primary shrink-0 flex items-center gap-0.5">
                    <img src={IconLikeActive.src} alt="좋아요" className="w-3 h-3" />
                    <span className="w-3 text-right">{post.likes_count}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
