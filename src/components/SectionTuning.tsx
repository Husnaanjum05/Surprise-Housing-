import React, { useState } from 'react';
import { Sliders, Cpu, CheckCircle2, TrendingUp, Info, Activity } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { ALPHA_TUNING_DATA } from '../data/reportData';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionTuning: React.FC<Props> = ({ viewMode }) => {
  const [selectedModel, setSelectedModel] = useState<'both' | 'lasso' | 'ridge'>('both');

  return (
    <section id="tuning" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Sliders className="w-4 h-4" />
        <span>Chapter 07 // Parameter Optimization</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Hyperparameter Tuning & Regularization Paths
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        The regularization parameter <strong>$\alpha$ (or $\lambda$)</strong> dictates the critical tradeoff between
        model bias and variance. If $\alpha \to 0$, the model collapses into unconstrained OLS with runaway variance;
        if $\alpha$ is excessively large, coefficients are overly penalized, causing high bias.
        We employed <strong>5-Fold Cross-Validation (5-Fold CV)</strong> across 10 logarithmic decades ($\alpha \in [10^{-4}, 10^2]$)
        to discover the global optima.
      </p>

      {/* Optimal Hyperparameters Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-white p-5 rounded-xl border-2 border-emerald-500/40 shadow-xs relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Optimal Lasso (L1) Configuration
            </span>
            <span className="text-xs font-mono font-bold text-emerald-700">Champion Tuning</span>
          </div>
          <div className="flex items-baseline space-x-3 my-2">
            <span className="text-3xl font-black text-slate-900 font-mono">α = 0.0005</span>
            <span className="text-xs text-slate-500">(Log-target scale)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            At $\alpha = 0.0005$, the L1 penalty eliminated <strong>142 extraneous variables</strong> (e.g., redundant
            roof style variations, obscure zoning codes) whose coefficients dropped exactly to zero, concentrating
            predictive power into <strong>78 high-signal drivers</strong>.
          </p>
          <div className="bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 text-xs text-emerald-950 font-medium">
            Result: Cross-Validation R² reaches peak <strong>0.893</strong> with minimal test generalization gap (1.9%).
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
              Optimal Ridge (L2) Configuration
            </span>
            <span className="text-xs font-mono font-bold text-blue-700">Smooth Shrinkage</span>
          </div>
          <div className="flex items-baseline space-x-3 my-2">
            <span className="text-3xl font-black text-slate-900 font-mono">α = 10.0</span>
            <span className="text-xs text-slate-500">(Standardized space)</span>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed mb-3">
            At $\alpha = 10.0$, the condition number of $(X^T X + \lambda I)$ stabilizes, shrinking collinear
            weights uniformly across all 220 features without forcing any parameter to absolute zero.
          </p>
          <div className="bg-blue-50 p-2.5 rounded-lg border border-blue-100 text-xs text-blue-950 font-medium">
            Result: Cross-Validation R² stabilizes at <strong>0.887</strong> with test RMSE of $26,800 AUD.
          </div>
        </div>
      </div>

      {/* Interactive Regularization Path Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mb-6">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center">
              <Activity className="w-4 h-4 text-emerald-700 mr-2" />
              Regularization Sensitivity Analysis: Test R² vs Regularization Strength (α)
            </h3>
            <p className="text-xs text-slate-500">
              Examining model validation performance as penalty parameter moves from 0.0001 to 100.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setSelectedModel('both')}
              className={`px-2.5 py-1 rounded font-medium ${selectedModel === 'both' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Compare Both
            </button>
            <button
              onClick={() => setSelectedModel('lasso')}
              className={`px-2.5 py-1 rounded font-medium ${selectedModel === 'lasso' ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Lasso (L1) Only
            </button>
            <button
              onClick={() => setSelectedModel('ridge')}
              className={`px-2.5 py-1 rounded font-medium ${selectedModel === 'ridge' ? 'bg-blue-700 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Ridge (L2) Only
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ALPHA_TUNING_DATA} margin={{ top: 10, right: 25, left: 10, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis
                  dataKey="alpha"
                  tick={{ fontSize: 11, fill: '#475569' }}
                  scale="log"
                  domain={['auto', 'auto']}
                  tickFormatter={(val) => `${val}`}
                />
                <YAxis
                  domain={[0.4, 0.95]}
                  tick={{ fontSize: 11, fill: '#475569' }}
                  tickFormatter={(val) => `${(val * 100).toFixed(0)}%`}
                />
                <Tooltip
                  formatter={(val: any, name: any) => [
                    `${(Number(val) * 100).toFixed(2)}%`,
                    name
                  ]}
                  labelFormatter={(val) => `Alpha (λ) = ${val}`}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                />
                <Legend verticalAlign="top" height={36} wrapperStyle={{ fontSize: '12px' }} />

                {(selectedModel === 'both' || selectedModel === 'lasso') && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="lassoTestR2"
                      stroke="#059669"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#059669' }}
                      name="Lasso Validation R²"
                    />
                    <Line
                      type="monotone"
                      dataKey="lassoTrainR2"
                      stroke="#6ee7b7"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                      name="Lasso Training R²"
                    />
                  </>
                )}

                {(selectedModel === 'both' || selectedModel === 'ridge') && (
                  <>
                    <Line
                      type="monotone"
                      dataKey="ridgeTestR2"
                      stroke="#2563eb"
                      strokeWidth={3}
                      dot={{ r: 4, fill: '#2563eb' }}
                      name="Ridge Validation R²"
                    />
                    <Line
                      type="monotone"
                      dataKey="ridgeTrainR2"
                      stroke="#93c5fd"
                      strokeWidth={2}
                      strokeDasharray="4 4"
                      dot={false}
                      name="Ridge Training R²"
                    />
                  </>
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-slate-500 mt-2 text-center italic">
            Figure 7.1: Regularization paths. Note how Lasso rapidly drops in accuracy beyond &alpha; &gt; 0.1 due to excessive coefficient zeroing (underfitting), while Ridge exhibits gentler degradation.
          </p>
        </div>
      </div>
    </section>
  );
};
