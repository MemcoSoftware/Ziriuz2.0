import { Get, Query, Route, Tags, Delete, Put, Body, Post} from "tsoa";
import { IEquipoController } from "./interfaces";
import { LogSuccess, LogError, LogWarning, LogInfo } from "../../../utils/logger";
import { equipoEntity } from "../../equipos/domain/entities/Equipo.entity"; // Import the equipment model
import { createEquipo, deleteEquipoByID, getAllEquipos, getEquipoByID, updateEquipoByID } from "../domain/orm/Equipo.orm";

@Route("/api/equipos")
@Tags("EquipoController")
export class EquipoController implements IEquipoController {
  @Get("/")
  public async getEquipos(page: number, limit: number, @Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      LogSuccess(`[/api/equipos] Get Equipo By ID: ${id}`);
      response = await getEquipoByID(id);
    } else {
      LogSuccess('[/api/equipos] Get All Equipos Request');
      response = await getAllEquipos(page, limit);
    }
    return response;
  }

  @Delete("/")
  public async deleteEquipo(@Query() id?: string): Promise<any> {
    let response: any = '';

    if (id) {
      try {
        await deleteEquipoByID(id);
        response = {
          message: `Equipo with ID: ${id} deleted successfully`
        };
      } catch (error) {
        response = {
          message: `Error deleting equipo with ID: ${id}`
        };
      }
    } else {
      LogWarning('[/api/equipos] Delete Equipo Request WITHOUT ID');
      response = {
        message: 'Please, provide an ID to remove from DB'
      };
    }
    return response;
  }

  @Put("/")
  public async updateEquipo(@Query() id: string, @Body() equipo: any): Promise<{ success: boolean; message: string }> {
    try {
      let response: { success: boolean; message: string } = {
        success: false,
        message: "",
      };

      if (!id) {
        LogWarning('[/api/equipos] Update Equipo Request WITHOUT ID');
        response.message = "Please, provide an Id to update an existing Equipo";
        return response;
      }

      // Controller Instance to execute a method
      const existingEquipo = await getEquipoByID(id);

      if (!existingEquipo) {
        response.message = `Equipo with ID ${id} not found`;
        return response;
      }

      // Update Equipo
      await updateEquipoByID(id, equipo);

      response.success = true;
      response.message = `Equipo with ID ${id} updated successfully`;
      return response;
    } catch (error) {
      LogError(`[Controller ERROR]: Updating Equipo ${id}: ${error}`);
      return {
        success: false,
        message: "An error occurred while updating the equipo",
      };
    }
  }

  @Post("/")
public async createEquipo(@Body() equipo: any): Promise<any> {
    try {
        const response = await createEquipo(equipo); // Llama a la función createEquipo del ORM

        if (response.success) {
            return response;
        } else {
            LogError(`[Controller ERROR]: Creating Equipo: ${response.message}`);
            return response;
        }
    } catch (error) {
        LogError(`[Controller ERROR]: Creating Equipo: ${error}`);
        return {
            success: false,
            message: "An error occurred while creating the equipo",
        };
    }
}


}

// Add the CRUD functions for equipment below (e.g., getAllEquipos, getEquipoByID, deleteEquipoByID, updateEquipoByID)

