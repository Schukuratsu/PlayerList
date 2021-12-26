import bcrypt from 'bcrypt';

export const asyncCompare = (password: string, savedPassword: string) => {
  if (!password) return false;
  if (!savedPassword) return false;
  return bcrypt.compare(password, savedPassword);
};
