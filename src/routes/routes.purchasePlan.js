import { Router } from 'express';
const routerPurchasePlan = Router();

import purchasePlanController from '../controllers/purchasePlan.controller.js';

// Routes Purchase plan
routerPurchasePlan.get('/:pk/getLastPurchasePlan', purchasePlanController.getLastPurchasePlanController);
routerPurchasePlan.post('/createPurchasePlan', purchasePlanController.createPurchasePlanController);

export default routerPurchasePlan;