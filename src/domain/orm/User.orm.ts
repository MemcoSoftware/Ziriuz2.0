import { userEntity } from "../entities/User.entity";
import mongoose from "mongoose";
import { LogError } from "../../utils/logger";
import { LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// BCRYPT For Passwords
import bcrypt from 'bcrypt';

// JWT

import jwt from 'jsonwebtoken';

// CRUD

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

// Register User

export const registerUser = async (user: IUser): Promise <any | undefined>=>{
    try {
        let userModel = userEntity();
        // Create / Insert New User
        return await userModel.create(user);
    }catch(error){
        LogError(`[ORM ERROR]: Registering User: ${error}`)
    }
}


// Login User

export const loginUser = async (auth: IAuth): Promise <any | undefined>=>{
    try {
        let userModel = userEntity();


        let userFound: IUser | undefined = undefined;
        let token = undefined;

        await userModel.findOne({username: auth.username}).then((user: IUser)=>{
            userFound = user;
        }).catch((error)=>{
            console.error(`[AUTHENTICATION_ERROR in ORM]: User not found`)
            throw new Error(`[[AUTHENTICATION_ERROR in ORM]: User not found: ${error}`)
        })
        
        
        // Find User By Username

        // userModel.findOne ({ email: auth.username}, (err: any, user: IUser)=>{

        //     if(err){
        //         // TODO Return ERROR --> User Not Found By username (500)
        //     }
            
        //     if(!user){
        //         // TODO return ERROR --> ERROR USER NOT FOUND (404)
        //     }

        //     // Use Bcrypt to Compare Passwords
        //     let validPassword = bcrypt.compareSync(auth.password, user.password);

        //     if(!validPassword){
        //         // TODO --> NOT AUTHORIZED (401)
        //     }

        //     // Create JWT
        //     // TODO Secret must be in .env
        //     let token = jwt.sign({username: user.username}, 'SECRET', {
        //         expiresIn: "2h"
        //     });

        //     return token;

        // })

    }catch(error){
        LogError(`[ORM ERROR]: Creating User: ${error}`)
    }
}


// Logout User

export const logoutUser = async (): Promise <any | undefined>=>{
    // TODO NOT IMPLEMENTED
}

// TODO