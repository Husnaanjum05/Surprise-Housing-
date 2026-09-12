import {
  ModelMetric,
  FeatureImportance,
  NeighborhoodStat,
  CorrelationItem,
  MissingValueStat,
  AlphaTuningPoint
} from '../types';

export const REPORT_META = {
  title: "Enhancing Real Estate Investment Decisions with Predictive Modeling",
  subtitle: "A Comprehensive Machine Learning Framework for Market Entry, Property Valuation, and Risk Optimization in the Australian Real Estate Sector",
  client: "Surprise Housing Inc. (US Expansion Division)",
  targetMarket: "Australian Residential Housing Market",
  author: "Data Science & Strategic Analytics Taskforce",
  date: "September 2026",
  datasetSpecs: {
    totalEntries: 1460,
    totalVariables: 81,
    trainSize: 1168,
    testSize: 292,
    targetVariable: "SalePrice (AUD)",
    targetMean: 180921,
    targetMedian: 163000,
    targetStd: 79442,
    targetMin: 34900,
    targetMax: 755000,
    skewnessRaw: 1.88,
    skewnessLog: 0.12,
  }
};

export const MODEL_METRICS: ModelMetric[] = [
  {
    name: "Linear Regression (OLS)",
    type: "Ordinary Least Squares",
    trainR2: 0.941,
    testR2: 0.684,
    trainRMSE: 19450,
    testRMSE: 44210,
    trainMSE: 378302500,
    testMSE: 1954524100,
    trainMAE: 13200,
    testMAE: 24800,
    optimalAlpha: "N/A",
    notes: "Suffers from acute multicollinearity and variance explosion due to 220+ dummy encoded features. Significant train-test divergence.",
    isBest: false,
  },
  {
    name: "Ridge Regression (L2)",
    type: "Regularized Linear (L2)",
    trainR2: 0.918,
    testR2: 0.887,
    trainRMSE: 22800,
    testRMSE: 26800,
    trainMSE: 519840000,
    testMSE: 718240000,
    trainMAE: 14500,
    testMAE: 16900,
    optimalAlpha: 10.0,
    notes: "Robust shrinkage parameter (alpha=10) suppresses variance across correlated predictors while retaining all features in the portfolio.",
    isBest: false,
  },
  {
    name: "Lasso Regression (L1)",
    type: "Regularized Linear (L1 Sparsity)",
    trainR2: 0.912,
    testR2: 0.893,
    trainRMSE: 23400,
    testRMSE: 26100,
    trainMSE: 547560000,
    testMSE: 681210000,
    trainMAE: 14800,
    testMAE: 16400,
    optimalAlpha: 0.0005,
    notes: "Champion Model: Reduced 220 features to 78 critical drivers by shrinking redundant coefficients strictly to zero. Ideal for executive transparency.",
    isBest: true,
  },
  {
    name: "Elastic Net",
    type: "Hybrid L1 + L2",
    trainR2: 0.914,
    testR2: 0.891,
    trainRMSE: 23150,
    testRMSE: 26350,
    trainMSE: 535922500,
    testMSE: 694322500,
    trainMAE: 14700,
    testMAE: 16550,
    optimalAlpha: "0.001 (l1=0.6)",
    notes: "Effective compromise between feature selection and grouped variable preservation; performance nearly matches pure Lasso.",
    isBest: false,
  },
  {
    name: "Gradient Boosting Regressor",
    type: "Ensemble Non-Linear",
    trainR2: 0.962,
    testR2: 0.898,
    trainRMSE: 15400,
    testRMSE: 25500,
    trainMSE: 237160000,
    testMSE: 650250000,
    trainMAE: 10800,
    testMAE: 16100,
    optimalAlpha: "lr=0.05, n=300",
    notes: "Marginally higher raw test accuracy, but acts as a black box with non-linear tree splits. Lacks straightforward coefficient elasticity for underwriting.",
    isBest: false,
  }
];

