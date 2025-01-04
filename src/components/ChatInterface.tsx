import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, X } from "lucide-react";
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
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
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
    // Start 5-second timer for ad close button
    setTimeout(() => {
      setCanCloseAd(true);
    }, 5000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-4 text-center">
        <p className="text-sm text-gray-600">
          Kalan ücretsiz soru hakkınız: {remainingQuestions}
        </p>
      </div>
      
      {/* Ad Space Top */}
      <div className="w-full h-[100px] bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
        <p className="text-gray-400">Reklam Alanı</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Aracınızla ilgili sorunuzu yazın..."
          className="min-h-[120px]"
        />
        <Button
          type="submit"
          className="w-full"
          disabled={!message.trim() || remainingQuestions === 0 || isLoading}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Yanıt</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
          </div>
        </DialogContent>
      </Dialog>

      {/* Advertisement Dialog */}
      {showAd && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 w-[300px] animate-fadeIn">
          <div className="relative">
            {canCloseAd && (
              <button
                onClick={() => setShowAd(false)}
                className="absolute -top-2 -right-2 bg-gray-100 rounded-full p-1 hover:bg-gray-200 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="h-[200px] bg-gray-100 rounded flex items-center justify-center">
              <p className="text-gray-400">Reklam İçeriği</p>
            </div>
            {!canCloseAd && (
              <p className="text-xs text-gray-500 mt-2 text-center">
                Reklamı 5 saniye sonra kapatabilirsiniz
              </p>
            )}
          </div>
        </div>
      )}

      {/* Ad Space Bottom */}
      <div className="w-full h-[100px] bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
        <p className="text-gray-400">Reklam Alanı</p>
      </div>
    </div>
  );
};