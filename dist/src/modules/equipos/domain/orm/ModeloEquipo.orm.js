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
exports.getMarcaEquipoByName = exports.getClaseEquipoByName = exports.createModeloEquipo = exports.updateModeloEquipoByID = exports.deleteModeloEquipoByID = exports.getModeloEquipoByID = exports.getAllModeloEquipos = void 0;
const ModeloEquipo_entity_1 = require("../entities/ModeloEquipo.entity");
const logger_1 = require("../../../../utils/logger");
const MarcasEquipos_entity_1 = require("../entities/MarcasEquipos.entity");
const ClassDevice_entity_1 = require("../entities/ClassDevice.entity");
// CRUD
const getAllModeloEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        let response = {};
        const marcaEquipo = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        const claseEquipo = (0, ClassDevice_entity_1.classDeviceEntity)();
        const modeloEquipos = yield modeloEquipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id modelo precio id_marca id_clase')
            .populate({
            path: 'id_marca',
            model: marcaEquipo,
            select: 'marca',
        }) // Populate de la relación con Marcas_Equipos
            .populate({
            path: 'id_clase',
            model: claseEquipo,
            select: 'clase',
        }) // Populate de la relación con Clases_Equipos
            .exec();
        response.modeloEquipos = modeloEquipos;
        const total = yield modeloEquipoModel.countDocuments();
        response.totalPages = Math.ceil(total / limit);
        response.currentPage = page;
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All ModeloEquipos: ${error}`);
    }
});
exports.getAllModeloEquipos = getAllModeloEquipos;
const getModeloEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        const marcaEquipo = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        const claseEquipo = (0, ClassDevice_entity_1.classDeviceEntity)();
        return yield modeloEquipoModel.findById(id, { _id: 0 })
            .select('_id modelo precio id_marca id_clase') // Include id_marca y id_clase
            .populate({
            path: 'id_marca',
            model: marcaEquipo,
            select: 'marca',
        }) // Populate de la relación con Marcas_Equipos
            .populate({
            path: 'id_clase',
            model: claseEquipo,
            select: 'clase',
        }) // Populate de la relación con Clases_Equipos
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting ModeloEquipo By ID: ${error}`);
    }
});
exports.getModeloEquipoByID = getModeloEquipoByID;
const deleteModeloEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        return yield modeloEquipoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting ModeloEquipo By ID');
    }
});
exports.deleteModeloEquipoByID = deleteModeloEquipoByID;
const updateModeloEquipoByID = (id, equipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        return yield modeloEquipoModel.findByIdAndUpdate(id, equipo);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating ModeloEquipo ${id}: ${error}`);
    }
});
exports.updateModeloEquipoByID = updateModeloEquipoByID;
const createModeloEquipo = (equipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        const newModeloEquipo = new modeloEquipoModel(equipo);
        yield newModeloEquipo.save();
        return {
            success: true,
            message: "ModeloEquipo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Creating ModeloEquipo');
        return {
            success: false,
            message: "An error occurred while creating the ModeloEquipo",
        };
    }
});
exports.createModeloEquipo = createModeloEquipo;
// Función para obtener una Clase de Equipo por nombre
const getClaseEquipoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
        // Buscar la clase de equipo por nombre
        const clase = yield claseEquipoModel.findOne({ clase: name });
        return clase;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Clase de Equipo by Name: ${error}`);
        return null;
    }
});
exports.getClaseEquipoByName = getClaseEquipoByName;
// Función para obtener una Marca de Equipo por nombre
const getMarcaEquipoByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        // Buscar la marca de equipo por nombre
        const marca = yield marcaEquipoModel.findOne({ marca: name });
        return marca;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Marca de Equipo by Name: ${error}`);
        return null;
    }
});
exports.getMarcaEquipoByName = getMarcaEquipoByName;
//# sourceMappingURL=ModeloEquipo.orm.js.map