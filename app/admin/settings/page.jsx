'use client';

import { useState, useEffect } from 'react';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Image as ImageIcon,
  BarChart3,
  Award,
  Upload,
  Trash2,
  Plus,
  ExternalLink,
} from 'lucide-react';

export default function CompanySettingsPage() {
  const [activeTab, setActiveTab] = useState('address');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingHero, setUploadingHero] = useState(false);
  const [uploadingCertIndex, setUploadingCertIndex] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    companyName: 'Sarv Jagat Corporation',
    address:
      'Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
    shortAddress:
      'Vinayak Industrial Estate - 2, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
    city: 'Ahmedabad',
    state: 'Gujarat',
    pincode: '382430',
    country: 'India',
    primaryPhone: '+91-9157487233',
    secondaryPhone: '+91-9157770753',
    primaryEmail: 'contact@sarvjagat.com',
    supportEmail: 'contact@sarvjagat.com',
    workingHours: 'Mon - Sat: 9:00 AM - 7:00 PM IST',
    googleMapsUrl: 'https://maps.google.com/?q=Sarv+Jagat+Corporation+Kathwada+Ahmedabad',
    heroImage: '/sj-main-page.png',
    heroBadge: 'Trusted Since 2024',
    heroHeading: 'Powering Industries with Reliable Air Solutions',
    heroSubheading:
      'Sarv Jagat delivers world-class air compressors, from 1 HP to 220+ HP, engineered for continuous operation across diverse industrial applications.',
    stats: {
      yearsExperience: '18+',
      happyClients: '2000+',
      productVariants: '50+',
      industriesServed: '15+',
      serviceSupport: '25+',
      technicalHelp: '24/7',
      installationsCount: '5000+',
      installationsText: 'Years of Excellence',
    },
    certifications: [
      {
        title: 'ISO 9001:2015',
        authority: 'Quality Management System',
        year: '2025',
        description: 'Certified for international quality standards in compressor manufacturing and supply.',
        image: '',
      },
      {
        title: 'CE Marking',
        authority: 'European Conformity Standards',
        year: '2025',
        description: 'Compliant with European health, safety, and environmental protection standards.',
        image: '',
      },
    ],
  });

  const fetchCompanyInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/company-info');
      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({
          ...prev,
          ...data,
          stats: { ...prev.stats, ...(data.stats || {}) },
          certifications:
            Array.isArray(data.certifications) && data.certifications.length > 0
              ? data.certifications
              : prev.certifications,
        }));
      }
    } catch (err) {
      console.error('Failed to load company info', err);
      setErrorMessage('Could not load company info from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanyInfo();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [key]: value,
      },
    }));
  };

  const handleHeroImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingHero(true);
    setErrorMessage('');
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) {
        throw new Error('Upload failed');
      }

      const json = await res.json();
      if (json.url) {
        setFormData((prev) => ({ ...prev, heroImage: json.url }));
        setSuccessMessage('Hero image uploaded successfully! Click Save Changes to apply.');
        setTimeout(() => setSuccessMessage(''), 4000);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to upload hero image.');
    } finally {
      setUploadingHero(false);
    }
  };

  const handleAddCertification = () => {
    setFormData((prev) => ({
      ...prev,
      certifications: [
        ...(prev.certifications || []),
        {
          title: '',
          authority: '',
          year: new Date().getFullYear().toString(),
          description: '',
          image: '',
        },
      ],
    }));
  };

  const handleRemoveCertification = (index) => {
    setFormData((prev) => ({
      ...prev,
      certifications: prev.certifications.filter((_, i) => i !== index),
    }));
  };

  const handleCertChange = (index, field, value) => {
    setFormData((prev) => {
      const updated = [...prev.certifications];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, certifications: updated };
    });
  };

  const handleCertImageUpload = async (index, file) => {
    if (!file) return;
    setUploadingCertIndex(index);
    setErrorMessage('');
    try {
      const uploadData = new FormData();
      uploadData.append('file', file);

      const res = await fetch('/api/admin/upload', {
        method: 'POST',
        body: uploadData,
      });

      if (!res.ok) throw new Error('Upload failed');

      const json = await res.json();
      if (json.url) {
        handleCertChange(index, 'image', json.url);
        setSuccessMessage('Certificate image uploaded successfully!');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to upload certificate image.');
    } finally {
      setUploadingCertIndex(null);
    }
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');

    try {
      const res = await fetch('/api/admin/company-info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSuccessMessage('All company settings, hero image, metrics, and certifications saved successfully!');
        setTimeout(() => setSuccessMessage(''), 5000);
      } else {
        const err = await res.json();
        setErrorMessage(err.error || 'Failed to update company info.');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Error communicating with the server.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
          <p className="font-medium">Loading company settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-red-600" />
            Company Settings &amp; Site Content
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Centralized control for Factory Address, Contact Info, Homepage Hero Media, Global Metrics, and Certifications.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Notifications */}
      {successMessage && (
        <div className="p-4 bg-green-50 border border-green-200 text-green-800 rounded-lg flex items-center gap-3 animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-green-600 shrink-0" />
          <p className="text-sm font-medium">{successMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
          <p className="text-sm font-medium">{errorMessage}</p>
        </div>
      )}

      {/* Tabs Bar */}
      <div className="flex flex-wrap border-b border-gray-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab('address')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'address'
              ? 'border-red-600 text-red-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <MapPin className="w-4 h-4" />
          Address &amp; Contacts
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('hero')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'hero'
              ? 'border-red-600 text-red-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          Homepage Hero &amp; Media
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'stats'
              ? 'border-red-600 text-red-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Global Metrics &amp; Stats
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('certifications')}
          className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 transition-all ${
            activeTab === 'certifications'
              ? 'border-red-600 text-red-600 font-semibold'
              : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
          }`}
        >
          <Award className="w-4 h-4" />
          Certifications &amp; Awards ({formData.certifications?.length || 0})
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* TAB 1: Address & Contacts */}
        {activeTab === 'address' && (
          <div className="space-y-6">
            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b pb-3">
                <MapPin className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">Factory &amp; Registered Address</h2>
              </div>

              <div className="grid gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Company Legal Name</label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Complete Official Address (Factory &amp; GIDC Shade)
                  </label>
                  <textarea
                    rows={3}
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Short Address (For Compact Footers &amp; Badges)
                  </label>
                  <input
                    type="text"
                    name="shortAddress"
                    value={formData.shortAddress}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Google Maps Location Link</label>
                  <input
                    type="url"
                    name="googleMapsUrl"
                    value={formData.googleMapsUrl}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
              <div className="flex items-center gap-2 border-b pb-3">
                <Phone className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">Communication &amp; Support Channels</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-gray-400" />
                    Primary Phone (Calls &amp; WhatsApp)
                  </label>
                  <input
                    type="text"
                    name="primaryPhone"
                    value={formData.primaryPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                    <Phone className="w-4 h-4 text-gray-400" />
                    Secondary Phone / Sales Line
                  </label>
                  <input
                    type="text"
                    name="secondaryPhone"
                    value={formData.secondaryPhone}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Primary Email (General Enquiries)
                  </label>
                  <input
                    type="email"
                    name="primaryEmail"
                    value={formData.primaryEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-gray-400" />
                    Support Email
                  </label>
                  <input
                    type="email"
                    name="supportEmail"
                    value={formData.supportEmail}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-gray-400" />
                    Working Hours
                  </label>
                  <input
                    type="text"
                    name="workingHours"
                    value={formData.workingHours}
                    onChange={handleChange}
                    placeholder="Mon - Sat: 9:00 AM - 7:00 PM IST"
                    className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Homepage Hero & Media */}
        {activeTab === 'hero' && (
          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-3">
              <ImageIcon className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">Homepage Hero Image &amp; Headlines</h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Image Preview & Upload */}
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700">Hero Main Image</label>
                <div className="relative border-2 border-dashed border-gray-300 rounded-xl p-4 bg-gray-50 flex flex-col items-center justify-center min-h-[260px]">
                  {formData.heroImage ? (
                    <div className="space-y-3 w-full">
                      <div className="relative rounded-lg overflow-hidden border shadow-sm max-h-[240px] bg-white flex items-center justify-center">
                        <img
                          src={formData.heroImage}
                          alt="Hero Section Main Preview"
                          className="w-full max-h-[240px] object-contain"
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="truncate max-w-[200px]">{formData.heroImage}</span>
                        <button
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, heroImage: '' }))}
                          className="text-red-600 hover:text-red-700 font-medium inline-flex items-center gap-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" /> Remove
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center space-y-2">
                      <ImageIcon className="w-12 h-12 text-gray-400 mx-auto" />
                      <p className="text-sm text-gray-500">No hero image set</p>
                    </div>
                  )}

                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-sm font-medium text-gray-700 shadow-xs">
                      {uploadingHero ? (
                        <RefreshCw className="w-4 h-4 animate-spin text-red-600" />
                      ) : (
                        <Upload className="w-4 h-4 text-red-600" />
                      )}
                      {uploadingHero ? 'Uploading to Database...' : 'Upload Image (Direct to DB)'}
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleHeroImageUpload}
                        disabled={uploadingHero}
                        className="hidden"
                      />
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-xs text-gray-500 mb-1">Or paste custom Image URL directly:</label>
                  <input
                    type="text"
                    name="heroImage"
                    value={formData.heroImage}
                    onChange={handleChange}
                    placeholder="/sj-main-page.png or https://..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>

              {/* Text Fields */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Top Badge Text</label>
                  <input
                    type="text"
                    name="heroBadge"
                    value={formData.heroBadge}
                    onChange={handleChange}
                    placeholder="Trusted Since 2024"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Main Heading</label>
                  <input
                    type="text"
                    name="heroHeading"
                    value={formData.heroHeading}
                    onChange={handleChange}
                    placeholder="Powering Industries with Reliable Air Solutions"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Hero Subtitle Paragraph</label>
                  <textarea
                    rows={4}
                    name="heroSubheading"
                    value={formData.heroSubheading}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500 focus:border-red-500"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: Global Metrics & Stats */}
        {activeTab === 'stats' && (
          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex items-center gap-2 border-b pb-3">
              <BarChart3 className="w-5 h-5 text-red-600" />
              <h2 className="text-lg font-semibold text-gray-900">Key Performance Metrics &amp; Experience Stats</h2>
            </div>
            <p className="text-sm text-gray-500">
              These figures appear in the Homepage Hero, Statistics ribbon, About page, and credibility sections.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              <div className="p-4 bg-gray-50 border rounded-lg space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Years of Experience</label>
                <input
                  type="text"
                  value={formData.stats?.yearsExperience || ''}
                  onChange={(e) => handleStatChange('yearsExperience', e.target.value)}
                  placeholder="18+"
                  className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-gray-500">Displayed in Hero corner &amp; Stats bar</span>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Happy Customers / Clients</label>
                <input
                  type="text"
                  value={formData.stats?.happyClients || ''}
                  onChange={(e) => handleStatChange('happyClients', e.target.value)}
                  placeholder="2000+"
                  className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-gray-500">Displayed on Homepage &amp; About page</span>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Service Support States/Centers</label>
                <input
                  type="text"
                  value={formData.stats?.serviceSupport || ''}
                  onChange={(e) => handleStatChange('serviceSupport', e.target.value)}
                  placeholder="25+"
                  className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-gray-500">Displayed on Homepage Stats</span>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Technical Help / Support</label>
                <input
                  type="text"
                  value={formData.stats?.technicalHelp || ''}
                  onChange={(e) => handleStatChange('technicalHelp', e.target.value)}
                  placeholder="24/7"
                  className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-gray-500">Continuous technical assistance</span>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Product Variants Count</label>
                <input
                  type="text"
                  value={formData.stats?.productVariants || ''}
                  onChange={(e) => handleStatChange('productVariants', e.target.value)}
                  placeholder="50+"
                  className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-gray-500">Standard screw &amp; piston models</span>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Industries Served</label>
                <input
                  type="text"
                  value={formData.stats?.industriesServed || ''}
                  onChange={(e) => handleStatChange('industriesServed', e.target.value)}
                  placeholder="15+"
                  className="w-full px-3 py-2 bg-white border rounded-lg text-sm font-bold text-red-600 focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-gray-500">Automotive, Pharma, Textiles, etc.</span>
              </div>

              <div className="p-4 bg-gray-50 border rounded-lg space-y-2 sm:col-span-2 lg:col-span-3">
                <label className="block text-sm font-semibold text-gray-700">
                  Corner Badge Tagline (Under Hero Years)
                </label>
                <input
                  type="text"
                  value={formData.stats?.installationsText || ''}
                  onChange={(e) => handleStatChange('installationsText', e.target.value)}
                  placeholder="Years of Excellence"
                  className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                />
                <span className="text-xs text-gray-500">
                  Default: &quot;Years of Excellence&quot; or &quot;Years of successful industrial installations&quot;
                </span>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: Certifications & Awards */}
        {activeTab === 'certifications' && (
          <div className="bg-white border rounded-xl p-6 shadow-sm space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-red-600" />
                <h2 className="text-lg font-semibold text-gray-900">Certifications &amp; Standards Management</h2>
              </div>
              <button
                type="button"
                onClick={handleAddCertification}
                className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-red-50 hover:bg-red-100 text-red-700 border border-red-200 text-xs font-semibold rounded-lg transition-all"
              >
                <Plus className="w-4 h-4" /> Add Certificate
              </button>
            </div>
            <p className="text-sm text-gray-500">
              Manage certifications and awards displayed on the <span className="font-medium text-gray-700">/about</span> page under the Certifications tab.
            </p>

            <div className="space-y-4">
              {formData.certifications?.map((cert, index) => (
                <div key={index} className="p-5 border border-gray-200 rounded-xl bg-gray-50/50 space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      Certificate #{index + 1}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCertification(index)}
                      className="text-red-600 hover:text-red-700 text-xs font-medium inline-flex items-center gap-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Certificate Title / Name</label>
                      <input
                        type="text"
                        value={cert.title || ''}
                        onChange={(e) => handleCertChange(index, 'title', e.target.value)}
                        placeholder="ISO 9001:2015"
                        className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-red-500 font-semibold"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Authority / Standard</label>
                      <input
                        type="text"
                        value={cert.authority || ''}
                        onChange={(e) => handleCertChange(index, 'authority', e.target.value)}
                        placeholder="Quality Management System"
                        className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-700 mb-1">Year / Validity</label>
                      <input
                        type="text"
                        value={cert.year || ''}
                        onChange={(e) => handleCertChange(index, 'year', e.target.value)}
                        placeholder="2025"
                        className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">Description / Summary</label>
                    <textarea
                      rows={2}
                      value={cert.description || ''}
                      onChange={(e) => handleCertChange(index, 'description', e.target.value)}
                      placeholder="Certified for international quality standards..."
                      className="w-full px-3 py-2 bg-white border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                    />
                  </div>

                  {/* Image / Logo */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-1">
                    {cert.image && (
                      <div className="w-16 h-16 border rounded bg-white p-1 flex items-center justify-center shrink-0">
                        <img src={cert.image} alt={cert.title} className="max-h-full max-w-full object-contain" />
                      </div>
                    )}
                    <div className="flex-1 w-full space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-medium text-gray-700 shadow-xs">
                          {uploadingCertIndex === index ? (
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-red-600" />
                          ) : (
                            <Upload className="w-3.5 h-3.5 text-red-600" />
                          )}
                          {uploadingCertIndex === index ? 'Uploading...' : 'Upload Certificate Logo'}
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCertImageUpload(index, e.target.files?.[0])}
                            disabled={uploadingCertIndex === index}
                            className="hidden"
                          />
                        </label>
                        {cert.image && (
                          <button
                            type="button"
                            onClick={() => handleCertChange(index, 'image', '')}
                            className="text-xs text-red-600 hover:underline"
                          >
                            Clear Image
                          </button>
                        )}
                      </div>
                      <input
                        type="text"
                        value={cert.image || ''}
                        onChange={(e) => handleCertChange(index, 'image', e.target.value)}
                        placeholder="Or paste certificate image URL"
                        className="w-full px-2.5 py-1.5 bg-white border rounded text-xs focus:ring-2 focus:ring-red-500"
                      />
                    </div>
                  </div>
                </div>
              ))}

              {(!formData.certifications || formData.certifications.length === 0) && (
                <div className="text-center py-8 border-2 border-dashed rounded-xl bg-gray-50 text-gray-500 space-y-2">
                  <Award className="w-10 h-10 text-gray-400 mx-auto" />
                  <p className="text-sm">No certifications listed yet.</p>
                  <button
                    type="button"
                    onClick={handleAddCertification}
                    className="text-xs font-medium text-red-600 hover:underline"
                  >
                    Click here to add your first certificate
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Live Preview Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Website Summary</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-700">
            <div>
              <p className="font-semibold text-slate-900">{formData.companyName}</p>
              <p className="text-slate-600 mt-1 line-clamp-2">{formData.address}</p>
              <p className="text-slate-600 mt-1">Tel: {formData.primaryPhone}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Hero Section</p>
              <p className="text-slate-600 mt-1">Badge: {formData.heroBadge}</p>
              <p className="text-slate-600 mt-1 line-clamp-1">Heading: {formData.heroHeading}</p>
              <p className="text-slate-600 mt-1">Media: {formData.heroImage ? 'Set' : 'Default'}</p>
            </div>
            <div>
              <p className="font-semibold text-slate-900">Live Stats</p>
              <p className="text-slate-600 mt-1">Exp: {formData.stats?.yearsExperience} | Clients: {formData.stats?.happyClients}</p>
              <p className="text-slate-600 mt-1">Support: {formData.stats?.serviceSupport} | Help: {formData.stats?.technicalHelp}</p>
              <p className="text-slate-600 mt-1">Certs: {formData.certifications?.length || 0} active</p>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
