import React, { useState, useRef, useEffect } from 'react';
import {
  FileCheck2,
  KeyRound,
  PenTool,
  Camera,
  CheckCircle2,
  RefreshCw,
  Printer,
  ShieldCheck,
  Truck,
  MapPin,
  AlertCircle,
  Copy,
} from 'lucide-react';

export default function PodView({ shipments, initialShipmentId, onConfirmPod }) {
  const [selectedShipmentId, setSelectedShipmentId] = useState(initialShipmentId || shipments[0]?.id || 'SHP-701');
  const [otpInput, setOtpInput] = useState('');
  const [receivedBy, setReceivedBy] = useState('');
  const [inspectionNotes, setInspectionNotes] = useState('All crates inspected upon delivery. Zero damage or spoilage.');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasSignature, setHasSignature] = useState(false);

  const shipment = shipments.find((s) => s.id === selectedShipmentId) || shipments[0];

  useEffect(() => {
    if (shipment) {
      setReceivedBy(shipment.buyerName || '');
      setOtpInput('');
      setErrorMessage('');
      setIsSubmitted(shipment.status === 'Delivered');
      clearSignature();
    }
  }, [selectedShipmentId]);

  // Canvas drawing functions
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#059669';
    setIsDrawing(true);
    setHasSignature(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    const x = (e.clientX || e.touches?.[0]?.clientX) - rect.left;
    const y = (e.clientY || e.touches?.[0]?.clientY) - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasSignature(false);
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!shipment) return;

    // Check OTP
    if (shipment.otpCode && otpInput.trim() !== shipment.otpCode.trim()) {
      setErrorMessage(`Incorrect OTP code. The customer provided OTP must match "${shipment.otpCode}".`);
      return;
    }

    let signatureData = '';
    if (canvasRef.current && hasSignature) {
      signatureData = canvasRef.current.toDataURL();
    } else {
      signatureData = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="35" font-family="sans-serif" font-size="16" fill="%23059669">Verified Digital Sign</text></svg>';
    }

    onConfirmPod(shipment.id, {
      otpCode: otpInput || shipment.otpCode,
      signatureData,
      photoUrl,
      receivedBy,
      notes: inspectionNotes,
    });

    setIsSubmitted(true);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '1.85rem' }}>Proof of Delivery (POD) Terminal</h1>
          <p style={{ marginTop: '4px' }}>
            Mobile & field-ready delivery confirmation with 4-digit OTP, digital signature, and photographic verification.
          </p>
        </div>

        {/* Shipment Selector */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontSize: '0.84rem', fontWeight: 600, color: 'var(--text-muted)' }}>Consignment:</label>
          <select
            className="select-control"
            style={{ width: 'auto', minWidth: '180px' }}
            value={selectedShipmentId}
            onChange={(e) => setSelectedShipmentId(e.target.value)}
          >
            {shipments.map((s) => (
              <option key={s.id} value={s.id}>
                {s.id} - {s.produce} ({s.status})
              </option>
            ))}
          </select>
        </div>
      </div>

      {shipment && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
          {/* Handover Form */}
          <div className="card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontSize: '1.3rem' }}>Delivery Handover Form</h2>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                  Destination: {shipment.dropoffLocation.district} ({shipment.dropoffLocation.address})
                </div>
              </div>
              <span className={`badge badge-${shipment.status.toLowerCase().replace(' ', '-')}`}>
                {shipment.status}
              </span>
            </div>

            {errorMessage && (
              <div
                style={{
                  padding: '12px 14px',
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--status-delayed-bg)',
                  color: 'var(--status-delayed-text)',
                  border: '1px solid var(--status-delayed-border)',
                  marginBottom: '16px',
                  fontSize: '0.84rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <AlertCircle size={16} />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleConfirm}>
              {/* Step 1: OTP Verification */}
              <div style={{ marginBottom: '20px', padding: '16px', background: 'var(--bg-subtle)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-primary)' }}>
                    <KeyRound size={16} color="var(--primary)" />
                    <span>1. Customer 4-Digit Handover OTP</span>
                  </label>
                  {/* Demo helper */}
                  <span
                    onClick={() => setOtpInput(shipment.otpCode || '4921')}
                    style={{ fontSize: '0.74rem', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
                    title="Click to auto-fill for testing"
                  >
                    Demo OTP: {shipment.otpCode || '4921'} (Click to fill)
                  </span>
                </div>

                <input
                  type="text"
                  maxLength={4}
                  className="input-control"
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1.5rem',
                    textAlign: 'center',
                    letterSpacing: '0.4em',
                    fontWeight: 800,
                  }}
                  placeholder="0000"
                  value={otpInput}
                  onChange={(e) => setOtpInput(e.target.value)}
                  required={!shipment.proofOfDelivery}
                  disabled={shipment.status === 'Delivered'}
                />
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', textAlign: 'center' }}>
                  Receiver must furnish the secret SMS code issued to their buyer account
                </div>
              </div>

              {/* Step 2: Receiver Info */}
              <div className="input-group">
                <label className="input-label">2. Receiver Name / Designation</label>
                <input
                  type="text"
                  className="input-control"
                  value={receivedBy}
                  onChange={(e) => setReceivedBy(e.target.value)}
                  placeholder="e.g. Peshala Mendis (Warehouse Manager)"
                  required
                  disabled={shipment.status === 'Delivered'}
                />
              </div>

              {/* Step 3: Digital Signature Pad */}
              <div className="input-group">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <PenTool size={15} color="var(--primary)" />
                    <span>3. Touch/Mouse Recipient Signature</span>
                  </label>
                  {shipment.status !== 'Delivered' && (
                    <button
                      type="button"
                      onClick={clearSignature}
                      style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', fontSize: '0.75rem', cursor: 'pointer' }}
                    >
                      Clear Pad
                    </button>
                  )}
                </div>

                <div
                  style={{
                    background: 'var(--bg-surface)',
                    border: '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <canvas
                    ref={canvasRef}
                    width={380}
                    height={120}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    onTouchStart={startDrawing}
                    onTouchMove={draw}
                    onTouchEnd={stopDrawing}
                    style={{
                      width: '100%',
                      height: '120px',
                      cursor: shipment.status === 'Delivered' ? 'default' : 'crosshair',
                      touchAction: 'none',
                    }}
                  />
                  {!hasSignature && shipment.status !== 'Delivered' && (
                    <div style={{ position: 'absolute', pointerEvents: 'none', color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                      Sign here using mouse or finger
                    </div>
                  )}
                </div>
              </div>

              {/* Step 4: Photo Proof & Notes */}
              <div className="input-group">
                <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Camera size={15} color="var(--primary)" />
                  <span>4. Photographic Produce Inspection Photo</span>
                </label>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <img
                    src={photoUrl}
                    alt="Inspection preview"
                    style={{ width: '64px', height: '64px', borderRadius: 'var(--radius-md)', objectFit: 'cover', border: '1px solid var(--border-subtle)' }}
                  />
                  <div style={{ flex: 1 }}>
                    <input
                      type="text"
                      className="input-control"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                      style={{ fontSize: '0.8rem' }}
                      placeholder="Image URL or photo capture..."
                      disabled={shipment.status === 'Delivered'}
                    />
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                      Crate batch seal & fresh produce visual inspection
                    </div>
                  </div>
                </div>
              </div>

              <div className="input-group">
                <label className="input-label">Inspection Condition Notes</label>
                <textarea
                  rows={2}
                  className="textarea-control"
                  value={inspectionNotes}
                  onChange={(e) => setInspectionNotes(e.target.value)}
                  disabled={shipment.status === 'Delivered'}
                />
              </div>

              {shipment.status !== 'Delivered' ? (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: '100%', padding: '12px', fontSize: '0.96rem' }}
                >
                  <ShieldCheck size={18} /> Verify OTP & Issue Delivery Certificate
                </button>
              ) : (
                <div
                  style={{
                    padding: '12px',
                    textAlign: 'center',
                    background: 'var(--status-delivered-bg)',
                    color: 'var(--status-delivered-text)',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: 700,
                    fontSize: '0.88rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                  }}
                >
                  <CheckCircle2 size={18} /> Proof of Delivery Fully Authenticated
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Official AgriBridge Digital POD Certificate */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <h3>Official POD Certificate</h3>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => window.print()}
                title="Print delivery voucher"
              >
                <Printer size={15} /> Print / Save PDF
              </button>
            </div>

            {/* Certificate Layout */}
            <div
              style={{
                border: '1px dashed var(--border-strong)',
                borderRadius: 'var(--radius-lg)',
                padding: '24px',
                background: 'var(--bg-surface)',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)' }}>
                    AgriBridge Sri Lanka
                  </div>
                  <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    National Agricultural Supply Chain Consortium
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '0.9rem' }}>
                    {shipment.id}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                    Order: {shipment.orderId}
                  </div>
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.82rem' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Produce:</span>
                  <div style={{ fontWeight: 600 }}>{shipment.produce}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Consignment Size:</span>
                  <div style={{ fontWeight: 600 }}>{shipment.quantityKg} kg ({shipment.crates} crates)</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Origin Farm:</span>
                  <div style={{ fontWeight: 600 }}>{shipment.pickupLocation.district}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Destination:</span>
                  <div style={{ fontWeight: 600 }}>{shipment.dropoffLocation.district}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Assigned Courier:</span>
                  <div style={{ fontWeight: 600 }}>{shipment.assignedDriverName || 'N/A'}</div>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)' }}>Vehicle Plate:</span>
                  <div style={{ fontWeight: 600 }}>{shipment.vehicleNumber || 'N/A'}</div>
                </div>
              </div>

              {shipment.proofOfDelivery ? (
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontWeight: 700, fontSize: '0.84rem' }}>
                    <ShieldCheck size={16} /> Certified Handover Authenticated
                  </div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                    Received by <strong>{shipment.proofOfDelivery.receivedBy}</strong> on{' '}
                    {new Date(shipment.proofOfDelivery.verifiedAt).toLocaleString()}
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginTop: '6px' }}>
                    {shipment.proofOfDelivery.signatureData && (
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Recipient Sign:</div>
                        <img
                          src={shipment.proofOfDelivery.signatureData}
                          alt="Signature"
                          style={{ maxHeight: '42px', borderBottom: '1px solid var(--border-strong)' }}
                        />
                      </div>
                    )}
                    {shipment.proofOfDelivery.photoUrl && (
                      <div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Inspection:</div>
                        <img
                          src={shipment.proofOfDelivery.photoUrl}
                          alt="Delivery photo"
                          style={{ width: '42px', height: '42px', borderRadius: '4px', objectFit: 'cover' }}
                        />
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div style={{ borderTop: '1px solid var(--border-light)', paddingTop: '12px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.82rem' }}>
                  Awaiting driver & recipient OTP signoff. Complete the form to validate.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
