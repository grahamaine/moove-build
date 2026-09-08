# Moove Build

A Web3 dApp scaffold for Moove, built with Next.js, wagmi, viem, and RainbowKit.

## Getting started

1. Copy the env example and add a [WalletConnect Cloud](https://cloud.walletconnect.com/) project ID:

```bash
cp .env.local.example .env.local
```

2. Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## Deploying

This project includes a `vercel.json` config. Import the repo at [vercel.com/new](https://vercel.com/new) and set the `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` environment variable in the project settings.
