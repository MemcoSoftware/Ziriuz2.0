// SolicitudesServiciosController.ts

import { Get, Query, Route, Tags, Delete, Put, Body, Post } from "tsoa";
import { ISolicitudesServiciosController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../../../utils/logger";
import {
  createSolicitudServicio,
  deleteSolicitudServicioByID,
  getAllSolicitudesServicios,
  getSolicitudServicioByID,
  updateSolicitudServicioByID
} from "../domain/orm/Solicitudes_Servicios.orm";

@Route("/api/solicitudes-servicios")
@Tags("SolicitudesServiciosController")
export class SolicitudesServiciosController implements ISolicitudesServiciosController {
  @Get("/")
  public async getSolicitudesServicios(page: number, limit: number, @Query() id?: string): Promise<any> {
    if (id) {
      LogSuccess(`[/api/solicitudes-servicios] Get Solicitud Servicio By ID: ${id}`);
      return await getSolicitudServicioByID(id);
    } else {
      LogSuccess('[/api/solicitudes-servicios] Get All Solicitudes Servicios Request');
      return await getAllSolicitudesServicios(page, limit);
    }
  }

  @Delete("/")
  public async deleteSolicitudServicio(@Query() id?: string): Promise<any> {
    if (id) {
      LogSuccess(`[/api/solicitudes-servicios] Delete Solicitud Servicio ID: ${id}`);
      return await deleteSolicitudServicioByID(id);
    } else {
      LogWarning('[/api/solicitudes-servicios] Delete Solicitud Servicio Request WITHOUT ID');
      return {
        message: 'Please, provide an ID to remove from DB'
      };
    }
  }

  @Put("/")
  public async updateSolicitudServicio(@Query() id: string, @Body() solicitudServicioData: any, @Query() cambiadorId: string): Promise<any> {
    if (!id || !cambiadorId) {
      LogWarning('[/api/solicitudes-servicios] Update Solicitud Servicio Request WITHOUT ID or Cambiador ID');
      return { message: "Please provide an Id and Cambiador Id to update an existing Solicitud Servicio" };
    }

    return await updateSolicitudServicioByID(id, solicitudServicioData, cambiadorId);
  }

  @Post("/")
  public async createSolicitudServicio(@Body() solicitudServicioData: any): Promise<any> {
    if (!solicitudServicioData.id_creador) {
      LogWarning('[/api/solicitudes-servicios] Create Solicitud Servicio Request WITHOUT Creador ID');
      return { message: "Please provide a Creador Id in the request body to create a new Solicitud Servicio" };
    }
  
    return await createSolicitudServicio(solicitudServicioData, solicitudServicioData.id_creador);
  }
  
}