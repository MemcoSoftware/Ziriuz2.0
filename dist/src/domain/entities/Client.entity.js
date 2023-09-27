"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientEntity = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const clientEntity = () => {
    const clientSchema = new mongoose_1.default.Schema({
        client_name: { type: String, required: true },
        client_nit: { type: Number, required: true },
        client_address: { type: String, required: true },
        client_telefono: { type: String, required: true },
        client_email: { type: String, required: true },
    }, { versionKey: false } // Disable the versionKey function
    );
    return mongoose_1.default.models.Clients || mongoose_1.default.model('Clients', clientSchema);
};
exports.clientEntity = clientEntity;
//# sourceMappingURL=Client.entity.js.map