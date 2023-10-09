import { ObjectId, Document } from "mongoose";
import { IModeloEquipo } from "./IModeloEquipo.interface";
import { IAreaEquipo } from "./IAreaEquipo.interface"; // Agregado
import { ITipoEquipo } from "./ITipoEquipo.interface";

export interface IEquipo extends Document {
  modelo_equipos: IModeloEquipo;
  id_area: IAreaEquipo; 
  id_tipo: ITipoEquipo;
  serie: string;
  ubicacion: string;
  frecuencia: number;
}
