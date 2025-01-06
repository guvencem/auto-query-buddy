import { CookieConsent } from "@/components/CookieConsent";
import { ChatInterface } from "@/components/ChatInterface";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const { toast } = useToast();

  const logoUrl = "/lovable-uploads/a695c967-e7c6-44ba-9d3e-f3a7e3a355bd.png";

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background font-quicksand">
      {/* Header */}
      <header className="bg-[#9b87f5] shadow-lg animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-center items-center gap-4">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <img 
              src={logoUrl}
              alt="Araba Akademisi Logo" 
              className="h-16 md:h-20 hover:drop-shadow-xl transition-all"
              loading="eager"
              width="300"
              height="120"
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#6E59A5] hover:text-[#8A6FD3] transition-colors">
              Araç Sorunlarına Hızlı ve Kolay Çözüm!
            </h2>
          </div>
          <p className="text-[#7E69AB] text-lg max-w-2xl mx-auto hover:text-[#9A85C7] transition-colors">
            Araç marka, model ve yaşadığın sorunu buraya yaz, yapay zeka destekli çözümümüz sana saniyeler içinde yardımcı olsun!
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