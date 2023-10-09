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
    },
    { versionKey: false }
  );

  return mongoose.models.Modelo_Equipos || mongoose.model<IModeloEquipo>("Modelo_Equipos", modeloEquipoSchema);
};
