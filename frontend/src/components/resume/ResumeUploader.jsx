import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { internApi } from '../../services/api'; // <-- Imported real API

import {
  UploadCloud,
  File,
  Loader2,
  FileText,
  BarChart3,
  Sparkles,
  CheckCircle2,
  BrainCircuit,
  Zap,
} from 'lucide-react';

const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const navigate = useNavigate();

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    accept: {
      'application/pdf': ['.pdf'],
      // Removing docx since your python backend currently only parses PDFs with PyPDF2
    },
  });

  const processingSteps = [
    {
      title: 'Extracting Resume Data',
      description: 'Reading skills, experience and education',
      icon: FileText,
    },
    {
      title: 'Calculating ATS Score',
      description: 'Evaluating resume quality and optimization',
      icon: BarChart3,
    },
    {
      title: 'Matching Internship Roles',
      description: 'Finding best-fit opportunities using AI',
      icon: BrainCircuit,
    },
  ];

  const handleProcess = async () => {
    if (!file) return;

    setIsProcessing(true);
    setProcessingStep(1); // Step 1: UI shows extracting data

    // Create the payload for FastAPI
    const formData = new FormData();
    formData.append('file', file);

    // We use a small timeout here just so the user can see the first UI step animate in
    setTimeout(async () => {
      setProcessingStep(2); // Step 2: Evaluating ATS (Backend is working)

      try {
        // Call the real FastAPI Backend -> Gemini 2.5 Flash
        const response = await internApi.uploadResume(formData);

        setProcessingStep(3); // Step 3: Success! Matching roles

        // Tiny delay so the user sees the final 100% progress bar before redirect
        setTimeout(() => {
          navigate('/recommendations', {
            state: response.data // Pass the real JSON from Gemini to the recommendations page
          });
        }, 1200);

      } catch (error) {
        console.error("Upload failed:", error);
        alert(error.response?.data?.detail || "Failed to process resume. Ensure your FastAPI server is running.");
        setIsProcessing(false);
        setProcessingStep(0);
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-6 py-10 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-[-10%] left-[10%] w-[400px] h-[400px] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-6xl relative z-10">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* LEFT CONTENT */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-300 text-sm font-medium">
              <Sparkles className="w-4 h-4" />
              AI Powered Resume Intelligence
            </div>

            {/* Heading */}
            <div>
              <h1 className="text-5xl font-black leading-tight text-white">
                Upload Your Resume
                <span className="block bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                  Get Matched Instantly
                </span>
              </h1>

              <p className="text-slate-400 text-lg mt-6 leading-relaxed max-w-xl">
                Our AI analyzes your resume, calculates ATS score,
                extracts skills and matches you with the best
                internship opportunities in seconds.
              </p>
            </div>

            {/* Workflow Cards */}
            <div className="space-y-4">
              {processingSteps.map((step, index) => {
                const Icon = step.icon;

                const isActive = processingStep === index + 1;
                const isCompleted = processingStep > index + 1;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`
                      flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300
                      ${
                        isActive
                          ? 'border-indigo-500/40 bg-indigo-500/10 shadow-[0_0_30px_rgba(99,102,241,0.12)]'
                          : 'border-slate-800 bg-slate-900/60'
                      }
                    `}
                  >
                    <div
                      className={`
                        w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300
                        ${
                          isCompleted
                            ? 'bg-emerald-500/20 border border-emerald-500/30'
                            : isActive
                            ? 'bg-indigo-500/20 border border-indigo-500/30'
                            : 'bg-slate-950 border border-slate-800'
                        }
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                      ) : isActive ? (
                        <Loader2 className="w-6 h-6 text-indigo-400 animate-spin" />
                      ) : (
                        <Icon className="w-6 h-6 text-slate-400" />
                      )}
                    </div>

                    <div>
                      <h3 className="font-semibold text-white">
                        {step.title}
                      </h3>

                      <p className="text-sm text-slate-400 mt-1">
                        {step.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            {/* Upload Card */}
            <div className="relative overflow-hidden rounded-[32px] border border-slate-800 bg-slate-900/60 backdrop-blur-xl shadow-2xl p-8">
              {/* Glow */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 pointer-events-none" />

              {/* Upload Area */}
              <div
                {...getRootProps()}
                className={`
                  relative
                  border-2
                  border-dashed
                  rounded-3xl
                  transition-all
                  duration-300
                  cursor-pointer
                  overflow-hidden
                  min-h-[360px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  p-10
                  ${
                    isDragActive
                      ? 'border-indigo-500 bg-indigo-500/10'
                      : 'border-slate-700 hover:border-indigo-500/40 hover:bg-slate-800/40'
                  }
                `}
              >
                <input {...getInputProps()} />

                <AnimatePresence mode="wait">
                  {!file ? (
                    <motion.div
                      key="upload-ui"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-indigo-600/20 to-purple-600/20 border border-indigo-500/20 flex items-center justify-center mb-8">
                        <UploadCloud className="w-12 h-12 text-indigo-400" />
                      </div>

                      <h2 className="text-3xl font-bold text-white">
                        {isDragActive
                          ? 'Drop Resume Here'
                          : 'Drag & Drop Resume'}
                      </h2>

                      <p className="text-slate-400 mt-4 max-w-md leading-relaxed">
                        Upload your PDF resume and let AI
                        instantly analyze your profile for the best
                        internship opportunities.
                      </p>

                      <div className="mt-8 px-6 py-3 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-medium hover:bg-slate-800 transition-colors">
                        Choose PDF File
                      </div>

                      <p className="text-xs text-slate-500 mt-5">
                        Supports PDF • Max 5MB
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="file-ui"
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="w-full"
                    >
                      {/* File Preview */}
                      <div className="flex flex-col items-center text-center">
                        <div className="w-24 h-24 rounded-3xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-6">
                          <File className="w-12 h-12 text-indigo-400" />
                        </div>

                        <h3 className="text-xl font-bold text-white max-w-md break-all">
                          {file.name}
                        </h3>

                        <p className="text-slate-400 mt-2">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>

                        {/* Analyze Button */}
                        <button
                          onClick={handleProcess}
                          disabled={isProcessing}
                          className="
                            mt-8
                            px-8
                            py-4
                            rounded-2xl
                            bg-indigo-600
                            hover:bg-indigo-500
                            text-white
                            font-semibold
                            transition-all
                            duration-300
                            flex
                            items-center
                            gap-3
                            shadow-xl
                            disabled:opacity-50
                            disabled:cursor-not-allowed
                          "
                        >
                          {isProcessing ? (
                            <>
                              <Loader2 className="w-5 h-5 animate-spin" />
                              Processing Resume...
                            </>
                          ) : (
                            <>
                              <Zap className="w-5 h-5 text-yellow-300" />
                              Analyze with AI
                            </>
                          )}
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Processing Bar */}
              <AnimatePresence>
                {isProcessing && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6"
                  >
                    <div className="flex items-center justify-between text-sm mb-3">
                      <span className="text-slate-300 font-medium">
                        AI Processing
                      </span>

                      <span className="text-indigo-400 font-semibold">
                        {processingStep}/3
                      </span>
                    </div>

                    <div className="w-full h-3 rounded-full bg-slate-950 border border-slate-800 overflow-hidden">
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{
                          width: `${(processingStep / 3) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                        className="h-full bg-gradient-to-r from-indigo-500 to-purple-500"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ResumeUploader;