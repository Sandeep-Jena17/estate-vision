/**
 * AuthContext — global auth state for EstateVision
 * Powered by AWS Cognito via amazon-cognito-identity-js
 */

import React, {
  createContext, useState, useEffect,
  useContext, useCallback, useRef,
} from 'react';
import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';
import { User, UserRole } from '../types/auth.types';

/* ─── Cognito pool (values from .env) ────────────────────── */
const userPool = new CognitoUserPool({
  UserPoolId: process.env.REACT_APP_COGNITO_USER_POOL_ID!,
  ClientId:   process.env.REACT_APP_COGNITO_CLIENT_ID!,
});

/* ─── Build User object from Cognito attributes ──────────── */
function buildUser(
  sub: string,
  attrs: { getName(): string; getValue(): string }[],
  payload: any
): User {
  const get = (name: string) =>
    attrs.find(a => a.getName() === name)?.getValue() ?? '';

  const groups = payload['cognito:groups'] || [];
  let role: UserRole = 'buyer';
  if (groups.includes('admin')) {
    role = 'admin';
  } else if (groups.includes('agent')) {
    role = 'agent';
  } else {
    role = (get('custom:role') || 'buyer') as UserRole;
  }

  return {
    id:         sub,
    cognitoId:  sub,
    name:       get('name'),
    email:      get('email'),
    phone:      get('phone_number') || undefined,
    role,
    agencyName: get('custom:agencyName') || undefined,
    verified:   true,
    createdAt:  new Date().toISOString(),
  };
}

/* ─── Friendly error messages (maps Cognito error codes) ─── */
const ERROR_MESSAGES: Record<string, string> = {
  UserNotFoundException:     'No account found with this email.',
  NotAuthorizedException:    'Incorrect email or password.',
  UsernameExistsException:   'An account with this email already exists.',
  CodeMismatchException:     'Invalid OTP. Please try again.',
  ExpiredCodeException:      'OTP has expired. Please request a new one.',
  UserNotConfirmedException: 'Please verify your email before logging in.',
  LimitExceededException:    'Too many attempts. Please try again later.',
  InvalidPasswordException:  'Password does not meet the requirements.',
  InvalidParameterException: 'Please check your details and try again.',
  NetworkError:              'Network error. Please check your connection.',
};

const friendlyError = (code: string) =>
  ERROR_MESSAGES[code] ?? 'Something went wrong. Please try again.';

/* ─── Context shape ───────────────────────────────────────── */
interface AuthContextType {
  user:       User | null;
  isLoggedIn: boolean;
  isLoading:  boolean;
  error:      string | null;
  isAdmin:    boolean;
  isAgent:    boolean;
  isBuyer:    boolean;

  login: (
    email: string, password: string
  ) => Promise<{ success: boolean; role?: UserRole; error?: string; needsNewPassword?: boolean }>;

  completeNewPassword: (
    newPassword: string
  ) => Promise<{ success: boolean; role?: UserRole; error?: string }>;

  register: (data: {
    name:        string;
    email:       string;
    password:    string;
    phone?:      string;
    role:        'buyer' | 'agent';
    agencyName?: string;
  }) => Promise<{ success: boolean; needsOTP: boolean; error?: string }>;

