import nodemailer from 'nodemailer';
import environment from '../../config/environment';
import { EmailTemplate } from '../constants/emails';

const getTransporter = () => {
  try {
    return nodemailer.createTransport({
      service: environment.MAIL_SERVICE,
      auth: {
        user: environment.MAIL_LOGIN_USER,
        pass: environment.MAIL_LOGIN_PASS,
      },
    });
  } catch (error) {
    console.error(error);
  }
};

export const sendMail = async (to: string, template: EmailTemplate) => {
  const transporter = getTransporter();

  try {
    var mailOptions = {
      from: environment.MAIL_FROM,
      replyTo: environment.MAIL_REPLY_TO,
      to,
      ...template,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.log(error);
  }
};
