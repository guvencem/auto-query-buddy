import { X } from "lucide-react";
import React, { useEffect } from "react";

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

  const adUnitId = "ca-pub-1468951974661165"; // AdSense publisher ID'niz

  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense yüklenirken hata:', err);
    }
  }, []);

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center animate-fadeIn">
      <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-[90vw] sm:w-[500px] border-2 border-primary">
        {canClose ? (
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-secondary/80 transition-colors shadow-lg border border-primary"
          >
            <X className="w-4 h-4 text-primary" />
          </button>
        ) : (
          <div className="absolute -top-2 -right-2 bg-white rounded-full p-2 shadow-lg border border-primary min-w-[32px] min-h-[32px] flex items-center justify-center">
            <span className="text-primary text-sm font-bold">{remainingTime}</span>
          </div>
        )}
        
        <div className="min-h-[300px] bg-secondary/20 rounded-xl flex items-center justify-center overflow-hidden">
          <ins
            className="adsbygoogle absolute inset-0"
            style={{ display: "block" }}
            data-ad-client={adUnitId}
            data-ad-slot="0987654321" // AdSense'den aldığınız reklam slot ID'sini buraya yazın
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>

        {!canClose && remainingTime !== undefined && (
          <div className="mt-4 text-center">
            <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
              Reklamı kapatmak için {remainingTime} saniye bekleyin
            </span>
          </div>
        )}
      </div>
    </div>
  );
};