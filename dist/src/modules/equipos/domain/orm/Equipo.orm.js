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
exports.getSedeByName = exports.getTipoEquipoByName = exports.getAreaEquipoByName = exports.getModeloEquipoByName = exports.createEquipo = exports.updateEquipoByID = exports.deleteEquipoByID = exports.getEquipoByID = exports.getAllEquipos = void 0;
const Equipo_entity_1 = require("../entities/Equipo.entity");
const logger_1 = require("../../../../utils/logger");
const ModeloEquipo_entity_1 = require("../entities/ModeloEquipo.entity");
const AreaEquipo_entity_1 = require("../entities/AreaEquipo.entity");
const TipoEquipo_entity_1 = require("../entities/TipoEquipo.entity");
const Sede_entity_1 = require("../../../users/domain/entities/Sede.entity");
const Client_entity_1 = require("../../../users/domain/entities/Client.entity");
// CRUD
/**
 * Method to obtain all Equipos from Collection "Equipos" in Mongo Server
 */
/**
 * Method to obtain all Equipos from Collection "Equipos" in Mongo Server
 */
/**
 * Method to obtain all Equipos from Collection "Equipos" in Mongo Server
 */
const getAllEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let equipoModel = (0, Equipo_entity_1.equipoEntity)();
        let equipoModeloModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        let areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        let tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        let sedeModel = (0, Sede_entity_1.sedeEntity)(); // Import the Sede entity
        let clientModel = (0, Client_entity_1.clientEntity)(); // Import the Client entity
        let response = {};
        // Search all equipos (using pagination) and populate 'modelo_equipos', 'id_area', 'id_tipo', 'id_sede', and 'id_client'
        const equipos = yield equipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id serie ubicacion frecuencia modelo_equipos id_area id_tipo id_sede') // Include id_sede
            .populate({
            path: 'modelo_equipos',
            model: equipoModeloModel,
            select: 'modelo precio',
        })
            .populate({
            path: 'id_area',
            model: areaEquipoModel,
            select: 'area',
        })
            .populate({
            path: 'id_tipo',
            model: tipoEquipoModel,
            select: 'tipo',
        })
            .populate({
            path: 'id_sede',
            model: sedeModel,
            select: 'sede_nombre sede_address sede_telefono sede_email id_client', // Include id_client for Clients
        })
            .populate({
            path: 'id_sede.id_client',
            model: clientModel,
            select: 'client_name client_nit client_address client_telefono client_email',
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
        let equipoModel = (0, Equipo_entity_1.equipoEntity)();
        let equipoModeloModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        let areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        let tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        let clientModel = (0, Client_entity_1.clientEntity)();
        // Search Equipo by ID and populate 'modelo_equipos', 'id_area', 'id_tipo', 'id_sede', and 'id_client'
        return yield equipoModel
            .findById(id, { _id: 0 })
            .select('_id serie ubicacion frecuencia modelo_equipos id_area id_tipo id_sede') // Include id_sede
            .populate({
            path: 'modelo_equipos',
            model: equipoModeloModel,
            select: 'modelo precio',
        })
            .populate({
            path: 'id_area',
            model: areaEquipoModel,
            select: 'area',
        })
            .populate({
            path: 'id_tipo',
            model: tipoEquipoModel,
            select: 'tipo',
        })
            .populate({
            path: 'id_sede',
            model: sedeModel,
            select: 'sede_nombre sede_address sede_telefono sede_email id_client', // Include id_client for Clients
        })
            .populate({
            path: 'id_sede.id_client',
            model: clientModel,
            select: 'client_name client_nit client_address client_telefono client_email',
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
const getTipoEquipoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        // Buscar el tipo de equipo por nombre
        const tipo = yield tipoEquipoModel.findOne({ tipo: name });
        return tipo;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Tipo Equipo by Name: ${error}`);
        return null;
    }
});
exports.getTipoEquipoByName = getTipoEquipoByName;
const getSedeByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const sedeModel = (0, Sede_entity_1.sedeEntity)();
        // Buscar el modelo de equipo por nombre
        const sede = yield sedeModel.findOne({ sede_nombre: name });
        return sede;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Sede by Name: ${error}`);
        return null;
    }
});
exports.getSedeByName = getSedeByName;
//# sourceMappingURL=Equipo.orm.js.map