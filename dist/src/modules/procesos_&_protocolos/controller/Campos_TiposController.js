"use strict";
// Campos_TiposController.ts
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
exports.Campos_TiposController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../../../utils/logger");
const Campos_Tipos_orm_1 = require("../domain/orm/Campos_Tipos.orm");
let Campos_TiposController = exports.Campos_TiposController = class Campos_TiposController {
    getCamposTipos(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/campos_tipos] Get Campos_Tipos By ID: ${id}`);
                response = yield (0, Campos_Tipos_orm_1.getCamposTiposByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/campos_tipos] Get All Campos_Tipos Request');
                response = yield (0, Campos_Tipos_orm_1.getAllCamposTipos)(page, limit);
            }
            return response;
        });
    }
    deleteCamposTipos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, Campos_Tipos_orm_1.deleteCamposTiposByID)(id);
                    response = {
                        message: `Campos_Tipos with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting Campos_Tipos with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/campos_tipos] Delete Campos_Tipos Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    updateCamposTipos(id, camposTiposData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    success: false,
                    message: "",
                };
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/campos_tipos] Update Campos_Tipos Request WITHOUT ID');
                    response.message = "Please provide an Id to update an existing Campos_Tipos";
                    return response;
                }
                // Actualizar Campos_Tipos por ID
                yield (0, Campos_Tipos_orm_1.updateCamposTiposByID)(id, camposTiposData);
                response.success = true;
                response.message = `Campos_Tipos with ID ${id} updated successfully`;
                return response;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating Campos_Tipos ${id}: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while updating the Campos_Tipos",
                };
            }
        });
    }
    createCamposTipos(camposTiposData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Crear Campos_Tipos con los datos proporcionados
                const response = yield (0, Campos_Tipos_orm_1.createCamposTipos)(camposTiposData);
                if (response.success) {
                    return response;
                }
                else {
                    (0, logger_1.LogError)(`[Controller ERROR]: Creating Campos_Tipos: ${response.message}`);
                    return response;
                }
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Creating Campos_Tipos: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while creating the Campos_Tipos",
                };
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
], Campos_TiposController.prototype, "getCamposTipos", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], Campos_TiposController.prototype, "deleteCamposTipos", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], Campos_TiposController.prototype, "updateCamposTipos", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Campos_TiposController.prototype, "createCamposTipos", null);
exports.Campos_TiposController = Campos_TiposController = __decorate([
    (0, tsoa_1.Route)("/api/campos_tipos"),
    (0, tsoa_1.Tags)("Campos_TiposController")
], Campos_TiposController);
//# sourceMappingURL=Campos_TiposController.js.map