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
exports.PreventivosController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../../../utils/logger");
const Preventivos_orm_1 = require("../domain/orm/Preventivos.orm");
const Campos_entity_1 = require("../domain/entities/Campos.entity");
let PreventivosController = exports.PreventivosController = class PreventivosController {
    getPreventivos(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/preventivos] Get Preventivo By ID: ${id}`);
                response = yield (0, Preventivos_orm_1.getPreventivoByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/preventivos] Get All Preventivos Request');
                response = yield (0, Preventivos_orm_1.getAllPreventivos)(page, limit);
            }
            return response;
        });
    }
    deletePreventivos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, Preventivos_orm_1.deletePreventivoByID)(id);
                    response = {
                        message: `Preventivo with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting preventivo with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/preventivos] Delete Preventivo Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    updatePreventivos(id, preventivosData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    success: false,
                    message: "",
                };
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/preventivos] Update Preventivo Request WITHOUT ID');
                    response.message = "Please provide an Id to update an existing Preventivo";
                    return response;
                }
                // Verificar si se proporciona un nuevo nombre de tipo para campos cualitativos
                if (preventivosData.cualitativo) {
                    preventivosData.cualitativo = yield asociarCampos(preventivosData.cualitativo, "cualitativo");
                }
                // Verificar si se proporciona un nuevo nombre de tipo para campos de mantenimiento
                if (preventivosData.mantenimiento) {
                    preventivosData.mantenimiento = yield asociarCampos(preventivosData.mantenimiento, "mantenimiento");
                }
                // Verificar si se proporciona un nuevo nombre de tipo para campos cuantitativos
                if (preventivosData.cuantitativo) {
                    preventivosData.cuantitativo = yield asociarCampos(preventivosData.cuantitativo, "cuantitativo");
                }
                // Verificar si se proporciona un nuevo nombre de tipo para campos otros
                if (preventivosData.otros) {
                    preventivosData.otros = yield asociarCampos(preventivosData.otros, "otros");
                }
                // Actualizar el preventivo con los datos proporcionados
                yield (0, Preventivos_orm_1.updatePreventivoByID)(id, preventivosData);
                response.success = true;
                response.message = `Preventivo with ID ${id} updated successfully`;
                return response;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating Preventivo ${id}: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while updating the preventivo",
                };
            }
            function asociarCampos(nombres, tipoCampo) {
                return __awaiter(this, void 0, void 0, function* () {
                    const camposIds = [];
                    for (const nombre of nombres) {
                        const tipoCampoDocument = yield (0, Campos_entity_1.camposEntity)().findOne({ title: nombre });
                        if (!tipoCampoDocument) {
                            throw new Error(`El tipo de campo '${nombre}' para '${tipoCampo}' no se encontró en la base de datos.`);
                        }
                        camposIds.push(tipoCampoDocument._id);
                    }
                    return camposIds;
                });
            }
        });
    }
    createPreventivos(preventivosData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extraer los nombres de los tipos de campo cualitativo, de mantenimiento, cuantitativo y otros
                const tipoCampoCualitativoNombre = preventivosData.cualitativo || [];
                const tipoCampoMantenimientoNombre = preventivosData.mantenimiento || [];
                const tipoCampoCuantitativoNombre = preventivosData.cuantitativo || [];
                const tipoCampoOtrosNombre = preventivosData.otros || [];
                // Buscar y asociar el tipo de campo actualizado al preventivo
                const asociarCampos = (nombres) => __awaiter(this, void 0, void 0, function* () {
                    const camposIds = [];
                    for (const nombre of nombres) {
                        const tipoCampo = yield (0, Campos_entity_1.camposEntity)().findOne({ title: nombre });
                        if (!tipoCampo) {
                            return {
                                success: false,
                                message: `El tipo de campo '${nombre}' no se encontró en la base de datos.`,
                            };
                        }
                        camposIds.push(tipoCampo._id);
                    }
                    return camposIds;
                });
                preventivosData.cualitativo = yield asociarCampos(tipoCampoCualitativoNombre);
                preventivosData.mantenimiento = yield asociarCampos(tipoCampoMantenimientoNombre);
                preventivosData.cuantitativo = yield asociarCampos(tipoCampoCuantitativoNombre);
                preventivosData.otros = yield asociarCampos(tipoCampoOtrosNombre);
                // Crear el preventivo
                const response = yield (0, Preventivos_orm_1.createPreventivo)(preventivosData);
                if (response.success) {
                    return response;
                }
                else {
                    (0, logger_1.LogError)(`[Controller ERROR]: Creating Preventivo: ${response.message}`);
                    return response;
                }
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Creating Preventivo: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while creating the preventivo",
                };
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], PreventivosController.prototype, "getPreventivos", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PreventivosController.prototype, "deletePreventivos", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], PreventivosController.prototype, "updatePreventivos", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PreventivosController.prototype, "createPreventivos", null);
exports.PreventivosController = PreventivosController = __decorate([
    (0, tsoa_1.Route)("/api/preventivos"),
    (0, tsoa_1.Tags)("PreventivosController")
], PreventivosController);
//# sourceMappingURL=PreventivosController.js.map