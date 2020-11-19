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
const crud_1 = __importDefault(require("../../../utils/crud"));
const catchAsync_1 = __importDefault(require("../../../utils/catchAsync"));
const models_1 = require("../../../service/auth/models");
const errorMsg = 'error getUsers controller';
const getUsers = catchAsync_1.default(errorMsg, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const options = {};
    const populate = {
        path: 'courses',
        model: 'courses'
    };
    const crud = crud_1.default(models_1.User, options, populate);
    crud.getMany(req, res);
}));
exports.default = getUsers;
//# sourceMappingURL=getUsers.js.map