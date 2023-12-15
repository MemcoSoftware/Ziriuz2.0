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
exports.createRepuestoEquipo = exports.updateRepuestoEquipoByID = exports.deleteRepuestoEquipoByID = exports.getRepuestoEquipoByID = exports.getAllRepuestoEquipos = void 0;
const RepuestoEquipo_entity_1 = require("../entities/RepuestoEquipo.entity");
const logger_1 = require("../../../../utils/logger");
const Client_entity_1 = require("../../../users/domain/entities/Client.entity");
// CRUD
/**
 * Método para obtener todos los Repuestos_Equipos de la colección "RepuestoEquipos" en el servidor Mongo.
 */
const getAllRepuestoEquipos = (page, limit) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let repuestoEquipoModel = (0, RepuestoEquipo_entity_1.repuestoEquipoEntity)();
        let clientModel = (0, Client_entity_1.clientEntity)();
        let response = {};
        // Buscar todos los repuestos_equipos (usando paginación) y poblar 'id_cliente'
        const repuestoEquipos = yield repuestoEquipoModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('id_cliente repuesto_name repuesto_cantidad repuesto_precio')
            .populate({
            path: 'id_cliente',
            model: clientModel,
            select: 'client_name client_nit client_address client_telefono client_email',
        })
            .exec();
        response.repuestoEquipos = repuestoEquipos;
        // Contar documentos totales en la colección de RepuestoEquipos
        yield repuestoEquipoModel.countDocuments().then((total) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obteniendo todos los Repuestos_Equipos: ${error}`);
    }
});
exports.getAllRepuestoEquipos = getAllRepuestoEquipos;
/**
 * Método para obtener un solo Repuesto_Equipo por ID de la colección "RepuestoEquipos" en el servidor Mongo.
 */
const getRepuestoEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let repuestoEquipoModel = (0, RepuestoEquipo_entity_1.repuestoEquipoEntity)();
        let clientModel = (0, Client_entity_1.clientEntity)();
        // Buscar Repuesto_Equipo por ID y poblar 'id_cliente'
        return yield repuestoEquipoModel
            .findById(id, { _id: 0 })
            .select('id_cliente repuesto_name repuesto_cantidad repuesto_precio')
            .populate({
            path: 'id_cliente',
            model: clientModel,
            select: 'client_name client_nit client_address client_telefono client_email',
        })
            .exec();
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Obteniendo Repuesto_Equipo por ID: ${error}`);
    }
});
exports.getRepuestoEquipoByID = getRepuestoEquipoByID;
/**
 * Método para eliminar Repuesto_Equipo por ID
 */
const deleteRepuestoEquipoByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let repuestoEquipoModel = (0, RepuestoEquipo_entity_1.repuestoEquipoEntity)();
        // Eliminar Repuesto_Equipo por ID
        return yield repuestoEquipoModel.deleteOne({ _id: id });
    }
    catch (error) {
        (0, logger_1.LogError)('[ORM ERROR]: Eliminando Repuesto_Equipo por ID');
    }
});
exports.deleteRepuestoEquipoByID = deleteRepuestoEquipoByID;
/**
 * Método para actualizar Repuesto_Equipo por ID
 */
const updateRepuestoEquipoByID = (id, repuestoEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = {
            success: false,
            message: "",
        };
        const repuestoEquipoModel = (0, RepuestoEquipo_entity_1.repuestoEquipoEntity)();
        // Buscar el cliente por nombre
        const client = yield (0, Client_entity_1.clientEntity)().findOne({ client_name: repuestoEquipo.id_cliente });
        if (!client) {
            return {
                success: false,
                message: "El cliente no se encontró en la base de datos.",
            };
        }
        // Asociar el cliente al repuestoEquipo
        repuestoEquipo.id_cliente = client._id;
        // Actualizar Repuesto_Equipo por ID
        yield repuestoEquipoModel.findByIdAndUpdate(id, repuestoEquipo);
        response.success = true;
        response.message = "Repuesto_Equipo actualizado exitosamente";
        return response;
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Actualizando Repuesto_Equipo ${id}: ${error}`);
        return {
            success: false,
            message: "Ocurrió un error al actualizar el repuesto_equipo",
        };
    }
});
exports.updateRepuestoEquipoByID = updateRepuestoEquipoByID;
/**
 * Método para crear Repuesto_Equipo
 */
const createRepuestoEquipo = (repuestoEquipo) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const repuestoEquipoModel = (0, RepuestoEquipo_entity_1.repuestoEquipoEntity)();
        // Buscar el cliente por nombre
        const client = yield (0, Client_entity_1.clientEntity)().findOne({ client_name: repuestoEquipo.id_cliente });
        if (!client) {
            return {
                success: false,
                message: "El cliente no se encontró en la base de datos.",
            };
        }
        // Asociar el cliente al repuestoEquipo
        repuestoEquipo.id_cliente = client._id;
        const newRepuestoEquipo = new repuestoEquipoModel(repuestoEquipo);
        yield newRepuestoEquipo.save();
        return {
            success: true,
            message: "Repuesto_Equipo creado exitosamente",
        };
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Creating Repuesto_Equipo: ${error}`);
        return {
            success: false,
            message: "Ocurrió un error al crear el repuesto_equipo",
        };
    }
});
exports.createRepuestoEquipo = createRepuestoEquipo;
//# sourceMappingURL=RepuestosEquipos.orm.js.map