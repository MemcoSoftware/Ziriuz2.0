"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.areaEquipoEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const areaEquipoEntity = () => {
    const areaEquipoSchema = new mongoose_1.default.Schema({
        area: { type: String, required: true },
    }, { versionKey: false } // Disable the versionKey function
    );
    return mongoose_1.default.models.Areas_Equipos || mongoose_1.default.model("Areas_Equipos", areaEquipoSchema);
};
exports.areaEquipoEntity = areaEquipoEntity;
//# sourceMappingURL=AreaEquipo.entity.js.map