"use client";

import { useState } from "react";
import { WalletBalance } from "./WalletBalance";
import { PaymentLinkForm } from "./PaymentLinkForm";
import { ActivityList } from "./ActivityList";
import { StatsRow } from "./StatsRow";
import { NetworksPanel } from "./NetworksPanel";
import { usePaymentLinks } from "@/hooks/usePaymentLinks";
import { config } from "@/lib/wagmi";

export function Dashboard({ search }: { search: string }) {
  const [refreshKey, setRefreshKey] = useState(0);
  const { items, error } = usePaymentLinks(refreshKey);

  return (
    <div className="flex flex-col gap-6">
      <StatsRow items={items} networkCount={config.chains.length} />
      <div className="grid gap-6 lg:grid-cols-3">
        <div id="wallet">
          <WalletBalance />
        </div>
        <div id="pay">
          <PaymentLinkForm onCreated={() => setRefreshKey((k) => k + 1)} />
        </div>
        <NetworksPanel />
      </div>
      <div id="activity">
        <ActivityList items={items} error={error} search={search} />
      </div>
    </div>
  );
}
