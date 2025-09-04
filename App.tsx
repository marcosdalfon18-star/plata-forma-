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
import Notification from './components/common/Notification';
import { EMPLOYEES, REGULATORY_COMMUNICATIONS } from './constants';
import { type ViewType, type Notification as NotificationType, type Employee, EmployeeStatus, type UserPlan, type Communication } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('inicio');
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);
  const [userPlan, setUserPlan] = useState<UserPlan>('plan_premium'); // Simular usuario premium
  const [communications, setCommunications] = useState<Communication[]>(REGULATORY_COMMUNICATIONS);


  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
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

  const addCommunication = (title: string, content: string) => {
    const newCommunication: Communication = {
      id: Date.now(),
      title,
      content,
      date: new Date().toISOString(),
      author: 'Consultora', // Nombre del usuario actual
    };
    setCommunications(prev => [newCommunication, ...prev]);
    addNotification(`Nueva comunicación "${title}" publicada.`, 'success');
  };


  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <>
      <div className="fixed top-4 right-4 z-[100] w-full max-w-sm space-y-3">
        {notifications.map(notification => (
          <Notification key={notification.id} notification={notification} onClose={removeNotification} />
        ))}
      </div>
      <div className="flex h-screen bg-gray-100 font-sans">
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} userPlan={userPlan} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header currentView={currentView} onLogout={handleLogout} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
            {currentView === 'inicio' && <DashboardView employees={employees} onEmployeeStatusChange={handleEmployeeStatusChange} />}
            {currentView === 'orgChart' && <OrgChartView employees={employees} />}
            {currentView === 'jobAnalysis' && <JobAnalysisView />}
            {currentView === 'companyManual' && <CompanyManualView />}
            {currentView === 'marketing' && <MarketingView />}
            {currentView === 'cybersecurity' && <CybersecurityView />}
            {currentView === 'regulatoryCompliance' && <RegulatoryComplianceView communications={communications} onAddCommunication={addCommunication} />}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;