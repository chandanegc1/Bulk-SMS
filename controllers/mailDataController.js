import { sendEmailToEmployee } from "../utils/sendEmail.js";

export const getEmailData = async (req, res) => {
  try {
    const { emailData, senderEmail } = req.body;

    if (!emailData || !senderEmail) {
      return res.status(400).json({ msg: "Missing required fields!" });
    }

    if (!Array.isArray(emailData) || emailData.length === 0) {
      return res.status(400).json({ msg: "Invalid or empty userData array!" });
    }

    const sendEmailsPromise = emailData.map(async (item, index) => {
      if (!item.email) {
        console.error(`Missing email for user at index ${index}`);
        return false;
      }

      return await sendEmailToEmployee(
        senderEmail,
        item.email,
        item.subject,
        item.msg,
        req.user.email_secret 
      );
    });

    const emailResults = await Promise.all(sendEmailsPromise);

    const successCount = emailResults.filter(
      (result) => result === true
    ).length;
    const failedCount = emailResults.length - successCount;

    res.status(200).json({
      msg: `Emails sent: ${successCount} successful, ${failedCount} failed.`,
    });
  } catch (error) {
    console.error("Error in getEmailData:", error.message);
    res.status(500).json({
      msg: "Internal server error. Please try again later.",
      error: error.message,
    });
  }
};
