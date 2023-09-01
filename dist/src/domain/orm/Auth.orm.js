"use strict";
/**
 * ORM to connect to Auth Collection
 */
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
exports.updatePassword = exports.findUserByEmail = void 0;
const User_entity_1 = require("../entities/User.entity");
// import { sendEmail } from './path/to/emailService'; 
// Environment variables
const dotenv_1 = __importDefault(require("dotenv"));
// BCRYPT For Passwords
const bcrypt_1 = __importDefault(require("bcrypt"));
// Environment variables Configuration
dotenv_1.default.config();
// Obtein Secret key to generate JWT
const findUserByEmail = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userModel = (0, User_entity_1.userEntity)();
        const user = yield userModel.findOne({ email });
        return user;
    }
    catch (error) {
        console.error(`[Auth ORM]: Error al buscar usuario por correo en la base de datos: ${error}`);
        throw new Error(`[Auth ORM]: Error al buscar usuario por correo en la base de datos: ${error}`);
    }
});
exports.findUserByEmail = findUserByEmail;
const updatePassword = (email, newPassword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const UserModel = (0, User_entity_1.userEntity)();
        const user = yield UserModel.findOne({ email });
        if (!user) {
            return { status: 404, message: 'Usuario no encontrado' };
        }
        // Verifica y castea el tipo del usuario al tipo IUser
        if ('password' in user) {
            const hashedPassword = yield bcrypt_1.default.hash(newPassword, 10);
            user.password = hashedPassword;
            yield user.save();
            return { status: 200, message: 'Contraseña actualizada exitosamente' };
        }
        else {
            return { status: 500, message: 'Error al actualizar la contraseña' };
        }
    }
    catch (error) {
        console.error(error);
        return { status: 500, message: 'Error al actualizar la contraseña' };
    }
});
exports.updatePassword = updatePassword;
//# sourceMappingURL=Auth.orm.js.map