import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Apple, Smartphone } from "lucide-react";
import { useState } from "react";

interface AddToHomeScreenDialogProps {
  open: boolean;
  onClose: () => void;
}

export const AddToHomeScreenDialog = ({ open, onClose }: AddToHomeScreenDialogProps) => {
  const [selectedPlatform, setSelectedPlatform] = useState<"ios" | "android" | null>(null);

  const iOSInstructions = (
    <div className="space-y-4 text-left">
      <h3 className="font-semibold text-lg">iOS Cihazlar için:</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Safari tarayıcısının alt kısmındaki "Paylaş" butonuna tıklayın</li>
        <li>"Ana Ekrana Ekle" seçeneğine dokunun</li>
        <li>"Ekle" butonuna tıklayın</li>
      </ol>
      <p className="text-sm text-muted-foreground mt-2">
        Not: Bu işlem sadece Safari tarayıcısında çalışır. Chrome veya diğer tarayıcılardan ana ekrana eklenemez.
      </p>
    </div>
  );

  const androidInstructions = (
    <div className="space-y-4 text-left">
      <h3 className="font-semibold text-lg">Android Cihazlar için:</h3>
      <ol className="list-decimal list-inside space-y-2">
        <li>Chrome tarayıcısının üst kısmındaki üç nokta menüsüne tıklayın</li>
        <li>"Ana ekrana ekle" seçeneğine dokunun</li>
        <li>"Ekle" butonuna tıklayın</li>
      </ol>
      <p className="text-sm text-muted-foreground mt-2">
        Not: Bazı Android cihazlarda otomatik olarak "Ana ekrana ekle" bildirimi görünebilir.
      </p>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        {!selectedPlatform ? (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-center">
              Araba Akademisi'ni Ana Ekranınıza Ekleyin!
            </h2>
            <p className="text-center text-muted-foreground">
              Daha hızlı erişim için uygulamayı ana ekranınıza ekleyebilirsiniz.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 p-6"
                onClick={() => setSelectedPlatform("ios")}
              >
                <Apple className="w-8 h-8" />
                <span>iOS</span>
              </Button>
              <Button
                variant="outline"
                className="flex flex-col items-center gap-2 p-6"
                onClick={() => setSelectedPlatform("android")}
              >
                <Smartphone className="w-8 h-8" />
                <span>Android</span>
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {selectedPlatform === "ios" ? iOSInstructions : androidInstructions}
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setSelectedPlatform(null)}
            >
              Geri Dön
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};