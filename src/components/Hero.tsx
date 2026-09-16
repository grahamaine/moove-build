"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Logo } from "./Logo";

const features = [
  { title: "Multi-chain", copy: "Mainnet, Base, Polygon, Arbitrum & Optimism." },
  { title: "Instant links", copy: "Generate a shareable payment link in seconds." },
  { title: "Non-custodial", copy: "Funds settle straight to your wallet." },
];

export function Hero() {
  return (
    <section className="animate-fade-in-up relative overflow-hidden rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[#0a1830] via-[#123a6b] to-[#1c4f8f] p-8 text-white sm:p-12">
      <div className="bg-network pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative z-10 flex flex-col items-start gap-6">
        <Logo size={56} />
        <div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get paid in crypto,
            <span className="block bg-gradient-to-r from-[#8fe9ff] to-[#4c9bff] bg-clip-text text-transparent">
              across every chain.
            </span>
          </h1>
          <p className="mt-3 max-w-md text-sm text-white/70 sm:text-base">
            Connect your wallet to create shareable payment links, track
            activity, and watch settlement roll in — live.
          </p>
        </div>
        <ConnectButton.Custom>
          {({ openConnectModal, mounted }) => (
            <button
              onClick={openConnectModal}
              disabled={!mounted}
              className="animate-gradient-pan rounded-xl bg-gradient-to-r from-[#4c9bff] via-[#8fe9ff] to-[#4c9bff] px-6 py-3 text-sm font-semibold text-[#0a1830] shadow-lg shadow-blue-500/20 transition-transform hover:scale-[1.03] disabled:opacity-0"
            >
              Connect wallet to get started
            </button>
          )}
        </ConnectButton.Custom>
        <div className="grid w-full gap-4 border-t border-white/10 pt-6 sm:grid-cols-3">
          {features.map((f) => (
            <div key={f.title}>
              <p className="text-sm font-semibold text-[#8fe9ff]">{f.title}</p>
              <p className="mt-1 text-xs text-white/60">{f.copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
