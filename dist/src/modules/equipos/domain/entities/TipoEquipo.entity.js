"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipoEquipoEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tipoEquipoEntity = () => {
    const tipoEquipoSchema = new mongoose_1.default.Schema({
        tipo: { type: String, required: true },
    }, { versionKey: false } // Disable the versionKey function
    );
    return mongoose_1.default.models.Tipos_Equipos || mongoose_1.default.model("Tipos_Equipos", tipoEquipoSchema);
};
exports.tipoEquipoEntity = tipoEquipoEntity;
//# sourceMappingURL=TipoEquipo.entity.js.map