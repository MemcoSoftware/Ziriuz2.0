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
const logger_1 = require("../../../utils/logger");
// Body Parser to Read BODY from requests
const body_parser_1 = __importDefault(require("body-parser"));
// JWT Verifier Middleware
const Campos_TiposController_1 = require("../controller/Campos_TiposController");
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
let jsonParser = body_parser_1.default.json();
// Router from Express
let camposTiposRouter = express_1.default.Router();
camposTiposRouter.route('/')
    // GET:
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    // Obtain a Query Param (ID)
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    // Pagination
    let page = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
    let limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) || 9;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to execute a method
    const controller = new Campos_TiposController_1.Campos_TiposController();
    // Get Response
    const response = yield controller.getCamposTipos(page, limit, id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    // DELETE:
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    // Obtain a Query Param (ID)
    let id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to execute a method
    const controller = new Campos_TiposController_1.Campos_TiposController();
    // Get Response
    const response = yield controller.deleteCamposTipos(id);
    // Send to the client the response
    return res.status(200).send(response);
}))
    // UPDATE
    .put(verifyToken_middleware_1.verifyToken, jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const id = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.id;
    const camposTiposData = req.body; // Obtain the camposTipos data from the body
    // Controller Instance to execute a method
    const controller = new Campos_TiposController_1.Campos_TiposController();
    const response = yield controller.updateCamposTipos(id, camposTiposData);
    if (response.success) {
        return res.status(200).send(response);
    }
    else {
        return res.status(500).send(response);
    }
}))
    .post(verifyToken_middleware_1.verifyToken, jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const camposTiposData = req.body;
    // Controller Instance to execute a method
    const controller = new Campos_TiposController_1.Campos_TiposController();
    const response = yield controller.createCamposTipos(camposTiposData);
    if (response.success) {
        return res.status(201).send(response); // Código 201 para indicar la creación exitosa
    }
    else {
        return res.status(500).send(response);
    }
}));
// Export camposTiposRouter
exports.default = camposTiposRouter;
//# sourceMappingURL=CamposTiposRouter.js.map