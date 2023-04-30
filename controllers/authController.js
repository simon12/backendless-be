const passport = require("passport");
const User = require("../models/User");

const { Sequelize } = require("sequelize");

exports.register = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }

    const user = new User({ email, password });
    const savedUser = await user.save();
    console.log("User saved:", savedUser);

    req.login(savedUser, (err) => {
      if (err) {
        console.error("Error logging in after registration:", err);
        return res
          .status(500)
          .json({ message: "Error logging in after registration", error: err });
      }
      return res.status(201).json(savedUser);
    });
  } catch (error) {
    console.error("Error registering user:", error);
    if (error.name === "SequelizeUniqueConstraintError") {
      return res.status(400).json({ message: "Email already in use" });
    } else {
      res.status(500).json({ message: "Error creating user", error });
    }
  }
};

exports.login = async (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Error during authentication", error: err });
    }
    if (!user) {
      return res.status(400).json({ message: info.message });
    }
    req.login(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Error during login", error: err });
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
};

exports.check = async (req, res) => {
  try {
    // req.user should contain the authenticated user's information
    if (req.user) {
      // Return the user data without the password
      const userData = {
        id: req.user.id,
        email: req.user.email,
        createdAt: req.user.createdAt,
        updatedAt: req.user.updatedAt,
      };

      return res.status(200).json(userData);
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ message: "Error checking user", error });
  }
};
