const { Clerk } = require("@clerk/clerk-sdk-node");

const clerk = new Clerk(process.env.CLERK_API_KEY);

const clerkAuth = async (req, res, next) => {
  try {
    const sessionToken = req.headers.authorization?.replace("Bearer ", "");
    if (!sessionToken) {
      throw new Error("Unauthorized");
    }

    const session = await clerk.sessions.verify(sessionToken);
    const userId = session.user_id;
    req.user = await clerk.users.getUser(userId);
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};

module.exports = {
  clerkAuth,
};
