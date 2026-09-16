"use client";

import type { PaymentLinkData } from "@/lib/moove";

const statusStyle: Record<PaymentLinkData["status"], string> = {
  active: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  completed: "bg-[var(--surface-2)] text-[var(--muted)]",
  inactive: "bg-red-500/15 text-red-600 dark:text-red-400",
};

export function ActivityList({
  items,
  error,
  search,
}: {
  items: PaymentLinkData[] | null;
  error: string | null;
  search: string;
}) {
  const filtered = items?.filter((link) => {
    if (!search.trim()) return true;
    const q = search.trim().toLowerCase();
    return (
      link.description?.toLowerCase().includes(q) ||
      link.token.symbol.toLowerCase().includes(q) ||
      link.toAmount.toLowerCase().includes(q)
    );
  });

  return (
    <section className="card-hover animate-fade-in-up rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="font-semibold text-[var(--foreground)]">Activity</h3>
      {error ? (
        <p className="mt-2 text-sm text-red-500">
          Could not load payment links: {error}
        </p>
      ) : items === null ? (
        <p className="mt-2 text-sm text-[var(--muted)]">Loading…</p>
      ) : filtered && filtered.length === 0 ? (
        <p className="mt-2 text-sm text-[var(--muted)]">
          {search.trim()
            ? "No payment links match your search."
            : "No payment links yet — create one above."}
        </p>
      ) : (
        <ul className="mt-4 flex flex-col divide-y divide-[var(--border)]">
          {filtered?.map((link, i) => (
            <li
              key={link.id}
              className="animate-fade-in-up flex items-center justify-between gap-3 py-3 text-sm first:pt-0 last:pb-0"
              style={{ animationDelay: `${Math.min(i, 8) * 40}ms` }}
            >
              <div className="min-w-0">
                <p className="truncate font-medium text-[var(--foreground)]">
                  {link.toAmount} {link.token.symbol}
                  {link.description ? ` — ${link.description}` : ""}
                </p>
                <p className="text-xs text-[var(--muted)]">
                  {new Date(link.dateCreated).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span
                  className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${statusStyle[link.status]}`}
                >
                  {link.status === "active" && (
                    <span className="animate-pulse-dot h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  )}
                  {link.status}
                </span>
                {link.transactionUrl ? (
                  <a
                    href={link.transactionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--muted)] underline hover:text-[var(--accent-2)]"
                  >
                    view tx
                  </a>
                ) : (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[var(--muted)] underline hover:text-[var(--accent-2)]"
                  >
                    open
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
