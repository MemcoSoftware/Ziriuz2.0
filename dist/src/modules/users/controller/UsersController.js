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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../../../utils/logger");
// ORM - Users Collection
const User_orm_1 = require("../domain/orm/User.orm");
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
            try {
                let response = {
                    success: false,
                    message: "",
                };
                if (!id) {
                    (0, logger_1.LogWarning)('[/api/users] Update User Request WITHOUT ID');
                    response.message = "Please, provide an Id to update an existing User";
                    return response;
                }
                // Controller Instance to execute a method
                const existingUser = yield (0, User_orm_1.getUserByID)(id);
                if (!existingUser) {
                    response.message = `User with ID ${id} not found`;
                    return response;
                }
                // Update User
                yield (0, User_orm_1.updateUserByID)(id, user);
                response.success = true;
                response.message = `User with ID ${id} updated successfully`;
                return response;
            }
            catch (error) {
                (0, logger_1.LogError)(`[Controller ERROR]: Updating User ${id}: ${error}`);
                return {
                    success: false,
                    message: "An error occurred while updating the user",
                };
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
    __param(1, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateUser", null);
exports.UserController = UserController = __decorate([
    (0, tsoa_1.Route)("/api/users"),
    (0, tsoa_1.Tags)("UserController")
], UserController);
//# sourceMappingURL=UsersController.js.map