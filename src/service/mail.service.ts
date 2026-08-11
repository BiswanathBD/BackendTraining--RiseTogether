import { env } from "../config/env.js";
import { transporter } from "../config/transporter.js";

interface IMail {
  to: string;
  subject: string;
  html: string;
}

export const sendMail = async ({ to, subject, html }: IMail) => {
  return await transporter.sendMail({
    from: env.SMTP_FROM,
    to: to,
    subject: subject,
    html: html,
  });
};
