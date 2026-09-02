// src/components/ui/Modal.jsx
import { X } from "lucide-react";
import { useEffect } from "react";

export default function Modal({ open, onClose, title, description, children }) {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-8 backdrop-blur-[2px]">
      <div
        className="w-full max-w-lg rounded-card border border-black/5 bg-parchment-card shadow-xl view-transition dark:border-white/10 dark:bg-ink-light"
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-start justify-between border-b border-black/5 px-6 py-4 dark:border-white/10">
          <div>
            <h2 className="font-display text-lg font-semibold text-slate-text dark:text-parchment">
              {title}
            </h2>
            {description && (
              <p className="mt-0.5 text-sm text-slate-muted">{description}</p>
            )}
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="rounded-full p-1.5 text-slate-muted hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X size={18} />
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
      </div>
    </div>
  );
}
