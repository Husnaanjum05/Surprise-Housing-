import React, { useState, useMemo } from 'react';
import {
  Calculator,
  Building2,
  DollarSign,
  TrendingUp,
  Sparkles,
  ShieldCheck,
  AlertCircle,
  Wrench,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { PropertyInput } from '../types';
import { calculatePropertyValuation } from '../utils/valuationEngine';
import { NEIGHBORHOOD_DATA } from '../data/reportData';

export const InteractiveValuationTool: React.FC = () => {
  const [property, setProperty] = useState<PropertyInput>({
    overallQual: 7,
    grLivArea: 1750,
    totalBsmtSF: 950,
    neighborhood: 'CollgCr',
    yearBuilt: 2002,
    yearRemodAdd: 2008,
    totalBaths: 2.5,
    garageCars: 2,
    lotArea: 9500,
    kitchenQual: 4,
    fireplaceQu: 3,
  });

  const valuation = useMemo(() => {
    return calculatePropertyValuation(property);
  }, [property]);

  const handleReset = () => {
    setProperty({
      overallQual: 7,
      grLivArea: 1750,
      totalBsmtSF: 950,
      neighborhood: 'CollgCr',
      yearBuilt: 2002,
      yearRemodAdd: 2008,
      totalBaths: 2.5,
      garageCars: 2,
      lotArea: 9500,
      kitchenQual: 4,
      fireplaceQu: 3,
    });
  };

  const handlePreset = (type: 'luxury' | 'turnkey' | 'fixer') => {
    if (type === 'luxury') {
      setProperty({
        overallQual: 9,
        grLivArea: 2600,
        totalBsmtSF: 1400,
        neighborhood: 'NridgHt',
        yearBuilt: 2012,
        yearRemodAdd: 2018,
        totalBaths: 3.5,
        garageCars: 3,
        lotArea: 13000,
        kitchenQual: 5,
        fireplaceQu: 4,
      });
    } else if (type === 'turnkey') {
      setProperty({
        overallQual: 7,
        grLivArea: 1800,
        totalBsmtSF: 1000,
        neighborhood: 'Somerst',
        yearBuilt: 2004,
        yearRemodAdd: 2015,
        totalBaths: 2.5,
        garageCars: 2,
        lotArea: 9200,
        kitchenQual: 4,
        fireplaceQu: 3,
      });
    } else if (type === 'fixer') {
      setProperty({
        overallQual: 5,
        grLivArea: 1450,
        totalBsmtSF: 850,
        neighborhood: 'Edwards',
        yearBuilt: 1968,
        yearRemodAdd: 1970,
        totalBaths: 1.5,
        garageCars: 1,
        lotArea: 8800,
        kitchenQual: 2,
        fireplaceQu: 0,
      });
    }
  };

  return (
    <section id="calculator" className="scroll-mt-36 py-8">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-amber-700 mb-2">
        <Calculator className="w-4 h-4" />
        <span>Interactive Decision Support System</span>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Surprise Housing Property Valuation Simulator
          </h2>
          <p className="text-sm text-slate-600">
            Real-time automated underwriting engine powered by our calibrated Champion Lasso Regularization Model.
          </p>
        </div>

        {/* Preset Buttons */}
        <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-lg text-xs">
          <span className="text-slate-500 font-medium px-1">Presets:</span>
          <button
            onClick={() => handlePreset('luxury')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 rounded font-medium shadow-2xs transition"
          >
            Luxury Estate
          </button>
          <button
            onClick={() => handlePreset('turnkey')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 rounded font-medium shadow-2xs transition"
          >
            Suburban Family
          </button>
          <button
            onClick={() => handlePreset('fixer')}
            className="px-2.5 py-1 bg-white hover:bg-slate-50 text-slate-800 rounded font-medium shadow-2xs transition"
          >
            Fixer-Upper Arbitrage
          </button>
          <button
            onClick={handleReset}
            className="p-1 hover:bg-slate-200 text-slate-600 rounded transition"
            title="Reset to defaults"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Property Inputs (7 Cols) */}
        <div className="lg:col-span-7 bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
            <span>Property Specifications & Physical Inputs</span>
            <span className="text-xs text-slate-400 font-normal">Trained on Australian Hedonic Dataset</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            {/* Neighborhood */}
            <div className="sm:col-span-2">
              <label className="block font-semibold text-slate-700 mb-1">
                Suburban Location (Neighborhood Enclave)
              </label>
              <select
                value={property.neighborhood}
                onChange={(e) => setProperty({ ...property, neighborhood: e.target.value })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-hidden"
              >
                {NEIGHBORHOOD_DATA.map((n) => (
                  <option key={n.neighborhood} value={n.neighborhood}>
                    {n.suburbName} ({n.neighborhood}) — Median: ${n.medianPrice.toLocaleString()} AUD [{n.tier}]
                  </option>
                ))}
              </select>
            </div>

            {/* Overall Quality */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Material Quality Grade:</span>
                <span className="text-emerald-700 font-mono font-bold">{property.overallQual} / 10</span>
              </div>
              <input
                type="range"
                min="2"
                max="10"
                step="1"
                value={property.overallQual}
                onChange={(e) => setProperty({ ...property, overallQual: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Poor (2)</span>
                <span>Average (5)</span>
                <span>Luxury (10)</span>
              </div>
            </div>

            {/* Kitchen Quality */}
            <div>
              <div className="flex justify-between font-semibold text-slate-700 mb-1">
                <span>Kitchen Finish Grade:</span>
                <span className="text-emerald-700 font-mono font-bold">
                  {property.kitchenQual === 5 ? 'Excellent' : property.kitchenQual === 4 ? 'Good' : property.kitchenQual === 3 ? 'Typical' : 'Fair'}
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="5"
                step="1"
                value={property.kitchenQual}
                onChange={(e) => setProperty({ ...property, kitchenQual: Number(e.target.value) })}
                className="w-full accent-emerald-600 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>Fair (2)</span>
                <span>Typical (3)</span>
                <span>Good (4)</span>
                <span>Ex (5)</span>
              </div>
            </div>

            {/* Living Area */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Living Area (GrLivArea sq ft):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="500"
                  max="4500"
                  step="50"
                  value={property.grLivArea}
                  onChange={(e) => setProperty({ ...property, grLivArea: Math.max(0, Number(e.target.value)) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-xs">sq ft</span>
              </div>
            </div>

            {/* Basement Area */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Basement Footprint (TotalBsmtSF):
              </label>
              <div className="relative">
                <input
                  type="number"
                  min="0"
                  max="3000"
                  step="50"
                  value={property.totalBsmtSF}
                  onChange={(e) => setProperty({ ...property, totalBsmtSF: Math.max(0, Number(e.target.value)) })}
                  className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden"
                />
                <span className="absolute right-3 top-2 text-slate-400 text-xs">sq ft</span>
              </div>
            </div>

            {/* Year Built */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Year Built:
              </label>
              <input
                type="number"
                min="1900"
                max="2026"
                value={property.yearBuilt}
                onChange={(e) => setProperty({ ...property, yearBuilt: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>

            {/* Year Remodeled */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Year Remodeled / Addition:
              </label>
              <input
                type="number"
                min={property.yearBuilt}
                max="2026"
                value={property.yearRemodAdd}
                onChange={(e) => setProperty({ ...property, yearRemodAdd: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-mono focus:ring-2 focus:ring-emerald-500 outline-hidden"
              />
            </div>

            {/* Bathrooms */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Bathroom Capacity (Total Baths):
              </label>
              <select
                value={property.totalBaths}
                onChange={(e) => setProperty({ ...property, totalBaths: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
              >
                <option value="1">1.0 Bath</option>
                <option value="1.5">1.5 Baths</option>
                <option value="2">2.0 Baths</option>
                <option value="2.5">2.5 Baths</option>
                <option value="3">3.0 Baths</option>
                <option value="3.5">3.5 Baths</option>
                <option value="4">4.0+ Baths</option>
              </select>
            </div>

            {/* Garage Capacity */}
            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Garage Stalls (Vehicle Capacity):
              </label>
              <select
                value={property.garageCars}
                onChange={(e) => setProperty({ ...property, garageCars: Number(e.target.value) })}
                className="w-full bg-slate-50 border border-slate-300 rounded-lg p-2 text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-hidden"
              >
                <option value="0">0 (No Garage)</option>
                <option value="1">1 Car Garage</option>
                <option value="2">2 Car Garage (Standard)</option>
                <option value="3">3 Car Garage (Executive)</option>
                <option value="4">4+ Car Garage</option>
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Underwriting Results (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* Valuation Hero Card */}
          <div className="bg-slate-900 text-white p-5 rounded-xl border border-slate-800 shadow-md">
            <span className="text-xs uppercase tracking-wider font-semibold text-emerald-400 block mb-1">
              Estimated Fair Market Valuation
            </span>
            <div className="text-3xl sm:text-4xl font-black font-mono text-white tracking-tight">
              ${valuation.predictedPrice.toLocaleString()} <span className="text-sm font-normal text-slate-400">AUD</span>
            </div>

            <div className="mt-2 text-xs text-slate-400 flex items-center justify-between">
              <span>95% Confidence Band:</span>
              <span className="font-mono text-slate-300">
                ${valuation.confidenceLow.toLocaleString()} – ${valuation.confidenceHigh.toLocaleString()}
              </span>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-slate-400 block">Unit Valuation:</span>
                <span className="font-mono font-bold text-slate-200">
                  ${valuation.pricePerSqFt} / sq ft
                </span>
              </div>
              <div>
                <span className="text-slate-400 block">Total Living Footprint:</span>
                <span className="font-mono font-bold text-slate-200">
                  {property.grLivArea + property.totalBsmtSF} sq ft
                </span>
              </div>
            </div>
          </div>

          {/* Institutional Underwriting Directive */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-900 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1 text-emerald-700" />
                Surprise Housing MAO Recommendation
              </span>
              <span className="text-[11px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                Target 18% Margin
              </span>
            </div>

            <div className="text-2xl font-bold font-mono text-emerald-950">
              ${valuation.recommendedMaxOffer.toLocaleString()} AUD
            </div>
            <p className="text-xs text-emerald-800 mt-1 leading-relaxed">
              Maximum Allowable Offer (MAO) underwriting ceiling. Bids submitted above this threshold breach
              institutional risk parameters.
            </p>
          </div>

          {/* Value-Add Renovation Potential */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 flex items-center">
                <Wrench className="w-4 h-4 mr-1.5 text-blue-600" />
                Value-Add Renovation Opportunity
              </span>
              <span className="text-xs font-mono font-bold text-emerald-700">
                +${valuation.renovationBoostEstimate.toLocaleString()} AUD
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-2">
              Projected <strong>After-Repair Value (ARV)</strong> following cosmetic kitchen and bathroom finish upgrades:
            </p>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 flex justify-between items-center text-xs">
              <span className="font-medium text-slate-700">Projected ARV Exit:</span>
              <span className="font-mono font-bold text-slate-900 text-sm">
                ${valuation.afterRepairValue.toLocaleString()} AUD
              </span>
            </div>
          </div>

          {/* Key Factor Impacts */}
          <div className="bg-white border border-slate-200 p-4 rounded-xl shadow-xs text-xs">
            <h4 className="font-bold text-slate-900 mb-2">Primary Valuation Drivers (Lasso Coefficients)</h4>
            <div className="space-y-1.5">
              {valuation.keyDrivers.map((driver, idx) => (
                <div key={idx} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                  <span className="text-slate-600">{driver.name}</span>
                  <span className={`font-mono font-semibold ${driver.isPositive ? 'text-emerald-700' : 'text-rose-700'}`}>
                    {driver.impact}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
