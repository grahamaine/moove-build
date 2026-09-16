"use client";

import { useState } from "react";
import { useAsyncAction } from "@/hooks/useAsyncAction";
import { StatusLine } from "./StatusLine";
import type { PaymentLinkCreationData } from "@/lib/moove";

export function PaymentLinkForm({ onCreated }: { onCreated: () => void }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [maxUsage, setMaxUsage] = useState("1");
  const [created, setCreated] = useState<PaymentLinkCreationData | null>(null);
  const [copied, setCopied] = useState(false);
  const action = useAsyncAction();

  const copyLink = () => {
    if (!created) return;
    navigator.clipboard.writeText(created.url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const submit = () => {
    action
      .run("Creating payment link", async () => {
        const response = await fetch("/api/payment-link", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            toAmount: amount,
            description: description || null,
            maxUsage: maxUsage ? Number(maxUsage) : null,
          }),
        });
        const body = await response.json();
        if (!response.ok) {
          throw new Error(body.errors?.[0]?.message ?? "Request failed");
        }
        return body as PaymentLinkCreationData;
      })
      .then((result) => {
        if (!result) return;
        setCreated(result);
        setAmount("");
        setDescription("");
        onCreated();
      });
  };

  return (
    <section className="card-hover animate-fade-in-up h-full rounded-xl border border-[var(--border)] bg-[var(--surface)] p-6">
      <h3 className="font-semibold text-[var(--foreground)]">
        Request a payment
      </h3>
      <p className="mt-1 text-sm text-[var(--muted)]">
        Create a Moove payment link — settles to your default wallet.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <input
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          placeholder="Amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm text-[var(--foreground)] outline-none transition-colors placeholder:text-[var(--muted)] focus:border-[var(--accent)]"
          placeholder="Max usage"
          inputMode="numeric"
          value={maxUsage}
          onChange={(e) => setMaxUsage(e.target.value)}
        />
        <button
          className="rounded-lg bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.01] hover:bg-[var(--accent-2)] disabled:opacity-50 disabled:hover:scale-100"
          disabled={action.busy || !Number(amount)}
          onClick={submit}
        >
          Create link
        </button>
      </div>
      <StatusLine status={action.status} />
      {created && (
        <div className="animate-fade-in-up mt-4 flex items-center gap-3 rounded-lg bg-[var(--surface-2)] p-3 text-sm">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(created.url)}`}
            alt="Payment link QR code"
            width={72}
            height={72}
            className="shrink-0 rounded-md border border-[var(--border)] bg-white p-1"
          />
          <div className="min-w-0">
            <a
              href={created.url}
              target="_blank"
              rel="noreferrer"
              className="block truncate font-medium text-[var(--foreground)] underline"
            >
              {created.url}
            </a>
            <button
              className="mt-1 text-xs font-medium text-[var(--accent-2)] underline"
              onClick={copyLink}
            >
              {copied ? "Copied ✓" : "Copy link"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
