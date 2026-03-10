'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

const sections = [
  {
    id: 0,
    title: 'PR URL 하나로, 문서가 완성됩니다',
    sub: '문서 종류, 말투, 독자 타겟까지 — 필터 하나로 원하는 스타일의 글이 나옵니다',
    checks: ['GitHub PR 링크 입력만으로 문서 생성', '블로그, README 등 문서 종류 선택'],
    images: ['/section_create_document1.png', '/section_create_document2.png'],
  },
  {
    id: 1,
    title: '내 코드가 어디까지 영향을 주는지, 한눈에',
    sub: '변경 파일 수, 영향 파일 수, 주의 항목까지 자동 분석',
    checks: ['파일 간 의존성 그래프 시각화', '주의가 필요한 변경 자동 감지'],
    images: ['/section_pr_impact.png'],
  },
  {
    id: 2,
    title: '나만의 개발 기록이 쌓이는 공방',
    sub: '생성한 문서는 피드에 공유하고, 다른 개발자의 글도 구경하세요',
    checks: ['기술 스택·활동 현황 대시보드', '커뮤니티 피드에서 인사이트 공유'],
    images: ['/section_my_workshop.png'],
  },
];

const totalSlots = sections.reduce((acc, s) => acc + s.images.length, 0);

type Slot = {
  title: string;
  sub: string;
  checks: string[];
  image: string;
  start: number;
  end: number;
  sectionIndex: number;
  isFirstInSection: boolean;
  index: number;
};

function buildSlots(): Slot[] {
  const slots: Slot[] = [];
  let slotIndex = 0;
  let sectionIdx = 0;

  for (const section of sections) {
    for (let i = 0; i < section.images.length; i++) {
      slots.push({
        title: section.title,
        sub: section.sub,
        checks: section.checks,
        image: section.images[i],
        start: (slotIndex + i) / totalSlots,
        end: (slotIndex + i + 1) / totalSlots,
        sectionIndex: sectionIdx,
        isFirstInSection: i === 0,
        index: slotIndex + i,
      });
    }
    slotIndex += section.images.length;
    sectionIdx++;
  }

  return slots;
}

const allSlots = buildSlots();

export default function ScrollLanding() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const [activeSlot, setActiveSlot] = useState(0);
  const [activeSection, setActiveSection] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const slotIdx = Math.min(Math.floor(v * totalSlots), totalSlots - 1);
    if (slotIdx !== activeSlot) setActiveSlot(slotIdx);

    const secIdx = allSlots[slotIdx]?.sectionIndex ?? 0;
    if (secIdx !== activeSection) setActiveSection(secIdx);
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: `${totalSlots * 100}vh` }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-5 w-full max-w-4xl px-6">
          {/* 이미지 영역 */}
          <div className="relative w-full h-[35vh] sm:h-[40vh] md:h-[45vh] lg:h-[50vh]">
            {allSlots.map((slot) => (
              <div
                key={slot.index}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out"
                style={{ opacity: slot.index === activeSlot ? 1 : 0 }}
              >
                <div className="relative w-full h-full rounded-xl shadow-xl border border-gray-200 overflow-hidden bg-white">
                  <Image
                    src={slot.image}
                    alt=""
                    fill
                    quality={100}
                    unoptimized
                    className="object-contain"
                    sizes="672px"
                    priority
                  />
                </div>
              </div>
            ))}
          </div>

          {/* 텍스트 영역 */}
          <div className="relative w-full h-36 md:h-40">
            {sections.map((section, i) => (
              <div
                key={i}
                className="absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-500 ease-in-out"
                style={{ opacity: i === activeSection ? 1 : 0 }}
              >
                <h2 className="text-2xl md:text-4xl leading-[1.2] font-bold text-gray-900">
                  {section.title}
                </h2>
                <p className="mt-2 md:mt-4 text-sm md:text-lg text-gray-700 leading-relaxed break-keep">
                  {section.sub}
                </p>
                <div className="flex gap-4 mt-3 md:mt-4">
                  {section.checks.map((check, j) => (
                    <span
                      key={j}
                      className="flex items-center gap-1.5 text-xs md:text-sm text-gray-600"
                    >
                      <span className="text-blue-600">✓</span>
                      {check}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Indicator activeSection={activeSection} />
      </div>
    </div>
  );
}

function Indicator({ activeSection }: { activeSection: number }) {
  return (
    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-10">
      {sections.map((_, i) => (
        <div
          key={i}
          className="w-1.5 h-1.5 rounded-full transition-all duration-300"
          style={{
            backgroundColor: i === activeSection ? '#2563eb' : '#cbd5e1',
            opacity: i === activeSection ? 1 : 0.5,
            transform: i === activeSection ? 'scale(1.5)' : 'scale(1)',
          }}
        />
      ))}
    </div>
  );
}
