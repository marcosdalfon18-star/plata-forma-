import { type UserPlan, type ViewType, type Feature, type User } from './types';

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
    ],
    features: [],
  },
  plan_profesional: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
      'informes',
      'regulatoryCompliance', // Communications added
      'selectionProcesses',
      'payrollManagement',
    ],
    features: [],
  },
  plan_premium: {
    views: [
      'inicio',
      'orgChart',
      'jobAnalysis',
      'companyManual',
      'informes',
      'regulatoryCompliance', // Communications added
      'selectionProcesses',
      'payrollManagement',
      'marketing',
      'cybersecurity',
      'agentesIA',
    ],
    features: ['aiJobDescription'],
  },
};

const roleAllowedViews: Record<User['role'], ViewType[]> = {
    consultor: [ // Consultant can access everything, plan is the limiter
        'inicio', 'orgChart', 'jobAnalysis', 'companyManual', 'marketing', 'cybersecurity',
        'regulatoryCompliance', 'informes', 'agentesIA', 'planManagement', 'selectionProcesses',
        'payrollManagement'
    ],
    empresa: [
        'inicio', 'orgChart', 'jobAnalysis', 'companyManual', 'selectionProcesses', 'informes',
        'marketing', 'cybersecurity', 'agentesIA', 'regulatoryCompliance', 'payrollManagement'
    ],
    empleado: ['inicio', 'jobAnalysis', 'companyManual']
};


export const hasAccessToView = (role: User['role'], plan: UserPlan, view: ViewType): boolean => {
    // 1. Check if the role is fundamentally allowed to access the view
    if (!roleAllowedViews[role]?.includes(view)) {
        return false;
    }

    // 2. For consultant and empresa, check against their plan
    if (role === 'consultor' || role === 'empresa') {
        if (role === 'consultor' && view === 'planManagement') return true; // Special rule for consultant
        // The plan might not exist in featureConfig if it's dynamically created, so we check for its existence.
        return featureConfig[plan]?.views.includes(view) ?? false;
    }

    // 3. For other roles (empleado), if the first check passed, they have access.
    return true;
};


export const hasAccessToFeature = (plan: UserPlan, feature: Feature): boolean => {
  return featureConfig[plan]?.features.includes(feature) ?? false;
};
