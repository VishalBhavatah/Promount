import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Check, Loader2, ChevronUp, ChevronDown } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { INITIAL_FORM_DATA, validateRequired, validateEmail, validatePhone, validateZIP, formatPhone } from '@/lib/bookingUtils';
import Step1 from '@/components/booking/Step1';
import Step2 from '@/components/booking/Step2';
import Step3 from '@/components/booking/Step3';
import PriceBreakdown from '@/components/booking/PriceBreakdown';
import SuccessState from '@/components/booking/SuccessState';
import { cn } from '@/lib/utils';
import { fetchCouponCodeFromPromoSource } from '@/lib/couponService';

const BookingModal = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const bookPromoCode = new URLSearchParams(window.location.search).get('book')?.trim() || '';
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    ...INITIAL_FORM_DATA,
    terms: false,
    smsConsent: false
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showMobileSummary, setShowMobileSummary] = useState(false);
  const [stripeCheckoutUrl, setStripeCheckoutUrl] = useState(null);
  const [isSaturdayBooking, setIsSaturdayBooking] = useState(false);
  const [resolvedPromoCode, setResolvedPromoCode] = useState('');
  
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  }, [currentStep]);

  useEffect(() => {
    let isMounted = true;

    const loadPromoCode = async () => {
      if (!isOpen || !bookPromoCode) {
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
        console.warn('[BookingModal] Promo lookup on load failed:', error);
      }
    };

    loadPromoCode();

    return () => {
      isMounted = false;
    };
  }, [isOpen, bookPromoCode]);

  if (!isOpen) return null;

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
    formData.terms &&
    formData.smsConsent
  );

  const validateStep = (step) => {
    const newErrors = {};
    let isValid = true;

    if (step === 3) {
      if (!validateRequired(formData.date)) newErrors.date = 'Date is required';
      if (!validateRequired(formData.timeSlot)) newErrors.timeSlot = 'Time slot is required';
      if (!validateRequired(formData.contact.phone) || !validatePhone(formData.contact.phone)) newErrors['contact.phone'] = 'Valid 10-digit phone required';
      if (!formData.terms) newErrors.terms = 'You must agree to the terms';
      if (!formData.smsConsent) newErrors.smsConsent = 'You must provide SMS consent';
      
      if (formData.contact.email && !validateEmail(formData.contact.email)) newErrors['contact.email'] = 'Valid email required';
      if (formData.address.zip && !validateZIP(formData.address.zip)) newErrors['address.zip'] = 'Valid 5-digit ZIP required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      isValid = false;
      toast({
        variant: "destructive",
        title: "Please fix the errors",
        description: "Some required fields are missing or invalid."
      });
    }

    return isValid;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleClose = () => {
    if (currentStep > 1 && !isSuccess) {
      if (window.confirm("Are you sure you want to close? Your booking progress will be lost.")) {
        onClose();
        setTimeout(() => {
          setCurrentStep(1);
          setFormData({ ...INITIAL_FORM_DATA, terms: false, smsConsent: false });
          setErrors({});
          setIsSuccess(false);
          setShowMobileSummary(false);
          setStripeCheckoutUrl(null);
          setIsSaturdayBooking(false);
          setResolvedPromoCode('');
        }, 300);
      }
    } else {
      onClose();
      if (isSuccess) {
         setTimeout(() => {
          setCurrentStep(1);
          setFormData({ ...INITIAL_FORM_DATA, terms: false, smsConsent: false });
          setErrors({});
          setIsSuccess(false);
          setShowMobileSummary(false);
          setStripeCheckoutUrl(null);
          setIsSaturdayBooking(false);
          setResolvedPromoCode('');
        }, 300);
      }
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(3)) return;

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

      const isSaturday =
        formData.date &&
        new Date(formData.date + "T00:00:00").getDay() === 6;

      setIsSaturdayBooking(isSaturday);

      console.log("🔍 [DIAGNOSTIC] Modal: Initiating Booking Submission...");

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

      const result = await response.json();

      console.log("print resonse", result);
if (!response.ok) {
  throw new Error(result?.message || "Request failed");
}

if (result?.checkoutUrl) {
  console.log(" Stripe Checkout URL received:", result.checkoutUrl);
  setStripeCheckoutUrl(result.checkoutUrl);
}

      // const rawText = await response.json();
      // let result = null;
      // try {
      //   result = JSON.parse(rawText);
      // } catch (e) { }

      // if (!response.ok) {
      //   throw new Error(`HTTP ${response.status}: ${result?.message || result?.error || response.statusText || rawText}`);
      // }

      // if (result && !result.success) {
      //   throw new Error(`Backend Error: ${result.message || 'Unknown error'}`);
      // }
      // console.log(" Backend Response:", result);

      // if (result?.checkoutUrl) {
      //     console.log(" Stripe URL received:", result.checkoutUrl);
      //   setStripeCheckoutUrl(result.checkoutUrl);
      // }

      setFormData({
        ...payload,
        confirmationNumber: result?.confirmationNumber || confirmationNumber,
        stripeCheckoutUrl: result?.checkoutUrl
      });
      setIsSuccess(true);
      
      toast({
        variant: "default",
        title: "Booking confirmed!",
        description: "Your request has been processed successfully.",
      });

    } catch (error) {
      toast({
        variant: "destructive",
        title: "Booking Failed",
        description: error.message || "An unknown error occurred. Check console."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    console.log(" handleReset called");
    setIsSuccess(false);
    setCurrentStep(1);
    setFormData({ ...INITIAL_FORM_DATA, terms: false, smsConsent: false });
    setErrors({});
    setShowMobileSummary(false);
    setStripeCheckoutUrl(null);
    setIsSaturdayBooking(false);
    setResolvedPromoCode('');
  };

  const toggleMobileSummary = () => {
    setShowMobileSummary(prev => !prev);
  };

  const isBookButtonDisabled = isSubmitting || !isFormValid;
  console.log("isSuccess state:", isSuccess);
  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-end md:items-center justify-center sm:p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
        className="absolute inset-0 bg-navy-950/90 backdrop-blur-sm transition-opacity"
      />

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full md:w-[900px] h-[95vh] md:h-[85vh] bg-white rounded-t-2xl md:rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white z-10">
          <div>
             <h2 className="text-xl font-bold text-gray-900">
               {isSuccess ? 'Quote Generated' : 'Book Your Installation'}
             </h2>
             {!isSuccess && (
               <div className="flex space-x-2 mt-2">
                 {[1, 2, 3].map(step => (
                   <div 
                     key={step} 
                     className={cn(
                       "h-1.5 rounded-full transition-all duration-300",
                       step <= currentStep ? "w-8 bg-orange-50" : "w-4 bg-gray-200",
                       step <= currentStep && "bg-orange-500"
                     )} 
                   />
                 ))}
               </div>
             )}
          </div>
          <button 
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex-1 overflow-hidden flex flex-col md:flex-row relative">
           
           <AnimatePresence>
             {showMobileSummary && (
               <motion.div 
                 initial={{ y: "100%" }}
                 animate={{ y: 0 }}
                 exit={{ y: "100%" }}
                 transition={{ type: "spring", damping: 25, stiffness: 300 }}
                 className="absolute inset-0 z-20 bg-white md:hidden flex flex-col"
               >
                 <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-white">
                    <h3 className="text-lg font-bold text-gray-900">Order Summary</h3>
                    <button 
                      onClick={() => setShowMobileSummary(false)}
                      className="p-2 hover:bg-gray-100 rounded-full text-gray-500"
                    >
                      <X className="w-6 h-6" />
                    </button>
                 </div>
                 <div className="flex-1 overflow-y-auto p-4 pb-24">
                    <PriceBreakdown formData={formData} promoCode={resolvedPromoCode} book={bookPromoCode} />
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

           {isSuccess ? (
            <div className="w-full h-full overflow-y-auto">
             {console.log("Rendering SuccessState with Stripe URL:", stripeCheckoutUrl)}
              <SuccessState 
                
                  formData={formData} 
                  onClose={handleClose} 
                  onReset={handleReset} 
                  stripeCheckoutUrl={stripeCheckoutUrl}
                  isSaturdayBooking={isSaturdayBooking}
                />
             </div>
           ) : (
             <>
                <div 
                  ref={scrollContainerRef}
                  className="flex-1 overflow-y-auto p-6 md:p-8 scroll-smooth"
                >
                  <div className="max-w-xl mx-auto">
                    {currentStep === 1 && (
                      <Step1 formData={formData} updateFormData={updateFormData} errors={errors} />
                    )}
                    {currentStep === 2 && (
                      <Step2 formData={formData} updateFormData={updateFormData} errors={errors} />
                    )}
                    {currentStep === 3 && (
                      <Step3 formData={formData} updateFormData={updateFormData} errors={errors} setErrors={setErrors} />
                    )}
                  </div>
                </div>

                <div className="hidden md:block w-[320px] bg-gray-50 border-l border-gray-200 overflow-y-auto">
                  <div className="p-6 pb-32">
                    <PriceBreakdown formData={formData} promoCode={resolvedPromoCode} book={bookPromoCode} />
                  </div>
                </div>
             </>
           )}
        </div>

        {!isSuccess && (
          <div className="p-4 border-t border-gray-100 bg-white flex flex-col md:flex-row items-center justify-between gap-4 z-30 relative">
            <button 
               onClick={toggleMobileSummary}
               className="md:hidden w-full flex justify-between items-center bg-gray-50 p-3 rounded-lg mb-2 hover:bg-gray-100 transition-colors active:scale-[0.99]"
            >
               <span className="text-sm font-semibold text-gray-600">Estimated Total</span>
               <span className="text-sm font-bold text-orange-600 flex items-center">
                  Tap to view summary
                  <ChevronUp className="w-4 h-4 ml-1.5" />
               </span>
            </button>

            <button
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className={cn(
                "w-full md:w-auto px-6 py-3 rounded-xl font-semibold transition-colors flex items-center justify-center",
                currentStep === 1 ? "text-gray-300 cursor-not-allowed" : "text-gray-600 hover:bg-gray-100"
              )}
            >
              <ChevronLeft className="w-5 h-5 mr-1" /> Back
            </button>

            {currentStep < 3 ? (
              <button
                onClick={handleNext}
                className="w-full md:w-auto px-8 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-bold shadow-lg shadow-gray-900/20 transition-all flex items-center justify-center"
              >
                Next <ChevronRight className="w-5 h-5 ml-1" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isBookButtonDisabled}
                className="w-full md:w-auto px-12 py-3 bg-orange-600 hover:bg-orange-500 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed group"
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
            )}
          </div>
        )}
      </motion.div>
    </div>,
    document.body
  );
};

export default BookingModal;