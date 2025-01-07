import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

interface RenewalDialogProps {
  open: boolean;
  onClose: () => void;
  onRenewal: () => void;
}

export const RenewalDialog = ({ open, onClose, onRenewal }: RenewalDialogProps) => {
  const [showAd, setShowAd] = useState(false);
  const [canCloseAd, setCanCloseAd] = useState(false);
  const [adTimer, setAdTimer] = useState(15);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (showAd && !canCloseAd) {
      timer = setInterval(() => {
        setAdTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            setCanCloseAd(true);
            if (timer) clearInterval(timer);
            return 0;
          }
          return newTimer;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showAd, canCloseAd]);

  useEffect(() => {
    if (showAd) {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      } catch (err) {
        console.error('AdSense error:', err);
      }
    }
  }, [showAd]);

  const handleWatchAd = () => {
    setShowAd(true);
    setCanCloseAd(false);
    setAdTimer(15);
  };

  const handleAdClose = () => {
    if (canCloseAd) {
      setShowAd(false);
      onRenewal();
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[728px]">
        <div className="text-center space-y-4 p-4">
          <h2 className="text-xl font-semibold text-primary">
            Soru Hakkınız Bitti!
          </h2>
          <p className="text-foreground/80">
            Reklam izleyerek 3 yeni soru hakkı kazanabilirsiniz.
          </p>
          {!showAd && (
            <Button onClick={handleWatchAd} className="w-full">
              Reklam İzle ve Devam Et
            </Button>
          )}

          {showAd && (
            <div className="space-y-4">
              <div className="flex justify-center">
                <ins
                  className="adsbygoogle"
                  style={{ display: "block", width: "100%", height: "250px" }}
                  data-ad-client="ca-pub-1468951974661165"
                  data-ad-slot="5313941435"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                />
              </div>
              
              <Button 
                onClick={handleAdClose}
                disabled={!canCloseAd}
                className="w-full"
              >
                {canCloseAd ? "Devam Et" : `${adTimer} saniye bekleyin...`}
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};