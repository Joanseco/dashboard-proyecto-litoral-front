import React, { useState } from 'react';

// Importar componentes
import Sidebar from './layout/Sidebar';
import Header from './layout/Header';

import AnalyticsSection from './sections/AnalyticsSection';
import UsersSection from './sections/UsersSection';
import SalesSection from './sections/SalesSection';
import SettingsSection from './sections/SettingsSection';
import ProductsSection from './sections/ProductsSection';

const Dashboard = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [timeRange, setTimeRange] = useState('7d');
    const [notifications, setNotifications] = useState(3);
    const [activeSection, setActiveSection] = useState('analytics'); // Estado principal de la navegación


    const getSectionTitle = () => {
        switch(activeSection) {
            case 'analytics': return 'Analytics Dashboard';
            case 'users': return 'Gestión de Usuarios';
            case 'products': return 'Gestión de Productos';
            case 'sales': return 'Gestión de Ventas';
            case 'settings': return 'Configuración';
            default: return 'Dashboard';
        }
    };


    const renderActiveSection = () => {
        switch (activeSection) {
            case 'analytics':
                return <AnalyticsSection />;
            case 'users':
                return <UsersSection />;
            case 'products':
                return <ProductsSection />;
            case 'sales':
                return <SalesSection />;
            case 'settings':
                return <SettingsSection />;
            default:
                return <AnalyticsSection />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
            {/* Sidebar (Ahora es un componente) */}
            <Sidebar 
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
            />

            {/* Contenido Principal */}
            <div className="lg:ml-64">
                {/* Header (Ahora es un componente) */}
                <Header 
                    getSectionTitle={getSectionTitle}
                    timeRange={timeRange}
                    setTimeRange={setTimeRange}
                    notifications={notifications}
                    setSidebarOpen={setSidebarOpen}
                />

                {/* Contenido de la Sección Activa */}
                <main className="p-6">
                    {renderActiveSection()}
                </main>
            </div>
        </div>
    );
};

export default Dashboard;