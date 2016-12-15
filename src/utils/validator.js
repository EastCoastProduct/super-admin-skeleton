import validator from 'validator';
import { FILE_SIZE } from '../constants/application';
import { EMAIL_MSG, FILE_SIZE_MSG, PASSWORD_MSG, REQUIRED_MSG }
  from '../constants/errors';

export const isRequired = value =>
  (value !== undefined ? undefined : REQUIRED_MSG);

export const isEmail = value =>
  (validator.isEmail(String(value)) ? undefined : EMAIL_MSG);

export const isPassword = value =>
  (value.length >= 8 && (/[A-Z]/).test(value) && (/[a-z]/).test(value) &&
    (/[0-9]/).test(value) ? undefined : PASSWORD_MSG);

export const isFileSizeExceeded = value =>
  (value && value[0] && value[0].size >= FILE_SIZE * 1024 * 1024 ?
    FILE_SIZE_MSG : undefined);
