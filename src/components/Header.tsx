import React from 'react';
import { Building2, FileText, Printer, CheckCircle2, TrendingUp, Sparkles, ShieldCheck } from 'lucide-react';
import { REPORT_META } from '../data/reportData';

interface HeaderProps {
  viewMode: 'executive' | 'technical';
  setViewMode: (mode: 'executive' | 'technical') => void;
  activeSection: string;
  onJumpToSection: (id: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  viewMode,
  setViewMode,
  activeSection,
  onJumpToSection
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-40 shadow-md">
      {/* Top Banner / Brand */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800/60">
                SURPRISE HOUSING • AUS EXPANSION
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">• Machine Learning Research Report</span>
            </div>
            <h1 className="text-base sm:text-lg font-bold text-slate-100 tracking-tight line-clamp-1">
              {REPORT_META.title}
            </h1>
          </div>
        </div>

        {/* View mode toggle and Print */}
        <div className="flex items-center space-x-2.5 sm:space-x-4">
          <div className="bg-slate-800/90 p-1 rounded-lg border border-slate-700 flex items-center text-xs">
            <button
              id="view-mode-exec"
              onClick={() => setViewMode('executive')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                viewMode === 'executive'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Executive Summary
            </button>
            <button
              id="view-mode-tech"
              onClick={() => setViewMode('technical')}
              className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                viewMode === 'technical'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Technical Deep Dive
            </button>
          </div>

          <button
            id="print-report-btn"
            onClick={handlePrint}
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium border border-slate-700 transition"
            title="Export or Print this Research Report"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden sm:inline">Export / Print</span>
          </button>
        </div>
      </div>

      {/* Highlights Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800/80 px-4 sm:px-6 lg:px-8 py-2 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-y-1 gap-x-4 text-slate-400">
          <div className="flex items-center space-x-4 overflow-x-auto py-0.5">
            <span className="flex items-center text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 mr-1.5 inline-block"></span>
              Dataset: <strong className="text-white ml-1">1,460 Entries × 81 Vars</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center text-slate-300">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400 mr-1" />
              Champion Model: <strong className="text-white ml-1">Lasso Regressor (L1)</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center text-slate-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400 mr-1" />
              Validation R²: <strong className="text-emerald-400 ml-1">0.893 (RMSE $26.1k)</strong>
            </span>
            <span className="text-slate-600">|</span>
            <span className="flex items-center text-slate-300">
              <Sparkles className="w-3.5 h-3.5 text-purple-400 mr-1" />
              Features Filtered: <strong className="text-white ml-1">220 → 78 Key Drivers</strong>
            </span>
          </div>

          <div className="text-slate-400 text-xs hidden lg:block">
            Target: <span className="text-slate-200 font-medium">Australian Housing Expansion</span>
          </div>
        </div>
      </div>
    </header>
  );
};
