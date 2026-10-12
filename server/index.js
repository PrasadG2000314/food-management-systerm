import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

import { connectDB, resetToSeedData, memoryStore } from './db.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import shipmentRoutes from './routes/shipmentRoutes.js';
import driverRoutes from './routes/driverRoutes.js';
import reportRoutes from './routes/reportRoutes.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.join(__dirname, '../dist');

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ONLINE',
    system: 'AgriBridge - User & Logistics Management Microservice',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    stats: {
      users: memoryStore.users.length,
      drivers: memoryStore.drivers.length,
      shipments: memoryStore.shipments.length,
    },
  });
});

// Seed / Reset Database endpoint
app.post('/api/seed', (req, res) => {
  const result = resetToSeedData();
  res.json(result);
});

// Mount API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/shipments', shipmentRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/reports', reportRoutes);

// Serve static frontend assets if built (for Docker / Production deployment)
if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// Connect DB & start server
connectDB().finally(() => {
  app.listen(PORT, () => {
    console.log(`[AgriBridge Server] Running on http://localhost:${PORT}`);
    console.log(`[AgriBridge Server] API Health available at http://localhost:${PORT}/api/health`);
  });
});
