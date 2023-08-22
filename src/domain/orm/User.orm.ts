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
        return await userModel.find()
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

// - Delete User By ID

export const deleteUserByID = async (id: string): Promise <any | undefined> =>{
    try{
        let userModel = userEntity();
        // Delete User BY ID
        return await userModel.deleteOne({_id: id})
    }catch (error){
        LogError('[ORM ERROR]: Deleting User By ID')
    }
}

// - Create New User

export const createUser = async (user: any): Promise <any | undefined> =>{
    try {
        let userModel = userEntity();
        // Create / Insert New User
        return await userModel.create(user);
    }catch(error){
        LogError(`[ORM ERROR]: Creating User: ${error}`)
    }
}


// TODO


// - Update User BY ID

export const updateUserByID = async (id: string, user: any ): Promise <any | undefined> =>{
    try {
        let userModel = userEntity();
        //  Update User
        return await userModel.findByIdAndUpdate(id, user);
    }catch(error){
        LogError(`[ORM ERROR]: Updating User ${id}: ${error}`)
    }
}