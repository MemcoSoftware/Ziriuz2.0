import mongoose from "mongoose";
import { equipoEntity } from "../entities/Equipo.entity";
import { LogError } from "../../../../utils/logger";
import { LogSuccess } from "../../../../utils/logger";
import { IEquipo } from "../interfaces/IEquipo.interface";

// CRUD

/**
 * Method to obtain all Equipos from Collection "Equipos" in Mongo Server
 */
export const getAllEquipos = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    let equipoModel = equipoEntity();
    let response: any = {};

    // Search all equipos (using pagination)
    await equipoModel
      .find({}, { _id: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('serie ubicación frecuencia')
      .exec()
      .then((equipos: IEquipo[]) => {
        response.equipos = equipos;
      });

    // Count total documents in Equipos collection
    await equipoModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All Equipos: ${error}`);
  }
};

/**
 * Get Equipo by ID
 */
export const getEquipoByID = async (id: string): Promise<IEquipo | undefined> => {
  try {
    let equipoModel = equipoEntity();

    // Search Equipo by ID
    return await equipoModel.findById(id).exec();
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Equipo By ID: ${error}`);
  }
};

/**
 * Delete Equipo by ID
 */
export const deleteEquipoByID = async (id: string): Promise<any | undefined> => {
  try {
    let equipoModel = equipoEntity();

    // Delete Equipo by ID
    return await equipoModel.deleteOne({ _id: id });
  } catch (error) {
    LogError('[ORM ERROR]: Deleting Equipo By ID');
  }
};

/**
 * Update Equipo by ID
 */
export const updateEquipoByID = async (id: string, equipo: any): Promise<any | undefined> => {
  try {
    let equipoModel = equipoEntity();

    // Update Equipo
    return await equipoModel.findByIdAndUpdate(id, equipo);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Equipo ${id}: ${error}`);
  }
};

export const createEquipo = async (equipo: any): Promise<any | undefined> => {
  try {
      const equipoModel = equipoEntity();

      const newEquipo = new equipoModel(equipo);
      await newEquipo.save();

      return {
          success: true,
          message: "Equipo created successfully",
      };
  } catch (error) {
      LogError(`[ORM ERROR]: Creating Equipo: ${error}`);
      return {
          success: false,
          message: "An error occurred while creating the equipo",
      };
  }
};

