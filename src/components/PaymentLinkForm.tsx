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
    <section className="rounded-xl border border-black/[.08] p-6 dark:border-white/[.145]">
      <h3 className="font-semibold text-black dark:text-zinc-50">
        Request a payment
      </h3>
      <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
        Create a Moove payment link — settles to your default wallet.
      </p>
      <div className="mt-4 flex flex-col gap-3">
        <input
          className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/[.145] dark:focus:border-white/30"
          placeholder="Amount"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/[.145] dark:focus:border-white/30"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          className="rounded-lg border border-black/[.08] bg-transparent px-3 py-2 text-sm outline-none focus:border-black/30 dark:border-white/[.145] dark:focus:border-white/30"
          placeholder="Max usage"
          inputMode="numeric"
          value={maxUsage}
          onChange={(e) => setMaxUsage(e.target.value)}
        />
        <button
          className="rounded-lg bg-foreground px-4 py-2 text-sm font-medium text-background transition-colors hover:bg-[#383838] disabled:opacity-50 dark:hover:bg-[#ccc]"
          disabled={action.busy || !Number(amount)}
          onClick={submit}
        >
          Create link
        </button>
      </div>
      <StatusLine status={action.status} />
      {created && (
        <div className="mt-4 rounded-lg bg-black/[.04] p-3 text-sm dark:bg-white/[.06]">
          <a
            href={created.url}
            target="_blank"
            rel="noreferrer"
            className="break-all font-medium text-black underline dark:text-zinc-50"
          >
            {created.url}
          </a>
          <button
            className="ml-2 text-zinc-500 underline dark:text-zinc-400"
            onClick={copyLink}
          >
            {copied ? "Copied ✓" : "Copy"}
          </button>
        </div>
      )}
    </section>
  );
}
