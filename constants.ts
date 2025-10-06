import { type Employee, type JobPosition, EmployeeStatus, type Communication, type Report, type User, type Company, type Plan, type UserPlan, type AdvisoryLogEntry, type Document, type JobOpening, CandidateStatus, type PayrollDocument } from './types';

export const JOB_POSITIONS: JobPosition[] = [
  { id: 'ceo', title: 'CEO', description: 'Overall strategic direction and leadership.', responsibilities: ['Set company vision', 'Lead executive team', 'Investor relations'], companyId: 1 },
  { id: 'cto', title: 'Chief Technology Officer', description: 'Oversees all technical aspects of the company.', responsibilities: ['Define tech strategy', 'Manage engineering teams', 'Oversee R&D'], companyId: 1 },
  { id: 'cfo', title: 'Chief Financial Officer', description: 'Manages the company\'s finances.', responsibilities: ['Financial planning', 'Risk management', 'Reporting'], companyId: 1 },
  { id: 'coo', title: 'Chief Operating Officer', description: 'Manages daily business operations.', responsibilities: ['Optimize processes', 'Oversee HR and Legal', 'Supply chain management'], companyId: 1 },
  { id: 'fe-lead', title: 'Frontend Lead', description: 'Leads the frontend development team.', responsibilities: ['Architect UI/UX', 'Mentor developers', 'Code reviews'], companyId: 2 },
  { id: 'be-lead', title: 'Backend Lead', description: 'Leads the backend development team.', responsibilities: ['Design APIs', 'Database management', 'Ensure scalability'], companyId: 2 },
  { id: 'fe-dev', title: 'Frontend Developer', description: 'Builds user interfaces.', responsibilities: ['Implement features', 'Write unit tests', 'Collaborate with designers'], companyId: 2 },
  { id: 'be-dev', title: 'Backend Developer', description: 'Builds server-side logic.', responsibilities: ['Develop APIs', 'Integrate services', 'Maintain databases'], companyId: 3 },
  { id: 'hr-manager', title: 'HR Manager', description: 'Manages human resources functions.', responsibilities: ['Recruitment', 'Employee relations', 'Compliance'], companyId: 3 },
];

export { JOB_POSITIONS as INITIAL_JOB_POSITIONS };

