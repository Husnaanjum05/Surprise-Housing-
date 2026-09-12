import React from 'react';
import { Cpu, Plus, Sparkles, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionFeatureEng: React.FC<Props> = ({ viewMode }) => {
  const engineeredFeatures = [
    {
      name: "TotalSF",
      formula: "1stFlrSF + 2ndFlrSF + TotalBsmtSF",
      rationale: "Buyers evaluate properties on cumulative sheltered square footage. Combining basement and above-ground spaces creates a unified spatial metric.",
      impact: "Correlation increased from 0.709 (GrLivArea) to 0.782 (TotalSF), ranking as the strongest volumetric predictor.",
      gain: "+10.3% Predictive Power"
    },
    {
      name: "HouseAge",
      formula: "YrSold - YearBuilt",
      rationale: "Absolute calendar year (e.g. 1985) is non-stationary. Computing elapsed structural age directly models physical depreciation and roof/plumbing fatigue.",
      impact: "Captures -0.52 linear decay with property price; essential for calculating renovation discounts.",
      gain: "Linear Stationarity"
    },
    {
      name: "RemodAge",
      formula: "YrSold - YearRemodAdd",
      rationale: "Captures how recently capital expenditure was injected into modernized kitchens, electrical, or structural retrofits.",
      impact: "Separates vintage properties that are dilapidated from vintage properties preserved in mint modern condition.",
      gain: "Capital Preservation"
    },
    {
      name: "TotalBaths",
      formula: "FullBath + 0.5*HalfBath + BsmtFullBath + 0.5*BsmtHalfBath",
      rationale: "Australian families place a steep premium on bathroom-to-bedroom ratios. Unifying four disparate variables into a continuous bathroom metric.",
      impact: "Eliminated multicollinearity across 4 sparse bath columns into a single robust coefficient (+$9,500 AUD / bath).",
      gain: "Collinearity Reduction"
    },
    {
      name: "OutdoorLivingSF",
      formula: "WoodDeckSF + OpenPorchSF + EnclosedPorch + ScreenPorch",
      rationale: "Australian residential lifestyles revolve around alfresco entertaining, covered pergolas, and outdoor dining.",
      impact: "Aggregates fragmented deck variables to capture outdoor lifestyle premiums (+$4,500 to +$8,000 AUD).",
      gain: "Lifestyle Valuation"
    },
    {
      name: "QualityIndex",
      formula: "OverallQual × OverallCond",
      rationale: "Non-linear interaction term modeling whether high-grade materials have been well maintained vs neglected.",
      impact: "Penalizes high-grade builds that suffered deferred maintenance, improving residual homoscedasticity.",
      gain: "Interaction Modeling"
    }
  ];

  return (
    <section id="features" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Cpu className="w-4 h-4" />
        <span>Chapter 05 // Domain Synthesis</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Feature Engineering & Mathematical Transformations
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Raw real estate features are often fragmented across multiple collinear categories (e.g., separate
        basement half-baths vs first-floor full baths). Through domain-driven synthesis, we consolidated redundant
        measurements into high-impact aggregate predictors tailored to the Australian housing context.
      </p>

      {/* Feature Engineering Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {engineeredFeatures.map((feat) => (
          <div key={feat.name} className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="font-mono font-bold text-slate-900 text-sm">{feat.name}</span>
                <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {feat.gain}
                </span>
              </div>
              <div className="bg-slate-50 font-mono text-xs text-slate-700 p-2 rounded border border-slate-200 mb-2.5 break-all">
                {feat.formula}
              </div>
              <p className="text-xs text-slate-600 mb-2">{feat.rationale}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 text-[11px] text-emerald-800 font-medium flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1 shrink-0 text-emerald-600" />
              <span>{feat.impact}</span>
            </div>
          </div>
        ))}
      </div>

      {viewMode === 'technical' && (
        <div className="bg-slate-900 text-slate-200 p-5 rounded-xl border border-slate-800 text-xs font-mono">
          <h4 className="text-sm font-semibold text-emerald-400 mb-2 flex items-center">
            <span>[Technical Note: Standardization & Scaling Workflow]</span>
          </h4>
          <p className="leading-relaxed mb-3 text-slate-300">
            Because $L_1$ and $L_2$ regularization penalties ($\lambda \sum |\beta_j|$ and $\lambda \sum \beta_j^2$)
            are scale-sensitive, unstandardized features with large numerical ranges (e.g. <code>LotArea</code> ~ 10,000)
            would be penalized artificially more than binary indicators.
          </p>
          <div className="bg-slate-950 p-3 rounded border border-slate-800 text-amber-300 space-y-1">
            <div>1. Fit <code>StandardScaler</code> on training fold strictly: z = (x - &mu;_train) / &sigma;_train</div>
            <div>2. Apply training mean and variance to test fold to prevent data leakage.</div>
            <div>3. One-hot dummies retained on [0, 1] scale or standardized depending on sparse matrix configuration.</div>
          </div>
        </div>
      )}
    </section>
  );
};
