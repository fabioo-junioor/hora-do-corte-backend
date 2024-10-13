import { Router } from 'express';
const routerServices = Router();

import servicesController from '../controllers/services.controller.js';

// Routes services
routerServices.get('/:pk/getService', servicesController.getServiceController)
routerServices.post('/createService', servicesController.createServiceController);
routerServices.put('/:pk/updateService', servicesController.updateServiceController);

export default routerServices;