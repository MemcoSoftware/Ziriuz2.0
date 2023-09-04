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
exports.insertRole = void 0;
const Roles_entity_1 = require("../entities/Roles.entity");
const insertRole = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const rolesModel = (0, Roles_entity_1.roleEntity)();
        const newRole = new rolesModel({
            name,
        });
        yield newRole.save();
        return newRole;
    }
    catch (error) {
        console.error('[Roles ORM]: Error inserting role:', error);
        throw new Error('[Roles ORM]: Error inserting role');
    }
});
exports.insertRole = insertRole;
//# sourceMappingURL=Roles.orm.js.map