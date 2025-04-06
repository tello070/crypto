import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      try {
        const { data: user, error } = await supabase
          .from('auth.users')
          .select('role')
          .eq('id', currentUser?.id)
          .single();

        if (error) throw error;
        
        if (user?.role !== 'admin') {
          toast({
            variant: "destructive", 
            title: "Access Denied",
            description: "You don't have permission to view this page."
          });
          navigate('/dashboard');
        }
      } catch (error: any) {
        console.error('Error:', error.message);
        navigate('/dashboard');
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      checkAdminRole();
    }
  }, [currentUser]);

  // ... rest of the component code ...
}