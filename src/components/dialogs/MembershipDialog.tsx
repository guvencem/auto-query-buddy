import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Crown } from "lucide-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
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
  const [showAuthUI, setShowAuthUI] = useState(false);

  const handlePremiumClick = async () => {
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        setShowAuthUI(true);
        toast({
          title: "Üyelik Gerekli",
          description: "Premium üyelik için lütfen önce giriş yapın.",
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
        {!showAuthUI ? (
          <>
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
          </>
        ) : (
          <div className="py-4">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#10B981',
                      brandAccent: '#4ADE80',
                    },
                  },
                },
              }}
              providers={[]}
              view="sign_in"
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email adresi',
                    password_label: 'Şifre',
                    button_label: 'Giriş yap',
                    loading_button_label: 'Giriş yapılıyor...',
                    social_provider_text: 'ile giriş yap',
                    link_text: 'Hesabınız yok mu? Kayıt olun',
                  },
                  sign_up: {
                    email_label: 'Email adresi',
                    password_label: 'Şifre',
                    button_label: 'Kayıt ol',
                    loading_button_label: 'Kaydediliyor...',
                    social_provider_text: 'ile kayıt ol',
                    link_text: 'Zaten hesabınız var mı? Giriş yapın',
                  }
                },
              }}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}