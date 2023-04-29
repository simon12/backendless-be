const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendTeamInvitation(inviteeEmail, inviterEmail) {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: inviteeEmail,
    subject: "Team Invitation",
    text: `You have been invited to join the team by ${inviterEmail}. Please follow the link to accept the invitation.`,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = {
  sendTeamInvitation,
};
