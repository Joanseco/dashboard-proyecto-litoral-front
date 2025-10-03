
import React from 'react';
import { X, Users, BarChart2, DollarSign, Settings, ShoppingCart } from 'lucide-react';

// Definir los ítems del menú
const menuItems = [
  { id: 'analytics', label: 'Analytics', icon: BarChart2 },
  { id: 'users', label: 'Usuarios', icon: Users },
  { id: 'products', label: 'Productos', icon: ShoppingCart },
  { id: 'sales', label: 'Ventas', icon: DollarSign },
  { id: 'settings', label: 'Configuración', icon: Settings },
];

const Sidebar = ({ sidebarOpen, setSidebarOpen, activeSection, setActiveSection }) => {
  return (
    <>
      {/* Sidebar Fijo/Móvil */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0`}>
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-bold text-gray-800">Dashboard</h2>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="mt-8">
          <div className="px-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id);
                    setSidebarOpen(false); // Cerrar sidebar en móvil al hacer click
                  }}
                  className={`w-full flex items-center px-4 py-2 rounded-lg transition-colors ${
                    isActive 
                      ? 'text-purple-700 bg-purple-50 border-l-4 border-purple-500' 
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <Icon className={`h-5 w-5 mr-3 ${isActive ? 'text-purple-600' : ''}`} />
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Overlay Móvil */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;