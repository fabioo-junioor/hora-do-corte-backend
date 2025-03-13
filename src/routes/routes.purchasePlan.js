import { Router } from 'express';
const routerPurchasePlan = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import purchasePlanController from '../controllers/purchasePlan.controller.js';

// Routes Purchase plan
routerPurchasePlan.get('/:pk/getLastPurchasePlan', purchasePlanController.getLastPurchasePlanController);
routerPurchasePlan.post('/:pk/createPurchasePlan', verifyToken, purchasePlanController.createPurchasePlanController);

export default routerPurchasePlan;