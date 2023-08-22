import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";



// Router from Express

let usersRouter = express.Router();

//http://localhost:8000/api/users?id=64e16f5e7b636b0679ca720c

usersRouter.route('/')
// GET:
    .get(async (req: Request, res: Response) =>{
        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`)
        // Controller Instance to execute a method
        const controller: UserController = new UserController();
        // Get Response
        const response: any | undefined = await controller.getUsers(id);
        // Send to the client the response
        return res.send(response);

    })
    // DELETE: 
    .delete(async (req: Request, res: Response)=> {
        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        // Controller Instance to execute a method
        const controller: UserController = new UserController();
        // Get Response
        const response: any | undefined = await controller.deleteUser(id);
        // Send to the client the response
        return res.send(response);
    })

    .post(async (req: Request, res: Response)=>{
        

        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let number: any = req?.query?.number;
        let username: any = req?.query?.username;
        let name: any = req?.query?.name;
        let cedula: any = req?.query?.cedula;
        let telefono: any = req?.query?.telefono;
        let email: any = req?.query?.email;
        let more_info: any = req?.query?.more_info;

        let user = {
            number: number,
            username: username,
            name: name,
            cedula: cedula,
            telefono: telefono,
            email: email,
            more_info: more_info
        }

        // Controller Instance to execute a method
        const controller: UserController = new UserController();
        // Get Response
        const response: any | undefined = await controller.createUser(user);
        // Send to the client the response
        return res.send(response);
    })

    .put(async (req: Request, res: Response)=>{
        
        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        let number: any = req?.query?.number;
        let username: any = req?.query?.username;
        let name: any = req?.query?.name;
        let cedula: any = req?.query?.cedula;
        let telefono: any = req?.query?.telefono;
        let email: any = req?.query?.email;
        let more_info: any = req?.query?.more_info;
        // Controller Instance to execute a method
        const controller: UserController = new UserController();

        let user = {
            number: number,
            username: username,
            name: name,
            cedula: cedula,
            telefono: telefono,
            email: email,
            more_info: more_info
        }
        // Get Response
        const response: any = await controller.updateUser(id, user);

        // Send to the user response
        return res.send(response);
    })

// Export usersRouter

export default usersRouter;