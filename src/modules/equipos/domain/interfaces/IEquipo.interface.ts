import { ObjectId, Document } from "mongoose";
import { IModeloEquipo } from "./IModeloEquipo.interface";
import { IAreaEquipo } from "./IAreaEquipo.interface"; // Agregado

export interface IEquipo extends Document {
  modelo_equipos: IModeloEquipo;
  id_area: IAreaEquipo; 
  serie: string;
  ubicacion: string;
  frecuencia: number;
}
