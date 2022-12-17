const tryWrapper = (controller) => {
  return (req, res, next) => {
    controller(req, res, next).catch(next);
  };
};

const errorHandler = (err, req, res, next) => {
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ message });
};

module.exports = {
  tryWrapper,
  errorHandler,
};
