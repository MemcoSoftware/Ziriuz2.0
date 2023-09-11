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
const Auth_orm_1 = require("../domain/orm/Auth.orm");
const otpGenerator = __importStar(require("otp-generator"));
const User_entity_1 = require("../domain/entities/User.entity");
const emailService_1 = require("../utils/emailService");
const IOTPData_interface_1 = require("../domain/interfaces/IOTPData.interface");
const otpValidator_1 = require("../middlewares/otpValidator");
let AuthController = exports.AuthController = class AuthController {
    registerUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (user) {
                    (0, logger_1.LogSuccess)(`[/api/auth/register] Register New User: ${user.name}`);
                    // Asegúrate de que los roles se manejen correctamente
                    const roleNames = user.roles.map((role) => role.name) || ['user']; // Obtén los nombres de los roles
                    // Llama a registerUser para registrar al usuario y asignar roles
                    yield (0, User_orm_1.registerUser)(user, roleNames);
                    (0, logger_1.LogSuccess)(`[/api/auth/register] Registered User: ${user.username}`);
                    // Devuelve una respuesta exitosa sin la propiedad 'user'
                    return {
                        message: `User Registered successfully: ${user.name}`,
                    };
                }
                else {
                    (0, logger_1.LogWarning)(`[/api/auth/register] Register needs user Entity`);
                    return {
                        error: 'User not Registered',
                        message: 'Please, provide a User Entity to create.',
                    };
                }
            }
            catch (error) {
                const errorMessage = (error instanceof Error) ? error.message : 'An error occurred while registering the user.';
                (0, logger_1.LogError)(`[/api/auth/register] Error registering user: ${error}`);
                return {
                    error: 'Error registering user',
                    message: errorMessage
                };
            }
        });
    }
    loginUser(auth) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!auth || !auth.username || !auth.password) {
                    (0, logger_1.LogWarning)(`[/api/auth/login] Login needs username and password`);
                    return {
                        error: '[AUTH ERROR]: Username and Password are Required',
                        message: "Please, provide an username and password"
                    };
                }
                (0, logger_1.LogSuccess)(`[/api/auth/login] User Login Attempt: ${auth.username}`);
                const data = yield (0, User_orm_1.loginUser)(auth);
                if (!data || !data.user) {
                    (0, logger_1.LogError)(`[/api/auth/login] User not found or Invalid Password`);
                    return {
                        error: '[AUTH ERROR]: Invalid Username or Password',
                        message: "Invalid Username or Password"
                    };
                }
                (0, logger_1.LogSuccess)(`[/api/auth/login] User Logged In: ${auth.username}`);
                return {
                    token: data.token,
                    message: `Welcome, ${data.user.name}`
                };
            }
            catch (error) {
                const errorMessage = (error instanceof Error) ? error.message : 'An error occurred while logging in';
                (0, logger_1.LogError)(`[/api/auth/login] Error logging in: ${errorMessage}`);
                return {
                    error: '[AUTH ERROR]: An error occurred while logging in',
                    message: errorMessage
                };
            }
        });
    }
    logoutUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = '';
            // TODO: Close session of user
            throw new Error("Method not implemented.");
        });
    }
    /**
     * Forgot Password Method
    */
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
                const otp = otpGenerator.generate(6, {
                    digits: true,
                    upperCaseAlphabets: false,
                    lowerCaseAlphabets: false,
                    specialChars: false,
                });
                // Almacenar el código OTP en el objeto temporal junto con la hora de generación
                IOTPData_interface_1.otpMap[email] = {
                    otp: otp,
                    generationTime: new Date(),
                };
                console.log("OTP generado y almacenado:", otp); // Agregamos este mensaje
                // Enviar el OTP al correo electrónico del usuario
                const emailSubject = '<no-reply> Recuperación de Contraseña';
                const emailHtml = `
        <html>
              <head>
                <style>
                  /* Define tus estilos CSS aquí */
                  .box {
                    position: relative;
                    width: 380px;
                    height: 420px;
                    background: #1c1c1c;
                    border-radius: 8px;
                    overflow: hidden;
                  }
                  h1 {
                    color: #333333;
                  }
                  p {
                    color: #555555;
                  }

                  .form {
                    position: absolute;
                    inset: 2px;
                    border-radius: 8px;
                    background: #28292d;
                    z-index: 10;
                    padding: 50px 40px;
                    display: flex;
                    flex-direction:  column;    
                }
                .form {
                      color:#00ddfa;
                      font-weight: 500;
                      text-align: center;
                      letter-spacing: 0.1em;
                  }
                
                .inputBox {
                  position: relative;
                  width: 300px;
                  margin-top: 35px;
              
              }


                </style>
              </head>
              <body>
                <div class="box">
                  <div class="form">
                    <div class="inputBox">
                      <h1>Recuperación de Contraseña</h1>
                      <p>Su código de recuperación de contraseña es: ${otp}</p>
                    <div>
                </div>
              </body>
        </html>
        
        
        
        
        
        `;
                yield (0, emailService_1.sendEmail)(user.email, emailSubject, emailHtml);
                return { status: 200, message: 'Se ha enviado un correo con el código de recuperación' };
            }
            catch (error) {
                console.error(error);
                return { status: 500, message: 'Error al generar el código de recuperación' };
            }
        });
    }
    validateOTP(body) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, otp } = body;
                // EMAIL & OTP
                const otpData = IOTPData_interface_1.otpMap[email];
                if (!otpData) {
                    return { status: 400, message: 'Código OTP no encontrado' };
                }
                const expirationMinutes = 15;
                const currentTime = new Date();
                const timeDifference = currentTime.getTime() - otpData.generationTime.getTime();
                const timeDifferenceInMinutes = timeDifference / (1000 * 60); // CONVERS TO MINUTE
                if (timeDifferenceInMinutes > expirationMinutes) {
                    return { status: 400, message: 'Código OTP ha expirado' };
                }
                if (otpData.otp !== otp) {
                    return { status: 400, message: 'Código OTP incorrecto' };
                }
                return { status: 200, message: 'Código OTP válido' };
            }
            catch (error) {
                console.error(error);
                return { status: 500, message: 'Error al validar el código OTP' };
            }
        });
    }
    updatePassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, newPassword } = body;
            // Utiliza la función de Auth.orm para actualizar la contraseña
            const response = yield (0, Auth_orm_1.updatePassword)(email, newPassword);
            return response;
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
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, tsoa_1.Post)("/login"),
    __param(0, (0, tsoa_1.Body)()),
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
    (0, tsoa_1.Post)("/forgot-password"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "generateAndSendOTP", null);
__decorate([
    (0, tsoa_1.Post)("/otp-validator"),
    (0, tsoa_1.Middlewares)([otpValidator_1.otpValidatorMiddleware]),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "validateOTP", null);
__decorate([
    (0, tsoa_1.Put)("/update-password"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, tsoa_1.Get)("/me"),
    __param(0, (0, tsoa_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "userData", null);
exports.AuthController = AuthController = __decorate([
    (0, tsoa_1.Route)("/api/auth"),
    (0, tsoa_1.Tags)("AuthController")
], AuthController);
//# sourceMappingURL=AuthController.js.map