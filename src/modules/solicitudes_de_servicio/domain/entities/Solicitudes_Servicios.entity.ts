// Solicitudes_Servicios.entity.ts
import mongoose, { Schema } from "mongoose";
import { ISolicitudServicio } from "../interfaces/Solicitudes_Servicios.interface";

export const solicitudesServiciosEntity = () => {


  const solicitudServicioSchema = new mongoose.Schema<ISolicitudServicio>(
    {
    id_creador: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    id_servicio: {
      type: Schema.Types.ObjectId,
      ref: "Servicios",
      required: true,
    },
    id_solicitud_estado: {
      type: Schema.Types.ObjectId,
      ref: "Solicitudes_Estados",
      required: true,
    },
    id_equipo: {
      type: Schema.Types.ObjectId,
      ref: "Equipos",
      required: true,
    },
    id_cambiador: {
      type: Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
    creacion: {
      type: String,
      required: true,
    },
    aviso: {
      type: String,
      required: true,
    },
    cambio_estado: {
      type: String,
      required: true,
    },
    observacion: {
      type: String,
      required: true,
    },
    observacion_estado: {
      type: String,
      required: true,
    },
  }, {
    versionKey: false,
    toJSON: { virtuals: true },
  });
  
  // Relaciones virtuales
  solicitudServicioSchema.virtual("creador", {
    ref: "Users",
    localField: "id_creador",
    foreignField: "_id",
    justOne: true
  });
  
  solicitudServicioSchema.virtual("servicio", {
    ref: "Servicios",
    localField: "id_servicio",
    foreignField: "_id",
    justOne: true
  });
  
  solicitudServicioSchema.virtual("solicitudEstado", {
    ref: "Solicitudes_Estados",
    localField: "id_solicitud_estado",
    foreignField: "_id",
    justOne: true
  });
  
  solicitudServicioSchema.virtual("equipo", {
    ref: "Equipos",
    localField: "id_equipo",
    foreignField: "_id",
    justOne: true
  });
  
  solicitudServicioSchema.virtual("cambiador", {
    ref: "Users",
    localField: "id_cambiador",
    foreignField: "_id",
    justOne: true
  });
  
  // Exporta el modelo de solicitud de servicio
    return  mongoose.models.SolicitudServicio || mongoose.model<ISolicitudServicio>("Solicitudes_Servicios", solicitudServicioSchema);
}
