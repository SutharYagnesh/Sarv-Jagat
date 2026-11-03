'use client';

import { useState, useEffect } from 'react';
import {
  MapPin,
  Users,
  Award,
  Eye,
  EyeOff,
  Plus,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Search,
  Building,
  Globe,
  Phone,
  Mail,
  X,
} from 'lucide-react';

export default function AdminDealersPage() {
  const [loading, setLoading] = useState(true);
  const [savingSettings, setSavingSettings] = useState(false);
  const [dealers, setDealers] = useState([]);
  const [settings, setSettings] = useState({
    showLocateDealerTab: false,
    heroTitle: 'Dealer Network',
    heroSubtitle:
      'Find authorized Sarv Jagat dealers and service centers across India. Get expert support, genuine parts, and professional service from our trusted partners.',
    dealersCount: '200+ Dealers',
    coverageText: 'Pan-India Coverage',
    certifiedPartnersText: 'Certified Partners',
    networkDescription:
      'Our nationwide dealer network spans across all major industrial belts to provide prompt sales, installation, and after-sales support.',
    regionalCoverage: [
      { region: 'North India', states: 'Delhi, Punjab, Haryana, UP, Rajasthan', dealers: '45+' },
      { region: 'West India', states: 'Maharashtra, Gujarat, MP, Goa', dealers: '60+' },
      { region: 'South India', states: 'Karnataka, Tamil Nadu, Andhra Pradesh, Kerala', dealers: '55+' },
      { region: 'East India', states: 'West Bengal, Odisha, Jharkhand, Bihar', dealers: '40+' },
    ],
  });

  const [search, setSearch] = useState('');
  const [stateFilter, setStateFilter] = useState('ALL');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  // Modal / Form state for Dealer Add/Edit
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingDealerId, setEditingDealerId] = useState(null);
  const [dealerForm, setDealerForm] = useState({
    name: '',
    type: 'Authorized Dealer',
    rating: 4.8,
    address: '',
    city: '',
    state: '',
    pincode: '',
    phone: '',
    email: '',
    website: '',
    specialties: 'Screw Compressors, Service & Maintenance, Spare Parts',
    established: '',
    experience: '',
    serviceArea: '',
    isActive: true,
  });
  const [savingDealer, setSavingDealer] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/dealers');
      if (res.ok) {
        const data = await res.json();
        if (data.settings) setSettings(data.settings);
        if (data.dealers) setDealers(data.dealers);
      }
    } catch (err) {
      console.error('Failed to load dealers data', err);
      setErrorMessage('Could not load dealers data from server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleLocateTab = async () => {
    const nextVal = !settings.showLocateDealerTab;
    setSettings((prev) => ({ ...prev, showLocateDealerTab: nextVal }));
    setSavingSettings(true);
    try {
      const res = await fetch('/api/admin/dealers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ showLocateDealerTab: nextVal }),
      });
      if (res.ok) {
        setSuccessMessage(
          nextVal
            ? "'Locate Dealer' tab is now VISIBLE on the public website (3 tabs active)."
            : "'Locate Dealer' tab is now HIDDEN on the public website (2 tabs active: Become a Partner & Our Network)."
        );
        setTimeout(() => setSuccessMessage(''), 5000);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to update tab visibility setting.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleSaveSettings = async (e) => {
    if (e) e.preventDefault();
    setSavingSettings(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      const res = await fetch('/api/admin/dealers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      });
      if (res.ok) {
        setSuccessMessage('Dealer network stats & headlines saved successfully!');
        setTimeout(() => setSuccessMessage(''), 4000);
      } else {
        const err = await res.json();
        setErrorMessage(err.error || 'Failed to update settings');
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Network error while saving settings.');
    } finally {
      setSavingSettings(false);
    }
  };

  const handleOpenAddForm = () => {
    setEditingDealerId(null);
    setDealerForm({
      name: '',
      type: 'Authorized Dealer',
      rating: 4.8,
      address: '',
      city: '',
      state: '',
      pincode: '',
      phone: '',
      email: '',
      website: '',
      specialties: 'Screw Compressors, Service & Maintenance, Spare Parts',
      established: '',
      experience: '',
      serviceArea: '',
      isActive: true,
    });
    setIsFormOpen(true);
  };

  const handleOpenEditForm = (dealer) => {
    setEditingDealerId(dealer._id);
    setDealerForm({
      name: dealer.name || '',
      type: dealer.type || 'Authorized Dealer',
      rating: dealer.rating || 4.8,
      address: dealer.address || '',
      city: dealer.city || '',
      state: dealer.state || '',
      pincode: dealer.pincode || '',
      phone: dealer.phone || '',
      email: dealer.email || '',
      website: dealer.website || '',
      specialties: Array.isArray(dealer.specialties)
        ? dealer.specialties.join(', ')
        : (dealer.specialties || ''),
      established: dealer.established || '',
      experience: dealer.experience || '',
      serviceArea: dealer.serviceArea || '',
      isActive: dealer.isActive !== false,
    });
    setIsFormOpen(true);
  };

  const handleSaveDealer = async (e) => {
    e.preventDefault();
    setSavingDealer(true);
    setErrorMessage('');

    const payload = {
      ...dealerForm,
      specialties: dealerForm.specialties
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
    };

    try {
      if (editingDealerId) {
        // Update
        const res = await fetch(`/api/admin/dealers/${editingDealerId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const updated = await res.json();
          setDealers((prev) => prev.map((d) => (d._id === editingDealerId ? updated : d)));
          setSuccessMessage('Dealer updated successfully!');
          setIsFormOpen(false);
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          const err = await res.json();
          setErrorMessage(err.error || 'Failed to update dealer');
        }
      } else {
        // Create
        const res = await fetch('/api/admin/dealers', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
        if (res.ok) {
          const created = await res.json();
          setDealers((prev) => [created, ...prev]);
          setSuccessMessage('New dealer added successfully!');
          setIsFormOpen(false);
          setTimeout(() => setSuccessMessage(''), 3000);
        } else {
          const err = await res.json();
          setErrorMessage(err.error || 'Failed to create dealer');
        }
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Error communicating with the server.');
    } finally {
      setSavingDealer(false);
    }
  };

  const handleDeleteDealer = async (id, name) => {
    if (!confirm(`Are you sure you want to delete "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/dealers/${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDealers((prev) => prev.filter((d) => d._id !== id));
        setSuccessMessage('Dealer deleted successfully.');
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to delete dealer.');
    }
  };

  // State filtering options
  const uniqueStates = ['ALL', ...Array.from(new Set(dealers.map((d) => d.state).filter(Boolean)))];

  const filteredDealers = dealers.filter((d) => {
    const matchesSearch =
      d.name?.toLowerCase().includes(search.toLowerCase()) ||
      d.city?.toLowerCase().includes(search.toLowerCase()) ||
      d.state?.toLowerCase().includes(search.toLowerCase());
    const matchesState = stateFilter === 'ALL' || d.state === stateFilter;
    return matchesSearch && matchesState;
  });

  if (loading) {
    return (
      <div className="p-8 flex items-center justify-center min-h-[500px]">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <RefreshCw className="w-8 h-8 animate-spin text-red-600" />
          <p className="font-medium">Loading dealers &amp; settings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 max-w-6xl mx-auto space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="w-7 h-7 text-red-600" />
            Authorized Dealers &amp; Partner Network
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage public dealer network page (<span className="font-medium text-gray-700">/dealers</span>), toggle tab visibility, and update authorized dealers.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={handleOpenAddForm}
            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg text-sm shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" /> Add Dealer
          </button>
        </div>
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

      {/* CORE FEATURE: Locate Dealer Tab Visibility Toggle */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-5 sm:p-6 shadow-md border border-slate-700">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-red-600 text-white">
                Live Public Control
              </span>
              <h2 className="text-lg font-semibold text-white">&quot;Locate Dealer&quot; Tab Visibility</h2>
            </div>
            <p className="text-sm text-slate-300 max-w-2xl">
              When <span className="font-semibold text-red-400">Hidden</span>, the public <span className="underline">/dealers</span> page only shows 2 tabs (&quot;Become a Partner&quot; &amp; &quot;Our Network&quot;). When <span className="font-semibold text-green-400">Visible</span>, all 3 tabs are shown.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleToggleLocateTab}
              disabled={savingSettings}
              className={`relative inline-flex items-center gap-2.5 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all shadow-sm ${
                settings.showLocateDealerTab
                  ? 'bg-green-600 hover:bg-green-700 text-white'
                  : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
              }`}
            >
              {savingSettings ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : settings.showLocateDealerTab ? (
                <Eye className="w-4 h-4" />
              ) : (
                <EyeOff className="w-4 h-4" />
              )}
              {settings.showLocateDealerTab ? 'Tab is VISIBLE (3 Tabs)' : 'Tab is HIDDEN (2 Tabs)'}
            </button>
          </div>
        </div>
      </div>

      {/* Network Stats Section */}
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b pb-3">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5 text-red-600" />
            <h2 className="text-lg font-semibold text-gray-900">Network Headline Figures</h2>
          </div>
          <button
            type="button"
            onClick={handleSaveSettings}
            disabled={savingSettings}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded-lg"
          >
            {savingSettings ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
            Save Stats
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Total Dealers Badge</label>
            <input
              type="text"
              value={settings.dealersCount || ''}
              onChange={(e) => setSettings((prev) => ({ ...prev, dealersCount: e.target.value }))}
              placeholder="200+ Dealers"
              className="w-full px-3 py-2 border rounded-lg text-sm font-semibold text-red-600 focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Coverage Headline</label>
            <input
              type="text"
              value={settings.coverageText || ''}
              onChange={(e) => setSettings((prev) => ({ ...prev, coverageText: e.target.value }))}
              placeholder="Pan-India Coverage"
              className="w-full px-3 py-2 border rounded-lg text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-red-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 mb-1">Partners Headline</label>
            <input
              type="text"
              value={settings.certifiedPartnersText || ''}
              onChange={(e) => setSettings((prev) => ({ ...prev, certifiedPartnersText: e.target.value }))}
              placeholder="Certified Partners"
              className="w-full px-3 py-2 border rounded-lg text-sm font-semibold text-gray-800 focus:ring-2 focus:ring-red-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">Hero Subtitle</label>
          <input
            type="text"
            value={settings.heroSubtitle || ''}
            onChange={(e) => setSettings((prev) => ({ ...prev, heroSubtitle: e.target.value }))}
            className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      {/* Dealer Directory / List */}
      <div className="bg-white border rounded-xl p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-3">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Dealers List ({filteredDealers.length})</h2>
            <p className="text-xs text-gray-500">Authorized dealers listed in the dealer locator</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search dealer or city..."
                className="pl-8 pr-3 py-1.5 border rounded-lg text-xs w-48 focus:ring-2 focus:ring-red-500"
              />
            </div>

            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-2.5 py-1.5 border rounded-lg text-xs bg-white text-gray-700 focus:ring-2 focus:ring-red-500"
            >
              {uniqueStates.map((st) => (
                <option key={st} value={st}>
                  {st === 'ALL' ? 'All States' : st}
                </option>
              ))}
            </select>
          </div>
        </div>

        {filteredDealers.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border border-dashed rounded-lg space-y-2">
            <MapPin className="w-10 h-10 text-gray-400 mx-auto" />
            <p className="text-sm">No dealers found matching your query.</p>
            <button onClick={handleOpenAddForm} className="text-xs font-semibold text-red-600 hover:underline">
              Add a new dealer
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredDealers.map((dealer) => (
              <div
                key={dealer._id}
                className="p-4 border rounded-xl bg-gray-50/50 hover:bg-white hover:shadow-md transition-all space-y-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{dealer.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs font-semibold px-2 py-0.5 bg-red-100 text-red-700 rounded-full">
                        {dealer.type}
                      </span>
                      {dealer.state && (
                        <span className="text-xs text-gray-500 font-medium">
                          {dealer.city ? `${dealer.city}, ` : ''}
                          {dealer.state}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditForm(dealer)}
                      className="p-1.5 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded"
                      title="Edit Dealer"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteDealer(dealer._id, dealer.name)}
                      className="p-1.5 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded"
                      title="Delete Dealer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {dealer.address && (
                  <p className="text-xs text-gray-600 line-clamp-2">
                    <MapPin className="w-3.5 h-3.5 text-gray-400 inline mr-1" />
                    {dealer.address}
                  </p>
                )}

                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 pt-1 border-t">
                  {dealer.phone && <span>📞 {dealer.phone}</span>}
                  {dealer.email && <span>✉️ {dealer.email}</span>}
                  {dealer.website && <span>🌐 {dealer.website}</span>}
                  {dealer.experience && <span>⭐ {dealer.experience}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add / Edit Dealer Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-lg font-bold text-gray-900">
                {editingDealerId ? 'Edit Dealer Details' : 'Add New Authorized Dealer'}
              </h2>
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="p-1 text-gray-400 hover:text-gray-600 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDealer} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Company / Dealer Name *</label>
                  <input
                    type="text"
                    required
                    value={dealerForm.name}
                    onChange={(e) => setDealerForm({ ...dealerForm, name: e.target.value })}
                    placeholder="e.g. Gujarat Industrial Solutions"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Partner Type</label>
                  <select
                    value={dealerForm.type}
                    onChange={(e) => setDealerForm({ ...dealerForm, type: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg text-sm bg-white focus:ring-2 focus:ring-red-500"
                  >
                    <option value="Authorized Dealer">Authorized Dealer</option>
                    <option value="Premium Partner">Premium Partner</option>
                    <option value="Service Partner">Service Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={dealerForm.address}
                  onChange={(e) => setDealerForm({ ...dealerForm, address: e.target.value })}
                  placeholder="GIDC Estate, Plot 12, Area"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">City</label>
                  <input
                    type="text"
                    value={dealerForm.city}
                    onChange={(e) => setDealerForm({ ...dealerForm, city: e.target.value })}
                    placeholder="Ahmedabad"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">State</label>
                  <input
                    type="text"
                    value={dealerForm.state}
                    onChange={(e) => setDealerForm({ ...dealerForm, state: e.target.value })}
                    placeholder="Gujarat"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Pincode</label>
                  <input
                    type="text"
                    value={dealerForm.pincode}
                    onChange={(e) => setDealerForm({ ...dealerForm, pincode: e.target.value })}
                    placeholder="382430"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Phone</label>
                  <input
                    type="text"
                    value={dealerForm.phone}
                    onChange={(e) => setDealerForm({ ...dealerForm, phone: e.target.value })}
                    placeholder="+91-..."
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={dealerForm.email}
                    onChange={(e) => setDealerForm({ ...dealerForm, email: e.target.value })}
                    placeholder="dealer@example.com"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Website</label>
                  <input
                    type="text"
                    value={dealerForm.website}
                    onChange={(e) => setDealerForm({ ...dealerForm, website: e.target.value })}
                    placeholder="www.dealer.com"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Experience</label>
                  <input
                    type="text"
                    value={dealerForm.experience}
                    onChange={(e) => setDealerForm({ ...dealerForm, experience: e.target.value })}
                    placeholder="12+ years"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Service Area Coverage</label>
                  <input
                    type="text"
                    value={dealerForm.serviceArea}
                    onChange={(e) => setDealerForm({ ...dealerForm, serviceArea: e.target.value })}
                    placeholder="Ahmedabad, Gandhinagar, Sanand"
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Specialties (Comma separated)
                </label>
                <input
                  type="text"
                  value={dealerForm.specialties}
                  onChange={(e) => setDealerForm({ ...dealerForm, specialties: e.target.value })}
                  placeholder="Screw Compressors, Spare Parts, AMC Service"
                  className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-red-500"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isActiveDealer"
                  checked={dealerForm.isActive}
                  onChange={(e) => setDealerForm({ ...dealerForm, isActive: e.target.checked })}
                  className="h-4 w-4 text-red-600 rounded border-gray-300"
                />
                <label htmlFor="isActiveDealer" className="text-xs font-medium text-gray-700">
                  Active (Visible on public locator when tab is enabled)
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 border rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingDealer}
                  className="inline-flex items-center gap-2 px-5 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-semibold disabled:opacity-50"
                >
                  {savingDealer ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  {savingDealer ? 'Saving...' : 'Save Dealer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

