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
exports.createEquipo = exports.getAreaEquipoByName = exports.getModeloEquipoByName = exports.updateEquipoByID = exports.deleteEquipoByID = exports.getEquipoByID = exports.getAllEquipos = void 0;
const Equipo_entity_1 = require("../entities/Equipo.entity");
const logger_1 = require("../../../../utils/logger");
const ModeloEquipo_entity_1 = require("../entities/ModeloEquipo.entity");
const AreaEquipo_entity_1 = require("../entities/AreaEquipo.entity");
// CRUD
/**
 * Method to obtain all Equipos from Collection "Equipos" in Mongo Server
 */
const getAllEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipoModel = (0, Equipo_entity_1.equipoEntity)();
        let response = {};
        // Search all equipos (using pagination) and populate 'modelo_equipos' and 'id_area'
        const equipos = yield equipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('serie ubicacion frecuencia modelo_equipos id_area')
            .populate({
            path: 'modelo_equipos',
            model: 'Modelo_Equipos',
            select: 'modelo precio',
        })
            .populate({
            path: 'id_area',
            model: 'Areas_Equipos',
            select: 'area',
        })
            .exec();
        response.equipos = equipos;
        // Count total documents in Equipos collection
        yield equipoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Equipos: ${error}`);
    }
});
exports.getAllEquipos = getAllEquipos;
/**
 * Method to obtain a single Equipo by ID from Collection "Equipos" in Mongo Server
 */
const getEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipoModel = (0, Equipo_entity_1.equipoEntity)();
        // Search Equipo by ID and populate 'modelo_equipos' and 'id_area'
        return yield equipoModel
            .findById(id, { _id: 0 })
            .select('serie ubicacion frecuencia modelo_equipos id_area')
            .populate({
            path: 'modelo_equipos',
            model: 'Modelo_Equipos',
            select: 'modelo precio',
        })
            .populate({
            path: 'id_area',
            model: 'Areas_Equipos',
            select: 'area',
        })
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Equipo By ID: ${error}`);
    }
});
exports.getEquipoByID = getEquipoByID;
/**
 * Delete Equipo by ID
 */
const deleteEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let equipoModel = (0, Equipo_entity_1.equipoEntity)();
        // Delete Equipo by ID
        return yield equipoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting Equipo By ID');
    }
});
exports.deleteEquipoByID = deleteEquipoByID;
/**
 * Update Equipo by ID
 */
const updateEquipoByID = (id, equipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = {
            success: false,
            message: "",
        };
        const equipoModel = (0, Equipo_entity_1.equipoEntity)();
        // Actualizar el equipo por ID
        yield equipoModel.findByIdAndUpdate(id, equipo);
        response.success = true;
        response.message = "Equipo updated successfully";
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Equipo ${id}: ${error}`);
        return {
            success: false,
            message: "An error occurred while updating the equipo",
        };
    }
});
exports.updateEquipoByID = updateEquipoByID;
/**
 * Obtener el modelo de equipo por nombre.
 * @param name Nombre del modelo de equipo.
 * @returns Modelo de equipo encontrado o nulo si no se encuentra.
 */
const getModeloEquipoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        // Buscar el modelo de equipo por nombre
        const modelo = yield modeloEquipoModel.findOne({ modelo: name });
        return modelo;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Modelo Equipo by Name: ${error}`);
        return null;
    }
});
exports.getModeloEquipoByName = getModeloEquipoByName;
const getAreaEquipoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        // Buscar el área de equipo por nombre
        const area = yield areaEquipoModel.findOne({ area: name });
        return area;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Area Equipo by Name: ${error}`);
        return null;
    }
});
exports.getAreaEquipoByName = getAreaEquipoByName;
/**
 * Create Equipo
 *
 * */
const createEquipo = (equipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const equipoModel = (0, Equipo_entity_1.equipoEntity)();
        const newEquipo = new equipoModel(equipo);
        yield newEquipo.save();
        return {
            success: true,
            message: "Equipo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Equipo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the equipo",
        };
    }
});
exports.createEquipo = createEquipo;
//# sourceMappingURL=Equipo.orm.js.map