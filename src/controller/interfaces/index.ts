import { BasicResponse, ErrorResponse } from "../types";

export interface IHelloController {
    getMessage(name?:string): Promise<BasicResponse>;
    // getMessage(name?:string): Promise<ErrorResponse>;
}

export interface IUserController{

    // Read all Users from DATABASE
    getUsers(): Promise<any>

}