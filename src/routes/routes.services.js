import { Router } from 'express';
const routerServices = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import servicesController from '../controllers/services.controller.js';

// Routes services
routerServices.get('/:pk/getService', servicesController.getServiceController)
routerServices.post('/createService', verifyToken, servicesController.createServiceController);
routerServices.put('/:pk/updateService', verifyToken, servicesController.updateServiceController);

export default routerServices;