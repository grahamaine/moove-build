import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // wagmi's default connectors pull in @coinbase/cdp-sdk, which has optional
  // dynamic imports (e.g. "@x402/svm/exact/client") for packages we don't
  // install. Marking it external keeps Next from trying to statically
  // resolve those at build time — they're only ever hit if that codepath
  // actually runs, which our app never does.
  serverExternalPackages: ["@coinbase/cdp-sdk"],
};

export default nextConfig;
