export enum EmployeeStatus {
  Active = 'Situación Normal',
  Vacation = 'Vacaciones',
  Inactive = 'Baja',
}

export interface JobPosition {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
}

export interface Employee {
  id: number;
  name: string;
  positionId: string;
  managerId: number | null;
  status: EmployeeStatus;
  avatarUrl: string;
}

export type ViewType = 'inicio' | 'orgChart' | 'jobAnalysis' | 'companyManual' | 'marketing' | 'cybersecurity' | 'regulatoryCompliance' | 'informes' | 'agentesIA';

export interface Notification {
  id: number;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type UserPlan = 'plan_basico' | 'plan_profesional' | 'plan_premium';

export type Feature = 'aiJobDescription';

export interface Communication {
  id: number;
  title: string;
  content: string;
  date: string; // ISO string format
  author: string;
  recipient: string;
}

export type ReportCategory = 'Recursos Humanos' | 'Marketing Estratégico';

export interface Report {
  id: number;
  title: string;
  category: ReportCategory;
  date: string; // ISO string
  summary: string;
  downloadUrl: string;
}