const errMsg = 'Something went wrong.';

export default (status = 400, message = errMsg) => ({
  error: {
    message: message,
    status: status,
  },
  message: message,
});
