"use client";

import { useAccount } from "wagmi";
import { config } from "@/lib/wagmi";

const chainColors: Record<number, string> = {
  1: "#627eea",
  137: "#8247e5",
  8453: "#0052ff",
  42161: "#28a0f0",
  10: "#ff0420",
};

export function NetworksPanel() {
  const { chain } = useAccount();

  return (
    <section className="card-hover animate-fade-in-up h-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="font-semibold text-[var(--foreground)]">
        Supported networks
      </h3>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Moove settles across every chain below.
      </p>
      <ul className="mt-4 flex flex-col gap-1.5">
        {config.chains.map((c) => (
          <li
            key={c.id}
            className="flex items-center justify-between rounded-lg px-2 py-1.5 transition-colors hover:bg-[var(--surface-2)]"
          >
            <div className="flex items-center gap-3">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: chainColors[c.id] ?? "#4c9bff" }}
              />
              <span className="text-sm font-medium text-[var(--foreground)]">
                {c.name}
              </span>
              {chain?.id === c.id && (
                <span className="rounded-full bg-[var(--accent)]/15 px-2 py-0.5 text-[10px] font-medium text-[var(--accent-2)]">
                  connected
                </span>
              )}
            </div>
            <span className="text-xs text-[var(--muted)]">
              {c.nativeCurrency.symbol}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