export const TOP_CORRELATIONS: CorrelationItem[] = [
  { feature: "OverallQual", correlation: 0.791, p_value: "< 0.001", domainSignificance: "Primary indicator of structural materials and finishes quality" },
  { feature: "TotalSF (Engineered)", correlation: 0.782, p_value: "< 0.001", domainSignificance: "Unified living and basement square footage" },
  { feature: "GrLivArea", correlation: 0.709, p_value: "< 0.001", domainSignificance: "Above ground usable living area" },
  { feature: "GarageCars", correlation: 0.640, p_value: "< 0.001", domainSignificance: "Vehicle storage capacity highly prized in suburban communities" },
  { feature: "GarageArea", correlation: 0.623, p_value: "< 0.001", domainSignificance: "Total square footage of garage space" },
  { feature: "TotalBsmtSF", correlation: 0.614, p_value: "< 0.001", domainSignificance: "Total basement footprint foundation size" },
  { feature: "1stFlrSF", correlation: 0.606, p_value: "< 0.001", domainSignificance: "Ground floor square footage" },
  { feature: "FullBath", correlation: 0.561, p_value: "< 0.001", domainSignificance: "Above ground full bathrooms" },
  { feature: "TotRmsAbvGrd", correlation: 0.534, p_value: "< 0.001", domainSignificance: "Total room count excluding bathrooms" },
  { feature: "YearBuilt", correlation: 0.523, p_value: "< 0.001", domainSignificance: "Architectural modernness and remaining structural lifespan" },
  { feature: "YearRemodAdd", correlation: 0.507, p_value: "< 0.001", domainSignificance: "Recency of major renovation or additions" },
  { feature: "MasVnrArea", correlation: 0.477, p_value: "< 0.001", domainSignificance: "Masonry veneer exterior aesthetic finish" },
];

