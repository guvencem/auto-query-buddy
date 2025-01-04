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
          className="min-h-[120px] bg-white/80 backdrop-blur-sm border-2 border-blue-100 focus:border-blue-300 rounded-xl transition-all duration-300 shadow-sm hover:shadow-md"
        />
        <Button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium py-3 rounded-xl transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
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
        <DialogContent className="fixed inset-x-0 bottom-0 sm:relative sm:inset-auto max-h-[90vh] sm:max-h-[80vh] w-full sm:max-w-[600px] mx-auto bg-gradient-to-b from-white to-blue-50 p-4 sm:p-6 rounded-t-3xl sm:rounded-2xl shadow-xl border-2 border-blue-100 overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl sm:text-2xl font-bold text-blue-900 mb-2 sm:mb-4">
              Uzman Yanıtı
            </DialogTitle>
          </DialogHeader>
          <div className="mt-2 sm:mt-4 space-y-4">
            <p className="text-base sm:text-lg text-gray-700 whitespace-pre-wrap leading-relaxed">
              {answer}
            </p>
          </div>
          <Button
            onClick={handleCloseDialog}
            className="mt-4 sm:mt-6 w-full bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 text-white font-medium py-2 rounded-xl transform transition-all duration-300 hover:scale-[1.02]"
          >
            Anladım
          </Button>
        </DialogContent>
      </Dialog>

      {/* Advertisement Dialog */}
      {showAd && (
        <div className="fixed bottom-4 right-4 bg-white rounded-2xl shadow-2xl p-4 w-[90vw] sm:w-[300px] animate-fadeIn border-2 border-blue-100">
          <div className="relative">
            {canCloseAd && (
              <button
                onClick={() => setShowAd(false)}
                className="absolute -top-2 -right-2 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors shadow-lg border border-gray-200"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            )}
            <div className="h-[200px] bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl flex items-center justify-center border border-blue-100">
              <p className="text-gray-600 font-medium">Reklam İçeriği</p>
            </div>
            {!canCloseAd && (
              <p className="text-sm text-gray-600 mt-3 text-center bg-blue-50 py-2 px-3 rounded-lg">
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