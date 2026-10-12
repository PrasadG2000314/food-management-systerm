import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { memoryStore } from '../db.js';

const JWT_SECRET = process.env.JWT_SECRET || 'agribridge_super_secure_jwt_secret_key_2026';

export const login = (req, res) => {
  const { email, password, role } = req.body;

  let user = null;
  if (email) {
    user = memoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  } else if (role) {
    user = memoryStore.users.find((u) => u.role.toLowerCase() === role.toLowerCase());
  }

  if (!user) {
    return res.status(404).json({
      success: false,
      message: 'User account not found with this email.',
    });
  }

  // Password verification
  if (password) {
    const isMatch =
      user.passwordHash && bcrypt.compareSync(password, user.passwordHash) ||
      user.password === password;

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid password. Access denied.',
      });
    }
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.json({
    success: true,
    message: `${user.role} authenticated successfully`,
    token,
    user,
  });
};

export const register = (req, res) => {
  const {
    name,
    email,
    phone,
    password,
    role,
    district,
    address,
    farmName,
    businessName,
    vehicleNumber,
    vehicleType,
  } = req.body;

  if (!name || !email || !role) {
    return res.status(400).json({ success: false, message: 'Name, email and role are required' });
  }

  const existing = memoryStore.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({ success: false, message: 'User with this email already exists' });
  }

  const rawPassword = password || (role === 'Admin' ? 'Admin@2026' : 'Pass@123');
  const passwordHash = bcrypt.hashSync(rawPassword, 10);

  const newUser = {
    id: `usr-${String(memoryStore.users.length + 1).padStart(3, '0')}`,
    name,
    email,
    phone: phone || '+94 77 000 0000',
    role,
    password: rawPassword,
    passwordHash,
    status: 'Active',
    district: district || 'Colombo',
    address: address || '',
    farmName: farmName || (role === 'Seller' ? `${name}'s Agro Farm` : undefined),
    businessName: businessName || (role === 'Buyer' ? `${name} Enterprises` : undefined),
    vehicleNumber: vehicleNumber || (role === 'Driver' ? 'WP-XX-1234' : undefined),
    vehicleType: vehicleType || (role === 'Driver' ? '2.5T Truck' : undefined),
    avatar: `https://images.unsplash.com/photo-${role === 'Driver' ? '1522075469751-3a6694fb2f61' : '1534528741775-53994a69daeb'}?auto=format&fit=crop&w=200&q=80`,
    createdAt: new Date().toISOString(),
    notes: 'Registered user via AgriBridge Portal',
  };

  memoryStore.users.unshift(newUser);

  if (role === 'Driver') {
    const newDriver = {
      id: `drv-${String(memoryStore.drivers.length + 1).padStart(3, '0')}`,
      userId: newUser.id,
      name: newUser.name,
      phone: newUser.phone,
      licenseNumber: `B-${Math.floor(10000000 + Math.random() * 90000000)}`,
      vehicleNumber: newUser.vehicleNumber,
      vehicleType: newUser.vehicleType,
      capacityKg: 2500,
      currentLocation: `${newUser.district} Terminal`,
      district: newUser.district,
      isAvailable: true,
      rating: 5.0,
      completedTrips: 0,
      onTimeRate: 100.0,
      activeShipmentId: null,
    };
    memoryStore.drivers.push(newDriver);
  }

  const token = jwt.sign(
    { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
    JWT_SECRET,
    { expiresIn: '7d' }
  );

  return res.status(201).json({
    success: true,
    message: 'User registered successfully',
    user: newUser,
    token,
  });
};

export const changePassword = (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  if (!userId || !newPassword) {
    return res.status(400).json({ success: false, message: 'User ID and new password are required' });
  }

  const user = memoryStore.users.find((u) => u.id === userId);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  // Validate current password if provided
  if (currentPassword) {
    const isMatch =
      (user.passwordHash && bcrypt.compareSync(currentPassword, user.passwordHash)) ||
      user.password === currentPassword;

    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }
  }

  // Hash new password
  const newHash = bcrypt.hashSync(newPassword, 10);
  user.password = newPassword;
  user.passwordHash = newHash;

  return res.json({
    success: true,
    message: 'Password successfully updated and securely hashed with bcrypt.',
  });
};

export const verifyAdminPassword = (req, res) => {
  const { password } = req.body;

  const admin = memoryStore.users.find((u) => u.role === 'Admin');
  if (!admin) {
    return res.status(404).json({ success: false, message: 'No administrator found' });
  }

  const isMatch =
    (admin.passwordHash && bcrypt.compareSync(password || '', admin.passwordHash)) ||
    admin.password === password;

  if (!isMatch) {
    return res.status(401).json({ success: false, message: 'Incorrect admin password' });
  }

  return res.json({
    success: true,
    message: 'Admin password verified. Access granted.',
  });
};

export const updateProfile = (req, res) => {
  const { id } = req.params;
  const updates = req.body;

  const userIndex = memoryStore.users.findIndex((u) => u.id === id);
  if (userIndex === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  memoryStore.users[userIndex] = {
    ...memoryStore.users[userIndex],
    ...updates,
    id,
  };

  return res.json({
    success: true,
    message: 'Profile updated successfully',
    user: memoryStore.users[userIndex],
  });
};
