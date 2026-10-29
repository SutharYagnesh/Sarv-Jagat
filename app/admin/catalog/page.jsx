'use client';

import { useState, useEffect } from 'react';
import { BookOpen, Plus, Edit2, Trash2, Download, Star, CheckCircle2, AlertCircle, X, ExternalLink, RefreshCw } from 'lucide-react';

export default function AdminCatalogPage() {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    category: 'Complete Range',
    pdfUrl: '',
    description: '',
    fileSize: '5.0 MB',
    pages: 20,
    isComprehensive: false,
    order: 0,
    status: 'Published',
  });

  const fetchCatalogs = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/catalog');
      if (res.ok) {
        const data = await res.json();
        setCatalogs(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to fetch catalogs');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCatalogs();
  }, []);

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const data = new FormData();
      data.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: data,
      });

      if (res.ok) {
        const json = await res.json();
        setFormData((prev) => ({
          ...prev,
          pdfUrl: json.url,
          fileSize: json.size || `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
          title: prev.title || file.name.replace(/\.[^/.]+$/, ''),
        }));
      } else {
        alert('Failed to upload file to database');
      }
    } catch (err) {
      alert('Error uploading file');
    } finally {
      setUploading(false);
    }
  };

  const handleOpenModal = (cat = null) => {
    if (cat) {
      setFormData({
        id: cat._id,
        title: cat.title,
        category: cat.category || 'Complete Range',
        pdfUrl: cat.pdfUrl,
        description: cat.description || '',
        fileSize: cat.fileSize || '5.0 MB',
        pages: cat.pages || 0,
        isComprehensive: Boolean(cat.isComprehensive),
        order: cat.order || 0,
        status: cat.status || 'Published',
      });
    } else {
      setFormData({
        id: null,
        title: '',
        category: 'Complete Range',
        pdfUrl: '',
        description: '',
        fileSize: '5.0 MB',
        pages: 20,
        isComprehensive: false,
        order: catalogs.length,
        status: 'Published',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage('');
    setError('');

    const isEdit = Boolean(formData.id);
    const url = isEdit ? `/api/admin/catalog/${formData.id}` : '/api/admin/catalog';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setMessage(isEdit ? 'Catalog updated successfully!' : 'New catalog added successfully!');
        setIsModalOpen(false);
        fetchCatalogs();
        setTimeout(() => setMessage(''), 4000);
      } else {
        const d = await res.json();
        setError(d.error || 'Failed to save catalog');
      }
    } catch (err) {
      console.error(err);
      setError('Error communicating with server');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this catalog PDF?')) return;
    try {
      const res = await fetch(`/api/admin/catalog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Catalog removed successfully');
        fetchCatalogs();
        setTimeout(() => setMessage(''), 4000);
      } else {
        alert('Failed to delete catalog');
      }
    } catch (err) {
      alert('Error deleting catalog');
    }
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <BookOpen className="w-7 h-7 text-red-600" />
            PDF Catalogs Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Upload and control specific product catalogs and technical brochures shown on{' '}
            <a href="/catalog" target="_blank" className="text-red-600 hover:underline">
              https://www.sarvjagat.com/catalog
            </a>
          </p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all"
        >
          <Plus className="w-5 h-5" />
          Add New Catalog PDF
        </button>
      </div>

      {/* Notifications */}
      {message && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-sm font-medium">{error}</p>
        </div>
      )}

      {/* List */}
      {loading ? (
        <div className="p-12 text-center text-gray-500 flex flex-col items-center justify-center gap-2">
          <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
          <p>Loading catalogs...</p>
        </div>
      ) : catalogs.length === 0 ? (
        <div className="bg-white border rounded-xl p-12 text-center space-y-3">
          <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto">
            <BookOpen className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">No Catalogs Uploaded Yet</h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            No PDF catalogs have been added yet. Click &quot;Add New Catalog PDF&quot; above to add specific equipment brochures and mark one as the Comprehensive Main Catalog.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((item) => (
            <div
              key={item._id}
              className={`bg-white border rounded-xl p-5 shadow-sm space-y-4 relative flex flex-col justify-between ${
                item.isComprehensive ? 'ring-2 ring-red-500 bg-red-50/10' : ''
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                    {item.category}
                  </span>
                  {item.isComprehensive && (
                    <span className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-red-600" />
                      Comprehensive Main PDF
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 text-lg leading-snug">{item.title}</h3>
                {item.description && <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>}

                <div className="flex items-center gap-4 text-xs text-gray-500 pt-2 border-t">
                  <span>Pages: <strong>{item.pages || '-'}</strong></span>
                  <span>Size: <strong>{item.fileSize || 'PDF'}</strong></span>
                  <span>Status: <strong className={item.status === 'Published' ? 'text-green-600' : 'text-gray-500'}>{item.status}</strong></span>
                </div>
              </div>

              <div className="pt-4 border-t flex items-center justify-between gap-2">
                <a
                  href={item.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-800 font-medium"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Open PDF
                </a>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleOpenModal(item)}
                    className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-gray-900 text-lg">
                {formData.id ? 'Edit Catalog PDF' : 'Add New Catalog PDF'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Catalog Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Product Catalog 2025"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Range / Category</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Range, Screw Compressors, Piston Compressors"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  PDF File (Direct Upload to Database OR Paste URL)
                </label>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-2 p-3 bg-gray-50 border rounded-lg">
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-red-50 file:text-red-700 hover:file:bg-red-100 cursor-pointer"
                  />
                  {uploading && (
                    <span className="text-xs text-red-600 font-medium animate-pulse">
                      Uploading to database GridFS...
                    </span>
                  )}
                </div>
                <input
                  type="text"
                  required
                  placeholder="Database URL will appear here automatically, or paste link"
                  value={formData.pdfUrl}
                  onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-xs font-mono bg-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief overview of what equipment specifications this catalog contains..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Size</label>
                  <input
                    type="text"
                    placeholder="e.g. 15.2 MB"
                    value={formData.fileSize}
                    onChange={(e) => setFormData({ ...formData, fileSize: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page Count</label>
                  <input
                    type="number"
                    placeholder="e.g. 45"
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) })}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-red-50/60 border border-red-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={formData.isComprehensive}
                    onChange={(e) => setFormData({ ...formData, isComprehensive: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block">Mark as Comprehensive Main Catalog</span>
                    <span className="text-xs text-gray-500 block">
                      This will be highlighted as the primary download banner on the catalog page.
                    </span>
                  </div>
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-sm text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50"
                >
                  {saving ? 'Saving...' : 'Save Catalog'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

