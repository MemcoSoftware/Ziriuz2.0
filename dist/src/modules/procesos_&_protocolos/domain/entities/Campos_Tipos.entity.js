"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.camposTiposEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const camposTiposEntity = () => {
    const camposTiposSchema = new mongoose_1.default.Schema({
        tipo: { type: String, required: true },
        nombre: { type: String, required: true },
    }, { versionKey: false });
    return (mongoose_1.default.models.Campos_Tipos ||
        mongoose_1.default.model("Campos_Tipos", camposTiposSchema));
};
exports.camposTiposEntity = camposTiposEntity;
//# sourceMappingURL=Campos_Tipos.entity.js.map