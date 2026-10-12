import React, { useState } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  X,
  Sparkles,
  ArrowRight,
  AlertCircle,
  KeyRound,
  Truck,
  ShoppingBag,
  Sprout,
  Shield,
  UserPlus,
  LogIn,
  CheckCircle2,
} from 'lucide-react';
import { api } from '../services/api';

const DEMO_ACCOUNTS = [
  {
    role: 'Admin',
    name: 'Dilan Wanni Arachchi',
    email: 'dilan@agribridge.lk',
    password: 'Admin@2026',
    icon: ShieldCheck,
    badge: 'Security & Logistics Admin',
    desc: 'Full administrative access, user directory, driver fleet control & system security.',
    color: '#059669',
  },
  {
    role: 'Buyer',
    name: 'Peshala Mendis',
    email: 'peshala.supermarket@agribridge.lk',
    password: 'Buyer@2026',
    icon: ShoppingBag,
    badge: 'Supermarket Buyer',
    desc: 'Interactive food marketplace, cart ordering, dispatch requests & live delivery tracking.',
    color: '#0284c7',
  },
  {
    role: 'Seller',
    name: 'Sunil Bandara',
    email: 'sunil.farm@agribridge.lk',
    password: 'Farmer@2026',
    icon: Sprout,
    badge: 'Highland Organic Farmer',
    desc: 'Farm harvest inventory, produce listings, wholesale orders & cold-chain booking.',
    color: '#16a34a',
  },
  {
    role: 'Driver',
    name: 'Chathura Dias',
    email: 'chathura.logistics@agribridge.lk',
    password: 'Driver@2026',
    icon: Truck,
    badge: 'Logistics Fleet Driver',
    desc: 'Assigned deliveries, route dispatching, GPS coordinates & digital Proof of Delivery.',
    color: '#ea580c',
  },
];

const SRI_LANKA_DISTRICTS = [
  'Colombo',
  'Gampaha',
  'Kalutara',
  'Kandy',
  'Matale',
  'Nuwara Eliya',
  'Galle',
  'Matara',
  'Hambantota',
  'Jaffna',
  'Kurunegala',
  'Puttalam',
  'Anuradhapura',
  'Polonnaruwa',
  'Badulla',
  'Monaragala',
  'Ratnapura',
  'Kegalle',
];

