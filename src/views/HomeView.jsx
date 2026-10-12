import React from 'react';
import {
  Sprout,
  Truck,
  ShieldCheck,
  Compass,
  FileCheck2,
  FileBarChart,
  Users,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle,
  Package,
  Layers,
  ThermometerSnowflake,
} from 'lucide-react';

export default function HomeView({ onOpenLogistics, stats, currentUser, onOpenOverview }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '44px' }}>
      {/* Hero Section */}
      <section
        style={{
          position: 'relative',
          padding: '56px 40px',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          overflow: 'hidden',
        }}
      >
        <div style={{ maxWidth: '820px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-subtle)',
              border: '1px solid var(--primary-border)',
              color: 'var(--primary-text)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '20px',
            }}
          >
            <Sparkles size={14} />
            <span>Sri Lanka IT2150 Project • User & Logistics Management</span>
          </div>

          <h1
            style={{
              fontSize: '2.6rem',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.15,
              marginBottom: '20px',
              color: 'var(--text-primary)',
            }}
          >
            Empowering Farmers & Buyers with <span style={{ color: 'var(--primary)' }}>Intelligent Agri Logistics</span>.
          </h1>

          <p
            style={{
              fontSize: '1.12rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '32px',
              maxWidth: '680px',
            }}
          >
            AgriBridge transforms traditional agricultural supply chains across Sri Lanka by eliminating middlemen, 
            optimizing delivery routes from highland and dry-zone farms, and delivering real-time tracked produce.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onOpenLogistics('dashboard')}
            >
              Open User & Logistics Management <ArrowRight size={18} />
            </button>

            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onOpenLogistics('tracking')}
            >
              <Compass size={18} /> Track Consignment
            </button>

            <button
              className="btn btn-secondary btn-lg"
              onClick={() => onOpenLogistics('pod')}
            >
              <FileCheck2 size={18} /> Driver POD Terminal
            </button>
          </div>
        </div>

        {/* Ambient background decoration */}
        <div
          style={{
            position: 'absolute',
            right: '-40px',
            bottom: '-40px',
            opacity: 0.05,
            pointerEvents: 'none',
          }}
        >
          <Truck size={360} strokeWidth={1} />
        </div>
      </section>

      {/* Key Metric Indicators */}
      <section className="stats-grid">
        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">On-Time Transit Rate</span>
            <div className="stat-icon" style={{ background: 'var(--primary-subtle)', color: 'var(--primary)' }}>
              <CheckCircle size={18} />
            </div>
          </div>
          <div className="stat-value">{stats?.onTimeDeliveryRate || '98.5%'}</div>
          <div className="stat-subtitle">Across 25 islandwide agricultural corridors</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Active Shipments</span>
            <div className="stat-icon" style={{ background: '#eff6ff', color: '#2563eb' }}>
              <Truck size={18} />
            </div>
          </div>
          <div className="stat-value">{(stats?.inTransit || 0) + (stats?.pendingAssignment || 0)}</div>
          <div className="stat-subtitle">{stats?.inTransit || 0} in-transit, {stats?.pendingAssignment || 0} pending dispatch</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Verified Transporters</span>
            <div className="stat-icon" style={{ background: '#fff7ed', color: '#ea580c' }}>
              <Users size={18} />
            </div>
          </div>
          <div className="stat-value">{stats?.activeDrivers + stats?.availableDrivers || 4}</div>
          <div className="stat-subtitle">{stats?.availableDrivers || 2} ready for immediate dispatch</div>
        </div>

        <div className="stat-card">
          <div className="stat-card-header">
            <span className="stat-label">Cold-Chain Protected</span>
            <div className="stat-icon" style={{ background: '#ede9fe', color: '#7c3aed' }}>
              <ThermometerSnowflake size={18} />
            </div>
          </div>
          <div className="stat-value">4°C - 8°C</div>
          <div className="stat-subtitle">Nuwara Eliya & Dambulla temperature verified</div>
        </div>
      </section>

      {/* Module Overview from Project Proposal */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '20px', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
              System Architecture
            </div>
            <h2 style={{ fontSize: '1.6rem', marginTop: '4px' }}>AgriBridge Core Modules</h2>
            <p style={{ marginTop: '4px' }}>
              Structured around our 3-member IT Project workload distribution as defined in the SLIIT project proposal:
            </p>
          </div>
          <button className="btn btn-secondary btn-sm" onClick={onOpenOverview}>
            <Layers size={14} /> Full Project Architecture
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {/* Module 1 */}
          <div className="card" style={{ opacity: 0.85, background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Module 01
              </span>
              <Package size={22} color="var(--text-muted)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Products & Order Management</h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
              Farmer produce cataloging, out-of-stock monitoring, buyer shopping cart, payment gateway, and inventory reports.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
              Team Member: <strong>Sachintha A.H.U.</strong> (IT21273308)
            </div>
          </div>

          {/* Module 2 - User & Logistics (Highlighted and Active) */}
          <div
            className="card"
            style={{
              borderColor: 'var(--primary)',
              boxShadow: 'var(--shadow-glow)',
              position: 'relative',
              background: 'var(--bg-surface)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge badge-delivered" style={{ fontWeight: 800 }}>
                Module 02 • My Component
              </span>
              <Truck size={22} color="var(--primary)" />
            </div>
            <h3 style={{ fontSize: '1.25rem', marginBottom: '10px', color: 'var(--primary)' }}>
              User & Logistics Management
            </h3>
            <p style={{ fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '16px', color: 'var(--text-primary)' }}>
              All logistics and user access features combined: Admin/Farmer/Buyer/Driver authorization, nearest driver auto-matching, real-time GPS tracking, 3-way Proof of Delivery (POD), and report generator.
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '16px' }}>
              <span className="badge badge-role-admin">Role Control</span>
              <span className="badge badge-assigned">Auto-Dispatch</span>
              <span className="badge badge-in-transit">Live Tracker</span>
              <span className="badge badge-delivered">OTP POD</span>
              <span className="badge" style={{ background: '#ede9fe', color: '#6d28d9' }}>Reports</span>
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-secondary)', borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>Developer: <strong>Wanni Arachchi W.A.D.P.</strong></span>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => onOpenLogistics('dashboard')}
              >
                Enter Module <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Module 3 */}
          <div className="card" style={{ opacity: 0.85, background: 'var(--bg-surface)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <span className="badge" style={{ background: 'var(--bg-subtle)', color: 'var(--text-muted)' }}>
                Module 03
              </span>
              <Layers size={22} color="var(--text-muted)" />
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '10px' }}>Buyer/Seller Request & Posts</h3>
            <p style={{ fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '16px' }}>
              Custom wholesale buying/selling requests, job posts, admin verification pipeline, and automated matching algorithm.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-light)', paddingTop: '12px' }}>
              Team Member: <strong>Sepala S.N.</strong> (IT21232572)
            </div>
          </div>
        </div>
      </section>

      {/* All Sub-Parts of User & Logistics Management */}
      <section className="card" style={{ padding: '36px' }}>
        <div style={{ maxWidth: '780px', marginBottom: '32px' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
            My Component Sub-Parts
          </div>
          <h2 style={{ fontSize: '1.6rem', marginTop: '4px', marginBottom: '8px' }}>
            Features Inside User & Logistics Management
          </h2>
          <p>
            Every functional requirement defined on page 7 of our project proposal is accessible inside the User & Logistics Management hub:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div
            style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
            onClick={() => onOpenLogistics('dashboard')}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <Truck size={18} />
            </div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>1. Overview Dashboard</h4>
            <p style={{ fontSize: '0.82rem' }}>Fleet status, live in-transit pipelines, and assignment KPIs.</p>
          </div>

          <div
            style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
            onClick={() => onOpenLogistics('shipments')}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--status-assigned-bg)', color: 'var(--status-assigned-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <Sparkles size={18} />
            </div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>2. Shipments & Dispatch</h4>
            <p style={{ fontSize: '0.82rem' }}>Consignment booking, proximity driver auto-match algorithm, and lifecycle updates.</p>
          </div>

          <div
            style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
            onClick={() => onOpenLogistics('tracking')}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--status-transit-bg)', color: 'var(--status-transit-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <Compass size={18} />
            </div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>3. Live GPS Tracking</h4>
            <p style={{ fontSize: '0.82rem' }}>Interactive Sri Lanka corridor route visualizer, sensor logs, and milestone audit trail.</p>
          </div>

          <div
            style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
            onClick={() => onOpenLogistics('pod')}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: 'var(--status-delivered-bg)', color: 'var(--status-delivered-text)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <FileCheck2 size={18} />
            </div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>4. Proof of Delivery (POD)</h4>
            <p style={{ fontSize: '0.82rem' }}>4-digit customer OTP, touch signature pad, produce photo check, and certificate generator.</p>
          </div>

          <div
            style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
            onClick={() => onOpenLogistics('reports')}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: '#ede9fe', color: '#6d28d9', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <FileBarChart size={18} />
            </div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>5. Logistics Reports</h4>
            <p style={{ fontSize: '0.82rem' }}>Completed deliveries, delayed shipments, and driver metrics with CSV and Print export.</p>
          </div>

          <div
            style={{ padding: '16px', borderRadius: 'var(--radius-md)', background: 'var(--bg-subtle)', border: '1px solid var(--border-subtle)', cursor: 'pointer' }}
            onClick={() => onOpenLogistics('users')}
          >
            <div style={{ width: '36px', height: '36px', borderRadius: 'var(--radius-md)', background: '#f3e8ff', color: '#6b21a8', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
              <Users size={18} />
            </div>
            <h4 style={{ fontSize: '0.98rem', marginBottom: '4px' }}>6. User Access & Roles</h4>
            <p style={{ fontSize: '0.82rem' }}>Admin directory, 4-tier permission switches, status toggles, and user registration.</p>
          </div>
        </div>
      </section>

      {/* Quick Launch CTA */}
      <section
        style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '28px 32px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '20px',
          border: '1px solid var(--border-subtle)',
        }}
      >
        <div>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>Explore User & Logistics Management</h3>
          <p style={{ fontSize: '0.88rem' }}>
            Logged in as <strong>{currentUser?.name}</strong> ({currentUser?.role}). Test all permission tiers anytime.
          </p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={() => onOpenLogistics('dashboard')}>
          Open My Module <ArrowRight size={18} />
        </button>
      </section>
    </div>
  );
}
