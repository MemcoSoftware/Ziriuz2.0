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
const ClassDeviceController_1 = require("../controller/ClassDeviceController");
const verifyToken_middleware_1 = require("../../equipos/middlewares/verifyToken.middleware");
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("../../../utils/logger");
const jsonParser = body_parser_1.default.json();
let classDeviceRouter = express_1.default.Router();
classDeviceRouter.route('/')
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const controller = new ClassDeviceController_1.ClassDeviceController();
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    let page = ((_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.page) || 1;
    let limit = ((_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.limit) || 9;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    const response = yield controller.getClasesEquipos(page, limit, id);
    return res.status(200).send(response);
}))
    .post(verifyToken_middleware_1.verifyToken, jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const claseEquipoData = req.body;
    const controller = new ClassDeviceController_1.ClassDeviceController();
    const response = yield controller.createClaseEquipo(claseEquipoData);
    if (response.success) {
        return res.status(201).send(response);
    }
    else {
        return res.status(500).send(response);
    }
}))
    .put(verifyToken_middleware_1.verifyToken, jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const id = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.id;
    const claseEquipo = req.body;
    const controller = new ClassDeviceController_1.ClassDeviceController();
    const response = yield controller.updateClaseEquipo(id, claseEquipo);
    if (response.success) {
        return res.status(200).send(response);
    }
    else {
        return res.status(500).send(response);
    }
}))
    .delete(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    const id = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.id;
    const controller = new ClassDeviceController_1.ClassDeviceController();
    const response = yield controller.deleteClaseEquipo(id);
    return res.status(200).send(response);
}));
exports.default = classDeviceRouter;
//# sourceMappingURL=ClassDeviceRouter.js.map