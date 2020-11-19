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
exports.getMany = exports.getOne = void 0;
const messages = {
    getOne: {
        es: "Usuario encontrado",
        en: "User found"
    },
    getMany: {
        es: "Usuarios encontrados",
        en: "Users found"
    }
};
exports.getOne = (model, options) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language } = req;
        const doc = yield model
            .findOne(options)
            .select('-password')
            .lean()
            .exec();
        res.status(200).json({
            message: messages.getOne[language],
            fname: req.service,
            data: doc
        });
    }
    catch (e) {
        res.status(500).send('error');
    }
});
exports.getMany = (model, options, populate) => (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { language } = req;
        const doc = yield model
            .find(options)
            .populate(populate)
            .lean();
        res.status(200).json({
            message: messages.getMany[language],
            fname: req.service,
            data: doc
        });
    }
    catch (e) {
        res.status(500).send('error');
    }
});
const crudControllers = (model, options, populate) => ({
    getOne: exports.getOne(model, options),
    getMany: exports.getMany(model, options, populate)
});
exports.default = crudControllers;
//# sourceMappingURL=crud.js.map