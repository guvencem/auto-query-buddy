import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setShowConsent(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 md:p-6 shadow-lg animate-fadeIn z-50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1">
          <p className="text-sm text-gray-600">
            Bu web sitesi, size en iyi deneyimi sunmak için çerezleri kullanmaktadır. Daha fazla bilgi için{" "}
            <a href="/cookie-policy" className="text-accent underline">
              Çerez Politikamızı
            </a>{" "}
            inceleyebilirsiniz.
          </p>
        </div>
        <div className="flex gap-4">
          <Button variant="outline" onClick={handleDecline}>
            Reddet
          </Button>
          <Button onClick={handleAccept}>Kabul Et</Button>
        </div>
        <button
          onClick={handleDecline}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 md:hidden"
        >
          <X size={20} />
        </button>
      </div>
    </div>
  );
};