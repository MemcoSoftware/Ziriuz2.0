"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const logger_1 = require("../utils/logger");
const User_orm_1 = require("../domain/orm/User.orm");
const otpGenerator = __importStar(require("otp-generator"));
const User_entity_1 = require("../domain/entities/User.entity");
const emailService_1 = require("../utils/emailService");
let AuthController = exports.AuthController = class AuthController {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (user) {
                (0, logger_1.LogSuccess)(`[/api/auth/register] Register New User: ${user.name}`);
                yield (0, User_orm_1.registerUser)(user).then((r) => {
                    (0, logger_1.LogSuccess)(`[/api/auth/register] Registered User: ${user.username}`);
                    response = {
                        message: `User Registered successfully: ${user.name}`
                    };
                });
            }
            else {
                (0, logger_1.LogWarning)(`[/api/auth/register] Register needs user Entity`);
                response = {
                    message: 'User not Registered: Please, provide an User Entity to create.'
                };
            }
            return response;
        });
    }
    loginUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            let response;
            if (auth) {
                (0, logger_1.LogSuccess)(`[/api/auth/login] User Logged In: ${auth.username}`);
                let data = yield (0, User_orm_1.loginUser)(auth);
                response = {
                    token: data.token,
                    message: `Welcome, ${data.user.name}`
                };
            }
            else {
                (0, logger_1.LogWarning)(`[/api/auth/login] Login needs username and password`);
                response = {
                    error: '[AUTH ERROR]: Username and Password are Required',
                    message: "Please, provide an username and password"
                };
            }
            return response;
        });
    }
    logoutUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            // TODO: Close session of user
            throw new Error("Method not implemented.");
        });
    }
    generateAndSendOTP(email) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Buscar el usuario en la base de datos por su dirección de correo electrónico
                const userModel = (0, User_entity_1.userEntity)();
                const user = yield userModel.findOne({ email });
                if (!user) {
                    return { status: 404, message: 'Usuario no encontrado' };
                }
                // Generar un OTP
                const otp = otpGenerator.generate(6, { digits: true, specialChars: false });
                // Enviar el OTP al correo electrónico del usuario
                const emailSubject = 'Recuperación de Contraseña';
                const emailText = `Su código de recuperación de contraseña es: ${otp}`;
                yield (0, emailService_1.sendEmail)(user.email, emailSubject, emailText);
                return { status: 200, message: 'Se ha enviado un correo con el código de recuperación' };
            }
            catch (error) {
                console.error(error);
                return { status: 500, message: 'Error al generar el código de recuperación' };
            }
        });
    }
    /**
     * Endpoint to retreive the USers in the "Users" Collection from DB
     * Middleware: Validate JWT
     * In Headers the x-access-token must be added with a valid JWT
     * @param {string} id Id of user to retreive (optional)
     * @returns All users or user found by ID
    */
    userData(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            if (id) {
                (0, logger_1.LogSuccess)(`[/api/users] Get User Data By ID: ${id}`);
                response = yield (0, User_orm_1.getUserByID)(id);
            }
            return response;
        });
    }
};
__decorate([
    (0, tsoa_1.Post)("/register"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, tsoa_1.Post)("/logout"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "logoutUser", null);
__decorate([
    (0, tsoa_1.Post)("/forgot-password")
    /**
     * Forgot Password Method
    */
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateAndSendOTP", null);
__decorate([
    (0, tsoa_1.Get)("/me"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userData", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/apli/auth"),
    (0, tsoa_1.Tags)("AuthController")
], AuthController);
//# sourceMappingURL=AuthController.js.map