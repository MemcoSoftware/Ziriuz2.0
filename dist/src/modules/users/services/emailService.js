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
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
// Configuración del servicio de envío de correos
const transporter = nodemailer_1.default.createTransport({
    // host: 'smtp.gmail.com',
    // port: 465,
    // secure: true, // true for 465, false for other ports
    service: 'gmail',
    auth: {
        user: 'ziriuzemail@gmail.com',
        pass: 'lqrhxrmterexeprh' // User email password
    }
});
// Función para enviar correos electrónicos
const sendEmail = (to, subject, html) => __awaiter(void 0, void 0, void 0, function* () {
    const mailOptions = {
        from: 'ziriuzemail@gmail.com',
        to,
        subject,
        html
    };
    try {
        yield transporter.sendMail(mailOptions);
        console.log(`
    
    
    
    `);
    }
    catch (error) {
        console.error(`Error al enviar el correo electrónico: ${error}`);
        throw new Error(`Error al enviar el correo electrónico: ${error}`);
    }
});
exports.sendEmail = sendEmail;
//# sourceMappingURL=emailService.js.map