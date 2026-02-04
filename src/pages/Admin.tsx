import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import * as XLSX from "xlsx";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Search, Check, Eye, X, Users, Building2, BarChart3, Trash2, Settings,
  AlertTriangle, FileDown, GraduationCap, TrendingUp, Calendar,
  PieChart, ChevronDown
} from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { siteConfig } from "@/config/config";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  college_name?: string;
  register_number?: string;
  year: number;
  department?: string;
  section?: string;
  payment_screenshot_url?: string | null;
  payment_verified?: boolean;
  entry_confirmed: boolean;
  created_at: string;
}

type CollegeType = "outer" | "inter" | "dept";
type TabType = "pending" | "verified" | "entered" | "all";

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [collegeType, setCollegeType] = useState<CollegeType>("outer");
  const [activeTab, setActiveTab] = useState<TabType>("pending");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [interRegistrations, setInterRegistrations] = useState<Registration[]>([]);
  const [deptRegistrations, setDeptRegistrations] = useState<Registration[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedScreenshot, setSelectedScreenshot] = useState<string | null>(null);

  // Settings
  const [showSettings, setShowSettings] = useState(false);
  const { settings, updateSetting } = useSettings();

  // Delete confirmation
  const [deleteConfirm, setDeleteConfirm] = useState<{ id: string; type: CollegeType } | null>(null);
  const [deletePassword, setDeletePassword] = useState("");

  // Export options
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [showAdvancedExport, setShowAdvancedExport] = useState(false);
  const [exportConfig, setExportConfig] = useState({
    sources: { outer: true, inter: true, dept: true },
    status: { pending: true, verified: true, entered: true },
    fields: {
      name: true,
      email: true,
      phone: true,
      college: true,
      registerNumber: true,
      year: true,
      dept: true,
      section: true,
      paymentStatus: true,
      entryStatus: true,
      date: true
    }
  });

  // Stats
  const [stats, setStats] = useState({
    outer: { total: 0, verified: 0, entered: 0, revenue: 0 },
    inter: { total: 0, verified: 0, entered: 0, revenue: 0 },
    dept: { total: 0, verified: 0, entered: 0, revenue: 0 },
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

      // Fetch department registrations
      const { data: deptData, error: deptError } = await supabase
        .from("department_registrations")
        .select("*")
        .order("created_at", { ascending: false });

      if (deptError) throw deptError;
      setDeptRegistrations(deptData || []);

      // Calculate stats
      const outerVerified = outerData?.filter((r) => r.payment_verified).length || 0;
      const outerEntered = outerData?.filter((r) => r.entry_confirmed).length || 0;
      const interEntered = interData?.filter((r) => r.entry_confirmed).length || 0;
      const deptEntered = deptData?.filter((r) => r.entry_confirmed).length || 0;

      setStats({
        outer: {
          total: outerData?.length || 0,
          verified: outerVerified,
          entered: outerEntered,
          revenue: outerVerified * 300,
        },
        inter: {
          total: interData?.length || 0,
          verified: interData?.length || 0, // All inter registrations are "verified" (free)
          entered: interEntered,
          revenue: 0, // Free registration
        },
        dept: {
          total: deptData?.length || 0,
          verified: deptData?.length || 0, // All dept registrations are "verified" (no payment)
          entered: deptEntered,
          revenue: 0,
        },
        combined: {
          total: (outerData?.length || 0) + (interData?.length || 0) + (deptData?.length || 0),
          verified: outerVerified + (interData?.length || 0) + (deptData?.length || 0),
          entered: outerEntered + interEntered + deptEntered,
          revenue: (outerVerified * 300), // Only outer college pays
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

  const getTableName = (type: CollegeType) => {
    if (type === "inter") return "intercollege_registrations";
    if (type === "dept") return "department_registrations";
    return "registrations";
  };

  const handleVerifyPayment = async (id: string, verified: boolean, type: CollegeType) => {
    try {
      const { error } = await supabase
        .from(getTableName(type))
        .update({ payment_verified: verified })
        .eq("id", id);

      if (error) throw error;
      toast.success(verified ? "Payment verified!" : "Verification removed");
      fetchRegistrations();
    } catch (error: any) {
      toast.error("Failed to update");
    }
  };

  const handleConfirmEntry = async (id: string, confirmed: boolean, type: CollegeType) => {
    try {
      const { error } = await supabase
        .from(getTableName(type))
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
      const { error } = await supabase
        .from(getTableName(deleteConfirm.type))
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

  // Advanced Export Logic
  const handleAdvancedExportLogic = () => {
    try {
      const wb = XLSX.utils.book_new();
      const { sources, status, fields } = exportConfig;

      const shouldInclude = (r: Registration, type: CollegeType) => {
        const isVerified = r.payment_verified;
        const isEntered = r.entry_confirmed;

        // For dept, 'verified' effectively means registered as they are free
        // 'pending' for dept might mean nothing or just 'not entered'
        if (type === 'dept') {
          if (status.entered && isEntered) return true;
          if (status.pending && !isEntered) return true;
          // If verified is checked, we include all dept students as they are technically 'verified'/accepted
          if (status.verified) return true;
          return false;
        }

        // Logic for paid categories (Outer/Inter)
        if (status.pending && !isVerified) return true;
        if (status.verified && isVerified) return true;
        if (status.entered && isEntered) return true;

        return false;
      };

      const processData = (data: Registration[], type: CollegeType) => {
        return data.filter(r => shouldInclude(r, type)).map(r => {
          const row: any = {};
          if (fields.name) row["Name"] = r.name;
          if (fields.email) row["Email"] = r.email;
          if (fields.phone) row["Phone"] = r.phone;
          if (fields.college) row["College"] = r.college_name || (type === 'outer' ? 'Other' : 'VSB');
          if (fields.registerNumber) row["Register No"] = r.register_number || "N/A";
          if (fields.year) row["Year"] = r.year;
          if (fields.dept) row["Department"] = r.department || "N/A";
          if (fields.section) row["Section"] = r.section || "N/A";
          if (fields.paymentStatus) row["Payment Status"] = r.payment_verified ? "Verified" : "Pending";
          if (fields.entryStatus) row["Entry Status"] = r.entry_confirmed ? "Confirmed" : "Pending";
          if (fields.date) row["Registration Date"] = new Date(r.created_at).toLocaleDateString();
          return row;
        });
      };

      if (sources.outer) {
        const data = processData(registrations, 'outer');
        if (data.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), "Outer College");
      }
      if (sources.inter) {
        const data = processData(interRegistrations, 'inter');
        if (data.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), "Intra College");
      }
      if (sources.dept) {
        const data = processData(deptRegistrations, 'dept');
        if (data.length) XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), "Department");
      }

      if (wb.SheetNames.length === 0) {
        toast.error("No data matches your selection");
        return;
      }

      const date = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `Vyuga_Advanced_Export_${date}.xlsx`);
      toast.success("Export successful!");
      setShowAdvancedExport(false);
    } catch (error) {
      console.error(error);
      toast.error("Export failed");
    }
  };

  // Enhanced Export with filters
  const handleExport = (exportType: string) => {
    try {
      const wb = XLSX.utils.book_new();

      const processOuterData = (data: Registration[]) => {
        return data.map((r) => ({
          Name: r.name,
          Email: r.email,
          Phone: r.phone,
          College: r.college_name,
          Year: r.year,
          Department: r.department,
          "Payment Status": r.payment_verified ? "Verified" : "Pending",
          "Entry Status": r.entry_confirmed ? "Confirmed" : "Pending",
          "Registration Date": new Date(r.created_at).toLocaleDateString(),
        }));
      };

      const processInterData = (data: Registration[]) => {
        return data.map((r) => ({
          Name: r.name,
          Email: r.email,
          Phone: r.phone,
          "Register No": r.register_number,
          Year: r.year,
          Department: r.department,
          "Entry Status": r.entry_confirmed ? "Confirmed" : "Pending",
          "Registration Date": new Date(r.created_at).toLocaleDateString(),
        }));
      };

      const processDeptData = (data: Registration[]) => {
        return data.map((r) => ({
          Name: r.name,
          Email: r.email,
          Phone: r.phone,
          "Register No": r.register_number,
          Year: r.year,
          Section: r.section,
          "Entry Status": r.entry_confirmed ? "Confirmed" : "Pending",
          "Registration Date": new Date(r.created_at).toLocaleDateString(),
        }));
      };

      const addSheetIfData = (data: any[], sheetName: string) => {
        if (data.length > 0) {
          XLSX.utils.book_append_sheet(wb, XLSX.utils.json_to_sheet(data), sheetName);
        }
      };

      switch (exportType) {
        case "all":
          // All registrations
          addSheetIfData(processOuterData(registrations), "Outer College - All");
          addSheetIfData(processInterData(interRegistrations), "Intra College - All");
          addSheetIfData(processDeptData(deptRegistrations), "Department - All");
          break;

        case "outer":
          addSheetIfData(processOuterData(registrations.filter(r => !r.payment_verified)), "Outer - Pending");
          addSheetIfData(processOuterData(registrations.filter(r => r.payment_verified && !r.entry_confirmed)), "Outer - Verified");
          addSheetIfData(processOuterData(registrations.filter(r => r.entry_confirmed)), "Outer - Entered");
          break;

        case "inter":
          // Inter is now free - no payment verification, just entry status
          addSheetIfData(processInterData(interRegistrations.filter(r => !r.entry_confirmed)), "Intra - Pending Entry");
          addSheetIfData(processInterData(interRegistrations.filter(r => r.entry_confirmed)), "Intra - Entered");
          break;

        case "dept":
          addSheetIfData(processDeptData(deptRegistrations.filter(r => !r.entry_confirmed)), "Dept - Pending Entry");
          addSheetIfData(processDeptData(deptRegistrations.filter(r => r.entry_confirmed)), "Dept - Entered");
          break;

        case "verified":
          // Only outer college has payment verification now
          addSheetIfData(processOuterData(registrations.filter(r => r.payment_verified)), "Outer - Verified");
          addSheetIfData(processInterData(interRegistrations), "Intra - All (Free)");
          addSheetIfData(processDeptData(deptRegistrations), "Dept - All (Free)");
          break;

        case "entered":
          addSheetIfData(processOuterData(registrations.filter(r => r.entry_confirmed)), "Outer - Entered");
          addSheetIfData(processInterData(interRegistrations.filter(r => r.entry_confirmed)), "Intra - Entered");
          addSheetIfData(processDeptData(deptRegistrations.filter(r => r.entry_confirmed)), "Dept - Entered");
          break;

        default:
          // Default: all with status sheets
          addSheetIfData(processOuterData(registrations), "Outer College");
          addSheetIfData(processInterData(interRegistrations), "Intra College");
          addSheetIfData(processDeptData(deptRegistrations), "Department");
      }

      // Check if any sheets were added
      if (wb.SheetNames.length === 0) {
        toast.error("No data to export");
        return;
      }

      const date = new Date().toISOString().split('T')[0];
      XLSX.writeFile(wb, `Vyuga_Registrations_${exportType}_${date}.xlsx`);
      toast.success("Export successful!");
      setShowExportOptions(false);
    } catch (error) {
      console.error("Export failed:", error);
      toast.error("Failed to export data");
    }
  };

  const getCurrentData = () => {
    if (collegeType === "inter") return interRegistrations;
    if (collegeType === "dept") return deptRegistrations;
    return registrations;
  };

  const currentData = getCurrentData();
  const isDept = collegeType === "dept";

  const filteredRegistrations = currentData.filter((r) => {
    const matchesSearch =
      r.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.phone.includes(searchQuery) ||
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.register_number && r.register_number.toLowerCase().includes(searchQuery.toLowerCase()));

    // For dept AND inter (both are free now - no payment verification)
    if (isDept || collegeType === "inter") {
      if (activeTab === "pending") return !r.entry_confirmed && matchesSearch;
      if (activeTab === "entered") return r.entry_confirmed && matchesSearch;
      if (activeTab === "all") return matchesSearch;
      return !r.entry_confirmed && matchesSearch; // Default to pending
    }

    // Only outer college has payment verification
    if (activeTab === "pending") return !r.payment_verified && matchesSearch;
    if (activeTab === "verified") return r.payment_verified && !r.entry_confirmed && matchesSearch;
    if (activeTab === "entered") return r.entry_confirmed && matchesSearch;
    if (activeTab === "all") return matchesSearch;
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
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <h1 className="font-display text-3xl font-bold text-gradient">
            Admin Dashboard
          </h1>
          <div className="flex flex-wrap gap-2">
            {/* Advanced Export Dialog */}
            <div className="relative">
              <Dialog open={showAdvancedExport} onOpenChange={setShowAdvancedExport}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-gradient-to-r from-uiverse-purple/10 to-uiverse-sky/10 border-uiverse-purple/30 hover:bg-uiverse-purple/20 text-white hover:text-white">
                    <FileDown className="w-4 h-4" />
                    Advanced Export
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-3xl bg-black/95 border border-white/10 backdrop-blur-xl text-white shadow-2xl">
                  <DialogHeader>
                    <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple to-uiverse-sky">
                      Advanced Data Export
                    </DialogTitle>
                    <DialogDescription className="text-gray-400">
                      Customize your data export by selecting sources, filters, and columns.
                    </DialogDescription>
                  </DialogHeader>

                  <div className="grid md:grid-cols-3 gap-8 py-6">
                    {/* Source Selection */}
                    <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                        <Building2 className="w-4 h-4 text-uiverse-purple" /> Data Sources
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="src-outer"
                            checked={exportConfig.sources.outer}
                            onCheckedChange={(c) => setExportConfig(prev => ({ ...prev, sources: { ...prev.sources, outer: !!c } }))}
                            className="border-white/20 data-[state=checked]:bg-uiverse-purple data-[state=checked]:border-uiverse-purple"
                          />
                          <Label htmlFor="src-outer" className="text-gray-300 font-medium cursor-pointer">Outer College</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="src-inter"
                            checked={exportConfig.sources.inter}
                            onCheckedChange={(c) => setExportConfig(prev => ({ ...prev, sources: { ...prev.sources, inter: !!c } }))}
                            className="border-white/20 data-[state=checked]:bg-uiverse-purple data-[state=checked]:border-uiverse-purple"
                          />
                          <Label htmlFor="src-inter" className="text-gray-300 font-medium cursor-pointer">Intra College</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="src-dept"
                            checked={exportConfig.sources.dept}
                            onCheckedChange={(c) => setExportConfig(prev => ({ ...prev, sources: { ...prev.sources, dept: !!c } }))}
                            className="border-white/20 data-[state=checked]:bg-uiverse-purple data-[state=checked]:border-uiverse-purple"
                          />
                          <Label htmlFor="src-dept" className="text-gray-300 font-medium cursor-pointer">AI&DS Dept</Label>
                        </div>
                      </div>
                    </div>

                    {/* Status Selection */}
                    <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                        <Check className="w-4 h-4 text-green-400" /> Filter Status
                      </h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sts-pending"
                            checked={exportConfig.status.pending}
                            onCheckedChange={(c) => setExportConfig(prev => ({ ...prev, status: { ...prev.status, pending: !!c } }))}
                            className="border-white/20 data-[state=checked]:bg-yellow-500 data-[state=checked]:border-yellow-500"
                          />
                          <Label htmlFor="sts-pending" className="text-gray-300 font-medium cursor-pointer">Pending</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sts-verified"
                            checked={exportConfig.status.verified}
                            onCheckedChange={(c) => setExportConfig(prev => ({ ...prev, status: { ...prev.status, verified: !!c } }))}
                            className="border-white/20 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label htmlFor="sts-verified" className="text-gray-300 font-medium cursor-pointer">Verified</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="sts-entered"
                            checked={exportConfig.status.entered}
                            onCheckedChange={(c) => setExportConfig(prev => ({ ...prev, status: { ...prev.status, entered: !!c } }))}
                            className="border-white/20 data-[state=checked]:bg-neon-cyan data-[state=checked]:border-neon-cyan"
                          />
                          <Label htmlFor="sts-entered" className="text-gray-300 font-medium cursor-pointer">Entry Confirmed</Label>
                        </div>
                      </div>
                    </div>

                    {/* Column Selection */}
                    <div className="space-y-4 p-4 rounded-xl bg-white/5 border border-white/10">
                      <h3 className="font-bold text-white flex items-center gap-2 border-b border-white/10 pb-2">
                        <BarChart3 className="w-4 h-4 text-uiverse-sky" /> Include Columns
                      </h3>
                      <div className="grid grid-cols-1 gap-2 text-sm overflow-y-auto max-h-[200px] pr-2 custom-scrollbar">
                        {Object.entries(exportConfig.fields).map(([key, value]) => (
                          <div key={key} className="flex items-center space-x-2">
                            <Checkbox
                              id={`fld-${key}`}
                              checked={value}
                              onCheckedChange={(c) => setExportConfig(prev => ({ ...prev, fields: { ...prev.fields, [key]: !!c } }))}
                              className="w-4 h-4 border-white/20 data-[state=checked]:bg-uiverse-sky data-[state=checked]:border-uiverse-sky"
                            />
                            <Label htmlFor={`fld-${key}`} className="text-gray-300 capitalize cursor-pointer hover:text-white transition-colors">
                              {key.replace(/([A-Z])/g, ' $1').trim()}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <DialogFooter className="sm:justify-between gap-4 border-t border-white/10 pt-6">
                    <div className="text-xs text-gray-500 flex items-center">
                      * Filter logic selects records matching ANY checked status.
                    </div>
                    <Button onClick={handleAdvancedExportLogic} className="bg-gradient-to-r from-uiverse-purple to-uiverse-sky text-white border-0 hover:opacity-90 transition-opacity px-8">
                      Download Report
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
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

            {/* Toggle Controls */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
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

            {/* Registration Limits */}
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              <div className="p-4 bg-uiverse-green/10 border border-uiverse-green/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">Outer College Limit</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {stats.outer.total}/{settings.outer_college_limit}
                    </p>
                  </div>
                  <Building2 className="w-5 h-5 text-uiverse-green" />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={stats.outer.total}
                    value={settings.outer_college_limit}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= stats.outer.total) {
                        updateSetting("outer_college_limit", val);
                      }
                    }}
                    className="w-24 text-center"
                  />
                  <span className="text-sm text-muted-foreground">max</span>
                </div>
                {stats.outer.total >= settings.outer_college_limit && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    Limit reached
                  </p>
                )}
              </div>
              <div className="p-4 bg-uiverse-purple/10 border border-uiverse-purple/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">Intra College Limit</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {stats.inter.total}/{settings.inter_college_limit}
                    </p>
                  </div>
                  <Users className="w-5 h-5 text-uiverse-purple" />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={stats.inter.total}
                    value={settings.inter_college_limit}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= stats.inter.total) {
                        updateSetting("inter_college_limit", val);
                      }
                    }}
                    className="w-24 text-center"
                  />
                  <span className="text-sm text-muted-foreground">max</span>
                </div>
                {stats.inter.total >= settings.inter_college_limit && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    Limit reached
                  </p>
                )}
              </div>
              <div className="p-4 bg-uiverse-sky/10 border border-uiverse-sky/30 rounded-xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <p className="font-medium text-foreground">Department Limit</p>
                    <p className="text-sm text-muted-foreground">
                      Current: {stats.dept.total}/{settings.department_limit}
                    </p>
                  </div>
                  <GraduationCap className="w-5 h-5 text-uiverse-sky" />
                </div>
                <div className="flex items-center gap-2">
                  <Input
                    type="number"
                    min={stats.dept.total}
                    value={settings.department_limit}
                    onChange={(e) => {
                      const val = parseInt(e.target.value);
                      if (!isNaN(val) && val >= stats.dept.total) {
                        updateSetting("department_limit", val);
                      }
                    }}
                    className="w-24 text-center"
                  />
                  <span className="text-sm text-muted-foreground">max</span>
                </div>
                {stats.dept.total >= settings.department_limit && (
                  <p className="text-xs text-red-400 mt-2 flex items-center gap-1">
                    <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse" />
                    Limit reached
                  </p>
                )}
              </div>
            </div>

            {/* Info Banner */}
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-yellow-200">
                  Registration closes on <strong>{siteConfig.registrationCloseDate}</strong>
                </p>
                <p className="text-xs text-yellow-200/70 mt-1">
                  Registration will auto-close when limits are reached or deadline passes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Analytics Dashboard */}
        <div className="glass-card rounded-xl p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h2 className="font-display text-xl font-bold text-foreground">Event Analytics</h2>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gradient-to-br from-primary/20 to-primary/5 rounded-xl p-4 border border-primary/30">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-xs text-muted-foreground">Total</span>
              </div>
              <p className="text-3xl font-display font-bold text-foreground">
                {stats.combined.total}
              </p>
              <p className="text-xs text-muted-foreground mt-1">All Registrations</p>
            </div>
            <div className="bg-gradient-to-br from-green-500/20 to-green-500/5 rounded-xl p-4 border border-green-500/30">
              <div className="flex items-center justify-between mb-2">
                <Check className="w-5 h-5 text-green-400" />
                <span className="text-xs text-muted-foreground">Verified</span>
              </div>
              <p className="text-3xl font-display font-bold text-green-400">
                {stats.combined.verified}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.combined.total > 0 ? Math.round((stats.combined.verified / stats.combined.total) * 100) : 0}% verified
              </p>
            </div>
            <div className="bg-gradient-to-br from-neon-cyan/20 to-neon-cyan/5 rounded-xl p-4 border border-neon-cyan/30">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-neon-cyan" />
                <span className="text-xs text-muted-foreground">Attended</span>
              </div>
              <p className="text-3xl font-display font-bold text-neon-cyan">
                {stats.combined.entered}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                {stats.combined.verified > 0 ? Math.round((stats.combined.entered / stats.combined.verified) * 100) : 0}% attendance
              </p>
            </div>
            <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-500/5 rounded-xl p-4 border border-yellow-500/30">
              <div className="flex items-center justify-between mb-2">
                <PieChart className="w-5 h-5 text-yellow-400" />
                <span className="text-xs text-muted-foreground">Revenue</span>
              </div>
              <p className="text-3xl font-display font-bold text-yellow-400">
                ₹{stats.combined.revenue.toLocaleString("en-IN")}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total collected</p>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-muted/20 rounded-xl p-4 border border-uiverse-green/20">
              <div className="flex items-center gap-2 mb-3">
                <Building2 className="w-4 h-4 text-uiverse-green" />
                <span className="font-medium text-foreground">Outer College</span>
                <span className="ml-auto text-xs bg-uiverse-green/20 text-uiverse-green px-2 py-0.5 rounded-full">
                  ₹300/pass
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="font-medium">{stats.outer.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified</span>
                  <span className="font-medium text-green-400">{stats.outer.verified}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attended</span>
                  <span className="font-medium text-neon-cyan">{stats.outer.entered}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-bold text-uiverse-green">₹{stats.outer.revenue.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/20 rounded-xl p-4 border border-uiverse-purple/20">
              <div className="flex items-center gap-2 mb-3">
                <Users className="w-4 h-4 text-uiverse-purple" />
                <span className="font-medium text-foreground">Inter College</span>
                <span className="ml-auto text-xs bg-uiverse-purple/20 text-uiverse-purple px-2 py-0.5 rounded-full">
                  ₹100/pass
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="font-medium">{stats.inter.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Verified</span>
                  <span className="font-medium text-green-400">{stats.inter.verified}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attended</span>
                  <span className="font-medium text-neon-cyan">{stats.inter.entered}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="text-muted-foreground">Revenue</span>
                  <span className="font-bold text-uiverse-purple">₹{stats.inter.revenue.toLocaleString("en-IN")}</span>
                </div>
              </div>
            </div>
            <div className="bg-muted/20 rounded-xl p-4 border border-uiverse-sky/20">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-4 h-4 text-uiverse-sky" />
                <span className="font-medium text-foreground">AI&DS Dept</span>
                <span className="ml-auto text-xs bg-uiverse-sky/20 text-uiverse-sky px-2 py-0.5 rounded-full">
                  Free
                </span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Registered</span>
                  <span className="font-medium">{stats.dept.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confirmed</span>
                  <span className="font-medium text-green-400">{stats.dept.total}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Attended</span>
                  <span className="font-medium text-neon-cyan">{stats.dept.entered}</span>
                </div>
                <div className="flex justify-between border-t border-border pt-2 mt-2">
                  <span className="text-muted-foreground">Status</span>
                  <span className="font-bold text-uiverse-sky">No Payment</span>
                </div>
              </div>
            </div>
          </div>

          {/* Event Info */}
          <div className="mt-6 p-4 bg-muted/10 rounded-xl border border-border flex flex-wrap items-center gap-6">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Event Date:</span>
              <span className="text-sm font-medium">{siteConfig.eventDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Reg Deadline:</span>
              <span className="text-sm font-medium text-yellow-400">{siteConfig.registrationCloseDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-green-400" />
              <span className="text-sm text-muted-foreground">Capacity:</span>
              <span className="text-sm font-medium">
                {stats.combined.total}/{settings.outer_college_limit + settings.inter_college_limit + settings.department_limit}
              </span>
            </div>
          </div>
        </div>

        {/* College Type Selector */}
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            onClick={() => { setCollegeType("outer"); setActiveTab("pending"); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${collegeType === "outer"
              ? "bg-uiverse-green/20 text-uiverse-green border-2 border-uiverse-green/50"
              : "bg-muted text-muted-foreground hover:bg-muted/80 border-2 border-transparent"
              }`}
          >
            <Building2 className="w-5 h-5" />
            Outer College ({stats.outer.total}/{settings.outer_college_limit})
          </button>
          <button
            onClick={() => { setCollegeType("inter"); setActiveTab("pending"); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${collegeType === "inter"
              ? "bg-uiverse-purple/20 text-uiverse-purple border-2 border-uiverse-purple/50"
              : "bg-muted text-muted-foreground hover:bg-muted/80 border-2 border-transparent"
              }`}
          >
            <Users className="w-5 h-5" />
            Inter College ({stats.inter.total}/{settings.inter_college_limit})
          </button>
          <button
            onClick={() => { setCollegeType("dept"); setActiveTab("pending"); }}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${collegeType === "dept"
              ? "bg-uiverse-sky/20 text-uiverse-sky border-2 border-uiverse-sky/50"
              : "bg-muted text-muted-foreground hover:bg-muted/80 border-2 border-transparent"
              }`}
          >
            <GraduationCap className="w-5 h-5" />
            AI&DS Dept ({stats.dept.total}/{settings.department_limit})
          </button>
        </div>

        {/* Section Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${collegeType === "inter" ? 'border-uiverse-purple/30' :
            collegeType === "dept" ? 'border-uiverse-sky/30' : 'border-uiverse-green/30'
            }`}>
            <p className="text-3xl font-display font-bold text-foreground">
              {collegeType === "inter" ? stats.inter.total : collegeType === "dept" ? stats.dept.total : stats.outer.total}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Total Registrations</p>
          </div>
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${collegeType === "inter" ? 'border-uiverse-purple/30' :
            collegeType === "dept" ? 'border-uiverse-sky/30' : 'border-uiverse-green/30'
            }`}>
            <p className="text-3xl font-display font-bold text-green-400">
              {collegeType === "inter" ? stats.inter.verified : collegeType === "dept" ? stats.dept.total : stats.outer.verified}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{isDept ? "Confirmed" : "Verified Payments"}</p>
          </div>
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${collegeType === "inter" ? 'border-uiverse-purple/30' :
            collegeType === "dept" ? 'border-uiverse-sky/30' : 'border-uiverse-green/30'
            }`}>
            <p className="text-3xl font-display font-bold text-neon-cyan">
              {collegeType === "inter" ? stats.inter.entered : collegeType === "dept" ? stats.dept.entered : stats.outer.entered}
            </p>
            <p className="text-sm text-muted-foreground mt-1">Entry Confirmed</p>
          </div>
          <div className={`glass-card rounded-xl p-6 text-center border-2 ${collegeType === "inter" ? 'border-uiverse-purple/30' :
            collegeType === "dept" ? 'border-uiverse-sky/30' : 'border-uiverse-green/30'
            }`}>
            <p className={`text-3xl font-display font-bold ${collegeType === "inter" ? 'text-uiverse-purple' :
              collegeType === "dept" ? 'text-uiverse-sky' : 'text-uiverse-green'
              }`}>
              {isDept ? "Free" : `₹${(collegeType === "inter" ? stats.inter.revenue : stats.outer.revenue).toLocaleString("en-IN")}`}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {isDept ? 'No Payment Required' : `Revenue (₹${collegeType === "inter" ? '100' : '300'}/pass)`}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-6">
          {isDept ? (
            <>
              {[
                { id: "pending", label: "Pending Entry" },
                { id: "entered", label: "Entry Confirmed" },
                { id: "all", label: "All" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                    ? "bg-uiverse-sky text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </>
          ) : (
            <>
              {[
                { id: "pending", label: "Pending Verification" },
                { id: "verified", label: "Verified Payments" },
                { id: "entered", label: "Entry Confirmed" },
                { id: "all", label: "All" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as TabType)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${activeTab === tab.id
                    ? collegeType === "inter" ? "bg-uiverse-purple text-white" : "bg-primary text-white"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                >
                  {tab.label}
                </button>
              ))}
            </>
          )}
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <Input
            placeholder={isDept ? "Search by name, email, phone, or register number..." :
              collegeType === "inter" ? "Search by email, phone, name, or register number..." : "Search by email, phone, or name..."}
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
                      {isDept ? "Register No." : collegeType === "inter" ? "Register No." : "College"}
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium">
                      {isDept ? "Year/Section" : "Year/Dept"}
                    </th>
                    {/* Only outer college has payment screenshots */}
                    {collegeType === "outer" && (
                      <th className="px-4 py-3 text-left text-sm font-medium">Screenshot</th>
                    )}
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
                        {isDept || collegeType === "inter" ? reg.register_number : reg.college_name}
                      </td>
                      <td className="px-4 py-3 text-sm">
                        {isDept ? `Year ${reg.year} - ${reg.section}` : `Year ${reg.year} - ${reg.department}`}
                      </td>
                      {/* Only show payment screenshot for outer college */}
                      {collegeType === "outer" && (
                        <td className="px-4 py-3">
                          {reg.payment_screenshot_url ? (
                            <button
                              onClick={() => setSelectedScreenshot(reg.payment_screenshot_url!)}
                              className="hover:underline flex items-center gap-1 text-primary"
                            >
                              <Eye className="w-4 h-4" />
                              View
                            </button>
                          ) : (
                            <span className="text-muted-foreground text-sm">No screenshot</span>
                          )}
                        </td>
                      )}
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          {/* Dept and Inter: Only entry confirmation (no payment verification) */}
                          {(isDept || collegeType === "inter") ? (
                            !reg.entry_confirmed ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleConfirmEntry(reg.id, true, collegeType)}
                                  className="bg-neon-cyan hover:bg-neon-cyan/80 text-background"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Entry
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => setDeleteConfirm({ id: reg.id, type: collegeType })}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            ) : (
                              <>
                                <span className="text-green-400 flex items-center gap-1">
                                  <Check className="w-4 h-4" />
                                  Entered
                                </span>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleConfirmEntry(reg.id, false, collegeType)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => setDeleteConfirm({ id: reg.id, type: collegeType })}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )
                          ) : (
                            // Outer/Inter: Payment verification + entry confirmation
                            !reg.payment_verified ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleVerifyPayment(reg.id, true, collegeType)}
                                  className="bg-green-600 hover:bg-green-700"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Verify
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => setDeleteConfirm({ id: reg.id, type: collegeType })}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            ) : !reg.entry_confirmed ? (
                              <>
                                <Button
                                  size="sm"
                                  onClick={() => handleConfirmEntry(reg.id, true, collegeType)}
                                  className="bg-neon-cyan hover:bg-neon-cyan/80 text-background"
                                >
                                  <Check className="w-4 h-4 mr-1" />
                                  Entry
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleVerifyPayment(reg.id, false, collegeType)}
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="destructive"
                                  onClick={() => setDeleteConfirm({ id: reg.id, type: collegeType })}
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
                                  onClick={() => setDeleteConfirm({ id: reg.id, type: collegeType })}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </>
                            )
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

      {/* Click outside to close export dropdown */}
      {showExportOptions && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowExportOptions(false)}
        />
      )}
    </div>
  );
};

export default Admin;
