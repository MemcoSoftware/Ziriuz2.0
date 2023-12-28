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
exports.CamposController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../../../utils/logger");
const Campos_orm_1 = require("../domain/orm/Campos.orm");
const Campos_Tipos_entity_1 = require("../domain/entities/Campos_Tipos.entity");
let CamposController = exports.CamposController = class CamposController {
    getCampos(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/campos] Get Campo By ID: ${id}`);
                response = yield (0, Campos_orm_1.getCamposByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/campos] Get All Campos Request');
                response = yield (0, Campos_orm_1.getAllCampos)(page, limit);
            }
            return response;
        });
    }
    deleteCampos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, Campos_orm_1.deleteCamposByID)(id);
                    response = {
                        message: `Campo with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting campo with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/campos] Delete Campo Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    updateCampos(id, camposData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    success: false,
                    message: "",
                };
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/campos] Update Campo Request WITHOUT ID');
                    response.message = "Please provide an Id to update an existing Campo";
                    return response;
                }
                // Verificar si se proporciona un nuevo nombre de tipo
                if (camposData.id_tipo) {
                    // Buscar el tipo de campo por nombre
                    const tipoCampo = yield (0, Campos_Tipos_entity_1.camposTiposEntity)().findOne({ nombre: camposData.id_tipo });
                    if (!tipoCampo) {
                        response.success = false;
                        response.message = "El tipo de campo no se encontró en la base de datos.";
                        return response;
                    }
                    // Asociar el tipo de campo actualizado al campo
                    camposData.id_tipo = tipoCampo._id;
                }
                // Actualizar el campo con los datos proporcionados
                yield (0, Campos_orm_1.updateCamposByID)(id, camposData);
                response.success = true;
                response.message = `Campo with ID ${id} updated successfully`;
                return response;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating Campo ${id}: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while updating the campo",
                };
            }
        });
    }
    createCampos(camposData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extraer el nombre del tipo de campo de los datos del campo
                const tipoCampoNombre = camposData.id_tipo;
                // Buscar el tipo de campo por nombre
                const tipoCampo = yield (0, Campos_Tipos_entity_1.camposTiposEntity)().findOne({ nombre: tipoCampoNombre });
                if (!tipoCampo) {
                    return {
                        success: false,
                        message: "El tipo de campo no se encontró en la base de datos.",
                    };
                }
                // Asociar el tipo de campo al campo
                camposData.id_tipo = tipoCampo._id;
                // Crear el campo
                const response = yield (0, Campos_orm_1.createCampos)(camposData);
                if (response.success) {
                    return response;
                }
                else {
                    (0, logger_1.LogError)(`[Controller ERROR]: Creating Campo: ${response.message}`);
                    return response;
                }
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Creating Campo: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while creating the campo",
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
], CamposController.prototype, "getCampos", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CamposController.prototype, "deleteCampos", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CamposController.prototype, "updateCampos", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CamposController.prototype, "createCampos", null);
exports.CamposController = CamposController = __decorate([
    (0, tsoa_1.Route)("/api/campos"),
    (0, tsoa_1.Tags)("CamposController")
], CamposController);
//# sourceMappingURL=CamposController.js.map