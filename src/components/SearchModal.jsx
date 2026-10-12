import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Truck, User, ArrowRight, MapPin, Tag } from 'lucide-react';

export default function SearchModal({
  isOpen,
  onClose,
  users = [],
  shipments = [],
  drivers = [],
  onSelectShipment,
  onSelectUser,
}) {
  const [query, setQuery] = useState('');
  const [filterType, setFilterType] = useState('ALL');
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Filtered shipments
  const matchedShipments = shipments.filter(
    (s) =>
      !q ||
      s.id.toLowerCase().includes(q) ||
      s.orderId.toLowerCase().includes(q) ||
      s.produce.toLowerCase().includes(q) ||
      s.farmerName.toLowerCase().includes(q) ||
      s.buyerName.toLowerCase().includes(q) ||
      s.pickupLocation?.district?.toLowerCase().includes(q) ||
      s.dropoffLocation?.district?.toLowerCase().includes(q)
  );

  // Filtered users
  const matchedUsers = users.filter(
    (u) =>
      !q ||
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.phone.includes(q) ||
      u.role.toLowerCase().includes(q) ||
      u.district?.toLowerCase().includes(q)
  );

  // Filtered drivers
  const matchedDrivers = drivers.filter(
    (d) =>
      !q ||
      d.name.toLowerCase().includes(q) ||
      d.vehicleNumber.toLowerCase().includes(q) ||
      d.vehicleType.toLowerCase().includes(q) ||
      d.currentLocation.toLowerCase().includes(q)
  );

  const showShipments = filterType === 'ALL' || filterType === 'SHIPMENTS';
  const showUsers = filterType === 'ALL' || filterType === 'USERS';
  const showDrivers = filterType === 'ALL' || filterType === 'DRIVERS';

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '680px', maxHeight: '80vh', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)' }}>
          <Search size={20} color="var(--primary)" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search shipments, orders, farmers, drivers, routes..."
            style={{
              flex: 1,
              border: 'none',
              background: 'transparent',
              fontSize: '1.05rem',
              color: 'var(--text-primary)',
              outline: 'none',
              fontFamily: 'inherit',
            }}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
            >
              <X size={18} />
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '8px', padding: '10px 20px', background: 'var(--bg-subtle)', borderBottom: '1px solid var(--border-light)' }}>
          {['ALL', 'SHIPMENTS', 'USERS', 'DRIVERS'].map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              style={{
                border: 'none',
                background: filterType === type ? 'var(--bg-surface)' : 'transparent',
                color: filterType === type ? 'var(--text-primary)' : 'var(--text-muted)',
                fontWeight: filterType === type ? 700 : 500,
                fontSize: '0.78rem',
                padding: '4px 12px',
                borderRadius: 'var(--radius-full)',
                cursor: 'pointer',
                boxShadow: filterType === type ? 'var(--shadow-sm)' : 'none',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div style={{ padding: '12px 20px', overflowY: 'auto', maxHeight: '55vh', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {showShipments && matchedShipments.length > 0 && (
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
                Shipments & Consignments ({matchedShipments.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {matchedShipments.map((s) => (
                  <div
                    key={s.id}
                    onClick={() => {
                      onSelectShipment(s.id);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '32px', height: '32px', borderRadius: 'var(--radius-sm)', background: 'var(--primary-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--primary)' }}>
                        <Truck size={17} />
                      </div>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>{s.id}</span>
                          <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>• {s.produce} ({s.quantityKg}kg)</span>
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <MapPin size={12} /> {s.pickupLocation.district} → {s.dropoffLocation.district}
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span className={`badge badge-${s.status.toLowerCase().replace(' ', '-')}`}>
                        {s.status}
                      </span>
                      <ArrowRight size={15} color="var(--text-muted)" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {showUsers && matchedUsers.length > 0 && (
            <div>
              <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, marginBottom: '8px' }}>
                Users & Profiles ({matchedUsers.length})
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {matchedUsers.map((u) => (
                  <div
                    key={u.id}
                    onClick={() => {
                      onSelectUser(u);
                      onClose();
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 12px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={u.avatar} alt={u.name} style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.88rem' }}>{u.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{u.email} • {u.district}</div>
                      </div>
                    </div>
                    <span className={`badge badge-role-${u.role.toLowerCase()}`}>
                      {u.role}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {matchedShipments.length === 0 && matchedUsers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '36px 0', color: 'var(--text-muted)' }}>
              No matches found for "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
