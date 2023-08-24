import mongoose from "mongoose";
import { ITecnico } from "../interfaces/ITecnico.interface";

export const tecnicoEntity = () => {

    let tecnicoSchema = new mongoose.Schema<ITecnico>(
        {
            
        },
        { versionKey: false } // Deshabilitar la función versionKey
    );


    return mongoose.models.Users || mongoose.model<ITecnico>('Users', tecnicoSchema);
}

