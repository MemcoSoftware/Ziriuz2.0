import { LogInfo } from '../../../utils/logger';
import { equipoEntity } from '../domain/entities/Equipo.entity'; // Asegúrate de importar el modelo correcto
import mongoose from 'mongoose';
import { modeloEquipoEntity } from '../domain/entities/ModeloEquipo.entity';
import { areaEquipoEntity } from '../domain/entities/AreaEquipo.entity';
import { tipoEquipoEntity } from '../domain/entities/TipoEquipo.entity';
import { sedeEntity } from '../../../modules/users/domain/entities/Sede.entity';
import { clientEntity } from '../../../modules/users/domain/entities/Client.entity';

class SearchEquiposController {
  public async searchEquiposByKeyword(keyword: string): Promise<any> {
    try {
      if (typeof keyword !== 'string') {
        throw new Error('El parámetro keyword es inválido.');
      }

      LogInfo(`Search for equipos with keyword: ${keyword}`);

        const equipoModel = equipoEntity();
        let equipoModeloModel = modeloEquipoEntity();
        let areaEquipoModel = areaEquipoEntity();
        let tipoEquipoModel = tipoEquipoEntity();
        let sedeModel = sedeEntity(); // Import the Sede entity
        let clientModel = clientEntity(); // Import the Client entity
      // Realiza la búsqueda de equipos por palabra clave en campos relevantes
      const equipos = await equipoModel
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
        model: equipoModeloModel, // Ajusta el nombre del modelo de Modelo_Equipos
        select: 'modelo', // Selecciona los campos que desees
      })
      .populate({
        path: 'areaEquipo',
        model: areaEquipoModel, // Ajusta el nombre del modelo de Areas_Equipos
        select: 'area', // Selecciona los campos que desees
      })
      .populate({
        path: 'tipoEquipo',
        model: tipoEquipoModel, // Ajusta el nombre del modelo de Tipos_Equipos
        select: 'tipo', // Selecciona los campos que desees
      })
      .populate({
        path: 'sedeEquipo',
        model: sedeModel, // Ajusta el nombre del modelo de Sedes
        select: 'sede_nombre', // Selecciona los campos que desees
      });

      return equipos;
    } catch (error) {
      console.error(error);
      throw new Error('Error en la búsqueda de equipos.');
    }
  }
}

export default new SearchEquiposController();
