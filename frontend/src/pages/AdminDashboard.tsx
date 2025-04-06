import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface Investment {
  id: string;
  amount: number;
  crypto_type: string;
  created_at: string;
  user_id: string;
}

export default function AdminDashboard() {
  const { currentUser } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [investments, setInvestments] = useState<Investment[]>([]);

  useEffect(() => {
    const checkAdminAndLoadData = async () => {
      try {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('role')
          .eq('id', currentUser?.id)
          .single();

        if (userError || userData?.role !== 'admin') {
          toast({
            variant: "destructive",
            title: "Access Denied",
            description: "You don't have permission to view this page."
          });
          navigate('/dashboard');
          return;
        }

        // Fetch all investments for admin view
        const { data: investmentsData, error: investmentsError } = await supabase
          .from('investments')
          .select('*')
          .order('created_at', { ascending: false });

        if (investmentsError) throw investmentsError;
        setInvestments(investmentsData || []);

      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message
        });
      } finally {
        setLoading(false);
      }
    };

    if (currentUser) {
      checkAdminAndLoadData();
    }
  }, [currentUser, navigate, toast]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {investments.map((investment) => (
          <Card key={investment.id} className="p-4">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-semibold">{investment.crypto_type}</h3>
                <p className="text-sm text-muted-foreground">
                  Amount: ${investment.amount}
                </p>
              </div>
              <Button
                variant="destructive"
                size="sm"
                onClick={async () => {
                  try {
                    const { error } = await supabase
                      .from('investments')
                      .delete()
                      .eq('id', investment.id);
                    
                    if (error) throw error;
                    
                    setInvestments(prev => 
                      prev.filter(inv => inv.id !== investment.id)
                    );
                    
                    toast({
                      title: "Success",
                      description: "Investment deleted successfully"
                    });
                  } catch (error: any) {
                    toast({
                      variant: "destructive",
                      title: "Error",
                      description: "Failed to delete investment"
                    });
                  }
                }}
              >
                Delete
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              Created: {new Date(investment.created_at).toLocaleDateString()}
            </p>
          </Card>
        ))}
      </div>
    </div>
  );
}