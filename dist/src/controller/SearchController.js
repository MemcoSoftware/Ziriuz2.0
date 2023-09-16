"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../utils/logger");
const User_entity_1 = require("../domain/entities/User.entity");
const Roles_entity_1 = require("../domain/entities/Roles.entity");
class SearchController {
    searchUsersByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (typeof keyword !== 'string') {
                    throw new Error('El parámetro keyword es inválido.');
                }
                (0, logger_1.LogInfo)(`Search for users with keyword: ${keyword}`);
                const userModel = (0, User_entity_1.userEntity)();
                const rolesModel = (0, Roles_entity_1.roleEntity)();
                // Primero, busca los roles por nombre en la colección Roles
                const roles = yield rolesModel.find({ name: { $regex: keyword, $options: 'i' } }).select('_id');
                const roleIds = roles.map(role => role._id);
                // Luego, busca usuarios que tengan esos roles por ObjectId
                const users = yield userModel
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
                    model: rolesModel,
                    select: 'name',
                }); // Agrega el nombre del rol a la respuesta
                return users;
            }
            catch (error) {
                console.error(error);
                throw new Error('Error en la búsqueda de usuarios.');
            }
        });
    }
}
exports.default = new SearchController();
//# sourceMappingURL=SearchController.js.map