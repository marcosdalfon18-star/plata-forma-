import { type Employee, type JobPosition, EmployeeStatus, type Communication } from './types';

export const JOB_POSITIONS: JobPosition[] = [
  { id: 'ceo', title: 'CEO', description: 'Overall strategic direction and leadership.', responsibilities: ['Set company vision', 'Lead executive team', 'Investor relations'] },
  { id: 'cto', title: 'Chief Technology Officer', description: 'Oversees all technical aspects of the company.', responsibilities: ['Define tech strategy', 'Manage engineering teams', 'Oversee R&D'] },
  { id: 'cfo', title: 'Chief Financial Officer', description: 'Manages the company\'s finances.', responsibilities: ['Financial planning', 'Risk management', 'Reporting'] },
  { id: 'coo', title: 'Chief Operating Officer', description: 'Manages daily business operations.', responsibilities: ['Optimize processes', 'Oversee HR and Legal', 'Supply chain management'] },
  { id: 'fe-lead', title: 'Frontend Lead', description: 'Leads the frontend development team.', responsibilities: ['Architect UI/UX', 'Mentor developers', 'Code reviews'] },
  { id: 'be-lead', title: 'Backend Lead', description: 'Leads the backend development team.', responsibilities: ['Design APIs', 'Database management', 'Ensure scalability'] },
  { id: 'fe-dev', title: 'Frontend Developer', description: 'Builds user interfaces.', responsibilities: ['Implement features', 'Write unit tests', 'Collaborate with designers'] },
  { id: 'be-dev', title: 'Backend Developer', description: 'Builds server-side logic.', responsibilities: ['Develop APIs', 'Integrate services', 'Maintain databases'] },
  { id: 'hr-manager', title: 'HR Manager', description: 'Manages human resources functions.', responsibilities: ['Recruitment', 'Employee relations', 'Compliance'] },
];

export const EMPLOYEES: Employee[] = [
  { id: 1, name: 'Elena Vargas', positionId: 'ceo', managerId: null, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/elena/100' },
  { id: 2, name: 'Carlos Mendoza', positionId: 'cto', managerId: 1, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/carlos/100' },
  { id: 3, name: 'Sofia Reyes', positionId: 'coo', managerId: 1, status: EmployeeStatus.Vacation, avatarUrl: 'https://picsum.photos/seed/sofia/100' },
  { id: 4, name: 'David Lee', positionId: 'cfo', managerId: 1, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/david/100' },
  { id: 5, name: 'Ana Gomez', positionId: 'fe-lead', managerId: 2, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/ana/100' },
  { id: 6, name: 'Luis Torres', positionId: 'be-lead', managerId: 2, status: EmployeeStatus.Inactive, avatarUrl: 'https://picsum.photos/seed/luis/100' },
  { id: 7, name: 'Isabela Cruz', positionId: 'fe-dev', managerId: 5, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/isabela/100' },
  { id: 8, name: 'Marco Diaz', positionId: 'fe-dev', managerId: 5, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/marco/100' },
  { id: 9, name: 'Javier Morales', positionId: 'be-dev', managerId: 6, status: EmployeeStatus.Active, avatarUrl: 'https://picsum.photos/seed/javier/100' },
  { id: 10, name: 'Laura Fernandez', positionId: 'hr-manager', managerId: 3, status: EmployeeStatus.Vacation, avatarUrl: 'https://picsum.photos/seed/laura/100' },
];

export const COMPANY_NAME = "Talento Sostenible";

export const REGULATORY_COMMUNICATIONS: Communication[] = [
  {
    id: 1,
    title: 'Actualización de Política de Trabajo Remoto',
    content: 'Se ha actualizado la política de trabajo remoto. Por favor, revísela en el portal de empleados. Los cambios incluyen nuevos lineamientos sobre horarios flexibles y equipamiento proporcionado por la empresa.',
    date: '2024-07-15T10:00:00Z',
    author: 'Recursos Humanos',
  },
  {
    id: 2,
    title: 'Recordatorio: Cierre Fiscal Anual',
    content: 'Les recordamos que el cierre fiscal se aproxima. Todos los reportes de gastos deben ser enviados antes del 25 de este mes para ser procesados a tiempo.',
    date: '2024-07-10T14:30:00Z',
    author: 'Departamento de Finanzas',
  },
];