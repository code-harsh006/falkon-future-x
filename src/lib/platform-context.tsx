'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export type UserRole = 'farmer' | 'industry' | 'waste' | 'auditor' | 'investor' | 'admin';

export interface PlatformProject {
  id: string;
  name: string;
  type: string; // 'tree', 'biochar', 'waste', 'solar', 'transit', 'industry'
  status: 'pending' | 'verified' | 'rejected';
  location: string;
  details: string;
  evidenceCount: number;
  readinessScore: number;
  expectedCredits: number;
  potentialRevenue: number;
  baselineEmissions: number;
  projectEmissions: number;
  created_at: string;
  farmerName?: string;
  industryName?: string;
}

export interface PlatformCredit {
  id: string;
  serialNumber: string;
  vintageYear: number;
  quantity: number;
  unit: string;
  category: string;
  status: 'issued' | 'pending' | 'retired';
  isRetired: boolean;
  retirementReason?: string;
  created_at: string;
  projectName: string;
}

export interface PlatformWasteRecord {
  id: string;
  wasteType: string;
  plasticType?: string;
  source: string;
  quantity: number;
  unit: string;
  facility: string;
  location: string;
  carbonCreditsGenerated: number;
  emissionsReduced: number;
  status: 'pending' | 'verified' | 'rejected';
  created_at: string;
}

