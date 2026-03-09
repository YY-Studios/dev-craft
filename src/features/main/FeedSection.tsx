'use client';
import { easeInOut, motion } from 'framer-motion';
import { FeedCard } from '../feed/FeedCard';
import { useFeedPosts } from '@/features/feed/hooks/useFeedPosts';
export default function FeedSection() {
  const { data } = useFeedPosts();
  const posts = data?.pages.flat() ?? [];
  return (
    <section className="py-15 md:py-32 px-6 overflow-hidden">
      <div className="max-w-6xl mx-auto ">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: easeInOut }}
        >
          <h2 className="text-3xl md:text-4xl leading-[1.2] text-center font-bold text-gray-900">
            함께 성장하는 개발자들의
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-primary bg-clip-text text-transparent">
              인사이트 피드
            </span>
          </h2>
          <p className="mt-4 md:mt-5 text-base md:text-lg text-center text-gray-700 break-keep">
            실전 경험을 공유하고, 함께 배우며 성장하는 개발자 커뮤니티
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 1, ease: easeInOut }}
          className="grid grid-cols-1 md:grid-cols-[repeat(auto-fit,minmax(360px,1fr))] gap-4 mt-10"
        >
          {posts.slice(0, 6).map((post) => (
            <FeedCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
