import { CookieConsent } from "@/components/CookieConsent";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { LogIn, Crown } from "lucide-react";
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
import { MembershipDialog } from "@/components/dialogs/MembershipDialog";

const Index = () => {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      {/* Header */}
      <header className="bg-[#9b87f5] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/0c7dfd7d-d317-4b51-975c-b77e96d1423b.png" 
              alt="Araba Akademisi Logo" 
              className="h-20 md:h-24"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button 
              className="btn-neon"
              onClick={() => setShowMembershipDialog(true)}
            >
              <Crown className="w-4 h-4 mr-2" />
              Premium Ol
            </Button>
            <Button 
              className="btn-neon"
              onClick={() => setShowLoginDialog(true)}
            >
              <LogIn className="w-4 h-4 mr-2" />
              Giriş Yap
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6E59A5] mb-4">
            Araç Sorunlarınıza Anında Çözüm
          </h2>
          <p className="text-[#7E69AB] text-lg max-w-2xl mx-auto">
            Aracınızla ilgili her türlü soruyu yapay zeka destekli sistemimize sorabilirsiniz. 
            Uzman yanıtları anında alın.
          </p>
        </div>

        <ChatInterface />
      </main>

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-[400px] p-0 bg-secondary/50 backdrop-blur-sm">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle className="text-2xl font-bold text-center text-[#6E59A5]">Giriş Yap</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6">
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

      {/* Membership Dialog */}
      <MembershipDialog 
        open={showMembershipDialog} 
        onClose={() => setShowMembershipDialog(false)} 
      />

      <CookieConsent />
    </div>
  );
};

export default Index;