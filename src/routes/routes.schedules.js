import { Router } from 'express';
const routerSchedules = Router();

import schedulesController from '../controllers/schedules.controller.js';

// Routes schedules
routerSchedules.get('/:pk/getSchedule', schedulesController.getScheduleController);
routerSchedules.post('/createSchedule', schedulesController.createScheduleController);
routerSchedules.put('/:pk/updateSchedule', schedulesController.updateScheduleController);

export default routerSchedules;