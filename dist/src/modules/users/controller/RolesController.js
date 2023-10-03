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
exports.RolesController = void 0;
const Roles_orm_1 = require("../domain/orm/Roles.orm");
class RolesController {
    createRole(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newRole = yield (0, Roles_orm_1.insertRole)(name);
                return {
                    message: 'Role created successfully',
                    role: newRole,
                };
            }
            catch (error) {
                console.error('[RolesController]: Error creating role:', error);
                return {
                    error: 'Error creating role',
                    message: 'An error occurred while creating the role',
                };
            }
        });
    }
}
exports.RolesController = RolesController;
//# sourceMappingURL=RolesController.js.map