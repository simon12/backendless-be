const errorHandler = (err, req, res, next) => {
  console.error(err.message, err);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).send(err.message);
  }

  // Handle all other errors
  res.status(500).send("Something went wrong.");
};

module.exports = errorHandler;
