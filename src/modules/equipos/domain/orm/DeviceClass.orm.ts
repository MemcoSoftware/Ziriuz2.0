import mongoose from "mongoose";
import { classDeviceEntity } from "../entities/ClassDevice.entity";
import { LogError } from "../../../../utils/logger";
import { IClassDevice } from "../interfaces/IClassDevice.interface";

/**
 * Method to obtain all ClasesEquipos from Collection "Modelo_ClasesEquipos" in Mongo Server
 */
export const getAllClasesEquipos = async (page: number, limit: number): Promise<any | undefined> => {
  try {
    let claseEquipoModel = classDeviceEntity();
    let response: any = {};

    // Search all clases equipos (using pagination)
    await claseEquipoModel
      .find({}, { _id: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('clase')
      .exec()
      .then((clasesEquipos: IClassDevice[]) => {
        response.clasesEquipos = clasesEquipos;
      });

    // Count total documents in ClasesEquipos collection
    await claseEquipoModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All ClasesEquipos: ${error}`);
  }
};

/**
 * Get ClaseEquipo by ID
 */
export const getClaseEquipoByID = async (id: string): Promise<IClassDevice | undefined> => {
  try {
    let claseEquipoModel = classDeviceEntity();

    // Search ClaseEquipo by ID
    return await claseEquipoModel.findById(id).exec();
  } catch (error) {
    LogError(`[ORM ERROR]: Getting ClaseEquipo By ID: ${error}`);
  }
};

/**
 * Delete ClaseEquipo by ID
 */
export const deleteClaseEquipoByID = async (id: string): Promise<any | undefined> => {
  try {
    let claseEquipoModel = classDeviceEntity();

    // Delete ClaseEquipo by ID
    return await claseEquipoModel.deleteOne({ _id: id });
  } catch (error) {
    LogError('[ORM ERROR]: Deleting ClaseEquipo By ID');
  }
};

/**
 * Update ClaseEquipo by ID
 */
export const updateClaseEquipoByID = async (id: string, claseEquipo: any): Promise<any | undefined> => {
  try {
    let claseEquipoModel = classDeviceEntity();

    // Update ClaseEquipo
    return await claseEquipoModel.findByIdAndUpdate(id, claseEquipo);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating ClaseEquipo ${id}: ${error}`);
  }
};

/**
 * Create ClaseEquipo
 */
export const createClaseEquipo = async (claseEquipo: any): Promise<any | undefined> => {
  try {
    const claseEquipoModel = classDeviceEntity();

    const newClaseEquipo = new claseEquipoModel(claseEquipo);
    await newClaseEquipo.save();

    return {
      success: true,
      message: "ClaseEquipo created successfully",
    };
  } catch (error) {
    LogError(`[ORM ERROR]: Creating ClaseEquipo: ${error}`);
    return {
      success: false,
      message: "An error occurred while creating the clase equipo",
    };
  }
};
