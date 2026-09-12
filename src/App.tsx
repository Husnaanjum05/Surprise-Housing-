import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Navigation, SECTIONS } from './components/Navigation';
import { SectionIntro } from './components/SectionIntro';
import { SectionProblem } from './components/SectionProblem';
import { SectionDataPrep } from './components/SectionDataPrep';
import { SectionEDA } from './components/SectionEDA';
import { SectionFeatureEng } from './components/SectionFeatureEng';
import { SectionModels } from './components/SectionModels';
import { SectionTuning } from './components/SectionTuning';
import { SectionEvaluation } from './components/SectionEvaluation';
import { SectionFeatureImportance } from './components/SectionFeatureImportance';
import { SectionBusinessStrategy } from './components/SectionBusinessStrategy';
import { SectionConclusion } from './components/SectionConclusion';
import { InteractiveValuationTool } from './components/InteractiveValuationTool';
import { REPORT_META } from './data/reportData';
import { ArrowUp, BookOpen, Download, Building2, ExternalLink } from 'lucide-react';

export default function App() {
  const [viewMode, setViewMode] = useState<'executive' | 'technical'>('executive');
  const [activeSection, setActiveSection] = useState<string>('intro');
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Monitor scroll for active section highlighting and back-to-top button
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      const sectionElements = SECTIONS.map((sec) => ({
        id: sec.id,
        el: document.getElementById(sec.id),
      }));

      const scrollPosition = window.scrollY + 160;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const item = sectionElements[i];
        if (item.el && item.el.offsetTop <= scrollPosition) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleJumpToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans antialiased selection:bg-emerald-200 selection:text-emerald-900">
      {/* Top Header */}
      <Header
        viewMode={viewMode}
        setViewMode={setViewMode}
        activeSection={activeSection}
        onJumpToSection={handleJumpToSection}
      />

      {/* Sticky Table of Contents Navigation */}
      <Navigation
        activeSection={activeSection}
        onSelectSection={handleJumpToSection}
      />

      {/* Hero Report Header Banner */}
      <div className="bg-white border-b border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200 mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Official Data Science Project Submission & Investment Report</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight mb-3">
              {REPORT_META.title}
            </h1>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              {REPORT_META.subtitle}
            </p>

            <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-slate-500 pt-3 border-t border-slate-100">
              <div>
                Client: <strong className="text-slate-800">{REPORT_META.client}</strong>
              </div>
              <span>•</span>
              <div>
                Target Geography: <strong className="text-slate-800">{REPORT_META.targetMarket}</strong>
              </div>
              <span>•</span>
              <div>
                Author: <strong className="text-slate-800">{REPORT_META.author}</strong>
              </div>
              <span>•</span>
              <div>
                Published: <strong className="text-slate-800">{REPORT_META.date}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Report Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-4">
        {/* Section 1: Introduction */}
        <SectionIntro viewMode={viewMode} />

        {/* Section 2: Problem Statement */}
        <SectionProblem viewMode={viewMode} />

        {/* Section 3: Data Collection & Preprocessing */}
        <SectionDataPrep viewMode={viewMode} />

        {/* Section 4: Exploratory Data Analysis (EDA) */}
        <SectionEDA viewMode={viewMode} />

        {/* Section 5: Feature Engineering */}
        <SectionFeatureEng viewMode={viewMode} />

        {/* Section 6: Model Selection & Training */}
        <SectionModels viewMode={viewMode} />

        {/* Section 7: Hyperparameter Tuning */}
        <SectionTuning viewMode={viewMode} />

        {/* Section 8: Model Evaluation */}
        <SectionEvaluation viewMode={viewMode} />

        {/* Section 9: Feature Importance Analysis */}
        <SectionFeatureImportance viewMode={viewMode} />

        {/* Section 10: Business Implications */}
        <SectionBusinessStrategy viewMode={viewMode} />

        {/* Section 11: Conclusion & Future Steps */}
        <SectionConclusion viewMode={viewMode} />

        {/* Section 12: Interactive Property Valuation Tool */}
        <InteractiveValuationTool />
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-16 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-8 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2 text-white font-bold text-base mb-1">
                <Building2 className="w-5 h-5 text-emerald-400" />
                <span>Surprise Housing Analytics</span>
              </div>
              <p className="text-slate-400 max-w-lg">
                Applied Machine Learning & Advanced Hedonic Real Estate Valuation Report. Prepared for Surprise Housing's executive investment committee.
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center space-x-2"
              >
                <Download className="w-4 h-4" />
                <span>Save Full Report as PDF</span>
              </button>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-500 text-[11px]">
            <div>
              © 2026 Surprise Housing Research Division. All rights reserved. Mathematical formulation based on regularized linear models (Lasso & Ridge).
            </div>
            <div className="flex space-x-4 font-mono">
              <span>Dataset: Ames Housing / Australia Proxy</span>
              <span>Entries: 1,460</span>
              <span>Validation R²: 0.893</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          id="back-to-top-btn"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-lg transition-all z-50 flex items-center justify-center cursor-pointer"
          title="Back to Top"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
      )}
    </div>
  );
}
