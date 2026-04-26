import React, { useState } from 'react';
import { PRICING } from '@/lib/bookingUtils';
import { cn } from '@/lib/utils';
import { Tv, Monitor, LampWallUp as BrickWall, Cable, PlusCircle, ChevronRight, ChevronDown, Check } from 'lucide-react';

const MOUNT_DESCRIPTIONS = {
  own: "Got your own mount? No problem. We'll securely install your TV on it — at no extra charge.",
  fixed: "Clean, sleek, and secure: keeps your TV flush against the wall for a modern, minimalist look.",
  tilt: "Tilt the screen to eliminate glare and get crystal-clear sightlines from any seat in the room.",
  corner: "The ideal solution for corner setups — saves space while keeping your room stylish.",
  fullMotion: "Pull, swivel, and tilt your TV for the perfect view from anywhere in the room.",
  ceiling: "Mount your TV to the ceiling for a sleek, bold look when walls are full or style demands it.",
};

const WALL_DESCRIPTIONS = {
  drywall: "Standard wall type. Quick and simple installation.",
  brick: "Strong surface — requires special tools and anchors for a secure mount.",
  stone: "Heavy-duty material that ensures a solid and lasting installation.",
};

const CABLE_DESCRIPTIONS = {
  exposed: "Cables are neatly zip-tied for a tidy look but remain visible.",
  channel: "External raceway guides cables neatly along the wall surface.",
  inWallDrywall: "Low-voltage cables hidden inside the drywall. Power cord stays visible unless a power kit is added.",
  inWallPowerDrywall: "The ultimate clean look — both AV cables and power cord hidden inside the wall.",
  inWallNonDrywall: "Specialized concealment for hard surfaces — cables routed through the wall where possible.",
  inWallPowerNonDrywall: "Complete concealment for hard surfaces, including power relocation.",
};

const LARGE_TV_SIZES = ['size56to75', 'size76to85', 'over86'];

