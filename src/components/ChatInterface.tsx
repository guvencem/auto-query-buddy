import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [remainingQuestions, setRemainingQuestions] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswer] = useState("");
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('generate-car-advice', {
        body: { question: message }
      });

      if (error) throw error;

      setAnswer(data.answer);
      setRemainingQuestions((prev) => Math.max(0, prev - 1));
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

      {answer && (
        <div className="mt-6 p-4 bg-white rounded-lg shadow">
          <h3 className="font-semibold mb-2">Yanıt:</h3>
          <p className="text-gray-700 whitespace-pre-wrap">{answer}</p>
        </div>
      )}

      {/* Ad Space Bottom */}
      <div className="w-full h-[100px] bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
        <p className="text-gray-400">Reklam Alanı</p>
      </div>
    </div>
  );
};