const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";

  if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid movie data";
  }

  res.status(statusCode).json({
    success: false,
    message,
  });
};

export default errorHandler;
