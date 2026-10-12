import { memoryStore } from '../db.js';

export const getUsers = (req, res) => {
  const { role, status, search, requesterRole } = req.query;
  let results = [...memoryStore.users];

  // If requester is a Buyer, never return Admin records
  if (requesterRole === 'Buyer') {
    results = results.filter((u) => u.role !== 'Admin');
  }

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
        u.phone.includes(q) ||
        (u.district && u.district.toLowerCase().includes(q)) ||
        (u.farmName && u.farmName.toLowerCase().includes(q)) ||
        (u.businessName && u.businessName.toLowerCase().includes(q))
    );
  }

  // Never expose passwords in API responses
  const sanitized = results.map(({ password, ...safeUser }) => safeUser);

  return res.json({
    success: true,
    total: sanitized.length,
    users: sanitized,
  });
};

export const getUserById = (req, res) => {
  const user = memoryStore.users.find((u) => u.id === req.params.id);
  if (!user) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }
  const { password, ...safeUser } = user;
  return res.json({ success: true, user: safeUser });
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

  const { password, ...safeUser } = user;

  return res.json({
    success: true,
    message: 'User permissions/status updated',
    user: safeUser,
  });
};

export const deleteUser = (req, res) => {
  const { id } = req.params;
  const idx = memoryStore.users.findIndex((u) => u.id === id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: 'User not found' });
  }

  const deleted = memoryStore.users.splice(idx, 1)[0];
  const { password, ...safeUser } = deleted;

  return res.json({
    success: true,
    message: 'User removed successfully',
    user: safeUser,
  });
};
