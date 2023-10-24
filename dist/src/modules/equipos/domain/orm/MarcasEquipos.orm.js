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
exports.createMarcaEquipo = exports.updateMarcaEquipoByID = exports.deleteMarcaEquipoByID = exports.getMarcaEquipoByID = exports.getAllMarcasEquipos = void 0;
const MarcasEquipos_entity_1 = require("../entities/MarcasEquipos.entity");
const logger_1 = require("../../../../utils/logger");
const getAllMarcasEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        let response = {};
        yield marcaEquipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id marca')
            .exec()
            .then((marcasEquipos) => {
            response.marcasEquipos = marcasEquipos;
        });
        yield marcaEquipoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All MarcasEquipos: ${error}`);
    }
});
exports.getAllMarcasEquipos = getAllMarcasEquipos;
const getMarcaEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        return yield marcaEquipoModel.findById(id).select('_id marca').exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting MarcaEquipo By ID: ${error}`);
    }
});
exports.getMarcaEquipoByID = getMarcaEquipoByID;
const deleteMarcaEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        return yield marcaEquipoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting MarcaEquipo By ID');
    }
});
exports.deleteMarcaEquipoByID = deleteMarcaEquipoByID;
const updateMarcaEquipoByID = (id, marcaEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        return yield marcaEquipoModel.findByIdAndUpdate(id, marcaEquipo);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating MarcaEquipo ${id}: ${error}`);
    }
});
exports.updateMarcaEquipoByID = updateMarcaEquipoByID;
const createMarcaEquipo = (marcaEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
        const newMarcaEquipo = new marcaEquipoModel(marcaEquipo);
        yield newMarcaEquipo.save();
        return {
            success: true,
            message: "MarcaEquipo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating MarcaEquipo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the marca equipo",
        };
    }
});
exports.createMarcaEquipo = createMarcaEquipo;
//# sourceMappingURL=MarcasEquipos.orm.js.map