const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
require("dotenv").config();

const { Clerk } = require("@clerk/clerk-sdk-node");
const clerk = new Clerk(process.env.CLERK_API_KEY);

// Import custom configurations
const dbConfig = require("./config/database");

// Import config file
const config = require("./config");

// Import routes
const indexRoutes = require("./routes/index");
const endpointsRoutes = require("./routes/endpoints");
const apiKeysRoutes = require("./routes/apiKeys");

// Import middleware
const authMiddleware = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler");

// Initialize the express application
const app = express();

// Connect to the DB
const { connect } = require("./config/database");
connect();

const corsOptions = {
  origin: "http://localhost:3000", // Replace this with your frontend origin
  credentials: true, // Allow sending cookies with the request
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Origin",
    "Accept",
    "X-Requested-With",
  ],
};

// Middleware setup
app.use(cors(corsOptions));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan("dev"));

const customRoutes = require("./routes/custom");

const webhookRoutes = require("./routes/webhookRoutes");
// Other routes and middleware
app.use("/webhooks", webhookRoutes);

// Set up routes
app.use("/", indexRoutes);
app.use("/custom", customRoutes);

const { clerkAuth } = require("./middleware/auth");

// Use the auth middleware for protected routes
app.use("/endpoints", clerkAuth, endpointsRoutes);
app.use("/api-keys", clerkAuth, apiKeysRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

module.exports = app;
