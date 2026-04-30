/**
 * @desc    Calculate delivery cost based on distance
 * @param   {number} distance - Distance in kilometers
 * @returns {number} Cost
 */
export const calculateDeliveryCost = (distance) => {
  const baseRate = 5.00; // Base rate for first 10km
  if (distance <= 10) return baseRate;
  
  const additionalKm = distance - 10;
  const additionalCost = additionalKm * 0.50;
  return parseFloat((baseRate + additionalCost).toFixed(2));
};

/**
 * @desc    Simulate assigning a delivery partner
 * @returns {string} Partner Name
 */
export const assignDeliveryPartner = () => {
  const partners = ['XpressPost', 'FastTrack', 'SwiftShip', 'GlobalDelivery'];
  return partners[Math.floor(Math.random() * partners.length)];
};

/**
 * @desc    Generate a mock tracking ID
 */
export const generateTrackingId = () => {
  return `TRK${Math.random().toString(36).substring(2, 12).toUpperCase()}`;
};

/**
 * @desc    Calculate Estimated Delivery Date
 */
export const getEstimatedDeliveryDate = (distance) => {
  const days = Math.ceil(distance / 200) + 1; // 200km per day + 1 day processing
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};
