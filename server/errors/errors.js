class notFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "Not Found Error";
    this.statusCode = 404;
    // Error.captureStackTrace(this, this.constructor);
  }
}

class cannotCreateError extends Error {
  constructor(message) {
    super(message);
    this.name = "Can't create record";
    this.statusCode = 400;
    // Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = { notFoundError, cannotCreateError };
