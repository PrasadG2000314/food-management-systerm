import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Shield,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  MoreVertical,
  Mail,
  Phone,
  MapPin,
  Lock,
} from 'lucide-react';

export default function UserManagementView({
  users,
  onRegisterUser,
  onUpdateUserStatus,
  onOpenProfile,
  onOpenAdminPassword,
  currentUser,
}) {
  const [roleFilter, setRoleFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [newUserForm, setNewUserForm] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Buyer',
    district: 'Colombo',
    address: '',
    farmName: '',
    businessName: '',
    vehicleNumber: '',
    vehicleType: '',
  });

  const isBuyer = currentUser?.role === 'Buyer';
  const isAdmin = currentUser?.role === 'Admin';

  // If a Buyer views user data, completely filter out all Admin users to protect admin privacy
  const safeUsers = isBuyer ? users.filter((u) => u.role !== 'Admin') : users;
  const roles = isBuyer
    ? ['All', 'Seller', 'Buyer', 'Driver']
    : ['All', 'Admin', 'Seller', 'Buyer', 'Driver'];

  const filteredUsers = safeUsers.filter((u) => {
    const matchesRole = roleFilter === 'All' || u.role.toLowerCase() === roleFilter.toLowerCase();
    const matchesStatus = statusFilter === 'All' || u.status.toLowerCase() === statusFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      (u.district && u.district.toLowerCase().includes(q));
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    onRegisterUser(newUserForm);
    setIsAddUserOpen(false);
    setNewUserForm({
      name: '',
      email: '',
      phone: '',
      role: 'Buyer',
      district: 'Colombo',
      address: '',
      farmName: '',
      businessName: '',
      vehicleNumber: '',
      vehicleType: '',
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>User & Access Control Directory</h1>
          <p style={{ marginTop: '4px' }}>
            Manage user authorization levels (Farmer/Seller, Buyer, Transporter) and account statuses.
          </p>
        </div>

        {isAdmin && (
          <div style={{ display: 'flex', gap: '10px' }}>
            <button className="btn btn-secondary" onClick={onOpenAdminPassword}>
              <Lock size={15} /> Admin Password Security
            </button>
            <button className="btn btn-primary" onClick={() => setIsAddUserOpen(true)}>
              <UserPlus size={16} /> Register New User
            </button>
          </div>
        )}
      </div>

      {/* Role Counts Summary */}
      <div className="stats-grid">
        {!isBuyer && (
          <div className="stat-card">
            <span className="stat-label">Administrators</span>
            <div className="stat-value">{users.filter((u) => u.role === 'Admin').length}</div>
            <div className="stat-subtitle">Full system configuration</div>
          </div>
        )}

        <div className="stat-card">
          <span className="stat-label">Farmers & Sellers</span>
          <div className="stat-value">{users.filter((u) => u.role === 'Seller').length}</div>
          <div className="stat-subtitle">Agricultural producers</div>
        </div>

        <div className="stat-card">
          <span className="stat-label">Wholesale Buyers</span>
          <div className="stat-value">{users.filter((u) => u.role === 'Buyer').length}</div>
          <div className="stat-subtitle">Supermarkets & wholesalers</div>
        </div>

        <div className="stat-card">
          <span className="stat-label">Logistics Transporters</span>
          <div className="stat-value">{users.filter((u) => u.role === 'Driver').length}</div>
          <div className="stat-subtitle">Dedicated agri couriers</div>
        </div>
      </div>

      {/* Filters & Search */}
      <div
        className="card"
        style={{
          padding: '14px 18px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', gap: '6px', overflowX: 'auto', padding: '2px 0' }}>
          {roles.map((r) => (
            <button
              key={r}
              onClick={() => setRoleFilter(r)}
              style={{
                border: 'none',
                background: roleFilter === r ? 'var(--primary-subtle)' : 'transparent',
                color: roleFilter === r ? 'var(--primary-text)' : 'var(--text-secondary)',
                fontWeight: roleFilter === r ? 700 : 500,
                fontSize: '0.82rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                border: roleFilter === r ? '1px solid var(--primary-border)' : '1px solid transparent',
              }}
            >
              {r} {r !== 'All' && `(${users.filter((u) => u.role.toLowerCase() === r.toLowerCase()).length})`}
            </button>
          ))}
        </div>

        <div style={{ minWidth: '240px' }}>
          <input
            type="text"
            className="input-control"
            style={{ padding: '7px 12px', fontSize: '0.84rem' }}
            placeholder="Search by name, email, district..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Users Table */}
      <div className="table-container">
        <table className="table-custom">
          <thead>
            <tr>
              <th>User Name & Contact</th>
              <th>System Role</th>
              <th>Base District</th>
              <th>Affiliation / Fleet Details</th>
              <th>Status</th>
              <th style={{ textAlign: 'right' }}>Role Permissions Toggle</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-muted)' }}>
                  No users found matching query.
                </td>
              </tr>
            ) : (
              filteredUsers.map((u) => (
                <tr key={u.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img
                        src={u.avatar}
                        alt={u.name}
                        style={{ width: '36px', height: '36px', borderRadius: '50%', objectFit: 'cover' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span>{u.name}</span>
                          {u.id === currentUser?.id && (
                            <span style={{ fontSize: '0.65rem', background: 'var(--primary-subtle)', color: 'var(--primary-text)', padding: '1px 6px', borderRadius: '4px' }}>
                              You
                            </span>
                          )}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {u.email} • {u.phone}
                        </div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span className={`badge badge-role-${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </td>

                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem' }}>
                      <MapPin size={13} color="var(--primary)" />
                      <span>{u.district || 'Colombo'}</span>
                    </div>
                  </td>

                  <td style={{ fontSize: '0.84rem' }}>
                    {u.role === 'Seller' && (
                      <span style={{ color: 'var(--primary-text)', fontWeight: 600 }}>
                        {u.farmName || 'Highland Organic Farm'}
                      </span>
                    )}
                    {u.role === 'Buyer' && (
                      <span style={{ color: '#1e40af', fontWeight: 600 }}>
                        {u.businessName || 'Wholesale Distribution'}
                      </span>
                    )}
                    {u.role === 'Driver' && (
                      <span style={{ color: '#9a3412', fontWeight: 600 }}>
                        {u.vehicleType} ({u.vehicleNumber})
                      </span>
                    )}
                    {u.role === 'Admin' && <span style={{ color: 'var(--text-muted)' }}>Security Lead</span>}
                  </td>

                  <td>
                    <button
                      onClick={() =>
                        onUpdateUserStatus(u.id, {
                          status: u.status === 'Active' ? 'Suspended' : 'Active',
                        })
                      }
                      style={{
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        padding: 0,
                      }}
                      title="Click to toggle account status"
                    >
                      <span
                        className="badge"
                        style={{
                          background: u.status === 'Active' ? 'var(--status-delivered-bg)' : 'var(--status-delayed-bg)',
                          color: u.status === 'Active' ? 'var(--status-delivered-text)' : 'var(--status-delayed-text)',
                        }}
                      >
                        {u.status}
                      </span>
                    </button>
                  </td>

                  <td style={{ textAlign: 'right' }}>
                    {isAdmin ? (
                      <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                        <select
                          className="select-control"
                          style={{ padding: '4px 8px', fontSize: '0.78rem', width: 'auto' }}
                          value={u.role}
                          onChange={(e) => onUpdateUserStatus(u.id, { role: e.target.value })}
                        >
                          <option value="Admin">Admin</option>
                          <option value="Seller">Seller (Farmer)</option>
                          <option value="Buyer">Buyer</option>
                          <option value="Driver">Driver</option>
                        </select>
                      </div>
                    ) : (
                      <span className={`badge badge-role-${u.role.toLowerCase()}`}>
                        {u.role}
                      </span>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isAddUserOpen && (
        <div className="modal-overlay" onClick={() => setIsAddUserOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Register New System User</h3>
            </div>
            <form onSubmit={handleCreateUser}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">Full Name</label>
                  <input
                    type="text"
                    className="input-control"
                    placeholder="e.g. Mahinda Silva"
                    value={newUserForm.name}
                    onChange={(e) => setNewUserForm({ ...newUserForm, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="input-group">
                    <label className="input-label">Email Address</label>
                    <input
                      type="email"
                      className="input-control"
                      placeholder="e.g. mahinda@agribridge.lk"
                      value={newUserForm.email}
                      onChange={(e) => setNewUserForm({ ...newUserForm, email: e.target.value })}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label className="input-label">Phone Contact</label>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="e.g. +94 77 987 6543"
                      value={newUserForm.phone}
                      onChange={(e) => setNewUserForm({ ...newUserForm, phone: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="input-group">
                    <label className="input-label">System Role Level</label>
                    <select
                      className="select-control"
                      value={newUserForm.role}
                      onChange={(e) => setNewUserForm({ ...newUserForm, role: e.target.value })}
                    >
                      <option value="Buyer">Buyer (Wholesale / Retail)</option>
                      <option value="Seller">Seller (Farmer / Producer)</option>
                      <option value="Driver">Driver / Logistics Transporter</option>
                      <option value="Admin">Administrator</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label className="input-label">Operating District</label>
                    <select
                      className="select-control"
                      value={newUserForm.district}
                      onChange={(e) => setNewUserForm({ ...newUserForm, district: e.target.value })}
                    >
                      <option value="Colombo">Colombo</option>
                      <option value="Nuwara Eliya">Nuwara Eliya</option>
                      <option value="Matale">Matale / Dambulla</option>
                      <option value="Gampaha">Gampaha</option>
                      <option value="Kandy">Kandy</option>
                      <option value="Badulla">Badulla</option>
                      <option value="Kurunegala">Kurunegala</option>
                      <option value="Jaffna">Jaffna</option>
                    </select>
                  </div>
                </div>

                {newUserForm.role === 'Seller' && (
                  <div className="input-group">
                    <label className="input-label">Farm / Producer Name</label>
                    <input
                      type="text"
                      className="input-control"
                      placeholder="e.g. Silva Agro Produce"
                      value={newUserForm.farmName}
                      onChange={(e) => setNewUserForm({ ...newUserForm, farmName: e.target.value })}
                    />
                  </div>
                )}

                {newUserForm.role === 'Driver' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div className="input-group">
                      <label className="input-label">Vehicle Plate</label>
                      <input
                        type="text"
                        className="input-control"
                        placeholder="e.g. WP-ND-9921"
                        value={newUserForm.vehicleNumber}
                        onChange={(e) => setNewUserForm({ ...newUserForm, vehicleNumber: e.target.value })}
                      />
                    </div>
                    <div className="input-group">
                      <label className="input-label">Vehicle Type</label>
                      <input
                        type="text"
                        className="input-control"
                        placeholder="e.g. 3.0T Insulated Truck"
                        value={newUserForm.vehicleType}
                        onChange={(e) => setNewUserForm({ ...newUserForm, vehicleType: e.target.value })}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setIsAddUserOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save & Authorize
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
