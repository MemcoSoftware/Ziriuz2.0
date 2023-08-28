import { userEntity } from "../entities/User.entity";
import mongoose from "mongoose";
import { LogError } from "../../utils/logger";
import { LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";

// Environment variables

import dotenv from 'dotenv';

// BCRYPT For Passwords
import bcrypt from 'bcrypt';

// JWT

import jwt from 'jsonwebtoken';
import { UserResponse } from "../types/UserResponse";

// Environment variables Configuration

dotenv.config();

// Obtein Secret key to generate JWT

const secret = process.env.SECRETKEY || 'MYSECRETKEY';
// CRUD

/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */

export const getAllUsers = async (page: number, limit: number): Promise<any[] | undefined>  =>{
    try{
        let userModel = userEntity();

        let response: any = {};
        // Search all users (using pagination)

        await userModel.find({}, { _id: 0, password: 0})
        .limit(limit)
        .skip((page - 1) * limit)
        .select('_id number username name cedula telefono email more_info')
        .exec().then((users: IUser[]) =>{
            // users.forEach((user: IUser)=>{
            //     // Clean Passwords from result
            //     user.password = ''
            // });
            response.users = users;
        });

        // Count total documents in Users collection
        await userModel.countDocuments().then((total: number) => {
            response.totalPages = Math.ceil(total / limit);
            response.currentPage = page;
        });
        return response;


    
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
        return await userModel.findById(id).select('_id number username name cedula telefono email more_info');

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

        // Check if user exists by Username
        await userModel.findOne({username: auth.username}).then((user: IUser)=>{
            userFound = user;
        }).catch((error)=>{
            console.error(`[AUTHENTICATION_ERROR in ORM]: User not found`);
            throw new Error(`[[AUTHENTICATION_ERROR in ORM]: User not found: ${error}`);
        });
        
        // Check if Password is valid (compare with bcrypt)
        let validPassword = bcrypt.compareSync(auth.password, userFound!.password);

        if(!validPassword){
            console.error(`[AUTHENTICATION_ERROR in ORM]: Invalid Password `);
            throw new Error(`[[AUTHENTICATION_ERROR in ORM]: User not found: Invalid Password`);
        }


        // Generate JWT
        
            token = jwt.sign({username: userFound!.username}, secret, {
                expiresIn: "2h"
            });


            return {
                user: userFound,
                token: token
            }



        

    }catch(error){
        LogError(`[ORM ERROR]: Creating User: ${error}`)
    }
}


// Logout User

export const logoutUser = async (): Promise <any | undefined>=>{
    // TODO NOT IMPLEMENTED
}

// TODO