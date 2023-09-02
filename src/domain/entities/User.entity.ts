import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "../interfaces/IUser.interface";
import { roleEntity } from "./Roles.entity";


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
            // New spaces related with Collection Roles
            roles: [{ type: Schema.Types.ObjectId, ref: "Roles" }],
            type: { type: String, required: false}, // Tecnician type
            titulo: { type: String, required: false}, // Tecnician title
            reg_invima: { type: String, required: false} // INVIMA Register
            
        },
        { versionKey: false } // Deshabilitar la función versionKey
    );


    return mongoose.models.Users || mongoose.model<IUser>('Users', userSchema);
}


