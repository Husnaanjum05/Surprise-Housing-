import React, { useState } from 'react';
import { Database, Filter, AlertCircle, CheckCircle2, ArrowRight, Table, Sparkles } from 'lucide-react';
import { MISSING_VALUES_MATRIX, REPORT_META } from '../data/reportData';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionDataPrep: React.FC<Props> = ({ viewMode }) => {
  const [filterType, setFilterType] = useState<'all' | 'structural' | 'numerical'>('all');

  const filteredMissing = MISSING_VALUES_MATRIX.filter(item => {
    if (filterType === 'structural') return item.dataType === 'Categorical' && item.strategy.includes('None');
    if (filterType === 'numerical') return item.dataType.includes('Numerical') || item.dataType.includes('Hybrid');
    return true;
  });

  return (
    <section id="data-prep" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Database className="w-4 h-4" />
        <span>Chapter 03 // Data Engineering</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Data Collection, Cleaning & Preprocessing Pipeline
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        The research dataset comprises <strong>{REPORT_META.datasetSpecs.totalEntries} entries</strong> spanning{' '}
        <strong>{REPORT_META.datasetSpecs.totalVariables} distinct variables</strong> (38 numerical, 43 categorical).
        A rigorous data preparation methodology was established to convert messy raw survey records into an analytically
        sound, high-dimensional feature space suitable for regularized regression.
      </p>

      {/* 4-Step Preprocessing Flowchart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs relative">
          <div className="text-xs font-mono font-bold text-emerald-700 uppercase mb-1">Phase 1</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Missing Value Topology</h4>
          <p className="text-xs text-slate-600">
            Differentiated true missingness (MCAR) from domain structural absence (e.g. <code>PoolQC = NA</code> indicates "No Pool", not missing data).
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs relative">
          <div className="text-xs font-mono font-bold text-blue-700 uppercase mb-1">Phase 2</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Outlier Remediation</h4>
          <p className="text-xs text-slate-600">
            Identified two massive properties (&gt;4,000 sq ft) with partial sales under $200k. Removed as severe high-leverage outliers per Dean De Cock guidelines.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs relative">
          <div className="text-xs font-mono font-bold text-purple-700 uppercase mb-1">Phase 3</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Ordinal & One-Hot Encoding</h4>
          <p className="text-xs text-slate-600">
            Ordered quality grades mapped to integer scales (0-5). 28 nominal attributes converted into 180+ binary dummies with <code>drop_first=True</code>.
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs relative">
          <div className="text-xs font-mono font-bold text-amber-700 uppercase mb-1">Phase 4</div>
          <h4 className="font-bold text-slate-900 text-sm mb-1.5">Variance Stabilization</h4>
          <p className="text-xs text-slate-600">
            Applied <code>log1p</code> transformation to <code>SalePrice</code> (reducing skewness from 1.88 to 0.12) and highly skewed continuous predictors (&gt;0.75).
          </p>
        </div>
      </div>

      {/* Interactive Missing Values Matrix Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs mb-6">
        <div className="p-4 bg-slate-50 border-b border-slate-200 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Missing Values Audit & Imputation Strategy Matrix
            </h3>
            <p className="text-xs text-slate-500">
              Auditing 11 key variables requiring explicit domain-informed imputation routines.
            </p>
          </div>

          <div className="flex items-center space-x-1.5 bg-white p-1 rounded-lg border border-slate-200 text-xs">
            <button
              onClick={() => setFilterType('all')}
              className={`px-2.5 py-1 rounded font-medium ${filterType === 'all' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All (11)
            </button>
            <button
              onClick={() => setFilterType('structural')}
              className={`px-2.5 py-1 rounded font-medium ${filterType === 'structural' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Structural NAs
            </button>
            <button
              onClick={() => setFilterType('numerical')}
              className={`px-2.5 py-1 rounded font-medium ${filterType === 'numerical' ? 'bg-slate-900 text-white' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Numerical / Spatial
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-100/70 border-b border-slate-200 text-slate-700 font-semibold">
                <th className="py-2.5 px-4">Feature Name</th>
                <th className="py-2.5 px-3">Type</th>
                <th className="py-2.5 px-3">Missing (Count / %)</th>
                <th className="py-2.5 px-4">Imputation Protocol</th>
                <th className="py-2.5 px-4">Domain Justification & Impact</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredMissing.map((row) => (
                <tr key={row.column} className="hover:bg-slate-50/80 transition">
                  <td className="py-2.5 px-4 font-mono font-medium text-slate-900">{row.column}</td>
                  <td className="py-2.5 px-3">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-medium ${
                      row.dataType.includes('Numerical') ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'bg-purple-50 text-purple-700 border border-purple-200'
                    }`}>
                      {row.dataType}
                    </span>
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">
                    {row.missingCount} <span className="text-slate-400">({row.missingPercentage}%)</span>
                  </td>
                  <td className="py-2.5 px-4 font-medium text-emerald-800 bg-emerald-50/50">
                    {row.strategy}
                  </td>
                  <td className="py-2.5 px-4 text-slate-600 max-w-xs">{row.rationale}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {viewMode === 'technical' && (
        <div className="bg-slate-900 text-slate-200 p-5 rounded-xl border border-slate-800 text-xs font-mono">
          <div className="flex items-center space-x-2 text-emerald-400 font-semibold mb-2">
            <Sparkles className="w-4 h-4" />
            <span>Mathematical Justification for Logarithmic Transformation</span>
          </div>
          <p className="leading-relaxed mb-3 text-slate-300">
            The raw target distribution y = SalePrice exhibits significant positive skewness (S = 1.88) and kurtosis (K = 6.54). In OLS and linear regularization, error normality is assumed: &epsilon; ~ N(0, &sigma;&sup2;I).
            When y is right-skewed, linear models make disproportionately large dollar errors on luxury estates, violating homoscedasticity.
          </p>
          <div className="bg-slate-950 p-3 rounded border border-slate-800 text-amber-300">
            <div>y* = ln(1 + SalePrice) &rArr; Skewness drops to 0.12 (symmetric Gaussian bell)</div>
            <div>Predictions transformed back via: SalePrice_hat = exp(y*) - 1</div>
          </div>
        </div>
      )}
    </section>
  );
};
