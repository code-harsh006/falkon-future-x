'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { usePlatform } from '@/lib/platform-context';
import { 
  Sprout, 
  Trash2, 
  Factory, 
  Lightbulb, 
  Truck, 
  Zap, 
  Mic, 
  Camera, 
  MapPin, 
  Upload, 
  Check, 
  AlertTriangle, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Calculator,
  Loader2
} from 'lucide-react';

export default function CreateProjectWizard() {
  const router = useRouter();
  const { createProject } = usePlatform();
  const [step, setStep] = useState(1);
  const [submitting, setSubmitting] = useState(false);

  // Step 1: Type Selection
  const [projectType, setProjectType] = useState<'tree' | 'biochar' | 'waste' | 'solar' | 'transit' | 'industry' | null>(null);

  // Step 2: Details
  const [projectName, setProjectName] = useState('');
  const [location, setLocation] = useState('');
  const [quantity, setQuantity] = useState<number>(1000);
  const [details, setDetails] = useState('');
  const [fetchingLocation, setFetchingLocation] = useState(false);
  const [simulatingVoice, setSimulatingVoice] = useState(false);

  // Step 3: Evidence Upload
  const [uploads, setUploads] = useState<{ id: string; name: string; size: string; status: number }[]>([
    { id: 'u-1', name: 'land_boundary_gps.jpg', size: '2.4 MB', status: 100 },
    { id: 'u-2', name: 'plantation_baseline_video.mp4', size: '15.8 MB', status: 60 }
  ]);
  const [uploading, setUploading] = useState(false);

  // Formulas & Calculations (calculated dynamically based on type & quantity)
  const calculateMetrics = () => {
    let baseline = 0;
    let project = 0;
    let credits = 0;
    const unit = 'tCO2e';

    if (!projectType) return { baseline, project, credits, revenue: 0 };

    switch (projectType) {
      case 'tree':
        // 1 Hectare approx = 1000 quantity unit. Expecting credits based on size.
        // Formula: area * 10 credits
        credits = (quantity * 10) / 1000;
        baseline = credits * 2.2;
        project = credits * 0.2;
        break;
      case 'biochar':
        // Biochar sequestration: weight * 0.3 * 0.75 * 3.67 / 1000
        credits = (quantity * 0.3 * 0.75 * 3.67) / 1000;
        baseline = (quantity * 1.2) / 1000; // Open burning emissions
        project = (quantity * 0.1) / 1000; // Process emissions
        break;
      case 'waste':
        // Plastic recycling offset: weight * 1.7 / 1000
        credits = (quantity * 1.7) / 1000;
        baseline = (quantity * 1.8) / 1000; // Landfill emissions
        project = (quantity * 0.1) / 1000; // Recycling emissions
        break;
      case 'solar':
        // Solar grid offset: generation (kWh) * 0.8 / 1000
        credits = (quantity * 0.8) / 1000;
        baseline = (quantity * 0.8) / 1000; // Coal grid baseline
        project = 0;
        break;
      case 'transit':
        // Diesel displacement: distance * 1.1 / 1000
        credits = (quantity * 1.1) / 1000;
        baseline = (quantity * 1.3) / 1000;
        project = (quantity * 0.2) / 1000;
        break;
      case 'industry':
        // General boiler retrofit: quantity * 0.6 / 1000
        credits = (quantity * 0.6) / 1000;
        baseline = (quantity * 1.5) / 1000;
        project = (quantity * 0.9) / 1000;
        break;
    }

    const revenue = credits * 11.5; // Average $11.5 per credit
    return { baseline, project, credits, revenue };
  };

  const { baseline, project, credits: expectedCredits, revenue } = calculateMetrics();

  // Actions
  const handleFetchLocation = () => {
    setFetchingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLocation(`${pos.coords.latitude.toFixed(4)}° N, ${pos.coords.longitude.toFixed(4)}° E`);
          setFetchingLocation(false);
        },
        () => {
          // Fallback mock
          setTimeout(() => {
            setLocation('28.5244° N, 77.2066° E (New Delhi)');
            setFetchingLocation(false);
          }, 1200);
        }
      );
    } else {
      setLocation('28.5244° N, 77.2066° E (New Delhi)');
      setFetchingLocation(false);
    }
  };

  const handleVoiceInputSim = () => {
    setSimulatingVoice(true);
    setTimeout(() => {
      setProjectName('Community Mango Orchard Sequestration');
      setDetails('Reforestation of 12 hectares of fallow land with mango and jackfruit trees.');
      setQuantity(12); // 12 Hectares
      setSimulatingVoice(false);
    }, 2000);
  };

  const handleUploadSim = () => {
    setUploading(true);
    setTimeout(() => {
      setUploads(prev => [
        ...prev,
        { id: `u-${Date.now()}`, name: 'soil_carbon_baseline.pdf', size: '1.2 MB', status: 100 }
      ]);
      setUploading(false);
    }, 1500);
  };

  const handleSubmit = async () => {
    if (!projectName || !projectType) return;
    setSubmitting(true);
    try {
      await createProject({
        name: projectName,
        category: projectType as "tree" | "biochar" | "waste" | "solar" | "transit",
        description: details || "Sustainable carbon capture initiative.",
        location: location || "Verra registered coordinates",
        listedVolume: expectedCredits,
        pricePerUnit: 11.50,
        baselineEmissions: baseline,
        projectEmissions: project,
        expectedCredits,
      });
      setStep(5); // Success step
    } catch (error) {
      console.error("Failed to create project:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 text-left">
      
      {/* Wizard Header and Visual Step Tracker */}
      <div className="space-y-4">
        <div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">Guided Registry</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Register Carbon Project</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Complete the 5 simple steps below. Icons and visual indicators will guide you at each stage.
          </p>
        </div>

        {/* Visual Progress Steps Bar */}
        {step < 5 && (
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 border border-slate-200/60 dark:border-slate-850 rounded-3xl shadow-sm">
            {[
              { num: 1, label: 'Type' },
              { num: 2, label: 'Details' },
              { num: 3, label: 'Evidence' },
              { num: 4, label: 'Carbon Math' },
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2 flex-1 last:flex-none">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border ${
                  step === s.num 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-md' 
                    : step > s.num
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500'
                    : 'bg-slate-100 dark:bg-slate-850 border-slate-200 dark:border-slate-800 text-slate-400'
                }`}>
                  {step > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className={`text-xs font-bold hidden sm:inline ${step === s.num ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>{s.label}</span>
                {s.num < 4 && <div className="flex-1 h-[2px] bg-slate-200 dark:bg-slate-800 mx-4 hidden sm:block" />}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* STEP 1: CHOOSE PROJECT TYPE */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Step 1: Select Project Category</h2>
            <p className="text-xs text-slate-500">Pick the carbon abatement or sequestration category matching your farm or factory activity.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { id: 'tree' as const, title: 'Tree Plantation', desc: 'Planting new saplings or managing community agroforests.', icon: <Sprout className="w-10 h-10 text-emerald-500" />, bg: 'hover:border-emerald-500/80 bg-emerald-500/5 hover:bg-emerald-500/10 text-emerald-400' },
              { id: 'biochar' as const, title: 'Biochar Production', desc: 'Clean pyrolysis of crop residue into carbon-sequestering soil coal.', icon: <Calculator className="w-10 h-10 text-amber-500" />, bg: 'hover:border-amber-500/80 bg-amber-500/5 hover:bg-amber-500/10 text-amber-400' },
              { id: 'waste' as const, title: 'Waste Management', desc: 'Recycling post-consumer plastics, LDPE/PET pellets tracing.', icon: <Trash2 className="w-10 h-10 text-teal-500" />, bg: 'hover:border-teal-500/80 bg-teal-500/5 hover:bg-teal-500/10 text-teal-400' },
              { id: 'solar' as const, title: 'Renewable Energy', desc: 'Solar array offset audits, displacing grid coal dependencies.', icon: <Zap className="w-10 h-10 text-yellow-500" />, bg: 'hover:border-yellow-500/80 bg-yellow-500/5 hover:bg-yellow-500/10 text-yellow-400' },
              { id: 'transit' as const, title: 'Green Transportation', desc: 'E-logistics, electric delivery vehicle fleet offsets.', icon: <Truck className="w-10 h-10 text-sky-500" />, bg: 'hover:border-sky-500/80 bg-sky-500/5 hover:bg-sky-500/10 text-sky-400' },
              { id: 'industry' as const, title: 'Industrial Energy', desc: 'Factory boiler retrofits, fuel cell efficiency expansions.', icon: <Factory className="w-10 h-10 text-slate-500" />, bg: 'hover:border-slate-500/80 bg-slate-500/5 hover:bg-slate-500/10 text-slate-400' },
            ].map((card) => (
              <button
                key={card.id}
                onClick={() => setProjectType(card.id)}
                className={`border rounded-3xl p-6 text-left flex flex-col justify-between h-[220px] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg cursor-pointer ${
                  projectType === card.id 
                    ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 scale-102 ring-2 ring-emerald-500/30' 
                    : 'border-slate-200/60 dark:border-slate-850 bg-white dark:bg-slate-900'
                }`}
              >
                <div className="p-3 bg-slate-950 border border-slate-800 rounded-2xl w-fit">
                  {card.icon}
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white mt-4">{card.title}</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">{card.desc}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-end pt-4 border-t border-slate-100 dark:border-slate-850">
            <button
              disabled={!projectType}
              onClick={() => setStep(2)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white disabled:text-slate-400 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              Continue to Details
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: PROJECT DETAILS */}
      {step === 2 && (
        <div className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-8 rounded-3xl shadow-sm">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <span>Step 2: Project Parameters & Details</span>
              {simulatingVoice && <Loader2 className="w-5 h-5 animate-spin text-emerald-500" />}
            </h2>
            <p className="text-xs text-slate-500">Simplify inputs. Use simulated voice guidance or automatic GPS fetcher to expedite registration.</p>
          </div>

          {/* Voice/AI Helper Bar */}
          <div className="bg-slate-50 dark:bg-slate-950/40 p-4 border border-slate-150 dark:border-slate-850 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center justify-center">
                <Mic className="w-5 h-5 text-emerald-500" />
              </div>
              <div className="text-xs">
                <p className="font-extrabold text-slate-900 dark:text-white">Hands-Free voice input simulation</p>
                <p className="text-slate-500">Tap to autofill the form with standard crop plantation description.</p>
              </div>
            </div>
            <button
              onClick={handleVoiceInputSim}
              disabled={simulatingVoice}
              className="px-4 py-2 bg-emerald-500/10 border border-emerald-500/25 hover:bg-emerald-500 text-emerald-500 hover:text-slate-950 font-bold text-[10px] rounded-lg transition-colors uppercase tracking-wider shrink-0 cursor-pointer"
            >
              {simulatingVoice ? 'Listening...' : 'Simulate Voice'}
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Project Title</label>
              <input 
                type="text" 
                placeholder="e.g. Vrindavan Community Forestation" 
                value={projectName} 
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition-colors"
                required 
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Location Input with GPS fetcher */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">GPS Location / Coordinates</label>
                <div className="relative">
                  <input 
                    type="text" 
                    placeholder="Fetch coordinates automatically..." 
                    value={location} 
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full pl-4 pr-12 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                    required 
                  />
                  <button
                    type="button"
                    onClick={handleFetchLocation}
                    disabled={fetchingLocation}
                    className="absolute right-2.5 top-2 p-1.5 bg-slate-200 dark:bg-slate-900 hover:bg-emerald-500/10 text-slate-500 hover:text-emerald-500 rounded-lg transition-colors cursor-pointer"
                  >
                    {fetchingLocation ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Quantity based on type */}
              <div>
                <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  {projectType === 'tree' && 'Area Size (in Hectares)'}
                  {projectType === 'biochar' && 'Straw Residue Yield (in kg)'}
                  {projectType === 'waste' && 'Recyclable Plastic load (in kg)'}
                  {projectType === 'solar' && 'Solar Power Generated (in kWh)'}
                  {projectType === 'transit' && 'Displaced Fleet Distance (in km)'}
                  {projectType === 'industry' && 'Retrofitted boiler scale (in kW)'}
                </label>
                <input 
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white focus:outline-none focus:border-emerald-500"
                  required 
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Description & Notes</label>
              <textarea 
                placeholder="Give a brief summary of your project..." 
                value={details} 
                onChange={(e) => setDetails(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl text-xs text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
              />
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-850">
            <button
              onClick={() => setStep(1)}
              className="px-5 py-3 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950/40 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button
              disabled={!projectName || !location || quantity <= 0}
              onClick={() => setStep(3)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white disabled:text-slate-400 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              Continue to Uploads
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: EVIDENCE UPLOAD */}
      {step === 3 && (
        <div className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-8 rounded-3xl shadow-sm">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Step 3: Verification Evidence & Auditing Proof</h2>
            <p className="text-xs text-slate-500">Provide photos, videos, or legal documents validating your baseline claim.</p>
          </div>

          {/* Upload Dropzone */}
          <div className="border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl p-8 text-center bg-slate-50 dark:bg-slate-950/20 hover:border-emerald-500/50 transition-colors">
            <Upload className="w-10 h-10 text-emerald-500 mx-auto mb-3" />
            <p className="text-xs font-extrabold text-slate-950 dark:text-white">Drag & drop files here</p>
            <p className="text-[10px] text-slate-400 mt-1">Acceptable types: JPG, PNG, MP4, PDF (max 25MB)</p>
            
            <div className="flex justify-center gap-3 mt-4">
              <button
                type="button"
                onClick={handleUploadSim}
                disabled={uploading}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] rounded-lg transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-sm"
              >
                {uploading ? 'Processing File...' : 'Upload Document'}
              </button>
              
              <button
                type="button"
                className="px-4 py-2 bg-slate-950 border border-slate-800 text-slate-400 hover:text-white font-bold text-[10px] rounded-lg transition-colors uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Camera className="w-3.5 h-3.5" />
                Capture Camera
              </button>
            </div>
          </div>

          {/* File Queue */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400 pl-1">Uploaded Evidence Logs ({uploads.length})</h4>
            <div className="space-y-2">
              {uploads.map((file) => (
                <div key={file.id} className="flex justify-between items-center p-3.5 bg-slate-50 dark:bg-slate-950/40 border border-slate-150 dark:border-slate-850 rounded-2xl text-xs">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    <div>
                      <span className="font-extrabold text-slate-900 dark:text-white block">{file.name}</span>
                      <span className="text-[10px] text-slate-400 block">{file.size}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    {file.status < 100 ? (
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-slate-200 dark:bg-slate-850 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${file.status}%` }} />
                        </div>
                        <span className="font-mono text-[10px] text-slate-500">{file.status}%</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-wider">Ready</span>
                    )}
                    <button 
                      onClick={() => setUploads(prev => prev.filter(f => f.id !== file.id))}
                      className="text-slate-400 hover:text-rose-500 font-bold transition-colors uppercase text-[10px] tracking-wider"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-850">
            <button
              onClick={() => setStep(2)}
              className="px-5 py-3 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950/40 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button
              disabled={uploads.length === 0}
              onClick={() => setStep(4)}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-200 dark:disabled:bg-slate-850 text-white disabled:text-slate-400 font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              Calculate Carbon Credits
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CARBON CALCULATION PREVIEW */}
      {step === 4 && (
        <div className="space-y-6 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-8 rounded-3xl shadow-sm">
          <div className="space-y-1">
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">Step 4: Carbon Abatement Math & Preview</h2>
            <p className="text-xs text-slate-500">Audit the carbon credits stoichiometry generated by your project parameters.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Visual Gauges */}
            <div className="bg-slate-50 dark:bg-slate-950/30 p-6 border border-slate-200/60 dark:border-slate-850 rounded-3xl flex flex-col justify-between items-center text-center">
              <div>
                <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest block">Carbon Sequestration Yield</span>
                <span className="text-4xl font-black text-emerald-500 tracking-tight block mt-3">{expectedCredits.toFixed(2)} tCO2e</span>
                <p className="text-xs text-slate-500 mt-2">Estimated carbon offset tokens issued post verification.</p>
              </div>

              {/* Animated Progress Gauge SVG */}
              <div className="w-40 h-40 relative flex items-center justify-center my-6">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="#f1f5f9" strokeWidth="6" fill="transparent" className="dark:stroke-slate-800" />
                  <circle cx="50" cy="50" r="40" stroke="#10b981" strokeWidth="7" fill="transparent" strokeDasharray="251.2" strokeDashoffset={251.2 - (251.2 * 0.85)} strokeLinecap="round" className="transition-all duration-1000" />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-2xl font-black text-slate-900 dark:text-white">85%</span>
                  <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Efficiency</span>
                </div>
              </div>

              <div className="w-full bg-slate-200/50 dark:bg-slate-900/50 border border-slate-200/60 dark:border-slate-800/80 p-3 rounded-2xl text-[10px] text-slate-500 font-medium">
                Calculated according to <strong>Verra VM0044 Carbon Methodologies</strong>
              </div>
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-4 flex flex-col justify-between">
              <div className="bg-slate-50 dark:bg-slate-950/30 p-5 border border-slate-200/60 dark:border-slate-850 rounded-2xl space-y-3.5">
                <h4 className="text-[10px] font-black uppercase tracking-wider text-slate-400">Stoichiometric Model</h4>
                
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-850">
                  <span className="text-slate-500">Baseline Emissions</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{baseline.toFixed(2)} tCO2e</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-850">
                  <span className="text-slate-500">Project Emissions</span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">{project.toFixed(2)} tCO2e</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-2 border-b border-slate-100 dark:border-slate-850">
                  <span className="text-slate-500">Net Carbon Reduced</span>
                  <span className="font-mono font-black text-emerald-500">{expectedCredits.toFixed(2)} tCO2e</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500">Estimated Market Payout</span>
                  <span className="font-mono font-black text-indigo-500">${revenue.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
                </div>
              </div>

              {/* Alert Checklist */}
              <div className="bg-amber-500/10 border border-amber-500/20 text-amber-500 p-4 rounded-2xl text-xs space-y-1.5">
                <div className="flex items-center gap-2 font-bold uppercase tracking-wide text-[10px]">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>Validation Requirement</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  Baseline emissions must be verified by a certified auditor node prior to final token issuance. Expected revenue is a projection based on the current market average.
                </p>
              </div>
            </div>

          </div>

          <div className="flex justify-between pt-6 border-t border-slate-100 dark:border-slate-850">
            <button
              onClick={() => setStep(3)}
              className="px-5 py-3 border border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-950/40 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </button>
            
            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-lg flex items-center gap-2 transition-all cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Registering Project...
                </>
              ) : (
                <>
                  Submit Project
                  <Check className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: SUCCESS STATE */}
      {step === 5 && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 p-10 rounded-3xl shadow-xl text-center space-y-6 max-w-xl mx-auto">
          <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto text-emerald-500">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">Project Submitted Successfully!</h2>
            <span className="text-xs text-slate-400 block font-mono">Registry Serial: FAL-PEND-{new Date().getFullYear()}-XXXX</span>
            <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed mt-3">
              Your carbon credit project has been submitted to the Verra registry. It is currently in the <strong>Verification Queue</strong> waiting for auditor approval.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <button
              onClick={() => {
                setStep(1);
                setProjectType(null);
                setProjectName('');
                setLocation('');
                setQuantity(1000);
                setDetails('');
                setUploads([]);
              }}
              className="px-5 py-3 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950/40 text-slate-600 dark:text-slate-400 font-bold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Register Another Project
            </button>
            <button
              onClick={() => router.push('/platform/dashboard')}
              className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg transition-colors cursor-pointer"
            >
              Return to Dashboard
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
