import mongoose, { Schema, Document } from "mongoose";
import { IEquipo } from "../../domain/interfaces/IEquipo.interface";

export const equipoEntity = () => {
  let equipoSchema = new mongoose.Schema<IEquipo>(
    {
      serie: { type: String, required: true },
      ubicación: { type: String, required: true },
      frecuencia: { type: Number, required: true }
    },
    { versionKey: false } // Disable the versionKey function
  );

  return mongoose.models.Equipos || mongoose.model<IEquipo>("Equipos", equipoSchema);
};