export default function AuthModal({
  isOpen,
  onClose,
  initialTab = 'login', // 'login' | 'register'
  initialRole = null, // 'Admin' | 'Buyer' | 'Seller' | 'Driver'
  onLoginSuccess,
  showToast,
  users = [],
}) {
  const [activeTab, setActiveTab] = useState(initialTab); // 'login' | 'register'
  
  // Login form state
  const [selectedRole, setSelectedRole] = useState(initialRole || 'Admin');
  const [loginEmail, setLoginEmail] = useState(
    initialRole === 'Admin' || !initialRole ? 'dilan@agribridge.lk' : 'peshala.supermarket@agribridge.lk'
  );
  const [loginPassword, setLoginPassword] = useState(
    initialRole === 'Admin' || !initialRole ? 'Admin@2026' : 'Buyer@2026'
  );
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // Register form state
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('Buyer');
  const [regDistrict, setRegDistrict] = useState('Colombo');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regOrgName, setRegOrgName] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);

  // Common state
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  // Select demo account helper
  const handleSelectDemoAccount = (acc) => {
    setSelectedRole(acc.role);
    setLoginEmail(acc.email);
    setLoginPassword(acc.password);
    setErrorMessage('');
  };

  // One-click login for demo account
  const handleQuickLogin = async (acc) => {
    setSelectedRole(acc.role);
    setLoginEmail(acc.email);
    setLoginPassword(acc.password);
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await api.login(acc.email, acc.password, acc.role);
      setLoading(false);
      if (res.success && res.user) {
        if (showToast) {
          showToast(`Signed in successfully as ${res.user.name} (${res.user.role})!`, 'success');
        }
        if (onLoginSuccess) {
          onLoginSuccess(res.user, res.token);
        }
        onClose();
      } else {
        setErrorMessage(res.message || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Could not connect to authentication server.');
    }
  };

  // Standard Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setLoading(true);

    try {
      const res = await api.login(loginEmail, loginPassword, selectedRole);
      setLoading(false);

      if (res.success && res.user) {
        if (showToast) {
          showToast(`Welcome back, ${res.user.name}! (${res.user.role})`, 'success');
        }
        if (onLoginSuccess) {
          onLoginSuccess(res.user, res.token);
        }
        onClose();
      } else {
        setErrorMessage(res.message || 'Invalid email or password. Access denied.');
        if (showToast) {
          showToast(res.message || 'Invalid credentials.', 'error');
        }
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Login request failed. Please check your credentials.');
    }
  };

  // Register Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (regPassword !== regConfirmPassword) {
      setErrorMessage('Passwords do not match. Please re-enter.');
      return;
    }
    if (regPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const payload = {
        name: regName,
        email: regEmail,
        phone: regPhone,
        password: regPassword,
        role: regRole,
        district: regDistrict,
        businessName: regRole === 'Buyer' ? regOrgName : undefined,
        farmName: regRole === 'Seller' ? regOrgName : undefined,
        vehicleType: regRole === 'Driver' ? regOrgName || '2.5T Covered Lorry' : undefined,
      };

      const res = await api.registerUser(payload);
      setLoading(false);

      if (res.success && res.user) {
        if (showToast) {
          showToast(`Account created successfully! Welcome to AgriBridge, ${res.user.name}.`, 'success');
        }
        if (onLoginSuccess) {
          onLoginSuccess(res.user, res.token);
        }
        onClose();
      } else {
        setErrorMessage(res.message || 'Registration failed. Email might already be in use.');
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage('Error registering account. Please try again.');
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{ zIndex: 9999 }}>
      <div
        className="modal-content"
        style={{
          maxWidth: '560px',
          maxHeight: '92vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          borderRadius: 'var(--radius-xl)',
          boxShadow: '0 24px 48px -12px rgba(0, 0, 0, 0.25)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Branding */}
        <div
          style={{
            padding: '20px 24px 16px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.12) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 12px rgba(5, 150, 105, 0.35)',
              }}
            >
              <ShieldCheck size={22} />
            </div>
            <div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, letterSpacing: '-0.02em' }}>
                AgriBridge Portal Login
              </h2>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                User & Logistics Management Authentication
              </div>
            </div>
          </div>

          <button
            type="button"
            className="btn btn-subtle btn-sm"
            style={{ padding: '6px', borderRadius: '50%' }}
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={18} />
          </button>
        </div>

        {/* Tab Toggle: Sign In vs Register */}
        <div
          style={{
            display: 'flex',
            borderBottom: '1px solid var(--border-subtle)',
            background: 'var(--bg-subtle)',
            padding: '4px 24px 0',
            gap: '8px',
          }}
        >
          <button
            type="button"
            onClick={() => {
              setActiveTab('login');
              setErrorMessage('');
            }}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'login' ? 700 : 500,
              color: activeTab === 'login' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'login' ? '2.5px solid var(--primary)' : '2.5px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <LogIn size={15} /> Sign In
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('register');
              setErrorMessage('');
            }}
            style={{
              padding: '10px 18px',
              border: 'none',
              background: 'transparent',
              fontSize: '0.88rem',
              fontWeight: activeTab === 'register' ? 700 : 500,
              color: activeTab === 'register' ? 'var(--primary)' : 'var(--text-muted)',
              borderBottom: activeTab === 'register' ? '2.5px solid var(--primary)' : '2.5px solid transparent',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <UserPlus size={15} /> Create Account
          </button>
        </div>

        {/* Scrollable Form Body */}
        <div style={{ padding: '20px 24px', overflowY: 'auto', flex: 1 }}>
          {/* Error Banner */}
          {errorMessage && (
            <div
              style={{
                marginBottom: '16px',
                padding: '10px 14px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--status-delayed-bg)',
                border: '1px solid var(--status-delayed-border)',
                color: 'var(--status-delayed-text)',
                fontSize: '0.84rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <AlertCircle size={16} style={{ flexShrink: 0 }} />
              <span>{errorMessage}</span>
            </div>
          )}

          {activeTab === 'login' ? (
            /* ================= SIGN IN TAB ================= */
            <form onSubmit={handleLoginSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Highlight Box: Admin Credentials Reminder */}
              <div
                style={{
                  background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.04) 100%)',
                  border: '1px solid var(--primary-border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '12px 14px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Shield size={14} color="var(--primary)" />
                    <span style={{ fontSize: '0.74rem', textTransform: 'uppercase', fontWeight: 800, color: 'var(--primary-text)' }}>
                      Admin Password
                    </span>
                  </div>
                  <div style={{ fontSize: '0.82rem', marginTop: '3px', color: 'var(--text-secondary)' }}>
                    Email: <code style={{ fontWeight: 700 }}>dilan@agribridge.lk</code> • Password: <code style={{ fontWeight: 700, color: 'var(--primary-text)' }}>Admin@2026</code>
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-secondary btn-sm"
                  onClick={() => handleSelectDemoAccount(DEMO_ACCOUNTS[0])}
                  style={{ fontSize: '0.74rem', padding: '5px 10px', whiteSpace: 'nowrap' }}
                  title="Auto-fill Administrator credentials"
                >
                  <Sparkles size={12} color="var(--primary)" /> Fill Admin
                </button>
              </div>

              {/* Demo Persona Quick Selectors */}
              <div>
                <label className="input-label" style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Quick Login as Platform Persona:
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginTop: '6px' }}>
                  {DEMO_ACCOUNTS.map((acc) => {
                    const isSelected = loginEmail.toLowerCase() === acc.email.toLowerCase();
                    const IconComponent = acc.icon;
                    return (
                      <div
                        key={acc.role}
                        onClick={() => handleSelectDemoAccount(acc)}
                        style={{
                          padding: '10px 12px',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                          cursor: 'pointer',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 }}>
                          <div
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: 'var(--radius-sm)',
                              background: `${acc.color}15`,
                              color: acc.color,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0,
                            }}
                          >
                            <IconComponent size={15} />
                          </div>
                          <div style={{ minWidth: 0 }}>
                            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {acc.role}
                            </div>
                            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                              {acc.name.split(' ')[0]}
                            </div>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleQuickLogin(acc);
                          }}
                          style={{
                            border: 'none',
                            background: isSelected ? 'var(--primary)' : 'var(--bg-surface)',
                            color: isSelected ? '#ffffff' : 'var(--text-primary)',
                            padding: '3px 7px',
                            borderRadius: 'var(--radius-sm)',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '3px',
                            boxShadow: 'var(--shadow-xs)',
                          }}
                          title={`Log in immediately as ${acc.role}`}
                        >
                          Login <ArrowRight size={10} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Email Input */}
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} color="var(--text-muted)" />
                  <span>Account Email</span>
                </label>
                <input
                  type="email"
                  className="input-control"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  placeholder="name@agribridge.lk"
                  required
                  style={{ height: '42px', fontSize: '0.88rem' }}
                />
              </div>

              {/* Password Input */}
              <div className="input-group" style={{ margin: 0 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: 0 }}>
                    <KeyRound size={14} color="var(--text-muted)" />
                    <span>Password</span>
                  </label>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Admin: <code>Admin@2026</code>
                  </span>
                </div>
                <div style={{ position: 'relative' }}>
                  <input
                    type={showLoginPassword ? 'text' : 'password'}
                    className="input-control"
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="Enter account password..."
                    required
                    style={{ height: '42px', fontSize: '0.88rem', paddingRight: '40px' }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
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
                    title={showLoginPassword ? 'Hide password' : 'Show password'}
                  >
                    {showLoginPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Remember Me Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.8rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    style={{ accentColor: 'var(--primary)' }}
                  />
                  Keep me signed in on this computer
                </label>
              </div>

              {/* Sign In Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', height: '44px', fontSize: '0.92rem', justifyContent: 'center', marginTop: '4px' }}
              >
                {loading ? (
                  'Verifying Credentials...'
                ) : (
                  <>
                    <LogIn size={16} /> Sign In to AgriBridge
                  </>
                )}
              </button>
            </form>
          ) : (
            /* ================= REGISTER TAB ================= */
            <form onSubmit={handleRegisterSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                Join the Sri Lankan Agricultural Marketplace & Logistics Network as a Buyer, Farmer, or Logistics Provider.
              </div>

              {/* Role Picker */}
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label">Select Account Role</label>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                  {[
                    { role: 'Buyer', label: 'Buyer', icon: ShoppingBag },
                    { role: 'Seller', label: 'Farmer / Seller', icon: Sprout },
                    { role: 'Driver', label: 'Logistics Driver', icon: Truck },
                  ].map((r) => {
                    const isSelected = regRole === r.role;
                    const IconComp = r.icon;
                    return (
                      <button
                        key={r.role}
                        type="button"
                        onClick={() => setRegRole(r.role)}
                        style={{
                          padding: '10px 8px',
                          borderRadius: 'var(--radius-md)',
                          border: isSelected ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
                          background: isSelected ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                          cursor: 'pointer',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <IconComp size={18} color={isSelected ? 'var(--primary)' : 'var(--text-muted)'} />
                        <span style={{ fontSize: '0.78rem', fontWeight: isSelected ? 700 : 500, color: 'var(--text-primary)' }}>
                          {r.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Full Name */}
              <div className="input-group" style={{ margin: 0 }}>
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <User size={14} color="var(--text-muted)" />
                  <span>Full Name</span>
                </label>
                <input
                  type="text"
                  className="input-control"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Kasun Wickramasinghe"
                  required
                  style={{ height: '40px', fontSize: '0.86rem' }}
                />
              </div>

              {/* Email & Phone Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Mail size={14} color="var(--text-muted)" />
                    <span>Email Address</span>
                  </label>
                  <input
                    type="email"
                    className="input-control"
                    value={regEmail}
                    onChange={(e) => setRegEmail(e.target.value)}
                    placeholder="kasun@example.lk"
                    required
                    style={{ height: '40px', fontSize: '0.86rem' }}
                  />
                </div>

                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={14} color="var(--text-muted)" />
                    <span>Phone Number</span>
                  </label>
                  <input
                    type="tel"
                    className="input-control"
                    value={regPhone}
                    onChange={(e) => setRegPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    required
                    style={{ height: '40px', fontSize: '0.86rem' }}
                  />
                </div>
              </div>

              {/* District & Org Details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={14} color="var(--text-muted)" />
                    <span>District</span>
                  </label>
                  <select
                    className="input-control"
                    value={regDistrict}
                    onChange={(e) => setRegDistrict(e.target.value)}
                    style={{ height: '40px', fontSize: '0.86rem' }}
                  >
                    {SRI_LANKA_DISTRICTS.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">
                    {regRole === 'Seller' ? 'Farm / Business Name' : regRole === 'Buyer' ? 'Supermarket / Company' : 'Vehicle Type'}
                  </label>
                  <input
                    type="text"
                    className="input-control"
                    value={regOrgName}
                    onChange={(e) => setRegOrgName(e.target.value)}
                    placeholder={regRole === 'Seller' ? 'e.g. Kasun Organic Farm' : regRole === 'Buyer' ? 'e.g. Kasun Super Fresh' : 'e.g. 2.5T Lorry'}
                    style={{ height: '40px', fontSize: '0.86rem' }}
                  />
                </div>
              </div>

              {/* Password & Confirm Password */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <KeyRound size={14} color="var(--text-muted)" />
                    <span>Password</span>
                  </label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    className="input-control"
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="Min 6 characters"
                    required
                    style={{ height: '40px', fontSize: '0.86rem' }}
                  />
                </div>

                <div className="input-group" style={{ margin: 0 }}>
                  <label className="input-label">Confirm Password</label>
                  <input
                    type={showRegPassword ? 'text' : 'password'}
                    className="input-control"
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="Re-type password"
                    required
                    style={{ height: '40px', fontSize: '0.86rem' }}
                  />
                </div>
              </div>

              {/* Create Account Button */}
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ width: '100%', height: '44px', fontSize: '0.92rem', justifyContent: 'center', marginTop: '6px' }}
              >
                {loading ? (
                  'Registering Account...'
                ) : (
                  <>
                    <UserPlus size={16} /> Create Account & Sign In
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Footer with Security Notice */}
        <div
          style={{
            padding: '12px 24px',
            borderTop: '1px solid var(--border-subtle)',
            background: 'var(--bg-subtle)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.74rem',
            color: 'var(--text-muted)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Lock size={12} color="var(--primary)" />
            <span>Encrypted with <strong>bcryptjs</strong> & JWT authentication tokens.</span>
          </div>
          <button
            type="button"
            className="btn btn-subtle btn-sm"
            onClick={onClose}
            style={{ fontSize: '0.76rem', padding: '4px 10px' }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
