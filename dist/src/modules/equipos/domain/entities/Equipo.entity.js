"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.equipoEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const equipoEntity = () => {
    let equipoSchema = new mongoose_1.default.Schema({
        serie: { type: String, required: true },
        ubicación: { type: String, required: true },
        frecuencia: { type: Number, required: true }
    }, { versionKey: false } // Disable the versionKey function
    );
    return mongoose_1.default.models.Equipos || mongoose_1.default.model("Equipos", equipoSchema);
};
exports.equipoEntity = equipoEntity;
//# sourceMappingURL=Equipo.entity.js.map