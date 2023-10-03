import mongoose, { Schema, Document } from "mongoose";
import { IClassDevice } from "../interfaces/IClassDevice.interface";

export const classDeviceEntity = () => {
  const classDeviceSchema = new mongoose.Schema<IClassDevice>(
    {
      clase: { type: String, required: true },
    },
    { versionKey: false }
  );

  return mongoose.models.Clases_Equipos|| mongoose.model<IClassDevice>("Clases_Equipos", classDeviceSchema);
};
