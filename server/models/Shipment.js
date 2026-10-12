import mongoose from 'mongoose';

const timelineEventSchema = new mongoose.Schema({
  status: { type: String, required: true },
  time: { type: String, required: true },
  note: { type: String, required: true },
});

const podSchema = new mongoose.Schema({
  verifiedAt: { type: String },
  method: { type: String, default: 'OTP_AND_SIGNATURE' },
  receivedBy: { type: String },
  otpVerified: { type: Boolean, default: false },
  signatureData: { type: String },
  photoUrl: { type: String },
  notes: { type: String },
});

const shipmentSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true },
    farmerId: { type: String },
    farmerName: { type: String, required: true },
    buyerId: { type: String },
    buyerName: { type: String, required: true },
    produce: { type: String, required: true },
    category: { type: String, default: 'Fresh Produce' },
    quantityKg: { type: Number, required: true },
    crates: { type: Number, default: 10 },
    pickupLocation: {
      address: { type: String, required: true },
      district: { type: String, required: true },
      hub: { type: String, default: 'Local Depot' },
    },
    dropoffLocation: {
      address: { type: String, required: true },
      district: { type: String, required: true },
      hub: { type: String, default: 'Regional Depot' },
    },
    assignedDriverId: { type: String, default: null },
    assignedDriverName: { type: String, default: null },
    vehicleNumber: { type: String, default: null },
    status: {
      type: String,
      enum: ['Pending', 'Assigned', 'Dispatched', 'In-Transit', 'Delivered', 'Delayed'],
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: ['Normal', 'High', 'Urgent'],
      default: 'Normal',
    },
    requiresRefrigeration: { type: Boolean, default: false },
    estimatedDeparture: { type: String },
    estimatedDelivery: { type: String },
    deliveredAt: { type: String },
    delayReason: { type: String },
    currentLocation: { type: String, default: 'At Origin Depot' },
    otpCode: { type: String, default: '1234' },
    timeline: [timelineEventSchema],
    proofOfDelivery: podSchema,
  },
  { timestamps: true }
);

export const ShipmentModel = mongoose.models.Shipment || mongoose.model('Shipment', shipmentSchema);
