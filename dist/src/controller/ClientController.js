"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
exports.ClientController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// ORM - Clients Collection
const Client_orm_1 = require("../domain/orm/Client.orm");
const Client_entity_1 = require("../domain/entities/Client.entity");
let ClientController = exports.ClientController = class ClientController {
    /**
     * Endpoint to retrieve the clients in the "Clients" Collection from DB
     * @param {number} page Page for pagination
     * @param {number} limit Limit of clients per page
     * @param {string} id ID of client to retrieve (optional)
     * @returns All clients or client found by ID
     */
    getClients(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/clients] Get Client By ID: ${id}`);
                response = yield (0, Client_orm_1.getClientByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/clients] Get All Clients Request');
                response = yield (0, Client_orm_1.getAllClients)(page, limit);
            }
            return response;
        });
    }
    /**
     * Endpoint to delete the clients in the "Clients" Collection from DB
     * @param {string} id ID of client to delete
     * @returns Message confirming client was deleted
     */
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, Client_orm_1.deleteClientByID)(id);
                    response = {
                        message: `Client with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting client with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/clients] Delete Client Request WITHOUT ID ');
                response = {
                    message: 'Please provide an ID to remove from the DB'
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to create a new client in the "Clients" Collection from DB
     * @param {string} id ID of client to retrieve (optional)
     * @returns Message confirming client was created
     */
    createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const createdClient = yield (0, Client_entity_1.clientEntity)().create(client);
                return createdClient;
            }
            catch (error) {
                (0, logger_1.LogError)('[Controller ERROR]: Creating Client');
                throw error;
            }
        });
    }
    updateClient(id, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/clients] Update Client Request WITHOUT ID');
                    throw new Error("Please, provide an ID to update an existing client");
                }
                const updatedClient = yield (0, Client_orm_1.updateClientByID)(id, client);
                return updatedClient;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating Client ${id}: ${error}`);
                throw error;
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Query)()),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClients", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteClient", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateClient", null);
exports.ClientController = ClientController = __decorate([
    (0, tsoa_1.Route)("/api/clients"),
    (0, tsoa_1.Tags)("ClientController")
], ClientController);
//# sourceMappingURL=ClientController.js.map