import mongoose from "mongoose";
import { IUser } from "../interfaces/IUser.interface";



export const userEntity = () => {

    let userSchema = new mongoose.Schema<IUser>(
        {
            number: { type: Number, required: true},
            username: { type: String, required: true},
            password: {type: String, required: true},
            name: { type: String, required: true},
            cedula: { type: Number, required: true},
            telefono: { type: String, required: true},
            email: { type: String, required: true},
            more_info: { type: String, required: true},
        },
        { versionKey: false } // Deshabilitar la función versionKey
    );


    return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema);
}


// TODO: 

// - Get User By ID
// - Get User By EMAIL
// - Delete User By ID
// - Create New User
// - Update User by ID