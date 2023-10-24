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
exports.createTipoEquipo = exports.updateTipoEquipoByID = exports.deleteTipoEquipoByID = exports.getTipoEquipoByID = exports.getAllTiposEquipos = void 0;
const TipoEquipo_entity_1 = require("../entities/TipoEquipo.entity");
const logger_1 = require("../../../../utils/logger");
const getAllTiposEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        let response = {};
        yield tipoEquipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id tipo')
            .exec()
            .then((tiposEquipos) => {
            response.tiposEquipos = tiposEquipos;
        });
        yield tipoEquipoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All TiposEquipos: ${error}`);
    }
});
exports.getAllTiposEquipos = getAllTiposEquipos;
const getTipoEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        return yield tipoEquipoModel.findById(id).select('_id tipo').exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting TipoEquipo By ID: ${error}`);
    }
});
exports.getTipoEquipoByID = getTipoEquipoByID;
const deleteTipoEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        return yield tipoEquipoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting TipoEquipo By ID');
    }
});
exports.deleteTipoEquipoByID = deleteTipoEquipoByID;
const updateTipoEquipoByID = (id, tipoEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        return yield tipoEquipoModel.findByIdAndUpdate(id, tipoEquipo);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating TipoEquipo ${id}: ${error}`);
    }
});
exports.updateTipoEquipoByID = updateTipoEquipoByID;
const createTipoEquipo = (tipoEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
        const newTipoEquipo = new tipoEquipoModel(tipoEquipo);
        yield newTipoEquipo.save();
        return {
            success: true,
            message: "TipoEquipo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating TipoEquipo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the tipo equipo",
        };
    }
});
exports.createTipoEquipo = createTipoEquipo;
//# sourceMappingURL=TipoEquipo.orm.js.map