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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerTecnico = exports.updateTecnicoByID = exports.createTecnico = exports.deleteTecnicoByID = exports.getTecnicoByID = exports.getAllTecnicos = void 0;
const Tecnicos_entity_1 = require("../entities/Tecnicos.entity");
const logger_1 = require("../../utils/logger");
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// Environment variables Configuration
dotenv_1.default.config();
// CRUD
/**
 * Method to obtain all Tecnicos from Collection "tecnicos" in Mongo Server
 */
const getAllTecnicos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tecnicoModel = (0, Tecnicos_entity_1.tecnicoEntity)();
        let response = {};
        // Search all Tecnicos (using pagination)
        yield tecnicoModel.find()
            .limit(limit)
            .skip((page - 1) * limit)
            .exec().then((tecnicos) => {
            response.tecnicos = tecnicos;
        });
        // Count total documents in Tecnicos collection
        yield tecnicoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Tecnicos: ${error}`);
        // throw error;
    }
});
exports.getAllTecnicos = getAllTecnicos;
// - GET Tecnico by ID
const getTecnicoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tecnicoModel = (0, Tecnicos_entity_1.tecnicoEntity)();
        // Search Tecnicos by ID
        return yield tecnicoModel.findById(id);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Tecnico By ID: ${error}`);
    }
});
exports.getTecnicoByID = getTecnicoByID;
// - Delete Tecnico By ID
const deleteTecnicoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tecnicoModel = (0, Tecnicos_entity_1.tecnicoEntity)();
        // Delete Tecnicos BY ID
        return yield tecnicoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Deleting Tecnico By ID');
    }
});
exports.deleteTecnicoByID = deleteTecnicoByID;
// - Create New Tecnico
const createTecnico = (tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tecnicoModel = (0, Tecnicos_entity_1.tecnicoEntity)();
        // Create / Insert New Tecnicos
        return yield tecnicoModel.create(tecnico);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Tecnico: ${error}`);
    }
});
exports.createTecnico = createTecnico;
// - Update Tecnicos BY ID
const updateTecnicoByID = (id, tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tecnicoModel = (0, Tecnicos_entity_1.tecnicoEntity)();
        //  Update Tecnicos
        return yield tecnicoModel.findByIdAndUpdate(id, tecnico);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Updating Tecnico ${id}: ${error}`);
    }
});
exports.updateTecnicoByID = updateTecnicoByID;
// Register Tecnico
const registerTecnico = (tecnico) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tecnicoModel = (0, Tecnicos_entity_1.tecnicoEntity)();
        // Create / Insert New Tecnico
        return yield tecnicoModel.create(tecnico);
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Registering Tecnico: ${error}`);
    }
});
exports.registerTecnico = registerTecnico;
//# sourceMappingURL=Tecnico.orm.js.map