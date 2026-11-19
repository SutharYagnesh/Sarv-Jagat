'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Search,
  ExternalLink,
  GripVertical,
  ArrowUp,
  ArrowDown,
  Check,
  RefreshCw,
  SlidersHorizontal,
  Package,
} from 'lucide-react';
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
  const [cloningId, setCloningId] = useState(null);
  const [notification, setNotification] = useState(null); // { type: 'success' | 'error', text: '', editId: null }

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

  const handleDelete = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || 'this product'}"?`)) return;
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setNotification({ type: 'success', text: `Product deleted successfully.` });
        fetchProducts();
        setTimeout(() => setNotification(null), 4000);
      }
    } catch (error) {
      console.error(error);
      setNotification({ type: 'error', text: 'Failed to delete product.' });
    }
  };

  // Dedicated reliable server-side cloning
  const handleDuplicate = async (product) => {
    setCloningId(product._id);
    setNotification(null);
    try {
      const res = await fetch(`/api/admin/products/${product._id}/clone`, {
        method: 'POST',
      });

      if (res.ok) {
        const cloned = await res.json();
        setNotification({
          type: 'success',
          text: `✓ Cloned "${product.title}" as "${cloned.title}"!`,
          editId: cloned._id,
        });
        await fetchProducts();
        setTimeout(() => setNotification(null), 8000);
      } else {
        const err = await res.json().catch(() => ({}));
        setNotification({
          type: 'error',
          text: `Failed to clone product: ${err.error || 'Server error'}`,
        });
      }
    } catch (error) {
      console.error(error);
      setNotification({ type: 'error', text: 'Network error while cloning product.' });
    } finally {
      setCloningId(null);
    }
  };

  // Save new ordering
  const saveNewOrder = async (newList) => {
    setReordering(true);
    setReorderMessage('');

    // Update local state immediately for snappy UX
    const updatedIds = newList.map((item, index) => ({ id: item._id, order: index }));

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

  const handleDragOver = (e) => {
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

  // Move Up / Down button handlers (Touch & mobile friendly)
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
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Package className="w-6 h-6 text-red-600" />
            Products Catalog
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Organize, edit, clone, and reorder products category-wise. Drag &amp; drop or use Up/Down arrows to set sequence.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
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
            className="w-full sm:w-auto bg-red-600 text-white px-4 py-2.5 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2 font-medium shadow-sm transition-colors text-sm"
          >
            <Plus className="w-4 h-4" />
            {selectedCategory !== 'ALL' ? `Add in ${selectedCategory}` : 'Add New Product'}
          </Link>
        </div>
      </div>

      {/* Notifications */}
      {notification && (
        <div
          className={`p-3 sm:p-4 rounded-xl border text-sm flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-sm animate-fade-in ${
            notification.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-900'
              : 'bg-red-50 border-red-200 text-red-900'
          }`}
        >
          <div className="flex items-center gap-2 font-medium">
            <Check className="w-4 h-4 text-green-600 shrink-0" />
            <span>{notification.text}</span>
          </div>
          {notification.editId && (
            <Link
              href={`/admin/products/${notification.editId}/edit`}
              className="text-xs font-bold text-blue-700 hover:text-blue-900 underline flex items-center gap-1 self-start sm:self-auto"
            >
              <span>Edit Cloned Product</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          )}
        </div>
      )}

      {/* Category Tabs - Mobile Touch Scroll Friendly */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-2">
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1 scroll-smooth">
          <button
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
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
                className={`px-3.5 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 ${
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

      {/* Main Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Search & Stats Bar */}
        <div className="p-3 sm:p-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-gray-50/50">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by title or model number..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span>
              Showing: <strong>{filteredProducts.length}</strong> products
            </span>
            <span className="hidden sm:inline text-gray-300">|</span>
            <span className="text-slate-600">Drag handle (⋮⋮) or use (⬆ / ⬇) to reorder</span>
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
          <div className="p-3 sm:p-4 space-y-3">
            {filteredProducts.map((product, idx) => {
              const productImg = (product.images && product.images[0]) || product.image;
              return (
                <div
                  key={product._id}
                  draggable
                  onDragStart={() => handleDragStart(idx)}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDrop(e, idx)}
                  className={`transition-all border border-gray-200 rounded-xl shadow-xs hover:shadow-md p-3 sm:p-4 bg-white ${
                    draggedIdx === idx ? 'opacity-40 bg-gray-100' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                    {/* Left Section: Drag Handle + Thumbnail + Product Details */}
                    <div className="flex items-start gap-3 flex-1 min-w-0">
                      {/* Drag Handle & Up/Down Arrows */}
                      <div className="flex sm:flex-col items-center justify-center gap-1 text-gray-400 shrink-0 pt-1">
                        <span
                          className="cursor-grab active:cursor-grabbing hover:text-red-600 p-1 rounded"
                          title="Drag to reorder"
                        >
                          <GripVertical className="w-4 h-4" />
                        </span>
                        <div className="flex sm:flex-col gap-0.5">
                          <button
                            type="button"
                            onClick={() => moveItem(idx, -1)}
                            disabled={idx === 0}
                            className="text-gray-400 hover:text-gray-700 disabled:opacity-20 p-1 sm:p-0.5 rounded"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveItem(idx, 1)}
                            disabled={idx === filteredProducts.length - 1}
                            className="text-gray-400 hover:text-gray-700 disabled:opacity-20 p-1 sm:p-0.5 rounded"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Thumbnail Image */}
                      {productImg ? (
                        <img
                          src={productImg}
                          alt=""
                          className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg object-contain border border-gray-200 bg-white shrink-0 p-1"
                        />
                      ) : (
                        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg bg-gray-100 flex items-center justify-center border border-gray-200 text-gray-400 text-xs shrink-0">
                          No img
                        </div>
                      )}

                      {/* Product Details */}
                      <div className="flex-1 min-w-0 space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900 leading-snug">
                            {product.title}
                          </h3>
                          <span
                            className={`px-2 py-0.5 text-[10px] font-semibold rounded-full shrink-0 ${
                              product.status === 'Published'
                                ? 'bg-green-100 text-green-800'
                                : product.status === 'Draft'
                                ? 'bg-yellow-100 text-yellow-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}
                          >
                            {product.status || 'Draft'}
                          </span>
                          {product.category && (
                            <span className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md font-medium">
                              {product.category}
                            </span>
                          )}
                        </div>

                        {/* Specs row */}
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-600">
                          {product.modelNumber && (
                            <span className="font-mono bg-gray-100 px-1.5 py-0.5 rounded text-[11px] font-semibold">
                              {product.modelNumber}
                            </span>
                          )}
                          {product.powerRating && (
                            <span className="bg-red-50 text-red-700 px-1.5 py-0.5 rounded text-[11px] font-medium">
                              {product.powerRating} HP
                            </span>
                          )}
                          {product.pressureRating && (
                            <span className="bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded text-[11px] font-medium">
                              {product.pressureRating} Bar
                            </span>
                          )}
                          {product.airFlow && (
                            <span className="bg-amber-50 text-amber-800 px-1.5 py-0.5 rounded text-[11px] font-medium">
                              {product.airFlow} CFM
                            </span>
                          )}
                          <span className="text-gray-400 text-[11px] truncate max-w-[200px]" title={product.slug}>
                            /{product.slug}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right Section: Actions */}
                    <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-2 sm:pt-0 w-full sm:w-auto justify-end">
                      <Link
                        href={`/products/${product.slug}`}
                        target="_blank"
                        className="p-1.5 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg border border-gray-200 transition-colors"
                        title="View Live Page"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </Link>

                      {/* Clone Button */}
                      <button
                        type="button"
                        onClick={() => handleDuplicate(product)}
                        disabled={cloningId === product._id}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg disabled:opacity-50 transition-colors"
                        title="Duplicate/Clone this product"
                      >
                        {cloningId === product._id ? (
                          <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                        <span>Clone</span>
                      </button>

                      {/* Edit Button */}
                      <Link
                        href={`/admin/products/${product._id}/edit`}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 border border-indigo-200 rounded-lg transition-colors"
                        title="Edit Product"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                        <span>Edit</span>
                      </Link>

                      {/* Delete Button */}
                      <button
                        type="button"
                        onClick={() => handleDelete(product._id, product.title)}
                        className="p-1.5 text-red-600 hover:text-red-800 hover:bg-red-50 border border-red-200 rounded-lg transition-colors"
                        title="Delete Product"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
