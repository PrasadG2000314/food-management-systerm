import express from 'express';
import { getDrivers, updateDriverLocation } from '../controllers/driverController.js';

const router = express.Router();

router.get('/', getDrivers);
router.patch('/:id/location', updateDriverLocation);

export default router;
