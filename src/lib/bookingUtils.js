export const SALES_TAX_RATE = 0.0825;
export const VOLUME_DISCOUNT_THRESHOLD = 200;
export const VOLUME_DISCOUNT_AMOUNT = 30;
export const WEEKDAY_DISCOUNT_RATE = 0.10;

export const MULTI_TV_DISCOUNTS = {
  two: 0.10,
  three: 0.15,
  fourPlus: 0.20
};

export const PRICING = {
  TRIP_CHARGE: 19,
  TV_SIZES: {
    under24: { label: 'Under 24"', price: 29 },
    size25to55: { label: '25-55"', price: 99 },
    size56to75: { label: '56-75"', price: 119 },
    size76to85: { label: '76-85"', price: 129 },
    over86: { label: 'Over 86"', price: 159 }
  },
  TECHS: {
    one: { label: '1 Technician', price: 0 },
    two: { label: '2 Technicians', price: 59 }
  },
  MOUNT_TYPES: {
    own: { label: 'Already Have Mount', price: 0 },
    fixed: { label: 'Fixed Mount', price: 39 },
    tilt: { label: 'Tilt Mount', price: 49 },
    corner: { label: 'Corner Mount', price: 69 },
    fullMotion: { label: 'Full Motion', price: 69 },
    ceiling: { label: 'Ceiling Mount', price: 69 }
  },
  WALL_TYPES: {
    drywall: { label: 'Drywall', price: 0 },
    brick: { label: 'Brick/Concrete', price: 49 },
    stone: { label: 'Stone/Tile/Marble', price: 89 }
  },
  CABLE_MANAGEMENT: {
    exposed: { label: 'Exposed Wires', price: 0 },
    channel: { label: 'Cable Channel', price: 39 },
    inWallDrywall: { label: 'In-Wall (Drywall)', price: 89 },
    inWallPowerDrywall: { label: 'In-Wall + Power (Drywall)', price: 119 },
    inWallNonDrywall: { label: 'In-Wall (Hard Surface)', price: 249 },
    inWallPowerNonDrywall: { label: 'In-Wall + Power (Hard Surface)', price: 289 }
  },
  EXTRAS: {
    soundbar: { label: 'Soundbar Mounting', price: 59 },
    shelf: { label: 'Shelf Installation', price: 49 },
    other: { label: 'Other Installation', price: 49 }
  }
};

export const INITIAL_FORM_DATA = {
  tvSize: null,
  techCount: null,
  mountType: null,
  wallType: null,
  cableManagement: null,
  extras: [],
  tvCount: 1,
  multiTVDiscount: false,
  date: '',
  timeSlot: '',
  address: { street: '', apt: '', city: '', state: 'TX', zip: '' },
  contact: { fullName: '', phone: '', email: '' },
  instructions: '',
  marketing: false,
  terms: false,
  smsConsent: false
};

export const validateEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const validatePhone = (phone) => {
  const cleaned = ('' + phone).replace(/\D/g, '');
  return cleaned.length === 10;
};

export const formatPhone = (value) => {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;
  if (phoneNumberLength < 4) return phoneNumber;
  if (phoneNumberLength < 7) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  }
  return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
};

export const validateZIP = (zip) => {
  return /^\d{5}$/.test(zip);
};

export const validateRequired = (value) => {
  if (typeof value === 'string') return value.trim().length > 0;
  return value !== null && value !== undefined && value !== false;
};

export const calculateSalesTax = (amount) => {
  return amount * SALES_TAX_RATE;
};

const normalizePromoCode = (value) => (value || '').toString().trim().toUpperCase();

const PROMO_RULES = {
  APTSAVE10PER: {
    kind: 'percent',
    value: 0.10,
    label: 'Coupon 10%',
    allowsVolumeDiscount: true,
    allowsWeekdayDiscount: false
  },
  APTSAVE30: {
    kind: 'fixed',
    value: 30,
    label: 'Coupon $30',
    allowsVolumeDiscount: false,
    allowsWeekdayDiscount: true
  },
  APTSAVE35: {
    kind: 'fixed',
    value: 35,
    label: 'Coupon $35',
    allowsVolumeDiscount: false,
    allowsWeekdayDiscount: true
  },
  APTSAVE40: {
    kind: 'fixed',
    value: 40,
    label: 'Coupon $40',
    allowsVolumeDiscount: false,
    allowsWeekdayDiscount: true
  }
};

