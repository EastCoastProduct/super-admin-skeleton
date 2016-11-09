import { SubmissionError } from 'redux-form';
import parseErrors from './parseErrors';

describe('parseErrors util', () => {
  it('returns error without debugInfo', () => {
    const error = {
      message: 'Something went wrong',
    };
    const submissionError = parseErrors(error);

    expect(submissionError)
      .toEqual(new SubmissionError({ _error: 'Something went wrong' }));
  });

  it('returns error with debugInfo', () => {
    const error = {
      message: 'Something went wrong',
      debugInfo: [
        { path: 'email', error: 'has to be valid email' },
        { path: 'password', error: 'has to be at least 8 characters long' },
      ],
    };
    const submissionError = parseErrors(error);
    const expected = new SubmissionError({
      email: 'has to be valid email',
      password: 'has to be at least 8 characters long',
    });

    expect(submissionError).toEqual(expected);
  });
});
