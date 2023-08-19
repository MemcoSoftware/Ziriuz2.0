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
    }catch (error){
        LogError(`[ORM ERROR]: Getting All Users: ${error}`);
    }
}