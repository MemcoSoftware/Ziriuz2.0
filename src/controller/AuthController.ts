import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";
import { getUserByID, loginUser, registerUser } from "../domain/orm/User.orm";
import { AuthResponse, ErrorResponse } from "./types";

@Route("/apli/auth")
@Tags("AuthController")



export class AuthController implements IAuthController {
    
    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {

        let response: any = '';

        if(user){
            LogSuccess(`[/api/auth/register] Register New User: ${user.name}`);
            await registerUser(user).then((r)=>{
                LogSuccess(`[/api/auth/register] Registered User: ${user.username}`);
                response = {
                    message: `User Registered successfully: ${user.name}`
                }
            });
        }else {
            LogWarning(`[/api/auth/register] Register needs user Entity`)
            response = {
                message: 'User not Registered: Please, provide an User Entity to create.'
            }
        }

        return response;
    }




    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {

        let response: AuthResponse | ErrorResponse |undefined;
        if(auth){
            LogSuccess(`[/api/auth/login] User Logged In: ${auth.username}`);
            let data = await loginUser(auth);
            response = {
                token: data.token,
                message: `Welcome, ${data.user.name}`
            }
        }else{
            LogWarning(`[/api/auth/login] Login needs username and password`)
            response = {
                error: '[AUTH ERROR]: Username and Password are Required',
                message: "Please, provide an username and password"
            }
        }
        return response; 
    }

    /**
     * Endpoint to retreive the USers in the "Users" Collection from DB
     * Middleware: Validate JWT
     * In Headers the x-access-token must be added with a valid JWT
     * @param {string} id Id of user to retreive (optional)
     * @returns All users or user found by ID  
    */

    @Get("/me")
   public async userData(@Query()id: string): Promise<any> {
       
       let response: any = '';
    
       if(id){
           LogSuccess(`[/api/users] Get User Data By ID: ${id}`);
           response = await getUserByID(id);
           
    }
    return response;
    
} 

    
    @Post("/logout")
    public async logoutUser(): Promise<any> {
        let response: any = '';
        // TODO: Close session of user
        throw new Error("Method not implemented.");
    }
}