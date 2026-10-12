import React from 'react';
import {
  LayoutDashboard,
  Truck,
  Compass,
  FileCheck2,
  FileBarChart,
  Users,
  PlusCircle,
  Sparkles,
  Shield,
  Layers,
} from 'lucide-react';

import LogisticsDashboardView from './LogisticsDashboardView';
import ShipmentsView from './ShipmentsView';
import TrackingView from './TrackingView';
import PodView from './PodView';
import ReportsView from './ReportsView';
import UserManagementView from './UserManagementView';

export default function UserLogisticsModuleView({
  subTab,
  setSubTab,
  stats,
  shipments,
  drivers,
  users,
  currentUser,
  activeTrackingId,
  activePodId,
  onOpenNewShipment,
  onAutoMatchDriver,
  onManualAssignDriver,
  onAutoMatchPending,
  onUpdateShipmentStatus,
  onSelectShipmentForTracking,
  onSelectShipmentForPod,
  onConfirmPod,
  onRegisterUser,
  onUpdateUserStatus,
  onOpenProfile,
  onOpenAdminPassword,
}) {
  const subNavItems = [
    {
      id: 'dashboard',
      label: 'Overview Dashboard',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'shipments',
      label: 'Shipments & Dispatch',
      icon: Truck,
      badge: shipments.length,
    },
    {
      id: 'tracking',
      label: 'Live Consignment Tracking',
      icon: Compass,
      badge: shipments.filter((s) => ['In-Transit', 'Dispatched'].includes(s.status)).length || null,
    },
    {
      id: 'pod',
      label: 'Proof of Delivery (POD)',
      icon: FileCheck2,
      badge: null,
    },
    {
      id: 'reports',
      label: 'Logistics Reports',
      icon: FileBarChart,
      badge: null,
    },
    {
      id: 'users',
      label: 'User Directory & Roles',
      icon: Users,
      badge: users.length,
    },
  ];

  const pendingCount = shipments.filter((s) => s.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Module Title Banner */}
      <div
        style={{
          background: 'var(--bg-surface)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-lg)',
          padding: '20px 24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
          boxShadow: 'var(--shadow-sm)',
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
              boxShadow: '0 2px 8px rgba(5, 150, 105, 0.25)',
            }}
          >
            <Truck size={22} strokeWidth={2.2} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>
                User & Logistics Management
              </h1>
              <span className="badge badge-delivered" style={{ fontSize: '0.72rem' }}>
                IT2150 Module 02
              </span>
            </div>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '2px' }}>
              Lead Developer: <strong>Wanni Arachchi W.A.D.P.</strong> (IT22601056) • Secure user access, route optimization & POD verification
            </div>
          </div>
        </div>

        {/* Global Action Buttons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            className="btn btn-secondary btn-sm"
            onClick={onOpenAdminPassword}
            title="Set, view, or change Admin password"
          >
            <Shield size={14} color="var(--primary)" /> Admin Password
          </button>
          {pendingCount > 0 && (
            <button
              className="btn btn-secondary btn-sm"
              onClick={onAutoMatchPending}
              style={{ color: 'var(--primary)', borderColor: 'var(--primary-border)' }}
            >
              <Sparkles size={14} /> Auto-Match Pending ({pendingCount})
            </button>
          )}
          <button className="btn btn-primary btn-sm" onClick={onOpenNewShipment}>
            <PlusCircle size={14} /> New Consignment
          </button>
        </div>
      </div>

      {/* Minimalist Sub-Navigation Bar */}
      <div
        style={{
          background: 'var(--bg-subtle)',
          padding: '6px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          gap: '6px',
          overflowX: 'auto',
        }}
      >
        {subNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = subTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setSubTab(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '9px 16px',
                fontSize: '0.84rem',
                fontWeight: isActive ? 700 : 500,
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: isActive ? 'var(--bg-surface)' : 'transparent',
                border: 'none',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                transition: 'all var(--transition-fast)',
                boxShadow: isActive ? 'var(--shadow-sm)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              <Icon size={16} color={isActive ? 'var(--primary)' : 'currentColor'} strokeWidth={isActive ? 2.3 : 1.8} />
              <span>{item.label}</span>
              {item.badge !== null && item.badge !== undefined && (
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontWeight: 700,
                    padding: '1px 6px',
                    borderRadius: 'var(--radius-full)',
                    background: isActive ? 'var(--primary-subtle)' : 'var(--border-subtle)',
                    color: isActive ? 'var(--primary-text)' : 'var(--text-muted)',
                  }}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sub-View Content */}
      <div style={{ marginTop: '4px' }}>
        {subTab === 'dashboard' && (
          <LogisticsDashboardView
            stats={stats}
            shipments={shipments}
            drivers={drivers}
            setActiveTab={setSubTab}
            onOpenNewShipment={onOpenNewShipment}
            onSelectShipmentForTracking={(id) => {
              onSelectShipmentForTracking(id);
              setSubTab('tracking');
            }}
            onAutoMatchPending={onAutoMatchPending}
          />
        )}

        {subTab === 'shipments' && (
          <ShipmentsView
            shipments={shipments}
            drivers={drivers}
            onOpenNewShipment={onOpenNewShipment}
            onAutoMatchDriver={onAutoMatchDriver}
            onManualAssignDriver={onManualAssignDriver}
            onUpdateShipmentStatus={onUpdateShipmentStatus}
            onSelectShipmentForTracking={(id) => {
              onSelectShipmentForTracking(id);
              setSubTab('tracking');
            }}
            onSelectShipmentForPod={(id) => {
              onSelectShipmentForPod(id);
              setSubTab('pod');
            }}
          />
        )}

        {subTab === 'tracking' && (
          <TrackingView
            shipments={shipments}
            initialTrackingId={activeTrackingId}
            onOpenPod={(id) => {
              onSelectShipmentForPod(id);
              setSubTab('pod');
            }}
          />
        )}

        {subTab === 'pod' && (
          <PodView
            shipments={shipments}
            initialShipmentId={activePodId}
            onConfirmPod={onConfirmPod}
          />
        )}

        {subTab === 'reports' && (
          <ReportsView shipments={shipments} drivers={drivers} />
        )}

        {subTab === 'users' && (
          <UserManagementView
            users={users}
            onRegisterUser={onRegisterUser}
            onUpdateUserStatus={onUpdateUserStatus}
            onOpenProfile={onOpenProfile}
            onOpenAdminPassword={onOpenAdminPassword}
            currentUser={currentUser}
          />
        )}
      </div>
    </div>
  );
}
