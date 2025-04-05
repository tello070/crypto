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

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setCurrentUser(session?.user ?? null);
      setLoading(false);
    });

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

      const needsVerification = !data.user.email_confirmed_at;
      
      if (!needsVerification) {
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
      
      // First, create the user
      const { data: { user }, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        }
      });

      if (signUpError) throw signUpError;
      if (!user) throw new Error("Failed to create user");

      // Immediately send OTP
      const { error: otpError } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
          data: {
            full_name: name,
          }
        }
      });

      if (otpError) throw otpError;

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
      const { error } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      
      if (error) throw error;
      
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
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          shouldCreateUser: false,
        }
      });
      
      if (error) throw error;
      
      toast({
        title: "Code sent",
        description: "Please check your email for the verification code.",
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