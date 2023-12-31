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
exports.modeloEquipoEntity = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const modeloEquipoEntity = () => {
    const modeloEquipoSchema = new mongoose_1.default.Schema({
        modelo: {
            type: String,
            required: true
        },
        precio: { type: Number, required: true },
        id_marca: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Marcas_Equipos",
            required: false,
        },
        id_clase: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Clases_Equipos",
            required: false,
        },
    }, { versionKey: false });
    modeloEquipoSchema.virtual("marcaEquipo", {
        ref: "Marcas_Equipos",
        localField: "id_marca",
        foreignField: "_id",
    });
    modeloEquipoSchema.virtual("claseEquipo", {
        ref: "Clases_Equipos",
        localField: "id_clase",
        foreignField: "_id",
    });
    return mongoose_1.default.models.Modelo_Equipos || mongoose_1.default.model("Modelo_Equipos", modeloEquipoSchema);
};
exports.modeloEquipoEntity = modeloEquipoEntity;
//# sourceMappingURL=ModeloEquipo.entity.js.map