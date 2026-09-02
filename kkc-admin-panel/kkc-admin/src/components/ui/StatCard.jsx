// src/components/ui/StatCard.jsx

export default function StatCard({ icon: Icon, label, value, accent = "gold", loading }) {
  const accents = {
    gold: "bg-gold/10 text-gold-muted",
    forest: "bg-forest/10 text-forest",
    ink: "bg-ink/10 text-ink dark:bg-white/10 dark:text-parchment",
  };

  return (
    <div className="rounded-card border border-black/5 bg-parchment-card p-5 dark:border-white/10 dark:bg-ink-light">
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-muted">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-full ${accents[accent]}`}>
          <Icon size={18} />
        </span>
      </div>
      <p className="mt-3 font-display text-3xl font-semibold text-slate-text dark:text-parchment">
        {loading ? "—" : value}
      </p>
    </div>
  );
}
