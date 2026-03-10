import HeroSection from '@/features/main/HeroSection';
import FeedSection from '@/features/main/FeedSection';
import { Suspense } from 'react';
import ScrollLanding from '@/features/main/ScrollLanding';

export default function Main() {
  return (
    <>
      <HeroSection />
      <ScrollLanding />
      <Suspense>
        <FeedSection />
      </Suspense>
    </>
  );
}
