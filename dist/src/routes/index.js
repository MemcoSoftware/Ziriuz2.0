"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const logger_1 = require("../utils/logger");
const body_parser_1 = __importDefault(require("body-parser")); // Importa bodyParser
/**
 * @route  /api/users
 * @description Users Module Routes
 * @access Public
 */
const HelloRouter_1 = __importDefault(require("../modules/users/routes/HelloRouter"));
const UserRouter_1 = __importDefault(require("../modules/users/routes/UserRouter"));
const AuthRouter_1 = __importDefault(require("../modules/users/routes/AuthRouter"));
const TecnicoRouter_1 = __importDefault(require("../modules/users/routes/TecnicoRouter"));
const RolesRouter_1 = __importDefault(require("../modules/users/routes/RolesRouter"));
const SedeRouter_1 = __importDefault(require("../modules/users/routes/SedeRouter"));
const SearchRouter_1 = __importDefault(require("../modules/users/routes/SearchRouter"));
const ClientRouter_1 = __importDefault(require("../modules/users/routes/ClientRouter"));
/**
 * @route  /api/equipos
 * @description Equipos Module Routes
 * @access Public
 */
const EquipoRouter_1 = __importDefault(require("../modules/equipos/routes/EquipoRouter"));
const ModeloEquipoRouter_1 = __importDefault(require("../modules/equipos/routes/ModeloEquipoRouter"));
const ClassDeviceRouter_1 = __importDefault(require("../modules/equipos/routes/ClassDeviceRouter"));
const MarcasEquiposRouter_1 = __importDefault(require("../modules/equipos/routes/MarcasEquiposRouter"));
const TipoEquipoRouter_1 = __importDefault(require("../modules/equipos/routes/TipoEquipoRouter"));
const AreaEquipoRouter_1 = __importDefault(require("../modules/equipos/routes/AreaEquipoRouter"));
const SearchEquiposRouter_1 = __importDefault(require("../modules/equipos/routes/SearchEquiposRouter"));
const RepuestosEquiposRouter_1 = __importDefault(require("../modules/equipos/routes/RepuestosEquiposRouter"));
const CamposTiposRouter_1 = __importDefault(require("../modules/procesos_&_protocolos/routes/CamposTiposRouter"));
const CamposRouter_1 = __importDefault(require("../modules/procesos_&_protocolos/routes/CamposRouter"));
const PreventivosRouter_1 = __importDefault(require("../modules/procesos_&_protocolos/routes/PreventivosRouter"));
const SearchProcesos_ProtocolosRouter_1 = __importDefault(require("../modules/procesos_&_protocolos/routes/SearchProcesos&ProtocolosRouter"));
// * Server Instance
let server = (0, express_1.default)();
// * Configura body-parser antes de las rutas
server.use(body_parser_1.default.json());
// * Router Instance
let rootRotuer = express_1.default.Router();
// * Activate request to http://localhost:8000/api
rootRotuer.get('/', (req, res) => {
    (0, logger_1.LogInfo)('GET: http://localhost:8000/api');
    // Send Hello World
    res.send('Welcome to API Restful Express + Nodemon + Jest + TS + React + Swagger + Mongoose');
});
server.use('/', rootRotuer); // http://localhost:8000/api/
// * Redirections to Routers & Controllers -- MODULE USERS
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
// * Redirections to Routers & Controllers -- MODULE EQUIPOS
server.use('/equipos', EquipoRouter_1.default); // http://localhost:8000/api/equipos --> equiposRouter
server.use('/equipos/modelo', ModeloEquipoRouter_1.default); // http://localhost:8000/api/equipos/modelo --> modeloEquiposRouter
server.use('/equipos/clases', ClassDeviceRouter_1.default); // http://localhost:8000/api/equipos/clases --> classDeviceRouter
server.use('/equipos/marcas', MarcasEquiposRouter_1.default); // http://localhost:8000/api/equipos/marcas --> marcasEquiposRouter
server.use('/equipos/tipos', TipoEquipoRouter_1.default); // http://localhost:8000/api/equipos/tipos --> tiposEquiposRouter
server.use('/equipos/areas', AreaEquipoRouter_1.default); // http://localhost:8000/api/equipos/areas --> areasEquiposRouter
server.use('/equipos/repuestos', RepuestosEquiposRouter_1.default); // http://localhost:8000/api/equipos/repuestos --> repuestosEquiposRouter
server.use('/search/equipos', SearchEquiposRouter_1.default); // http://localhost:8000/api/equipos --> SearchEquiposRouter
// * Redirections to Routers & Controllers -- MODULE PROCESOS & PROTOCOLOS
server.use('/campos-tipos', CamposTiposRouter_1.default); // http://localhost:8000/api/campos-tipos --> camposTiposRouter
server.use('/campos', CamposRouter_1.default); // http://localhost:8000/api/campos --> camposRouter
server.use('/preventivos', PreventivosRouter_1.default); // http://localhost:8000/api/preventivos --> preventivosRouter
server.use('/search/procesos&protocolos/', SearchProcesos_ProtocolosRouter_1.default); // http://localhost:8000/api/search/ --> searchProcesosProtocolosRouter
exports.default = server;
//# sourceMappingURL=index.js.map