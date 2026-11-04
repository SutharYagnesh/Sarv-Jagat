'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingBag,
  ExternalLink,
  Copy,
  Check,
  Search,
  CheckCircle2,
  XCircle,
  HelpCircle,
  RefreshCw,
  Sparkles,
  Layers,
  FileText,
  AlertCircle
} from 'lucide-react';
import Image from 'next/image';

export default function MerchantAdminPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ stats: null, products: [], blogs: [] });
  const [activeTab, setActiveTab] = useState('products'); // 'products' | 'blogs'
  const [search, setSearch] = useState('');
  const [copied, setCopied] = useState(false);
  const [updatingId, setUpdatingId] = useState(null);
  const [message, setMessage] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/merchant');
      if (res.ok) {
        const json = await res.json();
        setData(json);
      }
    } catch (err) {
      console.error('Failed to load merchant data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCopyUrl = () => {
    const url = data.stats?.feedUrl || 'https://www.sarvjagat.com/google-merchant.xml';
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleToggle = async (type, item) => {
    const newStatus = !item.includeInMerchant;
    setUpdatingId(item._id);

    // Optimistic UI update
    if (type === 'product') {
      setData((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p._id === item._id ? { ...p, includeInMerchant: newStatus } : p
        ),
        stats: {
          ...prev.stats,
          totalProductsInFeed: newStatus
            ? prev.stats.totalProductsInFeed + 1
            : Math.max(0, prev.stats.totalProductsInFeed - 1),
        },
      }));
    } else {
      setData((prev) => ({
        ...prev,
        blogs: prev.blogs.map((b) =>
          b._id === item._id ? { ...b, includeInMerchant: newStatus } : b
        ),
        stats: {
          ...prev.stats,
          totalBlogsInFeed: newStatus
            ? prev.stats.totalBlogsInFeed + 1
            : Math.max(0, prev.stats.totalBlogsInFeed - 1),
        },
      }));
    }

    try {
      const res = await fetch('/api/admin/merchant', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          id: item._id,
          includeInMerchant: newStatus,
        }),
      });

      if (res.ok) {
        setMessage({
          type: 'success',
          text: `Updated "${item.title}": ${newStatus ? 'Included in' : 'Removed from'} Google Merchant Feed.`,
        });
        setTimeout(() => setMessage(null), 4000);
      } else {
        fetchData();
        setMessage({ type: 'error', text: 'Failed to update merchant status.' });
      }
    } catch (err) {
      console.error(err);
      fetchData();
      setMessage({ type: 'error', text: 'Network error updating merchant status.' });
    } finally {
      setUpdatingId(null);
    }
  };

  const handlePriceChange = async (type, item, newPrice) => {
    const parsed = Number(newPrice);
    const validPrice = isNaN(parsed) || parsed < 0 ? 0 : parsed;

    if (type === 'product') {
      setData((prev) => ({
        ...prev,
        products: prev.products.map((p) =>
          p._id === item._id ? { ...p, merchantPrice: validPrice } : p
        ),
      }));
    } else {
      setData((prev) => ({
        ...prev,
        blogs: prev.blogs.map((b) =>
          b._id === item._id ? { ...b, merchantPrice: validPrice } : b
        ),
      }));
    }

    try {
      await fetch('/api/admin/merchant', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          id: item._id,
          merchantPrice: validPrice,
        }),
      });
    } catch (err) {
      console.error('Failed to update price', err);
    }
  };

  const filteredProducts = data.products.filter((p) => {
    const q = search.toLowerCase();
    return (
      (p.title && p.title.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
    );
  });

  const filteredBlogs = data.blogs.filter((b) => {
    const q = search.toLowerCase();
    return (
      (b.title && b.title.toLowerCase().includes(q)) ||
      (b.category && b.category.toLowerCase().includes(q))
    );
  });

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-red-600" />
            Google Merchant &amp; Shopping Controls
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            Control which products and supplied machinery blogs appear in Google Shopping, Google Merchant Center, and Meta Catalog.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={fetchData}
            disabled={loading}
            className="px-3 py-2 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-1.5 transition-colors"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Feed URL Banner */}
      <div className="bg-gradient-to-r from-red-50 via-white to-red-50 border border-red-200 rounded-xl p-4 sm:p-5 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-800 border border-green-200">
                <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span>
                Feed Live
              </span>
              <span className="text-xs text-gray-500 font-medium">Standard RSS 2.0 / Google Base XML</span>
            </div>
            <div className="text-xs sm:text-sm text-gray-700 font-mono break-all font-semibold">
              {data.stats?.feedUrl || 'https://www.sarvjagat.com/google-merchant.xml'}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={handleCopyUrl}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 text-xs sm:text-sm font-medium flex items-center gap-1.5 shadow-sm transition-all"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied URL!' : 'Copy Feed URL'}</span>
            </button>
            <a
              href="/google-merchant.xml"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 text-xs sm:text-sm font-medium flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-gray-500" />
              <span>Preview XML</span>
            </a>
          </div>
        </div>
      </div>

      {/* Notification */}
      {message && (
        <div
          className={`p-3.5 rounded-xl border text-sm flex items-center gap-2 animate-fade-in ${
            message.type === 'success'
              ? 'bg-green-50 border-green-200 text-green-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          {message.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-green-600" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
          )}
          <span>{message.text}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-medium text-gray-500">Products in Feed</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {data.stats?.totalProductsInFeed || 0}
            <span className="text-xs text-gray-400 font-normal ml-1.5">
              / {data.stats?.totalProducts || 0} total
            </span>
          </div>
          <div className="text-[11px] text-green-600 mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3" /> Enabled for Shopping
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-medium text-gray-500">Blogs in Feed</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">
            {data.stats?.totalBlogsInFeed || 0}
            <span className="text-xs text-gray-400 font-normal ml-1.5">
              / {data.stats?.totalBlogs || 0} total
            </span>
          </div>
          <div className="text-[11px] text-blue-600 mt-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3" /> Machinery Installations
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-medium text-gray-500">Total Feed Items</div>
          <div className="text-2xl font-bold text-red-600 mt-1">
            {(data.stats?.totalProductsInFeed || 0) + (data.stats?.totalBlogsInFeed || 0)}
          </div>
          <div className="text-[11px] text-gray-500 mt-1">Exported to Merchant Center</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-xs">
          <div className="text-xs font-medium text-gray-500">Quote / Ask for Price</div>
          <div className="text-2xl font-bold text-gray-900 mt-1">₹1.00 INR</div>
          <div className="text-[11px] text-gray-500 mt-1">Labeled &ldquo;Ask for Quote&rdquo; in Google</div>
        </div>
      </div>

      {/* Tabs & Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Tabs */}
        <div className="flex p-1 bg-gray-100 rounded-lg max-w-fit">
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center gap-2 ${
              activeTab === 'products'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Layers className="w-4 h-4 text-red-600" />
            <span>Products ({filteredProducts.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all flex items-center gap-2 ${
              activeTab === 'blogs'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <FileText className="w-4 h-4 text-red-600" />
            <span>Blogs / Supplied Equipment ({filteredBlogs.length})</span>
          </button>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={`Search ${activeTab}...`}
            className="w-full pl-9 pr-4 py-2 text-xs sm:text-sm bg-white border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
          />
        </div>
      </div>

      {/* Product Tab Content */}
      {activeTab === 'products' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between text-xs text-gray-600">
            <span>
              Showing {filteredProducts.length} products. Turn toggle ON to include in Google Merchant Feed.
            </span>
            <span className="hidden md:inline text-gray-400">
              Prices &le; ₹1 are automatically labeled &ldquo;Ask for Quote&rdquo; in Google Shopping.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">In Feed</th>
                  <th className="py-3 px-4">Product</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Catalog Price</th>
                  <th className="py-3 px-4">Merchant Feed Price</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredProducts.map((p) => {
                  const isUpdating = updatingId === p._id;
                  const effectivePrice = p.merchantPrice && p.merchantPrice > 1
                    ? p.merchantPrice
                    : (p.price && p.price > 1 ? p.price : 1);
                  const isQuoteOnly = effectivePrice <= 1;

                  return (
                    <tr
                      key={p._id}
                      className={`hover:bg-gray-50/80 transition-colors ${
                        p.includeInMerchant ? 'bg-white' : 'bg-gray-50/40 opacity-70'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggle('product', p)}
                          disabled={isUpdating}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            p.includeInMerchant ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              p.includeInMerchant ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded border border-gray-200 bg-white shrink-0 overflow-hidden">
                            <Image
                              src={p.images?.[0] || '/placeholder.jpg'}
                              alt={p.title}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <a
                              href={`/products/${p.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-gray-900 hover:text-red-600 text-sm line-clamp-1 flex items-center gap-1"
                            >
                              <span>{p.title}</span>
                              <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                            </a>
                            <span className="text-xs text-gray-500 font-mono">slug: {p.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-gray-100 text-gray-800 border border-gray-200">
                          {p.category || 'Uncategorized'}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-xs text-gray-700 whitespace-nowrap font-medium">
                        {p.price && Number(p.price) > 1 ? `₹ ${Number(p.price).toLocaleString('en-IN')}` : 'Ask for Price'}
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            placeholder="₹ Default (Quote)"
                            defaultValue={p.merchantPrice || ''}
                            onBlur={(e) => handlePriceChange('product', p, e.target.value)}
                            className="w-28 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                          />
                          {isQuoteOnly ? (
                            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                              Ask for Quote (₹1)
                            </span>
                          ) : (
                            <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                              Custom ₹{effectivePrice}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-xs">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            String(p.status).toLowerCase() === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {p.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blog / Supplied Equipment Tab Content */}
      {activeTab === 'blogs' && (
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-xs">
          <div className="p-4 border-b bg-gray-50 flex items-center justify-between text-xs text-gray-600">
            <span>
              Showing {filteredBlogs.length} blogs / case studies. Turn toggle ON to export supplied machinery to Google Shopping.
            </span>
            <span className="hidden md:inline text-gray-400">
              Only enabled blogs will be submitted in the feed.
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-100 text-gray-700 text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">In Feed</th>
                  <th className="py-3 px-4">Supplied Machinery / Blog</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Merchant Feed Price</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredBlogs.map((b) => {
                  const isUpdating = updatingId === b._id;
                  const effectivePrice = b.merchantPrice && b.merchantPrice > 1 ? b.merchantPrice : 1;
                  const isQuoteOnly = effectivePrice <= 1;

                  return (
                    <tr
                      key={b._id}
                      className={`hover:bg-gray-50/80 transition-colors ${
                        b.includeInMerchant ? 'bg-white' : 'bg-gray-50/40 opacity-70'
                      }`}
                    >
                      <td className="py-3 px-4">
                        <button
                          type="button"
                          onClick={() => handleToggle('blog', b)}
                          disabled={isUpdating}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
                            b.includeInMerchant ? 'bg-green-600' : 'bg-gray-300'
                          }`}
                        >
                          <span
                            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                              b.includeInMerchant ? 'translate-x-5' : 'translate-x-0'
                            }`}
                          />
                        </button>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 relative rounded border border-gray-200 bg-white shrink-0 overflow-hidden">
                            <Image
                              src={b.imageUrl || b.images?.[0] || '/placeholder.jpg'}
                              alt={b.title}
                              fill
                              sizes="48px"
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="min-w-0">
                            <a
                              href={`/blog/${b.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-medium text-gray-900 hover:text-red-600 text-sm line-clamp-1 flex items-center gap-1"
                            >
                              <span>{b.title}</span>
                              <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                            </a>
                            <span className="text-xs text-gray-500 font-mono">slug: {b.slug}</span>
                          </div>
                        </div>
                      </td>

                      <td className="py-3 px-4 text-xs text-gray-600 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                          {b.category || 'Supplied Equipment'}
                        </span>
                      </td>

                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            min="0"
                            placeholder="₹ 1.00 (Quote)"
                            defaultValue={b.merchantPrice || ''}
                            onBlur={(e) => handlePriceChange('blog', b, e.target.value)}
                            className="w-28 px-2 py-1 text-xs border border-gray-300 rounded focus:ring-1 focus:ring-red-500 focus:outline-none"
                          />
                          {isQuoteOnly ? (
                            <span className="text-[10px] bg-amber-50 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                              Ask for Quote (₹1)
                            </span>
                          ) : (
                            <span className="text-[10px] bg-green-50 text-green-700 border border-green-200 px-1.5 py-0.5 rounded font-semibold whitespace-nowrap">
                              Custom ₹{effectivePrice}
                            </span>
                          )}
                        </div>
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap text-xs">
                        <span
                          className={`px-2 py-0.5 rounded-full font-semibold ${
                            String(b.status).toLowerCase() === 'published'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-yellow-100 text-yellow-800'
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

