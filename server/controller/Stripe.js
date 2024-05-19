require("dotenv").config();
const stripeKey = process.env.STRIPE_SECRET_KEY;
const stripe = require("stripe")(stripeKey);
const { MongoClient } = require("mongodb");
const uri = process.env.MONGO_URL;

// TODO add email or userId so that product details can be obtained
const handleWebhook = async (req, res) => {
  const EmailId = req.headers["emailid_"];
  // console.log('emailId -> ',EmailId)
  console.log("webhook triggered");
  // Handle the event
  const WebhookEvent = await req.body;
  // console.log("WebhookEvent -> ", WebhookEvent);
  switch (WebhookEvent.type) {
    case "payment_intent.succeeded":
      // console.log("PaymentIntent was successful!");
      const paymentIntentSucceeded = WebhookEvent.data.object;
      // console.log(paymentIntentSucceeded);
      break;
    case "checkout.session.completed":
      console.log("Checkout Session Completed");
      const checkOutCompleteData = WebhookEvent.data.object;
      // console.log("check Out Complete Data - ", checkOutCompleteData);
      const checkOutCompleteId = checkOutCompleteData.id;
      // console.log("checkOutCompleteId -> ", checkOutCompleteId);

      const client_reference_id = checkOutCompleteData.client_reference_id;
      console.log("client_reference_id -> ", client_reference_id);

      const customerId = checkOutCompleteData.customer;
      console.log("customerId -> ", customerId);
      // const client_reference_id = checkOutCompleteData.client_reference_id;
      // console.log('client_reference_id -> ', client_reference_id);
      const subscriptionId = checkOutCompleteData.subscription;
      console.log("subscriptionId -> ", subscriptionId);

      // get subscriptions details
      const subscription = await stripe.subscriptions.retrieve(subscriptionId);
      // console.log("subscription --->> ", subscription);

      // get products details ||  line items
      const lineItems = await stripe.checkout.sessions.listLineItems(
        checkOutCompleteId
      );

      // adding payment data to mongo db
      const client = await MongoClient.connect(uri);
      const subscriptionCollection = await client
        .db("VrikaAI")
        .collection("paymentSubscriptionsStripe");
      const insertData = await subscriptionCollection.insertOne({
        "checkOutCompleteData -> ": checkOutCompleteData,
        "subscription -> ": subscription,
        "lineItems => ": lineItems,
      });

      // updating credits and product details to mongo db of user profile
      const userCollection = await client
        .db("VrikaAI")
        .collection("userdetails");

      const updateFilter = { UserId: client_reference_id };
      console.log("updateFilter", updateFilter);

      const iterationPeriod = lineItems.data[0].price.recurring.interval;
      let updateData;

      let startDate = subscription.current_period_start;
      let endDate = subscription.current_period_end;
      const purchaseDate = new Date().toISOString(startDate);
      console.log(purchaseDate);
      const expiryDate = new Date().toISOString(endDate);
      let amount = subscription.plan.amount;

      if (iterationPeriod === "month") {
        updateData = {
          $set: {
            "Subscription.product": lineItems.data[0].description + " Monthly",
            "Subscription.status": subscription.plan.active,
            "Subscription.purchaseDate": purchaseDate,
            "Subscription.expiryDate": expiryDate,
            "Subscription.token": 10,
            "Subscription.amount": amount,
          },
        };
      }
      if (iterationPeriod === "year") {
        updateData = {
          $set: {
            "Subscription.product": lineItems.data[0].description + " Yearly",
            "Subscription.status": subscription.plan.active,
            "Subscription.purchaseDate": purchaseDate,
            "Subscription.expiryDate": expiryDate,
            "Subscription.token": 100,
            "Subscription.amount": amount,
          },
        };
      }
      console.log("updateData -> ", updateData);
      const updatedData = await userCollection.updateOne(
        updateFilter,
        updateData
      );
      console.log("updatedData => ", updatedData);

      break;
    default:
    // console.log(`Unhandled event type ${WebhookEvent.type}`);
  }
  // console.log(`Unhandled event type ${WebhookEvent.type}`);
  res.send();
};
module.exports = { handleWebhook };
