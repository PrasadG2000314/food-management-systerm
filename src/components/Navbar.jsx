import React, { useState } from 'react';
import {
  Sprout,
  Truck,
  Home,
  Layers,
  Search,
  Sun,
  Moon,
  ChevronDown,
  CheckCircle2,
  Lock,
  Shield,
} from 'lucide-react';

export default function Navbar({
  activeTab,
  setActiveTab,
  currentUser,
  onSwitchUser,
  allUsers,
  theme,
  setTheme,
  onOpenSearch,
  onOpenProfile,
  onOpenOverview,
  onOpenAdminLogin,
}) {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const toggleTheme = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
  };

  return (
    <header className="header-bar">
      <div className="header-inner">
        {/* Brand */}
        <div className="brand-wrap" onClick={() => setActiveTab('home')}>
          <div className="brand-logo-icon">
            <Sprout size={20} strokeWidth={2.4} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="brand-name">AgriBridge</span>
              <span className="brand-badge">Logistics Hub</span>
            </div>
          </div>
        </div>

        {/* Top Navigation Tabs: Home vs User & Logistics Management */}
        <nav className="nav-tabs">
          <button
            className={`nav-tab-btn ${activeTab === 'home' ? 'active' : ''}`}
            onClick={() => setActiveTab('home')}
          >
            <Home size={16} strokeWidth={activeTab === 'home' ? 2.3 : 1.8} />
            <span>Home</span>
          </button>

          <button
            className={`nav-tab-btn highlight ${activeTab === 'logistics' ? 'active' : ''}`}
            onClick={() => setActiveTab('logistics')}
          >
            <Truck size={16} color="var(--primary)" strokeWidth={activeTab === 'logistics' ? 2.3 : 1.8} />
            <span>User & Logistics Management</span>
          </button>

          <button
            className="nav-tab-btn"
            onClick={onOpenOverview}
            title="View 3-member team system architecture"
          >
            <Layers size={16} strokeWidth={1.8} />
            <span>Project Architecture</span>
          </button>
        </nav>

        {/* Actions */}
        <div className="header-actions">
          {/* Universal Search trigger */}
          <div className="search-wrapper" onClick={onOpenSearch} style={{ cursor: 'pointer' }}>
            <Search size={15} className="search-icon" />
            <input
              type="text"
              readOnly
              placeholder="Search users, shipments, drivers..."
              className="search-input"
              onClick={onOpenSearch}
            />
          </div>

          {/* Theme Toggle */}
          <button
            className="btn btn-secondary btn-sm"
            style={{ padding: '8px', borderRadius: 'var(--radius-full)' }}
            onClick={toggleTheme}
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {/* Admin Login Portal shortcut for Buyers / Non-Admins */}
          {currentUser?.role !== 'Admin' && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={onOpenAdminLogin}
              title="Sign in as Administrator with password"
              style={{ gap: '5px', fontSize: '0.78rem', padding: '6px 11px', borderRadius: 'var(--radius-full)' }}
            >
              <Lock size={13} color="var(--primary)" />
              <span>Admin Login</span>
            </button>
          )}

          {/* Role Switcher Dropdown */}
          <div style={{ position: 'relative' }}>
            <button
              className="btn btn-secondary btn-sm"
              style={{ gap: '6px', borderRadius: 'var(--radius-full)', padding: '5px 12px 5px 6px' }}
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
            >
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                alt={currentUser?.name}
                style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
              />
              <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{currentUser?.name?.split(' ')[0]}</span>
              <span className={`badge badge-role-${currentUser?.role?.toLowerCase()}`} style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                {currentUser?.role}
              </span>
              <ChevronDown size={14} style={{ color: 'var(--text-muted)' }} />
            </button>

            {roleMenuOpen && (
              <div
                style={{
                  position: 'absolute',
                  right: 0,
                  top: '100%',
                  marginTop: '8px',
                  width: '260px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: 'var(--shadow-lg)',
                  padding: '8px',
                  zIndex: 80,
                }}
              >
                <div style={{ padding: '6px 10px 8px', borderBottom: '1px solid var(--border-light)' }}>
                  <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700 }}>
                    Switch Demo Persona
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Test different permission levels
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', padding: '6px 0' }}>
                  {allUsers
                    ?.filter((user) => (currentUser?.role === 'Buyer' ? user.role !== 'Admin' : true))
                    .slice(0, 5)
                    .map((user) => {
                    const isSelected = user.id === currentUser?.id;
                    return (
                      <button
                        key={user.id}
                        onClick={() => {
                          onSwitchUser(user);
                          setRoleMenuOpen(false);
                        }}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          gap: '8px',
                          padding: '8px 10px',
                          background: isSelected ? 'var(--bg-subtle)' : 'transparent',
                          border: 'none',
                          borderRadius: 'var(--radius-md)',
                          cursor: 'pointer',
                          textAlign: 'left',
                          width: '100%',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', overflow: 'hidden' }}>
                          <img
                            src={user.avatar}
                            alt={user.name}
                            style={{ width: '28px', height: '28px', borderRadius: '50%', objectFit: 'cover' }}
                          />
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {user.name}
                            </div>
                            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                              {user.role} • {user.district}
                            </div>
                          </div>
                        </div>
                        {isSelected && <CheckCircle2 size={16} color="var(--primary)" />}
                      </button>
                    );
                  })}
                </div>

                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                  <button
                    className="btn btn-subtle btn-sm"
                    style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem' }}
                    onClick={() => {
                      setRoleMenuOpen(false);
                      onOpenProfile();
                    }}
                  >
                    Edit My Profile
                  </button>

                  {currentUser?.role !== 'Admin' && (
                    <button
                      className="btn btn-subtle btn-sm"
                      style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', color: 'var(--primary)' }}
                      onClick={() => {
                        setRoleMenuOpen(false);
                        onOpenAdminLogin();
                      }}
                    >
                      <Lock size={13} /> Admin Portal Sign-In
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
