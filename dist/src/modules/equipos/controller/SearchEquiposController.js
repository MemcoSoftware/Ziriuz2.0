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
const logger_1 = require("../../../utils/logger");
const Equipo_entity_1 = require("../domain/entities/Equipo.entity");
const TipoEquipo_entity_1 = require("../domain/entities/TipoEquipo.entity");
const Sede_entity_1 = require("../../../modules/users/domain/entities/Sede.entity");
const Client_entity_1 = require("../../../modules/users/domain/entities/Client.entity");
const ModeloEquipo_entity_1 = require("../domain/entities/ModeloEquipo.entity");
const AreaEquipo_entity_1 = require("../domain/entities/AreaEquipo.entity");
const MarcasEquipos_entity_1 = require("../domain/entities/MarcasEquipos.entity");
const ClassDevice_entity_1 = require("../domain/entities/ClassDevice.entity");
class SearchEquiposController {
    searchEquiposByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for equipos with keyword: ${keyword}`);
                const equipoModel = (0, Equipo_entity_1.equipoEntity)();
                const equipoModeloModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
                const areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
                const tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
                const sedeModel = (0, Sede_entity_1.sedeEntity)(); // Import the Sede entity
                const clientModel = (0, Client_entity_1.clientEntity)(); // Import the Client entity
                // Primero, busca el ID de la sede por palabra clave en campos relevantes
                const sedes = yield sedeModel.find({ sede_nombre: { $regex: keyword, $options: 'i' } }).select('_id');
                const sedeIds = sedes.map(sede => sede._id);
                // Luego, busca el ID del modelo de equipo por palabra clave en campos relevantes
                const modelos = yield equipoModeloModel.find({ modelo: { $regex: keyword, $options: 'i' } }).select('_id');
                const modeloIds = modelos.map(modelo => modelo._id);
                // Luego, busca el ID del área de equipo por palabra clave en campos relevantes
                const areas = yield areaEquipoModel.find({ area: { $regex: keyword, $options: 'i' } }).select('_id');
                const areaIds = areas.map(area => area._id);
                // Luego, busca el ID del tipo de equipo por palabra clave en campos relevantes
                const tipos = yield tipoEquipoModel.find({ tipo: { $regex: keyword, $options: 'i' } }).select('_id');
                const tipoIds = tipos.map(tipo => tipo._id);
                // Realiza la búsqueda de equipos por la palabra clave y las asociaciones
                const equipos = yield equipoModel
                    .find({
                    $or: [
                        { serie: { $regex: keyword, $options: 'i' } },
                        { ubicacion: { $regex: keyword, $options: 'i' } },
                        { id_sede: { $in: sedeIds } },
                        { modelo_equipos: { $in: modeloIds } },
                        { id_area: { $in: areaIds } },
                        { id_tipo: { $in: tipoIds } },
                    ],
                })
                    .select('serie ubicacion frecuencia id_sede modelo_equipos id_area id_tipo') // Puedes seleccionar los campos que desees
                    // Popula las relaciones virtuales, si es necesario
                    .populate({
                    path: 'modeloEquipo',
                    model: equipoModeloModel,
                    select: 'modelo',
                })
                    .populate({
                    path: 'areaEquipo',
                    model: areaEquipoModel,
                    select: 'area',
                })
                    .populate({
                    path: 'tipoEquipo',
                    model: tipoEquipoModel,
                    select: 'tipo',
                })
                    .populate({
                    path: 'sedeEquipo',
                    model: sedeModel,
                    select: 'sede_nombre',
                });
                return equipos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de equipos.');
            }
        });
    }
    searchModelosEquiposByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for modelos de equipos with keyword: ${keyword}`);
                const modeloEquipoModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
                const marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
                const claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
                // Primero, busca el ID de la marca de equipo por palabra clave en campos relevantes
                const marcas = yield marcaEquipoModel.find({ marca: { $regex: keyword, $options: 'i' } }).select('_id');
                const marcaIds = marcas.map(marca => marca._id);
                // Luego, busca el ID de la clase de equipo por palabra clave en campos relevantes
                const clases = yield claseEquipoModel.find({ clase: { $regex: keyword, $options: 'i' } }).select('_id');
                const claseIds = clases.map(clase => clase._id);
                // Realiza la búsqueda de modelos de equipos por la palabra clave y las asociaciones
                const modelosEquipos = yield modeloEquipoModel
                    .find({
                    $or: [
                        { modelo: { $regex: keyword, $options: 'i' } },
                        { id_marca: { $in: marcaIds } },
                        { id_clase: { $in: claseIds } },
                    ],
                })
                    .select('modelo precio id_marca id_clase') // Puedes seleccionar los campos que desees
                    // Popula las relaciones virtuales, si es necesario
                    .populate({
                    path: 'marcaEquipo',
                    model: marcaEquipoModel,
                    select: 'marca',
                })
                    .populate({
                    path: 'claseEquipo',
                    model: claseEquipoModel,
                    select: 'clase',
                });
                return modelosEquipos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de modelos de equipos.');
            }
        });
    }
    searchAreasEquiposByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for áreas de equipos with keyword: ${keyword}`);
                const areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
                // Realiza la búsqueda de áreas de equipos por la palabra clave
                const areasEquipos = yield areaEquipoModel.find({ area: { $regex: keyword, $options: 'i' } });
                return areasEquipos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de áreas de equipos.');
            }
        });
    }
    searchClasesEquiposByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for clases de equipos with keyword: ${keyword}`);
                const claseEquipoModel = (0, ClassDevice_entity_1.classDeviceEntity)();
                // Realiza la búsqueda de clases de equipos por la palabra clave
                const clasesEquipos = yield claseEquipoModel.find({ clase: { $regex: keyword, $options: 'i' } });
                return clasesEquipos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de clases de equipos.');
            }
        });
    }
    searchMarcasEquiposByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for marcas de equipos with keyword: ${keyword}`);
                const marcaEquipoModel = (0, MarcasEquipos_entity_1.marcaEquipoEntity)();
                // Realiza la búsqueda de marcas de equipos por la palabra clave en el campo 'marca'
                const marcasEquipos = yield marcaEquipoModel.find({ marca: { $regex: keyword, $options: 'i' } });
                return marcasEquipos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de marcas de equipos.');
            }
        });
    }
    searchTiposEquiposByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for tipos de equipos with keyword: ${keyword}`);
                const tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
                // Realiza la búsqueda de tipos de equipos por la palabra clave en el campo 'tipo'
                const tiposEquipos = yield tipoEquipoModel.find({ tipo: { $regex: keyword, $options: 'i' } });
                return tiposEquipos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de tipos de equipos.');
            }
        });
    }
}
exports.default = new SearchEquiposController();
//# sourceMappingURL=SearchEquiposController.js.map