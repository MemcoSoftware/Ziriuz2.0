import { Get, Query, Route, Tags, Delete, Post, Put, Body } from "tsoa";
import { ISedeController } from "./interfaces";
import { LogSuccess, LogError, LogWarning } from "../utils/logger";
import { deleteSedeByID, getAllSedes, getSedeByID, updateSedeByID, createSede } from "../domain/orm/Sede.orm";
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
    public async createSede(@Body() sedeData: ISede): Promise<any> {
        let response: any = '';
        try {
            LogSuccess('[/api/sedes] Create Sede Request')
            response = await createSede(sedeData);
        } catch (error) {
            LogError('[ORM ERROR]: Creating Sede');
            response = {
                message: 'Invalid format/entity'
            }
        }
        return response;
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
            LogSuccess(`[/api/sedes] Update Sede By ID: ${id}`)
            await updateSedeByID(id, sedeData).then((r) => {
                response = {
                    message: `Sede with ID ${id} updated successfully`
                }
            })
        } else {
            LogWarning('[/api/sedes] Update Sede Request WITHOUT ID')
            response = {
                message: 'Please, provide an Id to update an existing Sede'
            }
        }
        return response;
    }
}




