import mongoose from 'mongoose';
import { initialUsers, initialDrivers, initialShipments } from './data/seedData.js';

// In-Memory store fallback
export const memoryStore = {
  users: JSON.parse(JSON.stringify(initialUsers)),
  drivers: JSON.parse(JSON.stringify(initialDrivers)),
  shipments: JSON.parse(JSON.stringify(initialShipments)),
};

export let isConnectedToMongo = false;

export async function connectDB() {
  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/agribridge';
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 2000,
    });
    isConnectedToMongo = true;
    console.log(`[AgriBridge DB] Successfully connected to MongoDB at: ${uri}`);
  } catch (err) {
    isConnectedToMongo = false;
    console.log(`[AgriBridge DB] MongoDB not detected (${err.message}).`);
    console.log(`[AgriBridge DB] Defaulting seamlessly to High-Performance In-Memory Data Store.`);
  }
}

export function resetToSeedData() {
  memoryStore.users = JSON.parse(JSON.stringify(initialUsers));
  memoryStore.drivers = JSON.parse(JSON.stringify(initialDrivers));
  memoryStore.shipments = JSON.parse(JSON.stringify(initialShipments));
  return { success: true, message: 'Database reset to default seed state' };
}
