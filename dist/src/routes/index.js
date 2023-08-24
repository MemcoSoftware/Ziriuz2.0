"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Root Router
 * Redirections to Routers
 */
const express_1 = __importDefault(require("express"));
const HelloRouter_1 = __importDefault(require("./HelloRouter"));
const logger_1 = require("../utils/logger");
const UserRouter_1 = __importDefault(require("./UserRouter"));
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const TecnicoRouter_1 = __importDefault(require("./TecnicoRouter"));
// Server Instance
let server = (0, express_1.default)();
// Router Instance
let rootRotuer = express_1.default.Router();
// Activate request to http://localhost:8000/api
rootRotuer.get('/', (req, res) => {
    (0, logger_1.LogInfo)('GET: http://localhost:8000/api');
    // Send Hello World
    res.send('Welcome to API Restful Express + Nodemon + Jest + TS + React + Swagger + Mongoose');
});
// Redirections to Routers & Controllers
server.use('/', rootRotuer); // http://localhost:8000/api/
server.use('/hello', HelloRouter_1.default); // http://localhost:8000/api/hello --> HelloRouter
// Add more routes to the app
server.use('/users', UserRouter_1.default); // http://localhost:8000/api/users  --> userRouter
// Auth routes
server.use('/auth', AuthRouter_1.default); // http://localhost:8000/api/auth  --> authRouter
// Tecnicos routes
server.use('/tecnicos', TecnicoRouter_1.default); // http://localhost:8000/api/tecnicos  --> tecnicosRouter
exports.default = server;
//# sourceMappingURL=index.js.map