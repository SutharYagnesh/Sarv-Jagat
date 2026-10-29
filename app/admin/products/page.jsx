'use client';

import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Copy, Search, ExternalLink, GripVertical, ArrowUp, ArrowDown, Check, Tags, RefreshCw } from 'lucide-react';
import Link from 'next/link';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [draggedIdx, setDraggedIdx] = useState(null);
  const [reordering, setReordering] = useState(false);
  const [reorderMessage, setReorderMessage] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      if (res.ok) {
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to load categories', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await fetch(`/api/admin/products${search ? `?search=${encodeURIComponent(search)}` : ''}`);
      const data = await res.json();
      setProducts(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchProducts();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [search]);

  // Filter products by selected category
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'ALL') return true;
    return p.category === selectedCategory;
  });

  // Calculate count per category
  const getCategoryCount = (categoryName) => {
    return products.filter((p) => p.category === categoryName).length;
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDuplicate = async (product) => {
    try {
      const duplicateData = { ...product };
      delete duplicateData._id;
      delete duplicateData.createdAt;
      delete duplicateData.updatedAt;
      duplicateData.title = `${duplicateData.title} (Copy)`;
      duplicateData.slug = `${duplicateData.slug}-copy-${Date.now()}`;
      duplicateData.status = 'Draft';

      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(duplicateData),
      });
      if (res.ok) fetchProducts();
    } catch (error) {
      console.error(error);
    }
  };

  // Save new ordering
  const saveNewOrder = async (newList) => {
    setReordering(true);
    setReorderMessage('');

    // Update local state immediately for snappy UX
    const updatedIds = newList.map((item, index) => ({ id: item._id, order: index }));

    // Merge into products array
    setProducts((prev) => {
      const map = new Map(updatedIds.map((u) => [u.id, u.order]));
      const next = prev.map((p) => (map.has(p._id) ? { ...p, order: map.get(p._id) } : p));
      return next.sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    try {
      const res = await fetch('/api/admin/products/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items: updatedIds }),
      });

      if (res.ok) {
        setReorderMessage('Display order saved!');
        setTimeout(() => setReorderMessage(''), 3000);
      }
    } catch (err) {
      console.error('Failed to save reorder', err);
    } finally {
      setReordering(false);
    }
  };

  // Drag and drop handlers
  const handleDragStart = (idx) => {
    setDraggedIdx(idx);
  };

  const handleDragOver = (e, idx) => {
    e.preventDefault();
  };

  const handleDrop = (e, targetIdx) => {
    e.preventDefault();
    if (draggedIdx === null || draggedIdx === targetIdx) return;

    const list = [...filteredProducts];
    const [draggedItem] = list.splice(draggedIdx, 1);
    list.splice(targetIdx, 0, draggedItem);

    setDraggedIdx(null);
    saveNewOrder(list);
  };

  // Move Up / Down button handlers
  const moveItem = (index, direction) => {
    const targetIndex = index + direction;
    if (targetIndex < 0 || targetIndex >= filteredProducts.length) return;

    const list = [...filteredProducts];
    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    saveNewOrder(list);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products Catalog</h1>
          <p className="text-sm text-gray-500 mt-1">
            Organize, edit, and reorder products category-wise. Drag &amp; drop to change exact display sequence on the website.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {reorderMessage && (
            <span className="text-xs bg-green-100 text-green-800 px-3 py-1.5 rounded-full font-medium flex items-center gap-1 animate-fade-in">
              <Check className="w-3.5 h-3.5 text-green-600" />
              {reorderMessage}
            </span>
          )}
          <Link
            href={
              selectedCategory !== 'ALL'
                ? `/admin/products/new?category=${encodeURIComponent(selectedCategory)}`
                : '/admin/products/new'
            }
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium shadow-sm transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            {selectedCategory !== 'ALL' ? `Add in ${selectedCategory}` : 'Add New Product'}
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
              selectedCategory === 'ALL'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
            }`}
          >
            <span>All Products</span>
            <span
              className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                selectedCategory === 'ALL' ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
              }`}
            >
              {products.length}
            </span>
          </button>

          {categories.map((cat) => {
            const count = getCategoryCount(cat.name);
            const isSelected = selectedCategory === cat.name;
            return (
              <button
                key={cat._id}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 ${
                  isSelected
                    ? 'bg-red-600 text-white shadow-sm'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <span>{cat.name}</span>
                <span
                  className={`px-1.5 py-0.5 rounded-full text-[10px] ${
                    isSelected ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Search & Active Category Bar */}
        <div className="p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or model number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>Showing: <strong>{filteredProducts.length}</strong> products</span>
            <span className="text-gray-300">|</span>
            <span className="text-slate-600">Tip: Drag rows with the handle (⋮⋮) to reorder</span>
          </div>
        </div>

        {loading ? (
          <div className="p-16 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
            <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
            <p className="text-sm">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="p-16 text-center text-gray-500 space-y-3">
            <p className="text-base font-medium">No products found in this category.</p>
            <p className="text-xs text-gray-400">Click &quot;Add in {selectedCategory}&quot; to create the first product.</p>
            {selectedCategory !== 'ALL' && (
              <Link
                href={`/admin/products/new?category=${encodeURIComponent(selectedCategory)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-medium hover:bg-red-700"
              >
                <Plus className="w-4 h-4" />
                Add Product in {selectedCategory}
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/80">
                <tr>
                  <th className="px-3 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">
                    Order
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Product
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Model No
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Power / Pressure
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product, idx) => (
                  <tr
                    key={product._id}
                    draggable
                    onDragStart={() => handleDragStart(idx)}
                    onDragOver={(e) => handleDragOver(e, idx)}
                    onDrop={(e) => handleDrop(e, idx)}
                    className={`hover:bg-red-50/20 transition-colors ${
                      draggedIdx === idx ? 'opacity-40 bg-gray-100' : ''
                    }`}
                  >
                    {/* Drag Handle & Order Controls */}
                    <td className="px-3 py-4 whitespace-nowrap text-center">
                      <div className="flex items-center justify-center gap-1 text-gray-400">
                        <span className="cursor-grab hover:text-red-600 p-1 rounded" title="Drag to reorder">
                          <GripVertical className="w-4 h-4" />
                        </span>
                        <div className="flex flex-col gap-0.5">
                          <button
                            type="button"
                            onClick={() => moveItem(idx, -1)}
                            disabled={idx === 0}
                            className="text-gray-400 hover:text-gray-700 disabled:opacity-20"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItem(idx, 1)}
                            disabled={idx === filteredProducts.length - 1}
                            className="text-gray-400 hover:text-gray-700 disabled:opacity-20"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </td>

                    {/* Product Name & Image */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {product.images && product.images[0] ? (
                          <img
                            src={product.images[0]}
                            alt=""
                            className="h-10 w-10 rounded-lg object-cover border border-gray-200 bg-white"
                          />
                        ) : (
                          <div className="h-10 w-10 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs">
                            No img
                          </div>
                        )}
                        <div className="ml-3">
                          <div className="text-sm font-semibold text-gray-900 max-w-[240px] truncate">
                            {product.title}
                          </div>
                          <div className="text-xs text-gray-400">{product.slug}</div>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600 max-w-[180px] truncate">
                      {product.category}
                    </td>

                    {/* Model Number */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs font-mono text-gray-600">
                      {product.modelNumber || '-'}
                    </td>

                    {/* Power / Pressure */}
                    <td className="px-6 py-4 whitespace-nowrap text-xs text-gray-600">
                      {product.powerRating ? `${product.powerRating} HP` : ''}{' '}
                      {product.pressureRating ? `| ${product.pressureRating} Bar` : ''}
                    </td>

                    {/* Status */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2.5 py-1 inline-flex text-xs font-semibold rounded-full ${
                          product.status === 'Published'
                            ? 'bg-green-100 text-green-800'
                            : product.status === 'Draft'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {product.status || 'Draft'}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          href={`/products/${product.slug}`}
                          target="_blank"
                          className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded"
                          title="View Live Page"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDuplicate(product)}
                          className="p-1.5 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                          title="Duplicate"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <Link
                          href={`/admin/products/${product._id}/edit`}
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(product._id)}
                          className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
