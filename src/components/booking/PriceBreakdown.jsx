import React from 'react';
import { useState } from 'react';
import { calculatePrice, formatCurrency, PRICING } from '@/lib/bookingUtils';
import { Info, Clock, Award, CheckCircle2, ShieldCheck, ListChecks } from 'lucide-react';
import { cn } from '@/lib/utils';

const PriceBreakdown = ({ formData, promoCode = '', book = '' }) => {
  const pricing = calculatePrice({ ...formData, promoCode, book });
const isSaturday = formData.date
  ? new Date(formData.date).getDay() === 6
  : false;

  const informationalBadges = [
    {
      icon: <Award className="w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-1.5 transition-transform group-hover:scale-110" />,
      text: "1-Year Warranty on Labor",
      colorClass: "bg-red-100 text-red-700 border-red-200 hover:border-red-300"
    },
    {
      icon: <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-1.5 transition-transform group-hover:scale-110" />,
      text: "$1M Insured",
      colorClass: "bg-green-100 text-green-700 border-green-200 hover:border-green-300"
    },
    {
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5 mb-1 sm:mb-1.5 transition-transform group-hover:scale-110" />,
      text: "Same Day Service",
      colorClass: "bg-blue-100 text-blue-700 border-blue-200 hover:border-blue-300"
    }
  ];

  // Compile selected items for itemized breakdown
  const selectedItems = [];
  if (formData.tvSize && PRICING.TV_SIZES[formData.tvSize]) {
    selectedItems.push({ 
      label: `TV Size (${PRICING.TV_SIZES[formData.tvSize].label})`, 
      price: PRICING.TV_SIZES[formData.tvSize].price 
    });
  }
  if (formData.mountType && PRICING.MOUNT_TYPES[formData.mountType]) {
    selectedItems.push({ 
      label: `Mount (${PRICING.MOUNT_TYPES[formData.mountType].label})`, 
      price: PRICING.MOUNT_TYPES[formData.mountType].price 
    });
  }
  if (formData.wallType && PRICING.WALL_TYPES[formData.wallType]) {
    selectedItems.push({ 
      label: `Surface (${PRICING.WALL_TYPES[formData.wallType].label})`, 
      price: PRICING.WALL_TYPES[formData.wallType].price 
    });
  }
  if (formData.cableManagement && PRICING.CABLE_MANAGEMENT[formData.cableManagement]) {
    selectedItems.push({ 
      label: `Cables (${PRICING.CABLE_MANAGEMENT[formData.cableManagement].label})`, 
      price: PRICING.CABLE_MANAGEMENT[formData.cableManagement].price 
    });
  }
  if (formData.extras && formData.extras.length > 0) {
    formData.extras.forEach(extra => {
      if (PRICING.EXTRAS[extra]) {
        selectedItems.push({ 
          label: PRICING.EXTRAS[extra].label, 
          price: PRICING.EXTRAS[extra].price 
        });
      }
    });
  }
  if (formData.techCount && PRICING.TECHS[formData.techCount]) {
    const techPrice = PRICING.TECHS[formData.techCount].price;
    if (techPrice > 0) {
      selectedItems.push({ 
        label: PRICING.TECHS[formData.techCount].label, 
        price: techPrice 
      });
    }
  }

  return (
    <div className="sticky top-6 flex flex-col h-auto bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="bg-gray-900 p-4 sm:p-6 text-white shrink-0">
        <h3 className="text-lg sm:text-xl font-bold mb-1">Order Summary</h3>
        <p className="text-gray-400 text-xs sm:text-sm flex items-center">
          <CheckCircle2 className="w-3 h-3 sm:w-4 sm:h-4 mr-1 text-green-400" />
          Transparent Pricing Guarantee
        </p>
      </div>

      <div className="p-4 sm:p-6 flex-1 bg-gray-50 flex flex-col">
        <div className="space-y-3 sm:space-y-4 flex-1">
          
          {/* Itemized Selections */}
          {selectedItems.length > 0 && (
            <div className="space-y-2 sm:space-y-2.5 pb-3 sm:pb-4 border-b border-gray-200">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-900 flex items-center mb-2">
                <ListChecks className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 text-orange-500" />
                Itemized Selections
              </h4>
              {selectedItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center text-gray-600">
                  <span className="text-[11px] sm:text-xs">{item.label}</span>
                  <span className="text-[11px] sm:text-xs font-medium text-gray-900">
                    {item.price > 0 ? formatCurrency(item.price) : 'Included'}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Base Costs */}
          <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-gray-200">
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium text-xs sm:text-sm">Subtotal</span>
              <span className="text-xs sm:text-sm">{formatCurrency(pricing.subtotal)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-700">
              <span className="font-medium text-xs sm:text-sm flex items-center">
                Trip Charge
                <div className="group/tooltip relative ml-1.5 sm:ml-2 cursor-help">
                  <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-gray-400" />
                  <div className="absolute right-0 sm:left-1/2 sm:-translate-x-1/2 bottom-full mb-2 w-48 p-2 bg-gray-900 text-white text-[10px] sm:text-xs rounded-lg opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all z-10">
                    Standard dispatch fee for our mobile technicians.
                  </div>
                </div>
              </span>
              <span className="text-xs sm:text-sm">{formatCurrency(pricing.tripCharge)}</span>
            </div>
          </div>

          {/* Discounts */}
          {(pricing.couponDiscount > 0 || pricing.volumeDiscount > 0 || pricing.dayOfWeekDiscount > 0) && (
            <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-gray-200">
              {pricing.couponDiscount > 0 && (
                <div className="flex justify-between items-center text-green-600 font-medium text-xs sm:text-sm">
                  <span>{pricing.promoLabel || 'Coupon Discount'}</span>
                  <span>-{formatCurrency(pricing.couponDiscount)}</span>
                </div>
              )}
              {pricing.volumeDiscount > 0 && (
                <div className="flex justify-between items-center text-green-600 font-medium text-xs sm:text-sm">
                  <span>Pricing Discount</span>
                  <span>-{formatCurrency(pricing.volumeDiscount)}</span>
                </div>
              )}
              {pricing.dayOfWeekDiscount > 0 && (
                <div className="flex justify-between items-center text-green-600 font-medium text-xs sm:text-sm">
                  <span>Mon & Tue Discount</span>
                  <span>-{formatCurrency(pricing.dayOfWeekDiscount)}</span>
                </div>
              )}
            </div>
          )}

          {!!book && (
            <div className="bg-blue-50 text-blue-800 p-2.5 sm:p-3 rounded-lg text-[10px] sm:text-xs border border-blue-100 mt-2 leading-relaxed">
              Promo source: {book}
            </div>
          )}

          {pricing.couponDiscount > 0 && pricing.promoCode && (
            <div className="bg-green-50 text-green-800 p-2.5 sm:p-3 rounded-lg text-[10px] sm:text-xs border border-green-100 mt-2 leading-relaxed">
              Coupon applied: {pricing.promoCode}
            </div>
          )}

          {/* Subtotal after discounts */}
          <div className="space-y-2 sm:space-y-3 pb-3 sm:pb-4 border-b border-gray-200">
            <div className="flex justify-between items-center text-gray-900 font-bold text-xs sm:text-sm">
              <span>Taxable Amount</span>
              <span>{formatCurrency(pricing.taxableAmount)}</span>
            </div>
            <div className="flex justify-between items-center text-gray-500 text-[10px] sm:text-xs">
              <span>Sales Tax (8.25%)</span>
              <span>{formatCurrency(pricing.salesTax)}</span>
            </div>
          </div>
          
          {formData.tvCount > 1 && (
            <div className="bg-blue-50 text-blue-800 p-2.5 sm:p-3 rounded-lg text-[10px] sm:text-xs border border-blue-100 mt-2 leading-relaxed">
              Note: We will calculate the cost of additional TVs to be installed and apply the discount.
            </div>
          )}
        </div>

        {/* Total */}
        <div className="pt-3 sm:pt-4 mt-auto shrink-0">
          <div className="flex justify-between items-center">
            <span className="text-sm sm:text-base font-bold text-gray-900">Estimated Total</span>
            <span className="text-xl sm:text-2xl font-black text-orange-600">
              {formatCurrency(pricing.estimatedTotal)}
            </span>
          </div>
          <p className="text-[9px] sm:text-[10px] text-gray-400 text-center mt-2 sm:mt-3 leading-tight italic">
            *Final price may vary based on on-site assessment and any additional hardware required.
          </p>
        </div>

        {/* Informational Badges */}
        <div className="grid grid-cols-3 gap-2 sm:gap-2.5 mt-5 sm:mt-6 shrink-0">
          {informationalBadges.map((badge, index) => (
            <div 
              key={index} 
              className={cn(
                "flex flex-col items-center justify-center p-2 sm:p-3 rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md group text-center",
                badge.colorClass
              )}
            >
              {badge.icon}
              <span className="text-[9px] sm:text-[10px] font-semibold leading-tight">
                {badge.text}
              </span>
            </div>
          ))}
        </div>

        {/* Multi-TV Discount Box */}
        <div className="mt-4 bg-gradient-to-br from-orange-50 to-[#ffedd5] border border-orange-200 rounded-lg p-3 sm:p-4 shadow-sm shrink-0">
          <h4 className="text-[11px] sm:text-xs font-bold text-[#92400E] text-center mb-2.5 sm:mb-3 uppercase tracking-wider">
            Multi-TV Discounts Available
          </h4>
          <div className="grid grid-cols-3 gap-1.5 sm:gap-2 text-[#B45309] text-[10px] sm:text-xs font-medium mb-2.5">
            <div className="flex flex-col items-center justify-center text-center bg-white/70 px-1 py-1.5 rounded-md shadow-sm border border-orange-100">
              <span className="font-bold text-[#92400E] mb-0.5 whitespace-nowrap">2 TVs</span>
              <span className="whitespace-nowrap">10% Off</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center bg-white/70 px-1 py-1.5 rounded-md shadow-sm border border-orange-100">
              <span className="font-bold text-[#92400E] mb-0.5 whitespace-nowrap">3 TVs</span>
              <span className="whitespace-nowrap">15% Off</span>
            </div>
            <div className="flex flex-col items-center justify-center text-center bg-white/70 px-1 py-1.5 rounded-md shadow-sm border border-orange-100">
              <span className="font-bold text-[#92400E] mb-0.5 whitespace-nowrap">4+ TVs</span>
              <span className="whitespace-nowrap">20% Off</span>
            </div>
          </div>
          <p className="text-[9px] sm:text-[10px] text-[#92400E]/80 text-center italic leading-tight">
            *Discounts apply when multiple TVs are installed during the same visit.
          </p>
        </div>

      </div>
    </div>
  );
};

export default PriceBreakdown;