"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Logo } from "./Logo";

export function TopBar({
  search,
  onSearchChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
}) {
  return (
    <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-[var(--border)] bg-[var(--surface)]/90 px-4 py-3 backdrop-blur sm:gap-4 sm:px-6">
      <div className="md:hidden">
        <Logo size={28} showWordmark={false} />
      </div>
      <div className="relative max-w-sm flex-1">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search payment links…"
          className="w-full rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
        />
      </div>
      <div className="ml-auto">
        <ConnectButton showBalance={false} />
      </div>
    </header>
  );
}
