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
exports.TipoEquipoController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../../../utils/logger");
const TipoEquipo_orm_1 = require("../domain/orm/TipoEquipo.orm");
let TipoEquipoController = exports.TipoEquipoController = class TipoEquipoController {
    getTiposEquipos(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/tipos-equipos] Get TipoEquipo By ID: ${id}`);
                response = yield (0, TipoEquipo_orm_1.getTipoEquipoByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/tipos-equipos] Get All TiposEquipos Request');
                response = yield (0, TipoEquipo_orm_1.getAllTiposEquipos)(page, limit);
            }
            return response;
        });
    }
    deleteTipoEquipo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, TipoEquipo_orm_1.deleteTipoEquipoByID)(id);
                    response = {
                        message: `TipoEquipo with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting tipo equipo with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/tipos-equipos] Delete TipoEquipo Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    updateTipoEquipo(id, tipoEquipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    success: false,
                    message: "",
                };
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/tipos-equipos] Update TipoEquipo Request WITHOUT ID');
                    response.message = "Please, provide an Id to update an existing TipoEquipo";
                    return response;
                }
                const existingTipoEquipo = yield (0, TipoEquipo_orm_1.getTipoEquipoByID)(id);
                if (!existingTipoEquipo) {
                    response.message = `TipoEquipo with ID ${id} not found`;
                    return response;
                }
                yield (0, TipoEquipo_orm_1.updateTipoEquipoByID)(id, tipoEquipo);
                response.success = true;
                response.message = `TipoEquipo with ID ${id} updated successfully`;
                return response;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating TipoEquipo ${id}: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while updating the tipo equipo",
                };
            }
        });
    }
    createTipoEquipo(tipoEquipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield (0, TipoEquipo_orm_1.createTipoEquipo)(tipoEquipo);
                if (response.success) {
                    return response;
                }
                else {
                    (0, logger_1.LogError)(`[Controller ERROR]: Creating TipoEquipo: ${response.message}`);
                    return response;
                }
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Creating TipoEquipo: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while creating the tipo equipo",
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
], TipoEquipoController.prototype, "getTiposEquipos", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TipoEquipoController.prototype, "deleteTipoEquipo", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], TipoEquipoController.prototype, "updateTipoEquipo", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TipoEquipoController.prototype, "createTipoEquipo", null);
exports.TipoEquipoController = TipoEquipoController = __decorate([
    (0, tsoa_1.Route)("/api/tipos-equipos"),
    (0, tsoa_1.Tags)("TipoEquipoController")
], TipoEquipoController);
//# sourceMappingURL=TipoEquipoController.js.map