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
const SearchController_1 = __importDefault(require("../controller/SearchController"));
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
const body_parser_1 = __importDefault(require("body-parser"));
const searchRouter = express_1.default.Router();
let jsonParser = body_parser_1.default.json();
searchRouter.route('/')
    // POST: Realizar búsqueda
    .post(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { keyword } = req.body;
    // Lógica para buscar usuarios por palabra clave 'keyword'
    try {
        // Tu lógica de búsqueda aquí
        const results = yield SearchController_1.default.searchUsersByKeyword(keyword);
        res.status(200).json(results);
    }
    catch (error) {
        res.status(500).json({ error: 'Error en la búsqueda de usuarios.' });
    }
}));
// GET: Otras operaciones si es necesario
exports.default = searchRouter;
//# sourceMappingURL=SearchRouter.js.map