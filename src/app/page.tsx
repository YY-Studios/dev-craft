import HeroSection from '@/features/main/HeroSection';
import FeatureSection from '@/features/main/FeatureSection';
import FeedSection from '@/features/main/FeedSection';
import { Suspense } from 'react';

export default function Main() {
  return (
    <>
      <HeroSection />

      <FeatureSection />

      <Suspense>
        <FeedSection />
      </Suspense>
    </>
  );
}
