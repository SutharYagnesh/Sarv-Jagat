'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Plus, Trash2, UploadCloud, X } from 'lucide-react';
import { RichTextEditor } from '@/components/admin/rich-text-editor';

export default function ProductForm({ initialData = null }) {
  const router = useRouter();
  const isEdit = !!initialData;
  
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: '',
    modelNumber: '',
    powerRating: '',
    pressureRating: '',
    airFlow: '',
    price: '',
    description: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: '',
    status: 'Draft',
    images: [],
    videos: [],
    youtubeLink: '',
    specifications: []
  });

  useEffect(() => {
    fetch('/api/admin/categories')
      .then(res => res.json())
      .then(data => setCategories(Array.isArray(data) ? data : []))
      .catch(err => console.error(err));
      
    if (initialData) {
      setFormData({
        ...initialData,
        seoKeywords: Array.isArray(initialData.seoKeywords) ? initialData.seoKeywords.join(', ') : initialData.seoKeywords || '',
        price: initialData.price || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title' && !isEdit) {
      setFormData({
        ...formData,
        title: value,
        slug: value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '')
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;
    
    setUploadingImage(true);
    for (const file of files) {
      try {
        const uploadData = new FormData();
        uploadData.append('file', file);
        
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: uploadData,
        });
        
        if (res.ok) {
          const data = await res.json();
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, data.url]
          }));
        } else {
          console.error("Failed to upload image");
          alert("Failed to upload image");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to upload image");
      }
    }
    setUploadingImage(false);
  };

  const removeImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const addSpecification = () => {
    setFormData(prev => ({
      ...prev,
      specifications: [...prev.specifications, { key: '', value: '' }]
    }));
  };

  const updateSpecification = (index, field, value) => {
    const newSpecs = [...formData.specifications];
    newSpecs[index][field] = value;
    setFormData({ ...formData, specifications: newSpecs });
  };

  const removeSpecification = (index) => {
    setFormData(prev => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const payload = {
        ...formData,
        seoKeywords: typeof formData.seoKeywords === 'string' ? formData.seoKeywords.split(',').map(k => k.trim()).filter(Boolean) : formData.seoKeywords,
        price: formData.price ? Number(formData.price) : undefined
      };

      const url = isEdit ? `/api/admin/products/${initialData._id}` : '/api/admin/products';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        router.push('/admin/products');
        router.refresh();
      } else {
        const errorData = await res.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred while saving the product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 pb-12">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900">{isEdit ? 'Edit Product' : 'Add New Product'}</h1>
        <div className="flex items-center gap-4">
          <button type="button" onClick={() => router.back()} className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">Cancel</button>
          <button type="submit" disabled={loading} className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 transition-colors">
            {loading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Basic Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Product Title *</label>
                <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Slug *</label>
                <input required type="text" name="slug" value={formData.slug} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 focus:ring-red-500 focus:border-red-500" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select required name="category" value={formData.category} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white">
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Model Number *</label>
                <input required type="text" name="modelNumber" value={formData.modelNumber} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
              </div>
            </div>
          </div>

          {/* Technical Specs */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Technical Specifications</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Power Rating *</label>
                <input required type="text" name="powerRating" value={formData.powerRating} onChange={handleChange} placeholder="e.g. 10 HP" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pressure Rating *</label>
                <input required type="text" name="pressureRating" value={formData.pressureRating} onChange={handleChange} placeholder="e.g. 10 Bar" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Air Flow *</label>
                <input required type="text" name="airFlow" value={formData.airFlow} onChange={handleChange} placeholder="e.g. 35 CFM" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 mt-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-medium text-gray-900">Detailed Specifications</h3>
                <button type="button" onClick={addSpecification} className="text-sm text-red-600 hover:text-red-700 flex items-center gap-1 transition-colors">
                  <Plus className="w-4 h-4" /> Add Row
                </button>
              </div>
              
              <div className="space-y-3">
                {formData.specifications.map((spec, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <input type="text" placeholder="Parameter (e.g. Cooling)" value={spec.key} onChange={(e) => updateSpecification(index, 'key', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                    <input type="text" placeholder="Value (e.g. Air Cooled)" value={spec.value} onChange={(e) => updateSpecification(index, 'value', e.target.value)} className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
                    <button type="button" onClick={() => removeSpecification(index)} className="p-2 text-red-500 hover:bg-red-50 rounded-md transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Description *</h2>
            <p className="text-xs text-gray-500">You can paste formatted text directly from Word or webpages.</p>
            <RichTextEditor 
              value={formData.description} 
              onChange={(val) => setFormData({ ...formData, description: val })} 
              rows={12} 
              placeholder="Paste or type your product description here..." 
            />
          </div>
          
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          
          {/* Status & Price */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Publishing</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500 bg-white">
                <option value="Draft">Draft</option>
                <option value="Published">Published</option>
                <option value="Archived">Archived</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price (Optional)</label>
              <input type="number" name="price" value={formData.price} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>

          {/* YouTube Video */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">YouTube Video</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">YouTube Link (Optional)</label>
              <input type="text" name="youtubeLink" value={formData.youtubeLink || ''} onChange={handleChange} placeholder="https://youtube.com/watch?v=..." className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            </div>
            {formData.youtubeLink && (() => {
              const match = formData.youtubeLink.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
              const videoId = match ? match[1] : null;
              if (videoId) {
                return (
                  <div className="mt-2 aspect-video rounded overflow-hidden shadow-sm">
                    <iframe 
                      src={`https://www.youtube.com/embed/${videoId}`}
                      className="w-full h-full"
                      allowFullScreen
                      title="YouTube Preview"
                    />
                  </div>
                );
              }
              return null;
            })()}
          </div>

          {/* Images */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Images *</h2>
            <p className="text-xs text-gray-500">Max 5MB per image.</p>
            
            <div className="grid grid-cols-2 gap-3">
              {formData.images.map((img, index) => (
                <div key={index} className="relative aspect-square rounded-md overflow-hidden border border-gray-200 group">
                  <img src={img} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(index)} className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              <label className="aspect-square rounded-md border-2 border-dashed border-gray-300 flex flex-col items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700 cursor-pointer transition-colors">
                <UploadCloud className="w-8 h-8 mb-2" />
                <span className="text-xs font-medium text-center px-2">{uploadingImage ? 'Uploading...' : 'Upload Image'}</span>
                <input type="file" multiple accept="image/*" onChange={handleImageUpload} disabled={uploadingImage} className="hidden" />
              </label>
            </div>
            {formData.images.length === 0 && (
               <p className="text-sm text-red-500 mt-2">At least 1 image is required.</p>
            )}
          </div>

          {/* SEO */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">SEO Meta</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Title *</label>
              <input required type="text" name="seoTitle" maxLength={60} value={formData.seoTitle} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">SEO Description *</label>
              <textarea required name="seoDescription" maxLength={160} rows={3} value={formData.seoDescription} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"></textarea>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Keywords</label>
              <input type="text" name="seoKeywords" placeholder="comma, separated" value={formData.seoKeywords} onChange={handleChange} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>

        </div>
      </div>
    </form>
  );
}
