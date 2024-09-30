import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../../../config.js";
const { EMAIL, PASSWORD, CLIENT_EMAIL, BCC_EMAIL } = config;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendContactEmail = async (name, email, phoneNumber, reason, comments) => {
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
      host: "mail.apranch.org",
      port: 465,
      secure: true, // true for SSL, false for TLS
      auth: {
        user: EMAIL,
        pass: PASSWORD,
      },
    });

    const mailOptions = {
      from: EMAIL,
      to: CLIENT_EMAIL,
      bcc: BCC_EMAIL,
      subject: `Contact Us ${name}`,
      html: formattedEmailTemplate,
    };
    await transporter.sendMail(mailOptions);
    //console.log("Email sent successfully:", info);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
export default sendContactEmail;
