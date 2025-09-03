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
import Notification from './components/common/Notification';
import { EMPLOYEES } from './constants';
import { type ViewType, type Notification as NotificationType, type Employee, EmployeeStatus } from './types';

const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentView, setCurrentView] = useState<ViewType>('inicio');
  const [notifications, setNotifications] = useState<NotificationType[]>([]);
  const [employees, setEmployees] = useState<Employee[]>(EMPLOYEES);

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
      // Add notification to the start of the array to show newest on top
      setNotifications(prev => [{ id, message, type }, ...prev]);
      setTimeout(() => {
          // Use a functional update to ensure we are removing the correct one
          // even if other notifications are added/removed in the meantime.
          setNotifications(currentNotifications => 
              currentNotifications.filter(n => n.id !== id)
          );
      }, 5000); // Auto-close after 5 seconds
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
        <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header currentView={currentView} onLogout={handleLogout} />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4 md:p-8">
            {currentView === 'inicio' && <DashboardView employees={employees} onEmployeeStatusChange={handleEmployeeStatusChange} />}
            {currentView === 'orgChart' && <OrgChartView employees={employees} />}
            {currentView === 'jobAnalysis' && <JobAnalysisView />}
            {currentView === 'companyManual' && <CompanyManualView />}
            {currentView === 'marketing' && <MarketingView />}
            {currentView === 'cybersecurity' && <CybersecurityView />}
          </main>
        </div>
      </div>
    </>
  );
};

export default App;