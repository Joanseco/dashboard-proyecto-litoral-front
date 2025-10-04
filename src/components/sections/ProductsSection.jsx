import React, { useState, useEffect } from 'react';

const API_BASE_URL = 'https://dashboard-proyecto-litoral-backend.onrender.com/api';

const ProductsSection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: '', price: '', stock: '' });
  const [creating, setCreating] = useState(false);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/products`);
      if (!response.ok) throw new Error('Error al cargar productos');
      const data = await response.json();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError('No se pudieron cargar los productos.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      let response;
      if (editingId) {
        // Editar producto
        response = await fetch(`${API_BASE_URL}/products/${editingId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error('Error al editar producto');
      } else {
        // Crear producto
        response = await fetch(`${API_BASE_URL}/products`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        });
        if (!response.ok) throw new Error('Error al crear producto');
      }
      setForm({ name: '', price: '', stock: '' });
      setEditingId(null);
      fetchProducts();
    } catch (err) {
      setError(editingId ? 'No se pudo editar el producto.' : 'No se pudo crear el producto.');
    } finally {
      setCreating(false);
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, stock: product.stock });
    setEditingId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar este producto?')) return;
    try {
      const response = await fetch(`${API_BASE_URL}/products/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Error al eliminar producto');
      fetchProducts();
    } catch (err) {
      setError('No se pudo eliminar el producto.');
    }
  };

  if (loading) {
    return <div className="p-6 text-center text-gray-600">Cargando productos...</div>;
  }
  if (error) {
    return <div className="p-6 text-center text-red-600 bg-red-100 border border-red-400 rounded-lg">❌ {error}</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold mb-4">Gestión de Productos</h2>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow flex flex-col md:flex-row gap-4 items-end">
        <input name="name" value={form.name} onChange={handleChange} placeholder="Nombre" required className="border p-2 rounded w-full md:w-1/3" />
        <input name="price" value={form.price} onChange={handleChange} placeholder="Precio" required type="number" min="0" className="border p-2 rounded w-full md:w-1/4" />
        <input name="stock" value={form.stock} onChange={handleChange} placeholder="Stock" required type="number" min="0" className="border p-2 rounded w-full md:w-1/4" />
        <button type="submit" disabled={creating} className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700">
          {creating ? (editingId ? 'Editando...' : 'Creando...') : (editingId ? 'Guardar Cambios' : 'Crear Producto')}
        </button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ name: '', price: '', stock: '' }); }} className="ml-2 px-4 py-2 rounded bg-gray-300 hover:bg-gray-400">Cancelar</button>
        )}
      </form>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Nombre</th>
              <th className="py-2 px-4 text-left">Precio</th>
              <th className="py-2 px-4 text-left">Stock</th>
              <th className="py-2 px-4 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr><td colSpan={3} className="text-center py-4">No hay productos registrados.</td></tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4">{product.stock}</td>
                  <td className="py-2 px-4 flex gap-2">
                    <button onClick={() => handleEdit(product)} className="px-2 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500">Editar</button>
                    <button onClick={() => handleDelete(product.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Eliminar</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductsSection;
