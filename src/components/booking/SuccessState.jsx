import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, Calendar, Clock, DollarSign, ArrowRight, CreditCard } from 'lucide-react';
import { calculatePrice, formatCurrency } from '@/lib/bookingUtils';
import { useToast } from '@/components/ui/use-toast';
import { sendBookingToZohoFSM } from '@/lib/zohoFSMService';

const SuccessState = ({ formData, onClose, onReset, stripeCheckoutUrl }) => {
  console.log("formData", formData);

  console.log("Stripe Checkout URL:", stripeCheckoutUrl);
  const isSaturdayBooking =
    formData?.date &&
    new Date(formData.date + "T00:00:00").getDay() === 6;

  console.log("SuccessState Loaded");
  console.log("Booking Date:", formData?.date);
  console.log("Saturday Booking:", isSaturdayBooking);

  const { estimatedTotal } = calculatePrice(formData);
  const { toast } = useToast();
  const hasSentToZoho = useRef(false);

  // Retrieve the generated confirmation number
  const confirmationNumber = formData.confirmationNumber || 'PM-PENDING';

  useEffect(() => {
    const syncWithZoho = async () => {
      if (!hasSentToZoho.current) {
        hasSentToZoho.current = true;
        try {
          console.log('[SuccessState] Syncing booking with Zoho FSM...');
          const result = await sendBookingToZohoFSM(formData);
          if (!result.success) {
            console.error('[SuccessState] Zoho FSM Sync Failed:', result.message);
          }
        } catch (error) {
          console.error('[SuccessState] Error syncing with Zoho FSM:', error);
        }
      }
    };

    syncWithZoho();
  }, [formData]);

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Success Header Area */}
      <div className="flex-shrink-0 bg-gradient-to-b from-green-50 to-white pt-10 pb-6 px-8 text-center border-b border-gray-100">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="inline-block bg-white p-3 rounded-full shadow-lg mb-4"
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>

        <h2 className="text-3xl font-extrabold text-gray-900 mb-2">Booking Received!</h2>

        {isSaturdayBooking ? (


          <div className="mt-6 mb-4 max-w-md mx-auto">
            <p className="text-red-600 font-semibold text-center mb-4">
              Saturday appointments require a $29 deposit to confirm your booking.
            </p>

            <button
              // target="_blank"
              // onClick={() => window.location.href = stripeCheckoutUrl}
              onClick={() => window.open(stripeCheckoutUrl, "_blank")}
              className="w-full px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl shadow-lg transition-all text-lg flex items-center justify-center mx-auto hover:scale-[1.02] active:scale-[0.98]"
            >
              <CreditCard className="w-6 h-6 mr-3" />
              Pay $29 Deposit
            </button>
            <p className="text-sm text-gray-500 mt-3 font-medium">Required to secure your Saturday appointment.</p>
          </div>
        ) : (
          <p className="text-gray-600">Your request has been successfully processed.</p>
        )}

        
          <div className="mt-6 bg-white border border-gray-200 rounded-lg py-3 px-6 inline-block shadow-sm">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-semibold mb-1">
              Confirmation Number
            </p>
            <p className="text-2xl font-mono font-bold text-gray-900 tracking-tight">
              {confirmationNumber}
            </p>
          </div>
        
      </div>

      {/* Details Scroll Area */}
      <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12">
        <div className="max-w-2xl mx-auto space-y-8">

          {/* Service Snapshot */}
          <section>
            <h3 className="text-lg font-bold text-gray-900 mb-4 border-b border-gray-100 pb-2">Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3">
                <Calendar className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Preferred Date</p>
                  <p className="text-base text-gray-700">{formData.date || 'Not selected'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3">
                <Clock className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-gray-900">Preferred Time</p>
                  <p className="text-base text-gray-700 capitalize">{formData.timeSlot || 'Flexible'}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl flex items-start space-x-3 md:col-span-2">
                <DollarSign className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
                <div className="w-full flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Estimated Total</p>
                    <p className="text-xs text-gray-500">Based on your selections</p>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(estimatedTotal)}</p>
                </div>
              </div>
            </div>
          </section>

          {/* Next Steps */}
          <section className="bg-blue-50 border border-blue-100 rounded-2xl p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-4">What happens next?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 mr-3">1</div>
                <p className="text-blue-800">We have received your quote request and service details.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 mr-3">2</div>
                <p className="text-blue-800">A scheduling coordinator will review your preferred time and call/text you at <span className="font-semibold">{formData.contact.phone}</span>.</p>
              </li>
              <li className="flex items-start">
                <div className="bg-blue-200 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold flex-shrink-0 mt-0.5 mr-3">3</div>
                <p className="text-blue-800">You will receive a final confirmation email with your assigned technician's details.</p>
              </li>
            </ul>
          </section>

        </div>
      </div>

      {/* Footer Actions */}
      <div className="flex-shrink-0 p-6 border-t border-gray-100 bg-white">
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-4">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-4 rounded-xl border-2 border-gray-200 text-gray-700 font-bold hover:bg-gray-50 transition-colors"
          >
            Close Window
          </button>
          <button
            onClick={onReset}
            className="flex-1 px-6 py-4 rounded-xl bg-navy-900 text-white font-bold hover:bg-navy-800 shadow-lg hover:shadow-xl transition-all flex items-center justify-center group"
          >
            Start New Quote <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessState;