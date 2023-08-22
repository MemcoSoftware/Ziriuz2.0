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
    // Controller Instance to execute a method
    const controller = new UsersController_1.UserController();
    let user = {
        number: 3,
        username: "jaime.ruiz ",
        name: "Jaime Ruiz",
        cedula: 1010101010,
        telefono: "3112121212",
        email: "ceo@memcosas.com",
        more_info: "CEO OF MEMCO SAS"
    };
    // Get Response
    const response = yield controller.createUser(user);
    // Send to the client the response
    return res.send(response);
}))
    .put((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    // Obtein a Query Param (ID)
    let id = (_c = req === null || req === void 0 ? void 0 : req.query) === null || _c === void 0 ? void 0 : _c.id;
    (0, logger_1.LogInfo)(`Query Param: ${id}`);
    // Controller Instance to execute a method
    const controller = new UsersController_1.UserController();
    let user = {
        number: 3,
        username: "jaime.ruiz ",
        name: "Jaime Ruiz",
        cedula: 1010101010,
        telefono: "3112121212",
        email: "email@email.com",
        more_info: "CEO OF MEMCO SAS"
    };
    // Get Response
    const response = yield controller.updateUser(id, user);
    // Send to the user response
    return res.send(response);
}));
// Export usersRouter
exports.default = usersRouter;
//# sourceMappingURL=UserRouter.js.map