import { LogInfo } from '../../../utils/logger';
import mongoose from 'mongoose';
import { preventivosEntity } from '../domain/entities/Preventivos.entity';
import { camposEntity } from '../domain/entities/Campos.entity';

class SearchProcesosProtocolosController {
  public async searchPreventivosByKeyword(keyword: string): Promise<any> {
    try {
      if (typeof keyword !== 'string') {
        throw new Error('El parámetro keyword es inválido.');
      }

      LogInfo(`Search for preventivos with keyword: ${keyword}`);

      const preventivosModel = preventivosEntity();
      const camposModel = camposEntity();

      // Busca el ID del campo por palabra clave en campos relevantes
      const camposCualitativos = await camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');
      const camposMantenimiento = await camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');
      const camposCuantitativos = await camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');
      const camposOtros = await camposModel.find({ title: { $regex: keyword, $options: 'i' } }).select('_id');

      const camposCualitativosIds = camposCualitativos.map(campo => campo._id);
      const camposMantenimientoIds = camposMantenimiento.map(campo => campo._id);
      const camposCuantitativosIds = camposCuantitativos.map(campo => campo._id);
      const camposOtrosIds = camposOtros.map(campo => campo._id);

      // Realiza la búsqueda de preventivos por la palabra clave y las asociaciones
      const preventivos = await preventivosModel
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
    } catch (error) {
      console.error(error);
      throw new Error('Error en la búsqueda de preventivos.');
    }
  }
}

export default new SearchProcesosProtocolosController();
