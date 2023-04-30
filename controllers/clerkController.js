const User = require("../models/User");

exports.handleWebhook = async (req, res) => {
  const { type, data } = req.body;

  if (type === "user.created") {
    const { id, email } = data.object;

    try {
      await User.create({ id, email });
      res.status(200).send("User created successfully.");
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).send("Error creating user.");
    }
  } else {
    res.status(400).send("Unhandled event type.");
  }
};
