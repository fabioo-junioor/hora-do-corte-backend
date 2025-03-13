import { Router } from 'express';
const routerProfessional = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import professionalController from '../controllers/professional.controller.js';

// Routes professional
routerProfessional.get('/:pk/getAllProfessional', professionalController.getAllProfessionalController);
routerProfessional.post('/createProfessional', verifyToken, professionalController.createProfessionalController);
routerProfessional.put('/:pk/updateProfessional', verifyToken, professionalController.updateProfessionalController);
routerProfessional.delete('/:pk/deleteProfessional', verifyToken, professionalController.deleteProfessionalController);

export default routerProfessional;