/**
 * ORM to connect to Auth Collection
 */

import { userEntity } from "../entities/User.entity";
import mongoose from "mongoose";
import { LogError } from "../../utils/logger";
import { LogSuccess } from "../../utils/logger";
import { IUser } from "../interfaces/IUser.interface";
import { IAuth } from "../interfaces/IAuth.interface";
import * as otpGenerator from 'otp-generator';
import { Request, Response } from 'express';

// import { sendEmail } from './path/to/emailService'; 


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

export const findUserByEmail = async (email: string): Promise<IUser | null> => {
    try {
        const userModel = userEntity();
        const user: IUser | null = await userModel.findOne({ email });
        return user;
    } catch (error) {
        console.error(`[Auth ORM]: Error al buscar usuario por correo en la base de datos: ${error}`);
        throw new Error(`[Auth ORM]: Error al buscar usuario por correo en la base de datos: ${error}`);
    }
}
