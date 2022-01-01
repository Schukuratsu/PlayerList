export default {
  JWT_SECRET: process.env.JWT_SECRET,
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
  MAIL_SERVICE: process.env.MAIL_SERVICE,
  MAIL_LOGIN_USER: process.env.MAIL_LOGIN_USER,
  MAIL_LOGIN_PASS: process.env.MAIL_LOGIN_PASS,
  MAIL_FROM: process.env.MAIL_FROM,
  MAIL_REPLY_TO: process.env.MAIL_REPLY_TO,
};
