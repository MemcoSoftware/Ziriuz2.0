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
exports.createCampos = exports.updateCamposByID = exports.deleteCamposByID = exports.getCamposByID = exports.getAllCampos = void 0;
const Campos_entity_1 = require("../entities/Campos.entity");
const logger_1 = require("../../../../utils/logger");
const Campos_Tipos_entity_1 = require("../entities/Campos_Tipos.entity");
// CRUD
/**
 * Método para obtener todos los Campos de la colección "Campos" en el servidor Mongo
 */
const getAllCampos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let camposModel = (0, Campos_entity_1.camposEntity)();
        let camposTiposModel = (0, Campos_Tipos_entity_1.camposTiposEntity)(); // Importar la entidad Campos_Tipos
        let response = {};
        // Buscar todos los campos (usando paginación) y poblar 'id_tipo'
        const campos = yield camposModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id id_tipo title valor')
            .populate({
            path: 'id_tipo',
            model: camposTiposModel,
            select: '_id tipo nombre',
        })
            .exec();
        response.campos = campos;
        // Contar documentos totales en la colección Campos
        yield camposModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obtaining All Campos: ${error}`);
    }
});
exports.getAllCampos = getAllCampos;
/**
 * Método para obtener un solo Campo por ID de la colección "Campos" en el servidor Mongo
 */
const getCamposByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let camposModel = (0, Campos_entity_1.camposEntity)();
        let camposTiposModel = (0, Campos_Tipos_entity_1.camposTiposEntity)();
        // Buscar Campo por ID y poblar 'id_tipo'
        return yield camposModel
            .findById(id, { _id: 0 })
            .select('_id id_tipo title valor')
            .populate({
            path: 'id_tipo',
            model: camposTiposModel,
            select: '_id tipo nombre',
        })
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obtaining Campos By ID: ${error}`);
    }
});
exports.getCamposByID = getCamposByID;
/**
 * Método para eliminar Campo por ID
 */
const deleteCamposByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let camposModel = (0, Campos_entity_1.camposEntity)();
        // Eliminar Campo por ID
        return yield camposModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting Campos By ID');
    }
});
exports.deleteCamposByID = deleteCamposByID;
/**
 * Método para actualizar Campo por ID
 */
const updateCamposByID = (id, campos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = {
            success: false,
            message: "",
        };
        const camposModel = (0, Campos_entity_1.camposEntity)();
        // Actualizar Campo por ID
        yield camposModel.findByIdAndUpdate(id, campos);
        response.success = true;
        response.message = "Campo updated successfully";
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Campo ${id}: ${error}`);
        return {
            success: false,
            message: "An error occurred while updating the Campo",
        };
    }
});
exports.updateCamposByID = updateCamposByID;
/**
 * Método para crear Campo
 */
const createCampos = (campos) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const camposModel = (0, Campos_entity_1.camposEntity)();
        const newCampos = new camposModel(campos);
        yield newCampos.save();
        return {
            success: true,
            message: "Campo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Campo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the Campo",
        };
    }
});
exports.createCampos = createCampos;
//# sourceMappingURL=Campos.orm.js.map