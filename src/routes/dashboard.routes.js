import { Router } from 'express';
const routerDashboard = Router();

import dashboardnController from '../controllers/dashboard.controller.js';

// Routes dashboard
routerDashboard.get('/:pk/statsReservations', dashboardnController.statsReservationsController);
routerDashboard.get('/:pk/lastPurchasePlan', dashboardnController.lastPurchasePlanController);
routerDashboard.get('/:pk/bestProfessionals', dashboardnController.bestProfessionalsController);

export default routerDashboard;