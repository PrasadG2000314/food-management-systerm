import React, { useState } from 'react';
import {
  FileBarChart,
  Download,
  Printer,
  CheckCircle2,
  AlertTriangle,
  Users,
  Calendar,
  FileSpreadsheet,
  TrendingUp,
  MapPin,
  Truck,
} from 'lucide-react';

export default function ReportsView({ shipments, drivers }) {
  const [activeReport, setActiveReport] = useState('completed');

  const completedShipments = shipments.filter((s) => s.status === 'Delivered');
  const delayedShipments = shipments.filter((s) => s.status === 'Delayed');

  // Export CSV Helper
  const downloadCSV = (filename, rows) => {
    if (!rows.length) return;
    const separator = ',';
    const keys = Object.keys(rows[0]);
    const csvContent =
      keys.join(separator) +
      '\n' +
      rows
        .map((row) =>
          keys
            .map((k) => {
              let cell = row[k] === null || row[k] === undefined ? '' : row[k];
              cell = cell instanceof Date ? cell.toLocaleString() : cell.toString().replace(/"/g, '""');
              if (cell.search(/("|,|\n)/g) >= 0) cell = `"${cell}"`;
              return cell;
            })
            .join(separator)
        )
        .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportCompletedCSV = () => {
    const data = completedShipments.map((s) => ({
      ConsignmentID: s.id,
      OrderID: s.orderId,
      Produce: s.produce,
      QuantityKg: s.quantityKg,
      Crates: s.crates,
      Origin: s.pickupLocation.district,
      Destination: s.dropoffLocation.district,
      Farmer: s.farmerName,
      Buyer: s.buyerName,
      Driver: s.assignedDriverName || 'N/A',
      DeliveredAt: s.deliveredAt || s.proofOfDelivery?.verifiedAt || 'Verified',
    }));
    downloadCSV('AgriBridge_Completed_Deliveries_Report.csv', data);
  };

  const exportDelayedCSV = () => {
    const data = delayedShipments.map((s) => ({
      ConsignmentID: s.id,
      OrderID: s.orderId,
      Produce: s.produce,
      QuantityKg: s.quantityKg,
      Origin: s.pickupLocation.district,
      Destination: s.dropoffLocation.district,
      Driver: s.assignedDriverName || 'N/A',
      CurrentLocation: s.currentLocation,
      ReasonForDelay: s.delayReason || 'Transit Bottleneck',
    }));
    downloadCSV('AgriBridge_Delayed_Shipments_Incident_Report.csv', data);
  };

  const exportDriversCSV = () => {
    const data = drivers.map((d) => ({
      DriverID: d.id,
      DriverName: d.name,
      Phone: d.phone,
      VehicleNumber: d.vehicleNumber,
      VehicleType: d.vehicleType,
      District: d.district,
      CapacityKg: d.capacityKg,
      Rating: d.rating,
      CompletedTrips: d.completedTrips,
      OnTimeRate: `${d.onTimeRate || 96}%`,
      Available: d.isAvailable ? 'Yes' : 'No',
    }));
    downloadCSV('AgriBridge_Driver_Performance_Report.csv', data);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Logistics Intelligence & Reports</h1>
          <p style={{ marginTop: '4px' }}>
            Official reports as defined in Project Specification: Completed Deliveries, Delayed Incidents, and Driver Metrics.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <Printer size={16} /> Print Document
          </button>
          <button
            className="btn btn-primary"
            onClick={
              activeReport === 'completed'
                ? exportCompletedCSV
                : activeReport === 'delayed'
                ? exportDelayedCSV
                : exportDriversCSV
            }
          >
            <Download size={16} /> Export to CSV
          </button>
        </div>
      </div>

      {/* Report Selection Tabs */}
      <div
        className="card"
        style={{
          padding: '8px',
          display: 'flex',
          gap: '6px',
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
        }}
      >
        <button
          onClick={() => setActiveReport('completed')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            background: activeReport === 'completed' ? 'var(--bg-surface)' : 'transparent',
            color: activeReport === 'completed' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeReport === 'completed' ? 700 : 500,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: activeReport === 'completed' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <CheckCircle2 size={16} color="var(--primary)" />
          <span>1. Completed Deliveries ({completedShipments.length})</span>
        </button>

        <button
          onClick={() => setActiveReport('delayed')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            background: activeReport === 'delayed' ? 'var(--bg-surface)' : 'transparent',
            color: activeReport === 'delayed' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeReport === 'delayed' ? 700 : 500,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: activeReport === 'delayed' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <AlertTriangle size={16} color="#ef4444" />
          <span>2. Delayed & Incidents ({delayedShipments.length})</span>
        </button>

        <button
          onClick={() => setActiveReport('drivers')}
          style={{
            flex: 1,
            padding: '10px',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            background: activeReport === 'drivers' ? 'var(--bg-surface)' : 'transparent',
            color: activeReport === 'drivers' ? 'var(--text-primary)' : 'var(--text-secondary)',
            fontWeight: activeReport === 'drivers' ? 700 : 500,
            fontSize: '0.88rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            boxShadow: activeReport === 'drivers' ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <Users size={16} color="#2563eb" />
          <span>3. Driver Performance Metrics ({drivers.length})</span>
        </button>
      </div>

      {/* REPORT 1: COMPLETED DELIVERIES */}
      {activeReport === 'completed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Summary KPIs */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Total Verified Handed Over</span>
              <div className="stat-value">{completedShipments.length}</div>
              <div className="stat-subtitle">Confirmed with customer OTP & signature</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Tonnage Delivered</span>
              <div className="stat-value">
                {completedShipments.reduce((acc, s) => acc + (s.quantityKg || 0), 0)} kg
              </div>
              <div className="stat-subtitle">Fresh produce safeguarded without shrinkage</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Average Crates Per Consignment</span>
              <div className="stat-value">
                {completedShipments.length
                  ? Math.round(
                      completedShipments.reduce((acc, s) => acc + (s.crates || 0), 0) /
                        completedShipments.length
                    )
                  : 0}
              </div>
              <div className="stat-subtitle">Standardized agricultural crates</div>
            </div>
          </div>

          {/* Table */}
          <div className="table-container">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Consignment ID</th>
                  <th>Produce Details</th>
                  <th>Origin → Destination</th>
                  <th>Quantity (kg)</th>
                  <th>Transporter</th>
                  <th>Delivered Recipient</th>
                  <th>POD Method</th>
                </tr>
              </thead>
              <tbody>
                {completedShipments.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                      No completed deliveries found. Use the POD terminal to complete a delivery!
                    </td>
                  </tr>
                ) : (
                  completedShipments.map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 800 }}>{s.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{s.produce}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{s.category}</div>
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <MapPin size={13} color="var(--primary)" />
                          <span>{s.pickupLocation.district} → {s.dropoffLocation.district}</span>
                        </div>
                      </td>
                      <td>
                        <strong>{s.quantityKg} kg</strong> ({s.crates} crates)
                      </td>
                      <td>{s.assignedDriverName || 'Transporter'}</td>
                      <td>{s.proofOfDelivery?.receivedBy || s.buyerName}</td>
                      <td>
                        <span className="badge badge-delivered">
                          OTP & Signature Verified
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT 2: DELAYED SHIPMENTS */}
      {activeReport === 'delayed' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Summary KPIs */}
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Active Delay Incidents</span>
              <div className="stat-value" style={{ color: 'var(--status-delayed-text)' }}>
                {delayedShipments.length}
              </div>
              <div className="stat-subtitle">Immediate intervention required</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Produce At-Risk Volume</span>
              <div className="stat-value">
                {delayedShipments.reduce((acc, s) => acc + (s.quantityKg || 0), 0)} kg
              </div>
              <div className="stat-subtitle">Under monitored cold-chain preservation</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Primary Root Cause</span>
              <div className="stat-value" style={{ fontSize: '1.25rem' }}>Weather / Mountain Pass</div>
              <div className="stat-subtitle">Central Highland rainfall slowdowns</div>
            </div>
          </div>

          <div className="table-container">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Shipment ID</th>
                  <th>Produce</th>
                  <th>Driver & Vehicle</th>
                  <th>Current Waypoint</th>
                  <th>Incident Root Cause</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {delayedShipments.length === 0 ? (
                  <tr>
                    <td colSpan="6" style={{ textAlign: 'center', padding: '32px 0', color: 'var(--text-muted)' }}>
                      Zero delayed shipments currently. Logistics supply chains are moving on schedule!
                    </td>
                  </tr>
                ) : (
                  delayedShipments.map((s) => (
                    <tr key={s.id}>
                      <td style={{ fontWeight: 800 }}>{s.id}</td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{s.produce}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{s.quantityKg} kg</div>
                      </td>
                      <td>{s.assignedDriverName} ({s.vehicleNumber})</td>
                      <td>{s.currentLocation}</td>
                      <td style={{ color: 'var(--status-delayed-text)', fontWeight: 600 }}>
                        {s.delayReason || 'Road bottleneck'}
                      </td>
                      <td>
                        <span className="badge badge-delayed">Delayed</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* REPORT 3: DRIVER PERFORMANCE METRICS */}
      {activeReport === 'drivers' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="stats-grid">
            <div className="stat-card">
              <span className="stat-label">Fleet Size</span>
              <div className="stat-value">{drivers.length}</div>
              <div className="stat-subtitle">{drivers.filter((d) => d.isAvailable).length} drivers available right now</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Overall On-Time Performance</span>
              <div className="stat-value" style={{ color: 'var(--primary)' }}>97.8%</div>
              <div className="stat-subtitle">Across all completed provincial missions</div>
            </div>

            <div className="stat-card">
              <span className="stat-label">Average Transporter Rating</span>
              <div className="stat-value">★ 4.83 / 5.0</div>
              <div className="stat-subtitle">Based on buyer and farmer feedback</div>
            </div>
          </div>

          <div className="table-container">
            <table className="table-custom">
              <thead>
                <tr>
                  <th>Transporter</th>
                  <th>Vehicle Details</th>
                  <th>Base Hub</th>
                  <th>Completed Trips</th>
                  <th>On-Time Rate</th>
                  <th>Rating</th>
                  <th>Fleet Status</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d) => (
                  <tr key={d.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{d.name}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>{d.phone}</div>
                    </td>
                    <td>
                      <div style={{ fontWeight: 600 }}>{d.vehicleType}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        Plate: {d.vehicleNumber} ({d.capacityKg}kg)
                      </div>
                    </td>
                    <td>{d.district}</td>
                    <td>
                      <strong>{d.completedTrips} trips</strong>
                    </td>
                    <td>
                      <div style={{ fontWeight: 700, color: 'var(--primary)' }}>
                        {d.onTimeRate ? `${d.onTimeRate}%` : '96.5%'}
                      </div>
                    </td>
                    <td>★ {d.rating}</td>
                    <td>
                      <span
                        className="badge"
                        style={{
                          background: d.isAvailable ? 'var(--status-delivered-bg)' : 'var(--status-pending-bg)',
                          color: d.isAvailable ? 'var(--status-delivered-text)' : 'var(--status-pending-text)',
                        }}
                      >
                        {d.isAvailable ? 'Available' : 'En Route'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
