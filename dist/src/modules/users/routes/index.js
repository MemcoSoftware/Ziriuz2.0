"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const HelloRouter_1 = __importDefault(require("./HelloRouter"));
const logger_1 = require("../utils/logger");
const UserRouter_1 = __importDefault(require("./UserRouter"));
const AuthRouter_1 = __importDefault(require("./AuthRouter"));
const TecnicoRouter_1 = __importDefault(require("./TecnicoRouter"));
const RolesRouter_1 = __importDefault(require("./RolesRouter"));
const SedeRouter_1 = __importDefault(require("./SedeRouter"));
const SearchRouter_1 = __importDefault(require("./SearchRouter"));
const body_parser_1 = __importDefault(require("body-parser")); // Importa bodyParser
const ClientRouter_1 = __importDefault(require("./ClientRouter"));
// Server Instance
let server = (0, express_1.default)();
// Configura body-parser antes de las rutas
server.use(body_parser_1.default.json());
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
server.use('/sedes', SedeRouter_1.default);
server.use('/roles', RolesRouter_1.default); // http://localhost:8000/api/tecnicos  --> rolesRouter
server.use('/search', SearchRouter_1.default);
server.use('/clients', ClientRouter_1.default); // http://localhost:8000/api/clients --> clientRouter
exports.default = server;
//# sourceMappingURL=index.js.map