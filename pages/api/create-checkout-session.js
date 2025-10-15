// /api/create-checkout-session.js
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  try {
    // Only POST requests
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }

    const { items, success_url, cancel_url } = req.body;

    // Validate items
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'No items provided for checkout' });
    }

    // Convert items to Stripe line items
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'inr',
        product_data: { name: item.name || 'Unknown Product' },
        unit_amount: Math.max(Math.round(Number(item.price) * 100), 1), // ensure at least 1 paise
      },
      quantity: item.quantity || 1,
    }));

    // Create Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: success_url || `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${req.headers.origin}/cart`,
      metadata: { items: JSON.stringify(items) },
    });

    // Always return JSON
    return res.status(200).json({ sessionId: session.id });

  } catch (error) {
    console.error('Stripe checkout session error:', error);

    // Always respond with JSON, even if Stripe fails or server crashes
    return res.status(error.statusCode || 500).json({
      error: error.message || 'Internal server error',
      type: error.type || 'server_error',
      raw: error.raw || null, // optional Stripe debug info
    });
  }
}
