'use client';
import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, FileDown, UploadCloud } from 'lucide-react';

export default function CatalogPage() {
  const [catalogs, setCatalogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [formData, setFormData] = useState({ id: null, title: '', description: '', category: '', fileUrl: '', fileName: '', fileSize: 0, order: 0, status: 'Published' });

  const fetchCatalogs = async () => {
    try {
      const res = await fetch('/api/admin/catalog');
      const data = await res.json();
      setCatalogs(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories');
      const data = await res.json();
      setCategories(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCatalogs();
    fetchCategories();
  }, []);

  const handleOpenModal = (catalog = null) => {
    if (catalog) {
      setFormData({ 
        id: catalog._id, 
        title: catalog.title, 
        description: catalog.description || '', 
        category: catalog.category || '',
        fileUrl: catalog.fileUrl || '',
        fileName: catalog.fileName || '',
        fileSize: catalog.fileSize || 0,
        order: catalog.order || 0,
        status: catalog.status || 'Published'
      });
    } else {
      setFormData({ id: null, title: '', description: '', category: '', fileUrl: '', fileName: '', fileSize: 0, order: 0, status: 'Published' });
    }
    setIsModalOpen(true);
  };

  const uploadToBlob = async (file) => {
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);
      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });
      if (res.ok) {
        const data = await res.json();
        return data.url;
      }
    } catch (err) {
      console.error(err);
    }
    return null;
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadingMedia(true);
      const url = await uploadToBlob(file);
      if (url) {
        setFormData((prev) => ({
          ...prev,
          fileUrl: url,
          fileName: file.name,
          fileSize: file.size
        }));
      } else {
        alert("Failed to upload file");
      }
      setUploadingMedia(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isEdit = !!formData.id;
    const url = isEdit ? `/api/admin/catalog/${formData.id}` : '/api/admin/catalog';
    const method = isEdit ? 'PUT' : 'POST';

    const payload = { 
      title: formData.title, 
      description: formData.description,
      category: formData.category,
      fileUrl: formData.fileUrl,
      fileName: formData.fileName,
      fileSize: formData.fileSize,
      order: Number(formData.order),
      status: formData.status
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setIsModalOpen(false);
        fetchCatalogs();
      } else {
        alert('Failed to save catalog');
      }
    } catch (error) {
      alert('Error saving catalog');
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this catalog?')) return;
    try {
      const res = await fetch(`/api/admin/catalog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCatalogs();
      } else {
        alert('Failed to delete catalog');
      }
    } catch (error) {
      alert('Error deleting catalog');
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Catalog Management</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center gap-2 transition-colors"
        >
          <Plus className="w-4 h-4" /> Add Catalog
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Loading...</div>
        ) : catalogs.length === 0 ? (
          <div className="p-8 text-center text-gray-500">No catalogs found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {catalogs.map((catalog) => (
                <tr key={catalog._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{catalog.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{catalog.category}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <a href={catalog.fileUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 text-blue-600 hover:underline">
                      <FileDown className="w-4 h-4" />
                      {catalog.fileName}
                    </a>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${catalog.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {catalog.status || 'Published'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{catalog.order || 0}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-right">
                    <button onClick={() => handleOpenModal(catalog)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                      <Edit2 className="w-4 h-4 inline" />
                    </button>
                    <button onClick={() => handleDelete(catalog._id)} className="text-red-600 hover:text-red-900">
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 sticky top-0 z-10">
              <h3 className="text-lg font-semibold text-gray-900">
                {formData.id ? 'Edit Catalog' : 'Add Catalog'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="e.g. 2026 Product Catalog"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="">Select Category</option>
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">File Upload (PDF) *</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md relative">
                    <div className="space-y-1 text-center">
                      <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600 justify-center">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-red-600 hover:text-red-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-red-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" type="file" accept=".pdf" className="sr-only" onChange={handleFileUpload} disabled={uploadingMedia} />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                    {uploadingMedia && (
                      <div className="absolute inset-0 bg-white/80 flex items-center justify-center">
                        <span className="text-sm font-medium">Uploading...</span>
                      </div>
                    )}
                  </div>
                  {formData.fileName && (
                    <div className="mt-2 text-sm text-green-600 flex items-center gap-1">
                      <FileDown className="w-4 h-4" />
                      {formData.fileName} ({formatFileSize(formData.fileSize)})
                    </div>
                  )}
                  {!formData.fileUrl && !uploadingMedia && (
                    <div className="mt-1 text-xs text-red-500">A file is required.</div>
                  )}
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                    placeholder="Brief description of the catalog contents."
                  />
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Order</label>
                  <input
                    type="number"
                    value={formData.order}
                    onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-red-500"
                  >
                    <option value="Published">Published</option>
                    <option value="Draft">Draft</option>
                    <option value="Archived">Archived</option>
                  </select>
                </div>
              </div>
              
              <div className="pt-4 flex justify-end gap-3 sticky bottom-0 bg-white pb-2 border-t mt-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!formData.fileUrl}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:opacity-50"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
