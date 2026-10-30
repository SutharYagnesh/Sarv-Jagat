'use client';

import { useState, useEffect, useRef } from 'react';
import {
  BookOpen,
  Plus,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  AlertCircle,
  X,
  ExternalLink,
  RefreshCw,
  UploadCloud,
  FileCheck,
} from 'lucide-react';

export default function AdminCatalogPage() {
  const [catalogs, setCatalogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showManualUrl, setShowManualUrl] = useState(false);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    id: null,
    title: '',
    category: 'Complete Range',
    pdfUrl: '',
    description: '',
    fileSize: 'PDF Document',
    pages: 0,
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

  // Chunked upload to completely bypass Vercel's 4.5 MB serverless limit
  // Splits large PDFs (8MB, 12MB, 25MB+) into safe 2 MB chunks
  const uploadFileToDb = async (file) => {
    if (!file) return null;
    setUploading(true);
    setUploadProgress('Preparing upload...');
    setError('');

    const calculatedSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    const CHUNK_SIZE = 2 * 1024 * 1024; // 2 MB per chunk
    const totalChunks = Math.ceil(file.size / CHUNK_SIZE);
    const uploadId = `upload-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    try {
      let finalUrl = null;

      for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
        const start = chunkIndex * CHUNK_SIZE;
        const end = Math.min(start + CHUNK_SIZE, file.size);
        const chunkBlob = file.slice(start, end);

        const chunkFormData = new FormData();
        chunkFormData.append('uploadId', uploadId);
        chunkFormData.append('chunkIndex', String(chunkIndex));
        chunkFormData.append('totalChunks', String(totalChunks));
        chunkFormData.append('filename', file.name);
        chunkFormData.append('contentType', file.type || 'application/pdf');
        chunkFormData.append('chunk', chunkBlob);

        const percent = Math.round(((chunkIndex + 1) / totalChunks) * 100);
        setUploadProgress(
          totalChunks > 1
            ? `Uploading to database GridFS: ${percent}% (Part ${chunkIndex + 1} of ${totalChunks})...`
            : `Uploading to database GridFS: ${percent}%...`
        );

        const res = await fetch('/api/admin/upload/chunk', {
          method: 'POST',
          body: chunkFormData,
        });

        if (!res.ok) {
          const d = await res.json().catch(() => ({}));
          throw new Error(d.error || `Failed on upload part ${chunkIndex + 1}`);
        }

        const data = await res.json();
        if (data.complete) {
          finalUrl = data.url;
          setFormData((prev) => ({
            ...prev,
            pdfUrl: data.url,
            fileSize: calculatedSize,
            title: prev.title.trim()
              ? prev.title
              : file.name
                  .replace(/\.[^/.]+$/, '')
                  .replace(/[-_]+/g, ' ')
                  .replace(/\b\w/g, (c) => c.toUpperCase()),
          }));
          setUploadProgress(`✓ PDF Stored in Database (${calculatedSize}). URL Auto-Generated.`);
        }
      }

      return finalUrl;
    } catch (err) {
      console.error('Upload error:', err);
      setError(err.message || 'Error uploading PDF file to database.');
      setUploadProgress('');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setError('');

    // Pre-fill title if empty
    if (!formData.title) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]+/g, ' ')
        .replace(/\b\w/g, (c) => c.toUpperCase());
      setFormData((prev) => ({ ...prev, title: cleanName }));
    }

    // Auto-calculate size immediately
    const autoSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    setFormData((prev) => ({ ...prev, fileSize: autoSize }));

    // Auto-upload in chunks immediately
    await uploadFileToDb(file);
  };

  const handleOpenModal = (cat = null) => {
    setError('');
    setSelectedFile(null);
    setUploadProgress('');
    setShowManualUrl(false);

    if (cat) {
      setFormData({
        id: cat._id,
        title: cat.title,
        category: cat.category || 'Complete Range',
        pdfUrl: cat.pdfUrl,
        description: cat.description || '',
        fileSize: cat.fileSize || 'PDF Document',
        pages: cat.pages || 0,
        isComprehensive: Boolean(cat.isComprehensive),
        order: cat.order || 0,
        status: cat.status || 'Published',
      });
      setShowManualUrl(Boolean(cat.pdfUrl && !cat.pdfUrl.startsWith('/api/media')));
    } else {
      setFormData({
        id: null,
        title: '',
        category: 'Complete Range',
        pdfUrl: '',
        description: '',
        fileSize: 'PDF Document',
        pages: 0,
        isComprehensive: false,
        order: catalogs.length,
        status: 'Published',
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');

    let finalPdfUrl = formData.pdfUrl;

    // If file was selected but not uploaded yet, upload now
    if (!finalPdfUrl && selectedFile) {
      setSaving(true);
      finalPdfUrl = await uploadFileToDb(selectedFile);
      if (!finalPdfUrl) {
        setSaving(false);
        setError('Please wait for the PDF to upload or try selecting the file again.');
        return;
      }
    }

    if (!finalPdfUrl) {
      setError('Please choose a PDF file to upload.');
      return;
    }

    setSaving(true);
    const payload = {
      ...formData,
      pdfUrl: finalPdfUrl,
    };

    const isEdit = Boolean(formData.id);
    const url = isEdit ? `/api/admin/catalog/${formData.id}` : '/api/admin/catalog';
    const method = isEdit ? 'PUT' : 'POST';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage(isEdit ? 'Catalog updated successfully!' : 'New catalog added successfully!');
        setIsModalOpen(false);
        fetchCatalogs();
        setTimeout(() => setMessage(''), 4000);
      } else {
        const d = await res.json().catch(() => ({}));
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
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-sm font-medium">{message}</p>
        </div>
      )}
      {error && !isModalOpen && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2 animate-fade-in">
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
            No PDF catalogs have been added yet. Click &quot;Add New Catalog PDF&quot; above to upload your equipment brochures. One can be marked as the Comprehensive Main Catalog.
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
                  {item.pages > 0 && (
                    <span>
                      Pages: <strong>{item.pages}</strong>
                    </span>
                  )}
                  <span>
                    Size: <strong>{item.fileSize || 'PDF Document'}</strong>
                  </span>
                  <span>
                    Status:{' '}
                    <strong className={item.status === 'Published' ? 'text-green-600' : 'text-gray-500'}>
                      {item.status}
                    </strong>
                  </span>
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden animate-fade-in max-h-[90vh] flex flex-col">
            <div className="px-6 py-4 border-b flex items-center justify-between shrink-0">
              <h3 className="font-bold text-gray-900 text-lg">
                {formData.id ? 'Edit Catalog PDF' : 'Add New Catalog PDF'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-2 text-xs">
                  <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* 1. PDF File Upload Area (Chunked Database Upload) */}
              <div>
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Catalog PDF File <span className="text-red-500">*</span>
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                    formData.pdfUrl
                      ? 'border-green-300 bg-green-50/40 hover:bg-green-50'
                      : 'border-gray-300 bg-gray-50 hover:bg-gray-100 hover:border-red-400'
                  }`}
                >
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {uploading ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-2">
                      <RefreshCw className="w-7 h-7 text-red-600 animate-spin" />
                      <span className="text-xs font-semibold text-red-600">
                        {uploadProgress || 'Uploading in chunks to database...'}
                      </span>
                    </div>
                  ) : formData.pdfUrl ? (
                    <div className="flex flex-col items-center justify-center gap-2 py-1">
                      <div className="w-10 h-10 rounded-full bg-green-100 text-green-700 flex items-center justify-center">
                        <FileCheck className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-green-800">
                          {selectedFile ? selectedFile.name : 'PDF Attached'}
                        </p>
                        <p className="text-[11px] text-green-600 mt-0.5">
                          ✓ Stored in Database &bull; Size: {formData.fileSize} (Auto-Calculated)
                        </p>
                      </div>
                      <div className="flex items-center gap-3 pt-1">
                        <a
                          href={formData.pdfUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-medium"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          Test Preview PDF
                        </a>
                        <span className="text-xs text-gray-400">|</span>
                        <span className="text-xs text-red-600 font-medium hover:underline">
                          Change File
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-2 py-3">
                      <div className="w-10 h-10 rounded-full bg-red-50 text-red-600 flex items-center justify-center">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-700">
                          Click to select and upload PDF
                        </p>
                        <p className="text-xs text-gray-500">
                          Supports 8 MB, 12 MB, 25 MB+ (Uploaded safely in chunks to database)
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {uploadProgress && !uploading && (
                  <p className="text-xs text-green-700 mt-1 font-medium">{uploadProgress}</p>
                )}

                {/* Optional manual URL override */}
                <div className="mt-1 text-right">
                  <button
                    type="button"
                    onClick={() => setShowManualUrl(!showManualUrl)}
                    className="text-[11px] text-gray-500 hover:text-gray-800 underline"
                  >
                    {showManualUrl ? 'Hide manual link' : 'Optional: paste external PDF link'}
                  </button>
                </div>

                {showManualUrl && (
                  <div className="mt-2 p-2 bg-gray-50 border rounded-lg animate-fade-in">
                    <label className="block text-[11px] font-medium text-gray-600 mb-1">
                      Manual / External PDF URL (Optional Override)
                    </label>
                    <input
                      type="text"
                      placeholder="https://... or /api/media/..."
                      value={formData.pdfUrl}
                      onChange={(e) => setFormData({ ...formData, pdfUrl: e.target.value })}
                      className="w-full px-2.5 py-1.5 border rounded text-xs font-mono bg-white"
                    />
                  </div>
                )}
              </div>

              {/* 2. Catalog Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Catalog Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Product Catalog 2025"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* 3. Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Equipment Range / Category <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete Range, Screw Compressors, Piston Compressors"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* 4. Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description (Optional)</label>
                <textarea
                  rows={2}
                  placeholder="Brief overview of what equipment specifications this catalog contains..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* 5. Page Count (Optional) - Note: File size is 100% automated and no longer asked */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Page Count (Optional)
                </label>
                <input
                  type="number"
                  placeholder="e.g. 24"
                  value={formData.pages || ''}
                  onChange={(e) => setFormData({ ...formData, pages: Number(e.target.value) || 0 })}
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                />
              </div>

              {/* 6. Comprehensive Main Catalog Flag */}
              <div className="pt-2">
                <label className="flex items-center gap-2 cursor-pointer p-3 bg-red-50/60 border border-red-200 rounded-lg">
                  <input
                    type="checkbox"
                    checked={formData.isComprehensive}
                    onChange={(e) => setFormData({ ...formData, isComprehensive: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <div>
                    <span className="text-sm font-semibold text-gray-900 block">
                      Mark as Comprehensive Main Catalog
                    </span>
                    <span className="text-xs text-gray-500 block">
                      Highlighted with gold badge and primary priority on the public catalog page.
                    </span>
                  </div>
                </label>
              </div>

              {/* Buttons */}
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
                  disabled={saving || uploading}
                  className="px-5 py-2 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-lg disabled:opacity-50 flex items-center gap-2"
                >
                  {saving || uploading ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{uploading ? 'Uploading PDF...' : 'Saving...'}</span>
                    </>
                  ) : (
                    <span>Save &amp; Publish Catalog</span>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
