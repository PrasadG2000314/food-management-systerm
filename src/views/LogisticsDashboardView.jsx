import React from 'react';
import {
  Truck,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  PlusCircle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Compass,
  FileCheck2,
  Calendar,
  Sparkles,
} from 'lucide-react';

export default function LogisticsDashboardView({
  stats,
  shipments,
  drivers,
  setActiveTab,
  onOpenNewShipment,
  onSelectShipmentForTracking,
  onAutoMatchPending,
}) {
  const pendingCount = shipments.filter((s) => s.status === 'Pending').length;
  const inTransitShipments = shipments.filter((s) => ['Dispatched', 'In-Transit'].includes(s.status));
  const delayedShipments = shipments.filter((s) => s.status === 'Delayed');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Top Banner / Welcome */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Logistics Operations Command</h1>
          <p style={{ marginTop: '4px' }}>
            Real-time islandwide agricultural fleet monitoring, route status, and assignment automation.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {pendingCount > 0 && (
            <button
              className="btn btn-secondary"
              onClick={onAutoMatchPending}
              style={{ color: 'var(--primary)', borderColor: 'var(--primary-border)' }}
            >
              <Sparkles size={16} /> Auto-Match Pending ({pendingCount})
            </button>
          )}
          <button className="btn btn-primary" onClick={onOpenNewShipment}>
            <PlusCircle size={16} /> New Consignment
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Pending Allocation</span>
            <div className="stat-icon" style={{ background: 'var(--status-pending-bg)', color: 'var(--status-pending-text)' }}>
              <Clock size={18} />
            </div>
          </div>
          <div className="stat-value">{pendingCount}</div>
          <div className="stat-subtitle">Awaiting vehicle dispatch</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">In-Transit Corridors</span>
            <div className="stat-icon" style={{ background: 'var(--status-transit-bg)', color: 'var(--status-transit-text)' }}>
              <Truck size={18} />
            </div>
          </div>
          <div className="stat-value">{inTransitShipments.length}</div>
          <div className="stat-subtitle">On active transport routes</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Successfully Delivered</span>
            <div className="stat-icon" style={{ background: 'var(--status-delivered-bg)', color: 'var(--status-delivered-text)' }}>
              <CheckCircle2 size={18} />
            </div>
          </div>
          <div className="stat-value">{stats?.delivered || shipments.filter((s) => s.status === 'Delivered').length}</div>
          <div className="stat-subtitle">100% verified with OTP & POD</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Reported Incidents</span>
            <div className="stat-icon" style={{ background: 'var(--status-delayed-bg)', color: 'var(--status-delayed-text)' }}>
              <AlertTriangle size={18} />
            </div>
          </div>
          <div className="stat-value">{delayedShipments.length}</div>
          <div className="stat-subtitle">Weather & highway slowdowns</div>
        </div>
      </div>

      {/* Grid: Active Live Consignments & Fleet Availability */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '24px' }}>
        {/* Active In-Transit Consignments */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3>Active In-Transit Consignments</h3>
              <p style={{ fontSize: '0.82rem' }}>Currently en route across agricultural distribution corridors</p>
            </div>
            <button
              className="btn btn-subtle btn-sm"
              onClick={() => setActiveTab('shipments')}
            >
              View All <ArrowRight size={14} />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', flex: 1 }}>
            {inTransitShipments.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                No active in-transit shipments right now.
              </div>
            ) : (
              inTransitShipments.map((s) => (
                <div
                  key={s.id}
                  style={{
                    padding: '14px',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    background: 'var(--bg-subtle)',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span style={{ fontWeight: 800, fontSize: '0.92rem' }}>{s.id}</span>
                      <span className={`badge badge-${s.status.toLowerCase().replace(' ', '-')}`}>
                        {s.status}
                      </span>
                      {s.requiresRefrigeration && (
                        <span className="badge" style={{ background: '#e0f2fe', color: '#0369a1' }}>
                          Cold Chain
                        </span>
                      )}
                    </div>
                    <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{s.orderId}</span>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.86rem' }}>
                    <div>
                      <strong>{s.produce}</strong> ({s.quantityKg}kg)
                    </div>
                    <div style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={13} color="var(--primary)" />
                      {s.pickupLocation.district} → {s.dropoffLocation.district}
                    </div>
                  </div>

                  {/* Progress Line */}
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '4px' }}>
                      <span>Driver: {s.assignedDriverName} ({s.vehicleNumber})</span>
                      <span>ETA: Today</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', background: 'var(--border-subtle)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: s.status === 'Dispatched' ? '40%' : '75%',
                          height: '100%',
                          background: 'linear-gradient(90deg, #10b981, #059669)',
                          borderRadius: '3px',
                        }}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '4px' }}>
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => onSelectShipmentForTracking(s.id)}
                    >
                      <Compass size={14} /> Live GPS Tracking
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Fleet & Logistics Transporters */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
            <div>
              <h3>Driver & Vehicle Fleet Status</h3>
              <p style={{ fontSize: '0.82rem' }}>Transporters registered for agri cargo</p>
            </div>
            <span className="badge" style={{ background: 'var(--primary-subtle)', color: 'var(--primary-text)' }}>
              {drivers.filter((d) => d.isAvailable).length} Available
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', flex: 1 }}>
            {drivers.map((d) => (
              <div
                key={d.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 14px',
                  border: '1px solid var(--border-light)',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-surface)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: 'var(--radius-md)',
                      background: d.isAvailable ? 'var(--status-delivered-bg)' : 'var(--status-transit-bg)',
                      color: d.isAvailable ? 'var(--status-delivered-text)' : 'var(--status-transit-text)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Truck size={18} />
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{d.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {d.vehicleType} • {d.vehicleNumber} ({d.capacityKg}kg max)
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span
                    className="badge"
                    style={{
                      background: d.isAvailable ? 'var(--status-delivered-bg)' : 'var(--status-pending-bg)',
                      color: d.isAvailable ? 'var(--status-delivered-text)' : 'var(--status-pending-text)',
                    }}
                  >
                    {d.isAvailable ? 'Available' : 'On Mission'}
                  </span>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    ★ {d.rating} ({d.completedTrips} trips)
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
