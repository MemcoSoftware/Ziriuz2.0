"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.otpValidatorMiddleware = void 0;
const IOTPData_interface_1 = require("../domain/interfaces/IOTPData.interface");
const otpValidatorMiddleware = (req, res, next) => {
    const { email, otp } = req.body;
    const otpData = IOTPData_interface_1.otpMap[email];
    if (!otpData) {
        console.log("Código OTP no encontrado");
        return res.status(400).json({ message: 'Código OTP no encontrado' });
    }
    const expirationMinutes = 15;
    const currentTime = new Date();
    const timeDifference = currentTime.getTime() - otpData.generationTime.getTime();
    const timeDifferenceInMinutes = timeDifference / (1000 * 60); // converts to min
    if (timeDifferenceInMinutes > expirationMinutes) {
        console.log("Código OTP ha expirado");
        return res.status(400).json({ message: 'Código OTP ha expirado' });
    }
    console.log("otpData.otp:", otpData.otp);
    console.log("otp:", otp);
    if (otpData.otp !== otp) {
        console.log("Código OTP incorrecto");
        return res.status(400).json({ message: 'Código OTP incorrecto' });
    }
    // Si todo está bien, llama a next para continuar con el flujo de Express
    next();
};
exports.otpValidatorMiddleware = otpValidatorMiddleware;
//# sourceMappingURL=otpValidator.js.map