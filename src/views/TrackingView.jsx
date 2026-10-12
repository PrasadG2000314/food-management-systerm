import React, { useState } from 'react';
import {
  Compass,
  MapPin,
  Truck,
  CheckCircle2,
  Clock,
  ThermometerSnowflake,
  ShieldCheck,
  Phone,
  Search,
  AlertCircle,
  FileText,
  KeyRound,
  ExternalLink,
} from 'lucide-react';

export default function TrackingView({ shipments, initialTrackingId, onOpenPod }) {
  const [selectedId, setSelectedId] = useState(initialTrackingId || shipments[0]?.id || 'SHP-701');
  const [searchInput, setSearchInput] = useState('');

  const shipment = shipments.find((s) => s.id === selectedId) || shipments[0];

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchInput.trim()) return;
    const found = shipments.find(
      (s) =>
        s.id.toLowerCase() === searchInput.trim().toLowerCase() ||
        s.orderId.toLowerCase() === searchInput.trim().toLowerCase()
    );
    if (found) {
      setSelectedId(found.id);
    } else {
      alert(`Consignment ID or Order ID "${searchInput}" not found.`);
    }
  };

  const getProgressPercent = (status) => {
    switch (status) {
      case 'Pending': return 15;
      case 'Assigned': return 35;
      case 'Dispatched': return 55;
      case 'In-Transit': return 80;
      case 'Delivered': return 100;
      case 'Delayed': return 65;
      default: return 50;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header & Quick Selector */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Real-Time Consignment Tracking</h1>
          <p style={{ marginTop: '4px' }}>
            Live GPS waypoints, sensor telemetry, and verified audit trail from farm gate to market.
          </p>
        </div>

        {/* Quick Search */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px' }}>
          <div className="search-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              className="search-input"
              style={{ minWidth: '220px' }}
              placeholder="Track ID (e.g. SHP-701)..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-secondary btn-sm">
            Track
          </button>
        </form>
      </div>

      {/* Quick Select Buttons */}
      <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', padding: '4px 0' }}>
        <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)', alignSelf: 'center', marginRight: '6px' }}>
          Active Consignments:
        </span>
        {shipments.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelectedId(s.id)}
            style={{
              padding: '6px 14px',
              fontSize: '0.82rem',
              fontWeight: 600,
              borderRadius: 'var(--radius-full)',
              border: selectedId === s.id ? '1px solid var(--primary-border)' : '1px solid var(--border-subtle)',
              background: selectedId === s.id ? 'var(--primary-subtle)' : 'var(--bg-surface)',
              color: selectedId === s.id ? 'var(--primary-text)' : 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span>{s.id}</span>
            <span className={`badge badge-${s.status.toLowerCase().replace(' ', '-')}`} style={{ fontSize: '0.65rem', padding: '1px 6px' }}>
              {s.status}
            </span>
          </button>
        ))}
      </div>

      {shipment ? (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
          {/* Left Column: Visual Route & Progress Map */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <h2 style={{ fontSize: '1.4rem' }}>{shipment.id}</h2>
                    <span className={`badge badge-${shipment.status.toLowerCase().replace(' ', '-')}`}>
                      {shipment.status}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                    Reference Order: <strong>{shipment.orderId}</strong>
                  </div>
                </div>

                {shipment.otpCode && shipment.status !== 'Delivered' && (
                  <div
                    style={{
                      background: 'var(--primary-subtle)',
                      border: '1px solid var(--primary-border)',
                      padding: '8px 14px',
                      borderRadius: 'var(--radius-md)',
                      textAlign: 'right',
                    }}
                  >
                    <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--primary-text)', fontWeight: 700 }}>
                      Buyer Handover OTP
                    </div>
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                      {shipment.otpCode}
                    </div>
                  </div>
                )}
              </div>

              {/* Minimalist SVG Sri Lanka Agricultural Corridor Visualizer */}
              <div
                style={{
                  background: 'var(--bg-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px 20px',
                  border: '1px solid var(--border-subtle)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Sri Lanka Inter-District Agri Transit Route
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--primary)', fontWeight: 600 }}>
                    Live GPS Telemetry Active
                  </div>
                </div>

                <svg viewBox="0 0 600 160" style={{ width: '100%', height: 'auto' }}>
                  {/* Highway road path */}
                  <path
                    d="M 60 80 Q 200 40 340 80 T 540 80"
                    fill="none"
                    stroke="var(--border-strong)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  {/* Completed path progress */}
                  <path
                    d="M 60 80 Q 200 40 340 80 T 540 80"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray="500"
                    strokeDashoffset={500 - (500 * getProgressPercent(shipment.status)) / 100}
                    style={{ transition: 'stroke-dashoffset 0.8s ease' }}
                  />

                  {/* Origin Node (Farm Gate) */}
                  <circle cx="60" cy="80" r="14" fill="var(--bg-surface)" stroke="var(--primary)" strokeWidth="4" />
                  <circle cx="60" cy="80" r="6" fill="var(--primary)" />
                  <text x="60" y="125" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
                    {shipment.pickupLocation.district}
                  </text>
                  <text x="60" y="142" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
                    Farm Origin
                  </text>

                  {/* Waypoint Mid Hub */}
                  <circle cx="300" cy="62" r="8" fill="var(--bg-surface)" stroke="var(--border-strong)" strokeWidth="3" />
                  <text x="300" y="42" textAnchor="middle" fill="var(--text-muted)" fontSize="11" fontWeight="600">
                    Kandy / Corridor Hub
                  </text>

                  {/* Destination Node */}
                  <circle cx="540" cy="80" r="14" fill="var(--bg-surface)" stroke={shipment.status === 'Delivered' ? 'var(--primary)' : 'var(--border-strong)'} strokeWidth="4" />
                  <circle cx="540" cy="80" r="6" fill={shipment.status === 'Delivered' ? 'var(--primary)' : 'var(--text-muted)'} />
                  <text x="540" y="125" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontWeight="700">
                    {shipment.dropoffLocation.district}
                  </text>
                  <text x="540" y="142" textAnchor="middle" fill="var(--text-muted)" fontSize="10">
                    Buyer Terminal
                  </text>

                  {/* Vehicle Marker at current progress */}
                  {shipment.status !== 'Pending' && (
                    <g transform={`translate(${60 + (480 * getProgressPercent(shipment.status)) / 100 - 18}, ${shipment.status === 'Dispatched' ? 42 : shipment.status === 'In-Transit' ? 62 : 62})`}>
                      <rect width="36" height="36" rx="8" fill="var(--primary)" />
                      <path d="M10 20 L26 20 M14 26 A2 2 0 1 0 18 26 M22 26 A2 2 0 1 0 26 26" stroke="#fff" strokeWidth="2" />
                    </g>
                  )}
                </svg>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '12px 14px',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    marginTop: '16px',
                  }}
                >
                  <MapPin size={18} color="var(--primary)" style={{ flexShrink: 0 }} />
                  <div>
                    <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>Current Waypoint Status:</div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      {shipment.currentLocation}
                    </div>
                  </div>
                </div>
              </div>

              {/* Sensor & Telemetry Data */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '20px' }}>
                <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--primary)', marginBottom: '4px' }}>
                    <ThermometerSnowflake size={16} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Cold Chain Log</span>
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800 }}>4.2°C (Optimal)</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Continuous refrigerated telemetry</div>
                </div>

                <div style={{ padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)', background: 'var(--bg-subtle)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#2563eb', marginBottom: '4px' }}>
                    <Truck size={16} />
                    <span style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase' }}>Vehicle & Transporter</span>
                  </div>
                  <div style={{ fontSize: '1.05rem', fontWeight: 700 }}>
                    {shipment.assignedDriverName || 'Awaiting Allocation'}
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Plate: {shipment.vehicleNumber || 'Pending'}
                  </div>
                </div>
              </div>

              {/* Trigger POD action */}
              {shipment.status !== 'Delivered' && (
                <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
                  <button className="btn btn-primary" onClick={() => onOpenPod(shipment.id)}>
                    <CheckCircle2 size={16} /> Complete Delivery Handover (POD)
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Timeline Audit Trail & Proof of Delivery view */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Timeline */}
            <div className="card">
              <h3 style={{ marginBottom: '16px' }}>Consignment Lifecycle Milestones</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'relative' }}>
                {shipment.timeline?.map((evt, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '14px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <div
                        style={{
                          width: '26px',
                          height: '26px',
                          borderRadius: '50%',
                          background: 'var(--primary-subtle)',
                          color: 'var(--primary)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '2px solid var(--primary)',
                          flexShrink: 0,
                        }}
                      >
                        <CheckCircle2 size={14} />
                      </div>
                      {idx < shipment.timeline.length - 1 && (
                        <div style={{ width: '2px', flex: 1, background: 'var(--border-subtle)', margin: '4px 0' }} />
                      )}
                    </div>

                    <div style={{ paddingBottom: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 700, fontSize: '0.9rem' }}>{evt.status}</span>
                        <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                          {new Date(evt.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                          {new Date(evt.time).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                      <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', marginTop: '3px', lineHeight: 1.4 }}>
                        {evt.note}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Proof of Delivery Card (If delivered) */}
            {shipment.proofOfDelivery && (
              <div className="card" style={{ borderLeft: '4px solid var(--primary)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <ShieldCheck size={20} color="var(--primary)" />
                  <h3 style={{ fontSize: '1.1rem' }}>Verified Proof of Delivery (POD)</h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem' }}>
                  <div>
                    <strong>Received By:</strong> {shipment.proofOfDelivery.receivedBy}
                  </div>
                  <div>
                    <strong>Delivered At:</strong>{' '}
                    {new Date(shipment.proofOfDelivery.verifiedAt).toLocaleString()}
                  </div>
                  <div>
                    <strong>OTP Verified:</strong>{' '}
                    <span className="badge badge-delivered">Matched {shipment.otpCode}</span>
                  </div>
                  <div>
                    <strong>Handover Inspection Notes:</strong> {shipment.proofOfDelivery.notes}
                  </div>

                  {shipment.proofOfDelivery.signatureData && (
                    <div style={{ marginTop: '8px' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                        Digital Recipient Signature:
                      </div>
                      <div
                        style={{
                          background: 'var(--bg-subtle)',
                          borderRadius: 'var(--radius-md)',
                          padding: '8px',
                          display: 'inline-block',
                          border: '1px solid var(--border-subtle)',
                        }}
                      >
                        <img
                          src={shipment.proofOfDelivery.signatureData}
                          alt="Recipient signature"
                          style={{ maxHeight: '50px' }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="card" style={{ textAlign: 'center', padding: '48px 0' }}>
          Consignment not found.
        </div>
      )}
    </div>
  );
}
