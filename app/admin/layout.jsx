'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { LayoutDashboard, Package, Tags, LogOut, Menu, FileText, Users } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    if (pathname !== '/admin/login') {
      fetch('/api/admin/me')
        .then(res => res.json())
        .then(data => {
          if (data && data.role) {
            setRole(data.role);
          }
        })
        .catch(err => console.error('Failed to fetch role', err));
    }
  }, [pathname]);

  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Products', href: '/admin/products', icon: Package },
    { name: 'Categories', href: '/admin/categories', icon: Tags },
    { name: 'Blog', href: '/admin/blog', icon: FileText },
  ];

  if (role === 'Main Admin') {
    navItems.push({ name: 'Users', href: '/admin/users', icon: Users });
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Sidebar Desktop */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col z-10">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="text-xl font-bold text-red-600 tracking-tight">SJ Admin Panel</h1>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 ${
                  isActive ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-4 md:hidden z-10">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 -ml-2 text-gray-600">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-red-600">SJ Admin</h1>
          </div>
          <button onClick={handleLogout} className="p-2 text-gray-600">
            <LogOut className="w-5 h-5" />
          </button>
        </header>

        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="absolute top-16 left-0 right-0 bg-white border-b shadow-md z-20 md:hidden p-4 space-y-2">
             {navItems.map((item) => {
              const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-3 py-3 rounded-md transition-colors ${
                    isActive ? 'bg-red-50 text-red-600 font-medium' : 'text-gray-600'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}

        <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
