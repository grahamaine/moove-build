"use client";

import { useState } from "react";
import { WalletBalance } from "./WalletBalance";
import { PaymentLinkForm } from "./PaymentLinkForm";
import { ActivityList } from "./ActivityList";

export function Dashboard() {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="grid w-full gap-6 sm:grid-cols-2">
      <WalletBalance />
      <PaymentLinkForm onCreated={() => setRefreshKey((k) => k + 1)} />
      <div className="sm:col-span-2">
        <ActivityList refreshKey={refreshKey} />
      </div>
    </div>
  );
}
