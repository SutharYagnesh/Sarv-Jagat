'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Globe, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default function CategoriesPage() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('general'); // 'general' | 'seo'
  const [formData, setFormData] = useState({
    id: null,
    name: '',
    slug: '',
    order: 0,
    description: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
  });

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleOpenModal = (category = null) => {
    if (category) {
      const keywordsStr = Array.isArray(category.seoKeywords)
        ? category.seoKeywords.join(', ')
        : (category.seoKeywords || '');

      setFormData({
        id: category._id,
        name: category.name || '',
        slug: category.slug || '',
        order: category.order || 0,
        description: category.description || '',
        seoTitle: category.seoTitle || '',
        seoDescription: category.seoDescription || '',
        seoKeywords: keywordsStr,
      });
    } else {
      setFormData({
        id: null,
        name: '',
        slug: '',
        order: categories.length ? Math.max(...categories.map(c => c.order || 0)) + 1 : 1,
        description: '',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
      });
    }
    setActiveTab('general');
    setIsModalOpen(true);
  };

  const handleNameChange = (e) => {
    const name = e.target.value;
    const generatedSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    
    // Auto-update slug and default SEO if it's a new category or SEO title was not manually edited
    setFormData(prev => ({
      ...prev,
      name,
      slug: prev.id ? prev.slug : generatedSlug,
      seoTitle: prev.id ? prev.seoTitle : (name ? `${name} | Sarv Jagat - SJ` : ''),
      seoDescription: prev.id ? prev.seoDescription : (name ? `Leading manufacturers, exporters and wholesale suppliers of premium ${name}. Energy-efficient industrial air compressor solutions by Sarv Jagat - SJ.` : ''),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!formData.id;
    const url = isEdit ? `/api/admin/categories/${formData.id}` : '/api/admin/categories';
    const method = isEdit ? 'PUT' : 'POST';

    // Parse keywords into clean array
    const keywordsArray = formData.seoKeywords
      ? formData.seoKeywords.split(',').map(k => k.trim()).filter(Boolean)
      : [];

    const payload = {
      name: formData.name.trim(),
      slug: formData.slug.trim(),
      order: Number(formData.order) || 0,
      description: formData.description.trim(),
      seoTitle: formData.seoTitle.trim() || `${formData.name.trim()} | Sarv Jagat - SJ`,
      seoDescription: formData.seoDescription.trim() || (formData.description.trim() || `Leading manufacturers, exporters and wholesale suppliers of premium ${formData.name.trim()}. Industrial air solutions by Sarv Jagat - SJ.`),
      seoKeywords: keywordsArray,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchCategories();
      } else {
        const err = await res.json();
        alert(`Failed to save category: ${err.error || 'Unknown error'}`);
      }
    } catch (error) {
      alert('Error saving category');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/admin/categories/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCategories();
      } else {
        alert('Failed to delete category');
      }
    } catch (error) {
      alert('Error deleting category');
    }
  };

  // Live preview helpers
  const previewTitle = formData.seoTitle || (formData.name ? `${formData.name} | Sarv Jagat - SJ` : 'Category Title | Sarv Jagat - SJ');
  const previewDesc = formData.seoDescription || formData.description || (formData.name ? `Leading manufacturers, exporters and wholesale suppliers of premium ${formData.name}. High efficiency industrial air compressor solutions by Sarv Jagat - SJ.` : 'Meta description will appear here for Google search snippets.');
  const previewSlug = formData.slug || 'category-slug';

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Product Categories</h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage product categories, display order, and live Google SEO metadata.
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center justify-center gap-2 transition-colors shadow-sm font-medium"
        >
          <Plus className="w-4 h-4" /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading categories...</div>
        ) : categories.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No categories found. Click Add Category to create one.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider w-16">Order</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Category Name</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">URL Slug</th>
                  <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Google SEO Status</th>
                  <th className="px-6 py-3 text-right text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {categories.map((category) => (
                  <tr key={category._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-600 font-semibold">
                      #{category.order || 0}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-semibold text-gray-900">{category.name}</div>
                      {category.description && (
                        <div className="text-xs text-gray-500 max-w-xs truncate">{category.description}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-mono">
                      /products/category/{category.slug}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {category.seoTitle && category.seoDescription ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Fully Optimized
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
                          <Sparkles className="w-3.5 h-3.5" /> Auto-Generated
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right space-x-3">
                      <Link
                        href={`/products/category/${category.slug}`}
                        target="_blank"
                        className="text-gray-400 hover:text-gray-600 inline-block"
                        title="View Live Category Page"
                      >
                        <ExternalLink className="w-4 h-4 inline" />
                      </Link>
                      <button
                        onClick={() => handleOpenModal(category)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Edit Category & SEO"
                      >
                        <Edit2 className="w-4 h-4 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="text-red-600 hover:text-red-900"
                        title="Delete Category"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Add / Edit Category with SEO Controls */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full my-8 overflow-hidden flex flex-col max-h-[90vh]">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 flex-shrink-0">
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {formData.id ? 'Edit Category & SEO' : 'Create New Category'}
                </h3>
                <p className="text-xs text-gray-500 mt-0.5">
                  Changes automatically update the live website navigation, pages, and Google metadata.
                </p>
              </div>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex border-b border-gray-200 px-6 bg-white flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('general')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${
                  activeTab === 'general'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                General Info
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('seo')}
                className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors flex items-center gap-1.5 ${
                  activeTab === 'seo'
                    ? 'border-red-600 text-red-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                <Globe className="w-4 h-4" /> Google SEO & Metadata
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {activeTab === 'general' ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleNameChange}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      placeholder="e.g. Screw Air Compressors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        URL Slug <span className="text-red-500">*</span>
                      </label>
                      <div className="flex rounded-md shadow-sm">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs font-mono">
                          /products/category/
                        </span>
                        <input
                          type="text"
                          required
                          value={formData.slug}
                          onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                          className="w-full px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 font-mono text-sm"
                          placeholder="screw-air-compressors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Display Order</label>
                      <input
                        type="number"
                        value={formData.order}
                        onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                        className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                        placeholder="1"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Category Overview / Description
                    </label>
                    <textarea
                      rows={4}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
                      placeholder="Comprehensive overview of this category. Displayed directly at the top of the category page for visitors and Google crawlers."
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Google Search Snippet Preview */}
                  <div className="bg-slate-50 border border-slate-200 rounded-lg p-4">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                      <Globe className="w-3.5 h-3.5 text-blue-600" /> Google Search Result Preview
                    </div>
                    <div className="bg-white p-3 rounded border border-gray-200 space-y-1">
                      <div className="text-xs text-emerald-800 font-medium truncate">
                        https://www.sarvjagat.com › products › category › {previewSlug}
                      </div>
                      <div className="text-base text-blue-700 font-medium hover:underline cursor-pointer truncate">
                        {previewTitle}
                      </div>
                      <div className="text-xs text-gray-600 line-clamp-2 leading-relaxed">
                        {previewDesc}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">SEO Meta Title</label>
                      <span className={`text-xs ${formData.seoTitle.length > 60 ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>
                        {formData.seoTitle.length} / 60 characters
                      </span>
                    </div>
                    <input
                      type="text"
                      value={formData.seoTitle}
                      onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      placeholder="e.g. Screw Air Compressors | Sarv Jagat - SJ"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Recommended 50-60 characters. Appears as the headline link in Google search results.
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700">SEO Meta Description</label>
                      <span className={`text-xs ${formData.seoDescription.length > 160 ? 'text-amber-600 font-semibold' : 'text-gray-400'}`}>
                        {formData.seoDescription.length} / 160 characters
                      </span>
                    </div>
                    <textarea
                      rows={3}
                      value={formData.seoDescription}
                      onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
                      placeholder="e.g. Leading manufacturers, exporters and wholesale suppliers of premium Screw Air Compressors. High efficiency industrial solutions by Sarv Jagat - SJ."
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Recommended 140-160 characters. Appears under the title link in Google search results.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">SEO Keywords</label>
                    <input
                      type="text"
                      value={formData.seoKeywords}
                      onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })}
                      className="w-full px-3.5 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 text-sm"
                      placeholder="e.g. screw air compressor, rotary compressor, industrial compressor, Sarv Jagat"
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Comma-separated list of target search terms.
                    </p>
                  </div>
                </div>
              )}

              {/* Modal Footer */}
              <div className="pt-4 border-t border-gray-100 flex justify-end gap-3 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors font-medium text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-medium text-sm shadow-sm"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
