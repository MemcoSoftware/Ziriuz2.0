import express, { Request, Response } from 'express';
import searchController from '../controller/SearchController';
import { verifyToken } from '../middlewares/verifyToken.middleware';
import bodyParser from 'body-parser';

const searchRouter = express.Router();
let jsonParser = bodyParser.json();
searchRouter.route('/')
  // POST: Realizar búsqueda
  .post(verifyToken, async (req: Request, res: Response) => {
    const { keyword } = req.body;
    // Lógica para buscar usuarios por palabra clave 'keyword'
    try {
      // Tu lógica de búsqueda aquí
      const results = await searchController.searchUsersByKeyword(keyword);
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Error en la búsqueda de usuarios.' });
    }
  })
  // GET: Otras operaciones si es necesario

export default searchRouter;
