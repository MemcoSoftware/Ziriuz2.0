"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
const ClientOrm = __importStar(require("../domain/orm/Client.orm"));
let ClientController = exports.ClientController = class ClientController {
    getClients() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, logger_1.LogSuccess)('[/api/clients] Get All Clients Request');
                return yield ClientOrm.getAllClients();
            }
            catch (error) {
                (0, logger_1.LogError)('[Controller ERROR]: Getting All Clients');
                return [];
            }
        });
    }
    getClientByID(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, logger_1.LogSuccess)(`[/api/clients/${id}] Get Client By ID: ${id}`);
                return yield ClientOrm.getClientByID(id);
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Getting Client By ID: ${id}`);
                return null;
            }
        });
    }
    createClient(client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, logger_1.LogSuccess)('[/api/clients] Create Client Request');
                return yield ClientOrm.createClient(client);
            }
            catch (error) {
                (0, logger_1.LogError)('[Controller ERROR]: Creating Client');
                return {};
            }
        });
    }
    updateClient(id, client) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, logger_1.LogSuccess)(`[/api/clients/${id}] Update Client Request`);
                return yield ClientOrm.updateClient(id, client);
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating Client: ${id}`);
                return null;
            }
        });
    }
    deleteClient(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                (0, logger_1.LogSuccess)(`[/api/clients/${id}] Delete Client Request`);
                yield ClientOrm.deleteClient(id);
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Deleting Client: ${id}`);
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClients", null);
__decorate([
    (0, tsoa_1.Get)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "getClientByID", null);
__decorate([
    (0, tsoa_1.Post)('/'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "createClient", null);
__decorate([
    (0, tsoa_1.Put)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "updateClient", null);
__decorate([
    (0, tsoa_1.Delete)('{id}'),
    __param(0, (0, tsoa_1.Path)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClientController.prototype, "deleteClient", null);
exports.ClientController = ClientController = __decorate([
    (0, tsoa_1.Route)('/api/clients'),
    (0, tsoa_1.Tags)('ClientController')
], ClientController);
//# sourceMappingURL=ClientController.js.map