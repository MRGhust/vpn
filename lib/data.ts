import type { Plan, User } from '../types';

// --- CONSTANTS ---
const USERS_KEY = 'app_users'; // Key can remain the same, new structure will overwrite old.
const PLANS_KEY = 'app_plans';
const ADMIN_EMAIL = 'ylala4546@gmail.com';
const ADMIN_PASSWORD = 'samvpn54';


// --- INITIAL DATA ---
// This data is used ONLY if localStorage is empty.
const initialOneMonthPlans = [
  { volume: 5, basePrice: 18000 }, { volume: 10, basePrice: 29000 },
  { volume: 20, basePrice: 52000 }, { volume: 30, basePrice: 74000 },
  { volume: 40, basePrice: 94000 }, { volume: 50, basePrice: 114000 },
  { volume: 60, basePrice: 134000 }, { volume: 70, basePrice: 154000 },
  { volume: 80, basePrice: 174000 }, { volume: 90, basePrice: 194000 },
  { volume: 100, basePrice: 214000 }, { volume: 200, basePrice: 324000 },
  { volume: 300, basePrice: 444000 }, { volume: 400, basePrice: 564000 },
  { volume: 500, basePrice: 674000 },
];

const initialThreeMonthPlans = [
  { volume: 20, basePrice: 69000 }, { volume: 30, basePrice: 89000 },
  { volume: 40, basePrice: 119000 }, { volume: 50, basePrice: 169000 },
  { volume: 60, basePrice: 189000 }, { volume: 70, basePrice: 199000 },
  { volume: 80, basePrice: 212000 }, { volume: 90, basePrice: 230000 },
  { volume: 100, basePrice: 256000 }, { volume: 200, basePrice: 358000 },
  { volume: 300, basePrice: 558000 }, { volume: 400, basePrice: 668000 },
  { volume: 500, basePrice: 738000 }, { volume: 600, basePrice: 828000 },
  { volume: 700, basePrice: 899000 }, { volume: 800, basePrice: 999000 },
  { volume: 900, basePrice: 1111000 }, { volume: 1000, basePrice: 1226000 },
];

const defaultPlans: Plan[] = [
  ...initialOneMonthPlans.map(p => ({ ...p, id: `1m-${p.volume}g`, duration: 1 })),
  ...initialThreeMonthPlans.map(p => ({ ...p, id: `3m-${p.volume}g`, duration: 3 })),
];

// --- USERS API (LocalStorage simulation) ---
interface StoredUser {
  password: string; // In a real app, this would be a hash.
  isAdmin: boolean;
}

const getUsersFromStorage = (): Record<string, StoredUser> => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : {};
};

export const addUser = (email: string, password: string):boolean => {
  const users = getUsersFromStorage();
  const lowercasedEmail = email.toLowerCase();
  if (users[lowercasedEmail]) {
    return false; // User already exists
  }
  users[lowercasedEmail] = { password: password, isAdmin: false };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return true;
};

export const findUser = (email: string, password: string): User | null => {
  const users = getUsersFromStorage();
  const lowercasedEmail = email.toLowerCase();
  const storedUser = users[lowercasedEmail];

  if (storedUser && storedUser.password === password) {
    return {
      email: lowercasedEmail,
      isAdmin: storedUser.isAdmin,
    };
  }

  return null;
};

// --- DATA INITIALIZATION ---
export const initializeData = () => {
    // Initialize plans if not present
    const plansJson = localStorage.getItem(PLANS_KEY);
    if (!plansJson) {
        localStorage.setItem(PLANS_KEY, JSON.stringify(defaultPlans));
    }
    
    // Initialize users and ensure admin exists with correct credentials.
    const users = getUsersFromStorage();
    // This will create or overwrite the admin entry, ensuring it's always correct.
    users[ADMIN_EMAIL] = { password: ADMIN_PASSWORD, isAdmin: true };
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};


// --- PLANS API (LocalStorage) ---

export const getPlans = (): Plan[] => {
  const plansJson = localStorage.getItem(PLANS_KEY);
  return plansJson ? JSON.parse(plansJson) : [];
};

export const savePlans = (plans: Plan[]) => {
  localStorage.setItem(PLANS_KEY, JSON.stringify(plans));
};

export const addPlan = (planData: Omit<Plan, 'id'>): Plan => {
  const plans = getPlans();
  const newPlan: Plan = {
    ...planData,
    id: `${planData.duration}m-${planData.volume}g-${Date.now()}`
  };
  savePlans([...plans, newPlan]);
  return newPlan;
};

export const updatePlan = (updatedPlan: Plan): Plan => {
  const plans = getPlans();
  const updatedPlans = plans.map(p => p.id === updatedPlan.id ? updatedPlan : p);
  savePlans(updatedPlans);
  return updatedPlan;
};

export const deletePlan = (planId: string) => {
  const plans = getPlans();
  const updatedPlans = plans.filter(p => p.id !== planId);
  savePlans(updatedPlans);
};
