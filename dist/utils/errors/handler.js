"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HandleUncaughtException = exports.HandleErrorWithLogger = void 0;
const error_1 = require("./error");
const pino_1 = __importDefault(require("../logger/pino"));
const HandleErrorWithLogger = (error, req, res, next) => {
    let reportError = true;
    let status = 500;
    let data = error.message;
    // skip common / known errors
    [error_1.Not_Found_Error, error_1.Validation_Error, error_1.Authorization_Error].forEach((errorType) => {
        if (error instanceof errorType) {
            reportError = false;
            status = error.status;
            data = error.message;
        }
    });
    if (reportError) {
        // error reporting tools
        pino_1.default.error(error);
    }
    else {
        // ignore common errors caused by users
        pino_1.default.warn(error);
    }
    return res.status(status).json(data);
};
exports.HandleErrorWithLogger = HandleErrorWithLogger;
const HandleUncaughtException = (error) => __awaiter(void 0, void 0, void 0, function* () {
    pino_1.default.error(error);
    process.exit(1);
});
exports.HandleUncaughtException = HandleUncaughtException;
