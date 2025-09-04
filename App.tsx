import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import DashboardView from './components/DashboardView';
import OrgChartView from './components/OrgChartView';
import MarketingView from './components/MarketingView';
import CybersecurityView from './components/CybersecurityView';
import JobAnalysisView from './components/JobAnalysisView';
import CompanyManualView from './components/CompanyManualView';
import RegulatoryComplianceView from './components/RegulatoryComplianceView';
import ReportsView from './components/ReportsView';
import AIAgentsView from './components/AIAgentsView';
import Notification from './components/common/Notification';
import { EMPLOYEES, REGULATORY_COMMUNICATIONS, REPORTS } from './constants';
import { type ViewType, type Notification as NotificationType, type Employee, EmployeeStatus, type UserPlan, type Communication, type Report } from './types';
import { hasAccessToView } from './features';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('inicio');
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [userPlan, setUserPlan] = useState<UserPlan>('plan_basico');
  const [communications, setCommunications] = useState<Communication[]>(REGULATORY_COMMUNICATIONS);
  const [reports, setReports] = useState<Report[]>(REPORTS);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentView('inicio');
  };

  const handleChangeView = (view: ViewType) => {
    if (hasAccessToView(userPlan, view)) {
      setCurrentView(view);
    } else {
      addNotification('Necesita un plan superior para acceder a este módulo.', 'info');
    }
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

  const handleEmployeeStatusChange = (employeeId: number, newStatus: EmployeeStatus) => {
      let employeeName = '';
      setEmployees(prevEmployees =>
          prevEmployees.map(emp => {
              if (emp.id === employeeId) {
                  employeeName = emp.name;
                  return { ...emp, status: newStatus };
              }
              return emp;
          })
      );
      if (employeeName) {
        addNotification(`${employeeName} ha cambiado su estado a "${newStatus}".`, 'success');
      }
  };

  const addCommunication = (title: string, content: string, recipient: string) => {
    const newCommunication: Communication = {
      id: Date.now(),
      title,
      content,
      recipient,
      date: new Date().toISOString(),
      author: 'Consultora', // Nombre del usuario actual
    };
    setCommunications(prev => [newCommunication, ...prev]);
    addNotification(`Nueva comunicación "${title}" publicada.`, 'success');
  };


  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderView = () => {
    if (!hasAccessToView(userPlan, currentView)) {
      // Fallback for bookmarked URLs or direct navigation attempts
      return (
        <div className="p-8 bg-white rounded-lg shadow-md text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Acceso Denegado</h2>
            <p className="text-slate-600 mb-6">
                Su plan de suscripción actual no incluye acceso a este módulo.
            </p>
            <button className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors">
                Mejorar mi Plan
            </button>
        </div>
      );
    }
    
    switch (currentView) {
        case 'inicio': return <DashboardView employees={employees} onEmployeeStatusChange={handleEmployeeStatusChange} userPlan={userPlan} setUserPlan={setUserPlan} />;
        case 'orgChart': return <OrgChartView employees={employees} userPlan={userPlan} />;
        case 'jobAnalysis': return <JobAnalysisView userPlan={userPlan} />;
        case 'companyManual': return <CompanyManualView />;
        case 'marketing': return <MarketingView />;
        case 'cybersecurity': return <CybersecurityView />;
        case 'regulatoryCompliance': return <RegulatoryComplianceView communications={communications} onAddCommunication={addCommunication} />;
        case 'informes': return <ReportsView reports={reports} />;
        case 'agentesIA': return <AIAgentsView />;
        default: return <DashboardView employees={employees} onEmployeeStatusChange={handleEmployeeStatusChange} userPlan={userPlan} setUserPlan={setUserPlan} />;
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

      <div className="flex h-screen bg-blue-50 font-sans">
        <Sidebar 
          currentView={currentView} 
          setCurrentView={handleChangeView} 
          userPlan={userPlan}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
        />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header 
            currentView={currentView} 
            onLogout={handleLogout} 
            onMenuClick={() => setIsSidebarOpen(true)}
            userPlan={userPlan}
          />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-blue-50 p-4 md:p-8">
            {renderView()}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;