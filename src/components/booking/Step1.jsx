import React from 'react';
import { MULTI_TV_DISCOUNTS } from '@/lib/bookingUtils';
import { Monitor, Minus, Plus, Tag } from 'lucide-react';

const Step1 = ({ formData, updateFormData }) => {
  const tvCount = formData.tvCount || 1;

  const handleTvCountChange = (increment) => {
    const newCount = increment ? tvCount + 1 : tvCount - 1;
    if (newCount >= 1) {
      updateFormData({ tvCount: newCount });
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      {/* Instructional Banner */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start">
        <Monitor className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-blue-900 text-sm">Start your quote</h3>
          <p className="text-blue-800 text-sm mt-1">
            Let's start by determining how many TVs you need installed. We offer great discounts for multi-TV installations!
          </p>
          <p className="text-blue-800 text-sm mt-3">
            <strong> NOTE:</strong> You get an additional $30 discount for orders over $200.
          </p>
        </div>
      </div>

      {/* TV Quantity Selector */}
      <section className="bg-white p-5 sm:p-6 rounded-xl border-2 border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <h3 className="text-lg font-bold text-gray-900 flex items-center justify-center md:justify-start">
              How many TVs are we mounting?
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              We can mount multiple TVs in a single visit.
            </p>
          </div>
          
          <div className="flex items-center space-x-4 bg-gray-50 p-2 rounded-xl border border-gray-200">
            <button
              onClick={() => handleTvCountChange(false)}
              disabled={tvCount <= 1}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-white hover:bg-gray-100 hover:shadow-sm disabled:opacity-30 disabled:hover:bg-white disabled:hover:shadow-none transition-all border border-gray-200 shrink-0"
              aria-label="Decrease quantity"
            >
              <Minus className="w-5 h-5 text-gray-700" />
            </button>
            <span className="text-3xl font-bold text-gray-900 w-12 text-center">{tvCount}</span>
            <button
              onClick={() => handleTvCountChange(true)}
              className="w-12 h-12 flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 hover:shadow-md text-white transition-all shadow-sm shrink-0"
              aria-label="Increase quantity"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Discount Information */}
      <section className="bg-orange-50 border-2 border-orange-100 rounded-xl p-5 sm:p-6 relative overflow-hidden">
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4 text-center sm:text-left">
          <Tag className="w-5 h-5 text-orange-600 mb-2 sm:mb-0 sm:mr-2 shrink-0" />
          <h3 className="text-lg font-bold text-gray-900">Multi-TV Discounts</h3>
        </div>
        
        <p className="text-sm text-gray-700 mb-6 text-center sm:text-left">
          The more you mount, the more you save! Discounts are applied to your total installation cost when you book multiple TVs.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 text-center max-w-xs sm:max-w-none mx-auto">
          <div className={`p-4 sm:p-3 rounded-lg border-2 flex flex-col justify-center items-center ${tvCount === 2 ? 'bg-white border-orange-500 shadow-md transform sm:scale-105' : 'bg-white/50 border-orange-200'}`}>
            <div className="text-2xl font-bold text-orange-600">{Math.round(MULTI_TV_DISCOUNTS.two * 100)}%</div>
            <div className="text-xs font-bold text-gray-600 uppercase mt-1">Off 2 TVs</div>
          </div>
          <div className={`p-4 sm:p-3 rounded-lg border-2 flex flex-col justify-center items-center ${tvCount === 3 ? 'bg-white border-orange-500 shadow-md transform sm:scale-105' : 'bg-white/50 border-orange-200'}`}>
            <div className="text-2xl font-bold text-orange-600">{Math.round(MULTI_TV_DISCOUNTS.three * 100)}%</div>
            <div className="text-xs font-bold text-gray-600 uppercase mt-1">Off 3 TVs</div>
          </div>
          <div className={`p-4 sm:p-3 rounded-lg border-2 flex flex-col justify-center items-center ${tvCount >= 4 ? 'bg-white border-orange-500 shadow-md transform sm:scale-105' : 'bg-white/50 border-orange-200'}`}>
            <div className="text-2xl font-bold text-orange-600">{Math.round(MULTI_TV_DISCOUNTS.fourPlus * 100)}%</div>
            <div className="text-xs font-bold text-gray-600 uppercase mt-1">Off 4+ TVs</div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Step1;