import bcrypt from 'bcrypt';
import env from '../../config/env';

export const asyncEncrypt = (password: string) => {
  if (!password) throw new Error('no password provided');
  return bcrypt.hash(password, env.BCRYPT_SALT_ROUNDS).catch((err) => {
    throw new Error(err);
  });
};

export const asyncCompare = (password: string, savedPassword: string) => {
  if (!password) return false;
  if (!savedPassword) return false;
  return bcrypt.compare(password, savedPassword);
};
