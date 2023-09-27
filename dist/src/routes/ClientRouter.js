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
const express_1 = __importDefault(require("express"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const ClientController_1 = require("../controller/ClientController");
const logger_1 = require("../utils/logger");
const clientRouter = express_1.default.Router();
const controller = new ClientController_1.ClientController();
clientRouter.route('/')
    .get(verifyToken_middleware_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.LogInfo)('GET: /api/client'); // Agregar LogInfo
    const clients = yield controller.getClients();
    res.json(clients);
}))
    .post(verifyToken_middleware_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    (0, logger_1.LogInfo)('POST: /api/client'); // Agregar LogInfo
    const newClient = req.body;
    const createdClient = yield controller.createClient(newClient);
    res.status(201).json(createdClient);
}));
clientRouter.route('/:id')
    .get(verifyToken_middleware_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    (0, logger_1.LogInfo)(`GET: /api/client/${id}`); // Agregar LogInfo
    const client = yield controller.getClientByID(id);
    res.json(client);
}))
    .put(verifyToken_middleware_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    (0, logger_1.LogInfo)(`PUT: /api/client/${id}`); // Agregar LogInfo
    const updatedClient = req.body;
    const result = yield controller.updateClient(id, updatedClient);
    if (result && 'success' in result && result.success) {
        res.json(result);
    }
    else {
        res.status(500).json(result);
    }
}))
    .delete(verifyToken_middleware_1.verifyToken, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    (0, logger_1.LogInfo)(`DELETE: /api/client/${id}`); // Agregar LogInfo
    const result = yield controller.deleteClient(id);
    res.json(result);
}));
exports.default = clientRouter;
//# sourceMappingURL=ClientRouter.js.map