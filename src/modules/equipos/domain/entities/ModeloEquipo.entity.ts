import mongoose, { Schema } from "mongoose";
import { IModeloEquipo } from "../interfaces/IModeloEquipo.interface";

export const modeloEquipoEntity = () => {
  const modeloEquipoSchema = new mongoose.Schema<IModeloEquipo>(
    {
      modelo: {
        type: String,
        required: true
      },
      precio: { type: Number, required: true },
      id_marca: {
        type: Schema.Types.ObjectId,
        ref: "Marcas_Equipos", 
        required: false,
      },
      id_clase: {
        type: Schema.Types.ObjectId,
        ref: "Clases_Equipos", 
        required: false,
      },
    },
    
    { versionKey: false }
  );

  modeloEquipoSchema.virtual("marcaEquipo", {
    ref: "Marcas_Equipos",
    localField: "id_marca",
    foreignField: "_id",
  });

  modeloEquipoSchema.virtual("claseEquipo", {
    ref: "Clases_Equipos",
    localField: "id_clase",
    foreignField: "_id",
  });

  return mongoose.models.Modelo_Equipos || mongoose.model<IModeloEquipo>("Modelo_Equipos", modeloEquipoSchema);
};
