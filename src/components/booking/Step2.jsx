import React, { useState, useEffect } from 'react';
import { PRICING } from '@/lib/bookingUtils';
import { cn } from '@/lib/utils';
import { Tv, Users, Monitor, LampWallUp as BrickWall, Info, Cable, PlusCircle } from 'lucide-react';
import MountTypeTooltip from './MountTypeTooltip';
import WallSurfaceCardTooltip from './WallSurfaceCardTooltip';
import WireConcealmmentCardTooltip from './WireConcealmmentCardTooltip';

// Kept local as bookingUtils.js is not editable in this environment
const MOUNT_DESCRIPTIONS = {
  own: "Got your own mount? No problem. We’ll securely install your TV on it — at no extra charge.",
  fixed: "Clean, sleek, and secure: our fixed mount keeps your TV flush against the wall for a modern, minimalist look you’ll love.",
  tilt: "Perfect viewing, every time — tilt the screen to eliminate glare and get crystal-clear sightlines from any seat in the room.",
  corner: "The ideal solution for corner setups: saves space while keeping your room stylish and functional.",
  fullMotion: "Total freedom of movement — pull, swivel, and tilt your TV for the perfect view from anywhere in the room.",
  ceiling: "Maximize space and make a statement — mount your TV to the ceiling for a sleek, bold look when walls are full or style demands it.",
};

const WALL_DESCRIPTIONS = {
  drywall: "Standard wall type. Quick and simple installation.",
  brick: "Strong and durable surface, requires special tools and anchors for a secure mount.",
  stone: "Heavy-duty material that ensure a solid and lasting installation.",
  default: "Select the wall type where the TV will be mounted."
};

const CABLE_DESCRIPTIONS = {
  exposed: "We'll neatly zip-tie your cables for a clean look, though they will remain visible.",
  channel: "External raceway to neatly guide cables along the wall surface.",
  inWallDrywall: "We conceal low-voltage cables (HDMI, etc.) inside the drywall. Power cord remains visible unless a power kit is added.",
  inWallPowerDrywall: "The ultimate clean look: we install an in-wall power kit to hide both AV cables and the TV power cord.",
  inWallNonDrywall: "Specialized concealment for hard surfaces. We'll route cables through the wall cavity where possible.",
  inWallPowerNonDrywall: "Complete concealment for hard surfaces, including power relocation.",
  default: "Select how you'd like your wires managed."
};

