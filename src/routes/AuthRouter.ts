import express, { Request, Response } from "express";
import { AuthController } from "../controller/AuthController";
import { LogInfo } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";


// BCRYPT for passwords
import bcrypt from 'bcrypt';


// Router from Express

let authRouter = express.Router();

authRouter.route('/auth/register')
    .post(async (req: express.Request, res: Response)=>{

        let { number, username, password, name, cedula, telefono, email, more_info} = req.body;
        let hashedPassword = '';

        if(number && username && password && name && cedula && telefono && email && more_info ){

            // Obtain Password in Request and cypher
            let hashedPassword = bcrypt.hashSync(password, 8);

            let newUser: IUser = {
                number:  number,
                username: username,
                password: hashedPassword,
                name: name,
                cedula: cedula,
                telefono: telefono,
                email: email,
                more_info: more_info
            } 
            // Controller Instance to execute a method
            const controller: AuthController = new AuthController();
            // Get Response
            const response: any = await controller.registerUser(newUser)
            // Send to the client the response
            return res.status(200).send(response);
            
        }
        
    })


      

authRouter.route('/auth/login')
    .post(async (req: express.Request, res: Response)=>{

        let { username, password} = req.body;
        

        if(username && password ){

            // Controller Instance to execute a method
            const controller: AuthController = new AuthController();
            
            
            // TODO use IAuth

            let auth: IAuth = {
                username: username,
                password: password
            }

            // Get Response
            const response: any = await controller.loginUser(auth)
            // Send to the client the response whicho includes the JWT
            return res.status(200).send(response);
            
        }
        
    });

    export default authRouter;