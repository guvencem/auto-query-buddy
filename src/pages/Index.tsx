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
          <div className="flex items-center space-x-2">
            <img 
              src="/lovable-uploads/0c7dfd7d-d317-4b51-975c-b77e96d1423b.png" 
              alt="Araba Akademisi Logo" 
              className="h-8 md:h-10"
            />
          </div>
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