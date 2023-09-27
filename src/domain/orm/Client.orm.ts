import mongoose from 'mongoose';
import { clientEntity } from '../entities/Client.entity';
import { IClient } from '../interfaces/IClient.interface';

// Obtener todos los clientes
export const getAllClients = async (): Promise<IClient[]> => {
  const clientModel = clientEntity();
  return clientModel.find().exec();
}

// Obtener cliente por ID
export const getClientByID = async (id: string): Promise<IClient | null> => {
  const clientModel = clientEntity();
  return clientModel.findById(id).exec();
}

// Crear un nuevo cliente
export const createClient = async (client: IClient): Promise<IClient> => {
  const clientModel = clientEntity();
  return clientModel.create(client);
}

// Actualizar cliente por ID
export const updateClient = async (id: string, client: IClient): Promise<IClient | null> => {
  const clientModel = clientEntity();
  return clientModel.findByIdAndUpdate(id, client, { new: true }).exec();
}

// Eliminar cliente por ID
export const deleteClient = async (id: string): Promise<void> => {
  const clientModel = clientEntity();
  await clientModel.findByIdAndDelete(id).exec();
}
