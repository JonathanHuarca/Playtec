"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const morgan_1 = __importDefault(require("morgan"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
morgan_1.default.token('fname', (req) => {
    return req.fname;
});
morgan_1.default.token('service', (req) => {
    return req.service;
});
morgan_1.default.token('error', (req, res) => {
    return res.statusMessage;
});
morgan_1.default.token('date', (req, res, tz) => {
    return moment_timezone_1.default().tz(tz).format('DD/MM/YYYY - HH:mm:ss');
});
const logger = () => {
    return `
  ${chalk_1.default.bold.hex('#229fff')('SERVICE')} : ${chalk_1.default.bold(':service')}
  ${chalk_1.default.bold.hex('#229fff')('DATE')}    : ${chalk_1.default.hex('#229fff')(':date[America/Lima]')}
  ${chalk_1.default.bold.hex('#229fff')('METHOD')}  : ${chalk_1.default.bold(':method')}
  ${chalk_1.default.bold.hex('#229fff')('URL')}     : ${chalk_1.default.hex('#229fff')(':url')} 
  ${chalk_1.default.bold.hex('#229fff')('FNAME')}   : ${chalk_1.default.bold(':fname')}
  ${chalk_1.default.bold.hex('#229fff')('STATUS')}  : ${chalk_1.default.hex('#229fff')(':status')}
  ${chalk_1.default.bold.hex('#229fff')('IP')}      : ${chalk_1.default.bold(':remote-addr')}
  ${chalk_1.default.bold.hex('#229fff')('TIME')}    : ${chalk_1.default.hex('#229fff')(':response-time')} ms
  ${chalk_1.default.bold.hex('#229fff')('MESSAGE')} : ${chalk_1.default.bold(':error')}
  ${chalk_1.default.bold.gray('==================================')}`;
};
exports.default = logger;
//# sourceMappingURL=logger.js.map