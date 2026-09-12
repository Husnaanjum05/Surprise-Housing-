import React from 'react';
import {
  BookOpen,
  Target,
  Database,
  BarChart3,
  Cpu,
  Layers,
  Sliders,
  CheckSquare,
  Award,
  Briefcase,
  Flag,
  Calculator
} from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onSelectSection: (sectionId: string) => void;
}

export const SECTIONS = [
  { id: 'intro', label: '1. Introduction & Context', icon: BookOpen },
  { id: 'problem', label: '2. Problem Statement', icon: Target },
  { id: 'data-prep', label: '3. Data Cleaning & Prep', icon: Database },
  { id: 'eda', label: '4. Exploratory Data Analysis', icon: BarChart3 },
  { id: 'features', label: '5. Feature Engineering', icon: Cpu },
  { id: 'models', label: '6. Model Selection & Train', icon: Layers },
  { id: 'tuning', label: '7. Hyperparameter Tuning', icon: Sliders },
  { id: 'evaluation', label: '8. Model Evaluation', icon: CheckSquare },
  { id: 'importance', label: '9. Feature Importance', icon: Award },
  { id: 'strategy', label: '10. Business Implications', icon: Briefcase },
  { id: 'conclusion', label: '11. Conclusion & Roadmap', icon: Flag },
  { id: 'calculator', label: '⚡ Property Valuation Tool', icon: Calculator, isSpecial: true },
];

export const Navigation: React.FC<NavigationProps> = ({
  activeSection,
  onSelectSection,
}) => {
  return (
    <nav className="bg-white border-b border-slate-200 sticky top-[93px] z-30 shadow-xs overflow-x-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-1 py-2 min-w-max">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon;
            const isActive = activeSection === sec.id;
            return (
              <button
                key={sec.id}
                id={`nav-item-${sec.id}`}
                onClick={() => onSelectSection(sec.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
                  sec.isSpecial
                    ? isActive
                      ? 'bg-amber-600 text-white shadow-xs'
                      : 'bg-amber-50 text-amber-900 hover:bg-amber-100 border border-amber-200'
                    : isActive
                    ? 'bg-emerald-700 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : sec.isSpecial ? 'text-amber-700' : 'text-slate-500'}`} />
                <span>{sec.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
