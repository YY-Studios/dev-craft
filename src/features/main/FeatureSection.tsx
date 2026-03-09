'use client';
import { easeInOut, motion } from 'framer-motion';
export default function FeatureSection() {
  return (
    <section className="py-15 md:py-32 px-6 bg-slate-50 overflow-hidden ">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: easeInOut, delay: 0.3 }}
          className="order-2 lg:order-1"
        >
          <video
            src="/video/video1.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: easeInOut }}
          className="order-1 lg:order-2"
        >
          <h2 className="text-3xl md:text-4xl leading-[1.2] font-bold text-gray-900">
            PR 링크 하나로 끝내는
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              마법 같은 문서화
            </span>
          </h2>
          <p className="mt-4 md:mt-5 text-base md:text-lg max-w-120 text-gray-700 leading-relaxed">
            길고 복잡한 커밋 내역들, 일일이 블로그 글로 정리하기 막막하셨죠? 분석하고 싶은 PR 주소만
            입력하세요. AI가 코드의 변경점과 기술적 의도를 정확히 파악해 README와 기술 블로그 초안을
            즉시 완성해 줍니다.
          </p>
          <ul className="space-y-2 md:space-y-1 mt-5 text-sm md:text-base text-gray-600">
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>GitHub PR 코드 영향도 분석
            </li>
            <li className="flex items-center gap-2">
              <span className="text-blue-600">✓</span>Markdown 자동 생성 및 최적화
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
