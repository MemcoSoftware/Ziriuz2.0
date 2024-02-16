// VisitasController.ts

import { Get, Query, Route, Tags, Delete, Put, Body, Post } from "tsoa";
import { LogSuccess, LogError } from "../../../utils/logger";
import {
  createVisita,
  deleteVisitaByID,
  getAllVisitas,
  getVisitaByID,
  updateVisitaByID
} from "../domain/orm/Visitas.orm";

@Route("/api/visitas")
@Tags("VisitasController")
export class VisitasController {
  @Get("/")
  public async getVisitas(page: number, limit: number, @Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/visitas] Get Visita By ID: ${id}`);
      response = await getVisitaByID(id);
    } else {
      LogSuccess('[/api/visitas] Get All Visitas Request');
      response = await getAllVisitas(page, limit);
    }
    return response;
  }

  @Delete("/")
  public async deleteVisitas(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      try {
        await deleteVisitaByID(id);
        response = {
          message: `Visita with ID: ${id} deleted successfully`
        };
      } catch (error) {
        response = {
          message: `Error deleting Visita with ID: ${id}`
        };
      }
    } else {
      LogError('[/api/visitas] Delete Visita Request WITHOUT ID');
      response = {
        message: 'Please, provide an ID to remove from DB'
      };
    }
    return response;
  }

  @Put("/")
  public async updateVisitas(@Query() id: string, @Body() visitaData: any): Promise<any> {
    let response: { success: boolean; message: string } = {
      success: false,
      message: "",
    };

    if (!id) {
      LogError('[/api/visitas] Update Visita Request WITHOUT ID');
      response.message = "Please provide an Id to update an existing Visita";
      return response;
    }

    // Actualizar la Visita con los datos proporcionados
    await updateVisitaByID(id, visitaData);

    response.success = true;
    response.message = `Visita with ID ${id} updated successfully`;
    return response;
  }

  @Post("/")
  public async createVisitas(@Body() visitaData: any): Promise<any> {
    try {
      // Crear la Visita
      const response = await createVisita(visitaData);

      if (response.success) {
        return response;
      } else {
        LogError(`[Controller ERROR]: Creating Visita: ${response.message}`);
        return response;
      }
    } catch (error) {
      LogError(`[Controller ERROR]: Creating Visita: ${error}`);
      return {
        success: false,
        message: "An error occurred while creating the Visita",
      };
    }
  }
}
