import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  Eye,
  EyeOff,
  X,
  Sparkles,
  ArrowRight,
  AlertCircle,
  KeyRound,
} from 'lucide-react';
import { api } from '../services/api';

export default function AdminLoginModal({
  isOpen,
  onClose,
  onAdminLoginSuccess,
  showToast,
  adminUser,
}) {
  const [email, setEmail] = useState('dilan@agribridge.lk');
  const [password, setPassword] = useState('Admin@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleFillDemoCredentials = () => {
    setEmail('dilan@agribridge.lk');
    setPassword('Admin@2026');
    setErrorMsg('');
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');
    setLoading(true);

    try {
      // Authenticate against API or fallback
      const verifyRes = await api.verifyAdminPassword(password);
      if (verifyRes.success) {
        setLoading(false);
        if (showToast) {
          showToast('Authenticated successfully as System Administrator!', 'success');
        }
        if (onAdminLoginSuccess) {
          onAdminLoginSuccess(adminUser || {
            id: 'usr-001',
            name: 'Dilan Wanni Arachchi',
            email: 'dilan@agribridge.lk',
            role: 'Admin',
            district: 'Colombo',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
          });
        }
        onClose();
      } else {
        setLoading(false);
        setErrorMsg(verifyRes.message || 'Incorrect admin password. Access denied.');
        if (showToast) {
          showToast('Invalid administrator password.', 'error');
        }
      }
    } catch (err) {
      setLoading(false);
      setErrorMsg('Authentication request failed. Please check credentials.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        style={{ maxWidth: '480px', overflow: 'hidden' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div
          style={{
            padding: '24px 28px 16px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.06) 0%, rgba(16, 185, 129, 0.1) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
              }}
            >
              <ShieldCheck size={24} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0 }}>
                Administrator Portal
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                Secure Access for System & Logistics Admin
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-subtle btn-sm"
            style={{ padding: '6px', borderRadius: '50%' }}
            onClick={onClose}
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleLoginSubmit}>
          <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Security note */}
            <div
              style={{
                padding: '12px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--bg-subtle)',
                border: '1px solid var(--border-subtle)',
                fontSize: '0.8rem',
                color: 'var(--text-secondary)',
                lineHeight: 1.45,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
              }}
            >
              <Lock size={16} color="var(--primary)" style={{ marginTop: '2px', flexShrink: 0 }} />
              <div>
                Protected administrator console with <strong>bcryptjs</strong> encryption. Non-administrative users (such as Buyers) are restricted from accessing system configurations.
              </div>
            </div>

            {/* Error display */}
            {errorMsg && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--status-delayed-bg)',
                  border: '1px solid var(--status-delayed-border)',
                  color: 'var(--status-delayed-text)',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Admin Email Input */}
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Mail size={14} color="var(--text-muted)" />
                <span>Admin Account Email</span>
              </label>
              <input
                type="email"
                className="input-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="dilan@agribridge.lk"
                required
                style={{ height: '42px', fontSize: '0.88rem' }}
              />
            </div>

            {/* Admin Password Input */}
            <div className="input-group" style={{ margin: 0 }}>
              <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <KeyRound size={14} color="var(--text-muted)" />
                <span>Admin Password</span>
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter administrator password..."
                  required
                  style={{ height: '42px', fontSize: '0.88rem', paddingRight: '40px' }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                    padding: '2px',
                  }}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Quick Demo Helper Box */}
            <div
              style={{
                background: 'var(--primary-subtle)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                padding: '12px 14px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary-text)' }}>
                  Default Evaluation Credentials
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  <code>dilan@agribridge.lk</code> • <code>Admin@2026</code>
                </div>
              </div>

              <button
                type="button"
                className="btn btn-secondary btn-sm"
                onClick={handleFillDemoCredentials}
                style={{ fontSize: '0.74rem', padding: '5px 10px', whiteSpace: 'nowrap' }}
              >
                <Sparkles size={12} color="var(--primary)" /> Auto-Fill
              </button>
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '16px 28px',
              borderTop: '1px solid var(--border-subtle)',
              background: 'var(--bg-subtle)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '10px',
            }}
          >
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
              style={{ minWidth: '150px' }}
            >
              {loading ? (
                'Verifying...'
              ) : (
                <>
                  <Lock size={15} /> Sign In as Admin
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
