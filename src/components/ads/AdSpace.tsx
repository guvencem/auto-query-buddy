import React from "react";

// Add type definition for window.adsbygoogle
declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface AdSpaceProps {
  position: "top" | "bottom";
}

export const AdSpace = ({ position }: AdSpaceProps) => {
  // Google AdSense reklam birimi ID'si - kendi AdSense kodunuzla değiştirin
  const adUnitId = "ca-pub-XXXXXXXXXXXXXXXX";

  // AdSense kodunu yükle
  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense yüklenirken hata:', err);
    }
  }, []);

  return (
    <div className={`w-full min-h-[100px] ${position === "bottom" ? "mt-4" : "mb-4"}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adUnitId}
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
};