import { Router } from 'express';
const router = Router();

import routerAuth from './routes.auth.js';
import routerUser from './routes.user.js';
import routerUserDetails from './routes.userDetails.js';
import routerProfessional from './routes.professional.js';
import routerServices from './routes.services.js';
import routerSchedules from './routes.schedules.js';
import routerPlan from './routes.plan.js';
import routerReservation from './routes.reservation.js';
import routerPurchasePlan from './routes.purchasePlan.js';
import routerDashboard from './routes.dashboard.js';

router.use('/api/auth', routerAuth);
router.use('/api/user', routerUser);
router.use('/api/userDetails', routerUserDetails);
router.use('/api/professional', routerProfessional);
router.use('/api/services', routerServices);
router.use('/api/schedules', routerSchedules);
router.use('/api/plan', routerPlan);
router.use('/api/reservation', routerReservation);
router.use('/api/purchasePlan', routerPurchasePlan);
router.use('/api/dashboard', routerDashboard);

export default router;