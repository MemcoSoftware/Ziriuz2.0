"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
// ORM - Users Collection
const User_orm_1 = require("../domain/orm/User.orm");
const User_entity_1 = require("../domain/entities/User.entity");
const Roles_entity_1 = require("../domain/entities/Roles.entity");
const mongoose_1 = __importDefault(require("mongoose"));
let UserController = exports.UserController = class UserController {
    /**
     * Endpoint to retreive the USers in the "Users" Collection from DB
     * @param {string} id Id of user to retreive (optional)
     * @returns All users or user found by ID
    */
    getUsers(page, limit, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Get User By ID: ${id}`);
                response = yield (0, User_orm_1.getUserByID)(id);
            }
            else {
                (0, logger_1.LogSuccess)('[/api/users] Get All Users Request');
                response = yield (0, User_orm_1.getAllUsers)(page, limit);
            }
            return response;
        });
    }
    /**
     * Endpoint to delete the USers in the "Users" Collection from DB
     * @param {string} id Id of user to retreive (optional)
     * @returns message confirming user was deleted
    */
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                try {
                    yield (0, User_orm_1.deleteUserByID)(id);
                    response = {
                        message: `User with ID: ${id} deleted successfully`
                    };
                }
                catch (error) {
                    response = {
                        message: `Error deleting user with ID: ${id}`
                    };
                }
            }
            else {
                (0, logger_1.LogWarning)('[/api/users] Delete User Request WITHOUT ID ');
                response = {
                    message: 'Please, provide an ID to remove from DB'
                };
            }
            return response;
        });
    }
    /**
     * Endpoint to create new user in the "Users" Collection from DB
     * @param {string} id Id of user to retreive (optional)
     * @returns message confirming user was deleted
    */
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Update User By ID: ${id}`);
                yield (0, User_orm_1.updateUserByID)(id, user).then((r) => {
                    response = {
                        message: `User with ID ${id} updated successfully`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)('[/api/users] Update User Request WITHOUD ID');
                response = {
                    message: 'Please, provide an Id to update an existing User'
                };
            }
            return response;
        });
    }
    searchUsersByKeyword(keyword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
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
                        { roles: { $in: roleIds.map(roleId => new mongoose_1.default.Types.ObjectId(roleId.toString())) } },
                    ],
                })
                    .select('_id number username name cedula telefono email more_info');
                // Agregamos un registro de depuración para verificar los resultados
                console.log('Usuarios encontrados:', users);
                return users;
            }
            catch (error) {
                (0, logger_1.LogError)(`[USERS CONTROLLER ERROR]: Searching Users by Keyword: ${error}`);
                throw error;
            }
        });
    }
};
__decorate([
    (0, tsoa_1.Get)("/"),
    __param(2, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUsers", null);
__decorate([
    (0, tsoa_1.Delete)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
__decorate([
    (0, tsoa_1.Put)("/"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("/api/users"),
    (0, tsoa_1.Tags)("UserController")
], UserController);
//# sourceMappingURL=UsersController.js.map