import { X } from "lucide-react";
import React from "react";

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface FloatingAdProps {
  show: boolean;
  onClose: () => void;
  canClose: boolean;
  remainingTime?: number;
}

export const FloatingAd = ({ show, onClose, canClose, remainingTime }: FloatingAdProps) => {
  if (!show) return null;

  const adUnitId = "ca-pub-XXXXXXXXXXXXXXXX";

  React.useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense yüklenirken hata:', err);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="relative bg-secondary/50 backdrop-blur-sm rounded-2xl shadow-2xl p-4 w-[90vw] sm:w-[500px] animate-fadeIn border-2 border-primary/20">
        {canClose && (
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-secondary/80 transition-colors shadow-lg border border-primary/20"
          >
            <X className="w-4 h-4 text-foreground/60" />
          </button>
        )}
        
        <div className="min-h-[300px]">
          <ins
            className="adsbygoogle"
            style={{ display: "block" }}
            data-ad-client={adUnitId}
            data-ad-slot="XXXXXXXXXX"
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {!canClose && remainingTime !== undefined && (
          <p className="text-sm text-foreground/60 mt-3 text-center bg-white/60 backdrop-blur-sm py-2 px-3 rounded-lg">
            Reklamı {remainingTime} saniye sonra kapatabilirsiniz
          </p>
        )}
      </div>
    </div>
  );
};