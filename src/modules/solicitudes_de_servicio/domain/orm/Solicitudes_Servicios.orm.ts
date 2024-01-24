import mongoose from "mongoose";
import { solicitudesServiciosEntity } from "../entities/Solicitudes_Servicios.entity";
import { LogError } from "../../../../utils/logger";
import { ISolicitudServicio } from "../interfaces/Solicitudes_Servicios.interface";
import { userEntity } from "../../../users/domain/entities/User.entity";
import { serviciosEntity } from "../../../procesos_&_protocolos/domain/entities/Servicios.entity";
import { SolicitudesEstadosEntity } from "../../../procesos_&_protocolos/domain/entities/SolicitudesEstados.entity";
import { equipoEntity } from "../../../equipos/domain/entities/Equipo.entity";

// CRUD

// Método para obtener todas las Solicitudes de Servicios con paginación y población
export const getAllSolicitudesServicios = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    const solicitudServicioModel = solicitudesServiciosEntity();
    let userModel = userEntity();
    let serviciosModel = serviciosEntity();
    let solicitudesEstadosModel = SolicitudesEstadosEntity();
    let equipoModel = equipoEntity();
    let response: any = {};

    // Buscar todas las solicitudes de servicios con paginación y poblar campos relacionados
    const solicitudesServicios: ISolicitudServicio[] = await solicitudServicioModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
    //   .populate({
    //     path: 'id_creador',
    //     model: userModel,
    //     select: 'nombre apellido email',
    //   })
    //   .populate({
    //     path: 'id_servicio',
    //     model: serviciosModel,
    //     select: 'nombre descripcion',
    //   })
    //   .populate({
    //     path: 'id_solicitud_estado',
    //     model: solicitudesEstadosModel,
    //     select: 'estado',
    //   })
    //   .populate({
    //     path: 'id_equipo',
    //     model: equipoModel,
    //     select: 'serie ubicacion',
    //   })
    //   .populate({
    //     path: 'id_cambiador',
    //     model: userModel,
    //     select: 'nombre apellido email',
    //   })
      .exec();

    response.solicitudesServicios = solicitudesServicios;

    const total = await solicitudServicioModel.countDocuments();
    response.totalPages = Math.ceil(total / limit);
    response.currentPage = page;

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining All Solicitudes Servicios: ${error}`);
  }
};

// Método para obtener una Solicitud de Servicio por ID con población
export const getSolicitudServicioByID = async (id: string): Promise<ISolicitudServicio | undefined> => {
  try {
    const solicitudServicioModel = solicitudesServiciosEntity();

    // Buscar solicitud de servicio por ID y poblar campos relacionados
    return await solicitudServicioModel
      .findById(id)
      .populate('id_creador')
      .populate('id_servicio')
      .populate('id_solicitud_estado')
      .populate('id_equipo')
      .populate('id_cambiador')
      .exec();
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining Solicitud Servicio By ID: ${error}`);
  }
};

// Continúa con las funciones de eliminación, actualización y creación siguiendo esta estructura.
