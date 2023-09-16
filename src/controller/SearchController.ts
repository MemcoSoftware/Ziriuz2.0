import { LogInfo } from '../utils/logger';
import { userEntity } from '../domain/entities/User.entity';
import { roleEntity } from '../domain/entities/Roles.entity';
import mongoose from 'mongoose';
import { ISearchController } from './interfaces';

class SearchController implements ISearchController {
  public async searchUsersByKeyword(keyword: string): Promise<any> {
    try {
      if (typeof keyword !== 'string') {
        throw new Error('El parámetro keyword es inválido.');
      }

      LogInfo(`Search for users with keyword: ${keyword}`);

      const userModel = userEntity();
      const rolesModel = roleEntity();

      // Primero, busca los roles por nombre en la colección Roles
      const roles = await rolesModel.find({ name: { $regex: keyword, $options: 'i' } }).select('_id');
      const roleIds = roles.map(role => role._id);

      // Luego, busca usuarios que tengan esos roles por ObjectId
      const users = await userModel
        .find({
          $or: [
            { username: { $regex: keyword, $options: 'i' } },
            { name: { $regex: keyword, $options: 'i' } },
            { telefono: { $regex: keyword, $options: 'i' } },
            { email: { $regex: keyword, $options: 'i' } },
            { more_info: { $regex: keyword, $options: 'i' } },
            { roles: { $in: roleIds } },
          ],
        })
        .select('_id number username name cedula telefono email more_info') // Excluye el campo 'cedula'
        .populate({
          path: 'roles',
          model: rolesModel, // Usa el modelo de Roles aquí
          select: 'name',
        }); // Agrega el nombre del rol a la respuesta

      return users;
    } catch (error) {
      console.error(error);
      throw new Error('Error en la búsqueda de usuarios.');
    }
  }
}

export default new SearchController();
