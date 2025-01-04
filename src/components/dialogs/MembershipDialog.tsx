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
      <DialogContent className="sm:max-w-[425px] bg-white">
        {!showAuthUI ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-center text-gray-900">
                Premium Üyelik
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Premium üyelik ile tüm özelliklere erişin
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-colors bg-white">
                  <Crown className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Premium Özellikler</h3>
                    <p className="text-gray-600">
                      Sınırsız erişim ve özel içerikler
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg border-2 border-primary/20 hover:border-primary/40 transition-colors bg-white">
                  <Crown className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Öncelikli Destek</h3>
                    <p className="text-gray-600">
                      7/24 öncelikli müşteri desteği
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePremiumClick}
                disabled={loading}
                className="w-full py-3 px-4 rounded-lg bg-primary hover:bg-primary/90 text-white font-semibold text-base transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                {loading ? "İşleniyor..." : "Premium Üye Ol"}
              </button>
            </div>
          </>
        ) : (
          <div className="py-4">
            <DialogHeader className="mb-4">
              <DialogTitle className="text-2xl font-bold text-center text-gray-900">
                Giriş Yap veya Hesap Oluştur
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Premium üyelik için devam edin
              </DialogDescription>
            </DialogHeader>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#10B981',
                      brandAccent: '#4ADE80',
                      inputText: '#1A1F2C',
                      inputBackground: '#FFFFFF',
                      inputBorder: '#D1D5DB',
                      inputBorderFocus: '#10B981',
                      inputBorderHover: '#10B981',
                      inputPlaceholder: '#6B7280',
                      messageText: '#EF4444',
                      messageBackground: '#FEE2E2',
                      messageBorder: '#FCA5A5',
                      anchorTextColor: '#10B981',
                      anchorTextHoverColor: '#059669',
                      dividerBackground: '#E5E7EB',
                    },
                  },
                },
                className: {
                  container: 'auth-container',
                  label: 'text-gray-900 font-medium mb-1 block',
                  button: 'bg-primary hover:bg-primary/90 text-white font-semibold py-3 px-4 rounded-lg transition-colors w-full shadow-sm',
                  input: 'w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 bg-white text-gray-900 text-base',
                  anchor: 'text-primary hover:text-primary/80 font-medium',
                  divider: 'bg-gray-200',
                  message: 'text-red-600 text-sm',
                },
              }}
              providers={[]}
              localization={{
                variables: {
                  sign_in: {
                    email_label: 'Email adresi',
                    password_label: 'Şifre',
                    button_label: 'Giriş yap',
                    loading_button_label: 'Giriş yapılıyor...',
                    link_text: 'Hesabınız yok mu? Kayıt olun',
                  },
                  sign_up: {
                    email_label: 'Email adresi',
                    password_label: 'Şifre',
                    button_label: 'Kayıt ol',
                    loading_button_label: 'Kaydediliyor...',
                    link_text: 'Zaten hesabınız var mı? Giriş yapın'
                  }
                },
              }}
              view="sign_in"
              showLinks={true}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}