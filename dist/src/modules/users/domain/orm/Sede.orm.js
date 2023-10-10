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
exports.getClientByName = exports.createSede = exports.updateSedeByID = exports.deleteSedeByID = exports.getSedeByID = exports.getAllSedes = void 0;
const Sede_entity_1 = require("../entities/Sede.entity");
const logger_1 = require("../../../../utils/logger");
const Client_entity_1 = require("../entities/Client.entity");
const getAllSedes = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        let clientModel = (0, Client_entity_1.clientEntity)();
        let response = {};
        yield sedeModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id sede_nombre sede_address sede_telefono sede_email id_client') // Agrega el campo id_client para la referencia
            .populate({
            path: 'id_client',
            model: clientModel,
            select: 'client_name client_nit client_address client_telefono client_email', // Campos que deseas seleccionar
        })
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
        let clientModel = (0, Client_entity_1.clientEntity)();
        return yield sedeModel.findById(id)
            .select('_id sede_nombre sede_address sede_telefono sede_email id_client') // Agrega el campo id_client para la referencia
            .populate({
            path: 'id_client',
            model: clientModel,
            select: 'client_name client_nit client_address client_telefono client_email', // Campos que deseas seleccionar
        })
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Sede By ID: ${error}`);
    }
});
exports.getSedeByID = getSedeByID;
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
const createSede = (sedeData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let sedeModel = (0, Sede_entity_1.sedeEntity)();
        const createdSede = yield sedeModel.create(sedeData);
        if (createdSede) {
            return {
                success: true,
                message: "Sede created successfully",
                sedeData: createdSede // Devolver la sede recién creada
            };
        }
        else {
            return {
                success: false,
                message: "An error occurred while creating the sede"
            };
        }
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Sede: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the sede"
        };
    }
});
exports.createSede = createSede;
// * THIS PART BELOW COMPLEMENTS CREATESEDE FUNCTION
const getClientByName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const clientModel = (0, Client_entity_1.clientEntity)();
        // Buscar el cliente por nombre
        const client = yield clientModel.findOne({ client_name: name });
        return client;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting Client by Name: ${error}`);
        return null;
    }
});
exports.getClientByName = getClientByName;
//# sourceMappingURL=Sede.orm.js.map