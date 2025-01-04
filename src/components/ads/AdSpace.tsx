import Script from 'next/script';

interface AdSpaceProps {
  position: "top" | "bottom";
}

export const AdSpace = ({ position }: AdSpaceProps) => {
  // Google AdSense reklam birimi ID'si - kendi AdSense kodunuzla değiştirin
  const adUnitId = "ca-pub-XXXXXXXXXXXXXXXX";

  return (
    <div className={`w-full min-h-[100px] ${position === "bottom" ? "mt-4" : "mb-4"}`}>
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client={adUnitId}
        data-ad-slot="XXXXXXXXXX"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
      <Script id="adsbygoogle" strategy="afterInteractive">
        {`
          (adsbygoogle = window.adsbygoogle || []).push({});
        `}
      </Script>
    </div>
  );
};