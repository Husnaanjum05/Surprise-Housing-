import React from 'react';
import { Briefcase, TrendingUp, DollarSign, Wrench, ShieldAlert, Crosshair, CheckCircle2, ChevronRight } from 'lucide-react';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionBusinessStrategy: React.FC<Props> = ({ viewMode }) => {
  return (
    <section id="strategy" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Briefcase className="w-4 h-4" />
        <span>Chapter 10 // Capital Allocation</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Business Implications & Strategic Investment Playbook
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Surprise Housing's long-term enterprise value in Australia hinges on transforming predictive machine learning
        into automated underwriting rules. By operationalizing our Lasso model, the company can replace subjective
        broker opinions with systematic alpha generation.
      </p>

      {/* 4 Core Pillars of Strategic Implementation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        {/* Pillar 1 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-emerald-300 transition">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Crosshair className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">Pillar 01</span>
              <h3 className="font-bold text-slate-900 text-base">Algorithmic Arbitrage Screener</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Connect the Lasso model directly to real estate listing feeds (Domain, Realestate.com.au). Automatically
            compute the <em>Arbitrage Spread</em>:
          </p>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 mb-3 text-center">
            Spread = Predicted Fair Value - Asking List Price
          </div>
          <p className="text-xs text-slate-600">
            Properties with Spread &gt; 15% and within our 90% confidence lower bound are flagged for immediate cash offer submission,
            securing assets before competitors finish manual site inspections.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-blue-300 transition">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700">Pillar 02</span>
              <h3 className="font-bold text-slate-900 text-base">Targeted Renovation ROI Matrix</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Not all renovations yield equal returns. Surprise Housing should allocate rehabilitation budgets
            strictly where marginal dollar return exceeds capital cost:
          </p>
          <div className="space-y-1.5 text-xs text-slate-700">
            <div className="flex justify-between p-1.5 bg-slate-50 rounded">
              <span>Kitchen Upgrade (Typical → Excellent):</span>
              <strong className="text-emerald-700 font-mono">240% Capex ROI (+$28k AUD)</strong>
            </div>
            <div className="flex justify-between p-1.5 bg-slate-50 rounded">
              <span>Adding Ensuite Bathroom (1.5 → 2.5):</span>
              <strong className="text-emerald-700 font-mono">190% Capex ROI (+$18k AUD)</strong>
            </div>
            <div className="flex justify-between p-1.5 bg-slate-50 rounded">
              <span>Basement Finishing ($/sqft):</span>
              <strong className="text-blue-700 font-mono">140% Capex ROI (+$42/sqft)</strong>
            </div>
          </div>
        </div>

        {/* Pillar 3 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-purple-300 transition">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-purple-700">Pillar 03</span>
              <h3 className="font-bold text-slate-900 text-base">Geographic Cluster Strategy</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Avoid scattering purchases across fragmented remote regions. Concentrate capital in upper-tier suburbs:
            <strong> Stone Brook, Northridge Heights, and College Creek</strong>.
          </p>
          <p className="text-xs text-slate-600">
            Cluster purchasing enables Surprise Housing to negotiate bulk contractor trade rates, share staging furniture,
            and build localized brand recognition among high-net-worth Australian buyers.
          </p>
        </div>

        {/* Pillar 4 */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs hover:border-amber-300 transition">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Pillar 04</span>
              <h3 className="font-bold text-slate-900 text-base">Downside Hedging & MAO Rule</h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            Enforce a strict institutional Maximum Allowable Offer (MAO) underwriting policy across all acquisition desks:
          </p>
          <div className="bg-slate-50 p-2 rounded border border-slate-200 font-mono text-[11px] text-slate-800 text-center mb-2">
            MAO = (0.82 × Predicted Fair Value) - Estimated Repairs - $12k Holding Buffer
          </div>
          <p className="text-xs text-slate-600">
            This guarantees a minimum 18% equity cushion, safeguarding company liquidity even in the event of an unexpected
            macroeconomic rate hike or 5% regional market retracement.
          </p>
        </div>
      </div>

      {/* Target Suburb Strategy Playbook */}
      <div className="bg-slate-900 text-white rounded-xl p-6 border border-slate-800">
        <h3 className="text-sm font-bold text-emerald-400 uppercase tracking-wide mb-3 flex items-center">
          <DollarSign className="w-4 h-4 mr-1.5" />
          Surprise Housing Australia: Capital Allocation Tier Guidelines
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
            <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px] block mb-1">
              Tier 1: Core Luxury Flips (50% Capital)
            </span>
            <strong className="text-slate-100 text-sm block mb-1">Stone Brook & Northridge</strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Target homes with Overall Quality 6-7 selling at median $260k-$280k. Execute high-end cosmetic renovations
              (gourmet kitchens, master bath suites) to exit at $360k+ with 28% net margins.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
            <span className="text-blue-400 font-bold uppercase tracking-wider text-[11px] block mb-1">
              Tier 2: High-Yield Rentals (35% Capital)
            </span>
            <strong className="text-slate-100 text-sm block mb-1">College Creek & Somerset</strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Target solid single-family homes around $180k-$200k. Turnkey quality, long-term leasing to university and tech
              professionals with steady 5.8% gross rental yields.
            </p>
          </div>

          <div className="bg-slate-800/80 p-4 rounded-lg border border-slate-700">
            <span className="text-amber-400 font-bold uppercase tracking-wider text-[11px] block mb-1">
              Tier 3: Strict Exclusions (0% Capital)
            </span>
            <strong className="text-slate-100 text-sm block mb-1">Meadow Village & Arterial Frontages</strong>
            <p className="text-slate-300 leading-relaxed text-[11px]">
              Blacklisted from portfolio due to structural price stagnation and traffic noise penalties (-$16.2k) that
              cannot be rectified via cosmetic remodeling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
