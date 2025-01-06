import React, { useEffect } from 'react';

export const AdcashAd = () => {
  useEffect(() => {
    // Adcash reklamının yüklenmesi için gerekli tetikleme
    try {
      if (window.aclib) {
        window.aclib.runAutoTag({
          zoneId: 'gladtxs2bj',
        });
      }
    } catch (error) {
      console.error('Adcash reklam yüklenirken hata:', error);
    }
  }, []);

  return (
    <div 
      className="w-full min-h-[100px] 
        bg-white/50 backdrop-blur-sm
        border-2 border-primary/20
        rounded-xl
        flex items-center justify-center
        transition-all duration-300
        hover:shadow-lg
        relative
        overflow-hidden
        my-4"
      id="adcash-ad-container"
    />
  );
};