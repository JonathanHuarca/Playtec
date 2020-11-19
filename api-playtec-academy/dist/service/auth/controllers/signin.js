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
Object.defineProperty(exports, "__esModule", { value: true });
exports.signin = void 0;
const signup_1 = require("./signup");
const models_1 = require("../models");
const signin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.username || !req.body.password) {
        return res.status(400).send({ message: 'need username or email and password' });
    }
    const invalid = { message: 'Invalid username or email and passoword combination' };
    try {
        const user = yield models_1.User.findOne({ username: req.body.username })
            .select('email username password')
            .exec();
        console.log('user', user);
        if (!user) {
            return res.status(401).send(invalid);
        }
        console.log(user);
        const match = yield user.schema.methods.checkPassword(user, req.body.password);
        if (!match) {
            return res.status(401).send(invalid);
        }
        const token = signup_1.newToken(user);
        return res.status(201).json({
            user: user,
            token: token
        });
    }
    catch (e) {
        console.error(e);
        res.status(500).end();
    }
});
exports.signin = signin;
//# sourceMappingURL=signin.js.map