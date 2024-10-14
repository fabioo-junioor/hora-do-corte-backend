import { Router } from 'express';
const router = Router();

import routerUser from './routes.user.js';
import routerUserDetails from './routes.userDetails.js';
import routerProfessional from './routes.professional.js';
import routerServices from './routes.services.js';
import routerSchedules from './routes.schedules.js';
import routerReservation from './routes.reservation.js';
import purchasePlan from './routes.purchasePlan.js';

router.use('/user', routerUser);
router.use('/userDetails', routerUserDetails);
router.use('/professional', routerProfessional);
router.use('/services', routerServices);
router.use('/schedules', routerSchedules);
router.use('/reservation', routerReservation);
router.use('/purchasePlan', purchasePlan);

export default router;