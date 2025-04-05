import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();
  
  const from = (location.state as any)?.from?.pathname || "/";
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsSubmitting(true);
      
      // First try to sign in
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      // If login successful but email not confirmed
      if (data?.user && !data.user.email_confirmed_at) {
        // Send verification code
        await supabase.auth.resend({
          type: 'signup',
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        
        // Redirect to verification page
        navigate("/verify-email", { 
          state: { 
            email,
            isLogin: true 
          } 
        });
        return;
      }
      
      // If there's an error, check if it's because email is not confirmed
      if (error?.message?.includes("Email not confirmed")) {
        // Send verification code
        await supabase.auth.resend({
          type: 'signup',
          email,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });
        
        toast({
          title: "Email verification required",
          description: "We've sent a verification code to your email.",
        });
        
        // Redirect to verification page
        navigate("/verify-email", { 
          state: { 
            email,
            isLogin: true 
          } 
        });
        return;
      }
      
      // For other errors, throw them to be caught below
      if (error) throw error;
      
      // If we get here, login was successful and email is confirmed
      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      // Redirect to intended destination
      navigate(from, { replace: true });
      
    } catch (error: any) {
      // Special handling for unverified emails
      if (error.message?.includes("Email not confirmed")) {
        // Send verification code
        try {
          await supabase.auth.resend({
            type: 'signup',
            email,
            options: {
              emailRedirectTo: `${window.location.origin}/auth/callback`
            }
          });
          
          toast({
            title: "Email verification required",
            description: "We've sent a verification code to your email.",
          });
          
          // Redirect to verification page
          navigate("/verify-email", { 
            state: { 
              email,
              isLogin: true 
            } 
          });
        } catch (resendError) {
          console.error("Failed to resend verification code:", resendError);
          toast({
            title: "Verification required",
            description: "Please verify your email before logging in.",
            variant: "destructive",
          });
        }
      } else {
        // Handle other errors
        toast({
          title: "Authentication Error",
          description: error.message,
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <Card className="border-border shadow-xl">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Sign in</CardTitle>
              <CardDescription className="text-center">
                Enter your credentials to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-muted/50"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">Password</Label>
                    <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isSubmitting}
                    className="bg-muted/50"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign in"
                  )}
                </Button>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <div className="text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}