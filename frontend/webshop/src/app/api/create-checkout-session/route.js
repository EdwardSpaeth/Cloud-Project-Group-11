import Stripe from "stripe";
import { headers } from 'next/headers';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY in environment variables");
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-10-16", 
});

export async function POST(request) {
  try {
    // Get the request origin for success/cancel URLs
    const headersList = headers();
    const origin = headersList.get('origin') || 'http://localhost:3000';


    const { items } = await request.json();

    if (!items?.length) {
      return new Response(
        JSON.stringify({ error: "Cart is empty" }), 
        { 
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Create line items for Stripe
    const line_items = items.map((item) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          description: item.description || undefined,
          images: item.imageUrl ? [item.imageUrl] : undefined,
        },
        unit_amount: Math.round(parseFloat(item.price) * 100), // convert to cents
      },
      quantity: item.quantity,
    }));

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items,
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cancel`,
      metadata: {
        orderId: `order_${Date.now()}`, // Add custom order ID
      },
      shipping_address_collection: {
        allowed_countries: ['US', 'CA', 'GB', 'DE'], 
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    });

    // Return the session ID to the client
    return new Response(
      JSON.stringify({ sessionId: session.id }), 
      {
        status: 200,
        headers: { 
          "Content-Type": "application/json",
        },
      }
    );

  } catch (error) {
    console.error("Stripe checkout session creation failed:", error);
    
    return new Response(
      JSON.stringify({ 
        error: "Failed to create checkout session",
        details: error.message 
      }), 
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}