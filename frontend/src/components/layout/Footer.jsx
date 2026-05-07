import { Link } from 'react-router-dom';
// Look here! Linkedin, Github, and Twitter are REMOVED from this line:
import { Bot, ArrowRight, Mail } from 'lucide-react';

// ============================================================================
// CUSTOM ICONS (Bypasses the lucide-react Vite caching error)
// ============================================================================

const CustomGithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 9 18v4"></path>
  </svg>
);

const CustomLinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const CustomTwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-800 bg-slate-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center transition-all group-hover:shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-200">InternMatch</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              Find your perfect internship using our intelligent recommendation engine. Empowering students to kickstart their careers with AI.
            </p>
            <div className="flex items-center gap-4 pt-2">
              <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors">
                <CustomTwitterIcon className="w-5 h-5" />
              </a>
              <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors">
                <CustomLinkedinIcon className="w-5 h-5" />
              </a>
              <a href="#" aria-label="GitHub" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-indigo-500/20 hover:text-indigo-400 transition-colors">
                <CustomGithubIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-6">Product</h3>
            <ul className="space-y-3">
              {['Features', 'How it Works', 'Pricing', 'FAQ'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-indigo-400 hover:translate-x-1 inline-block transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-6">Company</h3>
            <ul className="space-y-3">
              {['About Us', 'Careers', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-sm text-slate-400 hover:text-indigo-400 hover:translate-x-1 inline-block transition-all">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-semibold text-slate-200 mb-6">Stay Updated</h3>
            <p className="text-sm text-slate-400 mb-4">
              Get the latest internship opportunities and AI tips directly in your inbox.
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <Mail className="absolute left-3 w-5 h-5 text-slate-500" />
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pl-10 pr-12 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-slate-200 placeholder:text-slate-500"
                required
              />
              <button type="submit" aria-label="Subscribe" className="absolute right-2 p-1.5 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Copyright Bottom */}
        <div className="pt-8 border-t border-slate-800/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            © {currentYear} InternMatch AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-sm text-slate-500">
            Made with <span className="text-red-500">♥</span> for students.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;