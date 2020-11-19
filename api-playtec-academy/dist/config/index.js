"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const dev_1 = require("./dev");
const testing_1 = require("./testing");
const prod_1 = require("./prod");
const env = process.env.NODE_ENV;
const baseConfig = {
    env,
    isDev: env === 'development',
    isTest: env === 'testing',
    isProd: env === 'production',
    port: process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT,
    secrets: {
        jwt: process.env.JWT_SECRET,
        jwtExp: '1d'
    }
};
let envConfig = {};
switch (env) {
    case 'dev':
    case 'development':
        envConfig = dev_1.config;
        break;
    case 'test':
    case 'testing':
        envConfig = testing_1.config;
        break;
    case 'prod':
    case 'production':
        envConfig = prod_1.config;
        break;
    default:
        envConfig = dev_1.config;
}
exports.default = lodash_1.merge(baseConfig, envConfig);
//# sourceMappingURL=index.js.map