import React, { useState } from 'react';
import {
  Sprout,
  Truck,
  ShieldCheck,
  Compass,
  FileCheck2,
  FileBarChart,
  Users,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle,
  Package,
  Layers,
  ThermometerSnowflake,
  Calculator,
  Search,
  ChevronDown,
  ChevronUp,
  Tag,
  Clock,
  DollarSign,
  Fuel,
  TrendingDown,
  Check,
  Info,
  Calendar,
  Phone,
} from 'lucide-react';

export default function HomeView({
  onOpenLogistics,
  stats,
  currentUser,
  onOpenOverview,
  shipments = [],
  drivers = [],
  users = [],
  onSwitchUser,
  onOpenNewShipment,
  onTrackShipment,
}) {
  // 1. Interactive Freight Calculator State
  const [calcOrigin, setCalcOrigin] = useState('Nuwara Eliya');
  const [calcDestination, setCalcDestination] = useState('Colombo');
  const [calcCrop, setCalcCrop] = useState('Highland Carrots & Leeks');
  const [calcWeight, setCalcWeight] = useState(1200);
  const [calcRefrigerated, setCalcRefrigerated] = useState(true);

  // 2. Interactive Tracking Search State
  const [trackingQuery, setTrackingQuery] = useState('SHP-701');
  const [trackedShipment, setTrackedShipment] = useState(
    shipments.find((s) => s.id === 'SHP-701') || shipments[0] || null
  );

  // 3. Produce Showcase Category Filter
  const [harvestFilter, setHarvestFilter] = useState('ALL');

  // 4. FAQ Accordion State
  const [expandedFaq, setExpandedFaq] = useState(0);

  // Freight calculation formula
  const distanceMatrix = {
    'Nuwara Eliya-Colombo': 165,
    'Nuwara Eliya-Gampaha': 155,
    'Nuwara Eliya-Kandy': 75,
    'Nuwara Eliya-Galle': 245,
    'Dambulla-Colombo': 150,
    'Dambulla-Gampaha': 135,
    'Dambulla-Kandy': 72,
    'Dambulla-Galle': 260,
    'Jaffna-Colombo': 395,
    'Jaffna-Gampaha': 380,
    'Matale-Colombo': 142,
    'Matale-Gampaha': 130,
    'Badulla-Colombo': 218,
  };

  const routeKey = `${calcOrigin}-${calcDestination}`;
  const estimatedDistance = distanceMatrix[routeKey] || 150;
  const transitHours = (estimatedDistance / 42).toFixed(1);
  const baseRate = calcRefrigerated ? 115 : 85;
  const estimatedCostLKR = Math.round(
    estimatedDistance * baseRate + (calcWeight / 100) * 280
  );

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (!trackingQuery.trim()) return;
    const found = shipments.find(
      (s) =>
        s.id.toLowerCase() === trackingQuery.trim().toLowerCase() ||
        s.orderId.toLowerCase() === trackingQuery.trim().toLowerCase()
    );
    if (found) {
      setTrackedShipment(found);
    } else {
      alert(`Consignment "${trackingQuery}" not found. Try SHP-701 or SHP-702.`);
    }
  };

  const handleSelectTrackChip = (id) => {
    setTrackingQuery(id);
    const found = shipments.find((s) => s.id === id);
    if (found) setTrackedShipment(found);
  };

  // Sample real farm produce listings available for dispatch
  const produceListings = [
    {
      id: 'prod-01',
      title: 'Highland Crisp Carrots',
      farm: 'Green Valley Organic Farm',
      district: 'Nuwara Eliya',
      category: 'HIGHLAND',
      priceLkr: 240,
      unit: 'kg',
      availableKg: 1200,
      crates: 48,
      temperatureReq: '4°C Cold Chain',
      image:
        'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=400&q=80',
      grade: 'Grade A Export',
    },
    {
      id: 'prod-02',
      title: 'Dambulla Red Big Onions',
      farm: 'Rathna Agro Produce',
      district: 'Matale',
      category: 'LOWLAND',
      priceLkr: 310,
      unit: 'kg',
      availableKg: 2400,
      crates: 80,
      temperatureReq: 'Ambient / Dry Insulated',
      image:
        'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?auto=format&fit=crop&w=400&q=80',
      grade: 'Cured Wholesale',
    },
    {
      id: 'prod-03',
      title: 'Highland Seed Potatoes',
      farm: 'Hakgala Highlands Depot',
      district: 'Nuwara Eliya',
      category: 'ROOT',
      priceLkr: 195,
      unit: 'kg',
      availableKg: 3000,
      crates: 100,
      temperatureReq: '6°C Chilled',
      image:
        'https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=400&q=80',
      grade: 'Premium Table Stock',
    },
    {
      id: 'prod-04',
      title: 'Green Bell Peppers & Capsicum',
      farm: 'Galewela Harvest Depot',
      district: 'Matale',
      category: 'LOWLAND',
      priceLkr: 420,
      unit: 'kg',
      availableKg: 850,
      crates: 35,
      temperatureReq: 'Ventilated Cargo',
      image:
        'https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?auto=format&fit=crop&w=400&q=80',
      grade: 'Direct Farm Fresh',
    },
    {
      id: 'prod-05',
      title: 'Jaffna Red Shallots',
      farm: 'Chavakachcheri Agro Cooperative',
      district: 'Jaffna',
      category: 'LOWLAND',
      priceLkr: 380,
      unit: 'kg',
      availableKg: 1600,
      crates: 65,
      temperatureReq: 'Dry Courier',
      image:
        'https://images.unsplash.com/photo-1580201092675-a0a6a6cafbb1?auto=format&fit=crop&w=400&q=80',
      grade: 'Authentic Jaffna Red',
    },
    {
      id: 'prod-06',
      title: 'Highland Leeks & Cabbage',
      farm: 'Kandapola Collection Depot',
      district: 'Nuwara Eliya',
      category: 'HIGHLAND',
      priceLkr: 180,
      unit: 'kg',
      availableKg: 1800,
      crates: 60,
      temperatureReq: '4°C Cold Chain',
      image:
        'https://images.unsplash.com/photo-1594282486552-05b4d80fbb9f?auto=format&fit=crop&w=400&q=80',
      grade: 'Crisp Field Harvest',
    },
  ];

  const filteredHarvests = produceListings.filter((p) => {
    if (harvestFilter === 'ALL') return true;
    return p.category === harvestFilter;
  });

  const faqs = [
    {
      q: 'How does the 4-digit OTP handover protect buyers and farmers?',
      a: 'When an order is dispatched, a unique secret 4-digit PIN is generated exclusively on the buyer account. The logistics driver cannot mark the cargo as delivered until the receiver inspects the produce crates and inputs the matching code into the driver POD terminal.',
    },
    {
      q: 'How is fresh produce protected from heat and spoilage during transit?',
      a: 'AgriBridge logs real-time vehicle sensor telemetry. Highland crops from Nuwara Eliya and Welimada travel in insulated refrigerated trucks maintaining a strict 4°C – 8°C cold chain, verified at every corridor waypoint.',
    },
    {
      q: 'How does the driver auto-assignment algorithm pick the best vehicle?',
      a: 'The algorithm compares origin district proximity with registered transporter vehicle capacities (1.5T Light Pickup, 2.0T Covered Lorry, 3.5T Refrigerated Truck) and driver performance star ratings, ensuring zero wasted deadhead mileage.',
    },
    {
      q: 'Can administrators generate reports for university evaluations and logistics audit?',
      a: 'Yes! The Logistics Reports sub-module generates official Completed Deliveries, Delayed Incidents, and Driver Fleet Performance reports, complete with instant Export to CSV and print-friendly PDF formatting.',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '52px' }}>
      {/* 1. HERO SECTION: Dynamic Dual-Column with Live Freight Estimator */}
      <section
        style={{
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-subtle) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '48px 40px',
          boxShadow: 'var(--shadow-sm)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '36px',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Left Column: Vision & Customer Trust */}
        <div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '6px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--primary-subtle)',
              border: '1px solid var(--primary-border)',
              color: 'var(--primary-text)',
              fontSize: '0.82rem',
              fontWeight: 700,
              marginBottom: '20px',
            }}
          >
            <Sparkles size={14} />
            <span>Sri Lanka National Agricultural Marketplace • Module 02</span>
          </div>

          <h1
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              letterSpacing: '-0.035em',
              lineHeight: 1.18,
              marginBottom: '18px',
              color: 'var(--text-primary)',
            }}
          >
            Direct Farm Harvests,{' '}
            <span style={{ color: 'var(--primary)' }}>Tracked In Real-Time</span>.
          </h1>

          <p
            style={{
              fontSize: '1.05rem',
              lineHeight: 1.6,
              color: 'var(--text-secondary)',
              marginBottom: '26px',
            }}
          >
            Connecting Sri Lankan farmers, wholesale buyers, and certified transporters.
            Eliminate middlemen, minimize harvest spoilage, and guarantee on-time delivery with 
            cryptographic OTP handover confirmation.
          </p>

          {/* Quick Customer Highlights */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '30px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={14} strokeWidth={3} />
              </div>
              <span><strong>Guaranteed Cold-Chain (4°C – 8°C)</strong> for highland vegetables</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={14} strokeWidth={3} />
              </div>
              <span><strong>4-Digit Handover OTP</strong> prevents delivery disputes</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.88rem' }}>
              <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <Check size={14} strokeWidth={3} />
              </div>
              <span><strong>Smart Distance Matching</strong> assigns nearest available lorry</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={() => onOpenLogistics('dashboard')}
            >
              Open Logistics Hub <ArrowRight size={18} />
            </button>
            <button
              className="btn btn-secondary btn-lg"
              onClick={onOpenNewShipment}
            >
              <Truck size={18} /> Book Dispatch
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Live Freight & Route Calculator */}
        <div
          className="card"
          style={{
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-subtle)',
            boxShadow: 'var(--shadow-lg)',
            padding: '24px',
            position: 'relative',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '34px', height: '34px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Calculator size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', margin: 0 }}>Instant Route & Freight Estimator</h3>
                <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>Customer Dispatch Calculator</span>
              </div>
            </div>
            <span className="badge badge-delivered">Live Rates</span>
          </div>

          {/* Calculator Inputs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div>
                <label className="input-label" style={{ fontSize: '0.76rem' }}>Origin Farm District</label>
                <select
                  className="select-control"
                  style={{ fontSize: '0.84rem', padding: '7px 10px' }}
                  value={calcOrigin}
                  onChange={(e) => setCalcOrigin(e.target.value)}
                >
                  <option value="Nuwara Eliya">Nuwara Eliya (Highland)</option>
                  <option value="Dambulla">Dambulla (Hub)</option>
                  <option value="Matale">Matale</option>
                  <option value="Jaffna">Jaffna (Dry Zone)</option>
                  <option value="Badulla">Badulla / Welimada</option>
                </select>
              </div>

              <div>
                <label className="input-label" style={{ fontSize: '0.76rem' }}>Buyer Destination</label>
                <select
                  className="select-control"
                  style={{ fontSize: '0.84rem', padding: '7px 10px' }}
                  value={calcDestination}
                  onChange={(e) => setCalcDestination(e.target.value)}
                >
                  <option value="Colombo">Colombo (Manning Market)</option>
                  <option value="Gampaha">Gampaha / Peliyagoda</option>
                  <option value="Kandy">Kandy Central</option>
                  <option value="Galle">Galle Southern Hub</option>
                </select>
              </div>
            </div>

            {/* Produce & Weight Selection */}
            <div>
              <label className="input-label" style={{ fontSize: '0.76rem' }}>Harvest Load (kg)</label>
              <div style={{ display: 'flex', gap: '6px', marginBottom: '8px' }}>
                {[500, 1200, 2500, 4000].map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => setCalcWeight(w)}
                    style={{
                      flex: 1,
                      padding: '5px 0',
                      fontSize: '0.78rem',
                      fontWeight: calcWeight === w ? 700 : 500,
                      borderRadius: 'var(--radius-sm)',
                      border: calcWeight === w ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                      background: calcWeight === w ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                      color: calcWeight === w ? 'var(--primary-text)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                    }}
                  >
                    {w} kg
                  </button>
                ))}
              </div>
            </div>

            {/* Cold Chain Toggle */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '8px 12px',
                background: 'var(--bg-subtle)',
                borderRadius: 'var(--radius-md)',
                fontSize: '0.82rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <ThermometerSnowflake size={16} color="var(--primary)" />
                <span>Refrigerated Cold Chain (4°C)</span>
              </div>
              <input
                type="checkbox"
                checked={calcRefrigerated}
                onChange={(e) => setCalcRefrigerated(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--primary)', cursor: 'pointer' }}
              />
            </div>

            {/* Real-time Calculation Result Box */}
            <div
              style={{
                background: 'var(--primary-subtle)',
                border: '1px solid var(--primary-border)',
                borderRadius: 'var(--radius-md)',
                padding: '14px',
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '10px',
              }}
            >
              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Est. Transport Cost
                </span>
                <div style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--primary)' }}>
                  LKR {estimatedCostLKR.toLocaleString()}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  ~LKR {(estimatedCostLKR / calcWeight).toFixed(1)}/kg freight
                </div>
              </div>

              <div>
                <span style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Distance & Transit ETA
                </span>
                <div style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                  {transitHours} hrs ({estimatedDistance} km)
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                  Via {calcOrigin === 'Nuwara Eliya' ? 'A5 / A1 Corridor' : 'Central Highway'}
                </div>
              </div>
            </div>

            <button
              className="btn btn-primary"
              style={{ width: '100%', padding: '10px' }}
              onClick={onOpenNewShipment}
            >
              Book Consignment With These Parameters <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 2. INSTANT LIVE CONSIGNMENT TRACKING SEARCH WIDGET (Customer-Friendly) */}
      <section
        className="card"
        style={{
          padding: '28px 32px',
          background: 'var(--bg-surface)',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
              Direct Customer Tracking
            </div>
            <h2 style={{ fontSize: '1.45rem', marginTop: '2px' }}>Track Your Fresh Farm Consignment</h2>
            <p style={{ fontSize: '0.86rem', marginTop: '2px' }}>
              Instant live GPS waypoints, temperature telemetry, and delivery status.
            </p>
          </div>

          {/* Quick Demo Chips */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginRight: '4px' }}>Quick Check:</span>
            {['SHP-701', 'SHP-702', 'SHP-700'].map((id) => (
              <button
                key={id}
                type="button"
                onClick={() => handleSelectTrackChip(id)}
                style={{
                  border: trackingQuery === id ? '1px solid var(--primary)' : '1px solid var(--border-subtle)',
                  background: trackingQuery === id ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
                  color: trackingQuery === id ? 'var(--primary-text)' : 'var(--text-secondary)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleTrackSubmit} style={{ display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <Search size={18} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              className="input-control"
              style={{ paddingLeft: '44px', height: '44px', fontSize: '0.92rem' }}
              placeholder="Enter Tracking Consignment ID (e.g. SHP-701 or ORD-9420)..."
              value={trackingQuery}
              onChange={(e) => setTrackingQuery(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary" style={{ padding: '0 24px' }}>
            Locate Cargo
          </button>
        </form>

        {/* Live Tracking Result Mini-Card */}
        {trackedShipment && (
          <div
            style={{
              padding: '18px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--bg-subtle)',
              border: '1px solid var(--border-subtle)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--primary-subtle)',
                  color: 'var(--primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Truck size={22} />
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <strong style={{ fontSize: '1rem' }}>{trackedShipment.id}</strong>
                  <span className={`badge badge-${trackedShipment.status.toLowerCase().replace(' ', '-')}`}>
                    {trackedShipment.status}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Ref: {trackedShipment.orderId}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  <strong>{trackedShipment.produce}</strong> ({trackedShipment.quantityKg}kg) • {trackedShipment.pickupLocation.district} ➔ {trackedShipment.dropoffLocation.district}
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                  <MapPin size={12} color="var(--primary)" />
                  <span>Current Milestone: <strong>{trackedShipment.currentLocation}</strong></span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '0.72rem', textTransform: 'uppercase', color: 'var(--text-muted)', fontWeight: 700 }}>
                  Sensor Telemetry
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--primary)' }}>
                  4.2°C (Optimal)
                </div>
                <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                  Driver: {trackedShipment.assignedDriverName?.split(' ')[0] || 'Ruwan'}
                </div>
              </div>

              <button
                className="btn btn-secondary btn-sm"
                onClick={() => onTrackShipment(trackedShipment.id)}
              >
                <Compass size={15} /> Open Full GPS Map
              </button>
            </div>
          </div>
        )}
      </section>

      {/* 3. FRESH PRODUCE MARKETPLACE SHOWCASE (Direct Farm Gate Produce Ready for Dispatch) */}
      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '22px', flexWrap: 'wrap', gap: '14px' }}>
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
              Produce Dispatch Showcase
            </div>
            <h2 style={{ fontSize: '1.6rem', marginTop: '2px' }}>Fresh Farm Harvests Available for Immediate Transport</h2>
            <p style={{ fontSize: '0.88rem', marginTop: '2px' }}>
              Order direct from Sri Lankan farm hubs with guaranteed cold-chain logistics:
            </p>
          </div>

          {/* Category Filter Pills */}
          <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-subtle)', padding: '3px', borderRadius: 'var(--radius-full)' }}>
            {[
              { id: 'ALL', label: 'All Harvests' },
              { id: 'HIGHLAND', label: 'Highland Veg' },
              { id: 'LOWLAND', label: 'Lowland Crops' },
              { id: 'ROOT', label: 'Root Crops' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setHarvestFilter(cat.id)}
                style={{
                  border: 'none',
                  background: harvestFilter === cat.id ? 'var(--bg-surface)' : 'transparent',
                  color: harvestFilter === cat.id ? 'var(--text-primary)' : 'var(--text-muted)',
                  fontWeight: harvestFilter === cat.id ? 700 : 500,
                  fontSize: '0.78rem',
                  padding: '5px 12px',
                  borderRadius: 'var(--radius-full)',
                  cursor: 'pointer',
                  boxShadow: harvestFilter === cat.id ? 'var(--shadow-sm)' : 'none',
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Produce Cards Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {filteredHarvests.map((item) => (
            <div
              key={item.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '0',
                overflow: 'hidden',
                transition: 'transform 0.15s ease, box-shadow 0.15s ease',
              }}
            >
              {/* Produce Image */}
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <span
                  style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(15, 23, 42, 0.75)',
                    backdropFilter: 'blur(4px)',
                    color: '#fff',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                  }}
                >
                  {item.grade}
                </span>

                <span
                  style={{
                    position: 'absolute',
                    bottom: '10px',
                    right: '10px',
                    background: 'var(--primary)',
                    color: '#fff',
                    padding: '3px 9px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                  }}
                >
                  LKR {item.priceLkr}/{item.unit}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '16px', display: 'flex', flexDirection: 'column', flex: 1, gap: '8px' }}>
                <h4 style={{ fontSize: '1.02rem', margin: 0 }}>{item.title}</h4>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <MapPin size={13} color="var(--primary)" />
                  <span>{item.farm} • <strong>{item.district}</strong></span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px', fontSize: '0.82rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>Available Quantity:</span>
                  <strong>{item.availableKg.toLocaleString()} kg ({item.crates} crates)</strong>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--primary)', fontWeight: 600 }}>
                  <ThermometerSnowflake size={13} />
                  <span>{item.temperatureReq}</span>
                </div>

                {/* Card Action */}
                <div style={{ marginTop: 'auto', paddingTop: '12px', borderTop: '1px solid var(--border-light)' }}>
                  <button
                    className="btn btn-secondary btn-sm"
                    style={{ width: '100%', justifyContent: 'center' }}
                    onClick={onOpenNewShipment}
                  >
                    <Truck size={14} /> Schedule Consignment Pickup
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. INTERACTIVE CUSTOMER PERSONA NAVIGATOR ("Experience AgriBridge As") */}
      <section className="card" style={{ padding: '36px' }}>
        <div style={{ maxWidth: '780px', marginBottom: '26px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
            Interactive Role Navigator
          </div>
          <h2 style={{ fontSize: '1.6rem', marginTop: '2px', marginBottom: '6px' }}>
            Who Are You In The Agricultural Supply Chain?
          </h2>
          <p>
            Click any stakeholder persona to switch your demo perspective and test role-tailored capabilities:
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
          {/* Buyer */}
          <div
            onClick={() => {
              const buyer = users.find((u) => u.role === 'Buyer') || { id: 'usr-004', name: 'Peshala Mendis', role: 'Buyer' };
              onSwitchUser(buyer);
              onOpenLogistics('tracking');
            }}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: currentUser?.role === 'Buyer' ? '2px solid #2563eb' : '1px solid var(--border-subtle)',
              background: currentUser?.role === 'Buyer' ? 'rgba(37, 99, 235, 0.05)' : 'var(--bg-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: '#eff6ff', color: '#1e40af', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Package size={20} />
              </div>
              <span className="badge badge-role-buyer">Buyer Persona</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Wholesale Buyer / Supermarket</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
              Track incoming fresh consignments, receive secret 4-digit OTP handover codes, and review certified produce receipts.
            </p>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1e40af', marginTop: 'auto' }}>
              Switch to Buyer (Peshala) →
            </span>
          </div>

          {/* Farmer / Seller */}
          <div
            onClick={() => {
              const seller = users.find((u) => u.role === 'Seller') || { id: 'usr-002', name: 'Sunil Bandara', role: 'Seller' };
              onSwitchUser(seller);
              onOpenLogistics('shipments');
            }}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: currentUser?.role === 'Seller' ? '2px solid var(--primary)' : '1px solid var(--border-subtle)',
              background: currentUser?.role === 'Seller' ? 'var(--primary-subtle)' : 'var(--bg-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: 'var(--primary-subtle)', color: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Sprout size={20} />
              </div>
              <span className="badge badge-role-seller">Farmer Persona</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Farmer / Producer</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
              Request farm gate truck pickup, eliminate middlemen markups, and verify temperature-controlled cargo dispatch.
            </p>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--primary)', marginTop: 'auto' }}>
              Switch to Farmer (Sunil) →
            </span>
          </div>

          {/* Transporter / Driver */}
          <div
            onClick={() => {
              const driver = users.find((u) => u.role === 'Driver') || { id: 'usr-005', name: 'Chathura Dias', role: 'Driver' };
              onSwitchUser(driver);
              onOpenLogistics('pod');
            }}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: currentUser?.role === 'Driver' ? '2px solid #ea580c' : '1px solid var(--border-subtle)',
              background: currentUser?.role === 'Driver' ? 'rgba(234, 88, 12, 0.05)' : 'var(--bg-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: '#fff7ed', color: '#9a3412', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Truck size={20} />
              </div>
              <span className="badge badge-role-driver">Transporter Persona</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>Logistics Driver / Courier</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
              View assigned agricultural route, update waypoint progress, verify customer OTP, and capture recipient signature on POD.
            </p>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#9a3412', marginTop: 'auto' }}>
              Switch to Driver (Chathura) →
            </span>
          </div>

          {/* Admin */}
          <div
            onClick={() => {
              const admin = users.find((u) => u.role === 'Admin') || { id: 'usr-001', name: 'Dilan Wanni Arachchi', role: 'Admin' };
              onSwitchUser(admin);
              onOpenLogistics('dashboard');
            }}
            style={{
              padding: '20px',
              borderRadius: 'var(--radius-lg)',
              border: currentUser?.role === 'Admin' ? '2px solid #9333ea' : '1px solid var(--border-subtle)',
              background: currentUser?.role === 'Admin' ? 'rgba(147, 51, 234, 0.05)' : 'var(--bg-subtle)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              transition: 'all 0.15s ease',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: '38px', height: '38px', borderRadius: 'var(--radius-md)', background: '#f3e8ff', color: '#6b21a8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <ShieldCheck size={20} />
              </div>
              <span className="badge badge-role-admin">Admin Lead</span>
            </div>
            <h4 style={{ fontSize: '1.05rem', margin: 0 }}>System & Logistics Admin</h4>
            <p style={{ fontSize: '0.82rem', lineHeight: 1.4 }}>
              Manage user roles and permissions, auto-match pending freight with nearest lorries, and generate audit reports.
            </p>
            <span style={{ fontSize: '0.78rem', fontWeight: 700, color: '#6b21a8', marginTop: 'auto' }}>
              Switch to Admin (Dilan) →
            </span>
          </div>
        </div>
      </section>

      {/* 5. LIVE HIGHWAY & INTER-DISTRICT CORRIDOR NETWORK STATUS */}
      <section
        style={{
          background: 'var(--bg-subtle)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border-subtle)',
          padding: '28px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', margin: 0 }}>National Agricultural Transport Corridors</h3>
            <p style={{ fontSize: '0.84rem', marginTop: '2px' }}>Live route transparency across major produce supply arteries</p>
          </div>
          <span className="badge badge-delivered">Real-Time Transit Operational</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px' }}>
          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.88rem' }}>Nuwara Eliya ➔ Western Province</strong>
              <span className="badge badge-delivered" style={{ fontSize: '0.68rem' }}>Optimal</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              A5 / A1 Highway • 4.2°C Temperature Verified • 3 Trucks Active
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.88rem' }}>Dambulla ➔ Colombo Terminal</strong>
              <span className="badge badge-delivered" style={{ fontSize: '0.68rem' }}>Heavy Flow</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              A6 Highway • Wholesale Produce Corridor • 5 Trucks Active
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.88rem' }}>Jaffna ➔ Central Wholesale</strong>
              <span className="badge badge-delivered" style={{ fontSize: '0.68rem' }}>Clear</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              A9 Highway • Onion & Dry Goods Direct Run • On Schedule
            </div>
          </div>

          <div style={{ background: 'var(--bg-surface)', padding: '14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <strong style={{ fontSize: '0.88rem' }}>Ramboda Pass (Central Hills)</strong>
              <span className="badge badge-delayed" style={{ fontSize: '0.68rem' }}>Weather Alert</span>
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
              Rainfall speed restriction • Re-routing via Gampola available
            </div>
          </div>
        </div>
      </section>

      {/* 6. INTERACTIVE FAQ ACCORDION (Customer-Friendly Clarity) */}
      <section className="card" style={{ padding: '36px' }}>
        <div style={{ maxWidth: '680px', marginBottom: '24px' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)' }}>
            Customer Guidance & FAQ
          </div>
          <h2 style={{ fontSize: '1.6rem', marginTop: '2px', marginBottom: '6px' }}>
            Frequently Asked Questions
          </h2>
          <p>
            Key details on how AgriBridge optimizes logistics, ensures transparency, and prevents fraud:
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {faqs.map((faq, idx) => {
            const isExpanded = expandedFaq === idx;
            return (
              <div
                key={idx}
                style={{
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  background: isExpanded ? 'var(--bg-subtle)' : 'var(--bg-surface)',
                  overflow: 'hidden',
                  transition: 'background 0.15s ease',
                }}
              >
                <button
                  type="button"
                  onClick={() => setExpandedFaq(isExpanded ? null : idx)}
                  style={{
                    width: '100%',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'transparent',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '0.96rem',
                    fontWeight: 700,
                    color: 'var(--text-primary)',
                  }}
                >
                  <span>{faq.q}</span>
                  {isExpanded ? <ChevronUp size={18} color="var(--primary)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
                </button>

                {isExpanded && (
                  <div style={{ padding: '0 20px 16px', fontSize: '0.88rem', lineHeight: 1.55, color: 'var(--text-secondary)' }}>
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. SLIIT IT2150 MODULE 02 SPOTLIGHT BANNER */}
      <section
        style={{
          background: 'linear-gradient(135deg, rgba(5, 150, 105, 0.08) 0%, rgba(16, 185, 129, 0.14) 100%)',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--primary-border)',
          padding: '32px 36px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
        }}
      >
        <div style={{ maxWidth: '720px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <span className="badge badge-delivered" style={{ fontWeight: 800 }}>
              Module 02 Spotlight
            </span>
            <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--primary-text)' }}>
              Developer: Wanni Arachchi W.A.D.P. (IT22601056)
            </span>
          </div>
          <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            User & Logistics Management Hub
          </h3>
          <p style={{ fontSize: '0.92rem', marginTop: '6px', color: 'var(--text-secondary)' }}>
            All operations — including Fleet Dispatch, Live GPS Tracking, Field POD with Touch Signature, 
            and Performance Reports — are organized inside a unified module container.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-secondary" onClick={onOpenOverview}>
            <Layers size={16} /> Team Architecture
          </button>
          <button className="btn btn-primary btn-lg" onClick={() => onOpenLogistics('dashboard')}>
            Enter My Module <ArrowRight size={18} />
          </button>
        </div>
      </section>
    </div>
  );
}
