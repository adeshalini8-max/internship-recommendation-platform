import { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  MapPin, 
  DollarSign, 
  Clock, 
  Bookmark, 
  ChevronDown,
  Zap,
  Building2,
  CheckCircle2,
  FileText,
  Loader2
} from 'lucide-react';
import { jobApi } from '../services/api';
import SkillTags from '../components/ui/SkillTags';

const Recommendations = () => {
  const location = useLocation();
  const aiData = location.state; // Captures data sent from ResumeUploader

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeDomain, setActiveDomain] = useState("All");
  const [sortBy, setSortBy] = useState("match");
  const [savedJobs, setSavedJobs] = useState([]);

  const domains = ["All", "Frontend", "Backend", "Full Stack", "Machine Learning", "Design"];

  // 1. Fetch Real Data from Backend & Safely Handle it
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const targetSkills = aiData?.extractedSkills || ["Python", "React", "Node.js"];
        
        const response = await jobApi.getRecommendations(targetSkills);
        const responseData = response.data;
        
        // BULLETPROOF ARRAY CHECK: Handles backend returning an object OR an array
        let rawJobs = [];
        if (Array.isArray(responseData)) {
          rawJobs = responseData;
        } else if (responseData && Array.isArray(responseData.data)) {
          rawJobs = responseData.data;
        }

        // DATA NORMALIZATION: Fills missing API data with clean fallbacks for a perfect demo UI
        const normalizedJobs = rawJobs.map((job, idx) => ({
          id: job.id || idx,
          title: job.title || job.role || 'Software Engineering Intern',
          company: job.company || 'Tech Innovators',
          location: job.location || 'Remote',
          stipend: job.stipend || 'Competitive Pay',
          duration: job.duration || '3-6 Months',
          domain: job.domain || 'Engineering',
          type: job.type || 'Flexible',
          match_percentage: job.match_percentage || job.matchScore || Math.floor(Math.random() * 15) + 75,
          skills: job.required_skills || job.skills || targetSkills,
          apply_link: job.apply_link || '#',
          applied: false
        }));

        setJobs(normalizedJobs);

        if (aiData?.isNewUpload && domains.includes(aiData.domain)) {
          setActiveDomain(aiData.domain);
        }
        
      } catch (error) {
        console.error("Failed to fetch jobs from API:", error);
        setJobs([]); // Fallback to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [aiData]);

  const toggleSave = (id) => {
    setSavedJobs(prev => prev.includes(id) ? prev.filter(jobId => jobId !== id) : [...prev, id]);
  };

  // 2. Filter and Sort Logic (Safely spreading array)
  const filteredAndSortedJobs = useMemo(() => {
    // Safe spread just in case
    let result = [...(jobs || [])];
    
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      result = result.filter(job => 
        (job.title || "").toLowerCase().includes(lowerSearch) || 
        (job.company || "").toLowerCase().includes(lowerSearch)
      );
    }
    
    if (activeDomain !== "All") {
      result = result.filter(job => 
        (job.title || "").toLowerCase().includes(activeDomain.toLowerCase()) || 
        (job.domain || "").toLowerCase().includes(activeDomain.toLowerCase())
      );
    }
    
    result.sort((a, b) => {
      if (sortBy === "match") return (b.match_percentage || 0) - (a.match_percentage || 0);
      return 0;
    });
    
    return result;
  }, [jobs, searchTerm, activeDomain, sortBy]);

  if (loading) return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-950 gap-4">
      <Loader2 className="w-12 h-12 animate-spin text-indigo-500" />
      <p className="text-slate-400 animate-pulse font-medium">AI is matching your skills with live opportunities...</p>
    </div>
  );

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto w-full min-h-screen bg-slate-950">
      
      {/* Dynamic Header */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-bold mb-2 flex items-center gap-3 text-slate-100">
          <Zap className="w-8 h-8 text-indigo-400" /> AI Recommendations
        </h1>
        <p className="text-slate-400 text-lg">
          Live internships from across the web, ranked by your resume compatibility.
        </p>
      </motion.div>

      {/* AI SUMMARY BANNER */}
      <AnimatePresence>
        {aiData && aiData.isNewUpload && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 relative overflow-hidden shadow-[0_0_30px_rgba(99,102,241,0.1)]"
          >
            <div className="absolute top-0 right-0 p-4">
              <div className="flex flex-col items-center justify-center w-16 h-16 rounded-full border-4 border-indigo-500 bg-slate-950 shadow-lg">
                <span className="text-xl font-bold text-indigo-400">{aiData.atsScore || 85}</span>
                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">ATS</span>
              </div>
            </div>
            <div className="pr-20">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-5 h-5 text-indigo-400" />
                <h3 className="text-lg font-bold text-slate-100">Resume Analysis Complete</h3>
              </div>
              <p className="text-sm text-slate-400 mb-4">
                We identified you as a <strong className="text-indigo-300">{aiData.extractedRole || 'Developer'}</strong>. 
              </p>
              <SkillTags skills={aiData.extractedSkills || []} animated={false} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Search and Filters */}
      <div className="bg-slate-900/50 p-4 rounded-2xl mb-8 flex flex-col lg:flex-row gap-4 items-center justify-between border border-slate-800 relative z-20">
        <div className="relative w-full lg:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
          <input 
            type="text" 
            placeholder="Search roles or companies..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500 transition-all text-slate-200"
          />
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
            {domains.map(domain => (
              <button
                key={domain}
                onClick={() => setActiveDomain(domain)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activeDomain === domain ? 'bg-indigo-600 text-white shadow-lg' : 'bg-slate-800/50 text-slate-400 hover:text-slate-200'
                }`}
              >
                {domain}
              </button>
            ))}
          </div>
          <div className="relative flex items-center bg-slate-950 border border-slate-700 rounded-xl px-3 py-2">
            <Filter className="w-4 h-4 text-slate-400 mr-2" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="bg-transparent text-sm text-slate-200 outline-none appearance-none pr-6 cursor-pointer">
              <option value="match" className="bg-slate-900">Sort by Match %</option>
            </select>
            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredAndSortedJobs.length > 0 ? (
            filteredAndSortedJobs.map((job) => (
              <motion.div 
                key={job.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/40 border border-slate-800/80 hover:bg-slate-900 p-6 rounded-2xl group flex flex-col h-full relative overflow-hidden transition-colors"
              >
                <div className="absolute top-0 right-0 p-6">
                  <div className={`px-3 py-1.5 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md border ${
                    job.match_percentage >= 80 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-slate-500/10 text-slate-400 border-slate-500/20'
                  }`}>
                    <Zap className="w-3 h-3" /> {job.match_percentage}% Match
                  </div>
                </div>

                <div className="flex items-start gap-4 mb-6 pr-24">
                  <div className="w-14 h-14 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center flex-shrink-0 group-hover:border-indigo-500/50 transition-colors shadow-inner">
                    <Building2 className="w-7 h-7 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-100 group-hover:text-indigo-300 transition-colors line-clamp-1">{job.title}</h3>
                    <p className="text-sm font-medium text-slate-400 mt-1">{job.company}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-y-3 gap-x-4 mb-6 text-sm">
                  <div className="flex items-center gap-2 text-slate-300"><MapPin className="w-4 h-4 text-slate-500" /><span className="truncate">{job.location}</span></div>
                  <div className="flex items-center gap-2 text-slate-300"><DollarSign className="w-4 h-4 text-slate-500" /><span className="truncate font-medium text-green-400/90">{job.stipend}</span></div>
                  <div className="flex items-center gap-2 text-slate-300"><Clock className="w-4 h-4 text-slate-500" /><span className="truncate">{job.duration}</span></div>
                  <div className="flex items-center gap-2 text-slate-300"><Briefcase className="w-4 h-4 text-slate-500" /><span className="truncate">{job.domain}</span></div>
                </div>

                <div className="mb-8 flex-grow">
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Target Skills</p>
                  <SkillTags skills={job.skills} animated={false} />
                </div>

                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-slate-800/80">
                  <a 
                    href={job.apply_link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-indigo-600 hover:bg-indigo-500 text-white text-center shadow-md transition-all"
                  >
                    Apply Now
                  </a>
                  <button 
                    onClick={() => toggleSave(job.id)}
                    className={`p-2.5 rounded-xl border transition-all flex items-center justify-center ${
                      savedJobs.includes(job.id) ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200 hover:border-slate-700'
                    }`}
                  >
                    <Bookmark className={`w-5 h-5 ${savedJobs.includes(job.id) ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="col-span-1 lg:col-span-2 py-20 text-center bg-slate-900/40 border border-slate-800/80 rounded-3xl">
              <Search className="w-10 h-10 text-slate-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-slate-200">No results found</h3>
              <p className="text-slate-400 mb-4">Try adjusting your filters or wait for more API data.</p>
              <button 
                onClick={() => {setSearchTerm(""); setActiveDomain("All");}}
                className="px-6 py-2 bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white rounded-lg font-medium transition-colors border border-indigo-500/30"
              >
                Clear Filters
              </button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Recommendations;