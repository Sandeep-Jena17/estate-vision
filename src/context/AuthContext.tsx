/**
 * AuthContext — global auth state for EstateVision
 * Currently uses mock localStorage auth.
 * When AWS Cognito is ready, replace only the function bodies marked MOCK.
 */

import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import { User, UserRole } from '../types/auth.types';

/* ─── Mock users (remove when Cognito is integrated) ──────── */
const MOCK_USERS: User[] = [
  {
    id:        'user_admin_001',
    name:      'Sandeep Kumar Jena',
    email:     'jenasandeep595@gmail.com',
    phone:     '+91 8917404918',
    role:      'admin',
    verified:  true,
    avatar:    'https://i.pravatar.cc/80?img=11',
    createdAt: '2024-01-01',
  },
  {
    id:         'user_agent_001',
    name:       'Priya Sharma',
    email:      'agent@demo.com',
    phone:      '+91 98765 43210',
    role:       'agent',
    verified:   true,
    avatar:     'https://i.pravatar.cc/80?img=47',
    agencyName: 'Sharma Realty',
    reraId:     'RERA/AG/OD/2019/001234',
    createdAt:  '2024-02-01',
  },
  {
    id:        'user_buyer_001',
    name:      'Rahul Nayak',
    email:     'buyer@demo.com',
    phone:     '+91 91234 56789',
    role:      'buyer',
    verified:  true,
    avatar:    'https://i.pravatar.cc/80?img=33',
    createdAt: '2024-03-01',
  },
];

/* ─── Friendly error messages (matches Cognito error codes) ── */
const ERROR_MESSAGES: Record<string, string> = {
  UserNotFoundException:     'No account found with this email.',
  NotAuthorizedException:    'Incorrect email or password.',
  UsernameExistsException:   'An account with this email already exists.',
  CodeMismatchException:     'Invalid OTP. Please try again.',
  ExpiredCodeException:      'OTP has expired. Please request a new one.',
  UserNotConfirmedException: 'Please verify your email before logging in.',
  NetworkError:              'Network error. Please check your connection.',
  InvalidCredentials:        'Incorrect email or password.',
  EmailExists:               'An account with this email already exists.',
};

const friendlyError = (code: string) =>
  ERROR_MESSAGES[code] ?? 'Something went wrong. Please try again.';

/* ─── Context shape ───────────────────────────────────────── */
interface AuthContextType {
  user:      User | null;
  isLoggedIn: boolean;
  isLoading:  boolean;
  error:      string | null;
  isAdmin:    boolean;
  isAgent:    boolean;
  isBuyer:    boolean;

