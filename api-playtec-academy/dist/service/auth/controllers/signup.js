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
exports.signup = exports.verifyToken = exports.newToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../../../config"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const models_1 = require("../models/");
const newToken = user => {
    return jsonwebtoken_1.default.sign({ id: user.id }, config_1.default.secrets.jwt, {
        expiresIn: config_1.default.secrets.jwtExp
    });
};
exports.newToken = newToken;
const verifyToken = token => new Promise((resolve, reject) => {
    jsonwebtoken_1.default.verify(token, config_1.default.secrets.jwt, (err, payload) => {
        if (err)
            return reject(err);
        resolve(payload);
    });
});
exports.verifyToken = verifyToken;
const msg = 'Error en controlador signup';
const signup = catchAsync_1.default(msg, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('body', req.body);
    const { username, email } = req.body;
    const userExists = yield models_1.User.findOne({ username });
    const emailExists = yield models_1.User.findOne({ email });
    console.log('lalaal', userExists);
    if ((!req.body.username && !req.body.email) || !req.body.password) {
        return res.status(400).send({ message: 'need email or username and password' });
    }
    if (userExists && emailExists) {
        return res.status(400).json({
            message: 'email o username ya está en uso'
        });
    }
    const user = yield models_1.User.create(req.body);
    const token = newToken(user);
    return res.status(201).send({ user, token });
}));
exports.signup = signup;
//# sourceMappingURL=signup.js.map