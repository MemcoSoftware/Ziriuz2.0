import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";



// Router from Express

let usersRouter = express.Router();

//http://localhost:8000/api/users/

usersRouter.route('/')
// GET:
    .get(async (req: Request, res: Response) =>{
      
        // Controller Instance to execute a method
        const controller: UserController = new UserController();
        // Get Response
        const response:any = await controller.getUsers();
        // Send to the client the response
        return res.send(response);

    })

// Export usersRouter

export default usersRouter;