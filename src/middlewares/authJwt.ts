import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { IUser } from "../domain/interfaces/IUser.interface";

dotenv.config();

const secret = process.env.SECRETKEY || 'MYSECRETKEY';

/**
 * Middleware para verificar si un usuario tiene el rol de administrador.
 */

export const isUser = (req: Request, res: Response, next: NextFunction) => {
    const user: IUser = res.locals.user;
  
    if (user && user.roles.includes("user")) {
      // Si el usuario tiene el rol de administrador, permite el acceso.
      next();
    } else {
      // Si el usuario no tiene el rol de administrador, devuelve un error.
      return res.status(403).json({
        error: "Acceso denegado",
        message: "No tienes permiso de administrador para acceder a esta ruta.",
      });
    }
  };

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = res.locals.user;

  if (user && user.roles.includes("administrador")) {
    // Si el usuario tiene el rol de administrador, permite el acceso.
    next();
  } else {
    // Si el usuario no tiene el rol de administrador, devuelve un error.
    return res.status(403).json({
      error: "Acceso denegado",
      message: "No tienes permiso de administrador para acceder a esta ruta.",
    });
  }
};

/**
 * Middleware para verificar si un usuario tiene el rol de técnico.
 */
export const isTecnico = (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = res.locals.user;

  if (user && user.roles.includes("tecnico")) {
    // Si el usuario tiene el rol de técnico, permite el acceso.
    next();
  } else {
    // Si el usuario no tiene el rol de técnico, devuelve un error.
    return res.status(403).json({
      error: "Acceso denegado",
      message: "No tienes permiso de técnico para acceder a esta ruta.",
    });
  }
};

/**
 * Middleware para verificar si un usuario tiene el rol de coordinador.
 */
export const isCoordinador = (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = res.locals.user;

  if (user && user.roles.includes("coordinador")) {
    // Si el usuario tiene el rol de coordinador, permite el acceso.
    next();
  } else {
    // Si el usuario no tiene el rol de coordinador, devuelve un error.
    return res.status(403).json({
      error: "Acceso denegado",
      message: "No tienes permiso de coordinador para acceder a esta ruta.",
    });
  }
};

/**
 * Middleware para verificar si un usuario tiene el rol de analista.
 */
export const isAnalista = (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = res.locals.user;

  if (user && user.roles.includes("analista")) {
    // Si el usuario tiene el rol de analista, permite el acceso.
    next();
  } else {
    // Si el usuario no tiene el rol de analista, devuelve un error.
    return res.status(403).json({
      error: "Acceso denegado",
      message: "No tienes permiso de analista para acceder a esta ruta.",
    });
  }
};

/**
 * Middleware para verificar si un usuario tiene el rol de comercial.
 */
export const isComercial = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;

  if (user && user.roles.includes("comercial")) {
    // Si el usuario tiene el rol de comercial, permite el acceso.
    next();
  } else {
    // Si el usuario no tiene el rol de comercial, devuelve un error.
    return res.status(403).json({
      error: "Acceso denegado",
      message: "No tienes permiso de comercial para acceder a esta ruta.",
    });
  }
};

/**
 * Middleware para verificar si un usuario tiene el rol de contabilidad.
 */
export const isContabilidad = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user: IUser = res.locals.user;

  if (user && user.roles.includes("contabilidad")) {
    // Si el usuario tiene el rol de contabilidad, permite el acceso.
    next();
  } else {
    // Si el usuario no tiene el rol de contabilidad, devuelve un error.
    return res.status(403).json({
      error: "Acceso denegado",
      message: "No tienes permiso de contabilidad para acceder a esta ruta.",
    });
  }
};

/**
 * Middleware para verificar si un usuario tiene el rol de almacén.
 */
export const isAlmacen = (req: Request, res: Response, next: NextFunction) => {
  const user: IUser = res.locals.user;

  if (user && user.roles.includes("almacen")) {
    // Si el usuario tiene el rol de almacén, permite el acceso.
    next();
  } else {
    // Si el usuario no tiene el rol de almacén, devuelve un error.
    return res.status(403).json({
      error: "Acceso denegado",
      message: "No tienes permiso de almacén para acceder a esta ruta.",
    });
  }
};
