'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '@/../public/animations/loading.json';

export const LoadingAnimation = () => {
  return (
    <div className="w-64 h-64">
      <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
    </div>
  );
};
