const jwt = require("jsonwebtoken");

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      // Add more properties as needed
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return token;
}

module.exports = {
  generateAuthToken,
};
