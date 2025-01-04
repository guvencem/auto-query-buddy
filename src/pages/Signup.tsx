import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        navigate('/');
      }
    };
    checkAuth();
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-8 border-2 border-primary/20">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-[#6E59A5] mb-2">
            Premium Üyelik için Kayıt Ol
          </h1>
          <p className="text-muted-foreground">
            Zaten hesabınız var mı? <a href="/login" className="text-primary hover:underline">Giriş yapın</a>
          </p>
        </div>

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
          view="sign_up"
          localization={{
            variables: {
              sign_up: {
                email_label: 'Email adresi',
                password_label: 'Şifre',
                button_label: 'Hesap oluştur',
                loading_button_label: 'Kaydediliyor...',
                social_provider_text: 'ile kayıt ol',
                link_text: 'Zaten hesabınız var mı? Giriş yapın',
              }
            },
          }}
        />
      </div>
    </div>
  );
};

export default Signup;