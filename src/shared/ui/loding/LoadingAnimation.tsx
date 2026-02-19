'use client';

import Lottie from 'lottie-react';
import loadingAnimation from '@/../public/animations/loading.json';

export const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center border-1 border-gray-300 rounded-md p-4">
      <div className="w-64 h-64">
        <Lottie animationData={loadingAnimation} loop={true} autoplay={true} />
      </div>
    </div>
  );
};
