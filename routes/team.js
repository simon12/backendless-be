const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middleware/auth");

router.get("/", authMiddleware, teamController.getTeamMembers);
router.post("/invite", authMiddleware, teamController.inviteMember);

module.exports = router;
