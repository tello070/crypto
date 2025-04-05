import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/lib/supabase";
import { useToast } from "@/hooks/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  User,
  Lock,
  Bell,
  Shield,
  Loader2,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

export default function Settings() {
  const { currentUser, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [updateStatus, setUpdateStatus] = useState<"idle" | "success" | "error">("idle");

  // Profile form state
  const [profileForm, setProfileForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    location: "",
    website: "",
  });

  // Security form state
  const [securityForm, setSecurityForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // Notification preferences
  const [notificationPrefs, setNotificationPrefs] = useState({
    emailUpdates: true,
    marketAlerts: true,
    newInvestments: true,
    securityAlerts: true,
  });

  // Load user data
  useEffect(() => {
    if (currentUser) {
      setProfileForm({
        fullName: currentUser.user_metadata?.full_name || "",
        email: currentUser.email || "",
        phone: currentUser.user_metadata?.phone || "",
        bio: currentUser.user_metadata?.bio || "",
        location: currentUser.user_metadata?.location || "",
        website: currentUser.user_metadata?.website || "",
      });
    }
  }, [currentUser]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSecurityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setSecurityForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNotificationChange = (key: string, checked: boolean) => {
    setNotificationPrefs((prev) => ({
      ...prev,
      [key]: checked,
    }));
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUpdateStatus("idle");

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profileForm.fullName,
          phone: profileForm.phone,
          bio: profileForm.bio,
          location: profileForm.location,
          website: profileForm.website,
        },
      });

      if (error) throw error;

      setUpdateStatus("success");
      toast({
        title: "Profile updated",
        description: "Your profile information has been updated successfully.",
      });

      // Reset status after delay
      setTimeout(() => {
        setUpdateStatus("idle");
      }, 3000);
    } catch (error: any) {
      setUpdateStatus("error");
      toast({
        title: "Update failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUpdateStatus("idle");

    // Validate passwords match
    if (securityForm.newPassword !== securityForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "New password and confirmation must match.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: securityForm.newPassword,
      });

      if (error) throw error;

      setUpdateStatus("success");
      toast({
        title: "Password updated",
        description: "Your password has been updated successfully.",
      });

      // Reset form and status after delay
      setSecurityForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      
      setTimeout(() => {
        setUpdateStatus("idle");
      }, 3000);
    } catch (error: any) {
      setUpdateStatus("error");
      toast({
        title: "Update failed",
        description: error.message || "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNotificationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setUpdateStatus("idle");

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          notification_preferences: notificationPrefs,
        },
      });

      if (error) throw error;

      setUpdateStatus("success");
      toast({
        title: "Preferences updated",
        description: "Your notification preferences have been updated.",
      });

      setTimeout(() => {
        setUpdateStatus("idle");
      }, 3000);
    } catch (error: any) {
      setUpdateStatus("error");
      toast({
        title: "Update failed",
        description: error.message || "Failed to update preferences. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getInitials = (name: string = "") => {
    if (!name) return "CB";
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-muted/20">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Settings Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold">Account Settings</h1>
              <p className="text-muted-foreground">Manage your profile and preferences</p>
            </div>
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </Button>
          </div>

          {/* Settings Tabs */}
          <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-8">
            {/* Sidebar on larger screens */}
            <div className="hidden md:block">
              <Card>
                <CardContent className="p-4">
                  <div className="space-y-1">
                    <Button
                      variant={activeTab === "profile" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("profile")}
                    >
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </Button>
                    <Button
                      variant={activeTab === "security" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("security")}
                    >
                      <Lock className="mr-2 h-4 w-4" />
                      Security
                    </Button>
                    <Button
                      variant={activeTab === "notifications" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setActiveTab("notifications")}
                    >
                      <Bell className="mr-2 h-4 w-4" />
                      Notifications
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tabs for mobile */}
            <div className="md:hidden">
              <Tabs defaultValue="profile" value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-3 w-full mb-4">
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="security">Security</TabsTrigger>
                  <TabsTrigger value="notifications">Notifications</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Content Area */}
            <div className="space-y-6">
              {/* Profile Settings */}
              {activeTab === "profile" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                    <CardDescription>
                      Update your personal information and public profile
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleProfileSubmit} className="space-y-6">
                      <div className="flex flex-col md:flex-row gap-6 items-start">
                        <div className="flex flex-col items-center gap-2">
                          <Avatar className="w-24 h-24 border-4 border-muted">
                            <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                              {getInitials(profileForm.fullName)}
                            </AvatarFallback>
                          </Avatar>
                          <Button type="button" variant="outline" size="sm" className="mt-2">
                            Change Avatar
                          </Button>
                        </div>
                        <div className="flex-1 space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="fullName">Full Name</Label>
                              <Input
                                id="fullName"
                                name="fullName"
                                value={profileForm.fullName}
                                onChange={handleProfileChange}
                                placeholder="John Doe"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="email">Email</Label>
                              <Input
                                id="email"
                                name="email"
                                value={profileForm.email}
                                disabled
                                className="bg-muted/50"
                              />
                              <p className="text-xs text-muted-foreground">
                                Email cannot be changed
                              </p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone">Phone Number</Label>
                              <Input
                                id="phone"
                                name="phone"
                                value={profileForm.phone}
                                onChange={handleProfileChange}
                                placeholder="+1 (555) 123-4567"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="location">Location</Label>
                              <Input
                                id="location"
                                name="location"
                                value={profileForm.location}
                                onChange={handleProfileChange}
                                placeholder="New York, USA"
                              />
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="website">Website</Label>
                            <Input
                              id="website"
                              name="website"
                              value={profileForm.website}
                              onChange={handleProfileChange}
                              placeholder="https://example.com"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="bio">Bio</Label>
                            <Textarea
                              id="bio"
                              name="bio"
                              value={profileForm.bio}
                              onChange={handleProfileChange}
                              placeholder="Tell us about yourself"
                              rows={4}
                            />
                          </div>
                        </div>
                      </div>

                      {updateStatus === "success" && (
                        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>Profile updated successfully</AlertDescription>
                        </Alert>
                      )}

                      {updateStatus === "error" && (
                        <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>Failed to update profile. Please try again.</AlertDescription>
                        </Alert>
                      )}
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3 border-t pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleProfileSubmit}
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Changes"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Security Settings */}
              {activeTab === "security" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Security Settings</CardTitle>
                    <CardDescription>
                      Manage your password and security preferences
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handlePasswordSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="currentPassword">Current Password</Label>
                          <Input
                            id="currentPassword"
                            name="currentPassword"
                            type="password"
                            value={securityForm.currentPassword}
                            onChange={handleSecurityChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <Input
                            id="newPassword"
                            name="newPassword"
                            type="password"
                            value={securityForm.newPassword}
                            onChange={handleSecurityChange}
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <Input
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={securityForm.confirmPassword}
                            onChange={handleSecurityChange}
                            required
                          />
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-4">
                        <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Enable 2FA</p>
                            <p className="text-sm text-muted-foreground">
                              Add an extra layer of security to your account
                            </p>
                          </div>
                          <Switch />
                        </div>
                      </div>

                      {updateStatus === "success" && (
                        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>Password updated successfully</AlertDescription>
                        </Alert>
                      )}

                      {updateStatus === "error" && (
                        <Alert className="bg-red-500/10 text-red-500 border-red-500/20">
                          <AlertCircle className="h-4 w-4" />
                          <AlertDescription>Failed to update password. Please try again.</AlertDescription>
                        </Alert>
                      )}
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3 border-t pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={handlePasswordSubmit}
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Updating...
                        </>
                      ) : (
                        "Update Password"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}

              {/* Notification Settings */}
              {activeTab === "notifications" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Notification Preferences</CardTitle>
                    <CardDescription>
                      Control how and when you receive updates
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleNotificationSubmit} className="space-y-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Updates</p>
                            <p className="text-sm text-muted-foreground">
                              Receive weekly newsletter and updates
                            </p>
                          </div>
                          <Switch
                            checked={notificationPrefs.emailUpdates}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("emailUpdates", checked)
                            }
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Market Alerts</p>
                            <p className="text-sm text-muted-foreground">
                              Get notified about significant market changes
                            </p>
                          </div>
                          <Switch
                            checked={notificationPrefs.marketAlerts}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("marketAlerts", checked)
                            }
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">New Investment Opportunities</p>
                            <p className="text-sm text-muted-foreground">
                              Be the first to know about new investment options
                            </p>
                          </div>
                          <Switch
                            checked={notificationPrefs.newInvestments}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("newInvestments", checked)
                            }
                          />
                        </div>

                        <Separator />

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Security Alerts</p>
                            <p className="text-sm text-muted-foreground">
                              Get notified about account security events
                            </p>
                          </div>
                          <Switch
                            checked={notificationPrefs.securityAlerts}
                            onCheckedChange={(checked) =>
                              handleNotificationChange("securityAlerts", checked)
                            }
                          />
                        </div>
                      </div>

                      {updateStatus === "success" && (
                        <Alert className="bg-green-500/10 text-green-500 border-green-500/20">
                          <CheckCircle className="h-4 w-4" />
                          <AlertDescription>Notification preferences updated</AlertDescription>
                        </Alert>
                      )}
                    </form>
                  </CardContent>
                  <CardFooter className="flex justify-end gap-3 border-t pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate("/dashboard")}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      onClick={handleNotificationSubmit}
                      disabled={isSubmitting}
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        "Save Preferences"
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}