const errorHandler = (error, request, response, next) => {
  const statusCode = response.statusCode ? response.statusCode : 500;

  response.status(statusCode).json({
    message: error.message,
  });

  next()
};

module.exports = errorHandler;
