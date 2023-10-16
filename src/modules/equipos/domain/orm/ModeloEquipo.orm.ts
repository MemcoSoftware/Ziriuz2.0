import mongoose from "mongoose";
import { modeloEquipoEntity } from "../entities/ModeloEquipo.entity";
import { LogError } from "../../../../utils/logger";
import { LogSuccess } from "../../../../utils/logger";
import { IModeloEquipo } from "../interfaces/IModeloEquipo.interface";
import { marcaEquipoEntity } from "../entities/MarcasEquipos.entity";
import { classDeviceEntity } from "../entities/ClassDevice.entity";

// CRUD

export const getAllModeloEquipos = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    let modeloEquipoModel = modeloEquipoEntity();
    let response: any = {};
    const marcaEquipo = marcaEquipoEntity();
    const claseEquipo = classDeviceEntity();

    const modeloEquipos: IModeloEquipo[] = await modeloEquipoModel
      .find({}, { _id: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('modelo precio id_marca id_clase')
      .populate({
        path: 'id_marca',
        model: marcaEquipo,
        select: 'marca',
      }) // Populate de la relación con Marcas_Equipos
      .populate({
        path: 'id_clase',
        model: claseEquipo,
        select: 'clase',
      }) // Populate de la relación con Clases_Equipos
      .exec() as IModeloEquipo[];

    response.modeloEquipos = modeloEquipos;

    const total = await modeloEquipoModel.countDocuments();
    response.totalPages = Math.ceil(total / limit);
    response.currentPage = page;

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All ModeloEquipos: ${error}`);
  }
};


export const getModeloEquipoByID = async (id: string): Promise<IModeloEquipo | undefined> => {
  try {
    let modeloEquipoModel = modeloEquipoEntity();
    const marcaEquipo = marcaEquipoEntity();
    const claseEquipo = classDeviceEntity();
    return await modeloEquipoModel.findById(id, { _id: 0 })
      .select('modelo precio id_marca id_clase') // Include id_marca y id_clase
      .populate({
        path: 'id_marca',
        model: marcaEquipo,
        select: 'marca',
      }) // Populate de la relación con Marcas_Equipos
      .populate({
        path: 'id_clase',
        model: claseEquipo,
        select: 'clase',
      }) // Populate de la relación con Clases_Equipos
      .exec();
  } catch (error) {
    LogError(`[ORM ERROR]: Getting ModeloEquipo By ID: ${error}`);
  }
};

export const deleteModeloEquipoByID = async (id: string): Promise<any | undefined> => {
  try {
    let modeloEquipoModel = modeloEquipoEntity();

    return await modeloEquipoModel.deleteOne({ _id: id });
  } catch (error) {
    LogError('[ORM ERROR]: Deleting ModeloEquipo By ID');
  }
};

export const updateModeloEquipoByID = async (id: string, equipo: any): Promise<any | undefined> => {
  try {
    let modeloEquipoModel = modeloEquipoEntity();

    return await modeloEquipoModel.findByIdAndUpdate(id, equipo);
  } catch (error) {
    LogError(`[ORM ERROR]: Updating ModeloEquipo ${id}: ${error}`);
  }
};

export const createModeloEquipo = async (equipo: any): Promise<any | undefined> => {
  try {
    const modeloEquipoModel = modeloEquipoEntity();
    const newModeloEquipo = new modeloEquipoModel(equipo);
    await newModeloEquipo.save();

    return {
      success: true,
      message: "ModeloEquipo created successfully",
    };
  } catch (error) {
    LogError('[ORM ERROR]: Creating ModeloEquipo');
    return {
      success: false,
      message: "An error occurred while creating the ModeloEquipo",
    };
  }
};

// Función para obtener una Clase de Equipo por nombre
export const getClaseEquipoByName = async (name: string): Promise<any | null> => {
  try {
    const claseEquipoModel = classDeviceEntity();

    // Buscar la clase de equipo por nombre
    const clase = await claseEquipoModel.findOne({ clase: name });

    return clase;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Clase de Equipo by Name: ${error}`);
    return null;
  }
};

// Función para obtener una Marca de Equipo por nombre
export const getMarcaEquipoByName = async (name: string): Promise<any | null> => {
  try {
    const marcaEquipoModel = marcaEquipoEntity();

    // Buscar la marca de equipo por nombre
    const marca = await marcaEquipoModel.findOne({ marca: name });

    return marca;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting Marca de Equipo by Name: ${error}`);
    return null;
  }
};
