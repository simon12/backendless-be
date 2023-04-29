const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const { isAuthenticated } = require("../middleware/auth");

router.get("/", isAuthenticated, teamController.getTeamMembers);
router.post("/invite", isAuthenticated, teamController.inviteTeamMember);

module.exports = router;
