// src/components/layout/Sidebar.jsx
import {
  LayoutDashboard,
  Users,
  CalendarDays,
  GraduationCap,
  HandCoins,
  Phone,
  X,
  ShieldCheck,
} from "lucide-react";

export const NAV_ITEMS = [
  { key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { key: "instructors", label: "Instructors", icon: Users },
  { key: "events", label: "Events", icon: CalendarDays },
  { key: "academics", label: "Academics", icon: GraduationCap },
  { key: "donators", label: "Donators", icon: HandCoins },
  { key: "contact", label: "Contact Info", icon: Phone },
];

export default function Sidebar({ activePage, onNavigate, mobileOpen, onCloseMobile }) {
  return (
    <>
      {/* Mobile scrim */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-30 bg-ink/50 lg:hidden"
          onClick={onCloseMobile}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-64 flex-col bg-ink text-parchment transition-transform duration-200 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 py-5">
          <div className="flex items-center gap-2.5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/20 text-gold-soft">
              <ShieldCheck size={18} />
            </span>
            <div className="leading-tight">
              <p className="font-display text-sm font-semibold tracking-wide">
                Kenifraze Kings
              </p>
              <p className="text-[11px] text-white/50">College Admin</p>
            </div>
          </div>
          <button
            onClick={onCloseMobile}
            className="rounded-full p-1 text-white/60 hover:bg-white/10 lg:hidden"
            aria-label="Close menu"
          >
            <X size={18} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-5">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = activePage === key;
            return (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className={`flex w-full items-center gap-3 rounded-card border-l-2 px-3 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "border-gold bg-white/[0.06] text-white"
                    : "border-transparent text-white/65 hover:bg-white/[0.04] hover:text-white"
                }`}
              >
                <Icon size={17} strokeWidth={isActive ? 2.25 : 1.9} />
                {label}
              </button>
            );
          })}
        </nav>

        <div className="border-t border-white/10 px-5 py-4 text-[11px] text-white/40">
          Kenifraze Kings College &middot; Admin Panel
        </div>
      </aside>
    </>
  );
}
