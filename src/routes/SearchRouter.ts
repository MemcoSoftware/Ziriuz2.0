import express, { Request, Response } from 'express';
import { UserController } from '../controller/UsersController';
import { LogInfo } from '../utils/logger';
import { verifyToken } from '../middlewares/verifyToken.middleware';

let searchRouter = express.Router();

// Ruta para buscar usuarios por palabra clave
searchRouter.get('/search', verifyToken, async (req: Request, res: Response) => {
    const { keyword } = req.query;
  
    if (typeof keyword !== 'string') {
      // Manejar el caso en el que keyword no sea una cadena
      return res.status(400).json({ error: 'El parámetro keyword es inválido.' });
    }
  
    try {
      LogInfo(`Search for users with keyword: ${keyword}`);
  
      const controller: UserController = new UserController();
      const users = await controller.searchUsersByKeyword(keyword);
  
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error en la búsqueda de usuarios.' });
    }
  });


  export default searchRouter;
  