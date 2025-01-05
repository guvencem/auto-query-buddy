import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ResponseDialog } from "./dialogs/ResponseDialog";
import { RenewalDialog } from "./dialogs/RenewalDialog";
import { AddToHomeScreenDialog } from "./dialogs/AddToHomeScreenDialog";
import { AdSpace } from "./ads/AdSpace";
import { FloatingAd } from "./ads/FloatingAd";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [remainingQuestions, setRemainingQuestions] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [canCloseAd, setCanCloseAd] = useState(false);
  const [showRemainingQuestions, setShowRemainingQuestions] = useState(false);
  const [adTimer, setAdTimer] = useState(15);
  const [showRenewalDialog, setShowRenewalDialog] = useState(false);
  const [showAddToHomeScreen, setShowAddToHomeScreen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (showRemainingQuestions) {
      const timer = setTimeout(() => {
        setShowRemainingQuestions(false);
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [showRemainingQuestions]);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (showAd && !canCloseAd) {
      timer = setInterval(() => {
        setAdTimer((prevTimer) => {
          const newTimer = prevTimer - 1;
          if (newTimer <= 0) {
            setCanCloseAd(true);
            if (timer) clearInterval(timer);
            return 0;
          }
          return newTimer;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [showAd, canCloseAd]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    if (remainingQuestions <= 0) {
      setShowRenewalDialog(true);
      return;
    }
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-car-advice', {
        body: { question: message }
      });

      if (error) {
        console.error('Supabase function error:', error);
        throw error;
      }

      if (!data || !data.answer) {
        throw new Error('No answer received from the assistant');
      }

      setAnswer(data.answer);
      
      const newRemainingQuestions = remainingQuestions - 1;
      setRemainingQuestions(newRemainingQuestions);

      if (newRemainingQuestions === 0) {
        setShowAddToHomeScreen(true);
      }
      
      if (remainingQuestions < 3) {
        setShowAd(true);
        setCanCloseAd(false);
        setAdTimer(15);
        setShowDialog(true);
      } else {
        setShowDialog(true);
      }
      
      setMessage("");
      setShowRemainingQuestions(true);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: "Hata",
        description: "Yanıt alınırken bir hata oluştu. Lütfen tekrar deneyin.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCloseDialog = () => {
    setShowDialog(false);
    setShowAd(false);
    setAdTimer(15);
    setCanCloseAd(false);
  };

  const handleRenewal = () => {
    setRemainingQuestions(3);
    toast({
      title: "Başarılı!",
      description: "3 yeni soru hakkı kazandınız!",
    });
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4 space-y-6">
      <AdSpace position="top" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Araçla ilgili ne sorunun varsa, yazman yeter!"
          className="min-h-[120px] bg-white/80 backdrop-blur-sm border-2 border-primary/20 focus:border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-foreground placeholder:text-foreground/50"
        />
        
        {showRemainingQuestions && (
          <div className="animate-fadeIn bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-primary/20 text-center">
            <p className="text-sm text-foreground/70">
              Kalan ücretsiz soru hakkınız: {remainingQuestions}
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="btn-neon w-full"
          disabled={!message.trim() || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Yanıt Alınıyor...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Send className="w-4 h-4 mr-2" />
              Gönder
            </span>
          )}
        </Button>
      </form>

      <AdSpace position="bottom" />

      <ResponseDialog 
        open={showDialog}
        onClose={handleCloseDialog}
        answer={answer}
      />

      <FloatingAd
        show={showAd}
        onClose={() => {
          if (canCloseAd) {
            setShowAd(false);
            setAdTimer(15);
            window.location.reload();
          }
        }}
        canClose={canCloseAd}
        remainingTime={adTimer}
      />

      <RenewalDialog
        open={showRenewalDialog}
        onClose={() => setShowRenewalDialog(false)}
        onRenewal={handleRenewal}
      />

      <AddToHomeScreenDialog
        open={showAddToHomeScreen}
        onClose={() => setShowAddToHomeScreen(false)}
      />
    </div>
  );
};