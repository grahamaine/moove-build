"use client";

import { useAccount, useBalance } from "wagmi";
import { formatUnits } from "viem";

export function WalletBalance() {
  const { address, chain, isConnected } = useAccount();
  const { data: balance, isLoading } = useBalance({ address });

  if (!isConnected) {
    return (
      <section className="rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
        <h3 className="font-semibold text-black dark:text-zinc-50">
          Wallet balance
        </h3>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
          Connect a wallet to see your balance.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
      <h3 className="font-semibold text-black dark:text-zinc-50">
        Wallet balance
      </h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        {chain?.name ?? "Unknown network"}
      </p>
      <div className="mt-4">
        <span className="text-2xl font-semibold text-black dark:text-zinc-50">
          {isLoading || !balance
            ? "…"
            : `${Number(
                formatUnits(balance.value, balance.decimals),
              ).toLocaleString(undefined, {
                maximumFractionDigits: 6,
              })} ${balance.symbol}`}
        </span>
      </div>
    </section>
  );
}
