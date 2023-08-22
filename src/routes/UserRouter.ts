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
        // Controller Instance to execute a method
        const controller: UserController = new UserController();

        let user = {
            number: 3,
            username: "jaime.ruiz ",
            name: "Jaime Ruiz",
            cedula: 1010101010,
            telefono: "3112121212",
            email: "ceo@memcosas.com",
            more_info: "CEO OF MEMCO SAS"
        }

        // Get Response
        const response: any | undefined = await controller.createUser(user);
        // Send to the client the response
        return res.send(response);
    })

    .put(async (req: Request, res: Response)=>{
        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);

        // Controller Instance to execute a method
        const controller: UserController = new UserController();

        let user = {
            number: 3,
            username: "jaime.ruiz ",
            name: "Jaime Ruiz",
            cedula: 1010101010,
            telefono: "3112121212",
            email: "email@email.com",
            more_info: "CEO OF MEMCO SAS"
        }
        // Get Response
        const response: any | undefined = await controller.updateUser(id, user);

        // Send to the user response
        return res.send(response);
    })

// Export usersRouter

export default usersRouter;