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
  Database,
  Cloud,
  HardDrive,
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
  const [storageStats, setStorageStats] = useState({ totalMb: '0.00 MB', count: 0 });
  const [cleaningStorage, setCleaningStorage] = useState(false);
  const fileInputRef = useRef(null);

  // Storage option: 'database' (direct file upload) or 'cloud' (Google Drive / Dropbox)
  const [storageType, setStorageType] = useState('database');

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

  const fetchStorageStats = async () => {
    try {
      const res = await fetch('/api/admin/upload/clean');
      if (res.ok) {
        const data = await res.json();
        setStorageStats({ totalMb: data.totalMb || '0.00 MB', count: data.count || 0 });
      }
    } catch (err) {
      console.error('Failed to fetch media storage stats', err);
    }
  };

  useEffect(() => {
    fetchCatalogs();
    fetchStorageStats();
  }, []);

  const handleCleanStorage = async () => {
    if (!window.confirm('Clean up all unreferenced PDF/media files in MongoDB database?')) return;
    setCleaningStorage(true);
    try {
      const res = await fetch('/api/admin/upload/clean', { method: 'POST' });
      if (res.ok) {
        const d = await res.json();
        setMessage(d.message || 'Database media cleaned successfully!');
        fetchStorageStats();
        setTimeout(() => setMessage(''), 4000);
      }
    } catch (err) {
      alert('Error cleaning storage');
    } finally {
      setCleaningStorage(false);
    }
  };

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
            ? `Uploading in parts: ${percent}% (Part ${chunkIndex + 1} of ${totalChunks})...`
            : `Uploading to database: ${percent}%...`
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
          setUploadProgress(`✓ Stored in Database (${calculatedSize}). URL Auto-Generated.`);
        }
      }

      fetchStorageStats();
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

    const autoSize = `${(file.size / (1024 * 1024)).toFixed(2)} MB`;
    setFormData((prev) => ({ ...prev, fileSize: autoSize }));

    await uploadFileToDb(file);
  };

  const handleCloudUrlChange = (value) => {
    let cleanUrl = value.trim();
    // Auto-convert Google Drive viewer links to direct preview format if needed
    if (cleanUrl.includes('drive.google.com/file/d/')) {
      const match = cleanUrl.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
      if (match) {
        cleanUrl = `https://drive.google.com/file/d/${match[1]}/view`;
      }
    }
    setFormData((prev) => ({
      ...prev,
      pdfUrl: cleanUrl,
      fileSize: prev.fileSize && prev.fileSize !== 'PDF Document' ? prev.fileSize : 'Cloud PDF',
    }));
  };

  const handleOpenModal = (cat = null) => {
    setError('');
    setSelectedFile(null);
    setUploadProgress('');

    if (cat) {
      const isCloud = Boolean(
        cat.pdfUrl &&
          !cat.pdfUrl.startsWith('/api/media/') &&
          (cat.pdfUrl.includes('drive.google.com') ||
            cat.pdfUrl.includes('dropbox.com') ||
            cat.pdfUrl.startsWith('http'))
      );
      setStorageType(isCloud ? 'cloud' : 'database');

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
    } else {
      setStorageType('database');
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

    if (storageType === 'database' && !finalPdfUrl && selectedFile) {
      setSaving(true);
      finalPdfUrl = await uploadFileToDb(selectedFile);
      if (!finalPdfUrl) {
        setSaving(false);
        setError('Please wait for the PDF to upload or try selecting the file again.');
        return;
      }
    }

    if (!finalPdfUrl) {
      setError(
        storageType === 'database'
          ? 'Please choose a PDF file to upload.'
          : 'Please enter a valid Google Drive, Dropbox, or Cloud link.'
      );
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
        fetchStorageStats();
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
    if (!window.confirm('Are you sure you want to delete this catalog PDF? The media file will also be permanently removed from MongoDB database.')) return;
    try {
      const res = await fetch(`/api/admin/catalog/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setMessage('Catalog and database media file deleted permanently!');
        fetchCatalogs();
        fetchStorageStats();
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
            Upload and control specific product catalogs shown on{' '}
            <a href="/catalog" target="_blank" className="text-red-600 hover:underline">
              https://www.sarvjagat.com/catalog
            </a>
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Storage Stat Pill */}
          <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-slate-700">
            <Database className="w-3.5 h-3.5 text-slate-500" />
            <span>
              DB Storage: <strong>{storageStats.totalMb}</strong>
            </span>
            <button
              onClick={handleCleanStorage}
              disabled={cleaningStorage}
              className="text-red-600 hover:text-red-800 font-semibold ml-1 underline disabled:opacity-50"
              title="Purge deleted/unused media files from MongoDB"
            >
              {cleaningStorage ? 'Cleaning...' : 'Clean'}
            </button>
          </div>

          <button
            onClick={() => handleOpenModal()}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all text-sm"
          >
            <Plus className="w-4 h-4" />
            Add New Catalog PDF
          </button>
        </div>
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
            No PDF catalogs have been added yet. Click &quot;Add New Catalog PDF&quot; above to upload directly to website database or connect a Google Drive link.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catalogs.map((item) => {
            const isCloud =
              item.pdfUrl &&
              (item.pdfUrl.includes('drive.google.com') ||
                item.pdfUrl.includes('dropbox.com') ||
                item.pdfUrl.startsWith('http'));

            return (
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
                    <div className="flex items-center gap-1.5">
                      {isCloud ? (
                        <span className="text-[11px] font-medium px-2 py-0.5 bg-blue-50 text-blue-700 rounded flex items-center gap-1">
                          <Cloud className="w-3 h-3" />
                          Cloud Link
                        </span>
                      ) : (
                        <span className="text-[11px] font-medium px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded flex items-center gap-1">
                          <Database className="w-3 h-3" />
                          DB Stored
                        </span>
                      )}
                      {item.isComprehensive && (
                        <span className="text-xs font-bold px-2.5 py-1 bg-red-100 text-red-700 rounded-full flex items-center gap-1">
                          <Star className="w-3.5 h-3.5 fill-red-600" />
                          Main PDF
                        </span>
                      )}
                    </div>
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
                      title="Delete (Purges PDF from Database)"
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

              {/* Storage Method Selector Tabs */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide mb-1.5">
                  Choose Where To Upload / Host PDF
                </label>
                <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
                  <button
                    type="button"
                    onClick={() => {
                      setStorageType('database');
                      setError('');
                    }}
                    className={`py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                      storageType === 'database'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <HardDrive className="w-3.5 h-3.5 text-red-600" />
                    <span>Upload to Database</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setStorageType('cloud');
                      setError('');
                    }}
                    className={`py-2 px-3 rounded-md text-xs font-medium flex items-center justify-center gap-1.5 transition-all ${
                      storageType === 'cloud'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Cloud className="w-3.5 h-3.5 text-blue-600" />
                    <span>Google Drive / Cloud</span>
                  </button>
                </div>
              </div>

              {/* Option 1: Direct Database Upload */}
              {storageType === 'database' && (
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1">
                    Select PDF File <span className="text-red-500">*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl p-4 text-center cursor-pointer transition-all ${
                      formData.pdfUrl && formData.pdfUrl.startsWith('/api/media/')
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
                          {uploadProgress || 'Uploading in parts to database...'}
                        </span>
                      </div>
                    ) : formData.pdfUrl && formData.pdfUrl.startsWith('/api/media/') ? (
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
                            Supports 8 MB, 12 MB, 25 MB+ (Uploaded in safe 2 MB parts to database)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {uploadProgress && !uploading && (
                    <p className="text-xs text-green-700 mt-1 font-medium">{uploadProgress}</p>
                  )}
                </div>
              )}

              {/* Option 2: Google Drive / Dropbox / External Cloud Link */}
              {storageType === 'cloud' && (
                <div className="space-y-2 p-3 bg-blue-50/50 border border-blue-200 rounded-xl">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1">
                      Paste Google Drive, Dropbox, or Cloud Link <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="url"
                      required={storageType === 'cloud'}
                      placeholder="https://drive.google.com/file/d/... or Dropbox link"
                      value={formData.pdfUrl && !formData.pdfUrl.startsWith('/api/media/') ? formData.pdfUrl : ''}
                      onChange={(e) => handleCloudUrlChange(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-mono bg-white"
                    />
                  </div>

                  <p className="text-[11px] text-blue-700 leading-relaxed">
                    💡 <strong>Google Drive Tip:</strong> In Google Drive, right-click your PDF &gt; click <em>Share</em> &gt; under General Access select <strong>&quot;Anyone with the link&quot;</strong> &gt; Copy link and paste here.
                  </p>

                  {formData.pdfUrl && !formData.pdfUrl.startsWith('/api/media/') && (
                    <div className="pt-1">
                      <a
                        href={formData.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:underline inline-flex items-center gap-1 font-medium"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        Test Open Cloud Link
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Catalog Title */}
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

              {/* Category */}
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

              {/* Description */}
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

              {/* Optional Page Count */}
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

              {/* Comprehensive Main Catalog Flag */}
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
