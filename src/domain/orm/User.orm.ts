import { userEntity } from "../entities/User.entity";
import mongoose from "mongoose";
import { LogError } from "../../utils/logger";
import { LogSuccess } from "../../utils/logger";

// CRUS

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */

export const getAllUsers = async (): Promise<any[] | undefined>  =>{
    try{
        let userModel = userEntity();
        
        // Search all users
        return await userModel.find({isDelete: false})
        // return await userModel.find();
    }catch (error){
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
        // throw error;
    }
}

// - GET User by ID

export const getUserByID = async (id: string) : Promise <any | undefined> =>{
    try {
        let userModel = userEntity();

        // Search User by ID
        return await userModel.findById(id);

    } catch(error){
        LogError(`[ORM ERROR]: Getting User By ID: ${error}`);
    }
}


// TODO


