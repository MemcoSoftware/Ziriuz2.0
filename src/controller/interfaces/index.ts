import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse, ErrorResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
    // getMessage(name?:string): Promise<ErrorResponse>;
}

export interface IUserController{

    // Read all Users from DATABASE || Get User By ID
    getUsers(id?: string): Promise<any>
    // Delet user by ID from DATABASE 
    deleteUser(id?:string): Promise<any>
    // Create new User
    createUser(user: any): Promise<any>
    // Update User
    updateUser(id:string, user:any): Promise<any>
}



export interface IAuthController {
    // register users
    registerUser(user: IUser): Promise<any>
    // Login user
    loginUser(auth: any): Promise<any>
}