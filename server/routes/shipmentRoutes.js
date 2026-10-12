import express from 'express';
import {
  getShipments,
  getShipmentById,
  createShipment,
  assignDriver,
  updateShipmentStatus,
  confirmProofOfDelivery,
} from '../controllers/shipmentController.js';

const router = express.Router();

router.get('/', getShipments);
router.get('/:id', getShipmentById);
router.post('/', createShipment);
router.post('/:id/assign-driver', assignDriver);
router.patch('/:id/status', updateShipmentStatus);
router.post('/:id/confirm-pod', confirmProofOfDelivery);

export default router;
