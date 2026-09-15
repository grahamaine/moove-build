"use client";

import { useEffect, useState } from "react";
import type { PaymentLinkData } from "@/lib/moove";

const statusStyle: Record<PaymentLinkData["status"], string> = {
  active: "text-emerald-600 dark:text-emerald-400",
  completed: "text-zinc-500 dark:text-zinc-400",
  inactive: "text-red-600 dark:text-red-400",
};

export function ActivityList({ refreshKey }: { refreshKey: number }) {
  const [items, setItems] = useState<PaymentLinkData[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/payment-link")
      .then(async (response) => {
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.errors?.[0]?.message ?? "Request failed");
        }
        return body as { data: PaymentLinkData[] };
      })
      .then((body) => {
        if (!cancelled) {
          setItems(body.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (!cancelled) setError((err as Error).message);
      });
    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  return (
    <section className="rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
      <h3 className="font-semibold text-black dark:text-zinc-50">Activity</h3>
      {error ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-400">
          Could not load payment links: {error}
        </p>
      ) : items === null ? (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Loading…
        </p>
      ) : items.length === 0 ? (
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          No payment links yet — create one above.
        </p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {items.map((link) => (
            <li
              key={link.id}
              className="flex items-center justify-between gap-3 text-sm"
            >
              <div className="min-w-0">
                <p className="truncate text-black dark:text-zinc-50">
                  {link.toAmount} {link.token.symbol}
                  {link.description ? ` — ${link.description}` : ""}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {new Date(link.dateCreated).toLocaleString()}
                </p>
              </div>
              <div className="flex shrink-0 items-center gap-3">
                <span className={statusStyle[link.status]}>
                  {link.status}
                </span>
                {link.transactionUrl ? (
                  <a
                    href={link.transactionUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-zinc-500 dark:text-zinc-400"
                  >
                    view tx
                  </a>
                ) : (
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline text-zinc-500 dark:text-zinc-400"
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
