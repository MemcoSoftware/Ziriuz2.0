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
// Router from Express
let usersRouter = express_1.default.Router();
//http://localhost:8000/api/users?id=64e16f5e7b636b0679ca720c
usersRouter.route('/')
    // GET:
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Obtein a Query Param (ID)
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to execute a method
    const controller = new UsersController_1.UserController();
    // Get Response
    const response = yield controller.getUsers(id);
    // Send to the client the response
    return res.send(response);
}))
    // DELETE: 
    .delete((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    // Obtein a Query Param (ID)
    let id = (_b = req === null || req === void 0 ? void 0 : req.query) === null || _b === void 0 ? void 0 : _b.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to execute a method
    const controller = new UsersController_1.UserController();
    // Get Response
    const response = yield controller.deleteUser(id);
    // Send to the client the response
    return res.send(response);
}))
    .post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d, _e, _f, _g, _h, _j, _k;
    // Obtein a Query Param (ID)
    let id = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    let number = (_d = req === null || req === void 0 ? void 0 : req.query) === null || _d === void 0 ? void 0 : _d.number;
    let username = (_e = req === null || req === void 0 ? void 0 : req.query) === null || _e === void 0 ? void 0 : _e.username;
    let name = (_f = req === null || req === void 0 ? void 0 : req.query) === null || _f === void 0 ? void 0 : _f.name;
    let cedula = (_g = req === null || req === void 0 ? void 0 : req.query) === null || _g === void 0 ? void 0 : _g.cedula;
    let telefono = (_h = req === null || req === void 0 ? void 0 : req.query) === null || _h === void 0 ? void 0 : _h.telefono;
    let email = (_j = req === null || req === void 0 ? void 0 : req.query) === null || _j === void 0 ? void 0 : _j.email;
    let more_info = (_k = req === null || req === void 0 ? void 0 : req.query) === null || _k === void 0 ? void 0 : _k.more_info;
    let user = {
        number: number,
        username: username,
        name: name,
        cedula: cedula,
        telefono: telefono,
        email: email,
        more_info: more_info
    };
    // Controller Instance to execute a method
    const controller = new UsersController_1.UserController();
    // Get Response
    const response = yield controller.createUser(user);
    // Send to the client the response
    return res.send(response);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _l, _m, _o, _p, _q, _r, _s, _t;
    // Obtein a Query Param (ID)
    let id = (_l = req === null || req === void 0 ? void 0 : req.query) === null || _l === void 0 ? void 0 : _l.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    let number = (_m = req === null || req === void 0 ? void 0 : req.query) === null || _m === void 0 ? void 0 : _m.number;
    let username = (_o = req === null || req === void 0 ? void 0 : req.query) === null || _o === void 0 ? void 0 : _o.username;
    let name = (_p = req === null || req === void 0 ? void 0 : req.query) === null || _p === void 0 ? void 0 : _p.name;
    let cedula = (_q = req === null || req === void 0 ? void 0 : req.query) === null || _q === void 0 ? void 0 : _q.cedula;
    let telefono = (_r = req === null || req === void 0 ? void 0 : req.query) === null || _r === void 0 ? void 0 : _r.telefono;
    let email = (_s = req === null || req === void 0 ? void 0 : req.query) === null || _s === void 0 ? void 0 : _s.email;
    let more_info = (_t = req === null || req === void 0 ? void 0 : req.query) === null || _t === void 0 ? void 0 : _t.more_info;
    // Controller Instance to execute a method
    const controller = new UsersController_1.UserController();
    let user = {
        number: number,
        username: username,
        name: name,
        cedula: cedula,
        telefono: telefono,
        email: email,
        more_info: more_info
    };
    // Get Response
    const response = yield controller.updateUser(id, user);
    // Send to the user response
    return res.send(response);
}));
// Export usersRouter
exports.default = usersRouter;
//# sourceMappingURL=UserRouter.js.map