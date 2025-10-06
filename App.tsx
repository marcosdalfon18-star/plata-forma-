import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import CompanyView from './components/CompanyView';
import EmployeeView from './components/EmployeeView';
import Notification from './components/common/Notification';
import JobAnalysisView from './components/JobAnalysisView';
import AddCompanyModal from './components/AddCompanyModal';
import ReportsView from './components/ReportsView';
import { EMPLOYEES, REGULATORY_COMMUNICATIONS, COMPANIES, PLANS, USERS, ADVISORY_LOGS, DOCUMENTS, INITIAL_JOB_POSITIONS, REPORTS, SELECTION_PROCESSES, PAYROLL_DOCUMENTS } from './constants';
import { type ViewType, type Notification as NotificationType, type Employee, type UserPlan, type Communication, type Activity, type User, type Company, type Plan, type AdvisoryLogEntry, type Document, type JobPosition, type JobOpening, ActivityType, type PayrollDocument } from './types';
import { hasAccessToView } from './features';
import PlanManagementView from './components/PlanManagementView';
import AddEditPlanModal from './components/AddEditPlanModal';
import OrgChartView from './components/OrgChartView';
import CompanyManualView from './components/CompanyManualView';
import SelectionProcessView from './components/SelectionProcessView';
import MarketingView from './components/MarketingView';
import CybersecurityView from './components/CybersecurityView';
import AIAgentsView from './components/AIAgentsView';
import RegulatoryComplianceView from './components/RegulatoryComplianceView';
import PayrollView from './components/PayrollView';
import UploadPayrollModal from './components/UploadPayrollModal';


