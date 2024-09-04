import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../../../config.js";
const { EMAIL, PASSWORD } = config;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendContactEmail = async (email, name, phoneNumber, reason, comments) => {
  try {
    const templatePath = path.join(
      __dirname,
      "../../templates/contactEmail.html"
    );
    const emailTemplate = fs.readFileSync(templatePath, "utf-8");

    const formattedEmailTemplate = emailTemplate
      .replace("{{name}}", name)
      .replace("{{email}}", email)
      .replace("{{phoneNumber}}", phoneNumber)
      .replace("{{reason}}", reason)
      .replace("{{comments}}", comments);

    const transporter = nodemailer.createTransport({
      //service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true, // true for SSL, false for TLS
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });
    // let transporter = nodemailer.createTransport({
    //   host: emailInfo.host, // Custom SMTP host (e.g., smtp.yourdomain.com)
    //   port: emailInfo.port, // Typically 465 for SSL or 587 for TLS
    //   secure: emailInfo.secure, // true for SSL, false for TLS
    //   auth: {
    //     user: emailInfo.emailId, // Your email address
    //     pass: emailInfo.password, // Your email password
    //   },
    // });
    const mailOptions = {
      from: EMAIL,
      to: EMAIL,
      subject: "Contact Us",
      html: formattedEmailTemplate,
      // text: `Please click the following link to verify your email:
      //          ${verificationLink}`,
    };
    const info = await transporter.sendMail(mailOptions);
    //console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendContactEmail;
