"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), '.env') });
exports.default = {
    env: process.env.NODE_ENV,
    port: process.env.PORT || 5000,
    database_url: process.env.DATABASE_URL,
    default_student_password: process.env.DEFAULT_STUDENT_PASSWORD,
    bcrypt_salt_rounds: process.env.BCRYPT_SALT_ROUNDS,
    jwt: {
        secret: process.env.JWT_SECRET_KEY,
        refresh: process.env.JWT_REFRESH_KEY,
        expires_in: process.env.JWT_EXPIRES_IN,
        refresh_expire_in: process.env.JWT_REFRESH_IN,
    },
};
