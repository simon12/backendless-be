const express = require("express");
const cors = require("cors");
const passport = require("passport");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");

// Import custom configurations
const dbConfig = require("./config/db");

// Import config file
const config = require("./config");

// Import routes
const indexRoutes = require("./routes/index");
const authRoutes = require("./routes/auth");
const endpointsRoutes = require("./routes/endpoints");
const apiKeysRoutes = require("./routes/apiKeys");
const subscriptionRoutes = require("./routes/subscription");
const teamRoutes = require("./routes/team");
const usageRoutes = require("./routes/usage");

// Import middleware
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

// Initialize the express application
const app = express();

// Connect to the DB
const { connect } = require("./config/db");
connect();

// Middleware setup
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(morgan("dev"));

const customRoutes = require("./routes/custom");

// Set up routes
app.use("/", indexRoutes);
app.use("/auth", authRoutes);
app.use("/custom", customRoutes);

// Use the auth middleware for protected routes
app.use("/endpoints", authMiddleware, endpointsRoutes);
app.use("/api-keys", authMiddleware, apiKeysRoutes);
app.use("/subscription", authMiddleware, subscriptionRoutes);
app.use("/team", authMiddleware, teamRoutes);
app.use("/usage", authMiddleware, usageRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
