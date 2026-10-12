import React from 'react';
import { X, CheckCircle2, Package, Truck, Layers, ArrowRight, UserCheck } from 'lucide-react';

export default function ProjectOverviewModal({ isOpen, onClose, onOpenMyPart }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '780px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h3 style={{ fontSize: '1.25rem' }}>AgriBridge IT Project Architecture</h3>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              SLIIT IT2150 - IT Project (2026) • 3-Member Workload Distribution
            </div>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Module 1 */}
          <div className="card" style={{ padding: '16px 20px', background: 'var(--bg-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Package size={18} color="var(--text-muted)" />
                <strong style={{ fontSize: '1rem' }}>1. Products & Order Management</strong>
              </div>
              <span className="badge" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                Core E-Commerce
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.5 }}>
              Produce inventory catalog, stock tracking, buyer shopping cart, payment integration, email receipts, and inventory report generator.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Assigned Member: <strong>Sachintha A.H.U.</strong> (IT21273308)
            </div>
          </div>

          {/* Module 2 - User & Logistics (The User's Part - Highlighted) */}
          <div
            className="card"
            style={{
              padding: '18px 20px',
              border: '2px solid var(--primary)',
              background: 'var(--bg-surface)',
              boxShadow: 'var(--shadow-glow)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Truck size={20} color="var(--primary)" />
                <strong style={{ fontSize: '1.1rem', color: 'var(--primary)' }}>
                  2. User & Logistics Management (My Component)
                </strong>
              </div>
              <span className="badge badge-delivered" style={{ fontWeight: 800 }}>
                Active & Complete
              </span>
            </div>
            <p style={{ fontSize: '0.86rem', lineHeight: 1.5, color: 'var(--text-primary)' }}>
              Streamlined user access control (Admin, Farmer, Buyer, Driver), real-time order dispatching, nearest driver auto-matching algorithm, live GPS tracking with milestone timeline, 3-way Proof of Delivery (4-digit OTP, digital signature pad, photo verification), and automated logistics reports.
            </p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', borderTop: '1px solid var(--border-light)', paddingTop: '10px' }}>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Developer: <strong>Wanni Arachchi W.A.D.P.</strong> (IT22601056)
              </div>
              <button
                className="btn btn-primary btn-sm"
                onClick={() => {
                  onClose();
                  onOpenMyPart();
                }}
              >
                Launch Module <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Module 3 */}
          <div className="card" style={{ padding: '16px 20px', background: 'var(--bg-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Layers size={18} color="var(--text-muted)" />
                <strong style={{ fontSize: '1rem' }}>3. Buyer/Seller Request & Posts Management</strong>
              </div>
              <span className="badge" style={{ background: 'var(--bg-surface)', color: 'var(--text-muted)' }}>
                Matching Engine
              </span>
            </div>
            <p style={{ fontSize: '0.84rem', lineHeight: 1.5 }}>
              Wholesale buying & selling post management, job vacancy listings, admin verification workflows, and automated request-to-seller matching algorithm.
            </p>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '8px' }}>
              Assigned Member: <strong>Sepala S.N.</strong> (IT21232572)
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onClose}>
            Close
          </button>
          <button
            className="btn btn-primary"
            onClick={() => {
              onClose();
              onOpenMyPart();
            }}
          >
            Enter User & Logistics Management
          </button>
        </div>
      </div>
    </div>
  );
}
