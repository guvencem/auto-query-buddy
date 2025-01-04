interface AdSpaceProps {
  position: "top" | "bottom";
}

export const AdSpace = ({ position }: AdSpaceProps) => {
  return (
    <div className={`w-full h-[100px] bg-secondary/30 rounded-lg ${position === "bottom" ? "mt-4" : "mb-4"} flex items-center justify-center`}>
      <p className="text-foreground/40">Reklam Alanı</p>
    </div>
  );
};