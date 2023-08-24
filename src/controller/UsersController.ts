import { Get, Query, Route, Tags, Delete, Post, Put } from "tsoa";
import { IUserController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";


// ORM - Users Collection
import { deleteUserByID, getAllUsers, getUserByID, updateUserByID } from "../domain/orm/User.orm";
import { BasicResponse } from "./types";



@Route("/api/users")
@Tags("UserController")

export class UserController implements IUserController {
    
    
    /**
     * Endpoint to retreive the USers in the "Users" Collection from DB
     * @param {string} id Id of user to retreive (optional)
     * @returns All users or user found by ID  
    */
   @Get("/")
   public async getUsers(page: number, limit: number, @Query()id?: string): Promise<any> {
       
       let response: any = '';
    
       if(id){
           LogSuccess(`[/api/users] Get User By ID: ${id}`)
           response = await getUserByID(id);
           
           
        
    }else{
        LogSuccess('[/api/users] Get All Users Request')
        
        response = await getAllUsers(page, limit);
        
    }
    return response;
} 

/**
 * Endpoint to delete the USers in the "Users" Collection from DB
 * @param {string} id Id of user to retreive (optional)
 * @returns message confirming user was deleted
*/
@Delete("/")
public async deleteUser(@Query()id?: string): Promise<any> {
    
    let response: any = '';
    
     if(id){
         try {
             await deleteUserByID(id);
             response = {
             
                message: `User with ID: ${id} deleted successfully`
            };
        } catch (error) {
            response = {
          
                message: `Error deleting user with ID: ${id}`
            };
        }
    } else {
        LogWarning('[/api/users] Delete User Request WITHOUT ID ');
        
        response = {
            
            message: 'Please, provide an ID to remove from DB'
        };
    }
    return response;
}

/**
 * Endpoint to create new user in the "Users" Collection from DB
 * @param {string} id Id of user to retreive (optional)
 * @returns message confirming user was deleted
*/



@Put("/")

public async updateUser(@Query()id: string, user: any): Promise<any> {

    let response: any = '';
    
       if(id){
           LogSuccess(`[/api/users] Update User By ID: ${id}`)
            await updateUserByID(id, user).then((r)=>{
            response= {
               
                message: `User with ID ${id} updated successfully`
            }
           })
           
        
    }else{
        LogWarning('[/api/users] Update User Request WITHOUD ID')
        
        response = {
           
            message: 'Please, provide an Id to update an existing User'
        }
    }
    return response;
}




}



