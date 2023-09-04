import mongoose, { Document, Schema } from 'mongoose';
import { IRole } from '../interfaces/IRoles.interface';

export const roleEntity = ()=>{
    let roleSchema = new Schema<IRole>({
        name: {
            type: String,
            required: true,
            unique: true
        } 
    }, {
        versionKey: false, // Disable the '__v' field
    })
    return mongoose.models.Roles || mongoose.model<IRole>('Roles', roleSchema);
};






