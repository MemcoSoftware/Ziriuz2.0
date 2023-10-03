"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modeloEquipoEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const modeloEquipoEntity = () => {
    let modeloEquipoSchema = new mongoose_1.default.Schema({
        modelo: { type: String, required: true },
        precio: { type: Number, required: true }
    }, { versionKey: false });
    return mongoose_1.default.models.Modelo_Equipos || mongoose_1.default.model("Modelo_Equipos", modeloEquipoSchema);
};
exports.modeloEquipoEntity = modeloEquipoEntity;
//# sourceMappingURL=ModeloEquipo.entity.js.map