require('dotenv').config()

export default {
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_SECRET_ACCOUNT_VALIDATION: process.env.JWT_SECRET_ACCOUNT_VALIDATION,
  JWT_DEFAULT_EXPIRES_IN: parseInt(process.env.JWT_DEFAULT_EXPIRES_IN ?? '3000'),
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS ?? '10'),
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_LOGIN_USER: process.env.MAIL_LOGIN_USER,
  MAIL_LOGIN_PASS: process.env.MAIL_LOGIN_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_REPLY_TO: process.env.MAIL_REPLY_TO,
  ACCOUNT_VALIDATION_URL: process.env.ACCOUNT_VALIDATION_URL,
};
