import mongoose from 'mongoose';

const driverSchema = new mongoose.Schema(
  {
    userId: { type: String },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    licenseNumber: { type: String, required: true },
    vehicleNumber: { type: String, required: true },
    vehicleType: { type: String, required: true },
    capacityKg: { type: Number, default: 2000 },
    currentLocation: { type: String, default: 'Colombo Distribution Hub' },
    district: { type: String, default: 'Colombo' },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 4.8 },
    completedTrips: { type: Number, default: 0 },
    onTimeRate: { type: Number, default: 95.0 },
    activeShipmentId: { type: String, default: null },
  },
  { timestamps: true }
);

export const DriverModel = mongoose.models.Driver || mongoose.model('Driver', driverSchema);