const Step2 = ({ formData, updateFormData, errors }) => {
  const [tooltip, setTooltip] = useState({
    isVisible: false,
    section: null, // 'mount', 'wall', 'wire'
    activeKey: null, // Key of the active item
    position: { x: 0, y: 0 }
  });

  // Handle outside clicks to close tooltip globally
  useEffect(() => {
    const handleGlobalClick = () => {
      if (tooltip.isVisible) {
        setTooltip(prev => ({ ...prev, isVisible: false }));
      }
    };
    // Use capture to ensure we catch it, or just bubble phase on window
    window.addEventListener('click', handleGlobalClick);
    return () => window.removeEventListener('click', handleGlobalClick);
  }, [tooltip.isVisible]);

  // Determine if the currently selected wall type is drywall
  const isDrywallWallType = formData.wallType === 'drywall';
  
  // Hard surface is anything not drywall if a type is selected
  const isHardSurfaceWallType = formData.wallType && !isDrywallWallType;

  const handleTvSizeChange = (key) => {
    // Removed auto-suggestion for tech count to ensure manual selection
    updateFormData({ 
      tvSize: key
    });
  };

  const handleSelection = (section, key, event, updateFn) => {
    // Update form data
    updateFn();
    
    // Stop propagation so the global click handler doesn't immediately close it
    event.stopPropagation();

    // Calculate position for tooltip
    const rect = event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top;

    setTooltip({
      isVisible: true,
      section: section,
      activeKey: key,
      position: { x, y }
    });
  };

  const handleMountSelect = (key, event) => {
    handleSelection('mount', key, event, () => updateFormData({ mountType: key }));
  };

  const handleWallSelect = (key, event) => {
    handleSelection('wall', key, event, () => updateFormData({ wallType: key }));
  };

  const handleWireSelect = (key, event) => {
    handleSelection('wire', key, event, () => updateFormData({ cableManagement: key }));
  };

  const toggleExtra = (key) => {
    const currentExtras = formData.extras || [];
    if (currentExtras.includes(key)) {
      updateFormData({ extras: currentExtras.filter(k => k !== key) });
    } else {
      updateFormData({ extras: [...currentExtras, key] });
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
      {/* Tooltip Components */}
      <MountTypeTooltip 
        isVisible={tooltip.isVisible && tooltip.section === 'mount'}
        title={PRICING.MOUNT_TYPES[tooltip.activeKey]?.label}
        description={MOUNT_DESCRIPTIONS[tooltip.activeKey]}
        position={tooltip.position}
      />

      <WallSurfaceCardTooltip 
        isVisible={tooltip.isVisible && tooltip.section === 'wall'}
        title={PRICING.WALL_TYPES[tooltip.activeKey]?.label}
        description={WALL_DESCRIPTIONS[tooltip.activeKey]}
        position={tooltip.position}
      />

      <WireConcealmmentCardTooltip
        isVisible={tooltip.isVisible && tooltip.section === 'wire'}
        title={PRICING.CABLE_MANAGEMENT[tooltip.activeKey]?.label}
        description={CABLE_DESCRIPTIONS[tooltip.activeKey]}
        position={tooltip.position}
      />

      {/* Instructional Text */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-start">
        <Info className="w-5 h-5 text-orange-600 mt-0.5 mr-3 flex-shrink-0" />
        <p className="text-orange-800 text-sm">
          Please select the options for your <strong>primary</strong> or <strong>largest</strong> TV. These details will be used to generate your base quote.
        </p>
      </div>

      {/* TV Size */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Tv className="w-5 h-5 mr-2 text-orange-500" />
          TV Size
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(PRICING.TV_SIZES).map(([key, { label, price }]) => (
            <button
              key={key}
              onClick={() => handleTvSizeChange(key)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white",
                formData.tvSize === key 
                  ? "border-orange-500 bg-orange-50 shadow-sm" 
                  : "border-gray-200 hover:border-orange-200"
              )}
            >
              <div className="font-semibold text-sm mb-1 text-gray-900">{label}</div>
              <div className="text-orange-600 font-bold">${price}</div>
            </button>
          ))}
        </div>
      </section>

      {/* Technicians */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <Users className="w-5 h-5 mr-2 text-orange-500" />
          Number of Technicians
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(PRICING.TECHS).map(([key, { label, price }]) => (
            <button
              key={key}
              onClick={() => updateFormData({ techCount: key })}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-start hover:shadow-md bg-white",
                formData.techCount === key 
                  ? "border-orange-500 bg-orange-50 shadow-sm" 
                  : "border-gray-200 hover:border-orange-200"
              )}
            >
              <div className="flex justify-between items-center w-full mb-1">
                <span className="font-semibold text-gray-900">{label}</span>
                <span className="text-orange-600 font-bold">
                  {price === 0 ? 'Included' : `+$${price}`}
                </span>
              </div>
              {key === 'one' && (
                <p className="text-xs text-gray-500 text-left">We may need your assistance if your TV is larger than 51 inches.</p>
              )}
              {key === 'two' && (
                <p className="text-xs text-gray-500 text-left">This is full service, we take care of everything.</p>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* Mount Type */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center shrink-0">
            <Monitor className="w-5 h-5 mr-2 text-orange-500" />
            Mount Type
          </h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {Object.entries(PRICING.MOUNT_TYPES).map(([key, { label, price }]) => (
            <button
              key={key}
              onClick={(e) => handleMountSelect(key, e)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white relative overflow-hidden group",
                formData.mountType === key 
                  ? "border-orange-500 bg-orange-50 shadow-sm" 
                  : "border-gray-200 hover:border-orange-200"
              )}
            >
              <div className="font-semibold text-sm mb-1 text-gray-900 relative z-10">{label}</div>
              <div className="text-orange-600 font-bold relative z-10">
                {price === 0 ? 'Included' : `+$${price}`}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Wall Surface */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center shrink-0">
            <BrickWall className="w-5 h-5 mr-2 text-orange-500" />
            Wall Surface
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {Object.entries(PRICING.WALL_TYPES).map(([key, { label, price }]) => (
            <button
              key={key}
              onClick={(e) => handleWallSelect(key, e)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white",
                formData.wallType === key 
                  ? "border-orange-500 bg-orange-50 shadow-sm" 
                  : "border-gray-200 hover:border-orange-200"
              )}
            >
              <div className="font-semibold text-sm mb-1 text-gray-900">{label}</div>
              <div className="text-orange-600 font-bold">
                {price === 0 ? 'Included' : `+$${price}`}
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Cable Management */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
          <h3 className="text-lg font-bold text-gray-900 flex items-center shrink-0">
            <Cable className="w-5 h-5 mr-2 text-orange-500" />
            Wire Concealment
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {Object.entries(PRICING.CABLE_MANAGEMENT).map(([key, { label, price }]) => {
            const labelLower = label.toLowerCase();
            
            // Hard Surface specific options:
            // "In-Wall (Hard Surface)", "In-Wall + Power (Hard Surface)", "Conduit", "Surface Raceway"
            const isHardSurfaceSpecificOption = 
              labelLower.includes('hard surface') || 
              labelLower.includes('conduit') || 
              labelLower.includes('raceway') ||
              labelLower.includes('brick') || 
              labelLower.includes('concrete');

            // Drywall specific options:
            // Standard "In-Wall", "In-Wall + Power" (without Hard Surface designation)
            const isDrywallSpecificOption = 
              labelLower.includes('in-wall') && !isHardSurfaceSpecificOption;

            let disabled = false;
            let helperText = '';

            if (isDrywallWallType) {
              // If drywall is selected, disable hard surface specific options
              if (isHardSurfaceSpecificOption) {
                disabled = true;
                helperText = '(Only for Hard Surfaces)';
              }
            } else if (isHardSurfaceWallType) {
              // If a hard surface is selected, disable drywall specific options
              if (isDrywallSpecificOption) {
                disabled = true;
                helperText = '(Only for Drywall)';
              }
            }
            // If no wall type is selected, or it's a universal option, it's enabled.

            return (
              <button
                key={key}
                disabled={disabled}
                onClick={(e) => !disabled && handleWireSelect(key, e)}
                className={cn(
                  "p-4 rounded-xl border-2 transition-all duration-200 text-left relative bg-white",
                  formData.cableManagement === key 
                    ? "border-orange-500 bg-orange-50 shadow-sm" 
                    : "border-gray-200",
                  !disabled && "hover:border-orange-200 hover:shadow-md",
                  disabled && "opacity-50 cursor-not-allowed bg-gray-50 border-gray-100"
                )}
              >
                <div className="font-semibold text-sm mb-1 text-gray-900">
                  {label} <span className="text-xs font-normal text-gray-500">{helperText}</span>
                </div>
                <div className="text-orange-600 font-bold">
                  {price === 0 ? 'Included' : `+$${price}`}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Additional Services */}
      <section>
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
          <PlusCircle className="w-5 h-5 mr-2 text-orange-500" />
          Additional Services
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(PRICING.EXTRAS).map(([key, { label, price }]) => (
            <button
              key={key}
              onClick={() => toggleExtra(key)}
              className={cn(
                "p-4 rounded-xl border-2 transition-all duration-200 text-left hover:shadow-md bg-white",
                formData.extras.includes(key)
                  ? "border-orange-500 bg-orange-50 shadow-sm" 
                  : "border-gray-200 hover:border-orange-200"
              )}
            >
              <div className="flex justify-between items-start">
                <span className="font-semibold text-sm text-gray-900">{label}</span>
              </div>
              <div className="text-orange-600 font-bold mt-1">
                +${price}
              </div>
            </button>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Step2;