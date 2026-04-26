import React, { useEffect } from 'react';
import { MapPin, User, FileText, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatPhone, WEEKDAY_DISCOUNT_RATE } from '@/lib/bookingUtils';

// Generate 7 days forward from today
const getNext30Days = () => {
  const days = [];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    const iso = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    days.push({
      iso,
      dayName: dayNames[d.getDay()],
      dayNum: d.getDate(),
      month: monthNames[d.getMonth()],
      dayOfWeek: d.getDay(), // 0=Sun,1=Mon,2=Tue,...,6=Sat
      isToday: i === 0,
    });
  }
  return days;
};

const TIME_SLOTS = [
  { value: 'morning',   label: 'Morning',   sub: '8 AM – 12 PM' },
  { value: 'afternoon', label: 'Afternoon', sub: '12 PM – 5 PM' },
  { value: 'evening',   label: 'Evening',   sub: '5 PM – 8 PM' },
  { value: 'flexible',  label: 'Flexible',  sub: 'Any time works' },
];

const Step3 = ({ formData, updateFormData, errors, setErrors }) => {
  const days = getNext30Days();

  useEffect(() => {
    const updates = {};
    if (!formData.terms) updates.terms = true;
    if (formData.smsConsent === undefined) updates.smsConsent = false;
    if (Object.keys(updates).length > 0) updateFormData(updates);
  }, []);

  const handleContactChange = (field, value) => {
    const formattedValue = field === 'phone' ? formatPhone(value) : value;
    updateFormData({ contact: { ...formData.contact, [field]: formattedValue } });
  };

  const handleAddressChange = (field, value) => {
    updateFormData({ address: { ...formData.address, [field]: value } });
  };

  const handleDateSelect = (iso) => {
    updateFormData({ date: iso });
  };

  // Determine discount info for selected date
  const selectedDay = days.find(d => d.iso === formData.date);
  const isDiscountDay = selectedDay && (selectedDay.dayOfWeek === 1 || selectedDay.dayOfWeek === 2);

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* Mandatory Fields Note */}
      <div className="bg-orange-50 border border-orange-100 rounded-lg p-3 flex items-start space-x-3">
        <AlertCircle className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
        <p className="text-sm text-orange-800 leading-tight">
          Fields marked with <span className="font-bold text-red-600">"*"</span> are required before booking.
        </p>
      </div>

      {/* Date — 7-day pill grid */}
      <section>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Preferred Date <span className="text-red-500">*</span>
        </label>
        <div className="flex gap-2 overflow-x-auto pt-4 pb-2 snap-x snap-mandatory scrollbar-none -mx-1 px-1">
          {days.map((day) => {
            const isDiscount = day.dayOfWeek === 1 || day.dayOfWeek === 2;
            const isSelected = formData.date === day.iso;
            return (
              <button
                key={day.iso}
                onClick={() => handleDateSelect(day.iso)}
                className={cn(
                  "flex-shrink-0 snap-start flex flex-col items-center justify-center w-16 py-3 rounded-xl border-2 transition-all duration-200 relative",
                  isSelected
                    ? "border-orange-500 bg-orange-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-orange-300"
                )}
              >
                {isDiscount && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full whitespace-nowrap">
                    -10%
                  </span>
                )}
                <span className={cn("text-xs font-semibold", isSelected ? "text-orange-600" : "text-gray-500")}>
                  {day.dayName}
                </span>
                <span className={cn("text-lg font-black leading-tight", isSelected ? "text-orange-600" : "text-gray-900")}>
                  {day.dayNum}
                </span>
                <span className={cn("text-[10px]", isSelected ? "text-orange-500" : "text-gray-400")}>
                  {day.month}
                </span>
              </button>
            );
          })}
        </div>

        {/* Savings banner */}
        {isDiscountDay && (
          <div className="mt-3 bg-green-50 border border-green-200 rounded-lg px-4 py-2.5 flex items-center gap-2">
            <span className="text-green-600 font-bold text-sm">🎉 10% off applied!</span>
            <span className="text-green-700 text-xs">You're saving by booking on {selectedDay.dayName}.</span>
          </div>
        )}
        {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
      </section>

      {/* Time Slot — 2-column visual grid */}
      <section>
        <label className="block text-sm font-semibold text-gray-900 mb-3">
          Time Slot <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {TIME_SLOTS.map((slot) => (
            <button
              key={slot.value}
              onClick={() => updateFormData({ timeSlot: slot.value })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left",
                formData.timeSlot === slot.value
                  ? "border-orange-500 bg-orange-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-orange-300"
              )}
            >
              <div className="font-semibold text-sm text-gray-900">{slot.label}</div>
              <div className="text-xs text-gray-500 mt-0.5">{slot.sub}</div>
            </button>
          ))}
        </div>
        {errors.timeSlot && <p className="text-red-500 text-xs mt-1">{errors.timeSlot}</p>}
      </section>

      {/* Address */}
      <section>
        <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
          <MapPin className="w-4 h-4 mr-2 text-orange-500" />
          Service Address
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
            <input
              type="text"
              placeholder="State"
              value={formData.address.state}
              readOnly
              className="w-full px-4 py-3 rounded-lg border bg-gray-50 text-gray-500 cursor-not-allowed border-gray-200"
            />
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
              <label className="block text-xs font-medium text-gray-700 mb-1">Email Address <span className="text-red-500">*</span></label>
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

      {/* Terms — pre-checked */}
      <div className="flex items-start space-x-3 pt-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.terms || false}
          onChange={(e) => updateFormData({ terms: e.target.checked })}
          className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500"
        />
        <label htmlFor="terms" className="text-sm text-gray-600">
          By checking, I agree to the <a href="/terms" className="text-orange-600 hover:underline">Terms of Service</a> and <a href="/privacy" className="text-orange-600 hover:underline">Privacy Policy</a>. <span className="text-red-500">*</span>
        </label>
      </div>
      {errors.terms && <p className="text-red-500 text-xs ml-7">{errors.terms}</p>}

      {/* SMS Consent — unchecked by default */}
      <div className="flex items-start space-x-3 pt-2">
        <input
          type="checkbox"
          id="smsConsent"
          checked={formData.smsConsent || false}
          onChange={(e) => updateFormData({ smsConsent: e.target.checked })}
          className="mt-1 w-4 h-4 text-orange-600 border-gray-300 rounded focus:ring-orange-500 flex-shrink-0"
        />
        <label htmlFor="smsConsent" className="text-sm text-gray-600 leading-relaxed">
          By checking and by opting into SMS from a web form or other medium, you are agreeing to receive SMS messages from Pro Mount USA LLC. This includes SMS messages for account notifications, customer care, etc. SMS message frequency varies. Message and data rates may apply. For assistance, text HELP or visit our website at https://promountusa.com/. Visit https://promountusa.com/privacy for privacy policy and https://promountusa.com/terms for Terms of Service. Reply STOP to any message to opt out.
        </label>
      </div>
      {errors.smsConsent && <p className="text-red-500 text-xs ml-7">{errors.smsConsent}</p>}

    </div>
  );
};

export default Step3;