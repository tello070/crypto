import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

export default function VerifyEmail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [email, setEmail] = useState("");
  const { toast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Get email from location state
    const email = (location.state as any)?.email;
    if (email) {
      setEmail(email);
    } else {
      // If no email in state, redirect to login
      navigate("/login");
    }
  }, [location, navigate]);
  
  const handleVerify = async () => {
    if (!verificationCode || verificationCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: verificationCode,
        type: 'email'
      });
      
      if (error) throw error;
      
      toast({
        title: "Email verified!",
        description: "Your account has been successfully verified.",
      });
      
      // Redirect to home page
      navigate("/");
    } catch (error: any) {
      toast({
        title: "Verification failed",
        description: error.message || "Please check your code and try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleResendCode = async () => {
    if (!email) return;
    
    try {
      setIsResending(true);
      
      const { error } = await supabase.auth.resend({
        type: 'signup',
        email,
      });
      
      if (error) throw error;
      
      toast({
        title: "Code resent",
        description: "A new verification code has been sent to your email",
      });
    } catch (error: any) {
      toast({
        title: "Failed to resend code",
        description: error.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsResending(false);
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex items-center justify-center py-16 px-4">
        <div className="w-full max-w-md">
          <Card className="border-border shadow-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 z-0"></div>
            <CardHeader className="relative z-10 space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Verify Your Email</CardTitle>
              <CardDescription className="text-center">
                We've sent a verification code to<br />
                <span className="font-medium text-primary">{email || "your email"}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="relative z-10 space-y-6">
              <div className="space-y-2">
                <div className="text-center mb-4">
                  <p className="text-sm text-muted-foreground">Enter the 6-digit code below</p>
                </div>
                
                <div className="flex justify-center">
                  <InputOTP 
                    maxLength={6}
                    value={verificationCode}
                    onChange={(value) => setVerificationCode(value)}
                    render={({ slots }) => (
                      <InputOTPGroup>
                        {slots.map((slot, index) => (
                          <InputOTPSlot 
                            key={index} 
                            {...slot} 
                            className="w-10 h-12 text-lg border-border bg-muted/30 focus:border-primary"
                          />
                        ))}
                      </InputOTPGroup>
                    )}
                  />
                </div>
              </div>
              
              <Button 
                onClick={handleVerify}
                disabled={isSubmitting || verificationCode.length !== 6}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
            </CardContent>
            <CardFooter className="relative z-10 flex justify-center">
              <div className="text-sm text-muted-foreground">
                Didn't receive a code?{" "}
                <button 
                  onClick={handleResendCode}
                  disabled={isResending}
                  className="text-primary hover:underline inline-flex items-center"
                >
                  {isResending ? (
                    <>
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                      Resending...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="mr-1 h-3 w-3" />
                      Resend Code
                    </>
                  )}
                </button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
}