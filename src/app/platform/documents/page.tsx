'use client';

import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Upload, 
  FolderLock, 
  Download, 
  Filter, 
  ShieldCheck 
} from 'lucide-react';

export default function PlatformDocuments() {
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock documents
  const documentRegistry = [
    { name: 'Karnal_Farm_Boundary_Deed.pdf', category: 'Land Deed', project: 'EcoBiochar Soil Sequestration', size: '3.1 MB', status: 'verified' },
    { name: 'Pyrolysis_Kiln_Invoice.pdf', category: 'Invoice', project: 'EcoBiochar Soil Sequestration', size: '1.4 MB', status: 'verified' },
    { name: 'Forestation_Drone_Survey_Evidence.mp4', category: 'Visual Evidence', project: 'Vrindavan Agroforest Plantation', size: '42.8 MB', status: 'pending' },
    { name: 'HDPE_Recycling_Logistics_Receipts.zip', category: 'Logistics', project: 'Mumbai Central Plastic Recycling Hub', size: '8.9 MB', status: 'verified' },
    { name: 'Verra_Compliance_Registry_Form.pdf', category: 'Registry Form', project: 'Mumbai Central Plastic Recycling Hub', size: '2.5 MB', status: 'verified' },
    { name: 'NB_IoT_Bin_Telemetry_Log.xlsx', category: 'Telemetry', project: 'Mumbai Central Plastic Recycling Hub', size: '5.2 MB', status: 'pending' }
  ];

  const filteredDocs = documentRegistry.filter(d => 
    d.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.project.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-fade-in text-left">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold uppercase tracking-widest font-mono">Evidence Vault</span>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">Documents Locker</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Secure locker managing deeds, equipment invoices, logistical shipping receipts, and visual drone verifications.
          </p>
        </div>

        <button className="px-4.5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-md flex items-center gap-2 cursor-pointer transition-colors">
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Vault Alert */}
      <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl flex items-center gap-3.5 text-xs text-slate-400">
        <FolderLock className="w-6 h-6 text-teal-400 shrink-0" />
        <div>
          <p className="font-extrabold text-white">Cryptographically Sealed Vault</p>
          <p>Files are stored on decentralized file storage nodes (IPFS) and hash-matched on the blockchain registry to prevent tampering.</p>
        </div>
      </div>

      {/* Search Filter */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search documents by name, category, or project origin..." 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-11 pr-4 py-3 bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-2xl text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500"
        />
        <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
      </div>

      {/* Documents List */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-850 rounded-3xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-950/60 border-b border-slate-200 dark:border-slate-850 text-slate-400 font-bold uppercase tracking-wider">
                <th className="py-4 px-6">Document Name</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Associated Project</th>
                <th className="py-4 px-6">Size</th>
                <th className="py-4 px-6">Integrity Status</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-850 text-slate-650 dark:text-slate-355">
              {filteredDocs.map((doc, idx) => (
                <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/10 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white flex items-center gap-3">
                    <FileText className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{doc.name}</span>
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded font-semibold text-[10px]">
                      {doc.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 font-medium text-slate-700 dark:text-slate-400">{doc.project}</td>
                  <td className="py-4 px-6 font-mono text-[10px] text-slate-500">{doc.size}</td>
                  <td className="py-4 px-6">
                    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] uppercase font-bold border ${
                      doc.status === 'verified'
                        ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                        : 'bg-amber-500/10 border-amber-500/20 text-amber-500'
                    }`}>
                      {doc.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="p-2 bg-slate-100 dark:bg-slate-950 border border-slate-200 dark:border-slate-850 hover:bg-emerald-600 hover:text-white text-slate-500 dark:text-slate-400 rounded-xl transition-colors cursor-pointer">
                      <Download className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
