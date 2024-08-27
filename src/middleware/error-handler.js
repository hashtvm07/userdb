const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  let error = {
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  };
  res.json(error);
  console.log(error);
};

module.exports = errorHandler;
