'use client';

import Script from 'next/script';

export const AdFitBanner = () => {
  return (
    <>
      <Script src="//t1.daumcdn.net/kas/static/ba.min.js" strategy="afterInteractive" />

      <div className="flex justify-center">
        <div className="h-[90px] w-full max-w-[728px] rounded-md bg-zinc-100">
          <ins
            className="kakao_ad_area block h-full w-full"
            style={{ display: 'block' }}
            data-ad-unit="DAN-uzlRejHV4SbHD0aM"
            data-ad-width="728"
            data-ad-height="90"
          />
        </div>
      </div>
    </>
  );
};
