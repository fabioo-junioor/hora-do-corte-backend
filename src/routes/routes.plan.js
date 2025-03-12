import { Router } from 'express';
const routerPlan = Router();

import planController from '../controllers/plan.controller.js';

// Routes plan
routerPlan.get('/allPlans', planController.getAllPlansController);

export default routerPlan;