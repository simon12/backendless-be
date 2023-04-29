const { User, Team } = require("../models");
const emailService = require("../services/emailService");

exports.getTeamMembers = async (req, res) => {
  try {
    const teamMembers = await Team.findAll({ where: { ownerId: req.user.id } });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching team members", error });
  }
};

exports.inviteTeamMember = async (req, res) => {
  try {
    const { email } = req.body;

    // Send invitation email
    emailService.sendTeamInvitation(email, req.user.email);

    // Create a new team member
    const teamMember = await Team.create({ email, ownerId: req.user.id });

    res.status(201).json(teamMember);
  } catch (error) {
    res.status(500).json({ message: "Error inviting team member", error });
  }
};
