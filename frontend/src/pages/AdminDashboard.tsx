// In the users table section, update the role management dropdown:

// Add this function inside the AdminDashboard component
const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
  try {
    const { error } = await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { role: newRole }
    });

    if (error) throw error;

    toast({
      title: "Role updated",
      description: "User role has been successfully updated.",
    });

    // Refresh the users list
    handleRefresh();
  } catch (error: any) {
    toast({
      title: "Update failed",
      description: error.message || "Failed to update user role",
      variant: "destructive",
    });
  }
};

// In the users table actions dropdown:
<DropdownMenuContent align="end">
  <DropdownMenuItem onClick={() => navigate(`/admin/users/${user.id}`)}>
    <Eye className="mr-2 h-4 w-4" />
    View Profile
  </DropdownMenuItem>
  {user.role === "user" ? (
    <DropdownMenuItem 
      onClick={() => handleRoleChange(user.id, 'admin')}
      className="text-primary"
    >
      <Shield className="mr-2 h-4 w-4" />
      Make Admin
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem 
      onClick={() => handleRoleChange(user.id, 'user')}
      className="text-muted-foreground"
    >
      <Users className="mr-2 h-4 w-4" />
      Remove Admin
    </DropdownMenuItem>
  )}
  {user.status === "active" ? (
    <DropdownMenuItem className="text-red-500">
      <XCircle className="mr-2 h-4 w-4" />
      Deactivate
    </DropdownMenuItem>
  ) : (
    <DropdownMenuItem className="text-green-500">
      <CheckCircle className="mr-2 h-4 w-4" />
      Activate
    </DropdownMenuItem>
  )}
</DropdownMenuContent>