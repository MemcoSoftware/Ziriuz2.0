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
exports.createClaseEquipo = exports.updateClaseEquipoByID = exports.deleteClaseEquipoByID = exports.getClaseEquipoByID = exports.getAllClasesEquipos = void 0;
const ClassDevice_entity_1 = require("../entities/ClassDevice.entity");
const logger_1 = require("../../../../utils/logger");
/**
 * Method to obtain all ClasesEquipos from Collection "Modelo_ClasesEquipos" in Mongo Server
 */
const getAllClasesEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
        let response = {};
        // Search all clases equipos (using pagination)
        yield claseEquipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('clase')
            .exec()
            .then((clasesEquipos) => {
            response.clasesEquipos = clasesEquipos;
        });
        // Count total documents in ClasesEquipos collection
        yield claseEquipoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All ClasesEquipos: ${error}`);
    }
});
exports.getAllClasesEquipos = getAllClasesEquipos;
/**
 * Get ClaseEquipo by ID
 */
const getClaseEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
        // Search ClaseEquipo by ID
        return yield claseEquipoModel.findById(id).exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting ClaseEquipo By ID: ${error}`);
    }
});
exports.getClaseEquipoByID = getClaseEquipoByID;
/**
 * Delete ClaseEquipo by ID
 */
const deleteClaseEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
        // Delete ClaseEquipo by ID
        return yield claseEquipoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting ClaseEquipo By ID');
    }
});
exports.deleteClaseEquipoByID = deleteClaseEquipoByID;
/**
 * Update ClaseEquipo by ID
 */
const updateClaseEquipoByID = (id, claseEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
        // Update ClaseEquipo
        return yield claseEquipoModel.findByIdAndUpdate(id, claseEquipo);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating ClaseEquipo ${id}: ${error}`);
    }
});
exports.updateClaseEquipoByID = updateClaseEquipoByID;
/**
 * Create ClaseEquipo
 */
const createClaseEquipo = (claseEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
        const newClaseEquipo = new claseEquipoModel(claseEquipo);
        yield newClaseEquipo.save();
        return {
            success: true,
            message: "ClaseEquipo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating ClaseEquipo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the clase equipo",
        };
    }
});
exports.createClaseEquipo = createClaseEquipo;
//# sourceMappingURL=DeviceClass.orm.js.map