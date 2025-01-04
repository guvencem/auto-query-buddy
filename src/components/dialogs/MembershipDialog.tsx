import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown, Check } from "lucide-react";

interface MembershipDialogProps {
  open: boolean;
  onClose: () => void;
}

export const MembershipDialog = ({ open, onClose }: MembershipDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-secondary/50 backdrop-blur-sm border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-2">
            <Crown className="w-6 h-6 text-primary" />
            Premium Üyelik
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6 space-y-6">
          <div className="text-center">
            <p className="text-lg text-foreground/80">
              Ücretsiz soru hakkınız doldu. Premium üyelik ile sınırsız soru sorabilirsiniz!
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <p className="text-foreground/80">Sınırsız soru sorma hakkı</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <p className="text-foreground/80">Öncelikli yanıt alma</p>
              </div>
            </div>
            <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <p className="text-foreground/80">Reklamsız deneyim</p>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button
              onClick={onClose}
              className="btn-neon w-full"
            >
              Premium Üyeliğe Geç
            </Button>
            <button
              onClick={onClose}
              className="w-full mt-4 text-foreground/60 hover:text-foreground transition-colors text-sm"
            >
              Belki daha sonra
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};