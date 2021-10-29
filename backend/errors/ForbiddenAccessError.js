class ForbiddenAccessError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenAccessError';
    this.statusCode = 403;
  }
}

module.exports = ForbiddenAccessError;
