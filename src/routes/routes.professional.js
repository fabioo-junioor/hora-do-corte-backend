import { Router } from 'express';
const routerProfessional = Router();

import professionalController from '../controllers/professional.controller.js';

// Routes professional
routerProfessional.get('/:pk/getAllProfessional', professionalController.getAllProfessionalController);
routerProfessional.post('/createProfessional', professionalController.createProfessionalController);
routerProfessional.put('/:pk/updateProfessional', professionalController.updateProfessionalController);

//routerProfessional.post('/:pk/createServices', professionalController);

export default routerProfessional;