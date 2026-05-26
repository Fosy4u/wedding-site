import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "outline" | "ghost";
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variantStyles = {
  primary:
    "bg-[var(--color-burgundy)] text-[var(--color-ivory)] hover:bg-[var(--color-burgundy-2)]",
  outline:
    "border border-[var(--color-soft-gold)] bg-transparent text-[var(--color-ivory)] hover:bg-white/10",
  ghost: "bg-white/10 text-[var(--color-ivory)] hover:bg-white/20",
};

const baseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-semibold tracking-[0.16em] uppercase transition-transform duration-300 hover:scale-[1.03] disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  children,
  href,
  onClick,
  className,
  variant = "primary",
  type = "button",
  disabled,
}: ButtonProps) {
  const styles = cn(baseStyles, variantStyles[variant], className);

  if (href) {
    const isExternal = href.startsWith("http");

    if (isExternal) {
      return (
        <a
          href={href}
          className={styles}
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    }

    return (
      <Link href={href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={styles}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
