'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Package,
  Tags,
  LogOut,
  Menu,
  X,
  FileText,
  Users,
  Building2,
  BookOpen,
  ShieldCheck,
} from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState({ username: '', role: null });

  useEffect(() => {
    if (pathname !== '/admin/login') {
      fetch('/api/admin/me')
        .then((res) => res.json())
        .then((data) => {
          if (data && data.role) {
            setUser({ username: data.username || '', role: data.role });
          }
        })
        .catch((err) => console.error('Failed to fetch user info', err));
    }
  }, [pathname]);

  if (pathname === '/admin/login') {
    return children;
  }

  const handleLogout = () => {
    document.cookie = 'admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  const navItems = [{ name: 'Dashboard', href: '/admin', icon: LayoutDashboard }];

  if (user.role === 'Blogger') {
    navItems.push({ name: 'Blog', href: '/admin/blog', icon: FileText });
  } else if (user.role === 'Product Manager') {
    navItems.push({ name: 'Products', href: '/admin/products', icon: Package });
  } else if (user.role === 'Manager') {
    navItems.push({ name: 'Products', href: '/admin/products', icon: Package });
    navItems.push({ name: 'Categories', href: '/admin/categories', icon: Tags });
    navItems.push({ name: 'Blog', href: '/admin/blog', icon: FileText });
    navItems.push({ name: 'Catalogs', href: '/admin/catalog', icon: BookOpen });
  } else {
    // Main Admin or default
    navItems.push({ name: 'Products', href: '/admin/products', icon: Package });
    navItems.push({ name: 'Categories', href: '/admin/categories', icon: Tags });
    navItems.push({ name: 'Blog', href: '/admin/blog', icon: FileText });
    navItems.push({ name: 'Catalogs', href: '/admin/catalog', icon: BookOpen });
    if (user.role === 'Main Admin') {
      navItems.push({ name: 'Company Info', href: '/admin/settings', icon: Building2 });
      navItems.push({ name: 'Users', href: '/admin/users', icon: Users });
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-gray-900">
      {/* Desktop Sidebar (Visible on md and up) */}
      <aside className="w-64 bg-white border-r shadow-sm hidden md:flex flex-col z-20 shrink-0">
        <div className="h-16 flex items-center justify-between px-6 border-b">
          <Link href="/admin" className="text-xl font-bold text-red-600 tracking-tight flex items-center gap-2">
            <span>SJ Admin</span>
          </Link>
          {user.role && (
            <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-700 rounded-full border border-red-100 uppercase tracking-wider">
              {user.role}
            </span>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 text-sm ${
                  isActive
                    ? 'bg-red-50 text-red-600 font-semibold shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Card & Logout */}
        <div className="p-4 border-t space-y-3 bg-gray-50/50">
          {user.username && (
            <div className="flex items-center gap-2 px-1 text-xs text-gray-500">
              <ShieldCheck className="w-3.5 h-3.5 text-green-600 shrink-0" />
              <span className="truncate">
                Logged in as <strong>{user.username}</strong>
              </span>
            </div>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 bg-white hover:bg-gray-100 transition-colors shadow-xs"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Backdrop & Drawer */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-xs z-40 md:hidden animate-fade-in"
        />
      )}

      {/* Mobile Drawer (Left slide-over) */}
      <div
        className={`fixed inset-y-0 left-0 w-72 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden flex flex-col ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="h-16 flex items-center justify-between px-5 border-b">
          <div>
            <h2 className="text-lg font-bold text-red-600">Sarv Jagat Admin</h2>
            {user.role && <p className="text-[11px] text-gray-500">{user.role}</p>}
          </div>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (pathname.startsWith(item.href) && item.href !== '/admin');
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive ? 'bg-red-50 text-red-600 font-bold' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t space-y-2 bg-gray-50">
          {user.username && (
            <p className="text-xs text-gray-500 truncate px-1">
              Signed in: <strong>{user.username}</strong>
            </p>
          )}
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-300 rounded-lg text-xs font-semibold text-gray-700 hover:bg-gray-100 transition-colors"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b shadow-xs flex items-center justify-between px-4 md:hidden z-10 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-2 -ml-2 text-gray-700 hover:bg-gray-100 rounded-lg"
              title="Open Navigation Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-base font-bold text-red-600">SJ Admin</h1>
          </div>

          <div className="flex items-center gap-2">
            {user.role && (
              <span className="text-[10px] font-bold px-2 py-0.5 bg-red-50 text-red-700 rounded-full border border-red-100">
                {user.role}
              </span>
            )}
            <button
              onClick={handleLogout}
              className="p-2 text-gray-600 hover:text-red-600 hover:bg-gray-100 rounded-lg"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}