const resolvePromoRule = (rawPromoCode) => {
  const normalized = normalizePromoCode(rawPromoCode);
  if (!normalized) return null;

  // Accept a few known variants from marketing sheets/links.
  if (normalized === 'APTSAVE=35' || normalized === 'APTSAVE-35') {
    return { ...PROMO_RULES.APTSAVE35, code: normalized };
  }

  const directMatch = PROMO_RULES[normalized];
  return directMatch ? { ...directMatch, code: normalized } : null;
};

export const calculatePrice = (data) => {
  const tvCount = 1;
  let unitPrice = 0;
  
  // Base Item Prices (Per TV)
  unitPrice += PRICING.TV_SIZES[data.tvSize]?.price || 0;
  unitPrice += PRICING.MOUNT_TYPES[data.mountType]?.price || 0;
  unitPrice += PRICING.WALL_TYPES[data.wallType]?.price || 0;
  unitPrice += PRICING.CABLE_MANAGEMENT[data.cableManagement]?.price || 0;

  // Extras (Per TV)
  data.extras.forEach(extra => {
    unitPrice += PRICING.EXTRAS[extra]?.price || 0;
  });

  // Techs (Per Visit - Not Multiplied)
  const techPrice = PRICING.TECHS[data.techCount]?.price || 0;

  // 1. Calculate Subtotal + Trip Charge
  const subtotal = (unitPrice * tvCount) + techPrice;
  const tripCharge = PRICING.TRIP_CHARGE;
  const baseAmount = subtotal + tripCharge;

  // `book` is often a campaign slug (e.g. GENERIC10-DFW); only use it for discounts when it maps to a known coupon.
  const fromPromo = normalizePromoCode(data?.promoCode);
  const fromBook = normalizePromoCode(data?.book);
  const promoRule = resolvePromoRule(fromPromo) || resolvePromoRule(fromBook);
  const resolvedPromoCode = resolvePromoRule(fromPromo)
    ? fromPromo
    : resolvePromoRule(fromBook)
      ? fromBook
      : '';
  const hasPromoRule = Boolean(promoRule);

  let couponDiscount = 0;
  if (promoRule) {
    if (promoRule.kind === 'percent') {
      couponDiscount = baseAmount * promoRule.value;
    } else if (promoRule.kind === 'fixed') {
      couponDiscount = Math.min(baseAmount, promoRule.value);
    }
  }

  const amountAfterCoupon = Math.max(0, baseAmount - couponDiscount);

  // 2. Pricing Discount ($30 for orders > $200)
  let volumeDiscount = 0;
  const canApplyVolumeDiscount = hasPromoRule
    ? promoRule.allowsVolumeDiscount
    : true;
  if (canApplyVolumeDiscount && baseAmount > VOLUME_DISCOUNT_THRESHOLD) {
    volumeDiscount = VOLUME_DISCOUNT_AMOUNT;
  }

  // Result from step 1
  const amountAfterVolume = Math.max(0, amountAfterCoupon - volumeDiscount);

  // 3. Monday & Tuesday Discount (10% on the result of step 1)
  let dayOfWeekDiscount = 0;
  let saturdaySurcharge = 0;
  let dayOfWeek = null;
  if (data.date) {
    const [year, month, day] = data.date.split('-').map(Number);
    const dateObj = new Date(year, month - 1, day);
    dayOfWeek = dateObj.getDay();
    
    // Check if Monday (1) or Tuesday (2)
    const isMondayOrTuesday = dayOfWeek === 1 || dayOfWeek === 2;
    const canApplyWeekdayDiscount = hasPromoRule
      ? promoRule.allowsWeekdayDiscount
      : true;
    if (isMondayOrTuesday && canApplyWeekdayDiscount) {
      dayOfWeekDiscount = amountAfterVolume * WEEKDAY_DISCOUNT_RATE;
    }

    if (dayOfWeek === 6) {
      saturdaySurcharge = 29;
    }
    
  }

  // 4. Subtotal after discounts (Result 2)
  const taxableAmount = Math.max(0, amountAfterVolume - dayOfWeekDiscount);
  
  // 5. Apply sales tax
  const salesTax = calculateSalesTax(taxableAmount);
  
  // 6. Final estimated total
  const estimatedTotal = taxableAmount + salesTax //+ saturdaySurcharge;

  return {
    subtotal,
    tripCharge,
    baseAmount,
    promoCode: resolvedPromoCode,
    promoLabel: promoRule?.label || null,
    couponDiscount,
    volumeDiscount,
    dayOfWeekDiscount,
    taxableAmount,
    salesTax,
    estimatedTotal,
    discount: couponDiscount + volumeDiscount + dayOfWeekDiscount, // for compatibility
    saturdaySurcharge
  };
};

export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount);
};