interface PlatformContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  projects: PlatformProject[];
  credits: PlatformCredit[];
  wasteRecords: PlatformWasteRecord[];
  addProject: (project: Omit<PlatformProject, 'id' | 'created_at' | 'status' | 'readinessScore'>) => void;
  retireCredit: (id: string, quantity: number, reason: string) => boolean;
  verifyProject: (id: string, approve: boolean) => void;
  addWasteRecord: (record: Omit<PlatformWasteRecord, 'id' | 'created_at' | 'status' | 'carbonCreditsGenerated' | 'emissionsReduced'>) => void;
  stats: {
    totalCredits: number;
    pendingCredits: number;
    issuedCredits: number;
    retiredCredits: number;
    revenueGenerated: number;
    totalReduction: number; // in tonnes CO2e
  };
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [role, setRole] = useState<UserRole>('farmer');

  // Initial projects
  const [projects, setProjects] = useState<PlatformProject[]>([
    {
      id: 'proj-1',
      name: 'Vrindavan Agroforest Plantation',
      type: 'tree',
      status: 'verified',
      location: 'Mathura, Uttar Pradesh',
      details: 'Plantation of 12,000 native neem, banyan, and mango trees over 15 hectares of community cropland.',
      evidenceCount: 4,
      readinessScore: 98,
      expectedCredits: 120.5,
      potentialRevenue: 1385.75,
      baselineEmissions: 180.0,
      projectEmissions: 59.5,
      created_at: '2026-04-12T10:00:00Z',
      farmerName: 'Ram Singh'
    },
    {
      id: 'proj-2',
      name: 'EcoBiochar Soil Sequestration',
      type: 'biochar',
      status: 'verified',
      location: 'Karnal, Haryana',
      details: 'Conversion of 500 tonnes of residual paddy rice straw into biochar using clean pyrolysis kilns.',
      evidenceCount: 3,
      readinessScore: 95,
      expectedCredits: 412.8,
      potentialRevenue: 4747.20,
      baselineEmissions: 600.0,
      projectEmissions: 187.2,
      created_at: '2026-05-01T08:30:00Z',
      farmerName: 'Sukhdev Singh'
    },
    {
      id: 'proj-3',
      name: 'Mumbai Central Plastic Recycling Hub',
      type: 'waste',
      status: 'verified',
      location: 'Dharavi, Mumbai',
      details: 'Mechanic sortation and clean-pellet recycling of 80 tonnes of post-consumer PET bottles.',
      evidenceCount: 5,
      readinessScore: 100,
      expectedCredits: 136.0,
      potentialRevenue: 1564.00,
      baselineEmissions: 240.0,
      projectEmissions: 104.0,
      created_at: '2026-05-15T14:20:00Z'
    },
    {
      id: 'proj-4',
      name: 'Delhi Metro Eco-Transit Expansion',
      type: 'transit',
      status: 'pending',
      location: 'New Delhi',
      details: 'Replacement of 50 standard diesel logistical vans with electric mini-trucks for last mile cargo transportation.',
      evidenceCount: 2,
      readinessScore: 82,
      expectedCredits: 85.4,
      potentialRevenue: 982.10,
      baselineEmissions: 150.0,
      projectEmissions: 64.6,
      created_at: '2026-05-28T11:15:00Z',
      industryName: 'Falkon Logistical Corp'
    },
    {
      id: 'proj-5',
      name: 'Okhla Waste-to-Energy Solar array',
      type: 'solar',
      status: 'pending',
      location: 'Okhla Phase-III, Delhi',
      details: 'Installation of a 250 kW solar rooftop array on top of sorting facilities to offset local grid usage.',
      evidenceCount: 3,
      readinessScore: 90,
      expectedCredits: 95.0,
      potentialRevenue: 1092.50,
      baselineEmissions: 120.0,
      projectEmissions: 25.0,
      created_at: '2026-06-01T09:00:00Z'
    }
  ]);

  // Initial credits
  const [credits, setCredits] = useState<PlatformCredit[]>([
    {
      id: 'c-1',
      serialNumber: 'FAL-VER-2026-0001-TREE-IN',
      vintageYear: 2026,
      quantity: 120.5,
      unit: 'tCO2e',
      category: 'tree',
      status: 'issued',
      isRetired: false,
      created_at: '2026-04-18T12:00:00Z',
      projectName: 'Vrindavan Agroforest Plantation'
    },
    {
      id: 'c-2',
      serialNumber: 'FAL-VER-2026-0002-CHAR-IN',
      vintageYear: 2026,
      quantity: 412.8,
      unit: 'tCO2e',
      category: 'biochar',
      status: 'issued',
      isRetired: false,
      created_at: '2026-05-05T09:00:00Z',
      projectName: 'EcoBiochar Soil Sequestration'
    },
    {
      id: 'c-3',
      serialNumber: 'FAL-VER-2026-0003-PLAS-IN',
      vintageYear: 2026,
      quantity: 136.0,
      unit: 'tCO2e',
      category: 'waste',
      status: 'issued',
      isRetired: true,
      retirementReason: 'Corporate carbon neutrality offset for Nestle Q2 2026 ESG requirements.',
      created_at: '2026-05-18T16:45:00Z',
      projectName: 'Mumbai Central Plastic Recycling Hub'
    }
  ]);

  // Initial waste records
  const [wasteRecords, setWasteRecords] = useState<PlatformWasteRecord[]>([
    {
      id: 'w-1',
      wasteType: 'plastic',
      plasticType: 'pet',
      source: 'Mumbai Dharavi Collection',
      quantity: 80000,
      unit: 'kg',
      facility: 'Mumbai Recyclers Ltd',
      location: 'Dharavi, Mumbai',
      carbonCreditsGenerated: 136.0,
      emissionsReduced: 136000.0,
      status: 'verified',
      created_at: '2026-05-15T14:20:00Z'
    },
    {
      id: 'w-2',
      wasteType: 'agricultural',
      source: 'Karnal Farm Cluster',
      quantity: 500000,
      unit: 'kg',
      facility: 'EcoBiochar Pyrolysis Plant',
      location: 'Karnal, Haryana',
      carbonCreditsGenerated: 412.8,
      emissionsReduced: 412800.0,
      status: 'verified',
      created_at: '2026-05-01T08:30:00Z'
    }
  ]);

  // Stats calculation
  const [stats, setStats] = useState({
    totalCredits: 0,
    pendingCredits: 0,
    issuedCredits: 0,
    retiredCredits: 0,
    revenueGenerated: 0,
    totalReduction: 0
  });

  useEffect(() => {
    const total = credits.reduce((sum, c) => sum + c.quantity, 0) + projects.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.expectedCredits, 0);
    const pending = projects.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.expectedCredits, 0);
    const issued = credits.filter(c => c.status === 'issued' && !c.isRetired).reduce((sum, c) => sum + c.quantity, 0);
    const retired = credits.filter(c => c.isRetired).reduce((sum, c) => sum + c.quantity, 0);
    
    // Revenue is calculated at $11.5 per credit (from original audit data details)
    const revenue = credits.reduce((sum, c) => sum + (c.quantity * 11.5), 0);
    
    // Total reduction (tonnes CO2e) is verified projects expected credits + issued credits
    const totalRed = credits.reduce((sum, c) => sum + c.quantity, 0);

    setStats({
      totalCredits: total,
      pendingCredits: pending,
      issuedCredits: issued,
      retiredCredits: retired,
      revenueGenerated: revenue,
      totalReduction: totalRed
    });
  }, [credits, projects]);

  const addProject = (newProj: Omit<PlatformProject, 'id' | 'created_at' | 'status' | 'readinessScore'>) => {
    const proj: PlatformProject = {
      ...newProj,
      id: `proj-${Date.now()}`,
      status: 'pending',
      readinessScore: 92, // Mock score
      created_at: new Date().toISOString()
    };
    
    setProjects(prev => [proj, ...prev]);

    // Also register a pending credit entry in the registry
    const newCredit: PlatformCredit = {
      id: `c-p-${Date.now()}`,
      serialNumber: `FAL-PEND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${newProj.type.slice(0, 4).toUpperCase()}-IN`,
      vintageYear: new Date().getFullYear(),
      quantity: newProj.expectedCredits,
      unit: 'tCO2e',
      category: newProj.type,
      status: 'pending',
      isRetired: false,
      created_at: new Date().toISOString(),
      projectName: newProj.name
    };
    setCredits(prev => [newCredit, ...prev]);
  };

  const retireCredit = (id: string, quantity: number, reason: string): boolean => {
    let success = false;
    setCredits(prev => prev.map(c => {
      if (c.id === id && !c.isRetired && c.status === 'issued') {
        success = true;
        if (c.quantity === quantity) {
          return { ...c, isRetired: true, status: 'retired', retirementReason: reason };
        } else if (c.quantity > quantity) {
          // Retire fraction (mock split - for UI we'll just set it fully retired or reduce)
          return { ...c, isRetired: true, quantity, status: 'retired', retirementReason: reason };
        }
      }
      return c;
    }));
    return success;
  };

  const verifyProject = (id: string, approve: boolean) => {
    setProjects(prev => prev.map(p => {
      if (p.id === id && p.status === 'pending') {
        return { ...p, status: approve ? 'verified' : 'rejected' };
      }
      return p;
    }));

    // If approved, update the credit status in registry
    setCredits(prev => prev.map(c => {
      const relatedProject = projects.find(p => p.id === id);
      if (relatedProject && c.projectName === relatedProject.name && c.status === 'pending') {
        return {
          ...c,
          status: approve ? 'issued' : 'pending', // if rejected, stays pending or could be deleted.
          serialNumber: approve ? c.serialNumber.replace('PEND', 'VER') : c.serialNumber
        };
      }
      return c;
    }));
  };

  const addWasteRecord = (newRec: Omit<PlatformWasteRecord, 'id' | 'created_at' | 'status' | 'carbonCreditsGenerated' | 'emissionsReduced'>) => {
    // Perform carbon credit calculation based on formulas:
    // PET plastic recycling formula: CC = (Landfill EF - Recycling EF) * Weight / 1000
    // Landfill EF = 1.8, Recycling = 0.1, difference = 1.7 kg CO2e/kg
    let diff = 1.7; // default plastic
    if (newRec.wasteType === 'agricultural') {
      diff = 1.1; // openburning (1.2) - sustainable (0.1)
    }

    const emissionsReduced = newRec.quantity * diff; // in kg CO2e
    const carbonCreditsGenerated = emissionsReduced / 1000; // in tCO2e

    const rec: PlatformWasteRecord = {
      ...newRec,
      id: `w-${Date.now()}`,
      carbonCreditsGenerated,
      emissionsReduced,
      status: 'pending',
      created_at: new Date().toISOString()
    };

    setWasteRecords(prev => [rec, ...prev]);

    // Also add to project pipeline!
    const proj: PlatformProject = {
      id: `proj-w-${Date.now()}`,
      name: `${newRec.source} Processing`,
      type: newRec.wasteType === 'plastic' ? 'waste' : 'biochar',
      status: 'pending',
      location: newRec.location,
      details: `Processing of ${newRec.quantity.toLocaleString()} ${newRec.unit} of ${newRec.wasteType} at ${newRec.facility}.`,
      evidenceCount: 1,
      readinessScore: 90,
      expectedCredits: carbonCreditsGenerated,
      potentialRevenue: carbonCreditsGenerated * 11.5,
      baselineEmissions: (newRec.quantity * (newRec.wasteType === 'plastic' ? 1.8 : 1.2)) / 1000,
      projectEmissions: (newRec.quantity * (newRec.wasteType === 'plastic' ? 0.1 : 0.1)) / 1000,
      created_at: new Date().toISOString()
    };
    setProjects(prev => [proj, ...prev]);

    // Add to pending credits
    const newCredit: PlatformCredit = {
      id: `c-w-${Date.now()}`,
      serialNumber: `FAL-PEND-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}-${newRec.wasteType.slice(0, 4).toUpperCase()}-IN`,
      vintageYear: new Date().getFullYear(),
      quantity: carbonCreditsGenerated,
      unit: 'tCO2e',
      category: newRec.wasteType === 'plastic' ? 'waste' : 'biochar',
      status: 'pending',
      isRetired: false,
      created_at: new Date().toISOString(),
      projectName: proj.name
    };
    setCredits(prev => [newCredit, ...prev]);
  };

  return (
    <PlatformContext.Provider value={{
      role,
      setRole,
      projects,
      credits,
      wasteRecords,
      addProject,
      retireCredit,
      verifyProject,
      addWasteRecord,
      stats
    }}>
      {children}
    </PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context) throw new Error('usePlatform must be used within a PlatformProvider');
  return context;
}
