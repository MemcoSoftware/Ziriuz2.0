import mongoose from "mongoose";
import { modeloEquipoEntity } from "../entities/ModeloEquipo.entity";
import { LogError } from "../../../../utils/logger";
import { LogSuccess } from "../../../../utils/logger";
import { IModeloEquipo } from "../interfaces/IModeloEquipo.interface";

// CRUD

export const getAllModeloEquipos = async (page: number, limit: number): Promise<any[] | undefined> => {
  try {
    let modeloEquipoModel = modeloEquipoEntity();
    let response: any = {};

    await modeloEquipoModel
      .find({}, { _id: 0 })
      .limit(limit)
      .skip((page - 1) * limit)
      .select('modelo precio')
      .exec()
      .then((modeloEquipos: IModeloEquipo[]) => {
        response.modeloEquipos = modeloEquipos;
      });

    await modeloEquipoModel.countDocuments().then((total: number) => {
      response.totalPages = Math.ceil(total / limit);
      response.currentPage = page;
    });

    return response;
  } catch (error) {
    LogError(`[ORM ERROR]: Getting All ModeloEquipos: ${error}`);
  }
};

export const getModeloEquipoByID = async (id: string): Promise<IModeloEquipo | undefined> => {
  try {
    let modeloEquipoModel = modeloEquipoEntity();

    return await modeloEquipoModel.findById(id).exec();
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
