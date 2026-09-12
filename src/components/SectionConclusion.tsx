import React from 'react';
import { Flag, CheckCircle2, AlertTriangle, Compass, ArrowRight, Lightbulb } from 'lucide-react';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionConclusion: React.FC<Props> = ({ viewMode }) => {
  return (
    <section id="conclusion" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Flag className="w-4 h-4" />
        <span>Chapter 11 // Synthesis & Future Horizon</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Conclusion, Limitations & Strategic Roadmap
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        This research provides Surprise Housing with an institutional-grade predictive foundation for its Australian
        market expansion. By transitioning from human appraisal bias to regularized machine learning, the firm positions
        itself to capture asymmetric returns while rigorously bounding downside risk.
      </p>

      {/* Summary of Achievements */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs mb-6">
        <h3 className="text-sm font-bold text-slate-900 mb-3 flex items-center">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2" />
          Core Project Contributions & Milestones Delivered
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-1">1. Robust Predictive Accuracy</strong>
            <span>Lasso Regressor achieved <strong>0.893 test R²</strong> and <strong>$26,100 AUD RMSE</strong>, providing high confidence for automated acquisition bids.</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-1">2. Sparsity & Feature Pruning</strong>
            <span>Collapsed 220 expanded feature dimensions down to <strong>78 interpretable drivers</strong>, eliminating 142 collinear noise variables.</span>
          </div>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <strong className="text-slate-900 block mb-1">3. Quantitative Renovation Matrix</strong>
            <span>Delivered dollarized marginal elasticities (+$17.8k per quality grade, +$13.5k per 100 sqft) to maximize renovation return on investment.</span>
          </div>
        </div>
      </div>

      {/* Limitations and Future Steps */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Limitations */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 text-amber-700 font-bold text-sm mb-3">
            <AlertTriangle className="w-4 h-4" />
            <span>Analytical Limitations Encountered</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-2.5">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 mt-1.5 shrink-0"></span>
              <span><strong>Macroeconomic Interest Rate Omission:</strong> The dataset captures property physical attributes but lacks dynamic Reserve Bank of Australia (RBA) cash rate cycles or mortgage credit tightening.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 mt-1.5 shrink-0"></span>
              <span><strong>Micro-Spatial Topography:</strong> Lacks continuous GIS coordinates (distance in meters to train stations, primary school gates, coastlines, or greenbelts).</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2 mt-1.5 shrink-0"></span>
              <span><strong>Aesthetic & Visual Staging:</strong> Features cannot evaluate modern paint color palettes, natural daylighting angles, or architectural curb appeal that buyers perceive in person.</span>
            </li>
          </ul>
        </div>

        {/* Future Steps */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-sm mb-3">
            <Lightbulb className="w-4 h-4" />
            <span>Future Roadmap & Next Technical Iterations</span>
          </div>
          <ul className="text-xs text-slate-600 space-y-2.5">
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 mt-1.5 shrink-0"></span>
              <span><strong>Computer Vision Integration:</strong> Deploy a convolutional neural network (CNN) or Vision Transformer to score exterior and interior listing photos for curb appeal and finish modernity.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 mt-1.5 shrink-0"></span>
              <span><strong>Spatial Econometric Modeling:</strong> Incorporate Spatial Autoregressive (SAR) models to account for spatial autocorrelation across neighboring parcels.</span>
            </li>
            <li className="flex items-start">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 mt-1.5 shrink-0"></span>
              <span><strong>Real-Time MLS Streaming:</strong> Build real-time Kafka event streaming ingestion for Australian auction clearances to update regression weights on a weekly rolling cadence.</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Final Executive Sign-off */}
      <div className="bg-slate-900 text-slate-200 p-6 rounded-xl border border-slate-800 text-xs">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h4 className="text-sm font-bold text-white mb-1">
              Surprise Housing Strategic Recommendation: Proceed with Algorithmic Australian Entry
            </h4>
            <p className="text-slate-400 max-w-2xl leading-relaxed">
              Based on empirical validation, the Lasso predictive pipeline is ready for Phase 1 capital deployment ($50M AUD initial allocation).
              Underwriters should mandate the automated Maximum Allowable Offer (MAO) ceiling on all acquisition bids.
            </p>
          </div>
          <div className="shrink-0">
            <span className="inline-flex items-center px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-bold text-xs shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />
              Approved for Underwriting Deployment
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
