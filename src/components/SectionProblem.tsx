import React from 'react';
import { Target, HelpCircle, Compass, CheckCircle2, DollarSign, Crosshair, AlertTriangle } from 'lucide-react';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionProblem: React.FC<Props> = ({ viewMode }) => {
  return (
    <section id="problem" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Target className="w-4 h-4" />
        <span>Chapter 02 // Project Charter</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Problem Statement & Research Objectives
      </h2>

      {/* Core Question Highlight Box */}
      <div className="bg-gradient-to-r from-blue-900 via-slate-900 to-slate-900 text-white p-6 rounded-xl shadow-sm mb-6 border border-blue-800/40">
        <div className="flex items-start space-x-3">
          <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400 mt-1">
            <HelpCircle className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs uppercase tracking-widest font-mono text-blue-300">
              Core Strategic Research Question
            </span>
            <p className="text-lg sm:text-xl font-bold text-white mt-1 leading-snug">
              "How can data science empower real estate companies to strategically enter new markets, maximize revenue, and optimize investment decisions?"
            </p>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 font-normal leading-relaxed">
              Surprise Housing has budgeted significant capital for initial residential asset acquisition in Australia.
              The fundamental challenge is that a foreign operator faces asymmetric information: local brokers have deep
              informal knowledge, while Surprise Housing risks overbidding on overpriced assets or missing high-yield,
              undervalued properties ripe for renovation and swift resale.
            </p>
          </div>
        </div>
      </div>

      {/* Objectives Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 hover:border-emerald-300 transition shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm mb-3">
            01
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-2">Precise Valuation Engine</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Construct an ensemble of regularized machine learning regressors capable of predicting property sale prices
            with high statistical fidelity (R² &gt; 0.88, RMSE &lt; $27,000 AUD) across diverse housing sub-types.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 hover:border-blue-300 transition shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm mb-3">
            02
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-2">Driver Significance & Elasticity</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Unveil the exact statistical significance of the 81 physical, spatial, and zoning variables. Quantify how
            each attribute positively or negatively moves the property valuation baseline in Australian Dollars.
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 hover:border-purple-300 transition shadow-xs">
          <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-sm mb-3">
            03
          </div>
          <h4 className="font-bold text-slate-900 text-base mb-2">Actionable Investment Playbook</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Formulate institutional acquisition thresholds (Maximum Allowable Offer formula), identify high-margin
            renovation opportunities (After-Repair Value), and establish risk-hedging protocols against localized market volatility.
          </p>
        </div>
      </div>

      {/* Investment Constraints & Risks Matrix */}
      <div className="bg-slate-50 border border-slate-200 rounded-xl p-5">
        <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center">
          <AlertTriangle className="w-4 h-4 text-amber-500 mr-1.5" />
          Key Operational Constraints & Critical Success Criteria
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Generalization Gap</span>
            <strong className="text-slate-900 text-sm block mt-0.5">Train-Test Δ &lt; 3.0%</strong>
            <p className="text-slate-600 text-[11px] mt-1">Preventing overfitted models that perform poorly on future auctions.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Model Interpretability</span>
            <strong className="text-slate-900 text-sm block mt-0.5">Linear Regularization</strong>
            <p className="text-slate-600 text-[11px] mt-1">Executive investment committee demands transparent coefficients over pure black boxes.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Acquisition Discount</span>
            <strong className="text-slate-900 text-sm block mt-0.5">15% - 20% Under FMV</strong>
            <p className="text-slate-600 text-[11px] mt-1">Targeting transactions where predicted fair value comfortably exceeds asking price.</p>
          </div>
          <div className="bg-white p-3 rounded-lg border border-slate-200">
            <span className="text-slate-500 block">Renovation Capital Efficiency</span>
            <strong className="text-slate-900 text-sm block mt-0.5">&gt; 2.2x Cash-on-Cash</strong>
            <p className="text-slate-600 text-[11px] mt-1">Every $10k invested into kitchen or bath upgrades must generate &gt;$22k in resale equity.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
