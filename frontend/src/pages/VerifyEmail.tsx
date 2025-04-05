import { useState, useEffect } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { Loader2, RefreshCw, CheckCircle, XCircle, ArrowRight } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function VerifyEmail() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
  const [email, setEmail] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
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
    const code = verificationCode.join('');
    if (!code || code.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter the 6-digit verification code",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      setVerificationStatus("loading");
      
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: code,
        type: 'email'
      });
      
      if (error) throw error;
      
      setVerificationStatus("success");
      
      toast({
        title: "Email verified!",
        description: "Your account has been successfully verified.",
      });
      
    } catch (error: any) {
      setVerificationStatus("error");
      
      toast({
        title: "Verification failed",
        description: error.message || "Please check your code and try again",
        variant: "destructive",
      });
      
      // Reset to idle state after showing error
      setTimeout(() => {
        setVerificationStatus("idle");
        setVerificationCode(['', '', '', '', '', '']);
      }, 2000);
      
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

  const handleInputChange = (index: number, value: string) => {
    if (value.length > 1) value = value[0];
    if (!/^\d*$/.test(value)) return; // Only allow digits

    setVerificationCode(prev => {
      const newCode = [...prev];
      newCode[index] = value;
      return newCode;
    });

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !verificationCode[index] && index > 0) {
      // Focus previous input on backspace if current input is empty
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return; // Only allow digits
    
    const digits = pastedData.slice(0, 6).split('');
    const newCode = [...verificationCode];
    
    digits.forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });
    
    setVerificationCode(newCode);
    
    // Focus the next empty input or the last input
    const nextEmptyIndex = newCode.findIndex(d => d === '');
    if (nextEmptyIndex !== -1) {
      document.getElementById(`otp-${nextEmptyIndex}`)?.focus();
    } else {
      document.getElementById('otp-5')?.focus();
    }
  };
  
  // Success screen content
  if (verificationStatus === "success") {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center py-16 px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-md"
          >
            <Card className="border-border shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-secondary/10 z-0"></div>
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full filter blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full filter blur-3xl"></div>
              </div>
              
              <div className="relative z-10 py-8 px-6 flex flex-col items-center">
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    stiffness: 200, 
                    damping: 15,
                    delay: 0.2
                  }}
                  className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-6"
                >
                  <CheckCircle className="h-12 w-12 text-primary animate-pulse" />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <h2 className="text-2xl font-bold text-center mb-2">Verification Successful!</h2>
                  <p className="text-muted-foreground text-center mb-8">
                    Your email has been verified and your account is now active.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="p-4 bg-muted/30 rounded-lg border border-border">
                      <p className="text-sm text-muted-foreground mb-1">Verified Email</p>
                      <p className="font-medium text-primary">{email}</p>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                      <Link to="/" className="w-full">
                        <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 group">
                          Go to Dashboard
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                      
                      <p className="text-xs text-center text-muted-foreground">
                        You can now access all features of the CryptoBet platform
                      </p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </Card>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="mt-6 text-center"
            >
              <p className="text-sm text-muted-foreground">
                Need help? <Link to="/support" className="text-primary hover:underline">Contact Support</Link>
              </p>
            </motion.div>
          </motion.div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Verification form
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
                
                <div className="flex justify-center gap-2">
                  {verificationCode.map((digit, index) => (
                    <Input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      value={digit}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      maxLength={1}
                      className={`w-12 h-12 text-center text-lg font-mono border-border bg-muted/30 focus:border-primary transition-all duration-300 ${
                        verificationStatus === "loading" ? "opacity-50" : ""
                      } ${
                        verificationStatus === "error" ? "border-red-500 text-red-500" : ""
                      }`}
                      autoComplete="off"
                      disabled={verificationStatus !== "idle"}
                    />
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <Button 
                  onClick={handleVerify}
                  disabled={isSubmitting || verificationCode.join('').length !== 6 || verificationStatus !== "idle"}
                  className={`w-full transition-all duration-300 ${
                    verificationStatus === "idle" 
                      ? "bg-primary text-primary-foreground hover:bg-primary/90" 
                      : "opacity-0"
                  }`}
                >
                  Verify Email
                </Button>
                
                {/* Loading State */}
                {verificationStatus === "loading" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Button 
                      className="w-full bg-primary/80 text-primary-foreground"
                      disabled
                    >
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/30 to-primary/0 animate-shimmer" style={{ backgroundSize: '200% 100%' }}></div>
                      </div>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Verifying...
                    </Button>
                  </motion.div>
                )}
                
                {/* Error State */}
                {verificationStatus === "error" && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <Button 
                      className="w-full bg-red-500 text-white"
                      disabled
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Verification Failed
                    </Button>
                  </motion.div>
                )}
              </div>
            </CardContent>
            <CardFooter className="relative z-10 flex justify-center">
              <div className="text-sm text-muted-foreground">
                Didn't receive a code?{" "}
                <button 
                  onClick={handleResendCode}
                  disabled={isResending || verificationStatus !== "idle"}
                  className={`text-primary hover:underline inline-flex items-center transition-opacity duration-300 ${
                    verificationStatus !== "idle" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
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