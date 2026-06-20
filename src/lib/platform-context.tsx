"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

// Mock data for when Convex backend isn't deployed yet
const MOCK_PROJECTS = [
  {
    _id: "proj-1" as any,
    name: "Vrindavan Agroforest Plantation",
    category: "tree" as const,
    sellerId: "user-1" as any,
    description: "Plantation of 12,000 native neem, banyan, and mango trees over 15 hectares.",
    location: "Mathura, Uttar Pradesh",
    listedVolume: 120.5,
    pricePerUnit: 11.20,
    rating: 4.8,
    verificationStatus: "approved" as const,
    baselineEmissions: 180,
    projectEmissions: 59.5,
    expectedCredits: 120.5,
    readinessScore: 98,
    evidenceCount: 4,
    createdAt: Date.now() - 86400000 * 30,
    updatedAt: Date.now(),
  },
  {
    _id: "proj-2" as any,
    name: "Haryana Straw Biochar",
    category: "biochar" as const,
    sellerId: "user-2" as any,
    description: "Conversion of 500 tonnes of residual paddy rice straw into biochar.",
    location: "Karnal, Haryana",
    listedVolume: 412.8,
    pricePerUnit: 12.50,
    rating: 4.6,
    verificationStatus: "approved" as const,
    baselineEmissions: 600,
    projectEmissions: 187.2,
    expectedCredits: 412.8,
    readinessScore: 95,
    evidenceCount: 3,
    createdAt: Date.now() - 86400000 * 20,
    updatedAt: Date.now(),
  },
  {
    _id: "proj-3" as any,
    name: "Mumbai HDPE Landfill Avoidance",
    category: "waste" as const,
    sellerId: "user-3" as any,
    description: "Mechanical sortation and clean-pellet recycling of 80 tonnes of post-consumer PET.",
    location: "Dharavi, Mumbai",
    listedVolume: 136.0,
    pricePerUnit: 10.80,
    rating: 4.9,
    verificationStatus: "approved" as const,
    baselineEmissions: 240,
    projectEmissions: 104,
    expectedCredits: 136,
    readinessScore: 100,
    evidenceCount: 5,
    createdAt: Date.now() - 86400000 * 15,
    updatedAt: Date.now(),
  },
  {
    _id: "proj-4" as any,
    name: "Delhi Metro Eco-Transit",
    category: "solar" as const,
    sellerId: "user-4" as any,
    description: "Replacement of 50 diesel vans with electric mini-trucks for last mile cargo.",
    location: "New Delhi",
    listedVolume: 85.4,
    pricePerUnit: 11.50,
    rating: 4.3,
    verificationStatus: "pending" as const,
    baselineEmissions: 150,
    projectEmissions: 64.6,
    expectedCredits: 85.4,
    readinessScore: 82,
    evidenceCount: 2,
    createdAt: Date.now() - 86400000 * 5,
    updatedAt: Date.now(),
  },
  {
    _id: "proj-5" as any,
    name: "Okhla Waste-to-Energy Solar",
    category: "solar" as const,
    sellerId: "user-5" as any,
    description: "Installation of a 250 kW solar rooftop array on sorting facilities.",
    location: "Okhla Phase-III, Delhi",
    listedVolume: 95.0,
    pricePerUnit: 11.50,
    rating: 4.5,
    verificationStatus: "pending" as const,
    baselineEmissions: 120,
    projectEmissions: 25,
    expectedCredits: 95,
    readinessScore: 90,
    evidenceCount: 3,
    createdAt: Date.now() - 86400000 * 3,
    updatedAt: Date.now(),
  },
];

export type UserRole =
  | "farmer"
  | "waste"
  | "industry"
  | "auditor"
  | "investor"
  | "admin";

interface PlatformContextType {
  userId: string | null;
  clerkId: string | null;
  userName: string;
  userEmail: string;
  role: UserRole;
  isLoading: boolean;
  convexReady: boolean;
  hasConvexUser: boolean;

  setRole: (role: UserRole) => void;
  login: (clerkId: string, email: string, name: string) => Promise<void>;
  logout: () => void;

  projects: any[];
  holdings: any[];
  orders: any[];
  notifications: any[];
  activities: any[];
  wallet: {
    balance: number;
    lockedBalance: number;
    available: number;
  };

  stats: {
    totalCredits: number;
    pendingCredits: number;
    issuedCredits: number;
    retiredCredits: number;
    revenueGenerated: number;
    totalReduction: number;
  };

  createProject: (project: any) => Promise<any>;
  placeOrder: (order: any) => Promise<any>;
  retireCredits: (holdingId: string, qty: number, reason: string) => Promise<any>;
  verifyProject: (projectId: string, approve: boolean, comment?: string) => Promise<any>;
}

const PlatformContext = createContext<PlatformContextType | undefined>(
  undefined
);

// Try loading Convex dynamically — fails gracefully if not deployed
let convexApi: any = null;
let convexAvailable = false;

async function loadConvex() {
  try {
    const mod = await import("../../convex/_generated/api");
    convexApi = mod.api;
    convexAvailable = true;
  } catch {
    console.warn("Convex API not available — running in mock mode");
    convexAvailable = false;
  }
}