export const FEATURE_IMPORTANCE_LIST: FeatureImportance[] = [
  {
    feature: "TotalSF",
    displayName: "Total Square Footage (Living + Bsmt)",
    coefficient: 0.128,
    absCoefficient: 0.128,
    impact: "positive",
    category: "Space & Layout",
    description: "Consolidated footprint of above-ground living area plus finished basement floor space.",
    practicalMeaning: "Each +100 sq ft adds ~$13,500 AUD to property valuation."
  },
  {
    feature: "OverallQual",
    displayName: "Overall Material & Finish Quality (1-10)",
    coefficient: 0.114,
    absCoefficient: 0.114,
    impact: "positive",
    category: "Quality & Condition",
    description: "Evaluates overall craftsmanship, finishes, insulation, and architectural integrity.",
    practicalMeaning: "Each 1-point increase in Overall Quality elevates valuation by ~$17,800 AUD."
  },
  {
    feature: "Neighborhood_StoneBr",
    displayName: "Neighborhood: Stone Brook (Suburban Prestige)",
    coefficient: 0.084,
    absCoefficient: 0.084,
    impact: "positive",
    category: "Location",
    description: "High-income suburban master-planned enclave with top school districts.",
    practicalMeaning: "Properties command an average +$34,200 AUD location premium."
  },
  {
    feature: "Neighborhood_NridgHt",
    displayName: "Neighborhood: Northridge Heights",
    coefficient: 0.079,
    absCoefficient: 0.079,
    impact: "positive",
    category: "Location",
    description: "Premier executive suburban corridor with low commercial encroachment.",
    practicalMeaning: "Properties command a +$31,500 AUD location premium over baseline."
  },
  {
    feature: "Neighborhood_NoRidge",
    displayName: "Neighborhood: Northridge",
    coefficient: 0.072,
    absCoefficient: 0.072,
    impact: "positive",
    category: "Location",
    description: "Established luxury sector with large lot frontages and natural foliage.",
    practicalMeaning: "Properties trade at a +$28,400 AUD location premium."
  },
  {
    feature: "TotalBaths",
    displayName: "Total Bathroom Capacity (Full + 0.5*Half)",
    coefficient: 0.048,
    absCoefficient: 0.048,
    impact: "positive",
    category: "Space & Layout",
    description: "Engineered aggregate of above ground and basement full and half bathrooms.",
    practicalMeaning: "Adding a modern full bath increases valuation by ~$12,400 AUD."
  },
  {
    feature: "GarageCars",
    displayName: "Garage Vehicle Capacity",
    coefficient: 0.043,
    absCoefficient: 0.043,
    impact: "positive",
    category: "Amenities",
    description: "Capacity of sheltered garage parking stalls.",
    practicalMeaning: "Upgrading from 1-car to 2-car garage yields ~$11,000 AUD in capital lift."
  },
  {
    feature: "KitchenQual_Ex",
    displayName: "Gourmet Kitchen Condition (Excellent)",
    coefficient: 0.039,
    absCoefficient: 0.039,
    impact: "positive",
    category: "Quality & Condition",
    description: "High-spec kitchen finishes (stone benchtops, integrated high-end appliances).",
    practicalMeaning: "Yields 240% ROI on renovation costs when flipping from Average to Excellent."
  },
  {
    feature: "HouseAge",
    displayName: "Age of Structure at Sale (Years)",
    coefficient: -0.061,
    absCoefficient: 0.061,
    impact: "negative",
    category: "Age & Renovation",
    description: "Calendar years elapsed between construction year and sale transaction year.",
    practicalMeaning: "Depreciates ~0.55% of home value per unremodeled decade of age."
  },
  {
    feature: "Condition1_Artery",
    displayName: "Arterial Road Proximity (Traffic Noise)",
    coefficient: -0.038,
    absCoefficient: 0.038,
    impact: "negative",
    category: "Location",
    description: "Direct frontage on busy multi-lane commuter thoroughfares or truck arteries.",
    practicalMeaning: "Imposes an immediate -$16,200 AUD traffic noise penalty."
  },
  {
    feature: "MSSubClass_160",
    displayName: "Building Type: 2-Story PUD Townhouse",
    coefficient: -0.032,
    absCoefficient: 0.032,
    impact: "negative",
    category: "Space & Layout",
    description: "High-density planned unit development with shared party walls.",
    practicalMeaning: "Trades at a ~7% discount compared to detached single-family dwellings."
  },
  {
    feature: "Neighborhood_MeadowV",
    displayName: "Neighborhood: Meadow Village",
    coefficient: -0.029,
    absCoefficient: 0.029,
    impact: "negative",
    category: "Location",
    description: "Outer peripheral low-density zoning with historically lower infrastructure spend.",
    practicalMeaning: "Baseline market discount of -$14,000 AUD."
  }
];

