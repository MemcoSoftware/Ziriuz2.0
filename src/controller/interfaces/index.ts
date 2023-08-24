import { ITecnico } from "../../domain/interfaces/ITecnico.interface";
import { IUser } from "../../domain/interfaces/IUser.interface";
import { BasicResponse, ErrorResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
    // getMessage(name?:string): Promise<ErrorResponse>;
}

export interface IUserController{

    // Read all Users from DATABASE || Get User By ID
    getUsers(page: number, limit: number, id?: string): Promise<any>
    // Delet user by ID from DATABASE 
    deleteUser(id?:string): Promise<any>
    
    // Update User
    updateUser(id:string, user:any): Promise<any>
}



export interface IAuthController {
    // register users
    registerUser(user: IUser): Promise<any>
    // Login user
    loginUser(auth: any): Promise<any>
}


export interface ITecnicoController {
    // Read all Tecnicos from DATABASE || Get Tecnico By ID
    getTecnico(page: number, limit: number, id?: string): Promise<any>
    // Create Tecnico
    createTecnico(tecnico: ITecnico): Promise<any>
    // Delet Tecnico by ID from DATABASE 
    deleteTecnico(id?:string): Promise<any>
    
    // Update Tecnico
    updateTecnico(id:string, tecnico:ITecnico): Promise<any>

}