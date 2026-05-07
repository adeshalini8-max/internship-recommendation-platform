import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Briefcase, 
  Bookmark, 
  TrendingUp, 
  ChevronRight, 
  Zap,
  MapPin,
  AlertCircle,
  Plus
} from 'lucide-react';

const Dashboard = () => {
  // Realistic Production Data Placeholders
  const stats = [
    { label: "Profile Match Rate", value: "94%", icon: <Zap className="w-5 h-5 text-indigo-400" />, trend: "+2.5% this week", positive: true },
    { label: "Saved Internships", value: "12", icon: <Bookmark className="w-5 h-5 text-slate-400" />, trend: "3 expiring soon", positive: false },
    { label: "Active Applications", value: "3", icon: <Briefcase className="w-5 h-5 text-slate-400" />, trend: "1 in review stage", positive: true },
  ];

  const recommendations = [
    { id: 1, role: "Frontend Developer Intern", company: "TechNova Solutions", location: "Remote", match: 96, stipend: "₹15,000/mo", posted: "2h ago", logo: "T" },
    { id: 2, role: "React UI/UX Engineer", company: "DesignX Studio", location: "Bengaluru, KA", match: 92, stipend: "₹20,000/mo", posted: "5h ago", logo: "D" },
    { id: 3, role: "Web Development Intern", company: "StartUp Inc.", location: "Pune, MH", match: 88, stipend: "₹10,000/mo", posted: "1d ago", logo: "S" },
    { id: 4, role: "Software Engineering Intern", company: "CloudCore", location: "Hybrid", match: 85, stipend: "₹25,000/mo", posted: "2d ago", logo: "C" },
    { id: 5, role: "Full Stack Engineering Intern", company: "DevSphere", location: "Remote", match: 82, stipend: "₹18,000/mo", posted: "3d ago", logo: "D" },
  ];

  return (
    <div className="p-6 lg:p-12 max-w-6xl mx-auto w-full min-h-screen bg-slate-950">
      
      {/* Header Section */}
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-100 tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-2">Welcome back. Here is your internship search status.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Link to="/upload" className="px-4 py-2 bg-slate-900 border border-slate-800 hover:bg-slate-800 hover:border-slate-700 text-slate-200 rounded-lg text-sm font-medium transition-all shadow-sm flex items-center gap-2">
            <Plus className="w-4 h-4" /> Update Resume
          </Link>
          <Link to="/recommendations" className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium transition-all shadow-sm">
            Browse All
          </Link>
        </div>
      </motion.div>

      {/* Top Metrics Grid */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
      >
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-slate-900/40 border border-slate-800/60 p-6 rounded-2xl flex flex-col transition-colors hover:border-slate-700/60 hover:bg-slate-900/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-slate-950 rounded-lg border border-slate-800/60">
                {stat.icon}
              </div>
              <p className="text-sm font-medium text-slate-400">{stat.label}</p>
            </div>
            
            <h3 className="text-3xl font-bold text-slate-100 mb-4">{stat.value}</h3>
            
            <div className="flex items-center gap-2 mt-auto">
              {stat.positive ? (
                <TrendingUp className="w-4 h-4 text-emerald-500" />
              ) : (
                <AlertCircle className="w-4 h-4 text-amber-500" />
              )}
              <span className={`text-xs font-medium ${stat.positive ? 'text-emerald-500' : 'text-amber-500'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Content - Minimalist List View */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mb-10"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
            <Zap className="w-4 h-4 text-indigo-400" />
            Top AI Matches
          </h2>
        </div>

        {/* Clean, border-separated list */}
        <div className="border-t border-slate-800/60">
          {recommendations.map((job) => (
            <div 
              key={job.id} 
              className="py-5 border-b border-slate-800/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group hover:bg-slate-900/20 transition-colors -mx-4 px-4 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center font-bold text-slate-400 flex-shrink-0 group-hover:border-slate-700 transition-colors">
                  {job.logo}
                </div>
                <div>
                  <h4 className="text-base font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                    {job.role}
                  </h4>
                  <div className="flex items-center gap-3 mt-1 text-sm text-slate-500">
                    <span className="font-medium">{job.company}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
                    <span className="w-1 h-1 rounded-full bg-slate-700" />
                    <span>{job.posted}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 self-start sm:self-auto sm:ml-0">
                <div className="text-right flex sm:flex-col items-center sm:items-end gap-3 sm:gap-1">
                  <div className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-md border border-emerald-400/20">
                    {job.match}% Match
                  </div>
                  <div className="text-sm font-medium text-slate-400">{job.stipend}</div>
                </div>
                <button className="p-2 text-slate-500 group-hover:text-indigo-400 group-hover:bg-indigo-500/10 rounded-lg transition-all hidden sm:block">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-8 text-center">
          <Link to="/recommendations" className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-indigo-400 transition-colors">
            View all matching roles <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </motion.div>

    </div>
  );
};

export default Dashboard;