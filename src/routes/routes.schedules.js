import { Router } from 'express';
const routerSchedules = Router();
import { verifyToken } from '../core/auth/auth.jwt.js';

import schedulesController from '../controllers/schedules.controller.js';

// Routes schedules
routerSchedules.get('/:pk/getSchedule', schedulesController.getScheduleController);
routerSchedules.post('/createSchedule', verifyToken, schedulesController.createScheduleController);
routerSchedules.put('/:pk/updateSchedule', verifyToken, schedulesController.updateScheduleController);

export default routerSchedules;