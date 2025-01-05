import { CookieConsent } from "@/components/CookieConsent";
import { ChatInterface } from "@/components/ChatInterface";
import { Instagram } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [robotImage, setRobotImage] = useState<string>("/placeholder.svg");
  const [isLoadingImage, setIsLoadingImage] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const generateRobotImage = async () => {
      setIsLoadingImage(true);
      try {
        const { data, error } = await supabase.functions.invoke('generate-robot-image');
        
        if (error) {
          console.error('Error generating robot image:', error);
          const errorDetails = JSON.parse(error.message);
          
          if (errorDetails.retryAfter) {
            toast({
              title: "Lütfen bekleyin",
              description: "Robot resmi oluşturma limitine ulaşıldı. 1 dakika sonra tekrar deneyin.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Hata",
              description: "Robot resmi oluşturulurken bir hata oluştu. Lütfen sayfayı yenileyin.",
              variant: "destructive",
            });
          }
          return;
        }

        if (data?.image) {
          setRobotImage(data.image);
        }
      } catch (error) {
        console.error('Error generating robot image:', error);
        toast({
          title: "Hata",
          description: "Robot resmi oluşturulurken bir hata oluştu. Lütfen sayfayı yenileyin.",
          variant: "destructive",
        });
      } finally {
        setIsLoadingImage(false);
      }
    };

    generateRobotImage();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-secondary to-background font-quicksand">
      {/* Header */}
      <header className="bg-[#9b87f5] shadow-lg animate-fadeIn">
        <div className="max-w-7xl mx-auto px-4 py-0.5 flex justify-center items-center gap-4">
          <div className="transform hover:scale-105 transition-transform duration-300">
            <img 
              src="/lovable-uploads/0c7dfd7d-d317-4b51-975c-b77e96d1423b.png" 
              alt="Araba Akademisi Logo" 
              className="h-20 md:h-28 hover:drop-shadow-xl transition-all"
            />
          </div>
          {isLoadingImage ? (
            <div className="w-16 h-16 rounded-full bg-gray-200 animate-pulse" />
          ) : (
            <img 
              src={robotImage}
              alt="Robot Assistant"
              className="w-16 h-16 animate-bounce rounded-full shadow-lg"
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto py-8">
        <div className="text-center mb-8 animate-fadeIn">
          <div className="flex items-center justify-center gap-2 mb-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#6E59A5] hover:text-[#8A6FD3] transition-colors">
              Araç Sorunlarına Hızlı ve Kolay Çözüm!
            </h2>
            {isLoadingImage ? (
              <div className="w-8 h-8 rounded-full bg-gray-200 animate-pulse" />
            ) : (
              <img 
                src={robotImage}
                alt="Robot Assistant"
                className="w-8 h-8 rounded-full shadow-md"
              />
            )}
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