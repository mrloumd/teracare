/* eslint max-classes-per-file: ["error", 2] */
import HTTPStatus from 'http-status';

// Class for a successful response
export class APISuccess {
  constructor(
    data,
    message = '',
    status = HTTPStatus.OK,
    statusText = HTTPStatus['200'],
  ) {
    this.data = data;
    this.message = message;
    this.status = status;
    this.statusText = statusText;
  }

  jsonify() {
    return {
      status: this.status,
      statusText: this.statusText,
      success: true,
      message: this.message,
      ...this.data,
    };
  }
}

// Class for client-side error response
export class APIClientError extends Error {
  constructor(error, status = HTTPStatus.BAD_REQUEST) {
    super(error.message);
    this.name = 'APIClientError';
    this.message = error.message;
    this.error = error;
    this.status = status;
    this.statusText = HTTPStatus[status];
  }

  jsonify() {
    return {
      name: this.name,
      status: this.status,
      statusText: this.statusText,
      success: false,
      message: this.message,
      error: this.error,
    };
  }
}