  confirmOTP:     (email: string, otp: string)                      => Promise<{ success: boolean; role?: string; error?: string }>;
  forgotPassword: (email: string)                                    => Promise<{ success: boolean; error?: string }>;
  resetPassword:  (email: string, otp: string, newPwd: string)      => Promise<{ success: boolean; error?: string }>;
  resendOTP:      (email: string)                                    => Promise<{ success: boolean; error?: string }>;
  logout:         () => void;
  getToken:       () => Promise<string | null>;
  clearError:     () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

/* ─── Provider ────────────────────────────────────────────── */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user,      setUser]      = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error,     setError]     = useState<string | null>(null);

  // Temporarily holds password between register → confirmOTP for auto-login
  const pendingPasswordRef  = useRef<string | null>(null);
  // Holds generated username between register → confirmOTP (email-alias pools)
  const pendingUsernameRef  = useRef<string | null>(null);

  // Ref to hold CognitoUser during login for newPasswordRequired handling
  const cognitoUserRef = useRef<CognitoUser | null>(null);

  /* ── Restore session on mount ───────────────────────────── */
  useEffect(() => {
    const currentUser = userPool.getCurrentUser();
    if (!currentUser) {
      setIsLoading(false);
      return;
    }
    currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
      if (err || !session?.isValid()) {
        setIsLoading(false);
        return;
      }
      currentUser.getUserAttributes((attrErr, attrs) => {
        setIsLoading(false);
        if (attrErr || !attrs) return;
        const sub = session.getIdToken().payload.sub as string;
        setUser(buildUser(sub, attrs, session.getIdToken().payload));
      });
    });
  }, []);

  /* ── LOGIN ──────────────────────────────────────────────── */
  const login = useCallback(async (
    email: string, password: string
  ): Promise<{ success: boolean; role?: UserRole; error?: string; needsNewPassword?: boolean }> => {
    setIsLoading(true);
    setError(null);

    return new Promise(resolve => {
      const authDetails = new AuthenticationDetails({ Username: email, Password: password });
      const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });
      cognitoUserRef.current = cognitoUser; // Store for potential newPasswordRequired

      cognitoUser.authenticateUser(authDetails, {
        onSuccess: (session: CognitoUserSession) => {
          cognitoUserRef.current = null; // Clear ref on success
          cognitoUser.getUserAttributes((attrErr, attrs) => {
            setIsLoading(false);
            if (attrErr || !attrs) {
              const msg = friendlyError('NetworkError');
              setError(msg);
              resolve({ success: false, error: msg });
              return;
            }
            const sub = session.getIdToken().payload.sub as string;
            const u   = buildUser(sub, attrs, session.getIdToken().payload);
            setUser(u);
            resolve({ success: true, role: u.role });
          });
        },
        onFailure: (err: { code?: string; name?: string }) => {
          cognitoUserRef.current = null; // Clear ref on failure
          setIsLoading(false);
          const msg = friendlyError(err.code ?? err.name ?? '');
          setError(msg);
          resolve({ success: false, error: msg });
        },
        // Handle new password required for admin-created accounts
        newPasswordRequired: (userAttributes, requiredAttributes) => {
          setIsLoading(false);
          // Don't clear cognitoUserRef here — keep it for completeNewPassword
          resolve({ success: false, needsNewPassword: true });
        },
      });
    });
  }, []);

  /* ── COMPLETE NEW PASSWORD ───────────────────────────────── */
  const completeNewPassword = useCallback(async (
    newPassword: string
  ): Promise<{ success: boolean; role?: UserRole; error?: string }> => {
    if (!cognitoUserRef.current) {
      const msg = 'No active login session to complete.';
      setError(msg);
      return { success: false, error: msg };
    }

    setIsLoading(true);
    setError(null);

    return new Promise(resolve => {
      cognitoUserRef.current!.completeNewPasswordChallenge(newPassword, {}, {
        onSuccess: (session: CognitoUserSession) => {
          cognitoUserRef.current!.getUserAttributes((attrErr, attrs) => {
            cognitoUserRef.current = null; // Clear ref after completion
            setIsLoading(false);
            if (attrErr || !attrs) {
              const msg = friendlyError('NetworkError');
              setError(msg);
              resolve({ success: false, error: msg });
              return;
            }
            const sub = session.getIdToken().payload.sub as string;
            const u   = buildUser(sub, attrs, session.getIdToken().payload);
            setUser(u);
            resolve({ success: true, role: u.role });
          });
        },
        onFailure: (err: { code?: string; name?: string }) => {
          cognitoUserRef.current = null; // Clear ref on failure
          setIsLoading(false);
          const msg = friendlyError(err.code ?? err.name ?? '');
          setError(msg);
          resolve({ success: false, error: msg });
        },
      });
    });
  }, []);

  /* ── REGISTER ───────────────────────────────────────────── */
  const register = useCallback(async (data: {
    name: string; email: string; password: string;
    phone?: string; role: 'buyer' | 'agent'; agencyName?: string;
  }): Promise<{ success: boolean; needsOTP: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    pendingPasswordRef.current = data.password;

    const attrs: CognitoUserAttribute[] = [
      new CognitoUserAttribute({ Name: 'name',        Value: data.name  }),
      new CognitoUserAttribute({ Name: 'email',       Value: data.email }),
      new CognitoUserAttribute({ Name: 'custom:role', Value: data.role  }),
    ];
    if (data.phone) {
      attrs.push(new CognitoUserAttribute({ Name: 'phone_number',      Value: data.phone       }));
    }
    if (data.agencyName) {
      attrs.push(new CognitoUserAttribute({ Name: 'custom:agencyName', Value: data.agencyName! }));
    }

    // Cognito pool uses email as alias — username must not be an email address
    const username = `ev_${data.email.split('@')[0].replace(/[^a-zA-Z0-9]/g, '')}_${Date.now()}`;

    return new Promise(resolve => {
      userPool.signUp(username, data.password, attrs, [], (err, result) => {
        setIsLoading(false);
        if (err) {
          const msg = friendlyError((err as any).code ?? err.name ?? '');
          setError(msg);
          pendingPasswordRef.current = null;
          pendingUsernameRef.current = null;
          resolve({ success: false, needsOTP: false, error: msg });
          return;
        }
        // Store the generated username so confirmOTP can use it
        pendingUsernameRef.current = result?.user.getUsername() ?? username;
        // userConfirmed=false means Cognito sent a verification email
        resolve({ success: true, needsOTP: !(result?.userConfirmed ?? false) });
      });
    });
  }, []);

  /* ── CONFIRM OTP ────────────────────────────────────────── */
  const confirmOTP = useCallback(async (
    email: string, otp: string
  ): Promise<{ success: boolean; role?: string; error?: string }> => {
    setIsLoading(true);
    setError(null);

    // Use generated username if available (email-alias pools require actual username for confirmation)
    const usernameForConfirm = pendingUsernameRef.current ?? email;
    const cognitoUser = new CognitoUser({ Username: usernameForConfirm, Pool: userPool });

    return new Promise(resolve => {
      cognitoUser.confirmRegistration(otp, true, err => {
        if (err) {
          pendingUsernameRef.current = null;
          setIsLoading(false);
          const msg = friendlyError((err as any).code ?? err.name ?? '');
          setError(msg);
          resolve({ success: false, error: msg });
          return;
        }

        // Auto-login after OTP confirmed
        const storedPw = pendingPasswordRef.current;
        if (!storedPw) {
          setIsLoading(false);
          resolve({ success: true, role: 'buyer' });
          return;
        }

        const authDetails = new AuthenticationDetails({ Username: email, Password: storedPw });
        cognitoUser.authenticateUser(authDetails, {
          onSuccess: (session: CognitoUserSession) => {
            cognitoUser.getUserAttributes((attrErr, attrs) => {
              pendingPasswordRef.current = null;
              pendingUsernameRef.current = null;
              setIsLoading(false);
              if (attrErr || !attrs) {
                resolve({ success: true, role: 'buyer' });
                return;
              }
              const sub = session.getIdToken().payload.sub as string;
              const u   = buildUser(sub, attrs, session.getIdToken().payload);
              setUser(u);
              resolve({ success: true, role: u.role });
            });
          },
          onFailure: () => {
            // OTP confirmed — auto-login failed, user can login manually
            pendingPasswordRef.current = null;
            pendingUsernameRef.current = null;
            setIsLoading(false);
            resolve({ success: true, role: 'buyer' });
          },
        });
      });
    });
  }, []);

  /* ── RESEND OTP ──────────────────────────────────────────── */
  const resendOTP = useCallback(async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    const usernameForResend = pendingUsernameRef.current ?? email;
    const cognitoUser = new CognitoUser({ Username: usernameForResend, Pool: userPool });
    return new Promise(resolve => {
      cognitoUser.resendConfirmationCode((err) => {
        if (err) {
          const msg = friendlyError((err as any).code ?? err.name ?? '');
          resolve({ success: false, error: msg });
          return;
        }
        resolve({ success: true });
      });
    });
  }, []);

  /* ── FORGOT PASSWORD ────────────────────────────────────── */
  const forgotPassword = useCallback(async (
    email: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise(resolve => {
      cognitoUser.forgotPassword({
        onSuccess: () => {
          localStorage.setItem('ev_reset_email', email);
          setIsLoading(false);
          resolve({ success: true });
        },
        onFailure: (err: { code?: string; name?: string }) => {
          setIsLoading(false);
          const msg = friendlyError(err.code ?? err.name ?? '');
          setError(msg);
          resolve({ success: false, error: msg });
        },
      });
    });
  }, []);

  /* ── RESET PASSWORD ─────────────────────────────────────── */
  const resetPassword = useCallback(async (
    email: string, otp: string, newPwd: string
  ): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    setError(null);

    const cognitoUser = new CognitoUser({ Username: email, Pool: userPool });

    return new Promise(resolve => {
      cognitoUser.confirmPassword(otp, newPwd, {
        onSuccess: () => {
          localStorage.removeItem('ev_reset_email');
          setIsLoading(false);
          resolve({ success: true });
        },
        onFailure: (err: { code?: string; name?: string }) => {
          setIsLoading(false);
          const msg = friendlyError(err.code ?? err.name ?? '');
          setError(msg);
          resolve({ success: false, error: msg });
        },
      });
    });
  }, []);

  /* ── LOGOUT ─────────────────────────────────────────────── */
  const logout = useCallback(() => {
    const currentUser = userPool.getCurrentUser();
    if (currentUser) currentUser.signOut();
    setUser(null);
  }, []);

  /* ── GET TOKEN (async — handles silent token refresh) ── */
  const getToken = useCallback((): Promise<string | null> => {
    return new Promise(resolve => {
      const currentUser = userPool.getCurrentUser();
      if (!currentUser) return resolve(null);
      currentUser.getSession((err: Error | null, session: CognitoUserSession | null) => {
        if (err || !session?.isValid()) return resolve(null);
        resolve(session.getIdToken().getJwtToken());
      });
    });
  }, []);

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
    completeNewPassword,
    register,
    confirmOTP,
    forgotPassword,
    resetPassword,
    resendOTP,
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