export const EMPLOYEES: Employee[] = [
  // Empleados de Innovatec Solutions
  { id: 1, name: 'Elena Vargas', positionId: 'ceo', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/elena/100', companyId: 1 },
  { id: 2, name: 'Carlos Mendoza', positionId: 'cto', managerId: 1, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/carlos/100', companyId: 1 },
  { id: 3, name: 'Sofia Reyes', positionId: 'coo', managerId: 1, status: EmployeeStatus.Vacation, avatarUrl: 'https://picsum.photos/seed/sofia/100', companyId: 1 },
  { id: 4, name: 'David Lee', positionId: 'cfo', managerId: 1, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/david/100', companyId: 1 },
  // Empleados de Creativos Digitales
  { id: 5, name: 'Ana Gomez', positionId: 'fe-lead', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/ana/100', companyId: 2 },
  { id: 6, name: 'Luis Torres', positionId: 'be-lead', managerId: null, status: EmployeeStatus.Inactive, avatarUrl: 'https://picsum.photos/seed/luis/100', companyId: 2 },
  { id: 7, name: 'Isabela Cruz', positionId: 'fe-dev', managerId: 5, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/isabela/100', companyId: 2 },
  { id: 8, name: 'Marco Diaz', positionId: 'fe-dev', managerId: 5, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/marco/100', companyId: 2 },
  // Empleados de Logística Global
  { id: 9, name: 'Javier Morales', positionId: 'be-dev', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/javier/100', companyId: 3 },
  { id: 10, name: 'Laura Fernandez', positionId: 'hr-manager', managerId: null, status: EmployeeStatus.Vacation, avatarUrl: 'https://picsum.photos/seed/laura/100', companyId: 3 },
];

export const COMPANY_NAME = "Talento Sostenible";

export const REGULATORY_COMMUNICATIONS: Communication[] = [
  {
    id: 1,
    companyId: 1,
    title: 'Actualización de Política de Trabajo Remoto',
    content: 'Se ha actualizado la política de trabajo remoto. Por favor, revísela en el portal de empleados. Los cambios incluyen nuevos lineamientos sobre horarios flexibles y equipamiento proporcionado por la empresa.',
    date: '2024-07-15T10:00:00Z',
    author: 'Recursos Humanos',
    recipient: 'Todos los empleados',
  },
  {
    id: 2,
    companyId: 1,
    title: 'Recordatorio: Cierre Fiscal Anual',
    content: 'Les recordamos que el cierre fiscal se aproxima. Todos los reportes de gastos deben ser enviados antes del 25 de este mes para ser procesados a tiempo.',
    date: '2024-07-10T14:30:00Z',
    author: 'Departamento de Finanzas',
    recipient: 'Todos los empleados',
  },
];

export const REPORTS: Report[] = [
  {
    id: 1,
    title: 'Análisis de Clima Laboral Q2 2024',
    category: 'Recursos Humanos',
    date: '2024-07-20T09:00:00Z',
    summary: 'Informe detallado sobre la satisfacción y el compromiso de los empleados durante el segundo trimestre. Incluye recomendaciones de mejora.',
    downloadUrl: '#',
  },
  {
    id: 2,
    title: 'Rendimiento de Campaña de Marketing Digital - Julio',
    category: 'Marketing Estratégico',
    date: '2024-08-01T11:30:00Z',
    summary: 'Análisis del ROI, alcance y conversiones de las campañas en redes sociales y Google Ads ejecutadas en el mes de julio.',
    downloadUrl: '#',
  },
];

export const PLANS: Plan[] = [
    { id: 'plan_basico', name: 'Básico', description: 'Funcionalidades esenciales.', price: 50 },
    { id: 'plan_profesional', name: 'Profesional', description: 'Módulos de comunicación e informes.', price: 150 },
    { id: 'plan_premium', name: 'Premium', description: 'Acceso completo y funcionalidades IA.', price: 300 },
];

export const COMPANIES: Company[] = [
    { id: 1, name: 'Innovatec Solutions', address: 'Calle Ficticia 123', contact: 'contacto@innovatec.com', planId: 'plan_premium' },
    { id: 2, name: 'Creativos Digitales', address: 'Avenida Siempre Viva 742', contact: 'hola@creativos.com', planId: 'plan_profesional' },
    { id: 3, name: 'Logística Global', address: 'Bulevar de los Sueños Rotos 45', contact: 'info@logistica.com', planId: 'plan_basico' },
];

export const USERS: User[] = [
    { id: 101, email: 'consultora@sostenible.com', role: 'consultor', name: 'Consultora Principal' },
    { id: 201, email: 'admin@innovatec.com', role: 'empresa', name: 'Admin Innovatec', companyId: 1 },
    { id: 202, email: 'admin@creativos.com', role: 'empresa', name: 'Admin Creativos', companyId: 2 },
    { id: 301, email: 'elena.vargas@innovatec.com', role: 'empleado', name: 'Elena Vargas', companyId: 1 },
    { id: 302, email: 'ana.gomez@creativos.com', role: 'empleado', name: 'Ana Gomez', companyId: 2 },
];

export const ADVISORY_LOGS: AdvisoryLogEntry[] = [
    { id: 1, companyId: 1, date: '2024-07-22T14:00:00Z', interactionType: 'Reunión', notes: 'Reunión inicial para discutir KPIs del Q3. Se acordó enfocar en la retención de talento.', consultantName: 'Consultora Principal' },
    { id: 2, companyId: 1, date: '2024-07-25T10:30:00Z', interactionType: 'Llamada', notes: 'Llamada de seguimiento sobre la implementación del nuevo software de RRHH.', consultantName: 'Consultora Principal' },
    { id: 3, companyId: 2, date: '2024-07-26T11:00:00Z', interactionType: 'Email', notes: 'Enviado borrador de la nueva política de trabajo flexible para su revisión.', consultantName: 'Consultora Principal' },
];

export const DOCUMENTS: Document[] = [
    { id: 1, companyId: 1, title: 'Contrato de Servicios 2024', category: 'Contratos', uploadDate: '2024-01-15T09:00:00Z', url: '#' },
    { id: 2, companyId: 1, title: 'Informe de Clima Laboral Q2', category: 'Informes', uploadDate: '2024-07-20T11:00:00Z', url: '#' },
    { id: 3, companyId: 2, title: 'Política de Teletrabajo', category: 'Políticas Internas', uploadDate: '2024-07-26T12:00:00Z', url: '#' },
    { id: 4, companyId: 1, title: 'Manual de Onboarding', category: 'Políticas Internas', uploadDate: '2024-03-10T16:00:00Z', url: '#' },
];

export const SELECTION_PROCESSES: JobOpening[] = [
    {
        id: 1,
        companyId: 1, // Innovatec Solutions
        title: 'Senior Backend Developer',
        status: 'Abierto',
        candidates: [
            { id: 101, name: 'Juan Perez', email: 'juan.p@example.com', status: CandidateStatus.Interviewing },
            { id: 102, name: 'Maria Rodriguez', email: 'maria.r@example.com', status: CandidateStatus.Applied },
        ],
    },
    {
        id: 2,
        companyId: 2, // Creativos Digitales
        title: 'UI/UX Designer',
        status: 'Cerrado',
        candidates: [
            { id: 201, name: 'Pedro Gomez', email: 'pedro.g@example.com', status: CandidateStatus.Hired },
        ],
    },
];

export const PAYROLL_DOCUMENTS: PayrollDocument[] = [
    { id: 1, companyId: 1, period: 'Julio 2024', fileName: 'nomina_jul_2024.pdf', uploadDate: '2024-08-01T10:00:00Z', url: '#', status: 'Subido' },
    { id: 2, companyId: 1, period: 'Junio 2024', fileName: 'nomina_jun_2024.pdf', uploadDate: '2024-07-01T10:00:00Z', url: '#', status: 'Enviado' },
    { id: 3, companyId: 2, period: 'Julio 2024', fileName: 'payroll_july_2024.pdf', uploadDate: '2024-08-01T11:00:00Z', url: '#', status: 'Subido' },
];