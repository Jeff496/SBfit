class notFoundError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.name = "Not Found Error";
    this.statusCode = 404;
    // Error.captureStackTrace(this, this.constructor);
  }
}
