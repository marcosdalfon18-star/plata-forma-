import { type UserPlan, type ViewType, type Feature } from './types';

type PlanFeatures = {
  views: ViewType[];
  features: Feature[];
};

const featureConfig: Record<UserPlan, PlanFeatures> = {
  plan_basico: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
      'marketing',
      'regulatoryCompliance',
    ],
    features: [],
  },
  plan_profesional: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
      'marketing',
      'regulatoryCompliance',
      'informes',
    ],
    features: [],
  },
  plan_premium: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
      'marketing',
      'regulatoryCompliance',
      'informes',
      'cybersecurity',
      'agentesIA',
    ],
    features: ['aiJobDescription'],
  },
};

export const hasAccessToView = (plan: UserPlan, view: ViewType): boolean => {
  return featureConfig[plan]?.views.includes(view) ?? false;
};

export const hasAccessToFeature = (plan: UserPlan, feature: Feature): boolean => {
  return featureConfig[plan]?.features.includes(feature) ?? false;
};