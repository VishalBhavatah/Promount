import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ChevronUp, X, Pencil } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  INITIAL_FORM_DATA, 
  validateRequired, 
  calculatePrice,
  validateEmail, 
  validatePhone, 
  validateZIP,
  formatPhone,
  PRICING
} from '@/lib/bookingUtils';
import Step1 from '@/components/booking/Step1';
import Step2 from '@/components/booking/Step2';
import Step3 from '@/components/booking/Step3';
import PriceBreakdown from '@/components/booking/PriceBreakdown';
import SuccessState from '@/components/booking/SuccessState';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchCouponCodeFromPromoSource } from '@/lib/couponService';
import { cn } from '@/lib/utils';

// Progress Indicator
const STEPS = [
  { label: 'Your TV' },
  { label: 'Installation' },
  { label: 'Schedule' },
  { label: 'Contact' },
];

const ProgressIndicator = ({ formData }) => {
  const completedSteps = [
    !!(formData.tvSize && formData.mountType),
    !!(formData.wallType && formData.cableManagement),
    !!(formData.date && formData.timeSlot),
    !!(formData.contact?.phone && validatePhone(formData.contact.phone)),
  ];
  const currentStep = completedSteps.lastIndexOf(true) + 1;
  return (
    <div className="flex items-center w-full px-2">
      {STEPS.map((step, i) => {
        const done = completedSteps[i];
        const active = i === currentStep;
        return (
          <React.Fragment key={step.label}>
            <div className="flex flex-col items-center">
              <div className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all",
                done ? "bg-green-500 border-green-500 text-white"
                  : active ? "bg-white border-orange-500 text-orange-500"
                  : "bg-white border-gray-300 text-gray-400"
              )}>
                {done ? <Check className="w-3.5 h-3.5" /> : <span>{i + 1}</span>}
              </div>
              <span className={cn(
                "text-[10px] font-semibold mt-1 whitespace-nowrap",
                done ? "text-green-600" : active ? "text-orange-500" : "text-gray-400"
              )}>
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className={cn(
                "flex-1 h-0.5 mb-4 mx-1 transition-all",
                completedSteps[i] ? "bg-green-400" : "bg-gray-200"
              )} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

// Recap card shown at top of Step 3
const RecapCard = ({ formData, onEditInstallation, onEditSchedule }) => {
  const tvLabel = formData.tvSize ? PRICING.TV_SIZES[formData.tvSize]?.label : null;
  const mountLabel = formData.mountType ? PRICING.MOUNT_TYPES[formData.mountType]?.label : null;
  const wallLabel = formData.wallType ? PRICING.WALL_TYPES[formData.wallType]?.label : null;
  const cableLabel = formData.cableManagement ? PRICING.CABLE_MANAGEMENT[formData.cableManagement]?.label : null;
  const extrasLabel = formData.extras?.length > 0
    ? formData.extras.map(k => PRICING.EXTRAS[k]?.label).filter(Boolean).join(' · ')
    : null;
  const techLabel = formData.techCount === 'two' ? '2nd Technician' : null;

  const formatDate = (iso) => {
    if (!iso) return null;
    const [y, m, d] = iso.split('-').map(Number);
    const date = new Date(y, m - 1, d);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
  };

  const timeLabels = {
    morning: '8 AM – 12 PM',
    afternoon: '12 PM – 5 PM',
    evening: '5 PM – 8 PM',
    flexible: 'Flexible',
  };

  const addressLine = [formData.address?.street, formData.address?.city]
    .filter(Boolean).join(', ');

  return (
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6 space-y-3">
      <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wide">Your Selections</h4>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-gray-500 font-medium">Installation</p>
          <p className="text-sm text-gray-900 font-semibold">{[tvLabel, mountLabel].filter(Boolean).join(' · ') || '—'}</p>
        </div>
        <button onClick={onEditInstallation} className="flex items-center gap-1 text-orange-500 text-xs font-semibold hover:text-orange-600"><Pencil className="w-3 h-3" /> Edit</button>
      </div>
      {(wallLabel || cableLabel) && (
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Wall & Cables</p>
            <p className="text-sm text-gray-900 font-semibold">{[wallLabel, cableLabel].filter(Boolean).join(' · ')}</p>
          </div>
          <button onClick={onEditInstallation} className="flex items-center gap-1 text-orange-500 text-xs font-semibold hover:text-orange-600"><Pencil className="w-3 h-3" /> Edit</button>
        </div>
      )}
      {(extrasLabel || techLabel) && (
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Other Services</p>
            <p className="text-sm text-gray-900 font-semibold">{[techLabel, extrasLabel].filter(Boolean).join(' · ')}</p>
          </div>
          <button onClick={onEditInstallation} className="flex items-center gap-1 text-orange-500 text-xs font-semibold hover:text-orange-600"><Pencil className="w-3 h-3" /> Edit</button>
        </div>
      )}
      {(formData.date || formData.timeSlot) && (
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">Date & Time</p>
            <p className="text-sm text-gray-900 font-semibold">{[formatDate(formData.date), timeLabels[formData.timeSlot]].filter(Boolean).join(' · ')}</p>
          </div>
          <button onClick={onEditSchedule} className="flex items-center gap-1 text-orange-500 text-xs font-semibold hover:text-orange-600"><Pencil className="w-3 h-3" /> Edit</button>
        </div>
      )}

    </div>
  );
};

const BookingPage = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const bookPromoCode = new URLSearchParams(location.search).get('book')?.trim() || '';
  
  const [formData, setFormData] = useState({
    ...INITIAL_FORM_DATA,
    terms: false,
    smsConsent: false
  });
  const [tvPath, setTvPath] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stripeCheckoutUrl, setStripeCheckoutUrl] = useState(null);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [resolvedPromoCode, setResolvedPromoCode] = useState('');

  const topRef = useRef(null);
  const step2Ref = useRef(null);
  const step3Ref = useRef(null);

  useEffect(() => { window.scrollTo(0, 0); }, []);

  useEffect(() => {
    if (topRef.current && isSuccess) {
      const y = topRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [isSuccess]);

  useEffect(() => {
    let isMounted = true;
    const loadPromoCode = async () => {
      if (!bookPromoCode) { setResolvedPromoCode(''); return; }
      try {
        const promo = await fetchCouponCodeFromPromoSource(bookPromoCode);
        if (isMounted) setResolvedPromoCode(promo);
      } catch (error) {
        if (isMounted) setResolvedPromoCode('');
        console.warn('[BookingPage] Promo lookup on load failed:', error);
      }
    };
    loadPromoCode();
    return () => { isMounted = false; };
  }, [bookPromoCode]);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    const newErrors = { ...errors };
    Object.keys(newData).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const handleSelectPath = (path) => {
    setTvPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToRef = (ref) => {
    if (ref.current) {
      const y = ref.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const isFormValid = Boolean(
    formData.date &&
    formData.timeSlot &&
    formData.contact?.phone &&
    validatePhone(formData.contact.phone) &&
    formData.contact?.email &&
    validateEmail(formData.contact.email) &&
    formData.terms
  );

  const validateAll = () => {
    const newErrors = {};
    if (!validateRequired(formData.date)) newErrors.date = 'Date is required';
    if (!validateRequired(formData.timeSlot)) newErrors.timeSlot = 'Time slot is required';
    if (!validateRequired(formData.contact.phone) || !validatePhone(formData.contact.phone)) newErrors['contact.phone'] = 'Valid 10-digit phone required';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    if (formData.contact.email && !validateEmail(formData.contact.email)) newErrors['contact.email'] = 'Valid email required';
    if (formData.address.zip && !validateZIP(formData.address.zip)) newErrors['address.zip'] = 'Valid 5-digit ZIP required';
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast({ variant: "destructive", title: "Please fix the errors", description: "Some required fields are missing or invalid." });
      if (topRef.current) {
        const y = topRef.current.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;
    setIsSubmitting(true);
    try {
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomNum = Math.floor(Math.random() * 900000) + 100000;
      const confirmationNumber = `PM-${dateStr}-${randomNum}`;
      const payloadBase = {
        ...formData,
        contact: { ...formData.contact, name: (formData.contact.fullName || '').trim(), phone: formatPhone(formData.contact.phone) },
        ...(bookPromoCode ? { promoCode: bookPromoCode } : {}),
        ...(resolvedPromoCode ? { couponCode: resolvedPromoCode } : {}),
        confirmationNumber
      };
      const payload = { ...payloadBase, couponDiscount: calculatePrice(payloadBase).couponDiscount };
      const response = await fetch(
        "https://promountbackend-914264443.development.catalystserverless.com/server/pro_mount_backend_function/create_fsm_order",
        { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) }
      );
      const result = await response.json();
      if (!response.ok) throw new Error(result?.message || "Request failed");
      if (result?.checkoutUrl) setStripeCheckoutUrl(result.checkoutUrl);
      if (typeof window !== 'undefined' && window.fbq) window.fbq('track', 'Lead');
      setFormData(payload);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      toast({ variant: "default", title: "Booking confirmed!", description: "Your request has been processed successfully." });
    } catch (error) {
      toast({ variant: "destructive", title: "Booking Failed", description: error.message || "An unknown error occurred while saving your booking." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setTvPath(null);
    setResolvedPromoCode('');
    setFormData({ ...INITIAL_FORM_DATA, terms: false, smsConsent: false });
    setErrors({});
    setShowMobileSummary(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const livePrice = calculatePrice({ ...formData, promoCode: resolvedPromoCode, book: bookPromoCode });
  const hasDiscount = livePrice.discount > 0;
  const originalTotal = livePrice.estimatedTotal + livePrice.discount;
  const showFullFlow = tvPath === 'single';

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Helmet>
        <title>Book Your Installation - Pro Mount USA</title>
        <meta name="description" content="Book your professional TV mounting and installation service online instantly with Pro Mount USA." />
      </Helmet>
      <style>{`.fixed.bottom-6.right-6.z-\\[60\\] { display: none !important; }`}</style>

      <Header />

      {/* Mobile Progress Bar — pinned just below header */}
      {!isSuccess && showFullFlow && (
        <div className="lg:hidden fixed top-16 left-0 right-0 z-30 bg-white border-b border-gray-100 shadow-sm px-4 py-2">
          <ProgressIndicator formData={formData} />
        </div>
      )}

      <main className="flex-grow pt-24 pb-20 lg:pb-16" ref={topRef}>
                  <div className="mx-auto px-4 w-full max-w-6xl">

          {/* Spacer on mobile to push content below pinned progress bar */}
          {showFullFlow && <div className="lg:hidden h-10" />}

          {isSuccess ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-12 mt-4">
              <SuccessState formData={formData} onClose={() => navigate('/')} onReset={handleReset} stripeCheckoutUrl={stripeCheckoutUrl} />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-6 relative items-start mt-4">

              <AnimatePresence>
                {showMobileSummary && (
                  <motion.div 
                    initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col"
                  >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shadow-sm sticky top-0 z-10">
                      <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
                      <button onClick={() => setShowMobileSummary(false)} className="p-2 hover:bg-gray-100 rounded-full text-gray-500">
                        <X className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 pb-32">
                      <PriceBreakdown formData={formData} promoCode={resolvedPromoCode} book={bookPromoCode} />
                    </div>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => { setShowMobileSummary(false); handleSubmit(); }}
                        disabled={isSubmitting || !isFormValid}
                        className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:bg-orange-300 disabled:cursor-not-allowed disabled:shadow-none"
                      >
                        {isSubmitting ? <><Loader2 className="w-5 h-5 animate-spin" /> Processing...</> : <><Check className="w-5 h-5" /> Book Install</>}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 w-full lg:overflow-hidden flex flex-col gap-6">

                {/* Step 1 — Fork */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-sm">1</span>
                      Equipment Details
                    </h2>
                  </div>
                  <div className="p-6 md:p-8">
                    <Step1 onSelectPath={handleSelectPath} selectedPath={tvPath} onReset={() => { setTvPath(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} />
                  </div>
                </div>

                {showFullFlow && (
                  <>
                    {/* Step 2 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" ref={step2Ref}>
                      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                          <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-sm">2</span>
                          Installation Options
                        </h2>
                      </div>
                      <div className="p-6 md:p-8">
                        <Step2 formData={formData} updateFormData={updateFormData} errors={errors} />
                      </div>
                    </div>

                    {/* Step 3 */}
                    <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100" ref={step3Ref}>
                      <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center">
                          <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-sm">3</span>
                          Schedule & Contact
                        </h2>
                      </div>
                      <div className="p-6 md:p-8">
                        <div className="lg:hidden">
                          <RecapCard
                            formData={formData}
                            onEditInstallation={() => scrollToRef(step2Ref)}
                            onEditSchedule={() => scrollToRef(step3Ref)}
                          />
                        </div>
                        <Step3 formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />
                      </div>
                    </div>

                    {/* Pay-after-install strip + Desktop Submit */}
                    <div className="hidden lg:block">
                      <div className="bg-green-50 border border-green-200 rounded-xl px-5 py-3 mb-4 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-600 shrink-0" />
                        <p className="text-sm text-green-800 font-medium">
                          No charge today — you pay after install. Saturday bookings require a $29 non-refundable deposit.
                        </p>
                      </div>
                      <div className="flex justify-end">
                        <button
                          onClick={handleSubmit}
                          disabled={isSubmitting || !isFormValid}
                          className="px-12 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSubmitting ? <><Loader2 className="w-6 h-6 animate-spin" /> Processing Booking...</> : <><Check className="w-6 h-6" /> Book Install</>}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Desktop Sticky Summary */}
              {showFullFlow && (
              <div className="hidden lg:block w-[300px] shrink-0 sticky top-28 self-start transition-all duration-300">
                  <div className="bg-white rounded-xl border border-gray-100 shadow-sm px-4 pt-4 pb-3 mb-3">
                    <ProgressIndicator formData={formData} />
                  </div>
                  <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 220px)' }}>
                    <PriceBreakdown formData={formData} promoCode={resolvedPromoCode} book={bookPromoCode} />
                  </div>
                </div>
              )}

            </div>
          )}
        </div>
      </main>

      {/* Mobile Sticky Footer */}
      {!isSuccess && showFullFlow && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)]">
          <button
            onClick={() => setShowMobileSummary(prev => !prev)}
            className="w-full flex justify-between items-center px-5 py-3 bg-gray-50 border-b border-gray-100 hover:bg-gray-100 transition-colors"
          >
            <span className="text-sm font-semibold text-gray-600">Estimated Total</span>
            <span className="flex items-center gap-2">
              {hasDiscount && (
                <span className="text-sm line-through text-gray-400">${originalTotal.toFixed(2)}</span>
              )}
              <span className="text-lg font-black text-orange-600">${livePrice.estimatedTotal.toFixed(2)}</span>
              <ChevronUp className="w-4 h-4 text-gray-400" />
            </span>
          </button>
          <div className="flex items-center justify-between gap-3 px-4 py-2 bg-green-50 border-y border-green-100">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <p className="text-xs text-green-800 font-medium">No charge today — you pay after install.</p>
            </div>
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !isFormValid}
              className="shrink-0 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-500/30 transition-all flex items-center gap-1.5 disabled:bg-orange-300 disabled:cursor-not-allowed disabled:shadow-none"
            >
              {isSubmitting ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</> : <><Check className="w-4 h-4" /> Book Install</>}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BookingPage;