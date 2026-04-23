import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Loader2, ChevronUp, ChevronDown, X } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { 
  INITIAL_FORM_DATA, 
  validateRequired, 
  validateEmail, 
  validatePhone, 
  validateZIP,
  formatPhone 
} from '@/lib/bookingUtils';
import Step1 from '@/components/booking/Step1';
import Step2 from '@/components/booking/Step2';
import Step3 from '@/components/booking/Step3';
import PriceBreakdown from '@/components/booking/PriceBreakdown';
import SuccessState from '@/components/booking/SuccessState';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { fetchCouponCodeFromPromoSource } from '@/lib/couponService';

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
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [stripeCheckoutUrl, setStripeCheckoutUrl] = useState(null);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [resolvedPromoCode, setResolvedPromoCode] = useState('');

  const topRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (topRef.current && isSuccess) {
      const yOffset = -100;
      const y = topRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }, [isSuccess]);

  useEffect(() => {
    let isMounted = true;

    const loadPromoCode = async () => {
      if (!bookPromoCode) {
        setResolvedPromoCode('');
        return;
      }

      try {
        const promo = await fetchCouponCodeFromPromoSource(bookPromoCode);
        if (isMounted) {
          setResolvedPromoCode(promo);
        }
      } catch (error) {
        if (isMounted) {
          setResolvedPromoCode('');
        }
        console.warn('[BookingPage] Promo lookup on load failed:', error);
      }
    };

    loadPromoCode();

    return () => {
      isMounted = false;
    };
  }, [bookPromoCode]);

  const updateFormData = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }));
    const newErrors = { ...errors };
    Object.keys(newData).forEach(key => delete newErrors[key]);
    setErrors(newErrors);
  };

  const isFormValid = Boolean(
    formData.date &&
    formData.timeSlot &&
    formData.contact?.phone &&
    validatePhone(formData.contact.phone) &&
    formData.terms
  );

  const validateAll = () => {
    const newErrors = {};
    let isValid = true;

    if (!validateRequired(formData.date)) newErrors.date = 'Date is required';
    if (!validateRequired(formData.timeSlot)) newErrors.timeSlot = 'Time slot is required';
    if (!validateRequired(formData.contact.phone) || !validatePhone(formData.contact.phone)) newErrors['contact.phone'] = 'Valid 10-digit phone required';
    if (!formData.terms) newErrors.terms = 'You must agree to the terms';
    
    if (formData.contact.email && !validateEmail(formData.contact.email)) newErrors['contact.email'] = 'Valid email required';
    if (formData.address.zip && !validateZIP(formData.address.zip)) newErrors['address.zip'] = 'Valid 5-digit ZIP required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
      toast({
        variant: "destructive",
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid."
      });
      // Scroll up to show errors
      if (topRef.current) {
         const yOffset = -100;
         const y = topRef.current.getBoundingClientRect().top + window.scrollY + yOffset;
         window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateAll()) return;

    setIsSubmitting(true);

    try {
      const dateStr = new Date().toISOString().slice(0, 10).replace(/-/g, '');
      const randomNum = Math.floor(Math.random() * 900000) + 100000;
      const confirmationNumber = `PM-${dateStr}-${randomNum}`;

      const payload = {
        ...formData,
        contact: {
          ...formData.contact,
          name: (formData.contact.fullName || '').trim(),
          phone: formatPhone(formData.contact.phone)
        },
        ...(bookPromoCode ? { book: bookPromoCode } : {}),
        ...(resolvedPromoCode ? { promoCode: resolvedPromoCode } : {}),
        confirmationNumber
      };

      console.log("🔍 [DIAGNOSTIC] Page: Initiating Booking Submission...");
      console.log("🔍 [DIAGNOSTIC] Page: Payload:", JSON.stringify(payload, null, 2));

      const response = await fetch(
        "https://promountbackend-914264443.development.catalystserverless.com/server/pro_mount_backend_function/create_fsm_order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload)
        }
      );

      console.log(`🔍 [DIAGNOSTIC] Page: Response Status: ${response.status} ${response.statusText}`);

      const result = await response.json();

      console.log("print resonse", result);
      if (!response.ok) {
        throw new Error(result?.message || "Request failed");
      }

      if (result?.checkoutUrl) {
        console.log(" Stripe Checkout URL received:", result.checkoutUrl);
        setStripeCheckoutUrl(result.checkoutUrl);
      }
      
      // const rawText = await response.text();
      // console.log(`🔍 [DIAGNOSTIC] Page: Raw Response:`, rawText);

      // let result = null;
      // try {
      //   result = JSON.parse(rawText);
      // } catch (e) {
      //   console.warn(`🔍 [DIAGNOSTIC] Page: Failed to parse JSON`);
      // }

      // if (!response.ok) {
      //   throw new Error(`HTTP ${response.status}: ${result?.message || result?.error || response.statusText || rawText}`);
      // }

      // if (result && !result.success) {
      //   throw new Error(`Backend Error: ${result.message || 'Unknown error'}`);
      // }

      setFormData(payload);
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
      toast({
        variant: "default",
        title: "Booking confirmed!",
        description: "Your request has been processed successfully.",
      });
      
      // setTimeout(() => {
      //   navigate('/');
      // }, 3000);

    } catch (error) {
      console.error("🔍 [DIAGNOSTIC] Page: Caught Error:", error);

      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error.message || "An unknown error occurred while saving your booking."
      });

    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSuccess(false);
    setResolvedPromoCode('');
    setFormData({ ...INITIAL_FORM_DATA, terms: false, smsConsent: false });
    setErrors({});
    setShowMobileSummary(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleMobileSummary = () => {
    setShowMobileSummary(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-navy-950 flex flex-col">
      <Helmet>
        <title>Book Your Installation - Pro Mount USA</title>
        <meta name="description" content="Book your professional TV mounting and installation service online instantly with Pro Mount USA." />
      </Helmet>

      <style>{`
        .fixed.bottom-6.right-6.z-\\[60\\] {
          display: none !important;
        }
      `}</style>

      <Header />

      <main className="flex-grow pt-24 pb-32 lg:pb-16" ref={topRef}>
        <div className="container mx-auto px-4 max-w-7xl">
          
          {isSuccess ? (
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden p-6 md:p-12 mt-4">
              <SuccessState formData={formData} onClose={() => navigate('/')} onReset={handleReset} stripeCheckoutUrl={stripeCheckoutUrl} />
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8 relative items-start mt-4">
              
              <AnimatePresence>
                {showMobileSummary && (
                  <motion.div 
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "100%" }}
                    transition={{ type: "spring", damping: 25, stiffness: 300 }}
                    className="fixed inset-0 z-50 bg-white lg:hidden flex flex-col"
                  >
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white shadow-sm mt-16">
                        <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
                        <button 
                          onClick={() => setShowMobileSummary(false)}
                          className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                        >
                          <X className="w-6 h-6" />
                        </button>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 pb-32">
                        <PriceBreakdown formData={formData} promoCode={resolvedPromoCode} book={bookPromoCode} />
                    </div>
                    <div className="p-4 border-t border-gray-200 bg-gray-50">
                      <button
                        onClick={() => {
                          setShowMobileSummary(false);
                          handleSubmit();
                        }}
                        disabled={isSubmitting || !isFormValid}
                        className="w-full py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
                          </>
                        ) : (
                          <>
                            Book <Check className="w-5 h-5 ml-2 group-hover:scale-110 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex-1 w-full flex flex-col gap-6">
                
                {/* Step 1 Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-sm">1</span>
                      Equipment Details
                    </h2>
                  </div>
                  <div className="p-6 md:p-8">
                    <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />
                  </div>
                </div>

                {/* Step 2 Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
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

                {/* Step 3 Section */}
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
                  <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center">
                      <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 font-bold text-sm">3</span>
                      Schedule & Contact
                    </h2>
                  </div>
                  <div className="p-6 md:p-8">
                    <Step3 formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />
                  </div>
                </div>

                {/* Desktop Submit Button */}
                <div className="hidden lg:flex justify-end mt-4">
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting || !isFormValid}
                    className="px-12 py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-6 h-6 mr-3 animate-spin" /> Processing Booking...
                      </>
                    ) : (
                      <>
                        Book <Check className="w-6 h-6 ml-3 group-hover:scale-110 transition-transform" />
                      </>
                    )}
                  </button>
                </div>

              </div>

              {/* Desktop Sticky Summary */}
              <div className="hidden lg:block w-[400px] shrink-0 sticky top-28 self-start transition-all duration-300">
                <PriceBreakdown formData={formData} promoCode={resolvedPromoCode} book={bookPromoCode} />
              </div>

            </div>
          )}
        </div>
      </main>

      {/* Mobile Sticky Footer */}
      {!isSuccess && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 z-40 flex flex-col gap-3 shadow-[0_-10px_20px_-5px_rgba(0,0,0,0.1)]">
          <button 
            onClick={toggleMobileSummary}
            className="w-full flex justify-between items-center bg-gray-50 border border-gray-200 p-3.5 rounded-xl hover:bg-gray-100 transition-colors shadow-sm"
          >
            <span className="text-sm font-semibold text-gray-600">Estimated Total</span>
            <span className="text-sm font-bold text-orange-600 flex items-center">
                Tap to view summary
                <ChevronUp className="w-4 h-4 ml-1.5" />
            </span>
          </button>

          <button
            onClick={handleSubmit}
            disabled={isSubmitting || !isFormValid}
            className="w-full py-3.5 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Processing...
              </>
            ) : (
              <>
                Book <Check className="w-5 h-5 ml-1" />
              </>
            )}
          </button>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default BookingPage;