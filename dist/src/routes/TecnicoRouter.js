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
const TecnicosController_1 = require("../controller/TecnicosController");
const logger_1 = require("../utils/logger");
// Body Parser to Read  BODY from requests
const body_parser_1 = __importDefault(require("body-parser"));
// JWT Verifier Middleware
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
let jsonParser = body_parser_1.default.json();
// Router from Express
let tecnicosRouter = express_1.default.Router();
//http://localhost:8000/api/users?id=64e16f5e7b636b0679ca720c
tecnicosRouter.route('/')
    // GET:
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Obtein a Query Param (ID)
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    // Pagination
    let page = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
    let limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) || 9;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to execute a method
    const controller = new TecnicosController_1.TecnicosController();
    // Get Response
    const response = yield controller.getTecnico(page, limit, id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    // DELETE: 
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // Obtein a Query Param (ID)
    let id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to execute a method
    const controller = new TecnicosController_1.TecnicosController();
    // Get Response
    const response = yield controller.deleteTecnico(id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    // UPDATE
    .put(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e, _f, _g, _h, _j, _k;
    // Obtein a Query Param (ID)
    let id = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.id;
    // Read from BODY 
    let user_id = (_f = req === null || req === void 0 ? void 0 : req.body) === null || _f === void 0 ? void 0 : _f.user_id;
    let tipo = ((_g = req === null || req === void 0 ? void 0 : req.body) === null || _g === void 0 ? void 0 : _g.tipo) || [];
    let titulo = ((_h = req === null || req === void 0 ? void 0 : req.body) === null || _h === void 0 ? void 0 : _h.titulo) || 'N/A';
    let reg_invima = ((_j = req === null || req === void 0 ? void 0 : req.body) === null || _j === void 0 ? void 0 : _j.reg_invima) || 'N/A';
    let tarjeta_profesional = ((_k = req === null || req === void 0 ? void 0 : req.body) === null || _k === void 0 ? void 0 : _k.tarjeta_profesional) || 'N/A';
    if (user_id && tipo && titulo && reg_invima && tarjeta_profesional) {
        // Controller Instance to execute a method
        const controller = new TecnicosController_1.TecnicosController();
        let tecnico = {
            user_id: user_id,
            tipo: tipo,
            titulo: titulo,
            reg_invima: reg_invima,
            tarjeta_profesional: tarjeta_profesional
        };
        // Get Response
        const response = yield controller.updateTecnico(id, tecnico);
        // Send to the user response
        return res.status(200).send(response);
    }
    else {
        return res.status(400).send({
            message: '[ERROR] Updating Tecnico. You need to send all attrs of tecnico to update it'
        });
    }
}))
    .post(jsonParser, verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Read from BODY 
    var _l, _m, _o, _p, _q;
    let user_id = (_l = req === null || req === void 0 ? void 0 : req.body) === null || _l === void 0 ? void 0 : _l.user_id;
    let tipo = ((_m = req === null || req === void 0 ? void 0 : req.body) === null || _m === void 0 ? void 0 : _m.tipo) || [];
    let titulo = ((_o = req === null || req === void 0 ? void 0 : req.body) === null || _o === void 0 ? void 0 : _o.titulo) || 'N/A';
    let reg_invima = ((_p = req === null || req === void 0 ? void 0 : req.body) === null || _p === void 0 ? void 0 : _p.reg_invima) || 'N/A';
    let tarjeta_profesional = ((_q = req === null || req === void 0 ? void 0 : req.body) === null || _q === void 0 ? void 0 : _q.tarjeta_profesional) || 'N/A';
    if (user_id && tipo && titulo && reg_invima && tarjeta_profesional) {
        // Controller Instance to execute a method
        const controller = new TecnicosController_1.TecnicosController();
        let tecnico = {
            user_id: user_id,
            tipo: tipo,
            titulo: titulo,
            reg_invima: reg_invima,
            tarjeta_profesional: tarjeta_profesional
        };
        // Get Response
        const response = yield controller.createTecnico(tecnico);
        // Send to the user response
        return res.status(200).send(response);
    }
    else {
        return res.status(400).send({
            message: '[ERROR] Creating Tecnico. You need to send all attrs of Tecnico to update it'
        });
    }
}));
// Export usersRouter
exports.default = tecnicosRouter;
/**
 * Get / Read Documents => 200 OK
 * Post / Create Document => 201 OK
 * Delete Document => 200 (Entity) / 204 (No return)
 * Put / Update Documents => 200 (Entity) / 204 (No Return)
 *
 */ 
//# sourceMappingURL=TecnicoRouter.js.map