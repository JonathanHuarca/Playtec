"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorResponse_1 = __importDefault(require("./errorResponse"));
const catchAsync = (msg, fn) => {
    return (req, res, next) => {
        fn(req, res, next).catch((err) => {
            errorResponse_1.default(err, msg, 500);
            next(err);
        });
    };
};
exports.default = catchAsync;
//# sourceMappingURL=catchAsync.js.map