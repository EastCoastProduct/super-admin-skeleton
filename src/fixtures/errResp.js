const errMsg = 'Something went wrong.';

export default (status = 400, message = errMsg) => ({
  body: {
    message,
  },
  status,
});
