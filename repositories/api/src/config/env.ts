export default {
  JWT_SECRET: process.env.JWT_SECRET,
  BCRYPT_SALT_ROUNDS: parseInt(process.env.BCRYPT_SALT_ROUNDS),
};
