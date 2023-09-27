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
Object.defineProperty(exports, "__esModule", { value: true });
exports.createClient = exports.updateClientByID = exports.deleteClientByID = exports.getClientByID = exports.getAllClients = void 0;
const Client_entity_1 = require("../entities/Client.entity");
const logger_1 = require("../../utils/logger");
// Obtener todos los clientes
const getAllClients = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientModel = (0, Client_entity_1.clientEntity)();
        const response = {};
        // Buscar todos los clientes (con paginación)
        yield clientModel.find({})
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id client_name client_nit client_address client_telefono client_email')
            .exec()
            .then((clients) => {
            response.clients = clients;
        });
        // Contar documentos totales en la colección de Clientes
        yield clientModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        (0, logger_1.LogSuccess)('Successfully retrieved all clients');
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Clients: ${error}`);
    }
});
exports.getAllClients = getAllClients;
// Obtener cliente por ID
const getClientByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientModel = (0, Client_entity_1.clientEntity)();
        // Buscar cliente por ID
        return yield clientModel.findById(id)
            .select('_id client_name client_nit client_address client_telefono client_email')
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Client By ID: ${error}`);
    }
});
exports.getClientByID = getClientByID;
// Eliminar cliente por ID
const deleteClientByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientModel = (0, Client_entity_1.clientEntity)();
        // Eliminar cliente por ID
        return yield clientModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting Client By ID');
    }
});
exports.deleteClientByID = deleteClientByID;
// Actualizar cliente por ID
const updateClientByID = (id, client) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientModel = (0, Client_entity_1.clientEntity)();
        // Actualizar el cliente por ID
        return yield clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Client By ID: ${error}`);
    }
});
exports.updateClientByID = updateClientByID;
// Crear un nuevo cliente
const createClient = (client) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientModel = (0, Client_entity_1.clientEntity)();
        // Crear un nuevo cliente
        return yield clientModel.create(client);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Client: ${error}`);
    }
});
exports.createClient = createClient;
//# sourceMappingURL=Client.orm.js.map