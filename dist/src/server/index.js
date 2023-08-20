"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// Swagger
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// Security
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
// TODO HTTPS
// Routes
const routes_1 = __importDefault(require("../routes"));
// * Create Express APP
const server = (0, express_1.default)();
// * Swagger Config and route
server.use('/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
        explorer: true
    }
}));
// Define SERVER to use "/api" and use rootRouter from 'index.ts' in routes
// From this point onover: http://logalhost:8000/api/...
server.use('/api', routes_1.default);
// Static Server
server.use(express_1.default.static('public'));
// TODO Mongoose Connection
const mongoose_1 = __importDefault(require("mongoose"));
mongoose_1.default.connect('mongodb+srv://ziriuz:memcodev900454322@generalsziriuz.vpq2tyf.mongodb.net/usersZiriuz?retryWrites=true&w=majority');
// * Security Connection
server.use((0, helmet_1.default)());
server.use((0, cors_1.default)());
// * Content Type Config
server.use(express_1.default.urlencoded(({ extended: true, limit: '50mb' })));
server.use(express_1.default.json(({ limit: '50mb' })));
// * Redirections Config
//  http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req, res) => {
    res.redirect('/api');
});
exports.default = server;
//# sourceMappingURL=index.js.map