import { Get, Query, Route, Tags, Delete, Post, Put, Body } from "tsoa";
import { ISedeController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../../../utils/logger";
import { deleteSedeByID, getAllSedes, getSedeByID, updateSedeByID, createSede, getClientByName } from "../domain/orm/Sede.orm";
import { BasicResponse } from "./types";
import { ISede } from "../domain/interfaces/ISede.interface";

@Route("/api/sedes")
@Tags("SedeController")
export class SedeController implements ISedeController {

    @Get("/")
    public async getSedes(page: number, limit: number, @Query() id?: string): Promise<any> {
        let response: any = '';
        if (id) {
            LogSuccess(`[/api/sedes] Get Sede By ID: ${id}`)
            response = await getSedeByID(id);
        } else {
            LogSuccess('[/api/sedes] Get All Sedes Request')
            response = await getAllSedes(page, limit);
        }
        return response;
    }

    @Post("/")
    public async createSede(@Body() sedeData: any): Promise<any> {
      try {
        // Extrae el nombre del cliente de los datos de la sede
        const clientName: string = sedeData.id_client?.client_name;
    
        if (clientName) {
          // Busca el cliente por nombre
          const client = await getClientByName(clientName);
    
          if (!client) {
            return {
              success: false,
              message: "El cliente no se encontró en la base de datos.",
            };
          }
    
          // Asocia el cliente a la sede
          sedeData.id_client = client._id;
    
          // Crea el equipo con las relaciones establecidas
          const response = await createSede(sedeData);
    
          if (response.success) {
            return response;
          } else {
            LogError(`[Controller ERROR]: Creating Sede: ${response.message}`);
            return response;
          }
        } else {
          // Si no se proporcionó un nombre de cliente, simplemente crea la sede
          const response = await createSede(sedeData);
          if (response.success) {
            return response;
          } else {
            LogError(`[Controller ERROR]: Creating Sede: ${response.message}`);
            return response;
          }
        }
      } catch (error) {
        LogError(`[Controller ERROR]: Creating Sede: ${error}`);
        return {
          success: false,
          message: "An error occurred while creating the sede",
        };
      }
    }
    
    





    @Delete("/")
    public async deleteSede(@Query() id?: string): Promise<any> {
        let response: any = '';
        if (id) {
            try {
                await deleteSedeByID(id);
                response = {
                    message: `Sede with ID: ${id} deleted successfully`
                };
            } catch (error) {
                response = {
                    message: `Error deleting sede with ID: ${id}`
                };
            }
        } else {
            LogWarning('[/api/sedes] Delete Sede Request WITHOUT ID ');
            response = {
                message: 'Please, provide an ID to remove from DB'
            };
        }
        return response;
    }

    @Put("/")
public async updateSede(@Query() id: string, @Body() sedeData: ISede): Promise<any> {
    let response: any = '';
    if (id) {
        LogSuccess(`[/api/sedes] Update Sede By ID: ${id}`);
        // Agrega la búsqueda de cliente por nombre si se proporciona el nombre del cliente
        if (sedeData.id_client?.client_name) {
            const client = await getClientByName(sedeData.id_client.client_name);
            if (client) {
                sedeData.id_client = client._id; // Asocia el cliente encontrado
            } else {
                LogWarning('[/api/sedes] Client not found by name');
                response = {
                    message: 'Client not found by name'
                };
                return response;
            }
        }

        await updateSedeByID(id, sedeData).then((r) => {
            response = {
                message: `Sede with ID ${id} updated successfully`
            };
        });
    } else {
        LogWarning('[/api/sedes] Update Sede Request WITHOUT ID');
        response = {
            message: 'Please, provide an Id to update an existing Sede'
        };
    }
    return response;
}

}




