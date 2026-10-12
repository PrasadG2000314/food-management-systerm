import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export default function Toast({ toasts = [], onRemove }) {
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => {
        const Icon = toast.type === 'error' ? AlertCircle : toast.type === 'info' ? Info : CheckCircle2;
        const iconColor = toast.type === 'error' ? '#ef4444' : toast.type === 'info' ? '#3b82f6' : '#10b981';

        return (
          <div key={toast.id} className="toast">
            <Icon size={18} color={iconColor} style={{ flexShrink: 0 }} />
            <div style={{ flex: 1, fontSize: '0.86rem' }}>{toast.message}</div>
            <button
              onClick={() => onRemove(toast.id)}
              style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <X size={15} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
