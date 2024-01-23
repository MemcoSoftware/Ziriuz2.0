// SolicitudesEstados.orm.ts
import mongoose from "mongoose";
import SolicitudesEstados from "../entities/SolicitudesEstados.entity";
import { LogError } from "../../../../utils/logger";
import { ISolicitudesEstados } from "../interfaces/ISolicitudesEstados.interface";

// CRUD

/**
 * Método para obtener todos los estados de la colección "SolicitudesEstados" en el servidor Mongo
 */
export const getAllSolicitudesEstados = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    let response: any = {};

    // Buscar todos los estados (usando paginación)
    const estados: ISolicitudesEstados[] = await SolicitudesEstados
      .find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec() as unknown as ISolicitudesEstados[];

    response.estados = estados;

    // Contar documentos totales en la colección SolicitudesEstados
    const total = await SolicitudesEstados.countDocuments();
    response.totalPages = Math.ceil(total / limit);
    response.currentPage = page;

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining All SolicitudesEstados: ${error}`);
  }
};

/**
 * Método para obtener un solo estado por ID de la colección "SolicitudesEstados" en el servidor Mongo
 */
export const getSolicitudesEstadosByID = async (id: string): Promise<ISolicitudesEstados | undefined> => {
  try {
    return await SolicitudesEstados.findById(id).exec();
  } catch (error) {
    LogError(`[ORM ERROR]: Obtaining SolicitudesEstados By ID: ${error}`);
  }
};

/**
 * Método para eliminar estado por ID
 */
export const deleteSolicitudesEstadosByID = async (id: string): Promise<any | undefined> => {
  try {
    return await SolicitudesEstados.deleteOne({ _id: id });
  } catch (error) {
    LogError(`[ORM ERROR]: Deleting SolicitudesEstados By ID: ${error}`);
  }
};

/**
 * Método para actualizar estado por ID
 */
export const updateSolicitudesEstadosByID = async (id: string, estadoData: any): Promise<{ success: boolean; message: string }> => {
  try {
    await SolicitudesEstados.findByIdAndUpdate(id, estadoData);

    return {
      success: true,
      message: "SolicitudesEstados updated successfully",
    };
  } catch (error) {
    LogError(`[ORM ERROR]: Updating SolicitudesEstados ${id}: ${error}`);
    return {
      success: false,
      message: "An error occurred while updating the SolicitudesEstados",
    };
  }
};

/**
 * Método para crear estado
 */
export const createSolicitudesEstados = async (estadoData: any): Promise<any | undefined> => {
  try {
    const newEstado = new SolicitudesEstados(estadoData);
    await newEstado.save();

    return {
      success: true,
      message: "SolicitudesEstados created successfully",
    };
  } catch (error) {
    LogError(`[ORM ERROR]: Creating SolicitudesEstados: ${error}`);
    return {
      success: false,
      message: "An error occurred while creating the SolicitudesEstados",
    };
  }
};
