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
exports.camposEntity = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const camposEntity = () => {
    const camposSchema = new mongoose_1.default.Schema({
        id_tipo: {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "Campos_Tipos",
            required: true,
        },
        title: { type: String, required: true },
        valor: { type: Number, required: true },
    }, { versionKey: false, toJSON: { virtuals: true } });
    // Define la relación virtual si es necesaria
    camposSchema.virtual("tipoCampo", {
        ref: "Campos_Tipos",
        localField: "id_tipo",
        foreignField: "_id",
    });
    return (mongoose_1.default.models.Campos ||
        mongoose_1.default.model("Campos", camposSchema));
};
exports.camposEntity = camposEntity;
//# sourceMappingURL=Campos.entity.js.map