// src/components/ui/Button.jsx
import { Loader2 } from "lucide-react";

const VARIANTS = {
  primary: "bg-ink text-white hover:bg-ink-light disabled:bg-ink/60",
  gold: "bg-gold text-white hover:bg-gold-muted disabled:bg-gold/60",
  outline:
    "border border-slate-text/15 text-slate-text hover:bg-black/5 dark:text-parchment dark:border-parchment/20 dark:hover:bg-white/5",
  danger: "bg-brick text-white hover:bg-brick/85 disabled:bg-brick/60",
  ghost: "text-slate-text hover:bg-black/5 dark:text-parchment dark:hover:bg-white/5",
};

export default function Button({
  children,
  variant = "primary",
  loading = false,
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center gap-2 rounded-card px-4 py-2 text-sm font-medium transition-colors disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading && <Loader2 size={15} className="animate-spin" />}
      {children}
    </button>
  );
}
