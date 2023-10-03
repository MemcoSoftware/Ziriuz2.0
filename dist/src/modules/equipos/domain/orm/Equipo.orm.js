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
exports.createEquipo = exports.updateEquipoByID = exports.deleteEquipoByID = exports.getEquipoByID = exports.getAllEquipos = void 0;
const Equipo_entity_1 = require("../entities/Equipo.entity");
const logger_1 = require("../../../../utils/logger");
// CRUD
/**
 * Method to obtain all Equipos from Collection "Equipos" in Mongo Server
 */
const getAllEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let equipoModel = (0, Equipo_entity_1.equipoEntity)();
        let response = {};
        // Search all equipos (using pagination)
        yield equipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('serie ubicación frecuencia')
            .exec()
            .then((equipos) => {
            response.equipos = equipos;
        });
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
 * Get Equipo by ID
 */
const getEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let equipoModel = (0, Equipo_entity_1.equipoEntity)();
        // Search Equipo by ID
        return yield equipoModel.findById(id).exec();
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
        let equipoModel = (0, Equipo_entity_1.equipoEntity)();
        // Update Equipo
        return yield equipoModel.findByIdAndUpdate(id, equipo);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Equipo ${id}: ${error}`);
    }
});
exports.updateEquipoByID = updateEquipoByID;
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