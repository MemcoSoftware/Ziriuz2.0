import mongoose, { Schema, Document } from "mongoose";
import { ISede } from "../interfaces/ISede.interface";

export const sedeEntity = () => {
    let sedeSchema = new mongoose.Schema<ISede>(
        {
            nombre_sede: { type: String, required: true },
            address_sede: { type: String, required: true },
            sede_telefono: { type: String, required: true },
            sede_email: { type: String, required: true },
            more_info: { type: String, required: true },
        },
        { versionKey: false }
    );

    return mongoose.models.Sedes || mongoose.model<ISede>('Sedes', sedeSchema);
}
