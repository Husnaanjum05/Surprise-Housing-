import React, { useState } from 'react';
import { CheckSquare, Award, ArrowUpRight, CheckCircle2, TrendingUp, BarChart2 } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  ScatterChart,
  Scatter
} from 'recharts';
import { MODEL_METRICS, RESIDUAL_SAMPLE_POINTS } from '../data/reportData';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionEvaluation: React.FC<Props> = ({ viewMode }) => {
  const [metricView, setMetricView] = useState<'r2' | 'rmse' | 'mae'>('r2');

  const chartData = MODEL_METRICS.map(m => ({
    name: m.name.split(' ')[0], // short name
    fullName: m.name,
    trainR2: Math.round(m.trainR2 * 1000) / 10,
    testR2: Math.round(m.testR2 * 1000) / 10,
    testRMSE: m.testRMSE,
    testMAE: m.testMAE,
    isBest: m.isBest
  }));

  return (
    <section id="evaluation" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <CheckSquare className="w-4 h-4" />
        <span>Chapter 08 // Performance Benchmark</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Model Evaluation, Cross-Comparison & Selection
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Models were benchmarked across four statistical criteria: <strong>Mean Squared Error (MSE)</strong>,
        <strong>Root Mean Squared Error (RMSE in AUD)</strong>, <strong>Mean Absolute Error (MAE)</strong>, and
        <strong>Coefficient of Determination (R²)</strong> on both training and held-out test datasets.
      </p>

      {/* Comprehensive Metric Comparison Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mb-6">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900 flex items-center">
            <Award className="w-4 h-4 text-emerald-700 mr-2" />
            Empirical Benchmark: Train vs Test Generalization Matrix
          </h3>
          <span className="text-xs text-slate-500 font-mono">Held-Out Test Sample N = 292</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/80 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-3 px-4">Candidate Model</th>
                <th className="py-3 px-3">Train R²</th>
                <th className="py-3 px-3">Test R²</th>
                <th className="py-3 px-3">Test RMSE (AUD)</th>
                <th className="py-3 px-3">Test MAE (AUD)</th>
                <th className="py-3 px-3">Overfitting Gap</th>
                <th className="py-3 px-4">Operational Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {MODEL_METRICS.map((m) => (
                <tr
                  key={m.name}
                  className={`transition ${
                    m.isBest ? 'bg-emerald-50/70 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-slate-900">{m.name}</span>
                      {m.isBest && (
                        <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-wider px-2 py-0.5 rounded font-bold">
                          Champion
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] text-slate-500 block">{m.type}</span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-600">{(m.trainR2 * 100).toFixed(1)}%</td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    <span className={m.isBest ? 'text-emerald-700 text-sm' : ''}>
                      {(m.testR2 * 100).toFixed(1)}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-900">
                    ${m.testRMSE.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">
                    ${m.testMAE.toLocaleString()}
                  </td>
                  <td className="py-3 px-3 font-mono">
                    <span className={`text-[11px] px-1.5 py-0.5 rounded font-medium ${
                      (m.trainR2 - m.testR2) > 0.15 ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {((m.trainR2 - m.testR2) * 100).toFixed(1)}% gap
                    </span>
                  </td>
                  <td className="py-3 px-4 text-xs text-slate-600 max-w-xs">
                    {m.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Visual Metric Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Comparative Test Performance Breakdown
            </h3>
            <p className="text-xs text-slate-500">
              Comparing test accuracy and error bounds across models.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-slate-100 p-1 rounded-lg text-xs">
            <button
              onClick={() => setMetricView('r2')}
              className={`px-3 py-1 rounded font-medium ${metricView === 'r2' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Test R² Score (%)
            </button>
            <button
              onClick={() => setMetricView('rmse')}
              className={`px-3 py-1 rounded font-medium ${metricView === 'rmse' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Test RMSE ($ AUD)
            </button>
            <button
              onClick={() => setMetricView('mae')}
              className={`px-3 py-1 rounded font-medium ${metricView === 'mae' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'}`}
            >
              Test MAE ($ AUD)
            </button>
          </div>
        </div>

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#475569' }} />
              <YAxis
                tick={{ fontSize: 11, fill: '#475569' }}
                domain={metricView === 'r2' ? [60, 95] : ['auto', 'auto']}
                unit={metricView === 'r2' ? '%' : ''}
                tickFormatter={(val) => metricView === 'r2' ? `${val}%` : `$${Math.round(val / 1000)}k`}
              />
              <Tooltip
                formatter={(val: any) => [
                  metricView === 'r2' ? `${val}%` : `$${Number(val).toLocaleString()} AUD`,
                  metricView === 'r2' ? 'Test R²' : metricView === 'rmse' ? 'Test RMSE' : 'Test MAE'
                ]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Bar
                dataKey={metricView === 'r2' ? 'testR2' : metricView === 'rmse' ? 'testRMSE' : 'testMAE'}
                radius={[4, 4, 0, 0]}
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.isBest ? '#059669' : '#64748b'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Residual Diagnostics Card */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5">
        <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center">
          <BarChart2 className="w-4 h-4 text-emerald-700 mr-2" />
          Residual Diagnostics & Homoscedasticity Analysis
        </h3>
        <p className="text-xs text-slate-600 mb-4 leading-relaxed">
          Evaluating the residuals of the selected Lasso model (e_i = y_i - y_pred_i).
          A random scatter around the zero horizontal axis confirms that the variance of the errors is constant across
          all price tiers, validating that our logarithmic transformation successfully resolved heteroscedasticity.
        </p>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis
                dataKey="fitted"
                name="Fitted Price"
                unit=" AUD"
                tick={{ fontSize: 10, fill: '#475569' }}
                tickFormatter={(val) => `$${Math.round(val / 1000)}k`}
              />
              <YAxis
                dataKey="residual"
                name="Residual Error"
                tick={{ fontSize: 10, fill: '#475569' }}
                tickFormatter={(val) => `$${Math.round(val / 1000)}k`}
              />
              <Tooltip
                formatter={(val: any, name: any) => [`$${Number(val).toLocaleString()} AUD`, name]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Scatter name="Model Residuals" data={RESIDUAL_SAMPLE_POINTS} fill="#059669" />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-3 bg-emerald-50 p-3 rounded-lg border border-emerald-100 text-xs text-emerald-950">
          <strong>Why Lasso is the Definitive Winner for Surprise Housing:</strong> While Gradient Boosting posted a nominal +0.5% higher test R², Lasso delivers near-identical accuracy ($R^2 = 0.893$) while offering full mathematical transparency, eliminating 142 noise variables, and providing exact dollar elasticity for every property feature.
        </div>
      </div>
    </section>
  );
};
