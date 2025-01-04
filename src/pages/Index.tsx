import { CookieConsent } from "@/components/CookieConsent";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { LogIn } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">CarAdvisor</h1>
          <Button variant="outline">
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

      <CookieConsent />
    </div>
  );
};

export default Index;