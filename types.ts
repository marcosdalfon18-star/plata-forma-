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

export type ViewType = 'inicio' | 'orgChart' | 'jobAnalysis' | 'companyManual' | 'marketing' | 'cybersecurity';

export interface Notification {
  id: number;
  type: 'success' | 'info' | 'error';
  message: string;
}