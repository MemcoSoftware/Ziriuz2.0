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
exports.EquipoController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../../../utils/logger");
const Equipo_orm_1 = require("../domain/orm/Equipo.orm");
let EquipoController = exports.EquipoController = class EquipoController {
    getEquipos(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/equipos] Get Equipo By ID: ${id}`);
                response = yield (0, Equipo_orm_1.getEquipoByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/equipos] Get All Equipos Request');
                response = yield (0, Equipo_orm_1.getAllEquipos)(page, limit);
            }
            return response;
        });
    }
    deleteEquipo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, Equipo_orm_1.deleteEquipoByID)(id);
                    response = {
                        message: `Equipo with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting equipo with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/equipos] Delete Equipo Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    updateEquipo(id, equipoData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    success: false,
                    message: "",
                };
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/equipos] Update Equipo Request WITHOUT ID');
                    response.message = "Please provide an Id to update an existing Equipo";
                    return response;
                }
                // Obtener el equipo existente por ID
                const existingEquipo = yield (0, Equipo_orm_1.getEquipoByID)(id);
                if (!existingEquipo) {
                    response.message = `Equipo with ID ${id} not found`;
                    return response;
                }
                // Comprobar si se proporciona un nuevo nombre de modelo
                if (equipoData.modelo_equipos) {
                    // Buscar el modelo de equipo por nombre
                    const modeloEquipo = yield (0, Equipo_orm_1.getModeloEquipoByName)(equipoData.modelo_equipos);
                    if (!modeloEquipo) {
                        response.success = false;
                        response.message = "El modelo de equipo no se encontró en la base de datos.";
                        return response;
                    }
                    // Asociar el modelo de equipo actualizado al equipo
                    equipoData.modelo_equipos = modeloEquipo._id;
                }
                // Comprobar si se proporciona un nuevo nombre de área
                if (equipoData.id_area) {
                    // Buscar el área de equipo por nombre
                    const areaEquipo = yield (0, Equipo_orm_1.getAreaEquipoByName)(equipoData.id_area);
                    if (!areaEquipo) {
                        response.success = false;
                        response.message = "El área de equipo no se encontró en la base de datos.";
                        return response;
                    }
                    // Asociar el área de equipo actualizada al equipo
                    equipoData.id_area = areaEquipo._id;
                }
                // Comprobar si se proporciona un nuevo nombre de tipo
                if (equipoData.id_tipo) {
                    // Buscar el tipo de equipo por nombre
                    const tipoEquipo = yield (0, Equipo_orm_1.getTipoEquipoByName)(equipoData.id_tipo);
                    if (!tipoEquipo) {
                        response.success = false;
                        response.message = "El tipo de equipo no se encontró en la base de datos.";
                        return response;
                    }
                    // Asociar el tipo de equipo actualizado al equipo
                    equipoData.id_tipo = tipoEquipo._id;
                }
                // Actualizar el equipo con los datos proporcionados
                yield (0, Equipo_orm_1.updateEquipoByID)(id, equipoData);
                response.success = true;
                response.message = `Equipo with ID ${id} updated successfully`;
                return response;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating Equipo ${id}: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while updating the equipo",
                };
            }
        });
    }
    createEquipo(equipoData) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extrae el nombre del modelo de equipo, área de equipo y tipo de equipo de los datos del equipo
                const modeloEquipoNombre = equipoData.modelo_equipos;
                const areaEquipoNombre = equipoData.id_area;
                const tipoEquipoNombre = equipoData.id_tipo;
                // Busca el modelo de equipo por nombre
                const modeloEquipo = yield (0, Equipo_orm_1.getModeloEquipoByName)(modeloEquipoNombre);
                if (!modeloEquipo) {
                    return {
                        success: false,
                        message: "El modelo de equipo no se encontró en la base de datos.",
                    };
                }
                // Asocia el modelo de equipo al equipo
                equipoData.modelo_equipos = modeloEquipo._id;
                // Busca el área de equipo por nombre
                const areaEquipo = yield (0, Equipo_orm_1.getAreaEquipoByName)(areaEquipoNombre);
                if (!areaEquipo) {
                    return {
                        success: false,
                        message: "El área de equipo no se encontró en la base de datos.",
                    };
                }
                // Asocia el área de equipo al equipo
                equipoData.id_area = areaEquipo._id;
                // Busca el tipo de equipo por nombre
                const tipoEquipo = yield (0, Equipo_orm_1.getTipoEquipoByName)(tipoEquipoNombre);
                if (!tipoEquipo) {
                    return {
                        success: false,
                        message: "El tipo de equipo no se encontró en la base de datos.",
                    };
                }
                // Asocia el tipo de equipo al equipo
                equipoData.id_tipo = tipoEquipo._id;
                // Crea el equipo con las relaciones establecidas
                const response = yield (0, Equipo_orm_1.createEquipo)(equipoData);
                if (response.success) {
                    return response;
                }
                else {
                    (0, logger_1.LogError)(`[Controller ERROR]: Creating Equipo: ${response.message}`);
                    return response;
                }
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Creating Equipo: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while creating the equipo",
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
], EquipoController.prototype, "getEquipos", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EquipoController.prototype, "deleteEquipo", null);
__decorate([
    (0, tsoa_1.Put)("/") // Cambiamos la anotación @Put para que el ID sea parte de la consulta
    ,
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], EquipoController.prototype, "updateEquipo", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], EquipoController.prototype, "createEquipo", null);
exports.EquipoController = EquipoController = __decorate([
    (0, tsoa_1.Route)("/api/equipos"),
    (0, tsoa_1.Tags)("EquipoController")
], EquipoController);
// Add the CRUD functions for equipment below (e.g., getAllEquipos, getEquipoByID, deleteEquipoByID, updateEquipoByID)
//# sourceMappingURL=EquiposController.js.map