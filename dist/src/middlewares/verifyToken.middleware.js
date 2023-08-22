"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
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
    jsonwebtoken_1.default.verify(token, '', (err, decoded) => {
        if (err) {
            return res.status(500).send({
                authenticationError: ' JWT Veriication failed',
                message: ' Failed to verify JWT token in request'
            });
        }
        // Pass something to next request (id of user || other info)
        // Execute Next Function -> Protected Routes will be executed
    });
};
exports.verifyToken = verifyToken;
//# sourceMappingURL=verifyToken.middleware.js.map