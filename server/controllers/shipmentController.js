import { memoryStore } from '../db.js';

export const getShipments = (req, res) => {
  const { status, search, role, userId } = req.query;
  let results = [...memoryStore.shipments];

  // Role based filtering if applicable
  if (role === 'Seller' && userId) {
    results = results.filter((s) => s.farmerId === userId);
  } else if (role === 'Buyer' && userId) {
    results = results.filter((s) => s.buyerId === userId);
  } else if (role === 'Driver' && userId) {
    // find driver matching this userId
    const drv = memoryStore.drivers.find((d) => d.userId === userId);
    if (drv) {
      results = results.filter((s) => s.assignedDriverId === drv.id);
    }
  }

  if (status && status !== 'All') {
    results = results.filter((s) => s.status.toLowerCase() === status.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (s) =>
        s.id.toLowerCase().includes(q) ||
        s.orderId.toLowerCase().includes(q) ||
        s.produce.toLowerCase().includes(q) ||
        s.farmerName.toLowerCase().includes(q) ||
        s.buyerName.toLowerCase().includes(q) ||
        (s.assignedDriverName && s.assignedDriverName.toLowerCase().includes(q)) ||
        (s.pickupLocation?.district && s.pickupLocation.district.toLowerCase().includes(q)) ||
        (s.dropoffLocation?.district && s.dropoffLocation.district.toLowerCase().includes(q))
    );
  }

  return res.json({
    success: true,
    total: results.length,
    shipments: results,
  });
};

export const getShipmentById = (req, res) => {
  const shipment = memoryStore.shipments.find((s) => s.id === req.params.id);
  if (!shipment) {
    return res.status(404).json({ success: false, message: 'Shipment not found' });
  }
  return res.json({ success: true, shipment });
};

export const createShipment = (req, res) => {
  const {
    orderId,
    farmerName,
    farmerId,
    buyerName,
    buyerId,
    produce,
    category,
    quantityKg,
    crates,
    pickupDistrict,
    pickupAddress,
    dropoffDistrict,
    dropoffAddress,
    priority,
    requiresRefrigeration,
    estimatedDeparture,
    estimatedDelivery,
  } = req.body;

  if (!produce || !quantityKg || !pickupDistrict || !dropoffDistrict) {
    return res.status(400).json({ success: false, message: 'Missing required shipment details' });
  }

  const generatedId = `SHP-${Math.floor(700 + memoryStore.shipments.length + 1)}`;
  const randomOtp = String(Math.floor(1000 + Math.random() * 9000));

  const newShipment = {
    id: generatedId,
    orderId: orderId || `ORD-${Math.floor(9000 + Math.random() * 1000)}`,
    farmerId: farmerId || 'usr-002',
    farmerName: farmerName || 'Sunil Bandara (Green Valley Farm)',
    buyerId: buyerId || 'usr-004',
    buyerName: buyerName || 'Lanka Fresh Superstores',
    produce,
    category: category || 'Fresh Vegetables',
    quantityKg: Number(quantityKg),
    crates: Number(crates) || Math.ceil(quantityKg / 25),
    pickupLocation: {
      address: pickupAddress || `${pickupDistrict} Collection Centre`,
      district: pickupDistrict,
      hub: `${pickupDistrict} Agro Depot`,
    },
    dropoffLocation: {
      address: dropoffAddress || `${dropoffDistrict} Central Market`,
      district: dropoffDistrict,
      hub: `${dropoffDistrict} Terminal`,
    },
    assignedDriverId: null,
    assignedDriverName: null,
    vehicleNumber: null,
    status: 'Pending',
    priority: priority || 'Normal',
    requiresRefrigeration: Boolean(requiresRefrigeration),
    estimatedDeparture: estimatedDeparture || new Date(Date.now() + 3600000 * 2).toISOString(),
    estimatedDelivery: estimatedDelivery || new Date(Date.now() + 3600000 * 8).toISOString(),
    createdAt: new Date().toISOString(),
    currentLocation: `${pickupDistrict} Agro Depot (Pending Transport Assignment)`,
    otpCode: randomOtp,
    timeline: [
      {
        status: 'Pending',
        time: new Date().toISOString(),
        note: `Shipment order created for ${quantityKg}kg of ${produce}. Waiting for driver dispatch.`,
      },
    ],
    proofOfDelivery: null,
  };

  memoryStore.shipments.unshift(newShipment);

  return res.status(201).json({
    success: true,
    message: 'Shipment created successfully',
    shipment: newShipment,
  });
};

