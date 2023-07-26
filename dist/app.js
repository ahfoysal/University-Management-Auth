"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const globalErrorHandlers_1 = __importDefault(require("./app/middlewares/globalErrorHandlers"));
const routes_1 = __importDefault(require("./app/routes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const app = (0, express_1.default)();
///cors
app.use((0, cors_1.default)());
///body and cookie parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
////////
app.use('/api/v1', routes_1.default);
app.use(globalErrorHandlers_1.default);
///////
// Testing
// app.get('/', async (req: Request, res: Response, next: NextFunction) => {
//   throw new ApiError(400, 'Invalid Request')
//   // Promise.reject(new Error('Unhandled Promise Rejection'))
//   // return res.send('Server Running')
// })
exports.default = app;
