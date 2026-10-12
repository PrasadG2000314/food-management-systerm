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
  LogIn,
  UserPlus,
  LogOut,
  User,
  KeyRound,
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
  onOpenAuth,
  onOpenAdminPassword,
  onLogout,
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

          {/* If Logged In: Show Admin shortcut (if not admin) + Account Menu */}
          {currentUser ? (
            <>
              {/* Admin Login shortcut if non-admin */}
              {currentUser.role !== 'Admin' && (
                <button
                  className="btn btn-secondary btn-sm"
                  onClick={() => onOpenAuth && onOpenAuth('login', 'Admin')}
                  title="Sign in as Administrator with password"
                  style={{ gap: '5px', fontSize: '0.78rem', padding: '6px 11px', borderRadius: 'var(--radius-full)' }}
                >
                  <Lock size={13} color="var(--primary)" />
                  <span>Admin Login</span>
                </button>
              )}

              {/* User Account / Role Menu */}
              <div style={{ position: 'relative' }}>
                <button
                  className="btn btn-secondary btn-sm"
                  style={{ gap: '6px', borderRadius: 'var(--radius-full)', padding: '5px 12px 5px 6px' }}
                  onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                >
                  <img
                    src={currentUser.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'}
                    alt={currentUser.name}
                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                  />
                  <span style={{ fontSize: '0.82rem', fontWeight: 600 }}>{currentUser.name?.split(' ')[0]}</span>
                  <span className={`badge badge-role-${currentUser.role?.toLowerCase()}`} style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                    {currentUser.role}
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
                      width: '270px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-lg)',
                      boxShadow: 'var(--shadow-lg)',
                      padding: '8px',
                      zIndex: 80,
                    }}
                  >
                    {/* User Info Header */}
                    <div style={{ padding: '8px 10px 10px', borderBottom: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {currentUser.name}
                      </div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                        {currentUser.email}
                      </div>
                      <div style={{ marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <span className={`badge badge-role-${currentUser.role?.toLowerCase()}`} style={{ fontSize: '0.68rem' }}>
                          {currentUser.role}
                        </span>
                        <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                          📍 {currentUser.district || 'Colombo'}
                        </span>
                      </div>
                    </div>

                    {/* Switch Persona Shortcuts */}
                    <div style={{ padding: '8px 4px 6px' }}>
                      <div style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-muted)', fontWeight: 700, padding: '2px 6px 4px' }}>
                        Quick Switch Persona
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                        {allUsers
                          ?.filter((u) => (currentUser.role === 'Buyer' ? u.role !== 'Admin' : true))
                          .slice(0, 4)
                          .map((u) => {
                            const isSelected = u.id === currentUser.id;
                            return (
                              <button
                                key={u.id}
                                onClick={() => {
                                  onSwitchUser(u);
                                  setRoleMenuOpen(false);
                                }}
                                style={{
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'space-between',
                                  gap: '8px',
                                  padding: '6px 8px',
                                  background: isSelected ? 'var(--bg-subtle)' : 'transparent',
                                  border: 'none',
                                  borderRadius: 'var(--radius-md)',
                                  cursor: 'pointer',
                                  textAlign: 'left',
                                  width: '100%',
                                }}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                                  <img
                                    src={u.avatar}
                                    alt={u.name}
                                    style={{ width: '24px', height: '24px', borderRadius: '50%', objectFit: 'cover' }}
                                  />
                                  <div style={{ minWidth: 0 }}>
                                    <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                      {u.name}
                                    </div>
                                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                                      {u.role}
                                    </div>
                                  </div>
                                </div>
                                {isSelected && <CheckCircle2 size={14} color="var(--primary)" />}
                              </button>
                            );
                          })}
                      </div>
                    </div>

                    {/* Account Actions */}
                    <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '6px', display: 'flex', flexDirection: 'column', gap: '2px' }}>
                      <button
                        className="btn btn-subtle btn-sm"
                        style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem' }}
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onOpenProfile();
                        }}
                      >
                        <User size={13} /> Edit My Profile
                      </button>

                      {currentUser.role === 'Admin' ? (
                        <button
                          className="btn btn-subtle btn-sm"
                          style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', color: 'var(--primary)' }}
                          onClick={() => {
                            setRoleMenuOpen(false);
                            onOpenAdminPassword && onOpenAdminPassword();
                          }}
                        >
                          <KeyRound size={13} /> Change Admin Password
                        </button>
                      ) : (
                        <button
                          className="btn btn-subtle btn-sm"
                          style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', color: 'var(--primary)' }}
                          onClick={() => {
                            setRoleMenuOpen(false);
                            onOpenAuth && onOpenAuth('login', 'Admin');
                          }}
                        >
                          <Lock size={13} /> Admin Portal Sign-In
                        </button>
                      )}

                      <button
                        className="btn btn-subtle btn-sm"
                        style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem' }}
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onOpenAuth && onOpenAuth('login');
                        }}
                      >
                        <LogIn size={13} /> Switch / Login Account
                      </button>

                      <button
                        className="btn btn-subtle btn-sm"
                        style={{ width: '100%', justifyContent: 'flex-start', fontSize: '0.8rem', color: '#ef4444' }}
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onLogout && onLogout();
                        }}
                      >
                        <LogOut size={13} /> Sign Out (Guest)
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            /* Logged Out / Guest Mode */
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onOpenAuth && onOpenAuth('login', 'Admin')}
                style={{ gap: '5px', fontSize: '0.78rem', padding: '6px 11px', borderRadius: 'var(--radius-full)' }}
                title="Sign in with Administrator credentials"
              >
                <Lock size={13} color="var(--primary)" />
                <span>Admin Login</span>
              </button>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => onOpenAuth && onOpenAuth('login')}
                style={{ gap: '5px', fontSize: '0.78rem', padding: '6px 13px', borderRadius: 'var(--radius-full)' }}
              >
                <LogIn size={13} />
                <span>Sign In</span>
              </button>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onOpenAuth && onOpenAuth('register')}
                style={{ gap: '5px', fontSize: '0.78rem', padding: '6px 12px', borderRadius: 'var(--radius-full)' }}
              >
                <UserPlus size={13} />
                <span>Register</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
