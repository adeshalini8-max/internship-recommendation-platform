import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  MapPin, 
  Mail, 
  FileText, 
  Award, 
  Activity, 
  Clock, 
  Briefcase, 
  CheckCircle2, 
  Edit3, 
  Camera,
  TrendingUp,
  Sparkles
} from 'lucide-react';

const Profile = () => {
  // Mock User Data
  const [userData] = useState({
    name: "Aditya Developer",
    role: "Full Stack & AI Developer",
    location: "Bhopal, India",
    email: "aditya.dev@example.com",
    education: "B.Tech in Artificial Intelligence & Machine Learning",
    resumeScore: 92,
    parsedSkills: [
      "React.js", "Node.js", "Express", "MongoDB", 
      "Python", "Large Language Models (LLMs)", "Computer Vision", "Tailwind CSS"
    ],
    domains: ["AI/ML Engineering", "Full Stack Web Development", "Open Source"],
    activity: [
      { id: 1, action: "Applied for AI/ML Intern", company: "DataMind AI", time: "2 hours ago", icon: <Briefcase className="w-4 h-4 text-blue-400" /> },
      { id: 2, action: "Resume Parsed Successfully", company: "InternMatch System", time: "1 day ago", icon: <CheckCircle2 className="w-4 h-4 text-green-400" /> },
      { id: 3, action: "Saved 3 new Frontend roles", company: "Various", time: "2 days ago", icon: <Award className="w-4 h-4 text-yellow-400" /> },
    ]
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
  };

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full min-h-screen">
      
      {/* Page Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold mb-2 text-slate-100 flex items-center gap-3">
            <User className="w-8 h-8 text-indigo-400" />
            My Profile
          </h1>
          <p className="text-slate-400">Manage your personal information and resume status.</p>
        </div>
        <button className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-[0_0_15px_rgba(99,102,241,0.3)] flex items-center gap-2 self-start sm:self-auto">
          <Edit3 className="w-4 h-4" /> Edit Profile
        </button>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        {/* ================= LEFT COLUMN: IDENTITY CARD ================= */}
        <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
          
          {/* Main User Card */}
          <div className="glass-card p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-indigo-600/40 to-purple-600/40 border-b border-white/5" />
            
            <div className="relative pt-8 flex flex-col items-center text-center">
              <div className="relative mb-4 group cursor-pointer">
                <div className="w-28 h-28 rounded-full bg-slate-800 border-4 border-slate-900 shadow-xl overflow-hidden flex items-center justify-center">
                  <User className="w-12 h-12 text-slate-500" />
                </div>
                <div className="absolute inset-0 bg-slate-900/60 rounded-full opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity border-4 border-transparent">
                  <Camera className="w-6 h-6 text-white" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold text-slate-100">{userData.name}</h2>
              <p className="text-indigo-400 font-medium mt-1">{userData.role}</p>
              
              <div className="w-full mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50">
                  <MapPin className="w-4 h-4 text-slate-400" />
                  <span>{userData.location}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-300 bg-slate-800/50 p-3 rounded-xl border border-slate-700/50 overflow-hidden">
                  <Mail className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  <span className="truncate">{userData.email}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Education Mini Card */}
          <div className="glass-panel p-6 rounded-2xl border-l-4 border-l-purple-500">
            <h3 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-2">Education</h3>
            <p className="font-medium text-slate-200">{userData.education}</p>
          </div>
        </motion.div>

        {/* ================= RIGHT COLUMN: RESUME & ACTIVITY ================= */}
        <motion.div variants={itemVariants} className="lg:col-span-2 space-y-6">
          
          {/* Resume Analytics Section */}
          <div className="glass-card p-6 sm:p-8 rounded-3xl">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
                <FileText className="w-5 h-5 text-indigo-400" /> 
                Resume Analytics
              </h3>
              <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3" />
                Optimized
              </span>
            </div>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {/* Score Circular Progress Simulation */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex items-center gap-6">
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="8" className="text-slate-700" />
                    <circle 
                      cx="40" cy="40" r="36" fill="transparent" stroke="currentColor" strokeWidth="8" 
                      strokeDasharray={`${2 * Math.PI * 36}`} 
                      strokeDashoffset={`${2 * Math.PI * 36 * (1 - userData.resumeScore / 100)}`}
                      className="text-indigo-500 transition-all duration-1000 ease-out" 
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-slate-100">{userData.resumeScore}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-slate-200">ATS Match Score</h4>
                  <p className="text-xs text-slate-400 mt-1">Excellent formatting. Ready for applications.</p>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700 flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-500/20 rounded-lg">
                    <TrendingUp className="w-4 h-4 text-purple-400" />
                  </div>
                  <span className="font-medium text-slate-300">Profile Strength: High</span>
                </div>
                <button className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors text-left flex items-center gap-1">
                  View full analysis &rarr;
                </button>
              </div>
            </div>

            {/* Extracted Skills */}
            <div className="mb-8">
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Extracted Skills</h4>
              <div className="flex flex-wrap gap-2">
                {userData.parsedSkills.map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 transition-colors cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Preferred Domains */}
            <div>
              <h4 className="text-sm font-semibold text-slate-400 uppercase tracking-wider mb-4">Target Domains</h4>
              <div className="flex flex-wrap gap-2">
                {userData.domains.map((domain, i) => (
                  <span key={i} className="px-3 py-1.5 text-sm font-medium rounded-lg bg-purple-500/10 text-purple-300 border border-purple-500/20 cursor-default">
                    {domain}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Activity Timeline */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2 mb-6">
              <Activity className="w-5 h-5 text-indigo-400" /> 
              Recent Activity
            </h3>
            
            <div className="space-y-6">
              {userData.activity.map((act, i) => (
                <div key={act.id} className="relative pl-8">
                  {/* Timeline Line */}
                  {i !== userData.activity.length - 1 && (
                    <div className="absolute left-[11px] top-8 bottom-[-24px] w-px bg-slate-700" />
                  )}
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center z-10">
                    {act.icon}
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-slate-200">{act.action}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-slate-400">{act.company}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-600" />
                      <span className="flex items-center gap-1 text-xs text-slate-500">
                        <Clock className="w-3 h-3" /> {act.time}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-8 py-3 border border-slate-700 hover:bg-slate-800 rounded-xl text-sm font-medium text-slate-300 transition-colors">
              View Full History
            </button>
          </div>

        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;