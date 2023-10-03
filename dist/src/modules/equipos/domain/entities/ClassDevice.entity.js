"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.classDeviceEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const classDeviceEntity = () => {
    const classDeviceSchema = new mongoose_1.default.Schema({
        clase: { type: String, required: true },
    }, { versionKey: false });
    return mongoose_1.default.models.Clases_Equipos || mongoose_1.default.model("Clases_Equipos", classDeviceSchema);
};
exports.classDeviceEntity = classDeviceEntity;
//# sourceMappingURL=ClassDevice.entity.js.map