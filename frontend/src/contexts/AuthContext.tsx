// Update the register function to include default role
const register = async (name: string, email: string, password: string) => {
  try {
    setLoading(true);
    
    const { data: { user }, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          role: 'user' // Set default role
        },
      }
    });

    if (signUpError) throw signUpError;
    if (!user) throw new Error("Failed to create user");

    // Send verification code
    await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        data: {
          role: 'user' // Ensure role is included in verification
        }
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

// Update the isUserAdmin function to check both metadata and role column
const isUserAdmin = (user: User | null): boolean => {
  if (!user) return false;
  return user.user_metadata?.role === 'admin' || user.role === 'admin';
};