import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://dashboard-backend-emc4.onrender.com/api';

const UsersSection = () => {
    // Estados principales
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filterRole, setFilterRole] = useState('Todos');
    const [search, setSearch] = useState('');
    const [editingUser, setEditingUser] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', email: '', role: '', status: '' });
    const [saving, setSaving] = useState(false);
    // Formulario de creación de usuario
    const [createForm, setCreateForm] = useState({ name: '', email: '', password: '', role: 'Cliente', status: 'Activo' });
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users`);
            if (!response.ok) throw new Error('Error HTTP! Estado: ' + response.status);
            const data = await response.json();
            setUsers(data);
            setError(null);
        } catch (err) {
            setError('No se pudieron cargar los datos de usuarios.');
        } finally {
            setLoading(false);
        }
    };

    // Handlers para el formulario de creación
    const handleCreateChange = (e) => {
        setCreateForm({ ...createForm, [e.target.name]: e.target.value });
    };

    const handleCreate = async (e) => {
        e.preventDefault();
        setCreating(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(createForm),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al crear usuario');
            setCreateForm({ name: '', email: '', password: '', role: 'Cliente', status: 'Activo' });
            fetchUsers();
        } catch (err) {
            setError(err.message);
        } finally {
            setCreating(false);
        }
    };

    // Filtrar usuarios por rol y búsqueda
    const filteredUsers = users.filter(u => {
        const roleMatch = filterRole === 'Todos' || u.role === filterRole;
        const searchMatch =
            u.name.toLowerCase().includes(search.toLowerCase()) ||
            u.email.toLowerCase().includes(search.toLowerCase());
        return roleMatch && searchMatch;
    });

    // Abrir modal de edición
    const handleEdit = (user) => {
        setEditingUser(user);
        setEditForm({ name: user.name, email: user.email, role: user.role, status: user.status });
    };

    // Cerrar modal
    const closeModal = () => {
        setEditingUser(null);
        setEditForm({ name: '', email: '', role: '', status: '' });
    };

    // Guardar cambios
    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const response = await fetch(`${API_BASE_URL}/users/${editingUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(editForm),
            });
            if (!response.ok) throw new Error('Error al editar usuario');
            closeModal();
            fetchUsers();
        } catch (err) {
            setError('No se pudo editar el usuario.');
        } finally {
            setSaving(false);
        }
    };

    // Eliminar usuario
    const handleDelete = async (id) => {
        if (!window.confirm('¿Seguro que deseas eliminar este usuario?')) return;
        try {
            const response = await fetch(`${API_BASE_URL}/users/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Error al eliminar usuario');
            fetchUsers();
        } catch (err) {
            setError(err.message);
        }
    };

    // --- Renderizado de Estados ---

    if (loading) {
        return (
            <div className="p-6 text-center text-gray-600">
                <svg className="animate-spin h-5 w-5 mr-3 inline text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth="4" className="opacity-25"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path></svg>
                Cargando lista de usuarios...
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-6 text-center text-red-600 bg-red-100 border border-red-400 rounded-lg">
                ❌ Error: {error}
            </div>
        );
    }
    
    // Si no hay usuarios
    if (users.length === 0) {
        return <div className="p-6 text-center text-gray-500">No hay usuarios registrados.</div>;
    }

    // --- Renderizado Principal (Tabla y Modal) ---
    return (
        <section className="p-6 bg-white rounded-xl shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">Gestión de Usuarios</h2>
            {/* Formulario de creación de usuario */}
            <form onSubmit={handleCreate} className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4 items-end mb-6">
                <input name="name" value={createForm.name} onChange={handleCreateChange} placeholder="Nombre" required className="border p-2 rounded w-full md:w-1/4" />
                <input name="email" value={createForm.email} onChange={handleCreateChange} placeholder="Email" required type="email" className="border p-2 rounded w-full md:w-1/4" />
                <input name="password" value={createForm.password} onChange={handleCreateChange} placeholder="Contraseña" required type="password" className="border p-2 rounded w-full md:w-1/4" />
                <select name="role" value={createForm.role} onChange={handleCreateChange} className="border p-2 rounded w-full md:w-1/6">
                    <option value="Admin">Admin</option>
                    <option value="Moderador">Moderador</option>
                    <option value="Cliente">Cliente</option>
                </select>
                <select name="status" value={createForm.status} onChange={handleCreateChange} className="border p-2 rounded w-full md:w-1/6">
                    <option value="Activo">Activo</option>
                    <option value="Inactivo">Inactivo</option>
                </select>
                <button type="submit" disabled={creating} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
                    {creating ? 'Creando...' : 'Crear Usuario'}
                </button>
            </form>
            {/* Filtro por rol y búsqueda */}
            <div className="mb-4 flex flex-col md:flex-row gap-2 md:items-center">
                <div>
                    <label className="mr-2 font-medium">Filtrar por rol:</label>
                    <select value={filterRole} onChange={e => setFilterRole(e.target.value)} className="border p-2 rounded">
                        <option value="Todos">Todos</option>
                        <option value="Admin">Admin</option>
                        <option value="Moderador">Moderador</option>
                        <option value="Cliente">Cliente</option>
                    </select>
                </div>
                <div>
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Buscar por nombre o email..."
                        className="border p-2 rounded w-full md:w-64"
                    />
                </div>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rol</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estado</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Registro</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredUsers.map((user) => (
                            <tr key={user.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.role === 'Admin' ? 'bg-red-100 text-red-800' :
                                        user.role === 'Moderador' ? 'bg-yellow-100 text-yellow-800' :
                                        'bg-blue-100 text-blue-800'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        user.status.toLowerCase() === 'activo'
                                          ? 'bg-green-100 text-green-800'
                                          : 'bg-gray-100 text-gray-800'
                                    }`}>
                                        {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.joined_date}</td>
                                <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                                    <button onClick={() => handleEdit(user)} className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">Editar</button>
                                    <button onClick={() => handleDelete(user.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal de edición */}
            {editingUser && (
                <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                        <h3 className="text-xl font-bold mb-4">Editar Usuario</h3>
                        <form onSubmit={handleSave} className="space-y-4">
                            <input name="name" value={editForm.name} onChange={e => setEditForm({ ...editForm, name: e.target.value })} className="border p-2 rounded w-full" placeholder="Nombre" required />
                            <input name="email" value={editForm.email} onChange={e => setEditForm({ ...editForm, email: e.target.value })} className="border p-2 rounded w-full" placeholder="Email" required />
                            <select name="role" value={editForm.role} onChange={e => setEditForm({ ...editForm, role: e.target.value })} className="border p-2 rounded w-full" required>
                                <option value="Admin">Admin</option>
                                <option value="Moderador">Moderador</option>
                                <option value="Cliente">Cliente</option>
                            </select>
                            <select name="status" value={editForm.status} onChange={e => setEditForm({ ...editForm, status: e.target.value })} className="border p-2 rounded w-full" required>
                                <option value="Activo">Activo</option>
                                <option value="Inactivo">Inactivo</option>
                            </select>
                            <div className="flex gap-2 justify-end">
                                <button type="button" onClick={closeModal} className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
                                <button type="submit" disabled={saving} className="px-4 py-2 rounded bg-purple-600 text-white hover:bg-purple-700">{saving ? 'Guardando...' : 'Guardar'}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
};

export default UsersSection;