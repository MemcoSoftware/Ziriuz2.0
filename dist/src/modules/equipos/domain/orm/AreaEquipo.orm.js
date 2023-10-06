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
exports.createAreaEquipo = exports.updateAreaEquipoByID = exports.deleteAreaEquipoByID = exports.getAreaEquipoByID = exports.getAllAreasEquipos = void 0;
const AreaEquipo_entity_1 = require("../entities/AreaEquipo.entity");
const logger_1 = require("../../../../utils/logger");
const getAllAreasEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        let response = {};
        yield areaEquipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('area')
            .exec()
            .then((areasEquipos) => {
            response.areasEquipos = areasEquipos;
        });
        yield areaEquipoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All AreasEquipos: ${error}`);
    }
});
exports.getAllAreasEquipos = getAllAreasEquipos;
const getAreaEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        return yield areaEquipoModel.findById(id).exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting AreaEquipo By ID: ${error}`);
    }
});
exports.getAreaEquipoByID = getAreaEquipoByID;
const deleteAreaEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        return yield areaEquipoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting AreaEquipo By ID');
    }
});
exports.deleteAreaEquipoByID = deleteAreaEquipoByID;
const updateAreaEquipoByID = (id, areaEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        return yield areaEquipoModel.findByIdAndUpdate(id, areaEquipo);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating AreaEquipo ${id}: ${error}`);
    }
});
exports.updateAreaEquipoByID = updateAreaEquipoByID;
const createAreaEquipo = (areaEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
        const newAreaEquipo = new areaEquipoModel(areaEquipo);
        yield newAreaEquipo.save();
        return {
            success: true,
            message: "AreaEquipo created successfully",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating AreaEquipo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the area equipo",
        };
    }
});
exports.createAreaEquipo = createAreaEquipo;
//# sourceMappingURL=AreaEquipo.orm.js.map