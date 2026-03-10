'use client';
import { easeInOut, motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 lg:py-36 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 max-w-7xl mx-auto items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeInOut }}
          className="space-y-6 md:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 md:px-4 md:py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-100">
            <span className="font-semibold text-xs md:text-sm text-gray-700">
              AI 기반 PR 분석 자동화 솔루션
            </span>
          </div>

          <h2 className="text-3xl md:text-5xl lg:text-6xl leading-[1.2] font-bold text-gray-900">
            코드 리뷰와 문서화,
            <br />
            이제{' '}
            <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              공방에 맡기세요.
            </span>
          </h2>

          <p className="text-base md:text-lg lg:text-xl max-w-xl text-gray-600">
            AI가 당신의 Pull Request를 분석하고,
            <br />
            자동으로 깔끔한 문서를 생성합니다.
            <br />
            개발에만 집중하고, 나머지는 공방이 처리합니다.
          </p>

          <div className="pt-2 md:pt-4">
            <Link
              href="/create"
              className="text-sm md:text-base font-semibold inline-flex items-center justify-center gap-2 px-5 py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-primary text-white rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
            >
              PR 분석 시작하기
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="relative flex justify-center"
        >
          <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
            <div className="relative rounded-2xl shadow-2xl border overflow-hidden -rotate-3 hover:rotate-0 transition-transform duration-500">
              <Image
                src="/hero_2.png"
                alt="대시보드 이미지"
                width={800}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>

            <div className="absolute top-[20%] right-0 w-[85%]">
              <div className="rounded-2xl shadow-2xl border border-gray-200 overflow-hidden rotate-3 hover:rotate-0 transition-transform duration-500 bg-white">
                <Image
                  src="/hero_1.png"
                  alt="대시보드 이미지"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
