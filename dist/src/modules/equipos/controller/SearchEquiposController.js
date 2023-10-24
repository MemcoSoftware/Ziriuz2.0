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
const Equipo_entity_1 = require("../domain/entities/Equipo.entity"); // Asegúrate de importar el modelo correcto
const ModeloEquipo_entity_1 = require("../domain/entities/ModeloEquipo.entity");
const AreaEquipo_entity_1 = require("../domain/entities/AreaEquipo.entity");
const TipoEquipo_entity_1 = require("../domain/entities/TipoEquipo.entity");
const Sede_entity_1 = require("../../../modules/users/domain/entities/Sede.entity");
const Client_entity_1 = require("../../../modules/users/domain/entities/Client.entity");
class SearchEquiposController {
    searchEquiposByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for equipos with keyword: ${keyword}`);
                const equipoModel = (0, Equipo_entity_1.equipoEntity)();
                let equipoModeloModel = (0, ModeloEquipo_entity_1.modeloEquipoEntity)();
                let areaEquipoModel = (0, AreaEquipo_entity_1.areaEquipoEntity)();
                let tipoEquipoModel = (0, TipoEquipo_entity_1.tipoEquipoEntity)();
                let sedeModel = (0, Sede_entity_1.sedeEntity)(); // Import the Sede entity
                let clientModel = (0, Client_entity_1.clientEntity)(); // Import the Client entity
                // Realiza la búsqueda de equipos por palabra clave en campos relevantes
                const equipos = yield equipoModel
                    .find({
                    $or: [
                        { serie: { $regex: keyword, $options: 'i' } },
                        { ubicacion: { $regex: keyword, $options: 'i' } },
                        // { frecuencia: { $regex: keyword, $options: 'i' } },
                        // Agrega otros campos para buscar según sea necesario
                    ],
                })
                    .select('serie ubicacion frecuencia id_sede modelo_equipos id_area id_tipo') // Puedes seleccionar los campos que desees
                    // Popula las relaciones virtuales, si es necesario
                    .populate({
                    path: 'modeloEquipo',
                    model: equipoModeloModel,
                    select: 'modelo', // Selecciona los campos que desees
                })
                    .populate({
                    path: 'areaEquipo',
                    model: areaEquipoModel,
                    select: 'area', // Selecciona los campos que desees
                })
                    .populate({
                    path: 'tipoEquipo',
                    model: tipoEquipoModel,
                    select: 'tipo', // Selecciona los campos que desees
                })
                    .populate({
                    path: 'sedeEquipo',
                    model: sedeModel,
                    select: 'sede_nombre', // Selecciona los campos que desees
                });
                return equipos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de equipos.');
            }
        });
    }
}
exports.default = new SearchEquiposController();
//# sourceMappingURL=SearchEquiposController.js.map