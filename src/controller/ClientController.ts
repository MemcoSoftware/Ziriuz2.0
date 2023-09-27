import { Get, Route, Tags, Post, Put, Delete, Body, Path } from 'tsoa';
import { IClientController } from './interfaces';
import { LogSuccess, LogError, LogWarning } from '../utils/logger';
import * as ClientOrm from '../domain/orm/Client.orm';
import { IClient } from '../domain/interfaces/IClient.interface';

@Route('/api/clients')
@Tags('ClientController')
export class ClientController implements IClientController {
  @Get('/')
  public async getClients(): Promise<IClient[]> {
    try {
      LogSuccess('[/api/clients] Get All Clients Request');
      return await ClientOrm.getAllClients();
    } catch (error) {
      LogError('[Controller ERROR]: Getting All Clients');
      return [];
    }
  }

  @Get('{id}')
  public async getClientByID(@Path() id: string): Promise<IClient | null> {
    try {
      LogSuccess(`[/api/clients/${id}] Get Client By ID: ${id}`);
      return await ClientOrm.getClientByID(id);
    } catch (error) {
      LogError(`[Controller ERROR]: Getting Client By ID: ${id}`);
      return null;
    }
  }

  @Post('/')
  public async createClient(@Body() client: IClient): Promise<IClient> {
    try {
      LogSuccess('[/api/clients] Create Client Request');
      return await ClientOrm.createClient(client);
    } catch (error) {
      LogError('[Controller ERROR]: Creating Client');
      return {} as IClient;
    }
  }

  @Put('{id}')
  public async updateClient(@Path() id: string, @Body() client: IClient): Promise<IClient | null> {
    try {
      LogSuccess(`[/api/clients/${id}] Update Client Request`);
      return await ClientOrm.updateClient(id, client);
    } catch (error) {
      LogError(`[Controller ERROR]: Updating Client: ${id}`);
      return null;
    }
  }

  @Delete('{id}')
  public async deleteClient(@Path() id: string): Promise<void> {
    try {
      LogSuccess(`[/api/clients/${id}] Delete Client Request`);
      await ClientOrm.deleteClient(id);
    } catch (error) {
      LogError(`[Controller ERROR]: Deleting Client: ${id}`);
    }
  }
}
