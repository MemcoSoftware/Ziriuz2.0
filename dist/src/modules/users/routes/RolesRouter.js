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
const RolesController_1 = require("../controller/RolesController");
const jsonParser = express_1.default.json();
let rolesRouter = express_1.default.Router();
rolesRouter.route('/create-role')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (name) {
            const controller = new RolesController_1.RolesController();
            const response = yield controller.createRole(name);
            return res.status(200).send(response);
        }
        else {
            return res.status(400).send({
                message: '[Error Role Data Missing] Role cannot be created',
            });
        }
    }
    catch (error) {
        console.error('[RolesRouter]: Error creating role:', error);
        return res.status(500).send({
            message: 'Internal server error',
        });
    }
}));
exports.default = rolesRouter;
//# sourceMappingURL=RolesRouter.js.map