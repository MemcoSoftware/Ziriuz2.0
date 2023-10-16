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
exports.ModeloEquipoController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../../../utils/logger");
const ModeloEquipo_orm_1 = require("../domain/orm/ModeloEquipo.orm");
let ModeloEquipoController = exports.ModeloEquipoController = class ModeloEquipoController {
    getModeloEquipos(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/modeloEquipos] Get ModeloEquipo By ID: ${id}`);
                response = yield (0, ModeloEquipo_orm_1.getModeloEquipoByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/modeloEquipos] Get All ModeloEquipos Request');
                response = yield (0, ModeloEquipo_orm_1.getAllModeloEquipos)(page, limit);
            }
            return response;
        });
    }
    deleteModeloEquipo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, ModeloEquipo_orm_1.deleteModeloEquipoByID)(id);
                    response = {
                        message: `ModeloEquipo with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting ModeloEquipo with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/modeloEquipos] Delete ModeloEquipo Request WITHOUT ID');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    updateModeloEquipo(id, equipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let response = {
                    success: false,
                    message: "",
                };
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/modeloEquipos] Update ModeloEquipo Request WITHOUT ID');
                    response.message = "Please, provide an ID to update an existing ModeloEquipo";
                    return response;
                }
                const existingModeloEquipo = yield (0, ModeloEquipo_orm_1.getModeloEquipoByID)(id);
                if (!existingModeloEquipo) {
                    response.message = `ModeloEquipo with ID ${id} not found`;
                    return response;
                }
                // Comprueba si se proporciona un nuevo nombre de marca de equipo
                if (equipo.id_marca) {
                    const marcaEquipo = yield (0, ModeloEquipo_orm_1.getMarcaEquipoByName)(equipo.id_marca);
                    if (!marcaEquipo) {
                        response.success = false;
                        response.message = "La marca de equipo no se encontró en la base de datos.";
                        return response;
                    }
                    equipo.id_marca = marcaEquipo._id;
                }
                // Comprueba si se proporciona un nuevo nombre de clase de equipo
                if (equipo.id_clase) {
                    const claseEquipo = yield (0, ModeloEquipo_orm_1.getClaseEquipoByName)(equipo.id_clase);
                    if (!claseEquipo) {
                        response.success = false;
                        response.message = "La clase de equipo no se encontró en la base de datos.";
                        return response;
                    }
                    equipo.id_clase = claseEquipo._id;
                }
                yield (0, ModeloEquipo_orm_1.updateModeloEquipoByID)(id, equipo);
                response.success = true;
                response.message = `ModeloEquipo with ID ${id} updated successfully`;
                return response;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating ModeloEquipo ${id}: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while updating the ModeloEquipo",
                };
            }
        });
    }
    createModeloEquipo(equipo) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Comprueba si se proporciona un nuevo nombre de marca de equipo
                if (equipo.id_marca) {
                    const marcaEquipo = yield (0, ModeloEquipo_orm_1.getMarcaEquipoByName)(equipo.id_marca);
                    if (marcaEquipo) {
                        equipo.id_marca = marcaEquipo._id;
                    }
                    else {
                        return {
                            success: false,
                            message: "La marca de equipo no se encontró en la base de datos.",
                        };
                    }
                }
                // Comprueba si se proporciona un nuevo nombre de clase de equipo
                if (equipo.id_clase) {
                    const claseEquipo = yield (0, ModeloEquipo_orm_1.getClaseEquipoByName)(equipo.id_clase);
                    if (claseEquipo) {
                        equipo.id_clase = claseEquipo._id;
                    }
                    else {
                        return {
                            success: false,
                            message: "La clase de equipo no se encontró en la base de datos.",
                        };
                    }
                }
                const response = yield (0, ModeloEquipo_orm_1.createModeloEquipo)(equipo);
                if (response.success) {
                    return response;
                }
                else {
                    (0, logger_1.LogError)(`[Controller ERROR]: Creating ModeloEquipo: ${response.message}`);
                    return response;
                }
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Creating ModeloEquipo: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while creating the ModeloEquipo",
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
], ModeloEquipoController.prototype, "getModeloEquipos", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ModeloEquipoController.prototype, "deleteModeloEquipo", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ModeloEquipoController.prototype, "updateModeloEquipo", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ModeloEquipoController.prototype, "createModeloEquipo", null);
exports.ModeloEquipoController = ModeloEquipoController = __decorate([
    (0, tsoa_1.Route)("/api/modeloEquipos"),
    (0, tsoa_1.Tags)("ModeloEquipoController")
], ModeloEquipoController);
//# sourceMappingURL=ModeloEquipoController.js.map