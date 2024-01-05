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
const Preventivos_entity_1 = require("../domain/entities/Preventivos.entity");
const Campos_entity_1 = require("../domain/entities/Campos.entity");
class SearchProcesosProtocolosController {
    searchPreventivosByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for preventivos with keyword: ${keyword}`);
                const preventivosModel = (0, Preventivos_entity_1.preventivosEntity)();
                const camposModel = (0, Campos_entity_1.camposEntity)();
                // Busca el ID del campo por palabra clave en campos relevantes
                const camposCualitativos = yield camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');
                const camposMantenimiento = yield camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');
                const camposCuantitativos = yield camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');
                const camposOtros = yield camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');
                const camposCualitativosIds = camposCualitativos.map(campo => campo._id);
                const camposMantenimientoIds = camposMantenimiento.map(campo => campo._id);
                const camposCuantitativosIds = camposCuantitativos.map(campo => campo._id);
                const camposOtrosIds = camposOtros.map(campo => campo._id);
                // Realiza la búsqueda de preventivos por la palabra clave y las asociaciones
                const preventivos = yield preventivosModel
                    .find({
                    $or: [
                        { title: { $regex: keyword, $options: 'i' } },
                        { codigo: { $regex: keyword, $options: 'i' } },
                        { fecha: { $regex: keyword, $options: 'i' } },
                        { cualitativo: { $in: camposCualitativosIds } },
                        { mantenimiento: { $in: camposMantenimientoIds } },
                        { cuantitativo: { $in: camposCuantitativosIds } },
                        { otros: { $in: camposOtrosIds } },
                        // Agrega otras asociaciones según sea necesario
                    ],
                })
                    .select('title codigo version fecha cualitativo mantenimiento cuantitativo otros')
                    // Popula las relaciones virtuales, si es necesario
                    .populate({
                    path: 'cualitativo',
                    model: camposModel,
                    select: 'title',
                })
                    .populate({
                    path: 'mantenimiento',
                    model: camposModel,
                    select: 'title',
                })
                    .populate({
                    path: 'cuantitativo',
                    model: camposModel,
                    select: 'title',
                })
                    .populate({
                    path: 'otros',
                    model: camposModel,
                    select: 'title',
                });
                return preventivos;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de preventivos.');
            }
        });
    }
}
exports.default = new SearchProcesosProtocolosController();
//# sourceMappingURL=SearchProcesos&ProtocolosController.js.map