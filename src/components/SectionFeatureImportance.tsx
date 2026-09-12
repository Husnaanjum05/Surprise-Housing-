import React, { useState } from 'react';
import { Award, ArrowUp, ArrowDown, DollarSign, Filter, Info, TrendingUp, Sparkles } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { FEATURE_IMPORTANCE_LIST } from '../data/reportData';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionFeatureImportance: React.FC<Props> = ({ viewMode }) => {
  const [filterDirection, setFilterDirection] = useState<'all' | 'positive' | 'negative'>('all');

  const filteredFeatures = FEATURE_IMPORTANCE_LIST.filter(f => {
    if (filterDirection === 'positive') return f.impact === 'positive';
    if (filterDirection === 'negative') return f.impact === 'negative';
    return true;
  });

  const chartData = [...FEATURE_IMPORTANCE_LIST]
    .sort((a, b) => b.coefficient - a.coefficient)
    .map(f => ({
      name: f.displayName.length > 28 ? f.displayName.substring(0, 25) + '...' : f.displayName,
      fullName: f.displayName,
      coef: Math.round(f.coefficient * 1000) / 1000,
      impact: f.impact,
      meaning: f.practicalMeaning
    }));

  return (
    <section id="importance" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Award className="w-4 h-4" />
        <span>Chapter 09 // Valuation Drivers</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Feature Importance & Empirical Coefficient Elasticities
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        By examining the non-zero standardized coefficients ($\beta_j$) of the Champion Lasso model,
        we can definitively answer Surprise Housing's underwriting questions: which physical and spatial
        attributes genuinely command a premium, which penalize valuation, and by how much in Australian currency.
      </p>

      {/* Top Positive vs Top Negative Highlight Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
        <div className="bg-emerald-50/70 border border-emerald-200 p-5 rounded-xl shadow-xs">
          <div className="flex items-center space-x-2 text-emerald-800 font-bold text-sm mb-3">
            <ArrowUp className="w-4 h-4 text-emerald-600" />
            <span>Top Value-Creating Features (Positive Elasticity)</span>
          </div>
          <ul className="text-xs text-slate-700 space-y-2.5">
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-emerald-100">
              <div>
                <strong className="text-slate-900 block font-medium">Total Usable Square Footage (TotalSF)</strong>
                <span className="text-slate-500 text-[11px]">Above-ground living + basement area</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-sm">+$13.5k / 100 sqft</span>
            </li>
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-emerald-100">
              <div>
                <strong className="text-slate-900 block font-medium">Overall Material Quality (OverallQual)</strong>
                <span className="text-slate-500 text-[11px]">Grade 1 to 10 craftsmanship rating</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-sm">+$17.8k / grade</span>
            </li>
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-emerald-100">
              <div>
                <strong className="text-slate-900 block font-medium">Prestige Enclaves (Stone Brook / Northridge)</strong>
                <span className="text-slate-500 text-[11px]">Master-planned executive suburbs</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-sm">+$31k - $34k premium</span>
            </li>
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-emerald-100">
              <div>
                <strong className="text-slate-900 block font-medium">Bathroom Capacity (TotalBaths)</strong>
                <span className="text-slate-500 text-[11px]">Full + half bathroom count</span>
              </div>
              <span className="font-mono font-bold text-emerald-700 text-sm">+$12.4k / full bath</span>
            </li>
          </ul>
        </div>

        <div className="bg-rose-50/70 border border-rose-200 p-5 rounded-xl shadow-xs">
          <div className="flex items-center space-x-2 text-rose-800 font-bold text-sm mb-3">
            <ArrowDown className="w-4 h-4 text-rose-600" />
            <span>Top Value-Depreciating Features (Negative Elasticity)</span>
          </div>
          <ul className="text-xs text-slate-700 space-y-2.5">
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-rose-100">
              <div>
                <strong className="text-slate-900 block font-medium">Structural Age (HouseAge)</strong>
                <span className="text-slate-500 text-[11px]">Years elapsed without renovation</span>
              </div>
              <span className="font-mono font-bold text-rose-700 text-sm">-$6,200 / decade</span>
            </li>
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-rose-100">
              <div>
                <strong className="text-slate-900 block font-medium">Arterial Road Proximity (Condition1_Artery)</strong>
                <span className="text-slate-500 text-[11px]">Traffic noise & exhaust pollution</span>
              </div>
              <span className="font-mono font-bold text-rose-700 text-sm">-$16,200 penalty</span>
            </li>
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-rose-100">
              <div>
                <strong className="text-slate-900 block font-medium">Building Type: 2-Story PUD (MSSubClass 160)</strong>
                <span className="text-slate-500 text-[11px]">Shared common walls / zero lot line</span>
              </div>
              <span className="font-mono font-bold text-rose-700 text-sm">~7% base discount</span>
            </li>
            <li className="flex items-start justify-between bg-white p-2.5 rounded border border-rose-100">
              <div>
                <strong className="text-slate-900 block font-medium">Distressed Suburbs (Meadow Village / IDOTRR)</strong>
                <span className="text-slate-500 text-[11px]">Industrial proximity & lower amenities</span>
              </div>
              <span className="font-mono font-bold text-rose-700 text-sm">-$14k - $18k discount</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Coefficient Bar Chart */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-5 mb-6">
        <h3 className="text-sm font-bold text-slate-900 mb-1">
          Lasso Standardized Coefficient Landscape
        </h3>
        <p className="text-xs text-slate-500 mb-4">
          Magnitude and direction of standardized regression coefficients ($\beta_j$). Green bars indicate positive capital appreciation; red bars indicate value penalties.
        </p>

        <div className="h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              layout="vertical"
              margin={{ top: 10, right: 30, left: 140, bottom: 10 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" horizontal={false} />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: '#475569' }}
                domain={[-0.08, 0.15]}
              />
              <YAxis
                dataKey="name"
                type="category"
                tick={{ fontSize: 10, fill: '#334155' }}
                width={135}
              />
              <Tooltip
                formatter={(val: any, name: any, item: any) => [
                  `β = ${val} (${item.payload.meaning})`,
                  'Lasso Coefficient'
                ]}
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff', fontSize: '12px' }}
              />
              <Bar dataKey="coef" radius={[0, 4, 4, 0]}>
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.coef >= 0 ? '#059669' : '#e11d48'}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Full Feature Elasticity Detail Table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
          <h3 className="text-sm font-bold text-slate-900">
            Surprise Housing Underwriting Elasticity Dictionary
          </h3>
          <div className="flex items-center space-x-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setFilterDirection('all')}
              className={`px-2.5 py-1 rounded font-medium ${filterDirection === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600'}`}
            >
              All (12)
            </button>
            <button
              onClick={() => setFilterDirection('positive')}
              className={`px-2.5 py-1 rounded font-medium ${filterDirection === 'positive' ? 'bg-emerald-700 text-white' : 'text-slate-600'}`}
            >
              Positive Drivers
            </button>
            <button
              onClick={() => setFilterDirection('negative')}
              className={`px-2.5 py-1 rounded font-medium ${filterDirection === 'negative' ? 'bg-rose-700 text-white' : 'text-slate-600'}`}
            >
              Negative Penalties
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-4">Feature Variable</th>
                <th className="py-2.5 px-3">Domain Category</th>
                <th className="py-2.5 px-3">Lasso Coef (β)</th>
                <th className="py-2.5 px-4">Real Estate Underwriting Interpretation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredFeatures.map((f) => (
                <tr key={f.feature} className="hover:bg-slate-50 transition">
                  <td className="py-2.5 px-4">
                    <span className="font-semibold text-slate-900 block">{f.displayName}</span>
                    <span className="text-[11px] font-mono text-slate-500">{f.feature}</span>
                  </td>
                  <td className="py-2.5 px-3">
                    <span className="px-2 py-0.5 rounded text-[11px] bg-slate-100 text-slate-700 font-medium">
                      {f.category}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono font-bold">
                    <span className={f.impact === 'positive' ? 'text-emerald-700' : 'text-rose-700'}>
                      {f.coefficient > 0 ? '+' : ''}{f.coefficient.toFixed(3)}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-slate-700">
                    <strong className="text-slate-900 block mb-0.5">{f.practicalMeaning}</strong>
                    <span className="text-slate-500 text-[11px]">{f.description}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
