import { SubmissionError } from 'redux-form';

export default (error) => {
  const errors = { _error: error.message };
  if (error.debugInfo) {
    error.debugInfo.forEach((info) => {
      errors[info.path] = info.message;
    });
  }
  return new SubmissionError(errors);
};
