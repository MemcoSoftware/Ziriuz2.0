"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.marcaEquipoEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const marcaEquipoEntity = () => {
    const marcaEquipoSchema = new mongoose_1.default.Schema({
        marca: { type: String, required: true },
    }, { versionKey: false });
    return mongoose_1.default.models.Marcas_Equipos || mongoose_1.default.model("Marcas_Equipos", marcaEquipoSchema);
};
exports.marcaEquipoEntity = marcaEquipoEntity;
//# sourceMappingURL=MarcasEquipos.entity.js.map