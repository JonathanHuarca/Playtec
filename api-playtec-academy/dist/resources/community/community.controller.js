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
const apiAdapter_1 = __importDefault(require("../../utils/apiAdapter"));
const { NODE_ENV, COMMUNITY_URL, COMMUNITY_URL_PROD } = process.env;
const BASE_URL = NODE_ENV === 'production' ? COMMUNITY_URL_PROD : COMMUNITY_URL;
const api = apiAdapter_1.default(BASE_URL);
const courses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        console.log('headers', authorization);
        console.log('body', req.body);
        const { data } = yield api.post(req.path, req.body, { headers: {
                "Authorization": authorization
            } });
        res.status(200).json(data);
    }
    catch (e) {
        if (e.response) {
            return res.status(500).json(e.response.data);
        }
        res.status(500).json(e.message);
    }
});
exports.default = courses;
//# sourceMappingURL=community.controller.js.map