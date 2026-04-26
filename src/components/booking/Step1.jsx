import React from 'react';
import { Phone, Tv, ChevronRight } from 'lucide-react';

const isWithinBusinessHours = () => {
  const now = new Date();
  const ct = new Date(now.toLocaleString('en-US', { timeZone: 'America/Chicago' }));
  const hour = ct.getHours();
  return hour >= 8 && hour < 22;
};

const Step1 = ({ onSelectPath, selectedPath, onReset }) => {
  const isOpen = isWithinBusinessHours();

  // If a path has been selected, show only the selected card + a change link
  if (selectedPath === 'single') {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">You selected: <strong className="text-gray-900">Just 1 TV</strong></p>
          <button onClick={onReset} className="text-sm text-orange-600 hover:text-orange-500 font-semibold underline">Change</button>
        </div>
        <div className="w-full text-left bg-orange-50 border-2 border-orange-500 rounded-xl p-5">
          <div className="flex items-center gap-3">
            <div className="bg-orange-100 p-2.5 rounded-lg">
              <Tv className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Just 1 TV</p>
              <p className="text-sm text-gray-500">Book online in 60 sec. Starting at $29.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (selectedPath === 'multi') {
    return (
      <div className="animate-in fade-in duration-300">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm text-gray-500">You selected: <strong className="text-gray-900">2 or more TVs</strong></p>
          <button onClick={onReset} className="text-sm text-orange-600 hover:text-orange-500 font-semibold underline">Change</button>
        </div>
        <div className="w-full bg-white border-2 border-orange-500 rounded-xl p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
            SAVE UP TO 20%
          </div>
          <div className="flex items-start gap-3 mb-4">
            <div className="bg-orange-50 p-2.5 rounded-lg mt-0.5">
              <Phone className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">2 or more TVs</p>
              <p className="text-sm text-gray-500">Talk to a specialist — bigger discount, faster install.</p>
            </div>
          </div>
          <a
            href="tel:9724303694"
            className="flex items-center justify-between w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg px-4 py-3 transition-all group"
          >
            <div>
              <p className="text-xs text-gray-500 font-medium">Fastest path</p>
              <p className="font-black text-orange-600 text-lg">(972) 430-3694</p>
            </div>
            <Phone className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
          </a>
          <div className="flex items-center gap-2 mt-3">
            <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-amber-400'}`}></span>
            <span className="text-xs text-gray-500">
              {isOpen ? 'Open now · Mon–Sun 8AM–10PM CT' : 'Currently closed · Opens 8AM CT · Leave a message'}
            </span>
          </div>
          <div className="flex gap-2 mt-4">
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">✓ Licensed & insured</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">✓ Same-week install</span>
          </div>
        </div>
      </div>
    );
  }

  // Default: show both cards (no selection yet)
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="text-center mb-6">
        <h2 className="text-xl font-bold text-gray-900">Get your quote in under a minute.</h2>
        <p className="text-sm text-gray-500 mt-1">Tell us how many TVs you're mounting.</p>
      </div>

      <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest text-center mb-2">How many TVs?</p>

      {/* Card 1 — Just 1 TV */}
      <button
        onClick={() => onSelectPath('single')}
        className="w-full text-left bg-white border-2 border-gray-200 hover:border-orange-500 rounded-xl p-5 transition-all duration-200 hover:shadow-md group"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-orange-50 p-2.5 rounded-lg">
              <Tv className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <p className="font-bold text-gray-900">Just 1 TV</p>
              <p className="text-sm text-gray-500">Book online in 60 sec. Starting at $29.</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-400">~60 seconds</span>
            <ChevronRight className="w-5 h-5 text-orange-500 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </button>

      {/* Card 2 — 2 or more TVs */}
      <div className="w-full bg-white border-2 border-orange-500 rounded-xl p-5 relative overflow-hidden">
        <div className="absolute top-0 right-0 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-bl-xl">
          SAVE UP TO 20%
        </div>
        <div className="flex items-start gap-3 mb-4">
          <div className="bg-orange-50 p-2.5 rounded-lg mt-0.5">
            <Phone className="w-5 h-5 text-orange-500" />
          </div>
          <div>
            <p className="font-bold text-gray-900">2 or more TVs</p>
            <p className="text-sm text-gray-500">Talk to a specialist — bigger discount, faster install.</p>
          </div>
        </div>
        <a
          href="tel:9724303694"
          className="flex items-center justify-between w-full bg-orange-50 hover:bg-orange-100 border border-orange-200 rounded-lg px-4 py-3 transition-all group"
        >
          <div>
            <p className="text-xs text-gray-500 font-medium">Fastest path</p>
            <p className="font-black text-orange-600 text-lg">(972) 430-3694</p>
          </div>
          <Phone className="w-5 h-5 text-orange-500 group-hover:scale-110 transition-transform" />
        </a>
        <div className="flex items-center gap-2 mt-3">
          <span className={`w-2 h-2 rounded-full ${isOpen ? 'bg-green-500' : 'bg-amber-400'}`}></span>
          <span className="text-xs text-gray-500">
            {isOpen ? 'Open now · Mon–Sun 8AM–10PM CT' : 'Currently closed · Opens 8AM CT · Leave a message'}
          </span>
        </div>
        <div className="flex gap-2 mt-4">
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">✓ Licensed & insured</span>
          <span className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full">✓ Same-week install</span>
        </div>
        <div className="mt-4 pt-4 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-700">Why call for 2+ TVs?</p>
          <p className="text-xs text-gray-500 mt-0.5">Multi-TV jobs are faster and easier to coordinate with a specialist on the line.</p>
        </div>
      </div>
    </div>
  );
};

export default Step1;