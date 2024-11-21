import nodemailer from "nodemailer";

import ejs from "ejs";
import { ENV } from "../config/config";
import logger from "../config/logger";
import path from "path";

const transport = nodemailer.createTransport(ENV.email.smtp);

if (ENV.APP.ENV !== "test") {
  transport
    .verify()
    .then(() => logger.info("Connected to email server"))
    .catch(() =>
      logger.warn(
        "Unable to connect to email server. Make sure you have configured the SMTP options in .env"
      )
    );
}

const sendEmail = async (to: string, subject: string, html: string) => {
  const msg = { from: ENV.email.from, to, subject, html };

  await transport.sendMail(msg);
};

interface ISendRegistrationCompleted {
  subject: string;
  validationLink: string;
}

const sendRegistrationCompleted = async (
  to: string,
  emailObj: ISendRegistrationCompleted
) => {
  const { subject, validationLink } = emailObj;
  const obj = { to, validationLink };
  ejs.renderFile(
    path.join(__dirname, "..", "templates/email/", "registration-template.ejs"),
    obj,
    async (err, data) => {
      if (err) {
        throw err;
      }
      const msg = { from: `TSP ${ENV.email.from}`, to, subject, html: data };

      await transport.sendMail(msg);
    }
  );
};

export { sendEmail, sendRegistrationCompleted };
