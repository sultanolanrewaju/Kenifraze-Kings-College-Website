// src/components/ui/EmptyState.jsx

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 rounded-card border border-dashed border-slate-text/15 bg-black/[0.015] px-6 py-14 text-center dark:border-white/10">
      {Icon && (
        <span className="mb-1 flex h-11 w-11 items-center justify-center rounded-full bg-ink/5 text-ink dark:bg-white/10 dark:text-parchment">
          <Icon size={20} />
        </span>
      )}
      <p className="font-display text-base font-semibold text-slate-text dark:text-parchment">
        {title}
      </p>
      {description && <p className="max-w-xs text-sm text-slate-muted">{description}</p>}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}
