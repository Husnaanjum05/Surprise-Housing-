export interface ModelMetric {
  name: string;
  type: string;
  trainR2: number;
  testR2: number;
  trainRMSE: number;
  testRMSE: number;
  trainMSE: number;
  testMSE: number;
  trainMAE: number;
  testMAE: number;
  optimalAlpha?: number | string;
  notes: string;
  isBest?: boolean;
}

export interface FeatureImportance {
  feature: string;
  displayName: string;
  coefficient: number;
  absCoefficient: number;
  impact: 'positive' | 'negative';
  category: 'Space & Layout' | 'Quality & Condition' | 'Location' | 'Age & Renovation' | 'Amenities';
  description: string;
  practicalMeaning: string;
}

export interface NeighborhoodStat {
  neighborhood: string;
  suburbName: string;
  count: number;
  medianPrice: number;
  meanPrice: number;
  pricePerSqFt: number;
  tier: 'Luxury' | 'Upper-Mid' | 'Affordable' | 'Entry';
}

export interface CorrelationItem {
  feature: string;
  correlation: number;
  p_value: string;
  domainSignificance: string;
}

export interface PropertyInput {
  overallQual: number;
  grLivArea: number;
  totalBsmtSF: number;
  neighborhood: string;
  yearBuilt: number;
  yearRemodAdd: number;
  totalBaths: number;
  garageCars: number;
  lotArea: number;
  kitchenQual: number; // 1-5
  fireplaceQu: number; // 0-5
}

export interface ValuationResult {
  predictedPrice: number;
  confidenceLow: number;
  confidenceHigh: number;
  pricePerSqFt: number;
  recommendedMaxOffer: number;
  targetProfitMargin: number;
  renovationBoostEstimate: number;
  afterRepairValue: number;
  keyDrivers: { name: string; impact: string; isPositive: boolean }[];
}

export interface MissingValueStat {
  column: string;
  missingCount: number;
  missingPercentage: number;
  dataType: string;
  strategy: string;
  rationale: string;
}

export interface AlphaTuningPoint {
  alpha: number;
  logAlpha: number;
  ridgeTrainR2: number;
  ridgeTestR2: number;
  lassoTrainR2: number;
  lassoTestR2: number;
  lassoFeaturesKept: number;
}
