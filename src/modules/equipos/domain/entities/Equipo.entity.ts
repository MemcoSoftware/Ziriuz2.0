import mongoose, { Schema, Document } from "mongoose";
import { IEquipo } from "../../domain/interfaces/IEquipo.interface";

export const equipoEntity = () => {
  const equipoSchema = new mongoose.Schema<IEquipo>(
    {
      modelo_equipos: {
        type: Schema.Types.ObjectId,
        ref: "Modelo_Equipos",
        required: true,
      },
      id_area: {
        type: Schema.Types.ObjectId,
        ref: "Areas_Equipos", 
        required: true,
      },
      serie: { type: String, required: true },
      ubicacion: { type: String, required: true },
      frecuencia: { type: Number, required: true },
    },
    { versionKey: false }
  );

  return mongoose.models.Equipos || mongoose.model<IEquipo>("Equipos", equipoSchema);
};
