"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controller/UsersController");
const logger_1 = require("../utils/logger");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
let searchRouter = express_1.default.Router();
// Ruta para buscar usuarios por palabra clave
searchRouter.get('/search', verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.query;
    if (typeof keyword !== 'string') {
        // Manejar el caso en el que keyword no sea una cadena
        return res.status(400).json({ error: 'El parámetro keyword es inválido.' });
    }
    try {
        (0, logger_1.LogInfo)(`Search for users with keyword: ${keyword}`);
        const controller = new UsersController_1.UserController();
        const users = yield controller.searchUsersByKeyword(keyword);
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error en la búsqueda de usuarios.' });
    }
}));
exports.default = searchRouter;
//# sourceMappingURL=SearchRouter.js.map