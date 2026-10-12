import express from 'express';
import {
  getCompletedDeliveriesReport,
  getDelayedShipmentsReport,
  getDriverPerformanceReport,
  getLogisticsOverviewStats,
} from '../controllers/reportController.js';

const router = express.Router();

router.get('/overview', getLogisticsOverviewStats);
router.get('/completed', getCompletedDeliveriesReport);
router.get('/delayed', getDelayedShipmentsReport);
router.get('/drivers', getDriverPerformanceReport);

export default router;
