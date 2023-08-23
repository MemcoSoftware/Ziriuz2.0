"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// Dotenv Configuration to read variables environment
dotenv_1.default.config();
const secret = process.env.SECRETKEY || 'MYSECRETKEY';
/***
 * @param { Request } req  Original request previous middleware of verification JWT
 * @param { Response }res Response to verification of JWT
 * @param { NextFunction } next Next function to be executed
 * @returns Errors of verification of next execution
 */
const verifyToken = (req, res, next) => {
    // Check HEADER from Request for 'x-access-token'
    let token = req.headers['x-access-token'];
    // Verify if jwt is present
    if (!token) {
        return res.status(403).send({
            authenticationError: 'Missing JWT',
            message: ' Not authorized to consume this endpoint'
        });
    }
    // Verify the token obtained
    jsonwebtoken_1.default.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(500).send({
                authenticationError: ' JWT Veriication failed',
                message: ' Failed to verify JWT token in request'
            });
        }
        // Execute Next Function -> Protected Routes will be executed
        next();
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.middleware.js.map