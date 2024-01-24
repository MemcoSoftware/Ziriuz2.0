import mongoose from "mongoose";
import { solicitudesServiciosEntity } from "../entities/Solicitudes_Servicios.entity";
import { LogError, LogWarning } from "../../../../utils/logger";
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
      .find({}, { _id: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('_id id_creador id_servicio id_solicitud_estado id_equipo id_cambiador creacion aviso cambio_estado observacion observacion_estado')
      .populate({
        path: 'id_creador',
        model: userModel,
        select: 'number username name cedula telefono email more_info roles type titulo reg_invima',
      })
      .populate({
        path: 'id_servicio',
        model: serviciosModel,
        select: 'servicio',
      })
      .populate({
        path: 'id_solicitud_estado',
        model: solicitudesEstadosModel,
        select: 'estado',
      })
      .populate({
        path: 'id_equipo',
        model: equipoModel,
        select: 'id_sede modelo_equipos id_area id_tipo serie ubicacion frecuencia activo_fijo mtto',
      })
      .exec() as unknown as ISolicitudServicio[];

    response.solicitudesServicios = solicitudesServicios;

    await solicitudServicioModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining All Solicitudes Servicios: ${error}`);
  }
};

// Método para obtener una Solicitud de Servicio por ID con población
export const getSolicitudServicioByID = async (id: string): Promise<ISolicitudServicio | undefined> => {
  try {
    const solicitudServicioModel = solicitudesServiciosEntity();
    let userModel = userEntity();
    let serviciosModel = serviciosEntity();
    let solicitudesEstadosModel = SolicitudesEstadosEntity();
    let equipoModel = equipoEntity();
    // Buscar solicitud de servicio por ID y poblar campos relacionados
    return await solicitudServicioModel
      .findById(id, { _id: 0 })
      .select('_id id_creador id_servicio id_solicitud_estado id_equipo id_cambiador creacion aviso cambio_estado observacion observacion_estado')
      .populate({
        path: 'id_creador',
        model: userModel,
        select: 'number username name cedula telefono email more_info roles type titulo reg_invima',
      })
      .populate({
        path: 'id_servicio',
        model: serviciosModel,
        select: 'servicio',
      })
      .populate({
        path: 'id_solicitud_estado',
        model: solicitudesEstadosModel,
        select: 'estado',
      })
      .populate({
        path: 'id_equipo',
        model: equipoModel,
        select: 'id_sede modelo_equipos id_area id_tipo serie ubicacion frecuencia activo_fijo mtto',
      })
      .populate({
        path: 'id_cambiador',
        model: userModel,
        select: 'number username name cedula telefono email more_info roles type titulo reg_invima',
      })
      .exec();
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining Solicitud Servicio By ID: ${error}`);
  }
};

// Método para eliminar una Solicitud de Servicio por ID
export const deleteSolicitudServicioByID = async (id: string): Promise<any | undefined> => {
  try {
    const solicitudServicioModel = solicitudesServiciosEntity();

    // Eliminar la Solicitud de Servicio por ID
    return await solicitudServicioModel.deleteOne({ _id: id });
  } catch (error) {
    LogError('[ORM ERROR]: Deleting Solicitud Servicio By ID');
  }
};


// Método para actualizar una Solicitud de Servicio por ID
export const updateSolicitudServicioByID = async (id: string, solicitudServicioData: any, cambiadorId: string): Promise<{ success: boolean; message: string }> => {
  try {
    let response: { success: boolean; message: string } = {
      success: false,
      message: "",
    };

    const solicitudServicioModel = solicitudesServiciosEntity();
    const userModel = userEntity();
    const serviciosModel = serviciosEntity();
    const solicitudesEstadosModel = SolicitudesEstadosEntity();
    const equipoModel = equipoEntity();

    // Verificar si los ObjectIds existen en sus respectivas colecciones
    const userExists = await userModel.exists({ _id: solicitudServicioData.id_creador });
    const servicioExists = await serviciosModel.exists({ _id: solicitudServicioData.id_servicio });
    const solicitudEstadoExists = await solicitudesEstadosModel.exists({ _id: solicitudServicioData.id_solicitud_estado });
    const equipoExists = await equipoModel.exists({ _id: solicitudServicioData.id_equipo });
    const cambiadorExists = await userModel.exists({ _id: cambiadorId });

    if (!userExists || !servicioExists || !solicitudEstadoExists || !equipoExists || !cambiadorExists) {
      LogWarning(`[ORM WARNING]: One or more related entities not found for updating Solicitud Servicio ${id}`);
      response.message = "One or more related entities not found";
      return response;
    }

    solicitudServicioData.id_cambiador = cambiadorId;

    // Actualizar la Solicitud de Servicio por ID
    await solicitudServicioModel.findByIdAndUpdate(id, solicitudServicioData);

    response.success = true;
    response.message = "Solicitud de Servicio updated successfully";
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Solicitud Servicio ${id}: ${error}`);
    return {
      success: false,
      message: "An error occurred while updating the Solicitud de Servicio",
    };
  }
};


// Método para crear una Solicitud de Servicio
export const createSolicitudServicio = async (solicitudServicioData: any, creadorId: string): Promise<{ success: boolean; message: string }> => {
  try {
      let response: { success: boolean; message: string } = {
          success: false,
          message: "",
      };

      const solicitudServicioModel = solicitudesServiciosEntity();
      const userModel = userEntity();
      const serviciosModel = serviciosEntity();
      const solicitudesEstadosModel = SolicitudesEstadosEntity();
      const equipoModel = equipoEntity();

      // Verificar si los ObjectIds existen en sus respectivas colecciones
      const userExists = await userModel.exists({ _id: creadorId });
      const servicioExists = await serviciosModel.exists({ _id: solicitudServicioData.id_servicio });
      const solicitudEstadoExists = await solicitudesEstadosModel.exists({ _id: solicitudServicioData.id_solicitud_estado });
      const equipoExists = await equipoModel.exists({ _id: solicitudServicioData.id_equipo });
      const cambiadorExists = await userModel.exists({ _id: solicitudServicioData.id_cambiador });

      if (!userExists || !servicioExists || !solicitudEstadoExists || !equipoExists || !cambiadorExists) {
          LogWarning(`[ORM WARNING]: One or more related entities not found for creating Solicitud Servicio`);
          response.message = "One or more related entities not found";
          return response;
      }

      // Asignar el creador a partir del ID pasado como argumento
      solicitudServicioData.id_creador = creadorId;

      // Crear la Solicitud de Servicio
      const newSolicitudServicio = new solicitudServicioModel(solicitudServicioData);
      await newSolicitudServicio.save();

      response.success = true;
      response.message = "Solicitud de Servicio created successfully";
      return response;
  } catch (error) {
      LogError(`[ORM ERROR]: Creating Solicitud Servicio: ${error}`);
      return {
          success: false,
          message: "An error occurred while creating the Solicitud de Servicio",
      };
  }
};
