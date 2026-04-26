/**
 * Fetches a coupon code from the backend API based on a promo code
 * 
 * @async
 * @function fetchCouponCode
 * @param {string} promoCode - The promotional code to look up
 * @returns {Promise<string>} A promise that resolves to the coupon code string if found, or an empty string if not found or on error
 * 
 * @description
 * This function makes a GET request to the Pro Mount backend API to retrieve a coupon code
 * associated with the provided promo code. It handles the following scenarios:
 * - Successfully retrieves and returns the coupon code from the API response
 * - Returns an empty string if the coupon code is not found in the response
 * - Returns an empty string and logs the error if the API request fails
 * - Returns an empty string if the promo code parameter is invalid/empty
 * 
 * @example
 * // Fetch a coupon code with a valid promo code
 * const couponCode = await fetchCouponCode('SUMMER2026');
 * console.log(couponCode); // 'DISCOUNT50' or empty string
 * 
 * @example
 * // Handle the result
 * const couponCode = await fetchCouponCode('WELCOME10');
 * if (couponCode) {
 *   console.log('Coupon found:', couponCode);
 * } else {
 *   console.log('No coupon code found');
 * }
 */
const COUPON_LOOKUP_ENDPOINT =
  'https://promountbackend-914264443.development.catalystserverless.com/server/pro_mount_backend_function/getCouponCode';

const normalizeCode = (value) => (value || '').toString().trim().toUpperCase();

const extractCouponCode = (payload) => {
  if (!payload) return '';

  if (typeof payload === 'string') {
    return normalizeCode(payload);
  }

  const candidates = [
    payload.couponCode,
    payload.promoCode,
    payload.output,
    payload?.details?.output,
    payload?.data?.couponCode,
    payload?.data?.promoCode
  ];

  for (const candidate of candidates) {
    if (typeof candidate === 'string' && candidate.trim()) {
      return normalizeCode(candidate);
    }
  }

  return '';
};

export const fetchCouponCodeFromPromoSource = async (promoSourceCode = '') => {
  const promoCode = (promoSourceCode || '').toString().trim();
  if (!promoCode) return '';

  const response = await fetch(
    `${COUPON_LOOKUP_ENDPOINT}?promoCode=${encodeURIComponent(promoCode)}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json'
      }
    }
  );

  const rawText = await response.text();
  let payload = rawText;
  try {
    payload = JSON.parse(rawText);
  } catch {
    // Keep raw string payload fallback.
  }

  if (!response.ok) {
    const message =
      (typeof payload === 'object' && payload?.message) ||
      `Coupon lookup failed (HTTP ${response.status})`;
    throw new Error(message);
  }

  return extractCouponCode(payload);
};