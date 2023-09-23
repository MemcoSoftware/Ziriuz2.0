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
exports.updateSedeByID = exports.deleteSedeByID = exports.createSede = exports.getSedeByID = exports.getAllSedes = void 0;
const Sede_entity_1 = require("../entities/Sede.entity");
const logger_1 = require("../../utils/logger");
const getAllSedes = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        let response = {};
        yield sedeModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id sede_nombre sede_address sede_telefono sede_email')
            .exec()
            .then((sedes) => {
            response.sedes = sedes;
        });
        yield sedeModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Sedes: ${error}`);
    }
});
exports.getAllSedes = getAllSedes;
const getSedeByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        return yield sedeModel.findById(id)
            .select('_id sede_nombre sede_address sede_telefono sede_email')
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Sede By ID: ${error}`);
    }
});
exports.getSedeByID = getSedeByID;
const createSede = (sedeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        return yield sedeModel.create(sedeData);
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Creating Sede');
    }
});
exports.createSede = createSede;
const deleteSedeByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        return yield sedeModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting Sede By ID');
    }
});
exports.deleteSedeByID = deleteSedeByID;
const updateSedeByID = (id, sedeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        return yield sedeModel.findByIdAndUpdate(id, sedeData);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Sede ${id}: ${error}`);
    }
});
exports.updateSedeByID = updateSedeByID;
//# sourceMappingURL=Sede.orm.js.map