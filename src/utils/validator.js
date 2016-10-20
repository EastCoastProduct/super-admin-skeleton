import validator from 'validator';
import { EMAIL_MSG, PASSWORD_MSG, REQUIRED_MSG } from '../constants/errors';

export function isRequired(value) {
  return value !== undefined ? null : REQUIRED_MSG;
}

export function isEmail(value) {
  return validator.isEmail(String(value)) ? null : EMAIL_MSG;
}

export function isPassword(value) {
  return value.length >= 8 && (/[A-Z]/).test(value) && (/[a-z]/).test(value) &&
    (/[0-9]/).test(value) ? null : PASSWORD_MSG;
}
