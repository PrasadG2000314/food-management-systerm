import React, { useState } from 'react';
import { X, Truck, Package, MapPin, Sparkles, AlertCircle } from 'lucide-react';

export default function NewShipmentModal({ isOpen, onClose, onCreateShipment, currentUser }) {
  const [formData, setFormData] = useState({
    produce: '',
    category: 'Highland Vegetables',
    quantityKg: '',
    crates: '',
    pickupDistrict: 'Nuwara Eliya',
    pickupAddress: 'Nuwara Eliya Wholesale Depot',
    dropoffDistrict: 'Colombo',
    dropoffAddress: 'Manning Market Complex, Peliyagoda',
    farmerName: currentUser?.role === 'Seller' ? currentUser.name : 'Sunil Bandara (Green Valley Farm)',
    buyerName: currentUser?.role === 'Buyer' ? currentUser.name : 'Lanka Fresh Supermarkets Network',
    priority: 'Normal',
    requiresRefrigeration: false,
    autoMatchDriver: true,
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onCreateShipment(formData);
    onClose();
  };

  const handleWeightChange = (e) => {
    const val = e.target.value;
    const cratesCount = val ? Math.ceil(Number(val) / 25) : '';
    setFormData({ ...formData, quantityKg: val, crates: cratesCount });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Truck size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Create New Agri Consignment Order</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Direct farm pickup and logistical dispatch allocation
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
            {/* Produce & Category */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Produce / Crop Type</label>
                <input
                  type="text"
                  className="input-control"
                  placeholder="e.g. Organic Carrots, Red Onions"
                  value={formData.produce}
                  onChange={(e) => setFormData({ ...formData, produce: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Produce Category</label>
                <select
                  className="select-control"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option value="Highland Vegetables">Highland Vegetables</option>
                  <option value="Lowland Produce">Lowland Produce</option>
                  <option value="Root Crops">Root Crops (Potatoes/Yams)</option>
                  <option value="Fruits & Berries">Fruits & Berries</option>
                  <option value="Spices & Commercial">Spices & Commercial</option>
                </select>
              </div>
            </div>

            {/* Weight & Crates */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Quantity (kg)</label>
                <input
                  type="number"
                  min="10"
                  className="input-control"
                  placeholder="e.g. 1500"
                  value={formData.quantityKg}
                  onChange={handleWeightChange}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Standard Crates</label>
                <input
                  type="number"
                  min="1"
                  className="input-control"
                  placeholder="e.g. 60"
                  value={formData.crates}
                  onChange={(e) => setFormData({ ...formData, crates: e.target.value })}
                  required
                />
              </div>

              <div className="input-group">
                <label className="input-label">Logistics Priority</label>
                <select
                  className="select-control"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                >
                  <option value="Normal">Normal</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent / Perishable</option>
                </select>
              </div>
            </div>

            {/* Origin Pickup District & Hub */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Pickup District (Farm)</label>
                <select
                  className="select-control"
                  value={formData.pickupDistrict}
                  onChange={(e) => setFormData({ ...formData, pickupDistrict: e.target.value })}
                >
                  <option value="Nuwara Eliya">Nuwara Eliya</option>
                  <option value="Matale">Matale / Dambulla</option>
                  <option value="Badulla">Badulla / Welimada</option>
                  <option value="Kurunegala">Kurunegala</option>
                  <option value="Jaffna">Jaffna</option>
                  <option value="Kandy">Kandy</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Pickup Farm / Collection Gate</label>
                <input
                  type="text"
                  className="input-control"
                  value={formData.pickupAddress}
                  onChange={(e) => setFormData({ ...formData, pickupAddress: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Destination Dropoff District & Hub */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '12px' }}>
              <div className="input-group">
                <label className="input-label">Dropoff District</label>
                <select
                  className="select-control"
                  value={formData.dropoffDistrict}
                  onChange={(e) => setFormData({ ...formData, dropoffDistrict: e.target.value })}
                >
                  <option value="Colombo">Colombo</option>
                  <option value="Gampaha">Gampaha</option>
                  <option value="Kalutara">Kalutara</option>
                  <option value="Galle">Galle</option>
                  <option value="Kandy">Kandy</option>
                </select>
              </div>

              <div className="input-group">
                <label className="input-label">Delivery Address / Destination Hub</label>
                <input
                  type="text"
                  className="input-control"
                  value={formData.dropoffAddress}
                  onChange={(e) => setFormData({ ...formData, dropoffAddress: e.target.value })}
                  required
                />
              </div>
            </div>

            {/* Special Conditions */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                marginTop: '8px',
              }}
            >
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>Require Cold-Chain Refrigeration</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                  Enforce insulated temperature-controlled truck (4°C - 8°C)
                </div>
              </div>
              <input
                type="checkbox"
                checked={formData.requiresRefrigeration}
                onChange={(e) => setFormData({ ...formData, requiresRefrigeration: e.target.checked })}
                style={{ width: '18px', height: '18px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Sparkles size={16} /> Book Consignment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
