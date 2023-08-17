"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userEntity = () => {
    let userSchema = new mongoose_1.default.Schema({
        username: String,
        name: String,
        cedula: Number,
        telefono: String,
        email: String,
        more_info: String
    });
    return mongoose_1.default.model('Users', userSchema);
};
exports.userEntity = userEntity;
// TODO: 
// - Get User By ID
// - Get User By EMAIL
// - Delete User By ID
// - Create New User
// - Update User by ID
//# sourceMappingURL=User.entityt.js.map