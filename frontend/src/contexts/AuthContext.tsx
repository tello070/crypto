import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, Session } from '@supabase/supabase-js';
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

interface AuthContextType {
  currentUser: User | null;
  session: Session | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ needsVerification: boolean }>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (email: string, token: string) => Promise<void>;
  resendVerificationEmail: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Generate a random 6-digit code
const generateVerificationCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    // Check active sessions and sets the user
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for changes on auth state
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;

      // Check if email is verified
      const needsVerification = !data.user.email_confirmed_at;
      
      if (needsVerification) {
        // Generate and store new verification code
        const verificationCode = generateVerificationCode();
        
        // Store the code in user metadata
        await supabase.auth.updateUser({
          data: {
            verification_code: verificationCode,
            verification_code_expires: Date.now() + 30 * 60 * 1000 // 30 minutes
          }
        });

        // Send verification email with code
        await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/verify-email`,
          data: {
            verification_code: verificationCode
          }
        });
      } else {
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
      }

      return { needsVerification };
    } catch (error: any) {
      toast({
        title: "Authentication Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      
      // Generate verification code
      const verificationCode = generateVerificationCode();
      
      // Create user with verification code in metadata
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            verification_code: verificationCode,
            verification_code_expires: Date.now() + 30 * 60 * 1000 // 30 minutes
          },
        },
      });

      if (signUpError) throw signUpError;

      // Send verification email with code
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/verify-email`,
        data: {
          verification_code: verificationCode
        }
      });

      toast({
        title: "Account created!",
        description: "Please check your email for the verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Registration Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const verifyEmail = async (email: string, token: string) => {
    try {
      setLoading(true);
      
      // Get user data to check verification code
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) throw userError;
      
      if (!user) throw new Error("User not found");

      const storedCode = user.user_metadata.verification_code;
      const expiryTime = user.user_metadata.verification_code_expires;

      // Verify code is valid and not expired
      if (!storedCode || !expiryTime || Date.now() > expiryTime) {
        throw new Error("Verification code has expired");
      }

      if (token !== storedCode) {
        throw new Error("Invalid verification code");
      }

      // Update user metadata and mark email as verified
      const { error: updateError } = await supabase.auth.updateUser({
        data: {
          email_verified: true,
          verification_code: null,
          verification_code_expires: null
        }
      });
      
      if (updateError) throw updateError;
      
      toast({
        title: "Email verified!",
        description: "Your account has been successfully verified.",
      });
    } catch (error: any) {
      toast({
        title: "Verification Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const resendVerificationEmail = async (email: string) => {
    try {
      setLoading(true);
      
      // Generate new verification code
      const verificationCode = generateVerificationCode();
      
      // Update user metadata with new code
      await supabase.auth.updateUser({
        data: {
          verification_code: verificationCode,
          verification_code_expires: Date.now() + 30 * 60 * 1000 // 30 minutes
        }
      });

      // Send new verification email
      await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/verify-email`,
        data: {
          verification_code: verificationCode
        }
      });
      
      toast({
        title: "Code resent",
        description: "Please check your email for the new verification code.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      toast({
        title: "Logged out",
        description: "You've been successfully logged out.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
      throw error;
    }
  };

  const value = {
    currentUser,
    session,
    loading,
    login,
    register,
    logout,
    verifyEmail,
    resendVerificationEmail
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};