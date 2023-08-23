import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

import dotenv from 'dotenv';

// Dotenv Configuration to read variables environment

dotenv.config();

const secret = process.env.SECRETKEY || 'MY SECRETKEY';


/***
 * @param { Request } req  Original request previous middleware of verification JWT
 * @param { Response }res Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verification of next execution
 */


export const verifyToken = (req: Request, res: Response, next: NextFunction)=>{

    // Check HEADER from Request for 'x-access-token'
    let token: any = req.headers['x-access-token'];

    // Verify if jwt is present
    if(!token){
        return res.status(403).send({
            authenticationError: 'Missing JWT',
            message: ' Not authorized to consume this endpoint'
        });
    }


    // Verify the token obtained
    // TODO: pass secret key
    jwt.verify(token, secret, (err: any, decoded: any) =>{
        if(err){
            return res.status(500).send({
                authenticationError: ' JWT Veriication failed',
                message: ' Failed to verify JWT token in request'
            });
        }

        // Pass something to next request (id of user || other info)
        // Execute Next Function -> Protected Routes will be executed
        next();
    

    });
}