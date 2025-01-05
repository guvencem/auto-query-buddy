import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ResponseDialog } from "./dialogs/ResponseDialog";
import { RenewalDialog } from "./dialogs/RenewalDialog";
import { AddToHomeScreenDialog } from "./dialogs/AddToHomeScreenDialog";
import { AdSpace } from "./ads/AdSpace";
import { FloatingAd } from "./ads/FloatingAd";
import { MessageInput } from "./chat/MessageInput";

export const ChatInterface = () => {
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
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
      const formData = new FormData();
      formData.append('question', message);
      if (selectedFile) {
        formData.append('file', selectedFile);
      }

      const { data, error } = await supabase.functions.invoke('generate-car-advice', {
        body: formData
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
      setSelectedFile(null);
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

      <MessageInput
        message={message}
        setMessage={setMessage}
        isLoading={isLoading}
        onSubmit={handleSubmit}
        remainingQuestions={remainingQuestions}
        showRemainingQuestions={showRemainingQuestions}
        onFileUpload={(file) => setSelectedFile(file)}
      />

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