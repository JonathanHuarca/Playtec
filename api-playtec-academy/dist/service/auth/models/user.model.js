"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const bcrypt_1 = __importDefault(require("bcrypt"));
const userSchema = new mongoose_1.Schema({
    name: {
        type: String,
        lowercase: true
    },
    lastname: {
        type: String,
        lowercase: true
    },
    username: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    domain: {
        type: String,
        lowercase: true,
        default: ""
    },
    rol: {
        type: String,
        default: '0'
    }
}, { timestamps: true });
userSchema.pre("save", function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    bcrypt_1.default.hash(this.password, 8, (err, hash) => {
        if (err) {
            return next(err);
        }
        this.password = hash;
        next();
    });
});
userSchema.methods.checkPassword = function (user, password) {
    const passwordHash = user.password;
    return new Promise((resolve, reject) => {
        bcrypt_1.default.compare(password, passwordHash, (err, same) => {
            if (err) {
                return reject(err);
            }
            resolve(same);
        });
    });
};
const courseSchema = new mongoose_1.Schema();
mongoose_1.model('courses', courseSchema);
exports.User = mongoose_1.model('user', userSchema);
//# sourceMappingURL=user.model.js.map