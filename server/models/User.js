import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, default: 'password123' },
    role: {
      type: String,
      enum: ['Admin', 'Buyer', 'Seller', 'Driver'],
      default: 'Buyer',
    },
    status: {
      type: String,
      enum: ['Active', 'Suspended', 'Pending Verification'],
      default: 'Active',
    },
    district: { type: String, default: 'Colombo' },
    address: { type: String, default: '' },
    avatar: { type: String, default: '' },
    farmName: { type: String },
    produceTypes: [{ type: String }],
    businessName: { type: String },
    buyerType: { type: String },
    vehicleNumber: { type: String },
    vehicleType: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

export const UserModel = mongoose.models.User || mongoose.model('User', userSchema);
