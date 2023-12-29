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
exports.preventivosEntity = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const preventivosEntity = () => {
    const preventivosSchema = new mongoose_1.default.Schema({
        title: { type: String, required: true },
        codigo: { type: String, required: true },
        version: { type: Number, required: true },
        fecha: { type: String, required: true },
        cualitativo: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Campos",
            },
        ],
        mantenimiento: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Campos",
            },
        ],
        cuantitativo: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Campos",
            },
        ],
        otros: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Campos",
            },
        ],
    }, { versionKey: false, toJSON: { virtuals: true } });
    // Define las relaciones virtuales si son necesarias
    preventivosSchema.virtual("camposCualitativos", {
        ref: "Campos",
        localField: "cualitativo",
        foreignField: "_id",
    });
    preventivosSchema.virtual("camposMantenimiento", {
        ref: "Campos",
        localField: "mantenimiento",
        foreignField: "_id",
    });
    preventivosSchema.virtual("camposCuantitativos", {
        ref: "Campos",
        localField: "cuantitativo",
        foreignField: "_id",
    });
    preventivosSchema.virtual("camposOtros", {
        ref: "Campos",
        localField: "otros",
        foreignField: "_id",
    });
    return (mongoose_1.default.models.Preventivos ||
        mongoose_1.default.model("Preventivos", preventivosSchema));
};
exports.preventivosEntity = preventivosEntity;
//# sourceMappingURL=Preventivos.entity.js.map