export function PlatformProvider({ children }: { children: React.ReactNode }) {
  const [clerkId, setClerkId] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>("");
  const [role, setRole] = useState<UserRole>("farmer");
  const [isLoading, setIsLoading] = useState(true);
  const [convexReady, setConvexReady] = useState(false);
  const [hasConvexUser, setHasConvexUser] = useState(false);
  const [mockState, setMockState] = useState<{
    projects: any[];
    holdings: any[];
    orders: any[];
    notifications: any[];
    activities: any[];
    wallet: { balance: number; lockedBalance: number; available: number };
    stats: { totalCredits: number; pendingCredits: number; issuedCredits: number; retiredCredits: number; revenueGenerated: number; totalReduction: number };
  }>({
    projects: MOCK_PROJECTS,
    holdings: [],
    orders: [],
    notifications: [],
    activities: [],
    wallet: { balance: 4250, lockedBalance: 0, available: 4250 },
    stats: {
      totalCredits: 668.7,
      pendingCredits: 180.4,
      issuedCredits: 668.7,
      retiredCredits: 136,
      revenueGenerated: 7690.05,
      totalReduction: 668.7,
    },
  });

  // Convex hooks (conditional)
  const [convexHooks, setConvexHooks] = useState<any>(null);

  useEffect(() => {
    loadConvex().then(() => {
      if (convexAvailable && convexApi) {
        import("convex/react").then(({ useQuery, useMutation }) => {
          setConvexHooks({ useQuery, useMutation, api: convexApi });
          setConvexReady(true);
        });
      }
    });

    // Restore session from localStorage (cookie persistence)
    const savedClerkId = localStorage.getItem("ffx_clerkId");
    const savedRole = localStorage.getItem("ffx_role") as UserRole | null;
    const savedUserId = localStorage.getItem("ffx_userId");
    const savedUserName = localStorage.getItem("ffx_userName") || "";
    const savedUserEmail = localStorage.getItem("ffx_userEmail") || "";

    if (savedClerkId) {
      setClerkId(savedClerkId);
      setUserId(savedUserId);
      setUserName(savedUserName);
      setUserEmail(savedUserEmail);
      if (savedRole) setRole(savedRole);
    }
    setIsLoading(false);
  }, []);

  // Mock data fetchers (used when Convex is not available)
  const createProject = useCallback(
    async (project: any) => {
      const newProject = {
        ...project,
        _id: `proj-${Date.now()}` as any,
        verificationStatus: "pending" as const,
        rating: 0,
        readinessScore: 92,
        evidenceCount: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setMockState((s) => ({
        ...s,
        projects: [newProject, ...s.projects],
      }));
      return newProject._id;
    },
    []
  );

  const placeOrder = useCallback(
    async (order: any) => {
      const newOrder = {
        ...order,
        _id: `order-${Date.now()}`,
        status: order.orderType === "market" ? "filled" : "pending",
        totalAmount: order.qty * order.price,
        platformFee: order.qty * order.price * 0.015,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      };
      setMockState((s) => ({
        ...s,
        orders: [newOrder, ...s.orders],
        wallet: {
          ...s.wallet,
          available: s.wallet.available - order.qty * order.price * 1.015,
        },
      }));
      return newOrder._id;
    },
    []
  );

  const retireCredits = useCallback(
    async (_holdingId: string, qty: number, reason: string) => {
      setMockState((s) => ({
        ...s,
        stats: {
          ...s.stats,
          issuedCredits: s.stats.issuedCredits - qty,
          retiredCredits: s.stats.retiredCredits + qty,
        },
      }));
      return true;
    },
    []
  );

  const verifyProject = useCallback(
    async (projectId: string, approve: boolean, _comment?: string) => {
      setMockState((s) => ({
        ...s,
        projects: s.projects.map((p) =>
          p._id === projectId
            ? { ...p, verificationStatus: approve ? "approved" : "rejected" }
            : p
        ),
      }));
      return true;
    },
    []
  );

  const login = useCallback(
    async (clerkIdStr: string, email: string, name: string) => {
      const newUserId = `user-${Date.now()}`;
      setClerkId(clerkIdStr);
      setUserId(newUserId);
      setUserName(name);
      setUserEmail(email);

      // Persist to localStorage (cookie-like persistence)
      localStorage.setItem("ffx_clerkId", clerkIdStr);
      localStorage.setItem("ffx_role", role);
      localStorage.setItem("ffx_userId", newUserId);
      localStorage.setItem("ffx_userName", name);
      localStorage.setItem("ffx_userEmail", email);
    },
    [role]
  );

  const logout = useCallback(() => {
    setUserId(null);
    setClerkId(null);
    setUserName("");
    setUserEmail("");
    localStorage.removeItem("ffx_clerkId");
    localStorage.removeItem("ffx_role");
    localStorage.removeItem("ffx_userId");
    localStorage.removeItem("ffx_userName");
    localStorage.removeItem("ffx_userEmail");
  }, []);

  const setRoleAndUpdate = useCallback((newRole: UserRole) => {
    setRole(newRole);
    localStorage.setItem("ffx_role", newRole);
  }, []);

  const value: PlatformContextType = {
    userId,
    clerkId,
    userName,
    userEmail,
    role,
    isLoading,
    convexReady,
    hasConvexUser,
    setRole: setRoleAndUpdate,
    login,
    logout,
    projects: mockState.projects,
    holdings: mockState.holdings,
    orders: mockState.orders,
    notifications: mockState.notifications,
    activities: mockState.activities,
    wallet: mockState.wallet,
    stats: mockState.stats,
    createProject,
    placeOrder,
    retireCredits,
    verifyProject,
  };

  return (
    <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>
  );
}

export function usePlatform() {
  const context = useContext(PlatformContext);
  if (!context)
    throw new Error("usePlatform must be used within a PlatformProvider");
  return context;
}