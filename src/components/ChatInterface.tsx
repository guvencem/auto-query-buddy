import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send } from "lucide-react";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [remainingQuestions, setRemainingQuestions] = useState(3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    // Here we'll later integrate with AI API
    console.log("Sending message:", message);
    setMessage("");
    setRemainingQuestions((prev) => Math.max(0, prev - 1));
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
          disabled={!message.trim() || remainingQuestions === 0}
        >
          <Send className="w-4 h-4 mr-2" />
          Gönder
        </Button>
      </form>

      {/* Ad Space Bottom */}
      <div className="w-full h-[100px] bg-gray-100 rounded-lg mt-4 flex items-center justify-center">
        <p className="text-gray-400">Reklam Alanı</p>
      </div>
    </div>
  );
};