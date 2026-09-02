// src/pages/Donators.jsx
import { HandCoins } from "lucide-react";
import EmptyState from "../components/ui/EmptyState";
import { useDonators } from "../hooks/useDonators";

const STATUS_STYLES = {
  completed: "bg-forest/10 text-forest",
  pending: "bg-gold/10 text-gold-muted",
  failed: "bg-brick/10 text-brick",
};

function formatCurrency(amount) {
  return new Intl.NumberFormat("en-NG", { style: "currency", currency: "NGN" }).format(amount);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString(undefined, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function Donators() {
  const { data: donators, isLoading } = useDonators();

  const totalRaised = (donators || [])
    .filter((d) => d.status === "success")
    .reduce((sum, d) => sum + Number(d.amount || 0), 0);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-slate-muted">
          {donators?.length ?? 0} donation record{donators?.length === 1 ? "" : "s"} &middot; read-only
        </p>
        <div className="rounded-card border border-black/5 bg-parchment-card px-4 py-2 text-sm dark:border-white/10 dark:bg-ink-light">
          <span className="text-slate-muted">Total raised: </span>
          <span className="font-display font-semibold text-slate-text dark:text-parchment">
            {formatCurrency(totalRaised)}
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-card border border-black/5 dark:border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-black/[0.02] text-xs uppercase tracking-wide text-slate-muted dark:bg-white/[0.03]">
            <tr>
              <th className="px-4 py-3 font-medium">Donor Name</th>
              <th className="px-4 py-3 font-medium">Amount</th>
              <th className="px-4 py-3 font-medium">Date</th>
              <th className="px-4 py-3 font-medium">Payment Reference</th>
              <th className="px-4 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-parchment-card dark:divide-white/10 dark:bg-ink-light">
            {isLoading &&
              Array.from({ length: 4 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-4 py-4" colSpan={5}>
                    <div className="h-4 w-full animate-pulse rounded bg-black/5 dark:bg-white/10" />
                  </td>
                </tr>
              ))}

            {!isLoading &&
              donators?.map((donor) => (
                <tr key={donor._id}>
                  <td className="px-4 py-3 font-medium text-slate-text dark:text-parchment">
                    {donor.donorfName + "" + donor.donorlName}
                  </td>
                  <td className="px-4 py-3 text-slate-text dark:text-parchment">
                    {formatCurrency(donor.amount)}
                  </td>
                  <td className="px-4 py-3 text-slate-muted">{formatDate(donor.createdAt)}</td>
                  <td className="px-4 py-3 font-mono text-xs text-slate-muted">{donor.reference}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                        STATUS_STYLES[donor.status] || STATUS_STYLES.pending
                      }`}
                    >
                      {donor.status}
                    </span>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>

        {!isLoading && donators?.length === 0 && (
          <div className="p-2">
            <EmptyState
              icon={HandCoins}
              title="No donations recorded"
              description="Completed and pending donations will appear here automatically."
            />
          </div>
        )}
      </div>
    </div>
  );
}
