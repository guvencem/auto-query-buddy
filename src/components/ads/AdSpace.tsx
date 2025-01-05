import React from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSpaceProps {
  position: "top" | "bottom";
}

export const AdSpace = ({ position }: AdSpaceProps) => {
  const adUnitId = "BURAYA-ADSENSE-AD-UNIT-ID-YAZIN"; // AdSense reklam birimi ID'nizi buraya yazın

  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense yüklenirken hata:', err);
    }
  }, []);

  return (
    <div 
      className={`
        w-full min-h-[100px] 
        ${position === "bottom" ? "mt-8" : "mb-8"}
        bg-white/50 backdrop-blur-sm
        border-2 border-primary/20
        rounded-xl
        flex items-center justify-center
        transition-all duration-300
        hover:shadow-lg
        relative
        overflow-hidden
      `}
    >
      <ins
        className="adsbygoogle absolute inset-0"
        style={{ display: "block" }}
        data-ad-client={adUnitId}
        data-ad-slot="BURAYA-ADSENSE-AD-SLOT-YAZIN"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};