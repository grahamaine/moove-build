"use client";

import { useTheme } from "@/hooks/useTheme";
import { config } from "@/lib/wagmi";

export function Footer() {
  const { theme, toggle } = useTheme();

  return (
    <footer className="sticky bottom-0 z-20 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border)] bg-[var(--surface)]/95 px-4 py-2 text-xs text-[var(--muted)] backdrop-blur">
      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1.5 font-medium text-emerald-500 dark:text-emerald-400">
          <span className="animate-pulse-dot h-2 w-2 rounded-full bg-emerald-400" />
          Live
        </span>
        <span className="hidden sm:inline">Aggregating payment activity</span>
        <span className="hidden md:inline">{config.chains.length} networks</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="hidden sm:inline">Terms</span>
        <span className="hidden sm:inline">Privacy</span>
        <button
          onClick={toggle}
          className="rounded-md border border-[var(--border)] px-2 py-1 font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)]"
        >
          {theme === "dark" ? "Light" : "Dark"} mode
        </button>
      </div>
    </footer>
  );
}
