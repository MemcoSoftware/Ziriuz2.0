// SearchSolicitudesController.ts
import { userEntity } from '../../users/domain/entities/User.entity';
import { LogInfo, LogError } from '../../../utils/logger';
import { solicitudesServiciosEntity } from '../domain/entities/Solicitudes_Servicios.entity';
import { serviciosEntity } from '../../procesos_&_protocolos/domain/entities/Servicios.entity';
import { SolicitudesEstadosEntity } from '../../procesos_&_protocolos/domain/entities/SolicitudesEstados.entity';
import { equipoEntity } from '../../equipos/domain/entities/Equipo.entity';

class SearchSolicitudesController {
  public async searchSolicitudesServiciosByKeyword(keyword: string): Promise<any> {
    try {
      if (typeof keyword !== 'string') {
        throw new Error('El parámetro keyword es inválido.');
      }

      LogInfo(`Search for solicitudes servicios with keyword: ${keyword}`);

      // Modelos de entidades relacionadas
      const userModel = userEntity();
      const servicioModel = serviciosEntity();
      const estadoModel = SolicitudesEstadosEntity();
      const equipoModel = equipoEntity();
      const solicitudServicioModel = solicitudesServiciosEntity();

      // Búsqueda en campos relacionados
      const users = await userModel.find({
        $or: [
          { name: { $regex: keyword, $options: 'i' } },
          { username: { $regex: keyword, $options: 'i' } },
        ],
      }).select('_id');

      const servicios = await servicioModel.find({ servicio: { $regex: keyword, $options: 'i' } }).select('_id');

      const estados = await estadoModel.find({ estado: { $regex: keyword, $options: 'i' } }).select('_id');

      const equipos = await equipoModel.find({ serie: { $regex: keyword, $options: 'i' } }).select('_id');

      const userIds = users.map(user => user._id);
      const servicioIds = servicios.map(servicio => servicio._id);
      const estadoIds = estados.map(estado => estado._id);
      const equipoIds = equipos.map(equipo => equipo._id);

      // Búsqueda en la entidad Solicitudes_Servicios
      const solicitudes = await solicitudServicioModel
        .find({
          $or: [
            { id_creador: { $in: userIds } },
            { id_servicio: { $in: servicioIds } },
            { id_solicitud_estado: { $in: estadoIds } },
            { id_equipo: { $in: equipoIds } },
            { aviso: { $regex: keyword, $options: 'i' } },
            { observacion: { $regex: keyword, $options: 'i' } },
            { cambio_estado: { $regex: keyword, $options: 'i' } },
            { observacion_estado: { $regex: keyword, $options: 'i' } },
          ],
        })
        .populate('id_creador id_servicio id_solicitud_estado id_equipo');

      return solicitudes;
    } catch (error) {
      LogError(`[ERROR]: Searching Solicitudes Servicios - ${error}`);
      throw new Error('Error en la búsqueda de solicitudes servicios.');
    }
  }
}

export default new SearchSolicitudesController();
