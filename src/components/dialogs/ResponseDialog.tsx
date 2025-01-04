import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ResponseDialogProps {
  open: boolean;
  onClose: () => void;
  answer: string;
}

const formatMarkdownText = (text: string) => {
  // Bold başlıkları işle (**text**)
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-foreground">$1</strong>');
};

export const ResponseDialog = ({ open, onClose, answer }: ResponseDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white/95 backdrop-blur-sm border-2 border-primary/20">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Uzman Yanıtı
          </DialogTitle>
        </DialogHeader>
        <div className="mt-4 space-y-4 max-h-[50vh] overflow-y-auto px-2">
          <p 
            className="text-lg text-foreground whitespace-pre-wrap leading-relaxed"
            dangerouslySetInnerHTML={{ __html: formatMarkdownText(answer) }}
          />
        </div>
        <Button
          onClick={onClose}
          className="btn-neon mt-4"
        >
          Anladım
        </Button>
      </DialogContent>
    </Dialog>
  );
};