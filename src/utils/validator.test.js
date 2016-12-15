import { EMAIL_MSG, FILE_SIZE_MSG, PASSWORD_MSG, REQUIRED_MSG }
  from '../constants/errors';
import { isRequired, isEmail, isPassword, isFileSizeExceeded }
  from './validator';

describe('validator util', () => {
  it('isRequired method returns no error', () => {
    expect(isRequired('test@email.com')).toBeUndefined();
  });

  it('isRequired method returns error', () => {
    expect(isRequired(undefined)).toBe(REQUIRED_MSG);
  });

  it('isEmail method returns no error', () => {
    expect(isEmail('test@email.com')).toBeUndefined();
  });

  it('isEmail method returns error', () => {
    expect(isEmail('notemail.com')).toBe(EMAIL_MSG);
  });

  it('isPassword method returns no error', () => {
    expect(isPassword('Aa123456')).toBeUndefined();
  });

  it('isPassword method returns error', () => {
    expect(isPassword('Aa12345')).toBe(PASSWORD_MSG);
    expect(isPassword('aa123456')).toBe(PASSWORD_MSG);
    expect(isPassword('AA12345')).toBe(PASSWORD_MSG);
    expect(isPassword('AaAaAaAa')).toBe(PASSWORD_MSG);
  });

  it('isFileSizeExceeded method returns no error', () => {
    expect(isFileSizeExceeded()).toBeUndefined();
    expect(isFileSizeExceeded(['file'])).toBeUndefined();
    expect(isFileSizeExceeded([{ size: 0.5 * 1024 * 1024 }])).toBeUndefined();
  });

  it('isFileSizeExceeded method returns error', () => {
    expect(isFileSizeExceeded([{ size: 2 * 1024 * 1024 }])).toBe(FILE_SIZE_MSG);
  });
});
