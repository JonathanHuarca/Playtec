"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ErrorResponse = (err, message, statusCode) => {
    err.msg = message;
    err.details = err.message;
    err.statusCode = statusCode || 500;
};
exports.default = ErrorResponse;
//# sourceMappingURL=errorResponse.js.map