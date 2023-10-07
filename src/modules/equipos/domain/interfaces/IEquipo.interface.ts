import { ObjectId, Document } from "mongoose";
import { IModeloEquipo } from "./IModeloEquipo.interface";

export interface IEquipo extends Document {
  modelo_equipos: IModeloEquipo; 
  serie: string;
  ubicacion: string;
  frecuencia: number;
}
