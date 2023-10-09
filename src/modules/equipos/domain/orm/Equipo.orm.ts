import mongoose from "mongoose";
import { equipoEntity } from "../entities/Equipo.entity";
import { LogError } from "../../../../utils/logger";
import { LogSuccess } from "../../../../utils/logger";
import { IEquipo } from "../interfaces/IEquipo.interface";
import { modeloEquipoEntity } from "../entities/ModeloEquipo.entity";
import { areaEquipoEntity } from "../entities/AreaEquipo.entity";

// CRUD

/**
 * Method to obtain all Equipos from Collection "Equipos" in Mongo Server
 */
export const getAllEquipos = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    const equipoModel = equipoEntity();
    let response: any = {};

    // Search all equipos (using pagination) and populate 'modelo_equipos' and 'id_area'
    const equipos: IEquipo[] = await equipoModel
      .find({}, { _id: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('serie ubicacion frecuencia modelo_equipos id_area') 
      .populate({
        path: 'modelo_equipos',
        model: 'Modelo_Equipos',
        select: 'modelo precio',
      })
      .populate({
        path: 'id_area',
        model: 'Areas_Equipos',
        select: 'area', 
      })
      .exec() as unknown as IEquipo[];

    response.equipos = equipos;

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
 * Method to obtain a single Equipo by ID from Collection "Equipos" in Mongo Server
 */
export const getEquipoByID = async (id: string): Promise<IEquipo | undefined> => {
  try {
    const equipoModel = equipoEntity();

    // Search Equipo by ID and populate 'modelo_equipos' and 'id_area'
    return await equipoModel
      .findById(id, { _id: 0 })
      .select('serie ubicacion frecuencia modelo_equipos id_area') 
      .populate({
        path: 'modelo_equipos',
        model: 'Modelo_Equipos',
        select: 'modelo precio',
      })
      .populate({
        path: 'id_area',
        model: 'Areas_Equipos',
        select: 'area', 
      })
      .exec();
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
export const updateEquipoByID = async (id: string, equipo: any): Promise<{ success: boolean; message: string }> => {
  try {
    let response: { success: boolean; message: string } = {
      success: false,
      message: "",
    };

    const equipoModel = equipoEntity();

    // Actualizar el equipo por ID
    await equipoModel.findByIdAndUpdate(id, equipo);

    response.success = true;
    response.message = "Equipo updated successfully";
    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Updating Equipo ${id}: ${error}`);
    return {
      success: false,
      message: "An error occurred while updating the equipo",
    };
  }
};

/**
 * Obtener el modelo de equipo por nombre.
 * @param name Nombre del modelo de equipo.
 * @returns Modelo de equipo encontrado o nulo si no se encuentra.
 */
export const getModeloEquipoByName = async (name: string): Promise<any | null> => {
  try {
    const modeloEquipoModel = modeloEquipoEntity();

    // Buscar el modelo de equipo por nombre
    const modelo = await modeloEquipoModel.findOne({ modelo: name });

    return modelo;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Modelo Equipo by Name: ${error}`);
    return null;
  }
}

export const getAreaEquipoByName = async (name: string): Promise<any | null> => {
  try {
    const areaEquipoModel = areaEquipoEntity();

    // Buscar el área de equipo por nombre
    const area = await areaEquipoModel.findOne({ area: name });

    return area;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Area Equipo by Name: ${error}`);
    return null;
  }
}

/**
 * Create Equipo 
 * 
 * */
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

