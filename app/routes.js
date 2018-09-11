import { Router } from 'express';

import VehiclesController from './controllers/vehicles.controller';

import vehiclesParams from './middleware/vehicles-params';
import errorHandler from './middleware/error-handler';

const routes = new Router();

// Vehicle routing
routes.get('/vehicles/:modelYear/:manufacturer/:model', VehiclesController.fetch);
routes.post('/vehicles', vehiclesParams, VehiclesController.create);

routes.use(errorHandler);

export default routes;
