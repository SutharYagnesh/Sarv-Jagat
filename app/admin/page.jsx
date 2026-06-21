'use client';
import { useEffect, useState } from 'react';
import { Package, Tags, ArrowRight, FileText, CheckCircle, Clock } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ 
    products: 0, 
    categories: 0, 
    blogs: 0, 
    publishedBlogs: 0, 
    draftBlogs: 0 
  });
  const [recentProducts, setRecentProducts] = useState([]);
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes, blogRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/categories'),
          fetch('/api/blog?includeUnpublished=true')
        ]);
        const products = await prodRes.json();
        const categories = await catRes.json();
        const blogsData = await blogRes.json();
        
        const productsList = Array.isArray(products) ? products : [];
        const categoriesList = Array.isArray(categories) ? categories : [];
        const blogsList = Array.isArray(blogsData.posts) ? blogsData.posts : [];

        setStats({
          products: productsList.length,
          categories: categoriesList.length,
          blogs: blogsList.length,
          publishedBlogs: blogsList.filter(b => b.status === 'published').length,
          draftBlogs: blogsList.filter(b => b.status === 'draft').length
        });
        
        // Sort by createdAt / publishedAt descending and take top 5
        const sortedProducts = [...productsList].sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)).slice(0, 5);
        const sortedBlogs = [...blogsList].sort((a, b) => new Date(b.publishedAt || 0) - new Date(a.publishedAt || 0)).slice(0, 5);
        
        setRecentProducts(sortedProducts);
        setRecentBlogs(sortedBlogs);
      } catch (error) {
        console.error('Failed to fetch stats', error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Products</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{loading ? '...' : stats.products}</p>
          </div>
          <div className="p-4 bg-red-50 rounded-full text-red-600">
            <Package className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Categories</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{loading ? '...' : stats.categories}</p>
          </div>
          <div className="p-4 bg-blue-50 rounded-full text-blue-600">
            <Tags className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total Blogs</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{loading ? '...' : stats.blogs}</p>
          </div>
          <div className="p-4 bg-purple-50 rounded-full text-purple-600">
            <FileText className="w-8 h-8" />
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Published / Draft</p>
            <p className="text-xl font-bold text-gray-900 mt-1">
              {loading ? '...' : <span className="text-green-600">{stats.publishedBlogs}</span>} / {loading ? '...' : <span className="text-orange-500">{stats.draftBlogs}</span>}
            </p>
          </div>
          <div className="p-4 bg-green-50 rounded-full text-green-600 flex space-x-2">
            <CheckCircle className="w-4 h-4" />
            <Clock className="w-4 h-4 text-orange-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Quick Actions */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-fit">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/products/new" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-red-700">Add New Product</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            </Link>
            <Link href="/admin/blog" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-red-700">Manage Blogs</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            </Link>
            <Link href="/admin/categories" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-red-700">Manage Categories</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            </Link>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Added Products</h2>
            {loading ? <p className="text-sm text-gray-500">Loading...</p> : (
              <ul className="space-y-3">
                {recentProducts.length === 0 ? <p className="text-sm text-gray-500">No products found.</p> : recentProducts.map(p => (
                  <li key={p._id || p.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                    <span className="font-medium text-gray-700 truncate max-w-[200px]">{p.title}</span>
                    <span className="text-gray-500">{p.category}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Recently Updated Blogs</h2>
            {loading ? <p className="text-sm text-gray-500">Loading...</p> : (
              <ul className="space-y-3">
                {recentBlogs.length === 0 ? <p className="text-sm text-gray-500">No blogs found.</p> : recentBlogs.map(b => (
                  <li key={b.id} className="flex justify-between items-center text-sm border-b pb-2 last:border-0 last:pb-0">
                    <span className="font-medium text-gray-700 truncate max-w-[200px]">{b.title}</span>
                    <span className={`px-2 py-1 rounded text-xs ${b.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>{b.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
