"use client";

import { useState } from "react";
import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

export function WalletBalance() {
  const { address, chain, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <section className="card-hover animate-fade-in-up h-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="font-semibold text-[var(--foreground)]">Wallet balance</h3>
      {!isConnected ? (
        <p className="mt-2 text-sm text-[var(--muted)]">
          Connect a wallet to see your balance.
        </p>
      ) : (
        <>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            {chain?.name ?? "Unknown network"}
          </p>
          <div className="mt-4">
            <span className="text-2xl font-bold text-[var(--foreground)]">
              {isLoading || !balance
                ? "…"
                : `${Number(
                    formatUnits(balance.value, balance.decimals),
                  ).toLocaleString(undefined, {
                    maximumFractionDigits: 6,
                  })} ${balance.symbol}`}
            </span>
          </div>
          {address && (
            <button
              onClick={copyAddress}
              className="mt-3 rounded-lg bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--muted)] transition-colors hover:text-[var(--accent-2)]"
            >
              {copied ? "Copied ✓" : `${address.slice(0, 6)}…${address.slice(-4)}`}
            </button>
          )}
        </>
      )}
    </section>
  );
}
