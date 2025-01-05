import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { FileUpload } from "./FileUpload";

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  isLoading: boolean;
  onSubmit: (e: React.FormEvent) => void;
  remainingQuestions: number;
  showRemainingQuestions: boolean;
}

export const MessageInput = ({
  message,
  setMessage,
  isLoading,
  onSubmit,
  remainingQuestions,
  showRemainingQuestions,
}: MessageInputProps) => {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <Textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Araçla ilgili ne sorunun varsa, yazman yeter!"
        className="min-h-[120px] bg-white/80 backdrop-blur-sm border-2 border-primary/20 focus:border-primary rounded-xl transition-all duration-300 shadow-sm hover:shadow-md text-foreground placeholder:text-foreground/50"
      />

      <FileUpload 
        onFileUpload={(url) => {
          setMessage(message + `\n\nEk dosya: ${url}`);
        }}
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
  );
};