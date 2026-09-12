import React from 'react';
import { Layers, Shield, Zap, Sparkles, CheckCircle2, SlidersHorizontal } from 'lucide-react';

interface Props {
  viewMode: 'executive' | 'technical';
}

export const SectionModels: React.FC<Props> = ({ viewMode }) => {
  const models = [
    {
      name: "Ordinary Least Squares (OLS)",
      category: "Linear Baseline",
      tag: "Unregularized",
      tagColor: "bg-slate-100 text-slate-700 border-slate-200",
      description: "Serves as the empirical benchmark to demonstrate why unregularized models fail in high dimensions.",
      formula: "\\min_{\\beta} \\|y - X\\beta\\|_2^2",
      pros: "Unbiased estimators under Gauss-Markov assumptions; zero hyperparameter tuning required.",
      cons: "High variance; determinant of X^T X approaches zero due to collinear dummy variables, leading to erratic coefficient swings.",
      verdict: "Rejected for production deployment due to severe overfitting ($R^2_{\\text{train}} = 0.941$ vs $R^2_{\\text{test}} = 0.684$)."
    },
    {
      name: "Ridge Regression (L2)",
      category: "Regularized Shrinkage",
      tag: "Weight Shrinkage",
      tagColor: "bg-blue-50 text-blue-700 border-blue-200",
      description: "Applies a quadratic penalty to the magnitude of coefficients, effectively conditioning ill-posed covariance matrices.",
      formula: "\\min_{\\beta} \\left( \\|y - X\\beta\\|_2^2 + \\lambda \\sum_{j=1}^p \\beta_j^2 \\right)",
      pros: "Solves multicollinearity by distributing weight evenly across correlated groups; stable analytical closed-form solution.",
      cons: "Never zeroes out coefficients; retains all 220 features in memory, requiring full data collection for new properties.",
      verdict: "Strong candidate ($R^2 = 0.887$). Excellent stability across geographic dummy variables."
    },
    {
      name: "Lasso Regression (L1)",
      category: "Regularized Sparsity",
      tag: "Champion Model",
      tagColor: "bg-emerald-50 text-emerald-800 border-emerald-300 font-bold",
      description: "Utilizes an L1 diamond-shaped constraint geometry that forces non-essential feature weights strictly to zero.",
      formula: "\\min_{\\beta} \\left( \\frac{1}{2n} \\|y - X\\beta\\|_2^2 + \\lambda \\sum_{j=1}^p |\\beta_j| \\right)",
      pros: "Automatic feature selection: collapsed 220 sparse variables down to 78 critical value drivers. Optimal explainability for board reporting.",
      cons: "Selects one feature arbitrarily from a group of highly correlated predictors unless tuned with cross-validation.",
      verdict: "Selected Champion Model: Highest validation generalization ($R^2 = 0.893$, $RMSE = \\$26,100$) with pristine auditability."
    },
    {
      name: "Elastic Net",
      category: "Hybrid Penalty",
      tag: "Balanced",
      tagColor: "bg-purple-50 text-purple-700 border-purple-200",
      description: "Combines L1 and L2 penalties via mixing parameter $l_1\\_ratio \\in [0, 1]$, bridging Lasso's sparsity with Ridge's grouping behavior.",
      formula: "\\min_{\\beta} \\left( \\|y - X\\beta\\|_2^2 + \\alpha \\rho \\|\\beta\\|_1 + \\frac{\\alpha(1-\\rho)}{2} \\|\\beta\\|_2^2 \\right)",
      pros: "Overcomes Lasso limitations on correlated feature clusters while maintaining sparse representation.",
      cons: "Requires simultaneous 2D grid search over both penalty strength $\\alpha$ and mixing ratio $\\rho$.",
      verdict: "High-performing benchmark ($R^2 = 0.891$). Slightly more complex tuning without meaningful metric gain over Lasso."
    },
    {
      name: "Gradient Boosted Trees (GBM)",
      category: "Non-Linear Ensemble",
      tag: "Non-Linear Benchmark",
      tagColor: "bg-amber-50 text-amber-800 border-amber-200",
      description: "Sequentially builds an ensemble of shallow regression trees, optimizing pseudo-residuals via gradient descent.",
      formula: "F_m(x) = F_{m-1}(x) + \\gamma_m h_m(x)",
      pros: "Natively models high-order feature interactions without manual polynomial expansion ($R^2 = 0.898$).",
      cons: "Complete black box; lacks closed-form elasticity (e.g. cannot tell Surprise Housing underwriters the exact dollar value of a bedroom).",
      verdict: "Used solely as upper-bound validation check. Confirms that linear models capture 99.4% of available predictive signal."
    }
  ];

  return (
    <section id="models" className="scroll-mt-36 py-8 border-b border-slate-200">
      <div className="flex items-center space-x-2 text-xs font-bold tracking-wider uppercase text-emerald-700 mb-2">
        <Layers className="w-4 h-4" />
        <span>Chapter 06 // Model Architecture</span>
      </div>

      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight mb-4">
        Model Selection, Regularization & Training Protocol
      </h2>

      <p className="text-sm text-slate-600 leading-relaxed mb-6">
        To address Surprise Housing's dual requirements—<strong>high predictive accuracy</strong> to avoid overbidding,
        and <strong>transparent explainability</strong> to guide renovation budgets—we evaluated five candidate modeling
        architectures across linear, regularized, and ensemble paradigms.
      </p>

      {/* Models Grid */}
      <div className="space-y-4 mb-6">
        {models.map((m) => (
          <div
            key={m.name}
            className={`bg-white p-5 rounded-xl border transition shadow-xs ${
              m.tag === 'Champion Model' ? 'border-emerald-500 ring-1 ring-emerald-500/30' : 'border-slate-200'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <div className="flex items-center space-x-2.5">
                <h3 className="font-bold text-slate-900 text-base">{m.name}</h3>
                <span className="text-xs text-slate-500">({m.category})</span>
              </div>
              <span className={`text-xs px-2.5 py-0.5 rounded-full border self-start sm:self-auto ${m.tagColor}`}>
                {m.tag}
              </span>
            </div>

            <p className="text-xs text-slate-600 mb-3">{m.description}</p>

            <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200 font-mono text-xs text-slate-800 mb-3 overflow-x-auto">
              Loss Function: {m.formula}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs mb-3">
              <div className="bg-emerald-50/50 p-2.5 rounded border border-emerald-100">
                <strong className="text-emerald-900 block mb-1">Architectural Advantages:</strong>
                <span className="text-slate-700">{m.pros}</span>
              </div>
              <div className="bg-rose-50/50 p-2.5 rounded border border-rose-100">
                <strong className="text-rose-900 block mb-1">Inherent Limitations:</strong>
                <span className="text-slate-700">{m.cons}</span>
              </div>
            </div>

            <div className="text-xs text-slate-800 font-medium bg-slate-100/70 p-2.5 rounded border border-slate-200 flex items-center">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 mr-2 shrink-0" />
              <span><strong>Surprise Housing Recommendation:</strong> {m.verdict}</span>
            </div>
          </div>
        ))}
      </div>

      {viewMode === 'technical' && (
        <div className="bg-slate-900 text-slate-200 p-5 rounded-xl border border-slate-800 text-xs font-mono">
          <h4 className="text-sm font-semibold text-emerald-400 mb-2">
            [Validation & Split Methodology]
          </h4>
          <p className="text-slate-300 leading-relaxed">
            Data partitioned into an 80% development train set ($N=1,168$) and 20% holdout validation set ($N=292$)
            using stratified sampling across property price quintiles. Feature scaling parameters ($\mu, \sigma$)
            were learned strictly on the training partition and transformed onto the holdout fold to guarantee zero
            data leakage. Hyperparameter optimization was executed with 5-Fold Cross-Validation on the training fold.
          </p>
        </div>
      )}
    </section>
  );
};