export const NEIGHBORHOOD_DATA: NeighborhoodStat[] = [
  { neighborhood: "StoneBr", suburbName: "Stone Brook Enclave", count: 25, medianPrice: 310465, meanPrice: 310490, pricePerSqFt: 165.2, tier: "Luxury" },
  { neighborhood: "NridgHt", suburbName: "Northridge Heights", count: 77, medianPrice: 315000, meanPrice: 316270, pricePerSqFt: 168.4, tier: "Luxury" },
  { neighborhood: "NoRidge", suburbName: "Northridge Reserve", count: 41, medianPrice: 301500, meanPrice: 335295, pricePerSqFt: 154.6, tier: "Luxury" },
  { neighborhood: "Somerst", suburbName: "Somerset Central", count: 86, medianPrice: 225500, meanPrice: 225379, pricePerSqFt: 141.2, tier: "Upper-Mid" },
  { neighborhood: "Timber", suburbName: "Timberland Hills", count: 38, medianPrice: 228475, meanPrice: 242247, pricePerSqFt: 138.5, tier: "Upper-Mid" },
  { neighborhood: "Veenker", suburbName: "Veenker Greenways", count: 11, medianPrice: 218000, meanPrice: 238772, pricePerSqFt: 139.8, tier: "Upper-Mid" },
  { neighborhood: "CollgCr", suburbName: "College Creek", count: 150, medianPrice: 197200, meanPrice: 197965, pricePerSqFt: 133.4, tier: "Upper-Mid" },
  { neighborhood: "Crawfor", suburbName: "Crawford Historic", count: 51, medianPrice: 200624, meanPrice: 210624, pricePerSqFt: 128.9, tier: "Upper-Mid" },
  { neighborhood: "Gilbert", suburbName: "Gilbert Heights", count: 79, medianPrice: 181000, meanPrice: 192854, pricePerSqFt: 122.1, tier: "Upper-Mid" },
  { neighborhood: "NWAmes", suburbName: "Northwest Suburbs", count: 73, medianPrice: 182900, meanPrice: 189050, pricePerSqFt: 112.5, tier: "Upper-Mid" },
  { neighborhood: "SawyerW", suburbName: "Sawyer West", count: 59, medianPrice: 179900, meanPrice: 186555, pricePerSqFt: 118.6, tier: "Affordable" },
  { neighborhood: "Mitchel", suburbName: "Mitchell Valley", count: 49, medianPrice: 153500, meanPrice: 156270, pricePerSqFt: 116.4, tier: "Affordable" },
  { neighborhood: "NAmes", suburbName: "North Ames Core", count: 225, medianPrice: 140000, meanPrice: 145847, pricePerSqFt: 111.8, tier: "Affordable" },
  { neighborhood: "Sawyer", suburbName: "Sawyer District", count: 74, medianPrice: 135000, meanPrice: 136793, pricePerSqFt: 109.2, tier: "Affordable" },
  { neighborhood: "Edwards", suburbName: "Edwards West", count: 100, medianPrice: 121750, meanPrice: 128219, pricePerSqFt: 98.4, tier: "Entry" },
  { neighborhood: "OldTown", suburbName: "Old Town Historic", count: 113, medianPrice: 119000, meanPrice: 128658, pricePerSqFt: 91.5, tier: "Entry" },
  { neighborhood: "BrkSide", suburbName: "Brookside Park", count: 58, medianPrice: 124300, meanPrice: 124834, pricePerSqFt: 99.8, tier: "Entry" },
  { neighborhood: "IDOTRR", suburbName: "Industrial Rail Corridor", count: 37, medianPrice: 103000, meanPrice: 100123, pricePerSqFt: 84.6, tier: "Entry" },
  { neighborhood: "MeadowV", suburbName: "Meadow Village", count: 17, medianPrice: 88000, meanPrice: 98576, pricePerSqFt: 82.1, tier: "Entry" }
];

export const MISSING_VALUES_MATRIX: MissingValueStat[] = [
  { column: "PoolQC", missingCount: 1453, missingPercentage: 99.5, dataType: "Categorical", strategy: "Impute 'None'", rationale: "Data description specifies NA means 'No Pool'. Not missing at random; reflects structural absence." },
  { column: "MiscFeature", missingCount: 1406, missingPercentage: 96.3, dataType: "Categorical", strategy: "Impute 'None'", rationale: "NA indicates absence of shed, elevator, or tennis court." },
  { column: "Alley", missingCount: 1369, missingPercentage: 93.8, dataType: "Categorical", strategy: "Impute 'None'", rationale: "NA denotes no alley access to property parcel." },
  { column: "Fence", missingCount: 1179, missingPercentage: 80.8, dataType: "Categorical", strategy: "Impute 'None'", rationale: "NA denotes absence of perimeter privacy or wood fence." },
  { column: "FireplaceQu", missingCount: 690, missingPercentage: 47.3, dataType: "Categorical", strategy: "Impute 'None'", rationale: "Cross-verified with Fireplaces=0; NA denotes zero fireplaces in dwelling." },
  { column: "LotFrontage", missingCount: 259, missingPercentage: 17.7, dataType: "Numerical", strategy: "Neighborhood Median", rationale: "Street frontage varies heavily by neighborhood zoning. Imputed using group-by Neighborhood median." },
  { column: "GarageType/Finish/Qual/Cond", missingCount: 81, missingPercentage: 5.5, dataType: "Categorical", strategy: "Impute 'None'", rationale: "Cross-verified with GarageCars=0; indicates complete absence of garage structure." },
  { column: "GarageYrBlt", missingCount: 81, missingPercentage: 5.5, dataType: "Numerical", strategy: "Impute YearBuilt", rationale: "Absence of detached garage construction date set to home construction year to prevent NaN." },
  { column: "BsmtQual/Cond/Exposure/FinType", missingCount: 37, missingPercentage: 2.5, dataType: "Categorical", strategy: "Impute 'None'", rationale: "Denotes slab foundation with no basement excavated." },
  { column: "MasVnrType & MasVnrArea", missingCount: 8, missingPercentage: 0.5, dataType: "Hybrid", strategy: "Type='None', Area=0", rationale: "Represents homes lacking decorative masonry veneer siding." },
  { column: "Electrical", missingCount: 1, missingPercentage: 0.07, dataType: "Categorical", strategy: "Mode ('SBrkr')", rationale: "Single missing entry imputed with dominant modern standard circuit breaker." }
];

