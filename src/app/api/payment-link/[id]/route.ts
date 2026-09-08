import { NextResponse } from "next/server";
import { getPaymentLink, MooveApiError } from "@/lib/moove";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  try {
    const link = await getPaymentLink(id);
    return NextResponse.json(link);
  } catch (error) {
    if (error instanceof MooveApiError) {
      return NextResponse.json(error.body, { status: error.status });
    }
    throw error;
  }
}
