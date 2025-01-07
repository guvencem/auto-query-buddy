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
  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense yüklenirken hata:', err);
    }
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div 
        className={`
          w-[728px] h-[90px]
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
          style={{ display: "inline-block", width: "728px", height: "90px" }}
          data-ad-client="ca-pub-1468951974661165"
          data-ad-slot="5313941435"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
};