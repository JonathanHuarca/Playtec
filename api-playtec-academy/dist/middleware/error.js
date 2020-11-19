"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const errorHandler = (err, req, res, next) => {
    const errorMsg = {
        SUCCESS: false,
        STATUSCODE: err.statusCode,
        MESSAGE: err.msg,
        DETAILS: err.details,
        FILENAME: err.stack.match(/[a-z.]+.js/)[0],
        LINE: err.stack.match(/:(\d*):(\d*)/)[0],
        PATH: err.stack.match(/[\/\w-_\.]+\.js/)[0]
    };
    const statusColor = (code) => {
        let value;
        switch (code) {
            case 500:
                value = chalk_1.default.red(code);
                break;
            case 200:
                value = chalk_1.default.green(code);
                break;
            case 304:
                value = chalk_1.default.yellow(code);
                break;
            default:
                value = chalk_1.default.gray(code);
                break;
        }
        return value;
    };
    if (process.env.NODE_ENV !== 'testing') {
        console.log(`
    ${chalk_1.default.cyan('ERROR MESSAGE')} 
    
    ${chalk_1.default.yellow('SUCCESS')}    : ${chalk_1.default.red(errorMsg.SUCCESS)}
    ${chalk_1.default.yellow('SATUS CODE')} : ${statusColor(errorMsg.STATUSCODE)}
    ${chalk_1.default.yellow('MESSAGE')}    : ${chalk_1.default.cyan(errorMsg.MESSAGE)}
    ${chalk_1.default.yellow('DETAILS')}    : ${chalk_1.default.cyan(errorMsg.DETAILS)}
    ${chalk_1.default.yellow('FILENAME')}   : ${chalk_1.default.cyan(errorMsg.FILENAME)}
    ${chalk_1.default.yellow('PATH')}       : ${chalk_1.default.green(errorMsg.PATH)}
    ${chalk_1.default.yellow('LINE')}       : ${chalk_1.default.magenta(errorMsg.LINE)}
    `);
    }
    res.status(500).json(errorMsg);
    next();
};
exports.default = errorHandler;
//# sourceMappingURL=error.js.map