import errResp from '../fixtures/errResp';
import parseErrors from './parseErrors';

describe('parseErrors util', () => {
  it('returns error without debugInfo', () => {
    const error = errResp(400, 'Something went wrong.').body;
    const submissionError = parseErrors(error);

    expect(submissionError.errors).toEqual({ _error: 'Something went wrong.' });
  });

  it('returns error with debugInfo', () => {
    const error = {
      message: 'Something went wrong',
      debugInfo: [
        { path: 'email', message: 'Has to be valid email.' },
        { path: 'password', message: 'Has to be at least 8 characters long.' },
      ],
    };
    const submissionError = parseErrors(error);
    const expected = {
      _error: 'Something went wrong',
      email: 'Has to be valid email.',
      password: 'Has to be at least 8 characters long.',
    };

    expect(submissionError.errors).toEqual(expected);
  });
});
