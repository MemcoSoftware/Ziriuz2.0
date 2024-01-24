import mongoose, { Schema } from "mongoose";
import { ISolicitudesEstados } from "../../domain/interfaces/ISolicitudesEstados.interface";

export const SolicitudesEstadosEntity = () => {
  
  const solicitudesEstadosSchema = new mongoose.Schema<ISolicitudesEstados>(
   {
     estado: { type: String, required: true },
   },
   { versionKey: false, toJSON: { virtuals: true } }
   );
   
   return mongoose.models.SolicitudesEstados ||
     mongoose.model<ISolicitudesEstados>("Solicitudes_Estados", solicitudesEstadosSchema);
}

