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
exports.getAllUsers = void 0;
const User_entity_1 = require("../entities/User.entity");
const logger_1 = require("../../utils/logger");
// CRUS
/**
 * Method to obtain all Users from Collection "Users" in Mongo Server
 */
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let userModel = (0, User_entity_1.userEntity)();
        // Search all users
        return yield userModel.find({ isDelete: false });
    }
    catch (error) {
        (0, logger_1.LogError)(`[ORM ERROR]: Getting All Users: ${error}`);
    }
});
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=User.orm.js.map