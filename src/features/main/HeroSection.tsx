'use client';
import { easeInOut, motion } from 'framer-motion';
import Link from 'next/link';
export default function HeroSection() {
  return (
    <section className="py-15 md:py-32 lg:py-40 px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-7xl mx-auto md:gap-16 lg:gap-5 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: easeInOut }}
          className="space-y-4 md:space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-2 py-1 lg:px-4 lg:py-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-full border border-blue-100">
            <span className="font-semibold text-xs md:text-sm text-gray-700">
              AI 기반 PR 분석 자동화 솔루션
            </span>
          </div>

          <h2 className="text-2xl md:text-5xl leading-[1.2] font-bold text-gray-900">
            코드 리뷰와 문서화,
            <br />
            이제{' '}
            <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              공방 에 맡기세요.
            </span>
          </h2>

          <p className="text-base md:text-xl max-w-120 text-gray-600">
            AI가 당신의 Pull Request를 분석하고,
            <br />
            자동으로 깔끔한 문서를 생성합니다.
            <br />
            개발에만 집중하고, 나머지는 공방이 처리합니다.
          </p>

          <div className="pt-2 md:pt-4">
            <Link
              href="/create"
              className="text-sm md:text-base font-semibold inline-flex items-center justify-center gap-2 p-3 md:px-6 md:py-3 md:px-8 md:py-4 bg-gradient-to-r from-blue-600 to-primary text-white rounded-xl transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
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
          className="relative flex items-center justify-center"
        >
          <div className="relative w-full max-w-[320px] sm:max-w-md lg:max-w-lg">
            <div className="relative z-10">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl shadow-2xl border border-gray-700 overflow-hidden transform -rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gray-800 px-4 py-3 flex items-center gap-2 border-b border-gray-700">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <span className="text-gray-400" style={{ fontSize: '12px' }}>
                      pull_request.py
                    </span>
                  </div>
                </div>

                <div
                  className="p-4 sm:p-6 space-y-2"
                  style={{ fontSize: '14px', fontFamily: 'monospace' }}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">1</span>
                    <span className="text-blue-400">def</span>
                    <span className="text-cyan-400">&nbsp;analyze_pr</span>
                    <span className="text-gray-300">(code):</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">2</span>
                    <span className="text-gray-300">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="text-green-400"># AI 분석 시작</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">3</span>
                    <span className="text-gray-300">&nbsp;&nbsp;&nbsp;&nbsp;result = </span>
                    <span className="text-sky-400">AI</span>
                    <span className="text-gray-300">.process()</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-gray-500">4</span>
                    <span className="text-gray-300">&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className="text-blue-400">return</span>
                    <span className="text-gray-300">&nbsp;result</span>
                  </div>
                  <div className="h-4"></div>
                  <div className="flex items-center gap-2 text-gray-400">
                    <span style={{ fontSize: '12px' }}>코드 분석 중...</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-12 -right-4 sm:-right-8 w-64 sm:w-80 z-20">
              <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="bg-gradient-to-r from-gray-50 to-white px-4 py-3 flex items-center gap-2 border-b border-gray-200">
                  <span className="text-gray-700" style={{ fontSize: '12px', fontWeight: '600' }}>
                    분석_결과.md
                  </span>
                  <div className="ml-auto">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  </div>
                </div>

                <div className="p-4 sm:p-6 space-y-3" style={{ fontSize: '13px' }}>
                  <h3 className="text-gray-900" style={{ fontSize: '16px', fontWeight: '700' }}>
                    # PR 분석 리포트
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p style={{ lineHeight: '1.6' }}>
                      <span className="text-blue-600 font-semibold">✓ 코드 품질:</span> 우수
                    </p>
                    <p style={{ lineHeight: '1.6' }}>
                      <span className="text-cyan-600 font-semibold">✓ 테스트 커버리지:</span> 95%
                    </p>
                    <p style={{ lineHeight: '1.6' }}>
                      <span className="text-green-600 font-semibold">✓ 보안 이슈:</span> 없음
                    </p>
                  </div>
                  <div className="pt-2 border-t border-gray-100">
                    <p className="text-gray-500" style={{ fontSize: '11px', lineHeight: '1.5' }}>
                      자동 생성된 문서 • 3분 전
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute top-20 left-10 w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <div
              className="absolute bottom-32 right-16 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute top-40 right-8 w-1.5 h-1.5 bg-sky-300 rounded-full animate-pulse"
              style={{ animationDelay: '0.5s' }}
            ></div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
