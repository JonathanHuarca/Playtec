"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const userController = __importStar(require("./resources/user/controllers"));
const course_controller_1 = __importDefault(require("./resources/course/course.controller"));
const payment_controller_1 = __importDefault(require("./resources/payment/payment.controller"));
const siagie_controller_1 = __importDefault(require("./resources/siagie/siagie.controller"));
const community_controller_1 = __importDefault(require("./resources/community/community.controller"));
const calendary_controller_1 = __importDefault(require("./resources/calendary/calendary.controller"));
const fn = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let fname;
    console.log('lala', req.service, req.fname);
    switch (req.service) {
        case 'users':
            fname = userController[req.fname];
            break;
        case 'courses':
            fname = course_controller_1.default;
            break;
        case 'siagie':
            fname = siagie_controller_1.default;
            break;
        case 'pay':
            fname = payment_controller_1.default;
            break;
        case 'community':
            fname = community_controller_1.default;
            break;
        case 'calendary':
            fname = calendary_controller_1.default;
            break;
        default:
            return res.status(500).json({ message: 'Servicio no existe' });
    }
    if (!fname) {
        return res.status(500).json({ message: 'fname no existe!!' });
    }
    return fname(req, res);
});
exports.default = fn;
//# sourceMappingURL=functions.js.map