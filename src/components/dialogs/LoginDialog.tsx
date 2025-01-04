import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/integrations/supabase/client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface LoginDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function LoginDialog({ open, onOpenChange }: LoginDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-white p-6 rounded-lg max-w-sm mx-auto">
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
                  link_text: 'Hesabın yok mu? Kayıt ol',
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
      </DialogContent>
    </Dialog>
  );
}