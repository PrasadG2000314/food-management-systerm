import { memoryStore } from '../db.js';

export const getDrivers = (req, res) => {
  const { available, district, search } = req.query;
  let results = [...memoryStore.drivers];

  if (available !== undefined && available !== 'All') {
    const isAvail = available === 'true';
    results = results.filter((d) => d.isAvailable === isAvail);
  }

  if (district && district !== 'All') {
    results = results.filter((d) => d.district.toLowerCase() === district.toLowerCase());
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (d) =>
        d.name.toLowerCase().includes(q) ||
        d.vehicleNumber.toLowerCase().includes(q) ||
        d.vehicleType.toLowerCase().includes(q) ||
        d.currentLocation.toLowerCase().includes(q)
    );
  }

  return res.json({
    success: true,
    total: results.length,
    drivers: results,
  });
};

export const updateDriverLocation = (req, res) => {
  const { id } = req.params;
  const { currentLocation, isAvailable } = req.body;

  const driver = memoryStore.drivers.find((d) => d.id === id);
  if (!driver) {
    return res.status(404).json({ success: false, message: 'Driver not found' });
  }

  if (currentLocation) driver.currentLocation = currentLocation;
  if (isAvailable !== undefined) driver.isAvailable = isAvailable;

  return res.json({
    success: true,
    message: 'Driver location/availability updated',
    driver,
  });
};
