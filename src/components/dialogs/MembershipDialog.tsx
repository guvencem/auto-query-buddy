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
      <DialogContent className="bg-white p-6 rounded-lg max-w-sm mx-auto">
        {!showAuthUI ? (
          <>
            <DialogHeader className="space-y-3">
              <DialogTitle className="text-2xl font-semibold text-center text-gray-900">
                Premium Üyelik
              </DialogTitle>
              <DialogDescription className="text-center text-gray-600">
                Premium üyelik ile tüm özelliklere erişin
              </DialogDescription>
            </DialogHeader>

            <div className="mt-6 space-y-4">
              <div className="p-4 rounded-lg border border-gray-100 bg-white hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Premium Özellikler</h3>
                    <p className="text-sm text-gray-600">Sınırsız erişim ve özel içerikler</p>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-lg border border-gray-100 bg-white hover:border-primary/20 transition-colors">
                <div className="flex items-center gap-3">
                  <Crown className="h-6 w-6 text-primary" />
                  <div className="text-left">
                    <h3 className="font-medium text-gray-900">Öncelikli Destek</h3>
                    <p className="text-sm text-gray-600">7/24 öncelikli müşteri desteği</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePremiumClick}
                disabled={loading}
                className="w-full bg-primary text-white py-3 px-4 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                {loading ? "İşleniyor..." : "Premium Üye Ol"}
              </button>
            </div>
          </>
        ) : (
          <div className="py-4">
            <DialogHeader className="mb-6">
              <DialogTitle className="text-2xl font-semibold text-center text-gray-900">
                Giriş Yap
              </DialogTitle>
            </DialogHeader>
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                style: {
                  container: {
                    color: '#1F2937',
                  },
                  button: {
                    backgroundColor: '#10B981',
                    color: 'white',
                    borderRadius: '8px',
                    padding: '12px 20px',
                    fontWeight: '500',
                    border: 'none',
                  },
                  input: {
                    backgroundColor: 'white',
                    borderColor: '#E5E7EB',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    color: '#1F2937',
                  },
                  label: {
                    color: '#4B5563',
                    fontWeight: '500',
                    marginBottom: '4px',
                  },
                  anchor: {
                    color: '#10B981',
                    fontWeight: '500',
                  },
                  message: {
                    backgroundColor: '#FEF2F2',
                    color: '#DC2626',
                    padding: '8px 12px',
                    borderRadius: '6px',
                    marginBottom: '16px',
                  },
                },
                className: {
                  container: 'auth-container',
                  button: 'auth-button',
                  input: 'auth-input',
                  label: 'auth-label',
                  message: 'auth-message',
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