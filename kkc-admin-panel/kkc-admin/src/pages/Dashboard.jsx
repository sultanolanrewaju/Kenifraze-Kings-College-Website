// src/pages/Dashboard.jsx
import { Users, HandCoins, Eye, UserPlus, CalendarPlus, BookPlus, Activity } from "lucide-react";
import StatCard from "../components/ui/StatCard";
import EmptyState from "../components/ui/EmptyState";
import { useDashboardSummary } from "../hooks/useDashboard";

const QUICK_ACTIONS = [
  { key: "instructors", label: "Add Instructor", icon: UserPlus },
  { key: "events", label: "Post Event", icon: CalendarPlus },
  { key: "academics", label: "Add Academic Post", icon: BookPlus },
];

export default function Dashboard({ onNavigate }) {
  const { data, isLoading, isError } = useDashboardSummary();
  const activity = data?.recentActivity || [];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          icon={Users}
          label="Total Instructors"
          value={data?.totalInstructors}
          accent="ink"
          loading={isLoading}
        />
        <StatCard
          icon={HandCoins}
          label="Total Donators"
          value={data?.totalDonators}
          accent="gold"
          loading={isLoading}
        />
        <StatCard
          icon={Eye}
          label="Total Site Visits"
          value={data?.totalSiteVisits}
          accent="forest"
          loading={isLoading}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-card border border-black/5 bg-parchment-card p-5 dark:border-white/10 dark:bg-ink-light lg:col-span-1">
          <h2 className="font-display text-base font-semibold text-slate-text dark:text-parchment">
            Quick Actions
          </h2>
          <div className="mt-4 space-y-2">
            {QUICK_ACTIONS.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => onNavigate(key)}
                className="flex w-full items-center gap-3 rounded-card border border-black/5 px-3.5 py-2.5 text-left text-sm text-slate-text transition-colors hover:border-gold/50 hover:bg-gold/5 dark:border-white/10 dark:text-parchment"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gold/10 text-gold-muted">
                  <Icon size={15} />
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="rounded-card border border-black/5 bg-parchment-card p-5 dark:border-white/10 dark:bg-ink-light lg:col-span-2">
          <h2 className="font-display text-base font-semibold text-slate-text dark:text-parchment">
            Recent Activity
          </h2>

          {isError ? (
            <p className="mt-4 text-sm text-brick">Couldn't load recent activity.</p>
          ) : activity.length === 0 && !isLoading ? (
            <div className="mt-4">
              <EmptyState
                icon={Activity}
                title="No activity yet"
                description="Actions like new instructor profiles or event posts will show up here."
              />
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-black/5 dark:divide-white/10">
              {(isLoading ? Array.from({ length: 4 }) : activity).map((item, i) => (
                <li key={item?.id ?? i} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="text-slate-text dark:text-parchment">
                      {isLoading ? "Loading…" : item.message}
                    </p>
                    {!isLoading && (
                      <p className="text-xs text-slate-muted">{item.actor}</p>
                    )}
                  </div>
                  {!isLoading && (
                    <span className="text-xs text-slate-muted">{item.timeAgo}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
