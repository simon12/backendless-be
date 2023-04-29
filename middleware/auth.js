const bcrypt = require("bcrypt");
const { User } = require("../models");
const { generateAuthToken } = require("../utils/helperFunctions");

// ...

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).send("Invalid email or password.");
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).send("Invalid email or password.");
    }

    const token = generateAuthToken(user);
    res.header("x-auth-token", token).send("Logged in successfully.");
  } catch (error) {
    res.status(500).send("Something went wrong.");
  }
};

// ...