// Reusable collapsed picker row
const PickerRow = ({ icon: Icon, label, selectedLabel, isOpen, onToggle }) => (
  <button
    onClick={onToggle}
    className={cn(
      "w-full flex items-center justify-between p-4 rounded-xl border-2 bg-white transition-all",
      isOpen ? "border-orange-400" : "border-gray-200 hover:border-orange-300"
    )}
  >
    <div className="flex items-center gap-3 text-left">
      {Icon && <Icon className="w-4 h-4 text-orange-500 shrink-0" />}
      {selectedLabel ? (
        <span className="font-semibold text-sm text-gray-900">{selectedLabel}</span>
      ) : (
        <span className="text-sm text-gray-400 font-medium">Select {label}...</span>
      )}
    </div>
    <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold shrink-0">
      {selectedLabel && !isOpen && <span>Change</span>}
      {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
    </div>
  </button>
);

const Step2 = ({ formData, updateFormData, errors }) => {
  const [openPicker, setOpenPicker] = useState(null); // 'tvSize' | 'mountType' | 'wall' | 'cable'

  const isDrywallWallType = formData.wallType === 'drywall';
  const isHardSurfaceWallType = formData.wallType && !isDrywallWallType;
  const showLiftQuestion = LARGE_TV_SIZES.includes(formData.tvSize);

  const togglePicker = (key) => setOpenPicker(prev => prev === key ? null : key);

  const handleTvSizeChange = (key) => {
    updateFormData({ tvSize: key, techCount: LARGE_TV_SIZES.includes(key) ? null : 'one' });
    setOpenPicker(null);
  };

  const handleMountSelect = (key) => {
    updateFormData({ mountType: key });
    setOpenPicker(null);
  };

  const handleWallSelect = (key) => {
    const currentCable = formData.cableManagement;
    const labelLower = (PRICING.CABLE_MANAGEMENT[currentCable]?.label || '').toLowerCase();
    const isHardSurfaceOption = labelLower.includes('hard surface') || labelLower.includes('conduit') || labelLower.includes('raceway');
    const isDrywallOption = labelLower.includes('in-wall') && !isHardSurfaceOption;
    const shouldClearCable = (key === 'drywall' && isHardSurfaceOption) || (key !== 'drywall' && isDrywallOption);
    updateFormData({ wallType: key, ...(shouldClearCable ? { cableManagement: null } : {}) });
    setOpenPicker(null);
  };

  const handleCableSelect = (key) => {
    updateFormData({ cableManagement: key });
    setOpenPicker(null);
  };

  const toggleExtra = (key) => {
    const cur = formData.extras || [];
    updateFormData({ extras: cur.includes(key) ? cur.filter(k => k !== key) : [...cur, key] });
    // Don't close picker — user may want to select multiple
  };

  const tvSizeData = formData.tvSize ? PRICING.TV_SIZES[formData.tvSize] : null;
  const mountData = formData.mountType ? PRICING.MOUNT_TYPES[formData.mountType] : null;
  const wallData = formData.wallType ? PRICING.WALL_TYPES[formData.wallType] : null;
  const cableData = formData.cableManagement ? PRICING.CABLE_MANAGEMENT[formData.cableManagement] : null;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* TV Size */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <Tv className="w-5 h-5 mr-2 text-orange-500" />
          TV Size
        </h3>
        <PickerRow
          label="TV Size"
          selectedLabel={tvSizeData?.label}
          isOpen={openPicker === 'tvSize'}
          onToggle={() => togglePicker('tvSize')}
        />
        {openPicker === 'tvSize' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3 pt-4 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
            {Object.entries(PRICING.TV_SIZES).map(([key, { label, price }]) => (
              <button
                key={key}
                onClick={() => handleTvSizeChange(key)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white relative",
                  formData.tvSize === key ? "border-orange-500 bg-orange-50 shadow-sm" : "border-gray-200 hover:border-orange-200"
                )}
              >
                {key === 'size25to55' && (
                  <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                    Most Common
                  </span>
                )}
                <div className="font-semibold text-sm mb-1 text-gray-900">{label}</div>
                <div className="text-orange-600 font-bold">${price}</div>
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Lift Question — large TVs only */}
      {showLiftQuestion && (
        <section>
          <h3 className="text-lg font-bold text-gray-900 mb-4">
            Can you help lift the TV? <span className="text-red-500">*</span>
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => updateFormData({ techCount: 'one' })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white",
                formData.techCount === 'one' ? "border-orange-500 bg-orange-50 shadow-sm" : "border-gray-200 hover:border-orange-200"
              )}
            >
              <div className="font-semibold text-sm mb-1 text-gray-900">Yes, I will help lift</div>
              <div className="text-orange-600 font-bold">+$0</div>
            </button>
            <button
              onClick={() => updateFormData({ techCount: 'two' })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white",
                formData.techCount === 'two' ? "border-orange-500 bg-orange-50 shadow-sm" : "border-gray-200 hover:border-orange-200"
              )}
            >
              <div className="font-semibold text-sm mb-1 text-gray-900">No, I want a 2nd Tech</div>
              <div className="text-orange-600 font-bold">+$59</div>
            </button>
          </div>
        </section>
      )}

      {/* Mount Type */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <Monitor className="w-5 h-5 mr-2 text-orange-500" />
          Mount Type <span className="text-red-500 ml-1">*</span>
        </h3>
        <PickerRow
          label="Mount Type"
          selectedLabel={mountData?.label}
          isOpen={openPicker === 'mountType'}
          onToggle={() => togglePicker('mountType')}
        />
        {openPicker === 'mountType' && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
            {Object.entries(PRICING.MOUNT_TYPES).map(([key, { label, price }]) => (
              <button
                key={key}
                onClick={() => handleMountSelect(key)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white",
                  formData.mountType === key ? "border-orange-500 bg-orange-50 shadow-sm" : "border-gray-200 hover:border-orange-200"
                )}
              >
                <div className="font-semibold text-sm mb-1 text-gray-900">{label}</div>
                <div className="text-orange-600 font-bold mb-2">{price === 0 ? 'Included' : `+$${price}`}</div>
                {MOUNT_DESCRIPTIONS[key] && <p className="text-xs text-gray-500 leading-relaxed">{MOUNT_DESCRIPTIONS[key]}</p>}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Wall Surface */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <BrickWall className="w-5 h-5 mr-2 text-orange-500" />
          Wall Surface <span className="text-red-500 ml-1">*</span>
        </h3>
        <PickerRow
          label="Wall Surface"
          selectedLabel={wallData?.label}
          isOpen={openPicker === 'wall'}
          onToggle={() => togglePicker('wall')}
        />
        {openPicker === 'wall' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
            {Object.entries(PRICING.WALL_TYPES).map(([key, { label, price }]) => (
              <button
                key={key}
                onClick={() => handleWallSelect(key)}
                className={cn(
                  "w-full p-4 rounded-xl border-2 transition-all text-left hover:border-orange-200",
                  formData.wallType === key ? "border-orange-500 bg-orange-50" : "border-gray-200"
                )}
              >
                <div className="font-semibold text-sm text-gray-900">{label}</div>
                <div className="text-orange-600 font-bold mt-1">{price === 0 ? 'Included' : `+$${price}`}</div>
                {WALL_DESCRIPTIONS[key] && <p className="text-xs text-gray-500 mt-1">{WALL_DESCRIPTIONS[key]}</p>}
              </button>
            ))}
          </div>
        )}
      </section>

      {/* Cable Management */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center">
          <Cable className="w-5 h-5 mr-2 text-orange-500" />
          Cable Management <span className="text-red-500 ml-1">*</span>
        </h3>
        <PickerRow
          label="Cable Management"
          selectedLabel={cableData?.label}
          isOpen={openPicker === 'cable'}
          onToggle={() => togglePicker('cable')}
        />
        {openPicker === 'cable' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
            {Object.entries(PRICING.CABLE_MANAGEMENT).map(([key, { label, price }]) => {
              const labelLower = label.toLowerCase();
              const isHardSurfaceOption = labelLower.includes('hard surface') || labelLower.includes('conduit') || labelLower.includes('raceway');
              const isDrywallOption = labelLower.includes('in-wall') && !isHardSurfaceOption;
              if (isDrywallWallType && isHardSurfaceOption) return null;
              if (isHardSurfaceWallType && isDrywallOption) return null;
              return (
                <button
                  key={key}
                  onClick={() => handleCableSelect(key)}
                  className={cn(
                    "w-full p-4 rounded-xl border-2 transition-all text-left hover:border-orange-200",
                    formData.cableManagement === key ? "border-orange-500 bg-orange-50" : "border-gray-200"
                  )}
                >
                  <div className="font-semibold text-sm text-gray-900">{label}</div>
                  <div className="text-orange-600 font-bold mt-1">{price === 0 ? 'Included' : `+$${price}`}</div>
                  {CABLE_DESCRIPTIONS[key] && <p className="text-xs text-gray-500 mt-1">{CABLE_DESCRIPTIONS[key]}</p>}
                </button>
              );
            })}
          </div>
        )}
      </section>

      {/* Additional Services */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-3 flex items-center justify-between">
          <span className="flex items-center">
            <PlusCircle className="w-5 h-5 mr-2 text-orange-500" />
            Other Services
          </span>
          {openPicker === 'extras' && (
            <button
              onClick={() => setOpenPicker(null)}
              className="flex items-center gap-1 px-3 py-1 rounded-full border border-orange-400 text-orange-500 text-xs font-semibold hover:bg-orange-50 transition-all"
            >
              <Check className="w-3 h-3" /> Done
            </button>
          )}
        </h3>
        <button
          onClick={() => togglePicker('extras')}
          className={cn(
            "w-full flex items-center justify-between p-4 rounded-xl border-2 bg-white transition-all",
            openPicker === 'extras' ? "border-orange-400" : "border-gray-200 hover:border-orange-300"
          )}
        >
          <div className="flex items-center gap-3 text-left">
            {formData.extras?.length > 0 ? (
              <span className="font-semibold text-sm text-gray-900">
                {formData.extras.map(k => PRICING.EXTRAS[k]?.label).filter(Boolean).join(' · ')}
              </span>
            ) : (
              <span className="text-sm text-gray-400 font-medium">Select Other Services...</span>
            )}
          </div>
          <div className="flex items-center gap-1 text-orange-500 text-sm font-semibold shrink-0">
            {formData.extras?.length > 0 && !openPicker && <span>Change</span>}
            {openPicker === 'extras' ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
          </div>
        </button>
        {openPicker === 'extras' && (
          <div className="mt-3 animate-in fade-in slide-in-from-top-2 duration-200">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(PRICING.EXTRAS).map(([key, { label, price }]) => (
                <button
                  key={key}
                  onClick={() => toggleExtra(key)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white",
                    formData.extras.includes(key) ? "border-orange-500 bg-orange-50 shadow-sm" : "border-gray-200 hover:border-orange-200"
                  )}
                >
                  <div className="font-semibold text-sm text-gray-900">{label}</div>
                  <div className="text-orange-600 font-bold mt-1">+${price}</div>
                </button>
              ))}
            </div>
          </div>
        )}
      </section>

    </div>
  );
};

export default Step2;