const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState<ViewType>('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  
  // Data state
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [companies, setCompanies] = useState<Company[]>(COMPANIES);
  const [plans, setPlans] = useState<Plan[]>(PLANS);
  const [jobPositions, setJobPositions] = useState<JobPosition[]>(INITIAL_JOB_POSITIONS);
  const [userPlan, setUserPlan] = useState<UserPlan>('plan_premium'); // Kept for consultant's simulator
  const [communications, setCommunications] = useState<Communication[]>(REGULATORY_COMMUNICATIONS);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [advisoryLogs, setAdvisoryLogs] = useState<AdvisoryLogEntry[]>(ADVISORY_LOGS);
  const [documents, setDocuments] = useState<Document[]>(DOCUMENTS);
  const [selectionProcesses, setSelectionProcesses] = useState<JobOpening[]>(SELECTION_PROCESSES);
  const [payrollDocuments, setPayrollDocuments] = useState<PayrollDocument[]>(PAYROLL_DOCUMENTS);


  // Consultant-specific state
  const [selectedCompany, setSelectedCompany] = useState<Company | null>(null);
  const [isAddCompanyModalOpen, setIsAddCompanyModalOpen] = useState(false);
  const [isPlanModalOpen, setIsPlanModalOpen] = useState(false);
  const [editingPlan, setEditingPlan] = useState<Plan | null>(null);

  // Company-specific state
  const [isUploadPayrollModalOpen, setIsUploadPayrollModalOpen] = useState(false);


  const addActivity = (type: Activity['type'], description: string, companyId?: number) => {
    const newActivity: Activity = {
      id: Date.now(),
      type,
      description,
      timestamp: new Date().toISOString(),
      companyId,
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 20)); // Increased limit
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('inicio'); // Reset view on login
    setSelectedCompany(null); // Reset selected company on login
    if (user.role === 'empresa' && user.companyId) {
        const company = companies.find(c => c.id === user.companyId);
        if (company) {
            setUserPlan(company.planId);
        }
    } else {
        setUserPlan('plan_premium');
    }
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentView('inicio');
  };

  const handleChangeView = (view: ViewType) => {
    if (!currentUser) return;

    const currentPlan = (currentUser.role === 'consultor' && selectedCompany) 
        ? selectedCompany.planId 
        : userPlan;

    if (hasAccessToView(currentUser.role, currentPlan, view)) {
        setCurrentView(view);
    } else {
        addNotification('Necesita un plan superior o permisos adicionales para acceder a este módulo.', 'info');
    }
  };
  
  const handleSelectCompany = (company: Company) => {
    setSelectedCompany(company);
    setCurrentView('inicio');
  };

  const handleBackToDashboard = () => {
    setSelectedCompany(null);
    setCurrentView('inicio');
  };


  const removeNotification = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const addNotification = (message: string, type: NotificationType['type']) => {
      const id = Date.now();
      setNotifications(prev => [{ id, message, type }, ...prev]);
      setTimeout(() => {
          setNotifications(currentNotifications => 
              currentNotifications.filter(n => n.id !== id)
          );
      }, 5000);
  };

  const handleAddEmployee = (newEmployeeData: Omit<Employee, 'id' | 'avatarUrl' | 'managerId'>) => {
    const companyId = currentUser?.role === 'consultor' ? selectedCompany?.id : currentUser?.companyId;
    if (!companyId) return;

    const newEmployee: Employee = {
      ...newEmployeeData,
      id: Date.now(),
      managerId: null, // Simplified for this example
      avatarUrl: `https://picsum.photos/seed/${Date.now()}/100`,
      companyId: companyId,
    };
    setEmployees(prev => [newEmployee, ...prev]);
    addNotification(`El empleado "${newEmployee.name}" ha sido añadido con éxito.`, 'success');
    const companyName = companies.find(c => c.id === companyId)?.name || 'una empresa';
    addActivity(ActivityType.NewEmployee, `Nuevo empleado "${newEmployee.name}" añadido a ${companyName}.`, companyId);
  };

  const handleUpdateEmployee = (updatedEmployee: Employee) => {
    setEmployees(prev => prev.map(emp => emp.id === updatedEmployee.id ? updatedEmployee : emp));
    addNotification(`La información de "${updatedEmployee.name}" ha sido actualizada.`, 'success');
    const companyName = companies.find(c => c.id === updatedEmployee.companyId)?.name || 'una empresa';
    addActivity(ActivityType.EmployeeUpdate, `Datos de "${updatedEmployee.name}" actualizados en ${companyName}.`, updatedEmployee.companyId);
  };
  
  const handleAddNewJobPosition = (newPositionData: Omit<JobPosition, 'id' | 'companyId'>) => {
    const companyId = currentUser?.role === 'consultor' ? selectedCompany?.id : currentUser?.companyId;
    if (!companyId) return;

    const newPosition: JobPosition = {
      ...newPositionData,
      id: `custom_${Date.now()}`,
      companyId: companyId,
    };
    setJobPositions(prev => [newPosition, ...prev]);
    addNotification(`El puesto "${newPosition.title}" ha sido creado con éxito.`, 'success');
    const companyName = companies.find(c => c.id === companyId)?.name || 'una empresa';
    addActivity(ActivityType.NewJobPosition, `Nuevo puesto "${newPosition.title}" creado en ${companyName}.`, companyId);
  };

  const handleAddAdvisoryLog = (newLog: Omit<AdvisoryLogEntry, 'id' | 'date' | 'consultantName'>) => {
      const logEntry: AdvisoryLogEntry = {
          ...newLog,
          id: Date.now(),
          date: new Date().toISOString(),
          consultantName: currentUser?.name || 'Consultor',
      };
      setAdvisoryLogs(prev => [logEntry, ...prev]);
      addNotification(`Nueva entrada de bitácora añadida para ${companies.find(c => c.id === newLog.companyId)?.name}.`, 'success');
  };

  const handleAddNewCompany = (newCompanyData: Omit<Company, 'id'>) => {
    const newCompany: Company = {
        ...newCompanyData,
        id: Date.now(),
    };
    setCompanies(prev => [newCompany, ...prev]);
    addNotification(`La empresa "${newCompany.name}" ha sido creada con éxito.`, 'success');
    setIsAddCompanyModalOpen(false);
  };

  const handleUploadDocumentClick = () => {
    addNotification('La funcionalidad para subir documentos estará disponible próximamente.', 'info');
  };

  const handleBulkAction = (action: string, employeeIds: number[]) => {
    addNotification(`Acción '${action}' seleccionada para ${employeeIds.length} empleados. Funcionalidad en desarrollo.`, 'info');
  };

  const handleOpenPlanModal = (plan: Plan | null) => {
    setEditingPlan(plan);
    setIsPlanModalOpen(true);
  };

  const handleSavePlan = (planData: Omit<Plan, 'id'>, id?: UserPlan) => {
      if (id) {
          // Editing existing plan
          const updatedPlans = plans.map(p => p.id === id ? { ...planData, id } : p);
          setPlans(updatedPlans);
          addNotification(`El plan "${planData.name}" ha sido actualizado.`, 'success');
      } else {
          // Creating new plan
          const newPlan: Plan = {
              ...planData,
              id: `plan_${planData.name.toLowerCase().replace(/\s+/g, '_')}_${Date.now()}`,
          };
          setPlans(prev => [...prev, newPlan]);
          addNotification(`El plan "${planData.name}" ha sido creado con éxito.`, 'success');
      }
      setIsPlanModalOpen(false);
      setEditingPlan(null);
  };

  const handleAddCommunication = (title: string, content: string, recipient: string) => {
    const companyId = currentUser?.role === 'consultor' ? selectedCompany?.id : currentUser?.companyId;
    if (!companyId) return;

    const newCommunication: Communication = {
      id: Date.now(),
      companyId: companyId,
      title,
      content,
      recipient,
      author: currentUser.name,
      date: new Date().toISOString(),
    };
    setCommunications(prev => [newCommunication, ...prev]);
    addNotification('La comunicación ha sido publicada con éxito.', 'success');
    addActivity(ActivityType.NewCommunication, `Nueva comunicación "${title}" publicada por ${companies.find(c => c.id === companyId)?.name}.`, companyId);
  };

  const handleRequestSelectionProcess = (jobPosition: JobPosition) => {
     const companyId = currentUser?.role === 'consultor' ? selectedCompany?.id : currentUser?.companyId;
    if (!companyId) return;
    const companyName = companies.find(c => c.id === companyId)?.name;
    addNotification(`Solicitud para el puesto "${jobPosition.title}" enviada a la consultora.`, 'success');
    addActivity(ActivityType.SelectionRequest, `${companyName} ha solicitado una nueva búsqueda para el puesto: ${jobPosition.title}.`, companyId);
  };

  const handleUploadPayroll = (period: string, fileName: string) => {
    const companyId = currentUser?.role === 'consultor' ? selectedCompany?.id : currentUser?.companyId;
    if (!companyId) return;
    const newPayroll: PayrollDocument = {
        id: Date.now(),
        companyId: companyId,
        period,
        fileName,
        uploadDate: new Date().toISOString(),
        url: '#', // Placeholder for the actual file URL
        status: 'Subido',
    };
    setPayrollDocuments(prev => [newPayroll, ...prev]);
    addNotification(`Nómina para ${period} subida con éxito.`, 'success');
    setIsUploadPayrollModalOpen(false);
  };
  
  const handleSendPayroll = (payrollId: number) => {
      const payroll = payrollDocuments.find(p => p.id === payrollId);
       if (!payroll) return;
      const companyId = payroll.companyId;

      setPayrollDocuments(prev => prev.map(p => p.id === payrollId ? { ...p, status: 'Enviado' } : p));
      
      const companyName = companies.find(c => c.id === companyId)?.name;
      addNotification(`Nómina del período ${payroll.period} enviada con éxito.`, 'success');
      addActivity(ActivityType.PayrollSent, `${companyName} ha enviado la nómina del período ${payroll.period}.`, companyId);
  };


  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} users={USERS} />;
  }
  
  const renderConsultantContent = () => {
    if (selectedCompany) {
        // Management workspace for a selected company
        const company = selectedCompany;
        const companyEmployees = employees.filter(e => e.companyId === company.id);
        const companyJobPositions = jobPositions.filter(p => p.companyId === company.id);
        const companyProcesses = selectionProcesses.filter(p => p.companyId === company.id);
        const companyCommunications = communications.filter(c => c.companyId === company.id);
        const companyPayrolls = payrollDocuments.filter(p => p.companyId === company.id);
        const companyReports = REPORTS; // Assuming reports are not company specific for now

        switch(currentView) {
            case 'inicio':
                return <CompanyView 
                    company={company}
                    employees={companyEmployees}
                    onAddEmployee={handleAddEmployee}
                    onUpdateEmployee={handleUpdateEmployee}
                    jobPositions={companyJobPositions}
                    onBulkAction={handleBulkAction}
                    plans={plans}
                    onAddJobPosition={handleAddNewJobPosition}
                />;
            case 'orgChart':
                return <OrgChartView employees={companyEmployees} userPlan={company.planId} />;
            case 'jobAnalysis':
                return <JobAnalysisView userPlan={company.planId} employees={companyEmployees} />;
            case 'companyManual':
                return <CompanyManualView />;
            case 'selectionProcesses':
                return <SelectionProcessView processes={companyProcesses} jobPositions={companyJobPositions} onRequestSelection={handleRequestSelectionProcess} />;
            case 'regulatoryCompliance':
                return <RegulatoryComplianceView communications={companyCommunications} onAddCommunication={handleAddCommunication} />;
            case 'payrollManagement':
                return <PayrollView payrolls={companyPayrolls} onUploadClick={() => setIsUploadPayrollModalOpen(true)} onSendPayroll={handleSendPayroll} />;
            case 'marketing':
                return <MarketingView />;
            case 'cybersecurity':
                return <CybersecurityView />;
            case 'agentesIA':
                return <AIAgentsView />;
            case 'informes':
                return <ReportsView reports={companyReports} />;
            default:
                 // Fallback to the company dashboard if an unknown view is selected
                return <CompanyView 
                    company={company}
                    employees={companyEmployees}
                    onAddEmployee={handleAddEmployee}
                    onUpdateEmployee={handleUpdateEmployee}
                    jobPositions={companyJobPositions}
                    onBulkAction={handleBulkAction}
                    plans={plans}
                    onAddJobPosition={handleAddNewJobPosition}
                />;
        }
    } else {
        // Global consultant dashboard
        switch(currentView) {
            case 'inicio':
                 return <DashboardView 
                    companies={companies}
                    employees={employees}
                    userPlan={userPlan}
                    setUserPlan={(plan) => {
                        setUserPlan(plan);
                        addActivity(ActivityType.PlanChange, `El plan del simulador se cambió a ${plans.find(p => p.id === plan)?.name}.`);
                    }}
                    activities={activities.filter(a => !a.companyId)}
                    onShowAddCompanyModal={() => setIsAddCompanyModalOpen(true)}
                    plans={plans}
                    onSelectCompany={handleSelectCompany}
                />;
            case 'planManagement':
                return <PlanManagementView plans={plans} onEditPlan={handleOpenPlanModal} onAddPlan={() => handleOpenPlanModal(null)} />;
            default:
                setCurrentView('inicio'); // Fallback to global dashboard if a view is accessed without a company
                return null;
        }
    }
  };

  const renderCompanyContent = () => {
      const company = companies.find(c => c.id === currentUser?.companyId);
      if (!company) return <div>Error: Empresa no encontrada</div>;
      const companyEmployees = employees.filter(e => e.companyId === currentUser?.companyId);
      const companyJobPositions = jobPositions.filter(p => p.companyId === currentUser.companyId);

      switch(currentView) {
          case 'inicio':
              return <CompanyView 
                          company={company} 
                          employees={companyEmployees}
                          onAddEmployee={handleAddEmployee}
                          onUpdateEmployee={handleUpdateEmployee}
                          jobPositions={jobPositions}
                          onBulkAction={handleBulkAction}
                          plans={plans}
                          onAddJobPosition={handleAddNewJobPosition}
                      />;
          case 'orgChart':
              return <OrgChartView employees={companyEmployees} userPlan={company.planId} />;
          case 'jobAnalysis':
              return <JobAnalysisView userPlan={company.planId} employees={companyEmployees} />;
          case 'companyManual':
              return <CompanyManualView />;
          case 'selectionProcesses':
              const companyProcesses = selectionProcesses.filter(p => p.companyId === currentUser?.companyId);
              return <SelectionProcessView 
                processes={companyProcesses} 
                jobPositions={companyJobPositions}
                onRequestSelection={handleRequestSelectionProcess}
              />;
          case 'regulatoryCompliance':
              const companyCommunications = communications.filter(c => c.companyId === currentUser.companyId);
              return <RegulatoryComplianceView communications={companyCommunications} onAddCommunication={handleAddCommunication} />;
          case 'payrollManagement':
              const companyPayrolls = payrollDocuments.filter(p => p.companyId === currentUser.companyId);
              return <PayrollView 
                        payrolls={companyPayrolls} 
                        onUploadClick={() => setIsUploadPayrollModalOpen(true)}
                        onSendPayroll={handleSendPayroll}
                   />;
          case 'informes':
              const companyReports = REPORTS.filter(r => r.category === 'Recursos Humanos'); // Example filter
              return <ReportsView reports={companyReports} />;
          case 'marketing':
              return <MarketingView />;
          case 'cybersecurity':
              return <CybersecurityView />;
          case 'agentesIA':
              return <AIAgentsView />;
          default:
              setCurrentView('inicio'); // Fallback to 'inicio' for unknown views
              return null;
      }
  };

  const renderEmployeeContent = () => {
      const employeeCompany = companies.find(c => c.id === currentUser?.companyId);
      if (!employeeCompany) return <div>Error: Empresa no encontrada para el empleado.</div>;
      const companyEmployees = employees.filter(e => e.companyId === currentUser?.companyId);

      switch(currentView) {
          case 'inicio':
              return <EmployeeView user={currentUser!} company={employeeCompany} />;
          case 'jobAnalysis':
              return <JobAnalysisView userPlan={employeeCompany.planId} employees={companyEmployees} />;
          case 'companyManual':
              return <CompanyManualView />;
          default:
              setCurrentView('inicio');
              return null;
      }
  };

  const renderContent = () => {
      switch (currentUser.role) {
          case 'consultor':
              return renderConsultantContent();
          case 'empresa':
              return renderCompanyContent();
          case 'empleado':
              return renderEmployeeContent();
          default:
              return <div>Rol no reconocido.</div>
      }
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-[100] w-full max-w-sm space-y-3">
        {notifications.map(notification => (
          <Notification key={notification.id} notification={notification} onClose={removeNotification} />
        ))}
      </div>
      
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {currentUser.role === 'consultor' && (
        <>
            <AddCompanyModal 
                isOpen={isAddCompanyModalOpen}
                onClose={() => setIsAddCompanyModalOpen(false)}
                onAddCompany={handleAddNewCompany}
                plans={plans}
            />
            <AddEditPlanModal
                isOpen={isPlanModalOpen}
                onClose={() => {
                    setIsPlanModalOpen(false);
                    setEditingPlan(null);
                }}
                onSave={handleSavePlan}
                plan={editingPlan}
            />
        </>
      )}

      {(currentUser.role === 'empresa' || (currentUser.role === 'consultor' && selectedCompany)) && (
            <UploadPayrollModal 
                isOpen={isUploadPayrollModalOpen}
                onClose={() => setIsUploadPayrollModalOpen(false)}
                onUpload={handleUploadPayroll}
            />
        )}

      <div className="flex h-screen bg-blue-50 font-sans">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={handleChangeView} 
          userPlan={selectedCompany ? selectedCompany.planId : userPlan}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentUser={currentUser}
          selectedCompany={selectedCompany}
          onBackToDashboard={handleBackToDashboard}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            currentView={currentView} 
            onLogout={handleLogout} 
            onMenuClick={() => setIsSidebarOpen(true)}
            userPlan={userPlan}
            currentUser={currentUser}
            selectedCompany={selectedCompany}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-blue-50 p-4 md:p-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;