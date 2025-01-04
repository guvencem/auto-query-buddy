import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X, Check, Crown } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [remainingQuestions, setRemainingQuestions] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const [showDialog, setShowDialog] = useState(false);
  const [showAd, setShowAd] = useState(false);
  const [canCloseAd, setCanCloseAd] = useState(false);
  const [showMembershipDialog, setShowMembershipDialog] = useState(false);
  const [showRemainingQuestions, setShowRemainingQuestions] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (showRemainingQuestions) {
      const timer = setTimeout(() => {
        setShowRemainingQuestions(false);
      }, 10000); // 10 saniye sonra gizle

      return () => clearTimeout(timer);
    }
  }, [showRemainingQuestions]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    if (remainingQuestions === 0) {
      setShowMembershipDialog(true);
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
      setShowDialog(true);
      setRemainingQuestions((prev) => Math.max(0, prev - 1));
      setMessage(""); // Clear the input after successful submission
      setShowRemainingQuestions(true); // Show remaining questions notification
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
    setShowAd(true);
    setTimeout(() => {
      setCanCloseAd(true);
    }, 5000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      {/* Ad Space Top */}
      <div className="w-full h-[100px] bg-secondary/30 rounded-lg mb-4 flex items-center justify-center">
        <p className="text-foreground/40">Reklam Alanı</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Aracınızla ilgili sorunuzu yazın..."
          className="min-h-[120px] bg-white/80 backdrop-blur-sm border-2 border-primary/20 focus:border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-foreground placeholder:text-foreground/50"
        />
        
        {/* Remaining Questions Notification */}
        {showRemainingQuestions && (
          <div className="animate-fade-in bg-white/80 backdrop-blur-sm p-3 rounded-lg border border-primary/20 text-center">
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
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Yanıt Alınıyor...
            </span>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Gönder
            </>
          )}
        </Button>
      </form>

      {/* Response Dialog */}
      <Dialog open={showDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px] bg-secondary/50 backdrop-blur-sm border-2 border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-foreground">
              Uzman Yanıtı
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4 space-y-4 max-h-[50vh] overflow-y-auto px-2">
            <p className="text-lg text-foreground/80 whitespace-pre-wrap leading-relaxed">
              {answer}
            </p>
          </div>
          <Button
            onClick={handleCloseDialog}
            className="btn-neon mt-4"
          >
            Anladım
          </Button>
        </DialogContent>
      </Dialog>

      {/* Membership Dialog */}
      <Dialog open={showMembershipDialog} onOpenChange={setShowMembershipDialog}>
        <DialogContent className="sm:max-w-[500px] bg-secondary/50 backdrop-blur-sm border-2 border-primary/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center text-foreground flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-primary" />
              Premium Üyelik
            </DialogTitle>
          </DialogHeader>
          
          <div className="mt-6 space-y-6">
            <div className="text-center">
              <p className="text-lg text-foreground/80">
                Ücretsiz soru hakkınız doldu. Premium üyelik ile sınırsız soru sorabilirsiniz!
              </p>
            </div>

            <div className="space-y-4">
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <p className="text-foreground/80">Sınırsız soru sorma hakkı</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <p className="text-foreground/80">Öncelikli yanıt alma</p>
                </div>
              </div>
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-xl border border-primary/20">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary" />
                  <p className="text-foreground/80">Reklamsız deneyim</p>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button
                onClick={() => setShowMembershipDialog(false)}
                className="btn-neon w-full"
              >
                Premium Üyeliğe Geç
              </Button>
              <button
                onClick={() => setShowMembershipDialog(false)}
                className="w-full mt-4 text-foreground/60 hover:text-foreground transition-colors text-sm"
              >
                Belki daha sonra
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Advertisement Dialog */}
      {showAd && (
        <div className="fixed bottom-4 right-4 bg-secondary/50 backdrop-blur-sm rounded-2xl shadow-2xl p-4 w-[90vw] sm:w-[300px] animate-fadeIn border-2 border-primary/20">
          <div className="relative">
            {canCloseAd && (
              <button
                onClick={() => setShowAd(false)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-secondary/80 transition-colors shadow-lg border border-primary/20"
              >
                <X className="w-4 h-4 text-foreground/60" />
              </button>
            )}
            <div className="h-[200px] bg-white/60 backdrop-blur-sm rounded-xl flex items-center justify-center border border-primary/20">
              <p className="text-foreground/60 font-medium">Reklam İçeriği</p>
            </div>
            {!canCloseAd && (
              <p className="text-sm text-foreground/60 mt-3 text-center bg-white/60 backdrop-blur-sm py-2 px-3 rounded-lg">
                Reklamı 5 saniye sonra kapatabilirsiniz
              </p>
            )}
          </div>
        </div>
      )}

      {/* Ad Space Bottom */}
      <div className="w-full h-[100px] bg-secondary/30 rounded-lg mt-4 flex items-center justify-center">
        <p className="text-foreground/40">Reklam Alanı</p>
      </div>
    </div>
  );
};