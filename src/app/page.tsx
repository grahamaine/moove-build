"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { Sidebar } from "@/components/Sidebar";
import { TopBar } from "@/components/TopBar";
import { Hero } from "@/components/Hero";
import { Dashboard } from "@/components/Dashboard";
import { Footer } from "@/components/Footer";

export default function Home() {
  const { isConnected } = useAccount();
  const [search, setSearch] = useState("");

  return (
    <div className="flex min-h-full flex-1">
      <Sidebar />
      <div className="flex min-h-full flex-1 flex-col">
        <TopBar search={search} onSearchChange={setSearch} />
        <main
          id="top"
          className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8"
        >
          {isConnected ? <Dashboard search={search} /> : <Hero />}
        </main>
        <Footer />
      </div>
    </div>
  );
}
