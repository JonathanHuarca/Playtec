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
const apiAdapter_1 = __importDefault(require("../../../utils/apiAdapter"));
const models_1 = require("../../../service/auth/models");
const { NODE_ENV, COURSES_URL, COURSES_URL_PROD } = process.env;
const BASE_URL = NODE_ENV === 'production' ? COURSES_URL_PROD : COURSES_URL;
const api = apiAdapter_1.default(BASE_URL);
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { authorization } = req.headers;
        const { user } = req;
        const getUser = yield models_1.User.findById(user._id);
        const body = {
            fname: 'getCourse',
            service: req.body.service,
            language: req.body.language,
            id_course: req.body.id_course
        };
        const { data } = yield api.post(req.path, body, { headers: {
                "Authorization": authorization
            } });
        getUser.courses = [...getUser.courses, data.data._id];
        getUser.save();
        res.status(200).json(getUser);
    }
    catch (e) {
        if (e.response) {
            return res.status(500).json(e.response.data);
        }
        res.status(500).json(e.message);
    }
});
exports.default = addCourse;
//# sourceMappingURL=add_course.js.map