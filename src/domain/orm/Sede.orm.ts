import mongoose from "mongoose";
import { sedeEntity } from "../entities/Sede.entity";
import { LogError, LogSuccess, LogWarning } from "../../utils/logger";
import { ISede } from "../interfaces/ISede.interface";

export const getAllSedes = async (page: number, limit: number): Promise<any[] | undefined> => {
    try {
        let sedeModel = sedeEntity();

        let response: any = {};

        await sedeModel
            .find({}, { _id: 0 })
            .limit(limit)
            .skip((page - 1) * limit)
            .select('_id sede_nombre sede_address sede_telefono sede_email')
            .exec()
            .then((sedes: ISede[]) => {
                response.sedes = sedes;
            });

        await sedeModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });

        return response;
    } catch (error) {
        LogError(`[ORM ERROR]: Getting All Sedes: ${error}`);
    }
};

export const getSedeByID = async (id: string): Promise<any | undefined> => {
    try {
        let sedeModel = sedeEntity();

        return await sedeModel.findById(id)
            .select('_id sede_nombre sede_address sede_telefono sede_email')
            .exec();
    } catch (error) {
        LogError(`[ORM ERROR]: Getting Sede By ID: ${error}`);
    }
};

export const createSede = async (sedeData: ISede): Promise<any | undefined> => {
    try {
        let sedeModel = sedeEntity();

        return await sedeModel.create(sedeData);
    } catch (error) {
        LogError('[ORM ERROR]: Creating Sede');
    }
};

export const deleteSedeByID = async (id: string): Promise<any | undefined> => {
    try {
        let sedeModel = sedeEntity();

        return await sedeModel.deleteOne({ _id: id });
    } catch (error) {
        LogError('[ORM ERROR]: Deleting Sede By ID');
    }
};

export const updateSedeByID = async (id: string, sedeData: ISede): Promise<any | undefined> => {
    try {
        let sedeModel = sedeEntity();

        return await sedeModel.findByIdAndUpdate(id, sedeData);
    } catch (error) {
        LogError(`[ORM ERROR]: Updating Sede ${id}: ${error}`);
    }
};
