import { cn } from "@/lib/utils";

type GlassCardProps = {
  className?: string;
  children: React.ReactNode;
};

export function GlassCard({ children, className }: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/30 bg-white/60 p-6 shadow-[0_20px_50px_rgba(26,26,26,0.12)] backdrop-blur-md",
        className,
      )}
    >
      {children}
    </div>
  );
}
