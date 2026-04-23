import React, { useEffect } from 'react';
import { Calendar, Clock, MapPin, User, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPhone } from '@/lib/bookingUtils';

const Step3 = ({ formData, updateFormData, errors, setErrors }) => {
  

  const today = new Date().toISOString().split('T')[0];

  // Set Terms and SMS consent to unchecked by default if they haven't been set yet
  useEffect(() => {
    if (formData.terms === undefined || formData.smsConsent === undefined) {
      updateFormData({ 
        terms: formData.terms || false, 
        smsConsent: formData.smsConsent || false 
      });
    }
  }, []);

  const handleContactChange = (field, value) => {
    const formattedValue = field === 'phone' ? formatPhone(value) : value;
    updateFormData({
      contact: { ...formData.contact, [field]: formattedValue }
    });
  };

  const handleAddressChange = (field, value) => {
    updateFormData({
      address: { ...formData.address, [field]: value }
    });
  };

 const handleDateChange = (e) => {
  const selectedDate = e.target.value;

  if (!selectedDate) return;

  const day = new Date(selectedDate).getDay();

  // if (day === 6) {
  //   const confirmSurcharge = window.confirm(
  //     "Saturday bookings include a surcharge. Do you want to continue?"
  //   );

  //   if (!confirmSurcharge) {
  //     updateFormData({ date: "" });
  //     return;
  //   }
  // }

  updateFormData({ date: selectedDate });
};

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Mandatory Fields Note */}
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start space-x-3 mb-2">
        <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <p className="text-sm text-orange-800 leading-tight">
          Fields marked with an <span className="font-bold text-red-600">"*"</span> are mandatory before you can book.
        </p>
      </div>

      {/* Date & Time */}
      <section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <Calendar className="w-4 h-4 mr-2 text-orange-500" />
              Preferred Date <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="date"
              min={today}
              value={formData.date}
              // onChange={(e) => updateFormData({ date: e.target.value })}
              onChange={handleDateChange}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                errors.date ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
            
            {/* Mobile-only explanation text */}
            <p className="md:hidden text-xs text-gray-500 mt-2 leading-relaxed">
              If you book on a Monday or Tuesday, we will give you an additional 10% discount. 
              Booking on a Saturday, our busiest day, will require a $29 non-refundable deposit in case of cancellations.
            </p>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2 flex items-center">
              <Clock className="w-4 h-4 mr-2 text-orange-500" />
              Time Slot <span className="text-red-500 ml-1">*</span>
            </label>
            <select
              value={formData.timeSlot}
              onChange={(e) => updateFormData({ timeSlot: e.target.value })}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                errors.timeSlot ? "border-red-500" : "border-gray-300"
              )}
            >
              <option value="">Select a time...</option>
              <option value="morning">Morning (8 AM - 12 PM)</option>
              <option value="afternoon">Afternoon (12 PM - 5 PM)</option>
              <option value="evening">Evening (5 PM - 8 PM)</option>
              <option value="flexible">Flexible</option>
            </select>
            {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
          </div>
        </div>

        {/* Desktop-only explanation text */}
        <p className="hidden md:block text-xs text-gray-500 mt-2 leading-relaxed">
            If you book on a Monday or Tuesday, we will give you an additional 10% discount. 
            Booking on a Saturday, our busiest day, will require a $29 non-refundable deposit in case of cancellations.
        </p>
      </section>

      {/* Address */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-orange-500" />
          Service Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="md:col-span-2">
            <input
              type="text"
              placeholder="Street Address"
              value={formData.address.street}
              onChange={(e) => handleAddressChange('street', e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                errors['address.street'] ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors['address.street'] && <p className="text-red-500 text-xs mt-1">{errors['address.street']}</p>}
          </div>
          <input
            type="text"
            placeholder="Apt / Suite (Optional)"
            value={formData.address.apt}
            onChange={(e) => handleAddressChange('apt', e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-orange-500 text-gray-900"
          />
          <div>
            <input
              type="text"
              placeholder="City"
              value={formData.address.city}
              onChange={(e) => handleAddressChange('city', e.target.value)}
              className={cn(
                "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                errors['address.city'] ? "border-red-500" : "border-gray-300"
              )}
            />
            {errors['address.city'] && <p className="text-red-500 text-xs mt-1">{errors['address.city']}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4 md:col-span-2">
            <div>
              <input
                type="text"
                placeholder="State"
                value={formData.address.state}
                readOnly
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-gray-50 text-gray-500 cursor-not-allowed",
                  errors['address.state'] ? "border-red-500" : "border-gray-200"
                )}
              />
              {errors['address.state'] && <p className="text-red-500 text-xs mt-1">{errors['address.state']}</p>}
            </div>
            <div>
              <input
                type="text"
                placeholder="ZIP Code"
                maxLength={5}
                value={formData.address.zip}
                onChange={(e) => handleAddressChange('zip', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                  errors['address.zip'] ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors['address.zip'] && <p className="text-red-500 text-xs mt-1">{errors['address.zip']}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <User className="w-4 h-4 mr-2 text-orange-500" />
          Contact Information
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <div>
              <input
                type="text"
                placeholder="Full Name"
                value={formData.contact.fullName || ''}
                onChange={(e) => handleContactChange('fullName', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                  errors['contact.fullName'] ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors['contact.fullName'] && <p className="text-red-500 text-xs mt-1">{errors['contact.fullName']}</p>}
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="(XXX) XXX-XXXX"
                value={formData.contact.phone}
                onChange={(e) => handleContactChange('phone', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                  errors['contact.phone'] ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors['contact.phone'] && <p className="text-red-500 text-xs mt-1">{errors['contact.phone']}</p>}
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Email Address"
                value={formData.contact.email}
                onChange={(e) => handleContactChange('email', e.target.value)}
                className={cn(
                  "w-full px-4 py-3 rounded-lg border bg-white focus:outline-none focus:border-orange-500 transition-colors text-gray-900",
                  errors['contact.email'] ? "border-red-500" : "border-gray-300"
                )}
              />
              {errors['contact.email'] && <p className="text-red-500 text-xs mt-1">{errors['contact.email']}</p>}
            </div>
          </div>
        </div>
      </section>

      {/* Instructions */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <FileText className="w-4 h-4 mr-2 text-orange-500" />
          Additional Instructions
        </h3>
        <textarea
          placeholder="Any special instructions for the technician? (Gate code, parking, etc.)"
          rows={3}
          maxLength={500}
          value={formData.instructions}
          onChange={(e) => updateFormData({ instructions: e.target.value })}
          className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white focus:outline-none focus:border-orange-500 resize-none text-gray-900"
        />
      </section>
      
      {/* Terms */}
      <div className="flex items-start space-x-3 pt-2">
         <input
            type="checkbox"
            id="terms"
            checked={formData.terms || false}
            onChange={(e) => updateFormData({ terms: e.target.checked })}
            className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
         />
         <label htmlFor="terms" className="text-sm text-gray-600">
           By checking, I agree to the <a href="#" className="text-orange-600 hover:underline">Terms of Service</a> and <a href="#" className="text-orange-600 hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
         </label>
      </div>
      {errors.terms && <p className="text-red-500 text-xs ml-7">{errors.terms}</p>}

      {/* SMS Consent */}
      <div className="flex items-start space-x-3 pt-2">
         <input
            type="checkbox"
            id="smsConsent"
            checked={formData.smsConsent || false}
            onChange={(e) => updateFormData({ smsConsent: e.target.checked })}
            className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0"
         />
         <label htmlFor="smsConsent" className="text-sm text-gray-600 leading-relaxed">
           By checking and by opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Pro Mount USA LLC. This includes SMS messages for account notifications, customer care, etc. SMS message frequency varies. Message and data rates may apply. For assistance, text HELP or visit our website at https://promountusa.com/.  Visit https://promountusa.com/privacy for privacy policy and https://promountusa.com/terms for Terms of Service. Reply STOP to any message to opt out. <span className="text-red-500"></span>
         </label>
      </div>
      {errors.smsConsent && <p className="text-red-500 text-xs ml-7">{errors.smsConsent}</p>}
    </div>
  );
};

export default Step3;