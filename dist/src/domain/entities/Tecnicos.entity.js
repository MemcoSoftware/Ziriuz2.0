"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tecnicoEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const tecnicoEntity = () => {
    let tecnicoSchema = new mongoose_1.default.Schema({
        user_id: { type: String, required: true },
        tipo: { type: [], required: false },
        titulo: { type: String, required: true },
        reg_invima: { type: String, required: false },
        tarjeta_profesional: { type: String, required: false },
    }, { versionKey: false } // Deshabilitar la función versionKey
    );
    return mongoose_1.default.models.Tecnicos || mongoose_1.default.model('Tecnicos', tecnicoSchema);
};
exports.tecnicoEntity = tecnicoEntity;
//# sourceMappingURL=Tecnicos.entity.js.map