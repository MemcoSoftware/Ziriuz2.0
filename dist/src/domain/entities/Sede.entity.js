"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sedeEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const sedeEntity = () => {
    let sedeSchema = new mongoose_1.default.Schema({
        nombre_sede: { type: String, required: true },
        address_sede: { type: String, required: true },
        sede_telefono: { type: String, required: true },
        sede_email: { type: String, required: true },
        more_info: { type: String, required: true },
    }, { versionKey: false });
    return mongoose_1.default.models.Sedes || mongoose_1.default.model('Sedes', sedeSchema);
};
exports.sedeEntity = sedeEntity;
//# sourceMappingURL=Sede.entity.js.map