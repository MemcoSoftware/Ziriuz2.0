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
exports.createPreventivo = exports.updatePreventivoByID = exports.deletePreventivoByID = exports.getPreventivoByID = exports.getAllPreventivos = void 0;
const Preventivos_entity_1 = require("../entities/Preventivos.entity");
const logger_1 = require("../../../../utils/logger");
const Campos_entity_1 = require("../entities/Campos.entity");
// CRUD
/**
 * Método para obtener todos los Preventivos de la colección "Preventivos" en el servidor Mongo
 */
const getAllPreventivos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let preventivosModel = (0, Preventivos_entity_1.preventivosEntity)();
        let camposModel = (0, Campos_entity_1.camposEntity)(); // Importar la entidad Campos
        let response = {};
        // Buscar todos los preventivos (usando paginación) y poblar campos cualitativos, de mantenimiento, cuantitativos y otros
        const preventivos = yield preventivosModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id title codigo version fecha cualitativo mantenimiento cuantitativo otros')
            .populate({
            path: 'cualitativo mantenimiento cuantitativo otros',
            model: camposModel,
            select: '_id id_tipo title valor',
        })
            .exec();
        response.preventivos = preventivos;
        // Contar documentos totales en la colección Preventivos
        yield preventivosModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obtaining All Preventivos: ${error}`);
    }
});
exports.getAllPreventivos = getAllPreventivos;
/**
 * Método para obtener un solo Preventivo por ID de la colección "Preventivos" en el servidor Mongo
 */
const getPreventivoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let preventivosModel = (0, Preventivos_entity_1.preventivosEntity)();
        let camposModel = (0, Campos_entity_1.camposEntity)(); // Importar la entidad Campos
        // Buscar Preventivo por ID y poblar campos cualitativos, de mantenimiento, cuantitativos y otros
        return yield preventivosModel
            .findById(id, { _id: 0 })
            .select('_id title codigo version fecha cualitativo mantenimiento cuantitativo otros')
            .populate({
            path: 'cualitativo mantenimiento cuantitativo otros',
            model: camposModel,
            select: '_id id_tipo title valor',
        })
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obtaining Preventivo By ID: ${error}`);
    }
});
exports.getPreventivoByID = getPreventivoByID;
/**
 * Método para eliminar Preventivo por ID
 */
const deletePreventivoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let preventivosModel = (0, Preventivos_entity_1.preventivosEntity)();
        // Eliminar Preventivo por ID
        return yield preventivosModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting Preventivo By ID');
    }
});
exports.deletePreventivoByID = deletePreventivoByID;
/**
 * Método para actualizar Preventivo por ID
 */
const updatePreventivoByID = (id, preventivo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = {
            success: false,
            message: "",
        };
        const preventivosModel = (0, Preventivos_entity_1.preventivosEntity)();
        // Actualizar Preventivo por ID
        yield preventivosModel.findByIdAndUpdate(id, preventivo);
        response.success = true;
        response.message = "Preventivo updated successfully";
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Preventivo ${id}: ${error}`);
        return {
            success: false,
            message: "An error occurred while updating the Preventivo",
        };
    }
});
exports.updatePreventivoByID = updatePreventivoByID;
/**
 * Método para crear Preventivo
 */
const createPreventivo = (preventivo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const preventivosModel = (0, Preventivos_entity_1.preventivosEntity)();
        const newPreventivo = new preventivosModel(preventivo);
        yield newPreventivo.save();
        return {
            success: true,
            message: "Preventivo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Preventivo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the Preventivo",
        };
    }
});
exports.createPreventivo = createPreventivo;
//# sourceMappingURL=Preventivos.orm.js.map