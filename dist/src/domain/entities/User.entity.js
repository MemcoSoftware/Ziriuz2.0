"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userEntity = void 0;
const mongoose_1 = __importStar(require("mongoose"));
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
        // New spaces related to Collection Roles
        roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Roles" }],
        type: { type: String, required: false },
        titulo: { type: String, required: false },
        reg_invima: { type: String, required: false } // INVIMA Register
    }, { versionKey: false } // Disable the versionKey function
    );
    // Define a virtual populate field for user roles
    userSchema.virtual('userRoles', {
        ref: 'Roles',
        localField: 'roles',
        foreignField: '_id',
    });
    // Apply the virtual populate to the schema
    userSchema.set('toObject', { virtuals: true });
    userSchema.set('toJSON', { virtuals: true });
    return mongoose_1.default.models.Users || mongoose_1.default.model('Users', userSchema);
};
exports.userEntity = userEntity;
//# sourceMappingURL=User.entity.js.map