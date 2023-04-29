const express = require("express");
const router = express.Router();
const teamController = require("../controllers/teamController");
const authMiddleware = require("../middleware/auth");

router.get("/", teamController.getTeamMembers);
router.post("/invite", teamController.inviteTeamMember);

module.exports = router;
