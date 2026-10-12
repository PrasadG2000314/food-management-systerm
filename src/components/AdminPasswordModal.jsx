import React, { useState } from 'react';
import { X, Lock, Key, ShieldCheck, Eye, EyeOff, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function AdminPasswordModal({
  isOpen,
  onClose,
  adminUser,
  onChangePassword,
  showToast,
}) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (newPassword.length < 6) {
      setError('New password must be at least 6 characters long.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setError('New password and confirmation password do not match.');
      return;
    }

    const res = await onChangePassword(adminUser?.id || 'usr-001', currentPassword, newPassword);
    if (res.success) {
      setSuccess('Admin password updated successfully! Encrypted with bcrypt.');
      showToast('Admin password updated successfully with bcrypt encryption!');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setTimeout(() => {
        onClose();
        setSuccess('');
      }, 1500);
    } else {
      setError(res.message || 'Failed to update password');
    }
  };

  const handleQuickFill = () => {
    setCurrentPassword('Admin@2026');
    setNewPassword('Admin@2026_Secure');
    setConfirmPassword('Admin@2026_Secure');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-subtle)',
                color: 'var(--primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Lock size={18} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.15rem' }}>Admin Security & Password</h3>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Bcrypt encrypted credential management for Administrator
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
            {/* Admin identity badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '12px 16px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                marginBottom: '16px',
                border: '1px solid var(--border-subtle)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <img
                  src={adminUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                  alt="Admin"
                  style={{ width: '34px', height: '34px', borderRadius: '50%', objectFit: 'cover' }}
                />
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{adminUser?.name || 'Dilan Wanni Arachchi'}</div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{adminUser?.email || 'dilan@agribridge.lk'}</div>
                </div>
              </div>
              <span className="badge badge-role-admin">System Admin</span>
            </div>

            {/* Default Password Callout / Demo Note */}
            <div
              style={{
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--primary-subtle)',
                border: '1px solid var(--primary-border)',
                marginBottom: '16px',
                fontSize: '0.78rem',
                color: 'var(--primary-text)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <strong>Default Admin Password:</strong> <code style={{ fontFamily: 'var(--font-mono)' }}>Admin@2026</code>
              </div>
              <button
                type="button"
                onClick={handleQuickFill}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'var(--primary)',
                  fontWeight: 700,
                  fontSize: '0.75rem',
                  cursor: 'pointer',
                  textDecoration: 'underline',
                }}
              >
                Auto-Fill Sample
              </button>
            </div>

            {error && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--status-delayed-bg)',
                  color: 'var(--status-delayed-text)',
                  border: '1px solid var(--status-delayed-border)',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <AlertCircle size={15} />
                <span>{error}</span>
              </div>
            )}

            {success && (
              <div
                style={{
                  padding: '10px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--status-delivered-bg)',
                  color: 'var(--status-delivered-text)',
                  border: '1px solid var(--status-delivered-border)',
                  marginBottom: '16px',
                  fontSize: '0.82rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <CheckCircle2 size={15} />
                <span>{success}</span>
              </div>
            )}

            {/* Current Password */}
            <div className="input-group">
              <label className="input-label">Current Admin Password</label>
              <div style={{ position: 'relative' }}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  className="input-control"
                  style={{ paddingRight: '38px' }}
                  placeholder="Enter current password (Default: Admin@2026)"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '10px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    color: 'var(--text-muted)',
                  }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* New Password */}
            <div className="input-group">
              <label className="input-label">New Admin Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-control"
                placeholder="Enter strong new password (min. 6 characters)"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            {/* Confirm New Password */}
            <div className="input-group">
              <label className="input-label">Confirm New Password</label>
              <input
                type={showPassword ? 'text' : 'password'}
                className="input-control"
                placeholder="Re-enter new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <Key size={15} /> Update Admin Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
