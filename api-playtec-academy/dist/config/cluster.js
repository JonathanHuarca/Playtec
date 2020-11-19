"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.payload = void 0;
const os_1 = __importDefault(require("os"));
const index_1 = __importDefault(require("./index"));
const cpus = os_1.default.cpus();
const numberCPUs = cpus.length;
const options = [
    "Algo nuevo?",
    "Quizás deberias ver TV",
    "Ve a dormir!!",
    "Sigue trajando en backend",
    "Quizás deberias ir a dormir"
];
const payload = (req, res, next) => {
    const randomIndex = Math.floor(Math.random() * options.length);
    const payload = {
        port: index_1.default.port,
        processID: process.pid,
        advice: options[randomIndex],
        numberOfProcesses: numberCPUs,
        message: `worker: ${process.pid}`
    };
    if (req.url === '/kill') {
        res.redirect('/');
        process.exit();
    }
    req.payload = payload;
    next();
};
exports.payload = payload;
//# sourceMappingURL=cluster.js.map