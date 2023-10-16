import { Document } from "mongoose";
import { IMarcaEquipo } from "./IMarcaEquipo.interface"; // Importa la interfaz de MarcaEquipo
import { IClassDevice } from "./IClassDevice.interface"; // Importa la interfaz de ClaseEquipo

export interface IModeloEquipo extends Document {
  modelo: string;
  precio: number;
  id_marca?: IMarcaEquipo; 
  id_clase?: IClassDevice; 
}
