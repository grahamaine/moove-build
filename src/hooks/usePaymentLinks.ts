"use client";

import { useEffect, useState } from "react";
import type { PaymentLinkData } from "@/lib/moove";

export function usePaymentLinks(refreshKey: number) {
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

  return { items, error };
}
