import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import SearchModal from './components/SearchModal';
import Toast from './components/Toast';
import ProfileModal from './components/ProfileModal';
import NewShipmentModal from './components/NewShipmentModal';
import ProjectOverviewModal from './components/ProjectOverviewModal';
import AdminPasswordModal from './components/AdminPasswordModal';

import HomeView from './views/HomeView';
import UserLogisticsModuleView from './views/UserLogisticsModuleView';

import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'logistics'
  const [logisticsSubTab, setLogisticsSubTab] = useState('dashboard'); // 'dashboard' | 'shipments' | 'tracking' | 'pod' | 'reports' | 'users'
  const [theme, setTheme] = useState('light');
  const [currentUser, setCurrentUser] = useState(null);

  const [users, setUsers] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [stats, setStats] = useState(null);

  const [toasts, setToasts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNewShipmentOpen, setIsNewShipmentOpen] = useState(false);
  const [isOverviewOpen, setIsOverviewOpen] = useState(false);
  const [isAdminPasswordOpen, setIsAdminPasswordOpen] = useState(false);

  const [activeTrackingId, setActiveTrackingId] = useState('SHP-701');
  const [activePodId, setActivePodId] = useState('SHP-701');

  // Load initial data
  useEffect(() => {
    loadAllData();
  }, []);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const loadAllData = async () => {
    try {
      const [usersRes, driversRes, shipmentsRes, statsRes] = await Promise.all([
        api.getUsers(),
        api.getDrivers(),
        api.getShipments(),
        api.getReportsOverview(),
      ]);

      if (usersRes.users) {
        setUsers(usersRes.users);
        if (!currentUser) setCurrentUser(usersRes.users[0]); // Dilan Wanni Arachchi default
      }
      if (driversRes.drivers) setDrivers(driversRes.drivers);
      if (shipmentsRes.shipments) setShipments(shipmentsRes.shipments);
      if (statsRes.stats) setStats(statsRes.stats);
    } catch (err) {
      console.error('Data load error:', err);
    }
  };

  // Switch persona
  const handleSwitchUser = (user) => {
    setCurrentUser(user);
    showToast(`Switched persona to ${user.name} (${user.role})`, 'info');
  };

  // Open Logistics with specific sub-tab
  const handleOpenLogistics = (subTab = 'dashboard') => {
    setLogisticsSubTab(subTab);
    setActiveTab('logistics');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Create Shipment
  const handleCreateShipment = async (formData) => {
    const res = await api.createShipment(formData);
    if (res.success) {
      showToast(`Consignment ${res.shipment.id} successfully booked!`);
      if (formData.autoMatchDriver) {
        setTimeout(async () => {
          const matchRes = await api.assignDriver(res.shipment.id, { autoMatch: true });
          if (matchRes.success) {
            showToast(`Auto-Matched with driver ${matchRes.driver.name} based on proximity & capacity!`);
          }
          loadAllData();
        }, 600);
      }
      loadAllData();
      handleOpenLogistics('shipments');
    } else {
      showToast(res.message || 'Error creating consignment', 'error');
    }
  };

  // Auto-Match single shipment
  const handleAutoMatchDriver = async (shipmentId) => {
    const res = await api.assignDriver(shipmentId, { autoMatch: true });
    if (res.success) {
      showToast(`Transporter ${res.driver.name} assigned via smart proximity algorithm!`);
      loadAllData();
    } else {
      showToast(res.message || 'Auto-matching could not find an available transporter', 'error');
    }
  };

  // Manual Driver assignment
  const handleManualAssignDriver = async (shipmentId, driverId) => {
    const res = await api.assignDriver(shipmentId, { driverId });
    if (res.success) {
      showToast(`Assigned to ${res.driver.name} (${res.driver.vehicleNumber})`);
      loadAllData();
    } else {
      showToast(res.message || 'Failed to assign driver', 'error');
    }
  };

  // Auto match all pending
  const handleAutoMatchPending = async () => {
    const pending = shipments.filter((s) => s.status === 'Pending');
    let matchedCount = 0;
    for (const shp of pending) {
      const res = await api.assignDriver(shp.id, { autoMatch: true });
      if (res.success) matchedCount++;
    }
    showToast(`Auto-Match algorithm matched ${matchedCount} pending consignments!`);
    loadAllData();
  };

  // Update Status
  const handleUpdateShipmentStatus = async (shipmentId, statusData) => {
    const res = await api.updateShipmentStatus(shipmentId, statusData);
    if (res.success) {
      showToast(`Shipment ${shipmentId} status updated to ${res.shipment.status}`);
      loadAllData();
    } else {
      showToast(res.message || 'Failed to update status', 'error');
    }
  };

  // Confirm POD
  const handleConfirmPod = async (shipmentId, podData) => {
    const res = await api.confirmProofOfDelivery(shipmentId, podData);
    if (res.success) {
      showToast(`Proof of Delivery authenticated! Official Certificate issued.`);
      loadAllData();
    } else {
      showToast(res.message || 'POD verification failed', 'error');
    }
  };

  // Register User
  const handleRegisterUser = async (userData) => {
    const res = await api.registerUser(userData);
    if (res.success) {
      showToast(`User ${res.user.name} registered with role: ${res.user.role}`);
      loadAllData();
    } else {
      showToast(res.message || 'Registration failed', 'error');
    }
  };

  // Update User Status / Permissions
  const handleUpdateUserStatus = async (id, updates) => {
    const res = await api.updateUserStatus(id, updates);
    if (res.success) {
      showToast(`Permissions updated for user`);
      loadAllData();
    }
  };

  // Update Profile
  const handleSaveProfile = async (id, updates) => {
    const res = await api.updateProfile(id, updates);
    if (res.success) {
      showToast('Profile information successfully saved');
      if (currentUser?.id === id) {
        setCurrentUser(res.user);
      }
      loadAllData();
    }
  };

  // Change Admin Password
  const handleChangePassword = async (userId, currentPassword, newPassword) => {
    const res = await api.changePassword(userId, currentPassword, newPassword);
    if (res.success) {
      loadAllData();
    }
    return res;
  };

  // Navigation handlers
  const handleTrackShipment = (id) => {
    setActiveTrackingId(id);
    handleOpenLogistics('tracking');
  };

  const handlePodShipment = (id) => {
    setActivePodId(id);
    handleOpenLogistics('pod');
  };

  return (
    <div className="app-container">
      {/* Top Navigation */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onSwitchUser={handleSwitchUser}
        allUsers={users}
        theme={theme}
        setTheme={setTheme}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenProfile={() => setIsProfileOpen(true)}
        onOpenOverview={() => setIsOverviewOpen(true)}
      />

      {/* Main View Container */}
      <main className="main-content">
        {activeTab === 'home' && (
          <HomeView
            onOpenLogistics={handleOpenLogistics}
            stats={stats}
            currentUser={currentUser}
            onOpenOverview={() => setIsOverviewOpen(true)}
          />
        )}

        {activeTab === 'logistics' && (
          <UserLogisticsModuleView
            subTab={logisticsSubTab}
            setSubTab={setLogisticsSubTab}
            stats={stats}
            shipments={shipments}
            drivers={drivers}
            users={users}
            currentUser={currentUser}
            activeTrackingId={activeTrackingId}
            activePodId={activePodId}
            onOpenNewShipment={() => setIsNewShipmentOpen(true)}
            onAutoMatchDriver={handleAutoMatchDriver}
            onManualAssignDriver={handleManualAssignDriver}
            onAutoMatchPending={handleAutoMatchPending}
            onUpdateShipmentStatus={handleUpdateShipmentStatus}
            onSelectShipmentForTracking={handleTrackShipment}
            onSelectShipmentForPod={handlePodShipment}
            onConfirmPod={handleConfirmPod}
            onRegisterUser={handleRegisterUser}
            onUpdateUserStatus={handleUpdateUserStatus}
            onOpenProfile={() => setIsProfileOpen(true)}
            onOpenAdminPassword={() => setIsAdminPasswordOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--border-subtle)',
          padding: '24px',
          textAlign: 'center',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          background: 'var(--bg-surface)',
        }}
      >
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '12px' }}>
          <div>
            <strong>AgriBridge</strong> • IT2150 IT Project (SLIIT 2026) • User & Logistics Management
          </div>
          <div>
            Developed by <strong>Wanni Arachchi W.A.D.P.</strong> (IT22601056)
          </div>
        </div>
      </footer>

      {/* Modals & Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        users={users}
        shipments={shipments}
        drivers={drivers}
        onSelectShipment={handleTrackShipment}
        onSelectUser={(u) => {
          handleSwitchUser(u);
          handleOpenLogistics('users');
        }}
      />

      <ProfileModal
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
        user={currentUser}
        onSave={handleSaveProfile}
      />

      <NewShipmentModal
        isOpen={isNewShipmentOpen}
        onClose={() => setIsNewShipmentOpen(false)}
        onCreateShipment={handleCreateShipment}
        currentUser={currentUser}
      />

      <ProjectOverviewModal
        isOpen={isOverviewOpen}
        onClose={() => setIsOverviewOpen(false)}
        onOpenMyPart={() => handleOpenLogistics('dashboard')}
      />

      <AdminPasswordModal
        isOpen={isAdminPasswordOpen}
        onClose={() => setIsAdminPasswordOpen(false)}
        adminUser={users.find((u) => u.role === 'Admin') || currentUser}
        onChangePassword={handleChangePassword}
        showToast={showToast}
      />

      {/* Toasts */}
      <Toast toasts={toasts} onRemove={removeToast} />
    </div>
  );
}
