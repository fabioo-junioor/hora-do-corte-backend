import { Router } from 'express';
const routerProfessional = Router();

import professionalController from '../controllers/professional.controller.js';

// Routes professional
routerProfessional.get('/:pk/getAllProfessional', professionalController.getAllProfessionalController);
routerProfessional.post('/createProfessional', professionalController.createProfessionalController);
routerProfessional.put('/:pk/updateProfessional', professionalController.updateProfessionalController);

export default routerProfessional;