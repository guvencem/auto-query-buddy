import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface MembershipDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MembershipDialog({ open, onOpenChange }: MembershipDialogProps) {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const handlePremiumClick = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        onOpenChange(false); // Close the dialog
        navigate("/signup"); // Redirect to signup page
        toast({
          title: "Üyelik Gerekli",
          description: "Premium üyelik için lütfen önce kayıt olun.",
          variant: "default",
        });
        return;
      }

      // Handle premium subscription logic here for logged-in users
      toast({
        title: "Premium Üyelik",
        description: "Premium üyelik işlemi başlatılıyor...",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Hata",
        description: "Bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-white/95 backdrop-blur-sm">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent text-center">
            Premium Üyelik
          </DialogTitle>
          <DialogDescription className="text-center text-lg text-muted-foreground">
            Premium üyelik ile tüm özelliklere erişin
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <Crown className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Premium Özellikler</h3>
                <p className="text-muted-foreground">
                  Sınırsız erişim ve özel içerikler
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-colors">
              <Crown className="h-8 w-8 text-primary" />
              <div>
                <h3 className="font-semibold text-lg">Öncelikli Destek</h3>
                <p className="text-muted-foreground">
                  7/24 öncelikli müşteri desteği
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={handlePremiumClick}
            disabled={loading}
            className="w-full py-4 px-8 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "İşleniyor..." : "Premium Üye Ol"}
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}