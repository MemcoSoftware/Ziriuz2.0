"use strict";
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
exports.createCamposTipos = exports.updateCamposTiposByID = exports.deleteCamposTiposByID = exports.getCamposTiposByID = exports.getAllCamposTipos = void 0;
const Campos_Tipos_entity_1 = require("../entities/Campos_Tipos.entity");
const logger_1 = require("../../../../utils/logger");
// CRUD
/**
 * Método para obtener todos los Campos_Tipos de la colección "Campos_Tipos" en el servidor Mongo
 */
const getAllCamposTipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camposTiposModel = (0, Campos_Tipos_entity_1.camposTiposEntity)();
        let response = {};
        // Search all camposTipos (using pagination)
        const camposTipos = yield camposTiposModel
            .find({})
            .skip((page - 1) * limit)
            .limit(limit)
            .exec();
        response.camposTipos = camposTipos;
        // Count total documents in Campos_Tipos collection
        yield camposTiposModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obtaining All Campos_Tipos: ${error}`);
    }
});
exports.getAllCamposTipos = getAllCamposTipos;
/**
 * Método para obtener un solo Campos_Tipos por ID de la colección "Campos_Tipos" en el servidor Mongo
 */
const getCamposTiposByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camposTiposModel = (0, Campos_Tipos_entity_1.camposTiposEntity)();
        return yield camposTiposModel.findById(id).exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obtaining Campos_Tipos By ID: ${error}`);
    }
});
exports.getCamposTiposByID = getCamposTiposByID;
/**
 * Método para eliminar Campos_Tipos por ID
 */
const deleteCamposTiposByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camposTiposModel = (0, Campos_Tipos_entity_1.camposTiposEntity)();
        return yield camposTiposModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting Campos_Tipos By ID');
    }
});
exports.deleteCamposTiposByID = deleteCamposTiposByID;
/**
 * Método para actualizar Campos_Tipos por ID
 */
const updateCamposTiposByID = (id, camposTipos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = {
            success: false,
            message: "",
        };
        const camposTiposModel = (0, Campos_Tipos_entity_1.camposTiposEntity)();
        // Actualizar Campos_Tipos por ID
        yield camposTiposModel.findByIdAndUpdate(id, camposTipos);
        response.success = true;
        response.message = "Campos_Tipos updated successfully";
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Campos_Tipos ${id}: ${error}`);
        return {
            success: false,
            message: "An error occurred while updating the Campos_Tipos",
        };
    }
});
exports.updateCamposTiposByID = updateCamposTiposByID;
/**
 * Método para crear Campos_Tipos
 */
const createCamposTipos = (camposTipos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camposTiposModel = (0, Campos_Tipos_entity_1.camposTiposEntity)();
        const newCamposTipos = new camposTiposModel(camposTipos);
        yield newCamposTipos.save();
        return {
            success: true,
            message: "Campos_Tipos created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Campos_Tipos: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the Campos_Tipos",
        };
    }
});
exports.createCamposTipos = createCamposTipos;
//# sourceMappingURL=Campos_Tipos.orm.js.map