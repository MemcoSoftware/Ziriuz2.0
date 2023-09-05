"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlmacen = exports.isContabilidad = exports.isCoordinador = exports.isAnalista = exports.isComercial = exports.isTecnico = exports.isAdmin = exports.isUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRETKEY || 'MYSECRETKEY';
/**
 * Middleware para verificar si un usuario tiene el rol de usuario.
 */
const isUser = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "user")) {
        // Si el usuario tiene el rol de usuario, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de usuario, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de usuario para acceder a esta ruta.",
        });
    }
};
exports.isUser = isUser;
const isAdmin = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "administrador")) {
        // Si el usuario tiene el rol de administrador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de administrador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de administrador para acceder a esta ruta.",
        });
    }
};
exports.isAdmin = isAdmin;
const isTecnico = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "tecnico")) {
        // Si el usuario tiene el rol de administrador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de administrador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de tecnico para acceder a esta ruta.",
        });
    }
};
exports.isTecnico = isTecnico;
const isComercial = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "comercial")) {
        // Si el usuario tiene el rol de administrador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de administrador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de comercial para acceder a esta ruta.",
        });
    }
};
exports.isComercial = isComercial;
const isAnalista = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "analista")) {
        // Si el usuario tiene el rol de administrador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de administrador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de analista para acceder a esta ruta.",
        });
    }
};
exports.isAnalista = isAnalista;
const isCoordinador = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "coordinador")) {
        // Si el usuario tiene el rol de administrador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de administrador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de coordinador para acceder a esta ruta.",
        });
    }
};
exports.isCoordinador = isCoordinador;
const isContabilidad = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "contabilidad")) {
        // Si el usuario tiene el rol de administrador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de administrador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de contabilidad para acceder a esta ruta.",
        });
    }
};
exports.isContabilidad = isContabilidad;
const isAlmacen = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.some(role => role.name === "almacen")) {
        // Si el usuario tiene el rol de administrador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de administrador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de almacen para acceder a esta ruta.",
        });
    }
};
exports.isAlmacen = isAlmacen;
//# sourceMappingURL=authJwt.js.map