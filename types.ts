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
  companyId: number;
}

export interface Employee {
  id: number;
  name: string;
  positionId: string;
  managerId: number | null;
  status: EmployeeStatus;
  avatarUrl: string;
  companyId: number;
}

export type ViewType = 'inicio' | 'orgChart' | 'jobAnalysis' | 'companyManual' | 'marketing' | 'cybersecurity' | 'regulatoryCompliance' | 'informes' | 'agentesIA' | 'planManagement' | 'selectionProcesses' | 'payrollManagement';

export interface Notification {
  id: number;
  type: 'success' | 'info' | 'error';
  message: string;
}

export type UserPlan = string;

export interface Plan {
    id: UserPlan;
    name: string;
    description: string;
    price: number;
}

export type Feature = 'aiJobDescription';

export interface Communication {
  id: number;
  companyId: number;
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

export enum ActivityType {
    StatusChange = 'status_change',
    NewCommunication = 'new_communication',
    PlanChange = 'plan_change',
    SelectionRequest = 'selection_request',
    PayrollSent = 'payroll_sent',
    NewEmployee = 'new_employee',
    EmployeeUpdate = 'employee_update',
    NewJobPosition = 'new_job_position',
}


export interface Activity {
  id: number;
  type: ActivityType;
  description: string;
  timestamp: string; // ISO string
  companyId?: number;
}

export type UserRole = 'consultor' | 'empresa' | 'empleado';

export interface Company {
    id: number;
    name: string;
    address: string;
    contact: string;
    planId: UserPlan;
}

export interface User {
    id: number;
    email: string;
    role: UserRole;
    name: string;
    companyId?: number; // Only for 'empresa' and 'empleado' roles
}

export type InteractionType = 'Llamada' | 'Reunión' | 'Email' | 'Otro';

export interface AdvisoryLogEntry {
    id: number;
    companyId: number;
    date: string; // ISO String
    interactionType: InteractionType;
    notes: string;
    consultantName: string;
}

export type DocumentCategory = 'Contratos' | 'Informes' | 'Políticas Internas';

export interface Document {
    id: number;
    companyId: number;
    title: string;
    category: DocumentCategory;
    uploadDate: string; // ISO String
    url: string;
}

export enum CandidateStatus {
  Applied = 'Aplicó',
  Interviewing = 'Entrevistas',
  Offer = 'Oferta',
  Hired = 'Contratado',
  Rejected = 'Rechazado',
}

export interface Candidate {
    id: number;
    name: string;
    email: string;
    status: CandidateStatus;
}

export interface JobOpening {
    id: number;
    companyId: number;
    title: string;
    status: 'Abierto' | 'Cerrado';
    candidates: Candidate[];
}

export interface PayrollDocument {
    id: number;
    companyId: number;
    period: string; // e.g., "Julio 2024"
    fileName: string;
    uploadDate: string; // ISO String
    url: string;
    status: 'Subido' | 'Enviado';
}