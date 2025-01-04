import { X } from "lucide-react";

interface FloatingAdProps {
  show: boolean;
  onClose: () => void;
  canClose: boolean;
}

export const FloatingAd = ({ show, onClose, canClose }: FloatingAdProps) => {
  if (!show) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-secondary/50 backdrop-blur-sm rounded-2xl shadow-2xl p-4 w-[90vw] sm:w-[300px] animate-fadeIn border-2 border-primary/20">
      <div className="relative">
        {canClose && (
          <button
            onClick={onClose}
            className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-secondary/80 transition-colors shadow-lg border border-primary/20"
          >
            <X className="w-4 h-4 text-foreground/60" />
          </button>
        )}
        <div className="h-[200px] bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary/20">
          <p className="text-foreground/60 font-medium">Reklam İçeriği</p>
        </div>
        {!canClose && (
          <p className="text-sm text-foreground/60 mt-3 text-center bg-white/60 backdrop-blur-sm py-2 px-3 rounded-lg">
            Reklamı 5 saniye sonra kapatabilirsiniz
          </p>
        )}
      </div>
    </div>
  );
};