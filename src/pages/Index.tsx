import { CookieConsent } from "@/components/CookieConsent";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { LogIn, Crown } from "lucide-react";
import { useState } from "react";
import { MembershipDialog } from "@/components/dialogs/MembershipDialog";
import { LoginDialog } from "@/components/dialogs/LoginDialog";

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
      <LoginDialog 
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
      />

      {/* Membership Dialog */}
      <MembershipDialog 
        open={showMembershipDialog}
        onOpenChange={setShowMembershipDialog}
      />

      <CookieConsent />
    </div>
  );
};

export default Index;