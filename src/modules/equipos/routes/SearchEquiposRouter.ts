import express, { Request, Response } from 'express';
import SearchEquiposController from '../controller/SearchEquiposController'; // Asegúrate de importar el controlador correcto
import { verifyToken } from '../middlewares/verifyToken.middleware';

let searchEquiposRouter = express.Router();

searchEquiposRouter.route('/')
  .post(verifyToken, async (req: Request, res: Response) => {
    const { keyword } = req.body;
    // Lógica para buscar equipos por palabra clave 'keyword'
    try {
      const results = await SearchEquiposController.searchEquiposByKeyword(keyword); // Utiliza el controlador correcto
      res.status(200).json(results);
    } catch (error) {
      res.status(500).json({ error: 'Error en la búsqueda de equipos.' });
    }
  });

export default searchEquiposRouter;
