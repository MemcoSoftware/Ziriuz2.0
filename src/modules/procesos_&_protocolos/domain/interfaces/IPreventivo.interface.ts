import { ObjectId, Document } from "mongoose";
import { ICampos } from "./ICampos.interface";

export interface IPreventivo extends Document {
  title: string;
  codigo: string;
  version: number;
  fecha: string;
  cualitativo: ICampos[];
  mantenimiento: ICampos[];
  cuantitativo: ICampos[];
  otros: ICampos[]; 
}
