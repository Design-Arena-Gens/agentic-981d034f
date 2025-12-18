import { NextResponse } from "next/server";
import { z } from "zod";

import { safeGetStripe } from "../../../lib/stripe";

const bodySchema = z.object({
  priceId: z.string(),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export async function POST(req: Request) {
  try {
    const payload = bodySchema.parse(await req.json());
    const stripe = safeGetStripe();
    if (!stripe) {
      return NextResponse.json(
        {
          status: "error",
          message: "Stripe is not configured",
        },
        { status: 503 },
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [{ price: payload.priceId, quantity: 1 }],
      mode: "subscription",
      success_url: payload.successUrl,
      cancel_url: payload.cancelUrl,
    });

    return NextResponse.json({ status: "ok", url: session.url });
  } catch (error) {
    console.error("Checkout error", error);
    const message = error instanceof Error ? error.message : "Unexpected error";
    return NextResponse.json({ status: "error", message }, { status: 500 });
  }
}
