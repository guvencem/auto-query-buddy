import { CookieConsent } from "@/components/CookieConsent";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Auth } from "@supabase/auth-ui-react";
import { supabase } from "@/integrations/supabase/client";
import { ThemeSupa } from "@supabase/auth-ui-shared";

const Index = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/0c7dfd7d-d317-4b51-975c-b77e96d1423b.png" 
              alt="Araba Akademisi Logo" 
              className="h-20 md:h-24"
            />
          </div>
          <Button 
            variant="outline"
            onClick={() => setShowLoginDialog(true)}
          >
            <LogIn className="w-4 h-4 mr-2" />
            Giriş Yap
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Araç Sorunlarınıza Anında Çözüm
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Aracınızla ilgili her türlü soruyu yapay zeka destekli sistemimize sorabilirsiniz. 
            Uzman yanıtları anında alın.
          </p>
        </div>

        <ChatInterface />
      </main>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[400px] p-0">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl font-bold text-center">Giriş Yap</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
            <Auth
              supabaseClient={supabase}
              appearance={{
                theme: ThemeSupa,
                variables: {
                  default: {
                    colors: {
                      brand: '#4F46E5',
                      brandAccent: '#4338CA',
                    },
                  },
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
                    social_provider_text: 'ile giriş yap',
                    link_text: 'Zaten hesabınız var mı? Giriş yapın',
                  },
                  sign_up: {
                    email_label: 'Email adresi',
                    password_label: 'Şifre',
                    button_label: 'Hesap oluştur',
                    loading_button_label: 'Kaydediliyor...',
                    social_provider_text: 'ile kayıt ol',
                    link_text: 'Hesabınız yok mu? Kayıt olun',
                  },
                },
              }}
            />
          </div>
        </DialogContent>
      </Dialog>

      <CookieConsent />
    </div>
  );
};

export default Index;