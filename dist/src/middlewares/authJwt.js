"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAlmacen = exports.isContabilidad = exports.isComercial = exports.isAnalista = exports.isCoordinador = exports.isTecnico = exports.isAdmin = exports.isUser = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const secret = process.env.SECRETKEY || 'MYSECRETKEY';
/**
 * Middleware para verificar si un usuario tiene el rol de administrador.
 */
const isUser = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("user")) {
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
exports.isUser = isUser;
const isAdmin = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("administrador")) {
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
/**
 * Middleware para verificar si un usuario tiene el rol de técnico.
 */
const isTecnico = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("tecnico")) {
        // Si el usuario tiene el rol de técnico, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de técnico, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de técnico para acceder a esta ruta.",
        });
    }
};
exports.isTecnico = isTecnico;
/**
 * Middleware para verificar si un usuario tiene el rol de coordinador.
 */
const isCoordinador = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("coordinador")) {
        // Si el usuario tiene el rol de coordinador, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de coordinador, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de coordinador para acceder a esta ruta.",
        });
    }
};
exports.isCoordinador = isCoordinador;
/**
 * Middleware para verificar si un usuario tiene el rol de analista.
 */
const isAnalista = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("analista")) {
        // Si el usuario tiene el rol de analista, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de analista, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de analista para acceder a esta ruta.",
        });
    }
};
exports.isAnalista = isAnalista;
/**
 * Middleware para verificar si un usuario tiene el rol de comercial.
 */
const isComercial = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("comercial")) {
        // Si el usuario tiene el rol de comercial, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de comercial, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de comercial para acceder a esta ruta.",
        });
    }
};
exports.isComercial = isComercial;
/**
 * Middleware para verificar si un usuario tiene el rol de contabilidad.
 */
const isContabilidad = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("contabilidad")) {
        // Si el usuario tiene el rol de contabilidad, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de contabilidad, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de contabilidad para acceder a esta ruta.",
        });
    }
};
exports.isContabilidad = isContabilidad;
/**
 * Middleware para verificar si un usuario tiene el rol de almacén.
 */
const isAlmacen = (req, res, next) => {
    const user = res.locals.user;
    if (user && user.roles.includes("almacen")) {
        // Si el usuario tiene el rol de almacén, permite el acceso.
        next();
    }
    else {
        // Si el usuario no tiene el rol de almacén, devuelve un error.
        return res.status(403).json({
            error: "Acceso denegado",
            message: "No tienes permiso de almacén para acceder a esta ruta.",
        });
    }
};
exports.isAlmacen = isAlmacen;
//# sourceMappingURL=authJwt.js.map