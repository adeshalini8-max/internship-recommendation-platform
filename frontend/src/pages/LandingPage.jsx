import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  Bot, 
  Briefcase, 
  Zap, 
  ArrowRight, 
  LineChart, 
  LayoutDashboard,
  UploadCloud,
  Cpu,
  Target,
  CheckCircle2,
  Star
} from 'lucide-react';

const LandingPage = () => {
  const features = [
    { icon: <UploadCloud className="w-6 h-6 text-indigo-400" />, title: "Resume Upload", desc: "Drag & drop your PDF or DOCX. We handle the rest securely." },
    { icon: <Cpu className="w-6 h-6 text-purple-400" />, title: "AI Skill Extraction", desc: "Our NLP models extract your core competencies and tools." },
    { icon: <Target className="w-6 h-6 text-pink-400" />, title: "Smart Role Detection", desc: "Automatically identifies the specific domains you excel in." },
    { icon: <Briefcase className="w-6 h-6 text-blue-400" />, title: "Internship Matching", desc: "Finds roles that actually fit your profile perfectly." },
    { icon: <Star className="w-6 h-6 text-yellow-400" />, title: "Personalized Recs", desc: "Get highly curated lists of companies looking for your skills." },
    { icon: <LayoutDashboard className="w-6 h-6 text-emerald-400" />, title: "Real-Time Dashboard", desc: "Track applications and AI match scores all in one place." }
  ];

  const workflowSteps = [
    { title: "Upload Resume", desc: "Submit your latest CV in seconds." },
    { title: "AI Processing", desc: "Our engine extracts your data." },
    { title: "Role Matching", desc: "We scan thousands of openings." },
    { title: "Get Hired", desc: "Apply to your perfect match." }
  ];

  const testimonials = [
    { name: "Rahul S.", role: "SDE Intern @ TechCorp", text: "InternMatch completely changed my job hunt. The AI found roles I wouldn't have even searched for, and I got hired in 2 weeks!" },
    { name: "Priya M.", role: "UI/UX Intern @ DesignPro", text: "The resume parsing is scary accurate. It highlighted skills I forgot to emphasize and matched me with a great remote startup." },
    { name: "Amit K.", role: "Data Science Intern", text: "Stop scrolling through endless job boards. This tool does the heavy lifting and only shows you what you're qualified for." }
  ];

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden selection:bg-indigo-500/30">
      
      {/* ================= BACKGROUND EFFECTS ================= */}
      <div className="absolute top-0 left-0 w-full h-[800px] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none" />

      {/* ================= HERO SECTION ================= */}
      <section className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-8 relative z-10 text-center lg:text-left pt-10 lg:pt-0"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-indigo-500/30 text-sm text-indigo-300 font-medium bg-indigo-500/10 backdrop-blur-md">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span>Powered by Advanced AI Models</span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-slate-100">
            Find your perfect <br className="hidden lg:block" />
            <span className="text-gradient">Internship</span> instantly.
          </h1>
          
          <p className="text-base sm:text-lg text-slate-400 max-w-xl mx-auto lg:mx-0">
            Upload your resume and let our intelligent recommendation engine match you with top companies seeking your exact skills. Stop searching, start matching.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center lg:justify-start">
            <Link to="/signup" className="px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-all shadow-[0_0_20px_rgba(99,102,241,0.4)] hover:shadow-[0_0_30px_rgba(99,102,241,0.6)] flex items-center justify-center gap-2 group">
              Get Started <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a href="#how-it-works" className="px-8 py-4 glass-panel hover:bg-white/10 text-white rounded-xl font-medium transition-all flex items-center justify-center text-center">
              See How It Works
            </a>
          </div>
        </motion.div>

        {/* Hero Right side Illustration / UI Mockup */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="relative z-10 mt-8 lg:mt-0 max-w-md mx-auto w-full"
        >
          <div className="glass-panel p-5 sm:p-7 rounded-2xl relative z-10 border border-slate-700/80 shadow-2xl bg-slate-900/80 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-slate-700/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-100">AI Analysis Complete</h3>
                  <p className="text-sm text-indigo-400 font-medium">Found 12 matching roles</p>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5 text-green-400" />
              </div>
            </div>
            
            {/* Mockup list items */}
            <div className="space-y-4">
              {[
                { title: "Frontend Developer Intern", match: "98%", co: "Google" },
                { title: "React JS Engineer", match: "94%", co: "TechCorp" },
                { title: "UI/UX Developer", match: "89%", co: "DesignX" },
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-between hover:border-indigo-500/40 transition-colors group">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-slate-700/80 flex items-center justify-center font-bold text-slate-300 group-hover:bg-slate-700 transition-colors">
                      {item.co.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-slate-200">{item.title}</div>
                      <div className="text-xs text-slate-400">{item.co}</div>
                    </div>
                  </div>
                  <div className="text-sm font-bold text-green-400 bg-green-500/10 px-2.5 py-1 rounded-md">{item.match}</div>
                </div>
              ))}
            </div>
          </div>
          
         
        </motion.div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Intelligent from start to finish</h2>
          <p className="text-slate-400 max-w-2xl mx-auto">Everything you need to bypass the ATS systems and land your dream internship, powered by cutting-edge machine learning.</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feat, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="glass-card p-6 sm:p-8 rounded-2xl group border-slate-800/80 bg-slate-900/40"
            >
              <div className="w-14 h-14 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-6 group-hover:bg-indigo-500/20 group-hover:border-indigo-500/50 transition-all duration-300 shadow-lg">
                {feat.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-slate-200">{feat.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{feat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section id="how-it-works" className="py-24 bg-slate-900/50 border-y border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">How InternMatch Works</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">Four simple steps between you and your next big career opportunity.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-12 md:gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />
            
            {workflowSteps.map((step, idx) => (
              <div key={idx} className="relative text-center flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-slate-900 border border-indigo-500/30 flex items-center justify-center text-3xl font-bold text-indigo-400 mb-6 relative z-10 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                  {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-slate-200 mb-2">{step.title}</h3>
                <p className="text-sm text-slate-400 px-4">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-24 px-6 max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-100 mb-4">Loved by Students</h2>
          <p className="text-slate-400">Don't just take our word for it.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((test, i) => (
            <div key={i} className="glass-panel p-8 rounded-2xl border-slate-700/50 flex flex-col justify-between bg-slate-900/30">
              <div className="flex gap-1 mb-6">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-slate-300 mb-8 italic leading-relaxed">"{test.text}"</p>
              <div className="flex items-center gap-3 mt-auto pt-6 border-t border-slate-800/50">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center font-bold text-white text-sm shadow-md">
                  {test.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-slate-200 text-sm">{test.name}</h4>
                  <span className="text-xs text-slate-500 font-medium">{test.role}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section className="py-20 px-6 relative z-10 mb-10">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-indigo-900/80 to-purple-900/80 border border-indigo-500/30 rounded-3xl p-10 md:p-16 text-center relative overflow-hidden shadow-2xl">
          {/* Internal CTA glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/20 blur-[100px] pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">
            Ready to find your match?
          </h2>
          <p className="text-indigo-200 mb-10 max-w-xl mx-auto text-base sm:text-lg relative z-10">
            Join InternMatch today. Upload your resume and let our AI do the hard work of finding your perfect internship.
          </p>
          <Link 
            to="/signup" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-indigo-900 hover:bg-slate-100 rounded-xl font-bold transition-all relative z-10 shadow-xl hover:shadow-2xl hover:-translate-y-1"
          >
            Create Free Account <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
};

export default LandingPage;