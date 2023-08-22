"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userEntity = () => {
    let userSchema = new mongoose_1.default.Schema({
        number: { type: Number, required: true },
        username: { type: String, required: true },
        password: { type: String, required: true },
        name: { type: String, required: true },
        cedula: { type: Number, required: true },
        telefono: { type: String, required: true },
        email: { type: String, required: true },
        more_info: { type: String, required: true },
    }, { versionKey: false } // Deshabilitar la función versionKey
    );
    return mongoose_1.default.models.Users || mongoose_1.default.model('Users', userSchema);
};
exports.userEntity = userEntity;
// TODO: 
// - Get User By ID
// - Get User By EMAIL
// - Delete User By ID
// - Create New User
// - Update User by ID
//# sourceMappingURL=User.entity.js.map