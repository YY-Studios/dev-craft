'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    kakaoAdfit?: unknown;
  }
}

export const AdFitBanner = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="flex justify-center">
      <ins
        className="kakao_ad_area"
        style={{ display: 'none' }}
        data-ad-unit="DAN-uzlRejHV4SbHD0aM"
        data-ad-width="728"
        data-ad-height="90"
      />
    </div>
  );
};
