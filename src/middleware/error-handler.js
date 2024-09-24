// const { log } = require("../utils/logger");
exports.errorHandler = (err, req, res, next) => {
  console.log('Reached at error handler middle ware')
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let error = {
    message: err.message,
    stack: err.stack,
  };
  res.status(statusCode);
  console.log("Error Handler: " + error);
  res.json({ error: error });
  console.log(error);
};

