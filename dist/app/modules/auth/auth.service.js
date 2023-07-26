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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelper_1 = require("../../../helpers/jwtHelper");
const user_model_1 = require("../user/user.model");
const login = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = payload;
    // check user exists
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    if (isUserExist.password &&
        !(yield user_model_1.User.isPasswordMatched(password, isUserExist.password))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    // generate access  token
    const { id: userId, role, needsPasswordChange } = isUserExist;
    const accessToken = jwtHelper_1.jwtHelpers.generateToken({ id: userId, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    const refreshToken = jwtHelper_1.jwtHelpers.generateToken({ id: userId, role }, config_1.default.jwt.refresh, config_1.default.jwt.refresh_expire_in);
    return { accessToken, refreshToken, needsPasswordChange };
});
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // verify the token
    let decodedToken = null;
    try {
        decodedToken = jwtHelper_1.jwtHelpers.verifyToken(token, config_1.default.jwt.refresh);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Invalid Refresh Token');
    }
    const { id } = decodedToken;
    const isUserExist = yield user_model_1.User.isUserExist(id);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'User does not exist');
    }
    // generate new access token
    const accessToken = jwtHelper_1.jwtHelpers.generateToken({ id: id, role: isUserExist.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { accessToken };
});
exports.AuthService = {
    login,
    refreshToken,
};
