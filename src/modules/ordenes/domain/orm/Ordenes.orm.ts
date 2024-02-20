import mongoose from "mongoose";
import { LogError } from "../../../../utils/logger";
import { IOrden } from "../interfaces/IOrden.interface";
import { ordenesEntity } from "../entities/Ordenes.entity";
import { solicitudesServiciosEntity } from "../../../solicitudes/domain/entities/Solicitudes_Servicios.entity";
import { ordenesEstadosEntity } from "../entities/Ordenes_Estados.entity";
import { userEntity } from "../../../users/domain/entities/User.entity";
import { visitasEntity } from "../../../visitas/domain/entities/Visitas.entity";
import { ordenesSubEstadosEntity } from "../entities/Ordenes_sub_estados.entity";
import { fallasAccionesEntity } from "../entities/Fallas_Acciones.entity";
import { fallasCausasEntity } from "../entities/Fallas_Causas.entity";
import { fallasModosEntity } from "../entities/Fallas_Modos.entity";
import { modosFallosEntity } from "../entities/Modos_Fallos.entity";
// Import other necessary entities for relationships

// CRUD

export const getAllOrdenes = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    let response: any = {};
    const userModel = userEntity();
    const ordenModel = ordenesEntity();
    const visitaModel = visitasEntity();
    const ordenSubEstadoModel = ordenesSubEstadosEntity();
    const solicitudServicioModel = solicitudesServiciosEntity();
    const ordenEstadoModel = ordenesEstadosEntity();
    const fallasAccionesModel = fallasAccionesEntity(); 
    const fallasCausasModel = fallasCausasEntity(); 
    const fallasModosModel = fallasModosEntity();
    const modosFallosModel = modosFallosEntity();
    // Import and define other necessary models for population

    const ordenes: IOrden[] = await ordenModel
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      // Populate relationships for each field as needed
      .populate({
        path: 'id_solicitud_servicio',
        model: solicitudServicioModel, // Assuming the model name for SolicitudServicio
      })
      .populate({
        path: 'id_orden_estado',
        model: ordenEstadoModel,
      })
      .populate({
        path: 'ids_visitas',
        model: visitaModel,
      })
      .populate({
        path: 'ids_orden_sub_estados',
        model: ordenSubEstadoModel,
      })
      .populate({
        path: 'id_creador',
        model: userModel,
        select: 'number username name cedula telefono email more_info roles type titulo reg_invima',
      })
      .populate({
        path: 'id_cerrador',
        model: userModel,
        select: 'number username name cedula telefono email more_info roles type titulo reg_invima',
      })
      .populate({
        path: 'ids_fallas_acciones',
        model: fallasAccionesModel,
      })
      .populate({
        path: 'ids_fallas_causas',
        model: fallasCausasModel,
      })
      .populate({
        path: 'ids_falla_modos',
        model: fallasModosModel,
      })
      .populate({
        path: 'modos_fallas_ids',
        model: modosFallosModel,
      })
      .populate({
        path: 'entrega.id_entrega',
        model: userModel,
        select: 'number username name cedula telefono email more_info roles type titulo reg_invima',
      })
      .populate({
        path: 'modos_fallas_ids',
        model: modosFallosModel,
      })
      // Populate other relationships similarly
      .exec() as IOrden[];

    response.ordenes = ordenes;

    // Count total documents in the Ordenes collection
    await ordenModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining All Ordenes: ${error}`);
  }
};

export const getOrdenByID = async (id: string): Promise<IOrden | undefined> => {
  try {
    const ordenModel = ordenesEntity();
    // const userModel = userEntity();
    const solicitudServicioModel = solicitudesServiciosEntity();
    const ordenEstadoModel = ordenesEstadosEntity();
    // Import and define other necessary models for population

    return await ordenModel
      .findById(id)
      .populate({
        path: 'id_solicitud_servicio',
        model: solicitudServicioModel,
      })
      .populate({
        path: 'id_orden_estado',
        model: ordenEstadoModel,
      })
      // Populate other relationships similarly
      .exec();
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining Orden By ID: ${error}`);
  }
};

export const deleteOrdenByID = async (id: string): Promise<{ success: boolean; message: string }> => {
  try {
    await ordenesEntity().deleteOne({ _id: id }).exec();
    return { success: true, message: "Orden eliminada correctamente" };
  } catch (error) {
    LogError('[ORM ERROR]: Deleting Orden By ID: ' + error);
    return { success: false, message: "Error al eliminar la orden" };
  }
};

export const updateOrdenByID = async (id: string, ordenData: any): Promise<{ success: boolean; message: string }> => {
  try {
    await ordenesEntity().findByIdAndUpdate(id, ordenData).exec();
    return { success: true, message: "Orden actualizada correctamente" };
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Orden ${id}: ${error}`);
    return { success: false, message: "Error al actualizar la orden" };
  }
};

export const createOrden = async (ordenData: any): Promise<{ success: boolean; message: string }> => {
  try {
    const newOrden = new (ordenesEntity())(ordenData);
    await newOrden.save();
    return { success: true, message: "Orden creada correctamente" };
  } catch (error) {
    LogError('[ORM ERROR]: Creating Orden: ' + error);
    return { success: false, message: "Error al crear la orden" };
  }
};
function usuariosEntity() {
    throw new Error("Function not implemented.");
}