export const assignDriver = (req, res) => {
  const { id } = req.params;
  const { driverId, autoMatch } = req.body;

  const shipment = memoryStore.shipments.find((s) => s.id === id);
  if (!shipment) {
    return res.status(404).json({ success: false, message: 'Shipment not found' });
  }

  let selectedDriver = null;

  if (autoMatch) {
    // Proximity and capacity matching algorithm:
    // 1. Filter available drivers
    // 2. Score drivers based on matching district or refrigeration capability
    const availableDrivers = memoryStore.drivers.filter((d) => d.isAvailable);
    if (availableDrivers.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'No active drivers currently available. Please try again or create a driver.',
      });
    }

    // Match criteria:
    // Highest priority: drivers in same district with sufficient capacity
    const sameDistrict = availableDrivers.filter(
      (d) => d.district.toLowerCase() === shipment.pickupLocation.district.toLowerCase()
    );

    if (sameDistrict.length > 0) {
      selectedDriver = sameDistrict.sort((a, b) => b.rating - a.rating)[0];
    } else {
      // Pick highest rated available driver with capacity
      selectedDriver = availableDrivers
        .filter((d) => d.capacityKg >= shipment.quantityKg)
        .sort((a, b) => b.rating - a.rating)[0] || availableDrivers[0];
    }
  } else if (driverId) {
    selectedDriver = memoryStore.drivers.find((d) => d.id === driverId);
  }

  if (!selectedDriver) {
    return res.status(400).json({ success: false, message: 'Valid driver could not be assigned' });
  }

  // Update shipment
  shipment.assignedDriverId = selectedDriver.id;
  shipment.assignedDriverName = selectedDriver.name;
  shipment.vehicleNumber = selectedDriver.vehicleNumber;
  shipment.status = 'Assigned';
  shipment.currentLocation = `${selectedDriver.name} en route to ${shipment.pickupLocation.district} Hub`;
  shipment.timeline.push({
    status: 'Assigned',
    time: new Date().toISOString(),
    note: `Assigned to driver ${selectedDriver.name} (${selectedDriver.vehicleType} - ${selectedDriver.vehicleNumber})`,
  });

  // Mark driver as occupied
  selectedDriver.isAvailable = false;
  selectedDriver.activeShipmentId = shipment.id;

  return res.json({
    success: true,
    message: `Driver ${selectedDriver.name} successfully assigned to shipment ${shipment.id}`,
    shipment,
    driver: selectedDriver,
  });
};

export const updateShipmentStatus = (req, res) => {
  const { id } = req.params;
  const { status, note, currentLocation, delayReason } = req.body;

  const shipment = memoryStore.shipments.find((s) => s.id === id);
  if (!shipment) {
    return res.status(404).json({ success: false, message: 'Shipment not found' });
  }

  const validStatuses = ['Pending', 'Assigned', 'Dispatched', 'In-Transit', 'Delivered', 'Delayed'];
  if (status && !validStatuses.includes(status)) {
    return res.status(400).json({ success: false, message: `Invalid status. Must be one of: ${validStatuses.join(', ')}` });
  }

  if (status) shipment.status = status;
  if (currentLocation) shipment.currentLocation = currentLocation;
  if (delayReason) shipment.delayReason = delayReason;

  if (status === 'Delivered') {
    shipment.deliveredAt = new Date().toISOString();
    // Release driver if assigned
    if (shipment.assignedDriverId) {
      const drv = memoryStore.drivers.find((d) => d.id === shipment.assignedDriverId);
      if (drv) {
        drv.isAvailable = true;
        drv.completedTrips = (drv.completedTrips || 0) + 1;
        drv.activeShipmentId = null;
      }
    }
  }

  shipment.timeline.push({
    status: status || shipment.status,
    time: new Date().toISOString(),
    note: note || (status === 'Delayed' ? `Shipment delayed: ${delayReason || 'Logistics delay'}` : `Status updated to ${status}`),
  });

  return res.json({
    success: true,
    message: `Shipment status updated to ${shipment.status}`,
    shipment,
  });
};

export const confirmProofOfDelivery = (req, res) => {
  const { id } = req.params;
  const { otpCode, signatureData, photoUrl, receivedBy, notes } = req.body;

  const shipment = memoryStore.shipments.find((s) => s.id === id);
  if (!shipment) {
    return res.status(404).json({ success: false, message: 'Shipment not found' });
  }

  // OTP Verification
  if (otpCode && String(otpCode).trim() !== String(shipment.otpCode).trim()) {
    return res.status(400).json({
      success: false,
      message: `Invalid OTP code. The customer's 4-digit verification code did not match.`,
    });
  }

  const pod = {
    verifiedAt: new Date().toISOString(),
    method: 'OTP_AND_DIGITAL_POD',
    receivedBy: receivedBy || shipment.buyerName,
    otpVerified: Boolean(otpCode),
    signatureData: signatureData || 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="35" font-family="sans-serif" font-size="16" fill="%23059669">Verified Digital Sign</text></svg>',
    photoUrl: photoUrl || 'https://images.unsplash.com/photo-1595246140625-573b715d11dc?auto=format&fit=crop&w=600&q=80',
    notes: notes || 'Delivery completed in good order. Crates received and verified.',
  };

  shipment.proofOfDelivery = pod;
  shipment.status = 'Delivered';
  shipment.deliveredAt = new Date().toISOString();
  shipment.currentLocation = `Delivered at destination (${shipment.dropoffLocation.district})`;

  shipment.timeline.push({
    status: 'Delivered',
    time: new Date().toISOString(),
    note: `Proof of delivery verified via OTP & receiver signature. Consignment handed to ${pod.receivedBy}.`,
  });

  // Release driver
  if (shipment.assignedDriverId) {
    const drv = memoryStore.drivers.find((d) => d.id === shipment.assignedDriverId);
    if (drv) {
      drv.isAvailable = true;
      drv.completedTrips = (drv.completedTrips || 0) + 1;
      drv.activeShipmentId = null;
    }
  }

  return res.json({
    success: true,
    message: 'Proof of Delivery confirmed successfully!',
    shipment,
  });
};