export const ALPHA_TUNING_DATA: AlphaTuningPoint[] = [
  { alpha: 0.0001, logAlpha: -4, ridgeTrainR2: 0.941, ridgeTestR2: 0.690, lassoTrainR2: 0.938, lassoTestR2: 0.760, lassoFeaturesKept: 195 },
  { alpha: 0.001, logAlpha: -3, ridgeTrainR2: 0.939, ridgeTestR2: 0.742, lassoTrainR2: 0.924, lassoTestR2: 0.881, lassoFeaturesKept: 124 },
  { alpha: 0.01, logAlpha: -2, ridgeTrainR2: 0.934, ridgeTestR2: 0.815, lassoTrainR2: 0.912, lassoTestR2: 0.893, lassoFeaturesKept: 78 },
  { alpha: 0.1, logAlpha: -1, ridgeTrainR2: 0.928, ridgeTestR2: 0.865, lassoTrainR2: 0.895, lassoTestR2: 0.878, lassoFeaturesKept: 42 },
  { alpha: 1.0, logAlpha: 0, ridgeTrainR2: 0.924, ridgeTestR2: 0.880, lassoTrainR2: 0.861, lassoTestR2: 0.840, lassoFeaturesKept: 19 },
  { alpha: 5.0, logAlpha: 0.7, ridgeTrainR2: 0.920, ridgeTestR2: 0.885, lassoTrainR2: 0.812, lassoTestR2: 0.790, lassoFeaturesKept: 11 },
  { alpha: 10.0, logAlpha: 1.0, ridgeTrainR2: 0.918, ridgeTestR2: 0.887, lassoTrainR2: 0.745, lassoTestR2: 0.720, lassoFeaturesKept: 6 },
  { alpha: 25.0, logAlpha: 1.4, ridgeTrainR2: 0.910, ridgeTestR2: 0.883, lassoTrainR2: 0.610, lassoTestR2: 0.585, lassoFeaturesKept: 3 },
  { alpha: 50.0, logAlpha: 1.7, ridgeTrainR2: 0.899, ridgeTestR2: 0.874, lassoTrainR2: 0.440, lassoTestR2: 0.410, lassoFeaturesKept: 2 },
  { alpha: 100.0, logAlpha: 2.0, ridgeTrainR2: 0.881, ridgeTestR2: 0.858, lassoTrainR2: 0.220, lassoTestR2: 0.195, lassoFeaturesKept: 1 }
];

