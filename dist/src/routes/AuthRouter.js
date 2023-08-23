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
const AuthController_1 = require("../controller/AuthController");
// BCRYPT for passwords
const bcrypt_1 = __importDefault(require("bcrypt"));
// MiddleWare 
const verifyToken_middleware_1 = require("../middlewares/verifyToken.middleware");
// Body Parser (READ JSON from Body in Requests)
const body_parser_1 = __importDefault(require("body-parser"));
// Middleware to read JSON in Body
let jsonParser = body_parser_1.default.json();
// Router from Express
let authRouter = express_1.default.Router();
authRouter.route('/register')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { number, username, password, name, cedula, telefono, email, more_info } = req === null || req === void 0 ? void 0 : req.body;
    let hashedPassword = '';
    if (number && username && password && name && cedula && telefono && email && more_info) {
        // Obtain Password in Request and cypher
        let hashedPassword = bcrypt_1.default.hashSync(password, 8);
        let newUser = {
            number: number,
            username: username,
            password: hashedPassword,
            name: name,
            cedula: cedula,
            telefono: telefono,
            email: email,
            more_info: more_info
        };
        // Controller Instance to execute a method
        const controller = new AuthController_1.AuthController();
        // Get Response
        const response = yield controller.registerUser(newUser);
        // Send to the client the response
        return res.status(200).send(response);
    }
    else {
        // Send to the client the response
        return res.status(400).send({
            message: ' [Error User Data Missing] User cannot be registered'
        });
    }
}));
authRouter.route('/login')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { username, password } = req.body;
    if (username && password) {
        // Controller Instance to execute a method
        const controller = new AuthController_1.AuthController();
        // TODO use IAuth
        let auth = {
            username: username,
            password: password
        };
        // Get Response
        const response = yield controller.loginUser(auth);
        // Send to the client the response whicho includes the JWT
        return res.status(200).send(response);
    }
    else {
        // Send to the client the response
        return res.status(400).send({
            message: ' [Error User Data Missing] User cannot be logged in'
        });
    }
}));
// Route protected by VERIFY TOKEN Middleware
authRouter.route('/me')
    .get(verifyToken_middleware_1.verifyToken, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    //Obtain User ID to check its data             
    let id = (_a = req === null || req === void 0 ? void 0 : req.query) === null || _a === void 0 ? void 0 : _a.id;
    if (id) {
        // Controller: Auth Controller
        const controller = new AuthController_1.AuthController();
        // Get Response from Controller
        let response = yield controller.userData(id);
        // If user is authorized
        return res.status(200).send(response);
    }
    else {
        return res.status(401).send({
            message: 'You are not authorized to perform this action'
        });
    }
}));
exports.default = authRouter;
//# sourceMappingURL=AuthRouter.js.map