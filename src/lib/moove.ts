const MOOVE_API_BASE = "https://api.moove.xyz";

export interface ApiErrorDetail {
  message: string;
  code: string;
}

export interface ApiErrorResponse {
  errors: ApiErrorDetail[];
}

export class MooveApiError extends Error {
  constructor(
    public status: number,
    public body: ApiErrorResponse,
  ) {
    super(body.errors[0]?.message ?? `Moove API error (${status})`);
    this.name = "MooveApiError";
  }
}

export interface PaymentLinkRequest {
  /** Denominated in the settlement token of the caller's default wallet. */
  toAmount: number | string;
  /** Shown to the payer on the checkout page. Max 500 chars. */
  description?: string | null;
  /** How many payments the link accepts before it completes. Unlimited when omitted. */
  maxUsage?: number | null;
  /** ISO 8601 timestamp in the future. Never expires when omitted. */
  expirationDate?: string | null;
}

export interface PaymentLinkCreationData {
  id: string;
  url: string;
}

export interface ChainData {
  id: string;
  name: string;
  symbol: string;
  chainType: "EVM" | "SVM" | "TVM" | "BVM";
  logo: string;
}

export interface TokenData {
  address: string;
  decimals: number;
  symbol: string;
  name: string;
  logo: string | null;
  isNative: boolean | null;
  isStablecoin: boolean | null;
  currencyCode: string | null;
  commodityCode: string | null;
  chain: ChainData;
  priceUsd: string | null;
  isVerified: boolean | null;
}

export interface PaymentLinkData {
  id: string;
  userId: string;
  toAmount: string;
  destinationAddress: string;
  url: string;
  dateCreated: string;
  token: TokenData;
  status: "active" | "completed" | "inactive";
  description: string | null;
  maxUsage: number | null;
  receivedAmount: string | null;
  expirationDate: string | null;
  transactionUrl: string | null;
}

export interface PaginatedPaymentLinks {
  data: PaymentLinkData[];
  limit: number;
  offset: number;
  nextOffset: number | null;
}

export interface UserWalletData {
  walletAddress: string;
  token: { id: string; token: TokenData };
  provider: string;
  chainType: ChainData["chainType"];
  isDefault: boolean;
  isChainDefault: boolean;
  wallets: unknown[] | null;
}

export interface UserData {
  id: string;
  handle: string;
  username: string;
  dateCreated: string;
  bio: string | null;
  profileImage: string | null;
  backgroundImage: string | null;
  backgroundColour: string | null;
  links: unknown[];
  isMooveUser: boolean;
  contact: unknown | null;
  badges: unknown | null;
  wallet: UserWalletData;
}

export interface PaymentLinkDetail extends PaymentLinkData {
  user: UserData;
}

function getApiKey(): string {
  const apiKey = process.env.MOOVE_API_KEY;
  if (!apiKey) {
    throw new Error("MOOVE_API_KEY is not set");
  }
  return apiKey;
}

async function mooveFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${MOOVE_API_BASE}${path}`, {
    ...init,
    headers: {
      "X-API-Key": getApiKey(),
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => ({
      errors: [{ message: response.statusText, code: "unknown" }],
    }))) as ApiErrorResponse;
    throw new MooveApiError(response.status, body);
  }

  return response.json() as Promise<T>;
}

/** Requires the `payment_link:create` scope on the API key. */
export function createPaymentLink(
  request: PaymentLinkRequest,
): Promise<PaymentLinkCreationData> {
  return mooveFetch<PaymentLinkCreationData>("/v1/payment-link", {
    method: "POST",
    body: JSON.stringify(request),
  });
}

/** Requires the `payment_link:read` scope on the API key. */
export function listPaymentLinks(params?: {
  status?: "active" | "inactive" | "completed";
  offset?: number;
}): Promise<PaginatedPaymentLinks> {
  const query = new URLSearchParams();
  if (params?.status) query.set("status", params.status);
  if (params?.offset) query.set("offset", String(params.offset));
  const queryString = query.toString();

  return mooveFetch<PaginatedPaymentLinks>(
    `/v1/payment-link${queryString ? `?${queryString}` : ""}`,
  );
}

/** Public endpoint, no API key required — safe to call from anywhere a payer might land. */
export async function getPaymentLink(id: string): Promise<PaymentLinkDetail> {
  const response = await fetch(
    `${MOOVE_API_BASE}/v1/payment-link/${encodeURIComponent(id)}`,
  );

  if (!response.ok) {
    const body = (await response.json().catch(() => ({
      errors: [{ message: response.statusText, code: "unknown" }],
    }))) as ApiErrorResponse;
    throw new MooveApiError(response.status, body);
  }

  return response.json() as Promise<PaymentLinkDetail>;
}
