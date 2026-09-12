import React from 'react';
import { BookOpen, Globe2, TrendingUp, ShieldAlert, Cpu, CheckCircle2 } from 'lucide-react';
import { REPORT_META } from '../data/reportData';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionIntro: React.FC<Props> = ({ viewMode }) => {
  return (
    <section id="intro" className="scroll-mt-36 py-8 border-b border-slate-200">
      {/* Chapter Badge */}
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <BookOpen className="w-4 h-4" />
        <span>Chapter 01 // Research Foundation</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Introduction & Market Context
      </h2>

      {/* Executive Callout */}
      <div className="bg-emerald-50 border-l-4 border-emerald-600 p-4 sm:p-5 rounded-r-lg mb-6">
        <h3 className="text-sm font-bold text-emerald-950 uppercase tracking-wide mb-1">
          Executive Synopsis: Strategic Entry into Australian Residential Real Estate
        </h3>
        <p className="text-sm text-emerald-900 leading-relaxed">
          Surprise Housing, an established US-based property acquisition and technology-driven housing firm,
          is executing a strategic expansion into the lucrative Australian real estate market. To avoid catastrophic
          capital misallocation in unfamiliar geographical micro-markets, the firm cannot rely on conventional,
          subjective human appraisals. This project delivers an algorithmic valuation engine that predicts fair market
          value, quantifies the exact financial ROI of property attributes, and isolates systematically undervalued
          residential assets ripe for profitable acquisition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2.5 mb-3 text-slate-800">
            <Globe2 className="w-5 h-5 text-blue-600" />
            <h4 className="font-semibold text-base">The Australian Real Estate Landscape</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            The Australian residential housing sector is characterized by high capital appreciation, stringent
            stamp duty transaction costs, and acute suburban micro-market divergence. Property values in high-growth
            corridors are deeply influenced by architectural finish quality, lot dimensions, school zoning, and proximity
            to transportation links rather than raw land footprint alone.
          </p>
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs text-slate-600 space-y-1.5">
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Market Dynamics:</span>
              <span>Constrained suburban supply with resilient buyer demand</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Primary Risk:</span>
              <span>Overpaying on cosmetically staged, fundamentally depreciated stock</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium text-slate-700">Strategic Target:</span>
              <span>Buy at 10-18% discount to intrinsic value, light remodel, monetize</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center space-x-2.5 mb-3 text-slate-800">
            <Cpu className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-base">The Transformative Role of Data Science</h4>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed mb-3">
            Traditional real estate relies on backwards-looking "comparables" (comps) that suffer from small sample sizes,
            selection bias, and appraisal delays. Machine learning replaces heuristic gut feeling with an objective 81-dimensional
            hedonic pricing function.
          </p>
          <ul className="text-xs text-slate-600 space-y-2">
            <li className="flex items-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <span><strong>Multivariate Disentanglement:</strong> Isolates the pure value of physical space (sq ft) from location premiums and material finishes.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <span><strong>Quantitative Risk Management:</strong> Produces statistically calibrated prediction bounds to guard Surprise Housing's balance sheet against market downturns.</span>
            </li>
            <li className="flex items-start">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0 mt-0.5" />
              <span><strong>Algorithmic Deal Sourcing:</strong> Screens thousands of market listings instantaneously to pinpoint arbitrage spreads.</span>
            </li>
          </ul>
        </div>
      </div>

      {viewMode === 'technical' && (
        <div className="bg-slate-900 text-slate-100 p-5 rounded-xl border border-slate-800 text-xs">
          <h4 className="text-sm font-semibold text-emerald-400 mb-2 font-mono flex items-center">
            <span>[Technical Framework: Hedonic Price Modeling Hypothesis]</span>
          </h4>
          <p className="text-slate-300 leading-relaxed mb-3 font-mono">
            We formalize residential property price as a bundle of characteristics:
            <span className="text-amber-300 block my-2 text-center text-sm font-sans">
              log(SalePrice_i) = &beta;_0 + &Sigma; &beta;_j X_ij + &Sigma; &gamma;_k Neighborhood_ik + &epsilon;_i
            </span>
            Because properties present extensive multicollinearity (Cor(TotRmsAbvGrd, GrLivArea) = 0.825) and high feature dimensionality (p &asymp; 220 after one-hot encoding), standard OLS suffers from non-invertible covariance matrices and variance explosion. Hence, L1 (Lasso) and L2 (Ridge) regularized estimators are mandatory to achieve minimum Mean Squared Error (MSE).
          </p>
        </div>
      )}
    </section>
  );
};
