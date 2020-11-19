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
const signale_1 = __importDefault(require("signale"));
const mongoose_1 = __importDefault(require("mongoose"));
const _1 = __importDefault(require("./"));
const dbOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};
const connectDB = (url = _1.default.dbUrl, opts = dbOptions) => {
    mongoose_1.default.set('useFindAndModify', false);
    mongoose_1.default.set('useCreateIndex', true);
    mongoose_1.default.set('useNewUrlParser', true);
    mongoose_1.default.connection.on('connected', () => {
        signale_1.default.success('Data Base: ', _1.default.database);
        clearTimeout(autoReconnectDB);
    });
    mongoose_1.default.connection.on('reconnected', function () {
        signale_1.default.info('reconnected');
    });
    mongoose_1.default.connection.on('disconnected', function () {
        signale_1.default.info('MongoDB disconnected!');
        clearTimeout(autoReconnectDB);
    });
    let count = 0;
    const autoReconnectDB = setInterval(() => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(url, opts);
        }
        catch (e) {
            signale_1.default.error(count);
            count++;
        }
    }), 2000);
    return autoReconnectDB;
};
exports.default = connectDB;
//# sourceMappingURL=db.js.map