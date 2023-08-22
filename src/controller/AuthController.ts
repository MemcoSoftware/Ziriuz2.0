import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IAuthController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { IUser } from "../domain/interfaces/IUser.interface";
import { IAuth } from "../domain/interfaces/IAuth.interface";
import { loginUser, registerUser } from "../domain/orm/User.orm";

@Route("/apli/auth")
@Tags("AuthController")



export class AuthController implements IAuthController {
    
    @Post("/register")
    public async registerUser(user: IUser): Promise<any> {

        let response: any = '';

        if(user){
            LogSuccess(`[/api/auth/register] Register New User: ${user}`)
            await registerUser(user).then((r)=>{
                LogSuccess(`[/api/auth/register] Registered User: ${user}`);
                response = {
                    message: `User Registered successfully: ${user.name}`
                }
            });
        }else {
            LogWarning(`[/api/auth/register] Register needs user Entity`)
            response = {
                message: 'Please, provide a User Entity to create.'
            }
        }

        return response;
    }




    @Post("/login")
    public async loginUser(auth: IAuth): Promise<any> {

        let response: any = '';
        if(auth){
            await loginUser(auth).then((r)=>{
                LogSuccess(`[/api/auth/register] User Logged In: ${auth.username}`);
                response = {
                    message: `User successfully Logged In: ${auth.username}`,
                    token: r.token //JWT generated for logged in User
                }
            });
        }else{
            LogWarning(`[/api/auth/login] Login needs username and password`)
            response = {
                message: "Please, provide an username and password"
            }
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