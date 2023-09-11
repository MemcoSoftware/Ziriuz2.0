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
exports.SedeController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
const Sede_orm_1 = require("../domain/orm/Sede.orm");
let SedeController = exports.SedeController = class SedeController {
    getSedes(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/sedes] Get Sede By ID: ${id}`);
                response = yield (0, Sede_orm_1.getSedeByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/sedes] Get All Sedes Request');
                response = yield (0, Sede_orm_1.getAllSedes)(page, limit);
            }
            return response;
        });
    }
    createSede(sedeData) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            try {
                (0, logger_1.LogSuccess)('[/api/sedes] Create Sede Request');
                response = yield (0, Sede_orm_1.createSede)(sedeData);
            }
            catch (error) {
                (0, logger_1.LogError)('[ORM ERROR]: Creating Sede');
            }
            return response;
        });
    }
    deleteSede(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, Sede_orm_1.deleteSedeByID)(id);
                    response = {
                        message: `Sede with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting sede with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/sedes] Delete Sede Request WITHOUT ID ');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    updateSede(id, sedeData) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/sedes] Update Sede By ID: ${id}`);
                yield (0, Sede_orm_1.updateSedeByID)(id, sedeData).then((r) => {
                    response = {
                        message: `Sede with ID ${id} updated successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/sedes] Update Sede Request WITHOUT ID');
                response = {
                    message: 'Please, provide an Id to update an existing Sede'
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
], SedeController.prototype, "getSedes", null);
__decorate([
    (0, tsoa_1.Post)("/"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], SedeController.prototype, "createSede", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SedeController.prototype, "deleteSede", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], SedeController.prototype, "updateSede", null);
exports.SedeController = SedeController = __decorate([
    (0, tsoa_1.Route)("/api/sedes"),
    (0, tsoa_1.Tags)("SedeController")
], SedeController);
//# sourceMappingURL=SedeController.js.map