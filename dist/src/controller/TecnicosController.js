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
exports.TecnicosController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// ORM - Tecnicos Collection
const Tecnico_orm_1 = require("../domain/orm/Tecnico.orm");
let TecnicosController = exports.TecnicosController = class TecnicosController {
    /**
     * Endpoint to retreive the Tecnicos in the "Tecnicos" Collection from DB
     * @param {string} id Id of Tecnico to retreive (optional)
     * @returns All Tecnicos or Tecnico found by ID
    */
    getTecnico(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/tecnicos] Get Tecnico By ID: ${id}`);
                response = yield (0, Tecnico_orm_1.getTecnicoByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/tecnicos] Get All Tecnicos Request');
                response = yield (0, Tecnico_orm_1.getAllTecnicos)(page, limit);
            }
            return response;
        });
    }
    createTecnico(tecnico) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (tecnico) {
                (0, logger_1.LogSuccess)(`[/api/tecnico] Register New User: ${tecnico.user_id}`);
                yield (0, Tecnico_orm_1.createTecnico)(tecnico).then((r) => {
                    (0, logger_1.LogSuccess)(`[/api/tecnico] Registered Tecnico: ${tecnico.user_id}`);
                    response = {
                        message: `Tecnico Registered successfully: ${tecnico.user_id}`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)(`[/api/tecnico] Register needs Tecnico Entity`);
                response = {
                    message: 'Tecnico not Registered: Please, provide a Tecnico Entity to create.'
                };
            }
            return response;
        });
    }
    /**
 * Endpoint to delete the Tecnicos in the "Tecnicos" Collection from DB
 * @param {string} id Id of Tecnico to delete (optional)
 * @returns message confirming Tecnico was deleted
*/
    deleteTecnico(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, Tecnico_orm_1.deleteTecnicoByID)(id);
                    response = {
                        message: `Tecnico with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting Tecnico with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/tecnicos] Delete Tecnico Request WITHOUT ID ');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to update the Tecnicos in the "Tecnicos" Collection from DB
     * @param {string} id Id of Tecnico to update (optional)
     * @returns message confirming Tecnico was Updated
    */
    updateTecnico(id, tecnico) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/tecnicos] Update Tecnico By ID: ${id}`);
                yield (0, Tecnico_orm_1.updateTecnicoByID)(id, tecnico).then((r) => {
                    response = {
                        message: `Tecnico with ID ${id} updated successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/tecnicos] Update Tecnico Request WITHOUD ID');
                response = {
                    message: 'Please, provide an Id to update an existing Tecnico'
                };
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], TecnicosController.prototype, "getTecnico", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TecnicosController.prototype, "createTecnico", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TecnicosController.prototype, "deleteTecnico", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TecnicosController.prototype, "updateTecnico", null);
exports.TecnicosController = TecnicosController = __decorate([
    (0, tsoa_1.Route)("/api/tecnicos"),
    (0, tsoa_1.Tags)("TecnicosController")
], TecnicosController);
//# sourceMappingURL=TecnicosController.js.map