const chargebee = require("chargebee");

chargebee.configure({
  site: process.env.CHARGEBEE_SITE,
  api_key: process.env.CHARGEBEE_API_KEY,
});

async function updateSubscription(subscriptionId, planId) {
  const result = await chargebee.subscription.update(subscriptionId, {
    plan_id: planId,
  });

  return result.subscription;
}

async function updateUsage(usageId, quantity) {
  const result = await chargebee.usage.update(usageId, {
    quantity,
  });

  return result.usage;
}

module.exports = {
  updateSubscription,
  updateUsage,
};
