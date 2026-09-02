// src/components/layout/Header.jsx
import { Menu, Users, HandCoins, Eye } from "lucide-react";
import { useDashboardSummary } from "../../hooks/useDashboard";
import { NAV_ITEMS } from "./Sidebar";

function QuickStat({ icon: Icon, label, value }) {
  return (
    <div className="hidden items-center gap-2 rounded-card border border-black/5 bg-parchment-card px-3 py-1.5 text-sm dark:border-white/10 dark:bg-ink-light md:flex">
      <Icon size={14} className="text-gold-muted" />
      <span className="text-slate-muted">{label}</span>
      <span className="font-semibold text-slate-text dark:text-parchment">{value}</span>
    </div>
  );
}

export default function Header({ activePage, onOpenMobileNav }) {
  const { data } = useDashboardSummary();
  const pageLabel = NAV_ITEMS.find((item) => item.key === activePage)?.label || "Dashboard";

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-black/5 bg-parchment/90 px-5 py-3.5 backdrop-blur dark:border-white/10 dark:bg-ink-deep/90">
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenMobileNav}
          className="rounded-card p-2 text-slate-text hover:bg-black/5 dark:text-parchment dark:hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="font-display text-lg font-semibold text-slate-text dark:text-parchment">
          {pageLabel}
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <QuickStat icon={Users} label="Instructors" value={data?.totalInstructors ?? "—"} />
        <QuickStat icon={HandCoins} label="Donators" value={data?.totalDonators ?? "—"} />
        <QuickStat icon={Eye} label="Visits" value={data?.totalSiteVisits ?? "—"} />

        <div className="flex items-center gap-2.5 border-l border-black/10 pl-3 dark:border-white/10">
          <img
            src="https://api.dicebear.com/7.x/initials/svg?seed=Admin&backgroundColor=16233F&textColor=D9BE7E"
            alt="Admin avatar"
            className="h-8 w-8 rounded-full"
          />
          <div className="hidden leading-tight sm:block">
            <p className="text-sm font-medium text-slate-text dark:text-parchment">Registrar Admin</p>
            <p className="text-xs text-slate-muted">Super Admin</p>
          </div>
        </div>
      </div>
    </header>
  );
}
