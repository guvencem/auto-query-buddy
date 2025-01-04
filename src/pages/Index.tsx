import { CookieConsent } from "@/components/CookieConsent";
import { ChatInterface } from "@/components/ChatInterface";
import { Instagram } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background">
      {/* Header */}
      <header className="bg-[#9b87f5] shadow-lg animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 py-0.5 flex justify-center items-center"> {/* Reduced py-2 to py-0.5 */}
          <div className="transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/0c7dfd7d-d317-4b51-975c-b77e96d1423b.png" 
              alt="Araba Akademisi Logo" 
              className="h-64 md:h-80 hover:drop-shadow-xl transition-all"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="text-center mb-8 animate-fadeIn">
          <h2 className="text-2xl md:text-3xl font-bold text-[#6E59A5] mb-4 hover:text-[#8A6FD3] transition-colors">
            Araç Sorunlarınıza Anında Çözüm
          </h2>
          <p className="text-[#7E69AB] text-lg max-w-2xl mx-auto hover:text-[#9A85C7] transition-colors">
            Aracınızla ilgili her türlü soruyu yapay zeka destekli sistemimize sorabilirsiniz. 
            Uzman yanıtları anında alın.
          </p>
        </div>

        <ChatInterface />

        {/* Footer with Instagram Link */}
        <footer className="mt-12 text-center pb-8">
          <a 
            href="https://www.instagram.com/arabaakademisitr/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-[#6E59A5] hover:text-[#8A6FD3] transition-colors"
          >
            <Instagram className="w-6 h-6" />
            <span className="font-medium">@arabaakademisitr</span>
          </a>
        </footer>
      </main>

      <CookieConsent />
    </div>
  );
};

export default Index;