import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import config from "../../../config.js";

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
      service: "gmail",
      auth: {
        user: "sanjaynabha7@gmail.com",
        pass: "tmdg most tkdh jygo",
      },
    });
    const mailOptions = {
      from: "sanjaynabha7@gmail.com",
      to: "sanjaynabha7@gmail.com",
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
