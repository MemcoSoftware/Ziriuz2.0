import express from 'express';
import { verifyToken } from '../middlewares/verifyToken.middleware';
import { ClientController } from '../controller/ClientController';
import { LogInfo } from '../utils/logger'; 

const clientRouter = express.Router();
const controller = new ClientController();

clientRouter.route('/')
  .get(verifyToken, async (req, res, next) => {
    LogInfo('GET: /api/client'); // Agregar LogInfo
    const clients = await controller.getClients();
    res.json(clients);
  })
  .post(verifyToken, async (req, res, next) => {
    LogInfo('POST: /api/client'); // Agregar LogInfo
    const newClient = req.body;
    const createdClient = await controller.createClient(newClient);
    res.status(201).json(createdClient);
  });

clientRouter.route('/:id')
  .get(verifyToken, async (req, res, next) => {
    const id = req.params.id;
    LogInfo(`GET: /api/client/${id}`); // Agregar LogInfo
    const client = await controller.getClientByID(id);
    res.json(client);
  })
  .put(verifyToken, async (req, res, next) => {
    const id = req.params.id;
    LogInfo(`PUT: /api/client/${id}`); // Agregar LogInfo
    const updatedClient = req.body;
    const result = await controller.updateClient(id, updatedClient);

    if (result && 'success' in result && result.success) {
      res.json(result);
    } else {
      res.status(500).json(result);
    }
  })
  .delete(verifyToken, async (req, res, next) => {
    const id = req.params.id;
    LogInfo(`DELETE: /api/client/${id}`); // Agregar LogInfo
    const result = await controller.deleteClient(id);
    res.json(result);
  });

export default clientRouter;
