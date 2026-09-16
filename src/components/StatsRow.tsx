"use client";

import { useCountUp } from "@/hooks/useCountUp";
import type { PaymentLinkData } from "@/lib/moove";

function Stat({
  label,
  value,
  accent,
  delay,
}: {
  label: string;
  value: number;
  accent?: boolean;
  delay: number;
}) {
  const animated = useCountUp(value);
  return (
    <div
      className="card-hover animate-fade-in-up rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-xs uppercase tracking-wider text-[var(--muted)]">
        {label}
      </p>
      <p
        className={`mt-1 text-2xl font-bold ${
          accent ? "text-[var(--accent-2)]" : "text-[var(--foreground)]"
        }`}
      >
        {animated.toLocaleString()}
      </p>
    </div>
  );
}

export function StatsRow({
  items,
  networkCount,
}: {
  items: PaymentLinkData[] | null;
  networkCount: number;
}) {
  const total = items?.length ?? 0;
  const active = items?.filter((i) => i.status === "active").length ?? 0;
  const completed = items?.filter((i) => i.status === "completed").length ?? 0;

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      <Stat label="Payment links" value={total} delay={0} />
      <Stat label="Active" value={active} accent delay={80} />
      <Stat label="Completed" value={completed} delay={160} />
      <Stat label="Networks" value={networkCount} delay={240} />
    </div>
  );
}
