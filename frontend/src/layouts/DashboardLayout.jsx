import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

import {
  LayoutDashboard,
  UploadCloud,
  Briefcase,
  Bookmark,
  User,
  Settings,
  LogOut,
  Menu,
  X,
  Bot,
} from 'lucide-react';

const DashboardLayout = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    {
      name: 'Dashboard',
      path: '/dashboard',
      icon: <LayoutDashboard size={22} />,
    },
    {
      name: 'Upload Resume',
      path: '/upload',
      icon: <UploadCloud size={22} />,
    },
    {
      name: 'Recommendations',
      path: '/recommendations',
      icon: <Briefcase size={22} />,
    },
    {
      name: 'Saved Internships',
      path: '/saved',
      icon: <Bookmark size={22} />,
    },
  ];

  const bottomNavItems = [
    {
      name: 'Profile',
      path: '/profile',
      icon: <User size={22} />,
    },
    {
      name: 'Settings',
      path: '/settings',
      icon: <Settings size={22} />,
    },
  ];

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  // Sidebar Component
  const SidebarContent = () => (
    <div
      className="
        group
        h-full
        bg-slate-950/95
        backdrop-blur-xl
        border-r
        border-slate-800
        flex
        flex-col
        transition-all
        duration-300
        ease-in-out
        w-[80px]
        hover:w-[260px]
        overflow-hidden
        shadow-2xl
      "
    >
      {/* Logo */}
      <div className="h-20 border-b border-slate-800 flex items-center px-5">
        <div className="flex items-center gap-4 min-w-max">
          <div
            className="
              w-11
              h-11
              rounded-2xl
              bg-gradient-to-br
              from-indigo-600
              to-purple-600
              flex
              items-center
              justify-center
              shadow-[0_0_25px_rgba(99,102,241,0.45)]
              shrink-0
            "
          >
            <Bot className="text-white" size={24} />
          </div>

          <h1
            className="
              text-xl
              font-bold
              whitespace-nowrap
              opacity-0
              -translate-x-4
              group-hover:opacity-100
              group-hover:translate-x-0
              transition-all
              duration-300
              delay-100
              bg-gradient-to-r
              from-indigo-400
              to-purple-400
              bg-clip-text
              text-transparent
            "
          >
            InternMatch
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <div
          className="
            text-[11px]
            uppercase
            tracking-[0.2em]
            text-slate-500
            mb-4
            pl-3
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-300
          "
        >
          Menu
        </div>

        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={closeMobileMenu}
              className={({ isActive }) =>
                `
                relative
                flex
                items-center
                h-14
                rounded-2xl
                overflow-hidden
                transition-all
                duration-300
                ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                }
              `
              }
            >
              {/* Icon */}
              <div className="min-w-[80px] flex items-center justify-center">
                {item.icon}
              </div>

              {/* Label */}
              <span
                className="
                  whitespace-nowrap
                  font-medium
                  opacity-0
                  translate-x-3
                  group-hover:opacity-100
                  group-hover:translate-x-0
                  transition-all
                  duration-300
                "
              >
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Bottom Nav */}
      <div className="border-t border-slate-800 p-3 space-y-2">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMobileMenu}
            className={({ isActive }) =>
              `
              relative
              flex
              items-center
              h-14
              rounded-2xl
              overflow-hidden
              transition-all
              duration-300
              ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
              }
            `
            }
          >
            <div className="min-w-[80px] flex items-center justify-center">
              {item.icon}
            </div>

            <span
              className="
                whitespace-nowrap
                font-medium
                opacity-0
                translate-x-3
                group-hover:opacity-100
                group-hover:translate-x-0
                transition-all
                duration-300
              "
            >
              {item.name}
            </span>
          </NavLink>
        ))}

        {/* Logout */}
        <button
          className="
            w-full
            flex
            items-center
            h-14
            rounded-2xl
            overflow-hidden
            text-red-400
            hover:bg-red-500/10
            hover:text-red-300
            transition-all
            duration-300
          "
        >
          <div className="min-w-[80px] flex items-center justify-center">
            <LogOut size={22} />
          </div>

          <span
            className="
              whitespace-nowrap
              font-medium
              opacity-0
              translate-x-3
              group-hover:opacity-100
              group-hover:translate-x-0
              transition-all
              duration-300
            "
          >
            Logout
          </span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-950 flex overflow-hidden">
      {/* Ambient Glow */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Desktop Sidebar */}
      <aside className="hidden lg:block h-screen sticky top-0 z-40">
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-slate-900/90 backdrop-blur-xl border-b border-slate-800 z-50 flex items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center">
            <Bot className="text-white" size={20} />
          </div>

          <span className="font-semibold text-slate-200">
            InternMatch
          </span>
        </div>

        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="text-slate-400 hover:text-white transition-colors"
        >
          {isMobileMenuOpen ? (
            <X size={26} />
          ) : (
            <Menu size={26} />
          )}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
            />

            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{
                duration: 0.3,
                ease: 'easeInOut',
              }}
              className="fixed top-0 left-0 h-full z-50 lg:hidden pt-16"
            >
              <div className="w-[260px] h-full">
                <SidebarContent />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto h-screen relative z-10 pt-16 lg:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="min-h-full"
        >
          <Outlet />
        </motion.div>
      </main>
    </div>
  );
};

export default DashboardLayout;