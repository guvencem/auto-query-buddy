import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Crown, Check, Sparkles } from "lucide-react";

interface MembershipDialogProps {
  open: boolean;
  onClose: () => void;
}

export const MembershipDialog = ({ open, onClose }: MembershipDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px] bg-white/95 backdrop-blur-sm border-2 border-primary shadow-[0_0_15px_rgba(16,185,129,0.3)]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center flex items-center justify-center gap-2 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            <Crown className="w-8 h-8 text-primary animate-pulse" />
            Premium Üyelik
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-8 space-y-8">
          <div className="text-center">
            <p className="text-xl font-medium text-foreground">
              Premium üyelik ile sınırsız soru sorabilirsiniz!
            </p>
            <p className="mt-2 text-muted-foreground">
              Ücretsiz soru hakkınız doldu. Hemen premium üye olun!
            </p>
          </div>

          <div className="space-y-4">
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg font-medium">Sınırsız soru sorma hakkı</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg font-medium">Öncelikli yanıt alma</p>
              </div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Check className="w-6 h-6 text-primary" />
                </div>
                <p className="text-lg font-medium">Reklamsız deneyim</p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <Button
              onClick={onClose}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity"
            >
              Premium Üyeliğe Geç
            </Button>
            <button
              onClick={onClose}
              className="w-full mt-4 text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
            >
              Belki daha sonra
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};