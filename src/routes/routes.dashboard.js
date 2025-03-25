import { Router } from 'express';
const routerDashboard = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import dashboardnController from '../controllers/dashboard.controller.js';

// Routes dashboard
routerDashboard.get('/:pk/statsReservations', verifyToken, dashboardnController.statsReservationsController);
routerDashboard.get('/:pk/lastPurchasePlan', verifyToken, dashboardnController.lastPurchasePlanController);
routerDashboard.get('/:pk/bestProfessionals', verifyToken, dashboardnController.bestProfessionalsController);

export default routerDashboard;