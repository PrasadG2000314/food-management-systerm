import React, { useState, useEffect } from 'react';
import { X, User, Phone, MapPin, Truck, Building, Save } from 'lucide-react';

export default function ProfileModal({ isOpen, onClose, user, onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    district: '',
    address: '',
    farmName: '',
    businessName: '',
    vehicleNumber: '',
    vehicleType: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        district: user.district || '',
        address: user.address || '',
        farmName: user.farmName || '',
        businessName: user.businessName || '',
        vehicleNumber: user.vehicleNumber || '',
        vehicleType: user.vehicleType || '',
      });
    }
  }, [user]);

  if (!isOpen || !user) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(user.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <img
              src={user.avatar}
              alt={user.name}
              style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div>
              <h3 style={{ fontSize: '1.1rem' }}>User Profile & Preferences</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                {user.email} • <span className={`badge badge-role-${user.role.toLowerCase()}`}>{user.role}</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="input-group">
              <label className="input-label">Full Name</label>
              <input
                type="text"
                className="input-control"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Phone Contact</label>
                <input
                  type="text"
                  className="input-control"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Base District</label>
                <select
                  className="select-control"
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kandy">Kandy</option>
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Matale">Matale</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Badulla">Badulla</option>
                  <option value="Jaffna">Jaffna</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label className="input-label">Physical Address</label>
              <input
                type="text"
                className="input-control"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              />
            </div>

            {user.role === 'Seller' && (
              <div className="input-group">
                <label className="input-label">Farm / Produce Name</label>
                <input
                  type="text"
                  className="input-control"
                  value={formData.farmName}
                  onChange={(e) => setFormData({ ...formData, farmName: e.target.value })}
                />
              </div>
            )}

            {user.role === 'Buyer' && (
              <div className="input-group">
                <label className="input-label">Company / Outlet Name</label>
                <input
                  type="text"
                  className="input-control"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                />
              </div>
            )}

            {user.role === 'Driver' && (
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="input-group">
                  <label className="input-label">Vehicle Plate</label>
                  <input
                    type="text"
                    className="input-control"
                    value={formData.vehicleNumber}
                    onChange={(e) => setFormData({ ...formData, vehicleNumber: e.target.value })}
                  />
                </div>
                <div className="input-group">
                  <label className="input-label">Vehicle Type</label>
                  <input
                    type="text"
                    className="input-control"
                    value={formData.vehicleType}
                    onChange={(e) => setFormData({ ...formData, vehicleType: e.target.value })}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Save size={16} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
