import { memoryStore } from '../db.js';

export const getUsers = (req, res) => {
  const { role, status, search } = req.query;
  let results = [...memoryStore.users];

  if (role && role !== 'All') {
    results = results.filter((u) => u.role.toLowerCase() === role.toLowerCase());
  }

  if (status && status !== 'All') {
    results = results.filter((u) => u.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q) ||
        (u.district && u.district.toLowerCase().includes(q)) ||
        (u.farmName && u.farmName.toLowerCase().includes(q)) ||
        (u.businessName && u.businessName.toLowerCase().includes(q))
    );
  }

  return res.json({
    success: true,
    total: results.length,
    users: results,
  });
};

export const getUserById = (req, res) => {
  const user = memoryStore.users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  return res.json({ success: true, user });
};

export const updateUserStatus = (req, res) => {
  const { id } = req.params;
  const { status, role } = req.body;

  const user = memoryStore.users.find((u) => u.id === id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  if (status) user.status = status;
  if (role) user.role = role;

  return res.json({
    success: true,
    message: 'User permissions/status updated',
    user,
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const idx = memoryStore.users.findIndex((u) => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  memoryStore.users.splice(idx, 1);
  return res.json({
    success: true,
    message: 'User deleted successfully',
  });
};
