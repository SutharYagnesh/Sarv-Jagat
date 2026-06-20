'use client';
import { useEffect, useState } from 'react';
import { Package, Tags, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ products: 0, categories: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch('/api/admin/products'),
          fetch('/api/admin/categories')
        ]);
        const products = await prodRes.json();
        const categories = await catRes.json();
        setStats({
          products: Array.isArray(products) ? products.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0
        });
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
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link href="/admin/products/new" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-red-700">Add New Product</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            </Link>
            <Link href="/admin/products" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-red-700">Manage Products</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            </Link>
            <Link href="/admin/categories" className="flex items-center justify-between p-3 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors group">
              <span className="font-medium text-gray-700 group-hover:text-red-700">Manage Categories</span>
              <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-600" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
