import React, { useState } from 'react';
import {
  Truck,
  PlusCircle,
  Sparkles,
  MapPin,
  Compass,
  FileCheck2,
  Filter,
  CheckCircle,
  AlertCircle,
  ArrowUpDown,
  MoreVertical,
  ChevronRight,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function ShipmentsView({
  shipments,
  drivers,
  onOpenNewShipment,
  onAutoMatchDriver,
  onManualAssignDriver,
  onUpdateShipmentStatus,
  onSelectShipmentForTracking,
  onSelectShipmentForPod,
}) {
  const [statusFilter, setStatusFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedShipmentForAssign, setSelectedShipmentForAssign] = useState(null);
  const [selectedShipmentForStatus, setSelectedShipmentForStatus] = useState(null);
  const [statusModalData, setStatusModalData] = useState({
    status: 'In-Transit',
    currentLocation: '',
    note: '',
    delayReason: '',
  });

  const statuses = ['All', 'Pending', 'Assigned', 'Dispatched', 'In-Transit', 'Delivered', 'Delayed'];

  const filteredShipments = shipments.filter((s) => {
    const matchesStatus = statusFilter === 'All' || s.status.toLowerCase() === statusFilter.toLowerCase();
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      s.id.toLowerCase().includes(q) ||
      s.orderId.toLowerCase().includes(q) ||
      s.produce.toLowerCase().includes(q) ||
      s.farmerName.toLowerCase().includes(q) ||
      s.buyerName.toLowerCase().includes(q) ||
      s.pickupLocation.district.toLowerCase().includes(q) ||
      s.dropoffLocation.district.toLowerCase().includes(q);
    return matchesStatus && matchesSearch;
  });

  const handleOpenStatusModal = (shipment) => {
    setSelectedShipmentForStatus(shipment);
    setStatusModalData({
      status: shipment.status,
      currentLocation: shipment.currentLocation || '',
      note: '',
      delayReason: shipment.delayReason || '',
    });
  };

  const handleSaveStatus = (e) => {
    e.preventDefault();
    if (!selectedShipmentForStatus) return;
    onUpdateShipmentStatus(selectedShipmentForStatus.id, statusModalData);
    setSelectedShipmentForStatus(null);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header & New Consignment */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Shipment & Cargo Dispatch</h1>
          <p style={{ marginTop: '4px' }}>
            Coordinate produce collection, dynamic driver dispatching, and transit tracking.
          </p>
        </div>

        <button className="btn btn-primary" onClick={onOpenNewShipment}>
          <PlusCircle size={16} /> Create Consignment Order
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
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
          {statuses.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              style={{
                border: 'none',
                background: statusFilter === st ? 'var(--primary-subtle)' : 'transparent',
                color: statusFilter === st ? 'var(--primary-text)' : 'var(--text-secondary)',
                fontWeight: statusFilter === st ? 700 : 500,
                fontSize: '0.82rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                border: statusFilter === st ? '1px solid var(--primary-border)' : '1px solid transparent',
              }}
            >
              {st} {st !== 'All' && `(${shipments.filter((s) => s.status.toLowerCase() === st.toLowerCase()).length})`}
            </button>
          ))}
        </div>

        <div style={{ minWidth: '240px' }}>
          <input
            type="text"
            className="input-control"
            style={{ padding: '7px 12px', fontSize: '0.84rem' }}
            placeholder="Filter by produce, district, ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Shipments Table */}
      <div className="table-container">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Consignment ID</th>
              <th>Produce & Crates</th>
              <th>Route (Origin → Destination)</th>
              <th>Assigned Transporter</th>
              <th>Status</th>
              <th>OTP Code</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredShipments.length === 0 ? (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-muted)' }}>
                  No shipments matching current filters.
                </td>
              </tr>
            ) : (
              filteredShipments.map((s) => (
                <tr key={s.id}>
                  {/* ID & Priority */}
                  <td>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)' }}>{s.id}</div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{s.orderId}</div>
                    {s.requiresRefrigeration && (
                      <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.65rem', marginTop: '3px' }}>
                        Cold Chain
                      </span>
                    )}
                  </td>

                  {/* Produce */}
                  <td>
                    <div style={{ fontWeight: 600 }}>{s.produce}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {s.quantityKg} kg • {s.crates} crates
                    </div>
                  </td>

                  {/* Route */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                      <span style={{ fontWeight: 600 }}>{s.pickupLocation.district}</span>
                      <span style={{ color: 'var(--text-muted)' }}>→</span>
                      <span style={{ fontWeight: 600 }}>{s.dropoffLocation.district}</span>
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {s.farmerName?.split(' ')[0]} to {s.buyerName?.split(' ')[0]}
                    </div>
                  </td>

                  {/* Driver */}
                  <td>
                    {s.assignedDriverName ? (
                      <div>
                        <div style={{ fontWeight: 600 }}>{s.assignedDriverName}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {s.vehicleNumber}
                        </div>
                      </div>
                    ) : (
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          className="btn btn-primary btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          onClick={() => onAutoMatchDriver(s.id)}
                          title="Run smart proximity matching algorithm"
                        >
                          <Sparkles size={13} /> Auto-Match
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          style={{ padding: '4px 10px', fontSize: '0.75rem' }}
                          onClick={() => setSelectedShipmentForAssign(s)}
                        >
                          Manual
                        </button>
                      </div>
                    )}
                  </td>

                  {/* Status */}
                  <td>
                    <span className={`badge badge-${s.status.toLowerCase().replace(' ', '-')}`}>
                      {s.status}
                    </span>
                    {s.status === 'Delayed' && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--status-delayed-text)', marginTop: '3px', maxWidth: '140px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {s.delayReason}
                      </div>
                    )}
                  </td>

                  {/* OTP Code (For Buyer Verification) */}
                  <td>
                    <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.88rem', letterSpacing: '0.05em', color: 'var(--primary)' }}>
                      {s.otpCode || '----'}
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '5px 8px' }}
                        onClick={() => onSelectShipmentForTracking(s.id)}
                        title="Live GPS & Timeline Track"
                      >
                        <Compass size={14} />
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '5px 8px' }}
                        onClick={() => handleOpenStatusModal(s)}
                        title="Update Shipment Status & Notes"
                      >
                        <ArrowUpDown size={14} />
                      </button>

                      <button
                        className="btn btn-secondary btn-sm"
                        style={{ padding: '5px 8px' }}
                        onClick={() => onSelectShipmentForPod(s.id)}
                        title="Proof of Delivery (POD)"
                      >
                        <FileCheck2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Manual Driver Assign Modal */}
      {selectedShipmentForAssign && (
        <div className="modal-overlay" onClick={() => setSelectedShipmentForAssign(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Manual Transporter Assignment</h3>
            </div>
            <div className="modal-body">
              <p style={{ marginBottom: '16px' }}>
                Assign an available transporter for <strong>{selectedShipmentForAssign.id}</strong> (
                {selectedShipmentForAssign.produce}, {selectedShipmentForAssign.quantityKg}kg from{' '}
                {selectedShipmentForAssign.pickupLocation.district}).
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {drivers.map((drv) => (
                  <div
                    key={drv.id}
                    onClick={() => {
                      onManualAssignDriver(selectedShipmentForAssign.id, drv.id);
                      setSelectedShipmentForAssign(null);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 14px',
                      borderRadius: 'var(--radius-md)',
                      border: '1px solid var(--border-subtle)',
                      background: 'var(--bg-surface)',
                      cursor: 'pointer',
                    }}
                  >
                    <div>
                      <div style={{ fontWeight: 700 }}>{drv.name}</div>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                        {drv.vehicleType} • {drv.vehicleNumber} ({drv.district} • {drv.capacityKg}kg capacity)
                      </div>
                    </div>
                    <span
                      className="badge"
                      style={{
                        background: drv.isAvailable ? 'var(--status-delivered-bg)' : 'var(--status-pending-bg)',
                        color: drv.isAvailable ? 'var(--status-delivered-text)' : 'var(--status-pending-text)',
                      }}
                    >
                      {drv.isAvailable ? 'Ready' : 'Occupied'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={() => setSelectedShipmentForAssign(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Update Shipment Status Modal */}
      {selectedShipmentForStatus && (
        <div className="modal-overlay" onClick={() => setSelectedShipmentForStatus(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Update Consignment Status: {selectedShipmentForStatus.id}</h3>
            </div>
            <form onSubmit={handleSaveStatus}>
              <div className="modal-body">
                <div className="input-group">
                  <label className="input-label">New Status</label>
                  <select
                    className="select-control"
                    value={statusModalData.status}
                    onChange={(e) => setStatusModalData({ ...statusModalData, status: e.target.value })}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Assigned">Assigned</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="In-Transit">In-Transit</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Delayed">Delayed (Log Incident)</option>
                  </select>
                </div>

                <div className="input-group">
                  <label className="input-label">Current Location / Waypoint</label>
                  <input
                    type="text"
                    className="input-control"
                    value={statusModalData.currentLocation}
                    onChange={(e) => setStatusModalData({ ...statusModalData, currentLocation: e.target.value })}
                    placeholder="e.g. Passing Ambepussa Rest Point / Milepost 34"
                  />
                </div>

                {statusModalData.status === 'Delayed' && (
                  <div className="input-group">
                    <label className="input-label" style={{ color: 'var(--status-delayed-text)' }}>
                      Reason for Delay
                    </label>
                    <input
                      type="text"
                      className="input-control"
                      value={statusModalData.delayReason}
                      onChange={(e) => setStatusModalData({ ...statusModalData, delayReason: e.target.value })}
                      placeholder="e.g. Torrential rain / Road blockage at Ramboda"
                      required
                    />
                  </div>
                )}

                <div className="input-group">
                  <label className="input-label">Milestone Note (Added to Audit Trail)</label>
                  <textarea
                    rows={2}
                    className="textarea-control"
                    value={statusModalData.note}
                    onChange={(e) => setStatusModalData({ ...statusModalData, note: e.target.value })}
                    placeholder="Provide details about the consignment condition..."
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setSelectedShipmentForStatus(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Status
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
