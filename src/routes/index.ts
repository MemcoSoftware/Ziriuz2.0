import express, { Request, Response } from 'express';
import { LogInfo } from '../utils/logger';
import bodyParser from 'body-parser'; // Importa bodyParser

/**
 * @route  /api/users
 * @description Users Module Routes
 * @access Public
 */
import helloRouter from '../modules/users/routes/HelloRouter';
import usersRouter from '../modules/users/routes/UserRouter';
import authRouter from '../modules/users/routes/AuthRouter'
import tecnicosRouter from '../modules/users/routes/TecnicoRouter';
import rolesRouter from '../modules/users/routes/RolesRouter';
import sedesRouter from '../modules/users/routes/SedeRouter';
import searchRouter from '../modules/users/routes/SearchRouter';
import clientRouter from '../modules/users/routes/ClientRouter';


/**
 * @route  /api/equipos
 * @description Equipos Module Routes
 * @access Public
 */
import equiposRouter from '../modules/equipos/routes/EquipoRouter';
import modeloEquiposRouter from '../modules/equipos/routes/ModeloEquipoRouter';
import classDeviceRouter from '../modules/equipos/routes/ClassDeviceRouter';
import marcasEquiposRouter from '../modules/equipos/routes/MarcasEquiposRouter';
import tiposEquiposRouter from '../modules/equipos/routes/TipoEquipoRouter';
import areasEquiposRouter from '../modules/equipos/routes/AreaEquipoRouter';


// * Server Instance
let server = express();

// * Configura body-parser antes de las rutas
server.use(bodyParser.json());

// * Router Instance
let rootRotuer = express.Router();

// * Activate request to http://localhost:8000/api
rootRotuer.get('/', (req: Request, res: Response) => {
    LogInfo('GET: http://localhost:8000/api')
    // Send Hello World
    res.send('Welcome to API Restful Express + Nodemon + Jest + TS + React + Swagger + Mongoose');
});

server.use('/', rootRotuer); // http://localhost:8000/api/
// * Redirections to Routers & Controllers -- MODULE USERS
server.use('/hello', helloRouter); // http://localhost:8000/api/hello --> HelloRouter
// Add more routes to the app
server.use('/users', usersRouter) // http://localhost:8000/api/users  --> userRouter
// Auth routes
server.use('/auth', authRouter); // http://localhost:8000/api/auth  --> authRouter
// Tecnicos routes
server.use('/tecnicos', tecnicosRouter); // http://localhost:8000/api/tecnicos  --> tecnicosRouter
server.use('/sedes', sedesRouter);
server.use('/roles', rolesRouter); // http://localhost:8000/api/tecnicos  --> rolesRouter
server.use('/search', searchRouter);
server.use('/clients', clientRouter); // http://localhost:8000/api/clients --> clientRouter

// * Redirections to Routers & Controllers -- MODULE EQUIPOS

server.use('/equipos', equiposRouter) // http://localhost:8000/api/equipos --> equiposRouter
server.use('/equipos/modelo', modeloEquiposRouter) // http://localhost:8000/api/equipos/modelo --> modeloEquiposRouter
server.use('/equipos/clases', classDeviceRouter) // http://localhost:8000/api/equipos/clases --> classDeviceRouter
server.use ('/equipos/marcas', marcasEquiposRouter) // http://localhost:8000/api/equipos/marcas --> marcasEquiposRouter
server.use ('/equipos/tipos', tiposEquiposRouter) // http://localhost:8000/api/equipos/tipos --> tiposEquiposRouter
server.use ('/equipos/areas', areasEquiposRouter) // http://localhost:8000/api/equipos/areas --> areasEquiposRouter
export default server;
