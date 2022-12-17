class MyAppError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends MyAppError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class WrongParams extends MyAppError {
  constructor(message) {
    super(message);
    this.status = 404;
  }
}

class Conflict extends MyAppError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  MyAppError,
  Conflict,
  ValidationError,
  WrongParams,
};
