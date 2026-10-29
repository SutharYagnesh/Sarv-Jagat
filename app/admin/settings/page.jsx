'use client';

import { useState, useEffect } from 'react';
import { Building2, MapPin, Phone, Mail, Clock, Save, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function CompanySettingsPage() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [formData, setFormData] = useState({
    companyName: 'Sarv Jagat Corporation',
    address: 'Shade No-24, Vinayak Industrial Estate - 2, Near Asudev Industrial Estate, Kathwada-Singarva Road, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
    shortAddress: 'Vinayak Industrial Estate - 2, Kathwada-GIDC, Ahmedabad-382430, Gujarat, India',
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
  });

  const fetchCompanyInfo = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/company-info');
      if (res.ok) {
        const data = await res.json();
        setFormData((prev) => ({ ...prev, ...data }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        setSuccessMessage('Company address & contact details updated successfully across the entire website!');
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
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Building2 className="w-7 h-7 text-red-600" />
            Company Address &amp; Contact Info
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Edit the factory address, phone numbers, and contact details displayed across the website footer, contact page, policies, and Google schema.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          disabled={saving}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-50"
        >
          {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {saving ? 'Saving...' : 'Save Changes'}
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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Address Card */}
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
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Physical Address (Used in Contact Page, Legal Policies, Shipping &amp; Schema)
              </label>
              <textarea
                name="address"
                rows={3}
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Short Address (Used in Footer &amp; Compact Widgets)
              </label>
              <input
                type="text"
                name="shortAddress"
                value={formData.shortAddress}
                onChange={handleChange}
                required
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
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                <input
                  type="text"
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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
                placeholder="https://maps.google.com/?q=..."
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Contact Numbers & Hours */}
        <div className="bg-white border rounded-xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b pb-3">
            <Phone className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Communication &amp; Support Channels</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Primary Phone (Sales &amp; Main Inquiries)
              </label>
              <input
                type="text"
                name="primaryPhone"
                value={formData.primaryPhone}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Secondary Phone (Support &amp; WhatsApp)
              </label>
              <input
                type="text"
                name="secondaryPhone"
                value={formData.secondaryPhone}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Official Contact Email</label>
              <input
                type="email"
                name="primaryEmail"
                value={formData.primaryEmail}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Support / Dispatch Email</label>
              <input
                type="email"
                name="supportEmail"
                value={formData.supportEmail}
                onChange={handleChange}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
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

        {/* Live Preview Box */}
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-3">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500">Live Website Preview</h3>
          <div className="text-sm text-slate-700 space-y-1">
            <p><strong>{formData.companyName}</strong></p>
            <p className="text-slate-600">{formData.address}</p>
            <p className="text-slate-600">Tel: {formData.primaryPhone} {formData.secondaryPhone && `| ${formData.secondaryPhone}`}</p>
            <p className="text-slate-600">Email: {formData.primaryEmail}</p>
            <p className="text-slate-500 text-xs">{formData.workingHours}</p>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg shadow-sm transition-all disabled:opacity-50"
          >
            {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}

