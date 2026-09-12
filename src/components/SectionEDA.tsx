import React, { useState } from 'react';
import { BarChart3, TrendingUp, ScatterChart as ScatterIcon, Layers, ChevronRight, Eye } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import {
  TOP_CORRELATIONS,
  NEIGHBORHOOD_DATA,
  PRICE_DISTRIBUTION_HISTOGRAM,
  OVERALL_QUAL_BOXPLOT
} from '../data/reportData';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionEDA: React.FC<Props> = ({ viewMode }) => {
  const [activeChartTab, setActiveChartTab] = useState<'distribution' | 'neighborhoods' | 'quality' | 'correlations'>('neighborhoods');

  // Sorted neighborhood data for charting (top 12)
  const chartNeighborhoods = [...NEIGHBORHOOD_DATA]
    .sort((a, b) => b.medianPrice - a.medianPrice)
    .slice(0, 12)
    .map(d => ({
      name: d.neighborhood,
      suburb: d.suburbName,
      price: Math.round(d.medianPrice / 1000),
      count: d.count,
      tier: d.tier
    }));

  return (
    <section id="eda" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <BarChart3 className="w-4 h-4" />
        <span>Chapter 04 // Empirical Discovery</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Exploratory Data Analysis (EDA) & Market Insights
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        Exploratory Data Analysis uncovered distinct structural patterns in the Australian property dataset.
        Rather than simple linear appreciation, house prices are dictated by a delicate nexus between
        architectural quality, total functional space, and localized suburban prestige premiums.
      </p>

      {/* Key EDA Insights Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
              Finding 01
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">r = 0.791</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Quality Overrides Age</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            <code>OverallQual</code> is the single strongest univariate predictor. Properties rated 9+ command exponential
            price spikes (&gt;$350k AUD), showing strong buyer willingness to pay for premium craftsmanship.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Finding 02
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">3.5x Divergence</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Suburban Wealth Stratification</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Median price in elite enclaves like <em>Northridge Heights ($315k)</em> is more than triple that of
            <em> Meadow Village ($88k)</em>, signaling that acquisition capital must be deployed with geographic specificity.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 bg-purple-50 px-2 py-0.5 rounded">
              Finding 03
            </span>
            <span className="text-xs font-mono font-bold text-slate-700">Collinearity</span>
          </div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Space Redundancy & Clumping</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            <code>GrLivArea</code>, <code>TotRmsAbvGrd</code>, and <code>FullBath</code> exhibit correlation &gt;0.80.
            Unregularized models will split coefficients unpredictably, mandating Ridge or Lasso shrinkage.
          </p>
        </div>
      </div>

      {/* Chart Explorer Tabs */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden mb-6">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <Eye className="w-4 h-4 text-emerald-700" />
            <h3 className="text-sm font-bold text-slate-900">
              Interactive Exploratory Data Visualizer
            </h3>
          </div>

          <div className="flex items-center space-x-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setActiveChartTab('neighborhoods')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeChartTab === 'neighborhoods' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Neighborhood Median Values
            </button>
            <button
              onClick={() => setActiveChartTab('quality')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeChartTab === 'quality' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Overall Quality vs Price
            </button>
            <button
              onClick={() => setActiveChartTab('distribution')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeChartTab === 'distribution' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Price Distribution Curve
            </button>
            <button
              onClick={() => setActiveChartTab('correlations')}
              className={`px-3 py-1.5 rounded-md font-medium transition ${
                activeChartTab === 'correlations' ? 'bg-emerald-700 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Top Correlated Features
            </button>
          </div>
        </div>

        <div className="p-5">
          {/* TAB 1: Neighborhoods */}
          {activeChartTab === 'neighborhoods' && (
            <div>
              <div className="mb-3 text-xs text-slate-500 flex justify-between items-center">
                <span>Top Australian suburbs ranked by Median Property Value ($'000 AUD):</span>
                <span className="font-mono text-emerald-700 font-semibold">Green = Luxury Tier | Blue = Upper-Mid</span>
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartNeighborhoods} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis
                      dataKey="name"
                      angle={-25}
                      textAnchor="end"
                      tick={{ fontSize: 11, fill: '#475569' }}
                    />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#475569' }}
                      unit="k"
                      domain={[0, 350]}
                    />
                    <Tooltip
                      formatter={(val: any) => [`$${val},000 AUD`, 'Median Sale Price']}
                      labelFormatter={(label, payload) => {
                        const item = payload?.[0]?.payload;
                        return item ? `${item.suburb} (${item.name})` : label;
                      }}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="price" radius={[4, 4, 0, 0]}>
                      {chartNeighborhoods.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.tier === 'Luxury' ? '#059669' : '#3b82f6'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-2 italic text-center">
                Figure 4.1: Northridge Heights and Stone Brook dominate with medians over $310,000 AUD, providing clear geographic targets for premium flips.
              </p>
            </div>
          )}

          {/* TAB 2: Quality Boxplot */}
          {activeChartTab === 'quality' && (
            <div>
              <div className="mb-3 text-xs text-slate-500">
                Median and Interquartile Range across Material & Finish Quality ratings (1 to 10):
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={OVERALL_QUAL_BOXPLOT} margin={{ top: 10, right: 20, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="label" tick={{ fontSize: 11, fill: '#475569' }} />
                    <YAxis
                      tick={{ fontSize: 11, fill: '#475569' }}
                      tickFormatter={(val) => `$${val / 1000}k`}
                    />
                    <Tooltip
                      formatter={(val: any, name: any) => [`$${val.toLocaleString()} AUD`, name === 'median' ? 'Median Price' : name]}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="median" fill="#0d9488" radius={[4, 4, 0, 0]} name="Median Price" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-2 italic text-center">
                Figure 4.2: Demonstrates super-linear appreciation above rating 7. Moving a home from Quality 6 to 8 yields over $100k AUD in capital appreciation.
              </p>
            </div>
          )}

          {/* TAB 3: Distribution */}
          {activeChartTab === 'distribution' && (
            <div>
              <div className="mb-3 text-xs text-slate-500">
                Frequency distribution of residential property transactions in the training population:
              </div>
              <div className="h-72 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={PRICE_DISTRIBUTION_HISTOGRAM} margin={{ top: 10, right: 20, left: 10, bottom: 25 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="bin" tick={{ fontSize: 11, fill: '#475569' }} angle={-20} textAnchor="end" />
                    <YAxis tick={{ fontSize: 11, fill: '#475569' }} />
                    <Tooltip
                      formatter={(val: any) => [`${val} homes (${(Number(val) / 14.6).toFixed(1)}%)`, 'Volume']}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
                    />
                    <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <p className="text-xs text-slate-500 mt-2 italic text-center">
                Figure 4.3: Pronounced right tail; 61.9% of transactions cluster tightly between $100k and $200k AUD.
              </p>
            </div>
          )}

          {/* TAB 4: Correlation Matrix */}
          {activeChartTab === 'correlations' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200 text-slate-700 font-semibold">
                    <th className="py-2.5 px-3">Predictor Feature</th>
                    <th className="py-2.5 px-3">Pearson Correlation (r)</th>
                    <th className="py-2.5 px-3">p-value</th>
                    <th className="py-2.5 px-4">Domain Interpretation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {TOP_CORRELATIONS.map((c) => (
                    <tr key={c.feature} className="hover:bg-slate-50 transition">
                      <td className="py-2.5 px-3 font-mono font-medium text-slate-900">{c.feature}</td>
                      <td className="py-2.5 px-3 font-mono font-bold text-emerald-700">
                        <div className="flex items-center space-x-2">
                          <span>+{c.correlation.toFixed(3)}</span>
                          <div className="w-20 bg-slate-200 h-1.5 rounded-full overflow-hidden">
                            <div
                              className="bg-emerald-600 h-full rounded-full"
                              style={{ width: `${c.correlation * 100}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-2.5 px-3 font-mono text-slate-500">{c.p_value}</td>
                      <td className="py-2.5 px-4 text-slate-600">{c.domainSignificance}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
