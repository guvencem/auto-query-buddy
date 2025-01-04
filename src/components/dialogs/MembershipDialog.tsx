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
      <DialogContent className="sm:max-w-[425px] bg-white p-6">
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
                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border-2 border-primary/20 hover:border-primary/40 transition-colors">
                  <Crown className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">Premium Özellikler</h3>
                    <p className="text-gray-600">
                      Sınırsız erişim ve özel içerikler
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-4 rounded-lg bg-white border-2 border-primary/20 hover:border-primary/40 transition-colors">
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
                className="w-full btn-neon"
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
                style: {
                  button: {
                    background: '#10B981',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '10px 20px',
                    fontWeight: '600',
                  },
                  input: {
                    background: 'white',
                    borderColor: '#D1D5DB',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    color: '#1F2937',
                  },
                  label: {
                    color: '#1F2937',
                    fontWeight: '500',
                    marginBottom: '4px',
                  },
                  anchor: {
                    color: '#10B981',
                    fontWeight: '500',
                  },
                  message: {
                    color: '#EF4444',
                    background: '#FEE2E2',
                    borderColor: '#FCA5A5',
                    padding: '8px 12px',
                    borderRadius: '6px',
                  },
                },
              }}
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
                    link_text: 'Zaten hesabınız var mı? Giriş yapın',
                  },
                },
              }}
              providers={[]}
            />
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}