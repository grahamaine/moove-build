import { NextResponse } from "next/server";
import {
  createPaymentLink,
  listPaymentLinks,
  MooveApiError,
  type PaymentLinkRequest,
} from "@/lib/moove";

export async function POST(request: Request) {
  const body = (await request.json()) as PaymentLinkRequest;

  try {
    const link = await createPaymentLink(body);
    return NextResponse.json(link);
  } catch (error) {
    if (error instanceof MooveApiError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") as
    | "active"
    | "inactive"
    | "completed"
    | null;
  const offset = searchParams.get("offset");

  try {
    const links = await listPaymentLinks({
      status: status ?? undefined,
      offset: offset ? Number(offset) : undefined,
    });
    return NextResponse.json(links);
  } catch (error) {
    if (error instanceof MooveApiError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
