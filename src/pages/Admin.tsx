import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Search, Check, Eye, X, Users, Building2, BarChart3, Trash2, Settings, AlertTriangle } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { siteConfig } from "@/config/config";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  college_name?: string;
  register_number?: string;
  year: number;
  department: string;
  payment_screenshot_url: string | null;
  payment_verified: boolean;
  entry_confirmed: boolean;
  created_at: string;
}

type CollegeType = "outer" | "inter";
type TabType = "pending" | "verified" | "entered";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [collegeType, setCollegeType] = useState<CollegeType>("outer");
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [interRegistrations, setInterRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSetting } = useSettings();

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; isInter: boolean } | null>(null);
  const [deletePassword, setDeletePassword] = useState("");

  // Stats
  const [stats, setStats] = useState({
    outer: { total: 0, verified: 0, entered: 0, revenue: 0 },
    inter: { total: 0, verified: 0, entered: 0, revenue: 0 },
    combined: { total: 0, verified: 0, entered: 0, revenue: 0 },
  });

  const handleLogin = () => {
    if (adminPassword === siteConfig.adminPassword) {
      setIsAuthenticated(true);
      toast.success("Welcome, Admin!");
    } else {
      toast.error("Invalid password");
    }
  };

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      // Fetch outer college registrations
      const { data: outerData, error: outerError } = await supabase
        .from("registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (outerError) throw outerError;
      setRegistrations(outerData || []);

      // Fetch inter college registrations
      const { data: interData, error: interError } = await supabase
        .from("intercollege_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (interError) throw interError;
      setInterRegistrations(interData || []);

      // Calculate stats
      const outerVerified = outerData?.filter((r) => r.payment_verified).length || 0;
      const outerEntered = outerData?.filter((r) => r.entry_confirmed).length || 0;
      const interVerified = interData?.filter((r) => r.payment_verified).length || 0;
      const interEntered = interData?.filter((r) => r.entry_confirmed).length || 0;

      setStats({
        outer: {
          total: outerData?.length || 0,
          verified: outerVerified,
          entered: outerEntered,
          revenue: outerVerified * 300,
        },
        inter: {
          total: interData?.length || 0,
          verified: interVerified,
          entered: interEntered,
          revenue: interVerified * 100,
        },
        combined: {
          total: (outerData?.length || 0) + (interData?.length || 0),
          verified: outerVerified + interVerified,
          entered: outerEntered + interEntered,
          revenue: (outerVerified * 300) + (interVerified * 100),
        },
      });
    } catch (error: any) {
      toast.error("Failed to fetch registrations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchRegistrations();
    }
  }, [isAuthenticated]);

  const handleVerifyPayment = async (id: string, verified: boolean, isInter: boolean) => {
    try {
      const table = isInter ? "intercollege_registrations" : "registrations";
      const { error } = await supabase
        .from(table)
        .update({ payment_verified: verified })
        .eq("id", id);

      if (error) throw error;
      toast.success(verified ? "Payment verified!" : "Verification removed");
      fetchRegistrations();
    } catch (error: any) {
      toast.error("Failed to update");
    }
  };

  const handleConfirmEntry = async (id: string, confirmed: boolean, isInter: boolean) => {
    try {
      const table = isInter ? "intercollege_registrations" : "registrations";
      const { error } = await supabase
        .from(table)
        .update({ entry_confirmed: confirmed })
        .eq("id", id);

      if (error) throw error;
      toast.success(confirmed ? "Entry confirmed!" : "Entry removed");
      fetchRegistrations();
    } catch (error: any) {
      toast.error("Failed to update");
    }
  };

  const handleDeleteRegistration = async () => {
    if (!deleteConfirm) return;

    if (deletePassword !== siteConfig.deletePassword) {
      toast.error("Invalid delete password");
      return;
    }

    try {
      const table = deleteConfirm.isInter ? "intercollege_registrations" : "registrations";
      const { error } = await supabase
        .from(table)
        .delete()
        .eq("id", deleteConfirm.id);

      if (error) throw error;
      toast.success("Registration deleted");
      setDeleteConfirm(null);
      setDeletePassword("");
      fetchRegistrations();
    } catch (error: any) {
      toast.error("Failed to delete registration");
    }
  };

  const currentData = collegeType === "outer" ? registrations : interRegistrations;
  const isInter = collegeType === "inter";

  const filteredRegistrations = currentData.filter((r) => {
    const matchesSearch =
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.register_number && r.register_number.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeTab === "pending") return !r.payment_verified && matchesSearch;
    if (activeTab === "verified") return r.payment_verified && !r.entry_confirmed && matchesSearch;
    if (activeTab === "entered") return r.entry_confirmed && matchesSearch;
    return matchesSearch;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="glass-card rounded-2xl p-8 w-full max-w-md">
          <h1 className="font-display text-3xl font-bold text-gradient text-center mb-8">
            Admin Login
          </h1>
          <div className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            />
            <Button onClick={handleLogin} className="w-full btn-primary-gradient">
              Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold text-gradient">
            Admin Dashboard
          </h1>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setShowSettings(!showSettings)}>
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
              Logout
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <div className="glass-card rounded-xl p-6 mb-8 border-2 border-primary/30">
            <h2 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Site Settings
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div>
                  <p className="font-medium text-foreground">Maintenance Mode</p>
                  <p className="text-sm text-muted-foreground">Show maintenance page to visitors</p>
                </div>
                <Switch
                  checked={settings.maintenance_mode}
                  onCheckedChange={(checked) => updateSetting("maintenance_mode", checked)}
                />
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/30 rounded-xl">
                <div>
                  <p className="font-medium text-foreground">Registration Status</p>
                  <p className="text-sm text-muted-foreground">
                    {settings.registration_open ? "Open for registration" : "Registration closed"}
                  </p>
                </div>
                <Switch
                  checked={settings.registration_open}
                  onCheckedChange={(checked) => updateSetting("registration_open", checked)}
                />
              </div>
            </div>
            <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-200">
                  Registration closes on <strong>10th February 2026</strong>
                </p>
                <p className="text-xs text-yellow-200/70 mt-1">
                  Limits: Outer College - {stats.outer.total}/{siteConfig.outerCollegeLimit} | Inter College - {stats.inter.total}/{siteConfig.interCollegeLimit}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Combined Analytics */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Combined Analytics</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-foreground">
                {stats.combined.total}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total Registrations</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-green-400">
                {stats.combined.verified}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Verified Payments</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-neon-cyan">
                {stats.combined.entered}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Entry Confirmed</p>
            </div>
            <div className="bg-muted/30 rounded-xl p-4 text-center">
              <p className="text-2xl font-display font-bold text-primary">
                ₹{stats.combined.revenue.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total Revenue</p>
            </div>
          </div>
        </div>

        {/* College Type Selector */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setCollegeType("outer")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${collegeType === "outer"
                ? "bg-uiverse-green/20 text-uiverse-green border-2 border-uiverse-green/50"
                : "bg-muted text-muted-foreground hover:bg-muted/80 border-2 border-transparent"
              }`}
          >
            <Building2 className="w-5 h-5" />
            Outer College ({stats.outer.total}/{siteConfig.outerCollegeLimit})
          </button>
          <button
            onClick={() => setCollegeType("inter")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${collegeType === "inter"
                ? "bg-uiverse-purple/20 text-uiverse-purple border-2 border-uiverse-purple/50"
                : "bg-muted text-muted-foreground hover:bg-muted/80 border-2 border-transparent"
              }`}
          >
            <Users className="w-5 h-5" />
            Inter College ({stats.inter.total}/{siteConfig.interCollegeLimit})
          </button>
        </div>

        {/* Section Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${isInter ? 'border-uiverse-purple/30' : 'border-uiverse-green/30'}`}>
            <p className="text-3xl font-display font-bold text-foreground">
              {isInter ? stats.inter.total : stats.outer.total}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Registrations</p>
          </div>
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${isInter ? 'border-uiverse-purple/30' : 'border-uiverse-green/30'}`}>
            <p className="text-3xl font-display font-bold text-green-400">
              {isInter ? stats.inter.verified : stats.outer.verified}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Verified Payments</p>
          </div>
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${isInter ? 'border-uiverse-purple/30' : 'border-uiverse-green/30'}`}>
            <p className="text-3xl font-display font-bold text-neon-cyan">
              {isInter ? stats.inter.entered : stats.outer.entered}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Entry Confirmed</p>
          </div>
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${isInter ? 'border-uiverse-purple/30' : 'border-uiverse-green/30'}`}>
            <p className={`text-3xl font-display font-bold ${isInter ? 'text-uiverse-purple' : 'text-uiverse-green'}`}>
              ₹{(isInter ? stats.inter.revenue : stats.outer.revenue).toLocaleString("en-IN")}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Revenue ({isInter ? '₹100/pass' : '₹300/pass'})</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          {[
            { id: "pending", label: "Pending Verification" },
            { id: "verified", label: "Verified Payments" },
            { id: "entered", label: "Entry Confirmed" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as TabType)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                ? isInter ? "bg-uiverse-purple text-white" : "bg-primary text-white"
                : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={isInter ? "Search by email, phone, name, or register number..." : "Search by email, phone, or name..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        {/* Registrations List */}
        <div className="glass-card rounded-xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredRegistrations.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No registrations found
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/30">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Contact</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      {isInter ? "Register No." : "College"}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Year/Dept</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Screenshot</th>
                    <th className="px-4 py-3 text-left text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-muted/20">
                      <td className="px-4 py-3">
                        <p className="font-medium">{reg.name}</p>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-sm">{reg.email}</p>
                        <p className="text-sm text-muted-foreground">{reg.phone}</p>
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isInter ? reg.register_number : reg.college_name}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        Year {reg.year} - {reg.department}
                      </td>
                      <td className="px-4 py-3">
                        {reg.payment_screenshot_url ? (
                          <button
                            onClick={() => setSelectedScreenshot(reg.payment_screenshot_url)}
                            className={`hover:underline flex items-center gap-1 ${isInter ? 'text-uiverse-purple' : 'text-primary'}`}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </button>
                        ) : (
                          <span className="text-muted-foreground text-sm">No screenshot</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {!reg.payment_verified ? (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleVerifyPayment(reg.id, true, isInter)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ id: reg.id, isInter })}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          ) : !reg.entry_confirmed ? (
                            <>
                              <Button
                                size="sm"
                                onClick={() => handleConfirmEntry(reg.id, true, isInter)}
                                className="bg-neon-cyan hover:bg-neon-cyan/80 text-background"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Entry
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleVerifyPayment(reg.id, false, isInter)}
                              >
                                <X className="w-4 h-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ id: reg.id, isInter })}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          ) : (
                            <>
                              <span className="text-green-400 flex items-center gap-1">
                                <Check className="w-4 h-4" />
                                Completed
                              </span>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => setDeleteConfirm({ id: reg.id, isInter })}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Screenshot Modal */}
      {selectedScreenshot && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedScreenshot(null)}
        >
          <div className="relative max-w-2xl max-h-[80vh]">
            <button
              onClick={() => setSelectedScreenshot(null)}
              className="absolute -top-10 right-0 text-white hover:text-red-400"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={selectedScreenshot}
              alt="Payment Screenshot"
              className="max-w-full max-h-[80vh] rounded-lg"
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass-card rounded-2xl p-6 max-w-md w-full">
            <h3 className="font-display text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Trash2 className="w-5 h-5 text-red-500" />
              Confirm Delete
            </h3>
            <p className="text-muted-foreground mb-4">
              Enter the delete password to remove this registration permanently.
            </p>
            <Input
              type="password"
              placeholder="Enter delete password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
              className="mb-4"
            />
            <div className="flex gap-2">
              <Button
                variant="destructive"
                onClick={handleDeleteRegistration}
                className="flex-1"
              >
                Delete
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setDeleteConfirm(null);
                  setDeletePassword("");
                }}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Admin;