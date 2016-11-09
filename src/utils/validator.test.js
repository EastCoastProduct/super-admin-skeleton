import { isRequired, isEmail, isPassword, isFileSizeExceeded }
  from './validator';

describe('validator util', () => {
  it('isRequired method returns no error', () => {
    expect(isRequired('test@email.com')).toBeNull();
  });

  it('isRequired method returns error', () => {
    expect(isRequired(undefined)).toBe('Required field.');
  });

  it('isEmail method returns no error', () => {
    expect(isEmail('test@email.com')).toBeNull();
  });

  it('isEmail method returns error', () => {
    expect(isEmail('notemail.com')).toBe('Invalid e-mail address.');
  });

  it('isPassword method returns no error', () => {
    expect(isPassword('Aa123456')).toBeNull();
  });

  it('isPassword method returns error', () => {
    const error = 'Password has to be at least 8 characters long and contain ' +
      'at least one uppercase, lowercase and numeric character.';

    expect(isPassword('Aa12345')).toBe(error);
    expect(isPassword('aa123456')).toBe(error);
    expect(isPassword('AA12345')).toBe(error);
    expect(isPassword('AaAaAaAa')).toBe(error);
  });

  it('isFileSizeExceeded method returns no error', () => {
    expect(isFileSizeExceeded()).toBeNull();
    expect(isFileSizeExceeded(['file'])).toBeNull();
    expect(isFileSizeExceeded([{ size: 0.5 * 1024 * 1024 }])).toBeNull();
  });

  it('isFileSizeExceeded method returns error', () => {
    expect(isFileSizeExceeded([{ size: 2 * 1024 * 1024 }]))
      .toBe('Max file size allowed is 1MB.');
  });
});
