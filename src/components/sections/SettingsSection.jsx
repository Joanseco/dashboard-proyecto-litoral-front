import React from 'react';

const SettingsSection = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Configuración General</h3>
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Nombre de la Empresa</label>
                        <input 
                            type="text" 
                            defaultValue="Mi Empresa S.A."
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
                        <input 
                            type="email" 
                            defaultValue="contacto@empresa.com"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Zona Horaria</label>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent">
                            <option>UTC-5 (Bogotá)</option>
                            <option>UTC-6 (México)</option>
                            <option>UTC-3 (Buenos Aires)</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Notificaciones</h3>
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Notificaciones por Email</span>
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Notificaciones Push</span>
                        <input type="checkbox" className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                    </div>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-700">Reportes Semanales</span>
                        <input type="checkbox" defaultChecked className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded" />
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Seguridad</h3>
                <div className="space-y-4">
                    <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors">
                        Cambiar Contraseña
                    </button>
                    <button className="w-full bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-colors">
                        Activar 2FA
                    </button>
                    <button className="w-full bg-red-100 text-red-700 py-2 px-4 rounded-lg hover:bg-red-200 transition-colors">
                        Descargar Datos
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsSection;