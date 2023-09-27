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
exports.deleteClient = exports.updateClient = exports.createClient = exports.getClientByID = exports.getAllClients = void 0;
const Client_entity_1 = require("../entities/Client.entity");
// Obtener todos los clientes
const getAllClients = () => __awaiter(void 0, void 0, void 0, function* () {
    const clientModel = (0, Client_entity_1.clientEntity)();
    return clientModel.find().exec();
});
exports.getAllClients = getAllClients;
// Obtener cliente por ID
const getClientByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clientModel = (0, Client_entity_1.clientEntity)();
    return clientModel.findById(id).exec();
});
exports.getClientByID = getClientByID;
// Crear un nuevo cliente
const createClient = (client) => __awaiter(void 0, void 0, void 0, function* () {
    const clientModel = (0, Client_entity_1.clientEntity)();
    return clientModel.create(client);
});
exports.createClient = createClient;
// Actualizar cliente por ID
const updateClient = (id, client) => __awaiter(void 0, void 0, void 0, function* () {
    const clientModel = (0, Client_entity_1.clientEntity)();
    return clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
});
exports.updateClient = updateClient;
// Eliminar cliente por ID
const deleteClient = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const clientModel = (0, Client_entity_1.clientEntity)();
    yield clientModel.findByIdAndDelete(id).exec();
});
exports.deleteClient = deleteClient;
//# sourceMappingURL=Client.orm.js.map