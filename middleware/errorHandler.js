const errorHandler = (err, req, res, next) => {
  console.log("status code is", res.statusCode);
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case 400:
      res.json({
        title: "validation error",
        message: err.message,
        stackTrace: err.stack,
      });
    case 404:
      res.json({
        title: "not found",
        message: err.message,
        stackTrace: err.stack,
      });
    default:
      console.log("no error ");
  }
};

module.exports = errorHandler;
