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
