/**
 * Zoho CRM Deluge function: getcouponcode.
 * Input promo (campaign) code comes from booking URL query `book=...`.
 * Function returns a coupon code string (e.g. APTSAVE30).
 */

const trimPromoString = (value) => (value == null ? '' : String(value).trim());

export function parseZohoCouponResponse(json) {
  if (!json || json.code !== 'success') {
    const msg = json?.message || json?.code || 'Promo lookup failed';
    throw new Error(msg);
  }

  let raw = json?.details?.output;
  if (raw == null) return '';

  let text = trimPromoString(typeof raw === 'string' ? raw : String(raw));
  if (!text) return '';

  if (text.startsWith('{') || text.startsWith('[')) {
    try {
      const parsed = JSON.parse(text);
      const candidate =
        parsed?.promoCode ??
        parsed?.promocode ??
        parsed?.Promo_Code ??
        parsed?.code ??
        parsed?.output;
      if (typeof candidate === 'string' && candidate.trim()) {
        text = candidate.trim();
      }
    } catch {
      // keep original text
    }
  }

  return text.toUpperCase();
}

export async function fetchCouponCodeFromPromoCode(rawPromoCode = '') {
  const promoCode = trimPromoString(rawPromoCode);
  if (!promoCode) return '';

  const baseUrl = "https://www.zohoapis.com/crm/v7/functions/getcouponcode/actions/execute?auth_type=apikey&zapikey=1003.caa46cb9fa86aa10db21e55b7fe0e06f.52f5adc4402ccbf57c49250fc4580890";// import.meta.env.VITE_ZOHO_GET_COUPON_URL?.trim();
  if (!baseUrl) {
    throw new Error(
      'Promo lookup is not configured. Set VITE_ZOHO_GET_COUPON_URL to the Zoho getcouponcode execute URL.'
    );
  }

  const requestUrl = `${baseUrl}${baseUrl.includes('?') ? '&' : '?'}promoCode=${encodeURIComponent(promoCode)}`;

  const response = await fetch(
    `https://promountbackend-914264443.development.catalystserverless.com/server/pro_mount_backend_function/getCouponCode?promoCode=${promoCode}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }
  );

  let json = {};
  try {
    json = await response.json();
  } catch {
    throw new Error('Promo lookup returned a non-JSON response');
  }

  if (!response.ok) {
    throw new Error(json?.message || `Promo lookup failed (HTTP ${response.status})`);
  }

  return parseZohoCouponResponse(json);
}