  login: (email: string, password: string) => Promise<{ success: boolean; role?: UserRole; error?: string }>;
  register: (data: {
    name:       string;
    email:      string;
    password:   string;
    phone?:     string;
    role:       'buyer' | 'agent';
    agencyName?: string;
  }) => Promise<{ success: boolean; needsOTP: boolean; error?: string }>;
  confirmOTP:     (email: string, otp: string)                        => Promise<{ success: boolean; error?: string }>;
  forgotPassword: (email: string)                                      => Promise<{ success: boolean; error?: string }>;
  resetPassword:  (email: string, otp: string, newPassword: string)   => Promise<{ success: boolean; error?: string }>;
  logout:  () => void;
  getToken: () => string | null;
  clearError: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

/* ─── Provider ────────────────────────────────────────────── */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user,      setUser]      = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  /* Restore session from localStorage on mount */
  useEffect(() => {
    const saved = localStorage.getItem('ev_user');
    if (saved) {
      try { setUser(JSON.parse(saved)); } catch {}
    }
    setIsLoading(false);
  }, []);

  const saveSession = (u: User) => {
    setUser(u);
    localStorage.setItem('ev_user', JSON.stringify(u));
  };

  /* ── LOGIN ──────────────────────────────────────────────── */
  // MOCK: Replace this function body with Cognito Auth.signIn() call
  const login = useCallback(async (email: string, _password: string) => {
    setIsLoading(true);
    setError(null);
    await delay(600); // simulate network
    const found = MOCK_USERS.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (!found) {
      const msg = friendlyError('UserNotFoundException');
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }
    saveSession(found);
    setIsLoading(false);
    return { success: true, role: found.role };
  }, []);

  /* ── REGISTER ───────────────────────────────────────────── */
  // MOCK: Replace this function body with Cognito Auth.signUp() call
  const register = useCallback(async (data: {
    name: string; email: string; password: string;
    phone?: string; role: 'buyer' | 'agent'; agencyName?: string;
  }) => {
    setIsLoading(true);
    setError(null);
    await delay(700);

    const exists = MOCK_USERS.find(u => u.email.toLowerCase() === data.email.toLowerCase())
      || JSON.parse(localStorage.getItem('ev_registered') || '[]')
           .find((u: User) => u.email.toLowerCase() === data.email.toLowerCase());

    if (exists) {
      const msg = friendlyError('UsernameExistsException');
      setError(msg);
      setIsLoading(false);
      return { success: false, needsOTP: false, error: msg };
    }

    const newUser: User = {
      id:         `user_${data.role}_${Date.now()}`,
      name:       data.name,
      email:      data.email,
      phone:      data.phone,
      role:       data.role,
      verified:   false,
      agencyName: data.agencyName,
      createdAt:  new Date().toISOString(),
    };

    // Store pending user (unverified) in localStorage
    const pending = JSON.parse(localStorage.getItem('ev_registered') || '[]');
    pending.push(newUser);
    localStorage.setItem('ev_registered', JSON.stringify(pending));
    localStorage.setItem('ev_pending_email', data.email);

    setIsLoading(false);
    return { success: true, needsOTP: true };
  }, []);

  /* ── CONFIRM OTP ────────────────────────────────────────── */
  // MOCK: Replace this function body with Cognito Auth.confirmSignUp() call
  const confirmOTP = useCallback(async (email: string, otp: string) => {
    setIsLoading(true);
    setError(null);
    await delay(600);

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      const msg = friendlyError('CodeMismatchException');
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }

    // Find and verify the pending user
    const pending: User[] = JSON.parse(localStorage.getItem('ev_registered') || '[]');
    const idx = pending.findIndex(u => u.email.toLowerCase() === email.toLowerCase());

    if (idx === -1) {
      const msg = friendlyError('UserNotFoundException');
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }

    pending[idx].verified = true;
    localStorage.setItem('ev_registered', JSON.stringify(pending));
    localStorage.removeItem('ev_pending_email');
    saveSession(pending[idx]);
    setIsLoading(false);
    return { success: true };
  }, []);

  /* ── FORGOT PASSWORD ────────────────────────────────────── */
  // MOCK: Replace this function body with Cognito Auth.forgotPassword() call
  const forgotPassword = useCallback(async (email: string) => {
    setIsLoading(true);
    setError(null);
    await delay(700);
    // Mock: always success (real: Cognito will check if email exists)
    localStorage.setItem('ev_reset_email', email);
    setIsLoading(false);
    return { success: true };
  }, []);

  /* ── RESET PASSWORD ─────────────────────────────────────── */
  // MOCK: Replace this function body with Cognito Auth.forgotPasswordSubmit() call
  const resetPassword = useCallback(async (email: string, otp: string, _newPassword: string) => {
    setIsLoading(true);
    setError(null);
    await delay(700);

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      const msg = friendlyError('CodeMismatchException');
      setError(msg);
      setIsLoading(false);
      return { success: false, error: msg };
    }

    localStorage.removeItem('ev_reset_email');
    setIsLoading(false);
    return { success: true };
  }, []);

  /* ── LOGOUT ─────────────────────────────────────────────── */
  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('ev_user');
  }, []);

  /* ── GET TOKEN ──────────────────────────────────────────── */
  // MOCK: Replace with Cognito session token
  const getToken = useCallback(() => {
    if (!user) return null;
    return `mock_token_${user.id}`;
  }, [user]);

  const clearError = useCallback(() => setError(null), []);

  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    isLoading,
    error,
    isAdmin: user?.role === 'admin',
    isAgent: user?.role === 'agent' || user?.role === 'admin',
    isBuyer: !!user,
    login,
    register,
    confirmOTP,
    forgotPassword,
    resetPassword,
    logout,
    getToken,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/* ─── Hook (internal — use useAuth.ts externally) ────────── */
export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
};

/* ─── Utility ────────────────────────────────────────────── */
const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
