class UnauthorizedUserError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedUserError';
    this.statusCode = 401;
  }
}

module.exports = UnauthorizedUserError;
