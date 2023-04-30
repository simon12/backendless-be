const { User } = require("../models");

const handleClerkWebhook = async (req, res) => {
  const eventType = req.body.type;
  const eventData = req.body.data;

  if (eventType === "user.created") {
    try {
      const user = await User.create({
        email: eventData.email_addresses[0].email_address,
      });

      console.log("User created:", user);
      res.status(200).send("User created");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user");
    }
  } else {
    res.status(200).send("Unhandled event type");
  }
};

module.exports = {
  handleClerkWebhook,
};
