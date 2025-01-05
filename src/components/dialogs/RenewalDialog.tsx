import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FloatingAd } from "../ads/FloatingAd";
import { useState } from "react";

interface RenewalDialogProps {
  open: boolean;
  onClose: () => void;
  onRenewal: () => void;
}

export const RenewalDialog = ({ open, onClose, onRenewal }: RenewalDialogProps) => {
  const [showAd, setShowAd] = useState(false);
  const [canCloseAd, setCanCloseAd] = useState(false);
  const [adTimer, setAdTimer] = useState(15);

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
      <DialogContent className="sm:max-w-md">
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
        </div>

        {showAd && (
          <FloatingAd
            show={showAd}
            onClose={handleAdClose}
            canClose={canCloseAd}
            remainingTime={adTimer}
          />
        )}
      </DialogContent>
    </Dialog>
  );
};