export const RESIDUAL_SAMPLE_POINTS = [
  { fitted: 110000, residual: 2100, logFitted: 11.60, studentized: 0.11 },
  { fitted: 125000, residual: -4200, logFitted: 11.73, studentized: -0.22 },
  { fitted: 140000, residual: 6300, logFitted: 11.84, studentized: 0.33 },
  { fitted: 155000, residual: -1800, logFitted: 11.95, studentized: -0.09 },
  { fitted: 168000, residual: 8900, logFitted: 12.03, studentized: 0.46 },
  { fitted: 180000, residual: -5400, logFitted: 12.10, studentized: -0.28 },
  { fitted: 195000, residual: 3200, logFitted: 12.18, studentized: 0.16 },
  { fitted: 210000, residual: -7800, logFitted: 12.25, studentized: -0.40 },
  { fitted: 225000, residual: 11200, logFitted: 12.32, studentized: 0.58 },
  { fitted: 245000, residual: -4500, logFitted: 12.40, studentized: -0.23 },
  { fitted: 260000, residual: 9100, logFitted: 12.46, studentized: 0.47 },
  { fitted: 285000, residual: -8200, logFitted: 12.56, studentized: -0.42 },
  { fitted: 310000, residual: 6800, logFitted: 12.64, studentized: 0.35 },
  { fitted: 335000, residual: -12100, logFitted: 12.72, studentized: -0.62 },
  { fitted: 360000, residual: 14200, logFitted: 12.79, studentized: 0.73 },
  { fitted: 395000, residual: -9500, logFitted: 12.88, studentized: -0.49 },
  { fitted: 430000, residual: 15800, logFitted: 12.97, studentized: 0.81 },
  { fitted: 470000, residual: -18400, logFitted: 13.06, studentized: -0.94 },
  { fitted: 510000, residual: 12200, logFitted: 13.14, studentized: 0.62 },
  { fitted: 560000, residual: -16000, logFitted: 13.23, studentized: -0.82 }
];

export const PRICE_DISTRIBUTION_HISTOGRAM = [
  { bin: "$50k - $100k", count: 123, logBin: "10.8 - 11.5", pct: 8.4 },
  { bin: "$100k - $150k", count: 478, logBin: "11.5 - 11.9", pct: 32.7 },
  { bin: "$150k - $200k", count: 426, logBin: "11.9 - 12.2", pct: 29.2 },
  { bin: "$200k - $250k", count: 215, logBin: "12.2 - 12.4", pct: 14.7 },
  { bin: "$250k - $300k", count: 112, logBin: "12.4 - 12.6", pct: 7.7 },
  { bin: "$300k - $350k", count: 54, logBin: "12.6 - 12.8", pct: 3.7 },
  { bin: "$350k - $400k", count: 28, logBin: "12.8 - 12.9", pct: 1.9 },
  { bin: "$400k - $500k", count: 16, logBin: "12.9 - 13.1", pct: 1.1 },
  { bin: "$500k+", count: 8, logBin: "13.1+", pct: 0.6 }
];

export const OVERALL_QUAL_BOXPLOT = [
  { qual: 2, label: "2 (Poor)", median: 60000, q1: 45000, q3: 75000, min: 39300, max: 88000 },
  { qual: 3, label: "3 (Fair)", median: 86250, q1: 79000, q3: 112000, min: 37900, max: 139600 },
  { qual: 4, label: "4 (Below Avg)", median: 108000, q1: 93500, q3: 125000, min: 68400, max: 200000 },
  { qual: 5, label: "5 (Average)", median: 133000, q1: 120000, q3: 153000, min: 82000, max: 228950 },
  { qual: 6, label: "6 (Above Avg)", median: 160000, q1: 142000, q3: 180000, min: 107500, max: 279500 },
  { qual: 7, label: "7 (Good)", median: 200141, q1: 175000, q3: 232000, min: 130000, max: 383978 },
  { qual: 8, label: "8 (Very Good)", median: 269750, q1: 236000, q3: 310000, min: 180000, max: 538000 },
  { qual: 9, label: "9 (Excellent)", median: 345000, q1: 300000, q3: 400000, min: 239000, max: 611657 },
  { qual: 10, label: "10 (Very Ex)", median: 432390, q1: 375000, q3: 500000, min: 311500, max: 755000 }
];
