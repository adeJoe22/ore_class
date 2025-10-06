import { statusCode } from "./statusCode";

class BaseError extends Error {
  readonly name: string;
  readonly status: number;
  readonly message: string;
  constructor(name: string, status: number, description: string) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);
    this.message = description;
    this.name = name;
    this.status = status;
    Error.captureStackTrace(this);
  }
}

// Internal Server Error 500

export class INTERNAL_SERVER_ERROR extends BaseError {
  constructor(description = "api error") {
    super(
      "internal server error",
      statusCode.INTERNAL_ERROR,
      description,
    );
  }
}

// Validation Error 403

export class Validation_Error extends BaseError {
  constructor(description = "bad request") {
    super("bad request", statusCode.BAD_REQUEST, description);
  }
}

// Authorization Error 401

export class Authorization_Error extends BaseError {
  constructor(description = "access denied") {
    super("access denied", statusCode.UNAUTHORIZED, description);
  }
}

// Not found error 404

export class Not_Found_Error extends BaseError {
  constructor(description = "not found") {
    super("not found", statusCode.NOT_FOUND, description);
  }
}
