"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Not_Found_Error = exports.Authorization_Error = exports.Validation_Error = exports.INTERNAL_SERVER_ERROR = void 0;
const statusCode_1 = require("./statusCode");
class BaseError extends Error {
    constructor(name, status, description) {
        super(description);
        Object.setPrototypeOf(this, new.target.prototype);
        this.message = description;
        this.name = name;
        this.status = status;
        Error.captureStackTrace(this);
    }
}
// Internal Server Error 500
class INTERNAL_SERVER_ERROR extends BaseError {
    constructor(description = "api error") {
        super("internal server error", statusCode_1.statusCode.INTERNAL_ERROR, description);
    }
}
exports.INTERNAL_SERVER_ERROR = INTERNAL_SERVER_ERROR;
// Validation Error 403
class Validation_Error extends BaseError {
    constructor(description = "bad request") {
        super("bad request", statusCode_1.statusCode.BAD_REQUEST, description);
    }
}
exports.Validation_Error = Validation_Error;
// Authorization Error 401
class Authorization_Error extends BaseError {
    constructor(description = "access denied") {
        super("access denied", statusCode_1.statusCode.UNAUTHORIZED, description);
    }
}
exports.Authorization_Error = Authorization_Error;
// Not found error 404
class Not_Found_Error extends BaseError {
    constructor(description = "not found") {
        super("not found", statusCode_1.statusCode.NOT_FOUND, description);
    }
}
exports.Not_Found_Error = Not_Found_Error;
