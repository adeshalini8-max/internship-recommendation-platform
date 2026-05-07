import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  UploadCloud,
  Briefcase,
  Bookmark,
  User,
  Settings,
  LogOut,
  Bot,
} from 'lucide-react';

const Sidebar = ({ closeMobileMenu }) => {
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

  const handleLinkClick = () => {
    if (closeMobileMenu) closeMobileMenu();
  };

  return (
    <aside
      className="
        group
        h-screen
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

      {/* Main Navigation */}
      <div className="flex-1 px-3 py-6 overflow-y-auto">
        <div
          className="
            text-[11px]
            uppercase
            tracking-[0.2em]
            text-slate-500
            mb-4
            pl-3
            whitespace-nowrap
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
              onClick={handleLinkClick}
              className={({ isActive }) =>
                `
                relative
                flex
                items-center
                h-14
                rounded-2xl
                transition-all
                duration-300
                overflow-hidden
                ${
                  isActive
                    ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shadow-[inset_0_0_20px_rgba(99,102,241,0.12)]'
                    : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
                }
              `
              }
            >
              {/* Icon */}
              <div
                className="
                  min-w-[80px]
                  flex
                  items-center
                  justify-center
                "
              >
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

      {/* Bottom Section */}
      <div className="border-t border-slate-800 p-3 space-y-2">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={handleLinkClick}
            className={({ isActive }) =>
              `
              relative
              flex
              items-center
              h-14
              rounded-2xl
              transition-all
              duration-300
              overflow-hidden
              ${
                isActive
                  ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
                  : 'text-slate-400 hover:bg-slate-800/70 hover:text-slate-100'
              }
            `
            }
          >
            <div
              className="
                min-w-[80px]
                flex
                items-center
                justify-center
              "
            >
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
            text-red-400
            hover:bg-red-500/10
            hover:text-red-300
            transition-all
            duration-300
            overflow-hidden
          "
        >
          <div
            className="
              min-w-[80px]
              flex
              items-center
              justify-center
            "
          >
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
    </aside>
  );
};

export default Sidebar;