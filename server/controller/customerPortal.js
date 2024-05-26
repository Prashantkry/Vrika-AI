require("dotenv").config();
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);

async function getCustomerPortal(req, res) {
  console.log("create customer called");

  const URL = "https://billing.stripe.com/p/login/test_3cs6rlbZn7093PG9AA";

  const body = await req.body;
  console.log(body);

  const customerId = body.customerId;
  console.log(customerId);

  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: "https://google.com",
  });

  console.log(session);

  res.status(200).json({ paymentResponse: session.url })
  
}

module.exports = { getCustomerPortal };
