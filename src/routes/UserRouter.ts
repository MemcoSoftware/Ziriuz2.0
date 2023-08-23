import express, { Request, Response } from "express";
import { UserController } from "../controller/UsersController";
import { LogInfo } from "../utils/logger";

// Body Parser to Read  BODY from requests
import bodyParser from 'body-parser';

 // JWT Verifier Middleware
import { verifyToken } from "../middlewares/verifyToken.middleware";

let jsonParser = bodyParser.json();

// Router from Express

let usersRouter = express.Router();

//http://localhost:8000/api/users?id=64e16f5e7b636b0679ca720c

usersRouter.route('/')


// GET:
    .get(verifyToken, async (req: Request, res: Response) =>{
        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;

        // Pagination
        let page: any = req?.query?.page || 1;
        let limit: any = req?.query?.limit || 9;

        LogInfo(`Query Param: ${id}`)
        // Controller Instance to execute a method
        const controller: UserController = new UserController();
        // Get Response
        const response: any | undefined = await controller.getUsers(page, limit, id);
        // Send to the client the response
        return res.status(200).send(response);

    })


    // DELETE: 
    .delete(verifyToken, async (req: Request, res: Response)=> {
        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;
        LogInfo(`Query Param: ${id}`);
        // Controller Instance to execute a method
        const controller: UserController = new UserController();
        // Get Response
        const response: any | undefined = await controller.deleteUser(id);
        // Send to the client the response
        return res.status(200).send(response);
    })




    // UPDATE
    .put(verifyToken, async (req: Request, res: Response)=>{

        // Obtein a Query Param (ID)
        let id: any = req?.query?.id;
        let number: any = req?.query?.number;
        let username: any = req?.query?.username;
        let name: any = req?.query?.name;
        let cedula: any = req?.query?.cedula;
        let telefono: any = req?.query?.telefono;
        let email: any = req?.query?.email;
        let more_info: any = req?.query?.more_info;
        LogInfo(`Query Param: ${id} ${number} ${username} ${name} ${cedula} ${telefono} ${email} ${more_info}`);
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
        return res.status(200).send(response);
    })



    



// Export usersRouter

export default usersRouter;

/**
 * Get / Read Documents => 200 OK
 * Post / Create Document => 201 OK
 * Delete Document => 200 (Entity) / 204 (No return)
 * Put / Update Documents => 200 (Entity) / 204 (No Return)
 * 
 */