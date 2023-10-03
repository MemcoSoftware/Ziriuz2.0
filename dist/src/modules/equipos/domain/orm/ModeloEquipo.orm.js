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
exports.createModeloEquipo = exports.updateModeloEquipoByID = exports.deleteModeloEquipoByID = exports.getModeloEquipoByID = exports.getAllModeloEquipos = void 0;
const ModeloEquipo_entity_1 = require("../entities/ModeloEquipo.entity");
const logger_1 = require("../../../../utils/logger");
// CRUD
const getAllModeloEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
        let response = {};
        yield modeloEquipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('modelo precio')
            .exec()
            .then((modeloEquipos) => {
            response.modeloEquipos = modeloEquipos;
        });
        yield modeloEquipoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
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
        return yield modeloEquipoModel.findById(id).exec();
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
//# sourceMappingURL=ModeloEquipo.orm.js.map