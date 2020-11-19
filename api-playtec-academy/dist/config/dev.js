"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
exports.config = {
    secrets: {
        jwt: 'mysecretkey'
    },
    database: 'api-starter',
    dbUrl: process.env.MONGO_URI_DEV
};
//# sourceMappingURL=dev.js.map