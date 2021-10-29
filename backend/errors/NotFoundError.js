class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NoteFoundError';
    this.statusCode = 404;
  }
}

module.exports = NotFoundError;
