import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/config/config";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { UserPlus, Upload, CheckCircle2 } from "lucide-react";
import UpdateEventSelector from "@/components/UpdateEventSelector";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EntryType = "outer" | "inter" | "dept";

interface ManualEntryDialogProps {
  onSuccess: () => void;
}

const departments = siteConfig.interCollegeDepartments || ["AGRI", "AIDS", "CIVIL", "CSE", "ECE", "EEE", "MECH", "IT", "AIML"];

const ManualEntryDialog = ({ onSuccess }: ManualEntryDialogProps) => {
  const [open, setOpen] = useState(false);
  const [entryType, setEntryType] = useState<EntryType>("outer");
  const [step, setStep] = useState<"form" | "payment" | "done">("form");
  const [uploading, setUploading] = useState(false);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

  // Form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [collegeName, setCollegeName] = useState("");
  const [registerNumber, setRegisterNumber] = useState("");
  const [year, setYear] = useState("");
  const [department, setDepartment] = useState("");
  const [section, setSection] = useState("");

  const resetForm = () => {
    setName("");
    setEmail("");
    setPhone("");
    setCollegeName("");
    setRegisterNumber("");
    setYear("");
    setDepartment("");
    setSection("");
    setSelectedEvents([]);
    setStep("form");
    setEntryType("outer");
  };

  const handleClose = (isOpen: boolean) => {
    setOpen(isOpen);
    if (!isOpen) resetForm();
  };

  const validateForm = () => {
    if (!name.trim() || name.length < 2) { toast.error("Name is required (min 2 chars)"); return false; }
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) { toast.error("Valid email is required"); return false; }
    if (!phone.trim() || !/^[0-9]{10}$/.test(phone)) { toast.error("Valid 10-digit phone required"); return false; }
    if (!year) { toast.error("Year is required"); return false; }
    if (selectedEvents.length === 0) { toast.error("Select at least 1 event"); return false; }

    if (entryType === "outer") {
      if (!collegeName.trim()) { toast.error("College name is required"); return false; }
      if (!department.trim()) { toast.error("Department is required"); return false; }
    }
    if (entryType === "inter") {
      if (!registerNumber.trim()) { toast.error("Register number is required"); return false; }
      if (!department) { toast.error("Department is required"); return false; }
    }
    if (entryType === "dept") {
      if (!registerNumber.trim()) { toast.error("Register number is required"); return false; }
      if (!section) { toast.error("Section is required"); return false; }
    }
    return true;
  };

  const handleFormSubmit = () => {
    if (!validateForm()) return;

    if (entryType === "dept") {
      // Dept is free, insert directly
      handleDeptInsert();
    } else {
      // Go to payment step
      setStep("payment");
    }
  };

  const handleDeptInsert = async () => {
    try {
      const { error } = await supabase.from("department_registrations").insert({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        register_number: registerNumber.trim(),
        year: parseInt(year),
        section: section.toUpperCase(),
        selected_events: selectedEvents,
      });
      if (error) throw error;
      toast.success("Department registration added!");
      setStep("done");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to add registration");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please upload an image file");
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploading(true);
    try {
      const fileExt = file.name.split(".").pop();
      const fileName = `manual-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(fileName, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("payment-screenshots")
        .getPublicUrl(fileName);

      // Insert into appropriate table
      if (entryType === "outer") {
        const { error } = await supabase.from("registrations").insert({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          college_name: collegeName.trim(),
          year: parseInt(year),
          department: department.trim(),
          payment_screenshot_url: urlData.publicUrl,
          selected_events: selectedEvents,
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.from("intercollege_registrations").insert({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          register_number: registerNumber.trim(),
          year: parseInt(year),
          department: department,
          payment_screenshot_url: urlData.publicUrl,
          selected_events: selectedEvents,
        });
        if (error) throw error;
      }

      toast.success("Registration added successfully!");
      setStep("done");
      onSuccess();
    } catch (error: any) {
      toast.error(error.message || "Failed to upload/register");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-green-500/30 hover:bg-green-500/20 text-white hover:text-white">
          <UserPlus className="w-4 h-4" />
          Manual Entry
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl bg-black/95 border border-white/10 backdrop-blur-xl text-white shadow-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-green-400 to-emerald-400">
            Manual Registration Entry
          </DialogTitle>
          <DialogDescription className="text-gray-400">
            Add a new participant manually. No date/limit restrictions apply.
          </DialogDescription>
        </DialogHeader>

        {step === "done" ? (
          <div className="text-center py-10">
            <CheckCircle2 className="w-16 h-16 text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">Registration Added!</h3>
            <p className="text-gray-400 mb-6">The participant has been successfully registered.</p>
            <div className="flex gap-3 justify-center">
              <Button onClick={() => resetForm()} variant="outline" className="border-white/20 text-white hover:text-white">
                Add Another
              </Button>
              <Button onClick={() => handleClose(false)} className="bg-green-500 hover:bg-green-600 text-white">
                Close
              </Button>
            </div>
          </div>
        ) : step === "payment" ? (
          <div className="space-y-6 py-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-white mb-2">Payment Screenshot</h3>
              <p className="text-gray-400 text-sm">Upload the payment screenshot for ₹{siteConfig.passPrice}</p>
            </div>

            {/* QR Code */}
            <div className="flex justify-center">
              <div className="bg-white rounded-2xl p-4 w-fit">
                <img
                  src={entryType === "inter" ? siteConfig.interCollegePaymentQR : siteConfig.paymentQR}
                  alt="Payment QR Code"
                  className="w-48 h-48 object-contain"
                />
              </div>
            </div>

            <div className="text-center space-y-1 text-sm text-gray-400">
              <p>UPI: <span className="text-white font-medium">{entryType === "inter" ? siteConfig.interCollegePaymentUPI : siteConfig.paymentUPI}</span></p>
              <p>Amount: <span className="text-green-400 font-bold text-lg">₹{siteConfig.passPrice}</span></p>
            </div>

            {/* Upload */}
            <div className="space-y-3">
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-green-500/50 transition-colors bg-white/5">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-400">
                  {uploading ? "Uploading..." : "Click to upload screenshot"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleFileUpload}
                  disabled={uploading}
                />
              </label>
            </div>

            <Button variant="outline" onClick={() => setStep("form")} className="w-full border-white/20 text-white hover:text-white">
              ← Back to Form
            </Button>
          </div>
        ) : (
          <div className="space-y-5 py-4">
            {/* Type Selector */}
            <div className="flex gap-2">
              {[
                { id: "outer" as EntryType, label: "Outer College", color: "green" },
                { id: "inter" as EntryType, label: "Intra College", color: "purple" },
                { id: "dept" as EntryType, label: "AI&DS Dept", color: "sky" },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => { setEntryType(t.id); setSelectedEvents([]); }}
                  className={`flex-1 px-3 py-2.5 rounded-xl text-sm font-medium transition-all border-2 ${
                    entryType === t.id
                      ? t.id === "outer" ? "bg-green-500/20 text-green-400 border-green-500/50"
                        : t.id === "inter" ? "bg-purple-500/20 text-purple-400 border-purple-500/50"
                        : "bg-sky-500/20 text-sky-400 border-sky-500/50"
                      : "bg-white/5 text-gray-400 border-transparent hover:border-white/10"
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Common Fields */}
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-gray-300 text-xs mb-1.5 block">Full Name *</Label>
                <Input value={name} onChange={e => setName(e.target.value)} placeholder="Full Name (Initial at back)" className="bg-white/5 border-white/10 text-white" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-300 text-xs mb-1.5 block">Email *</Label>
                  <Input value={email} onChange={e => setEmail(e.target.value)} type="email" placeholder="Email" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div>
                  <Label className="text-gray-300 text-xs mb-1.5 block">Phone *</Label>
                  <Input value={phone} onChange={e => setPhone(e.target.value)} type="tel" placeholder="10-digit phone" className="bg-white/5 border-white/10 text-white" />
                </div>
              </div>
            </div>

            {/* Outer College Fields */}
            {entryType === "outer" && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-gray-300 text-xs mb-1.5 block">College Name *</Label>
                  <Input value={collegeName} onChange={e => setCollegeName(e.target.value)} placeholder="College Name" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 text-xs mb-1.5 block">Year *</Label>
                    <select value={year} onChange={e => setYear(e.target.value)} className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm">
                      <option value="" className="bg-black">Select Year</option>
                      <option value="1" className="bg-black">1st Year</option>
                      <option value="2" className="bg-black">2nd Year</option>
                      <option value="3" className="bg-black">3rd Year</option>
                      <option value="4" className="bg-black">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs mb-1.5 block">Department *</Label>
                    <Input value={department} onChange={e => setDepartment(e.target.value)} placeholder="e.g. CSE, ECE" className="bg-white/5 border-white/10 text-white" />
                  </div>
                </div>
              </div>
            )}

            {/* Inter College Fields */}
            {entryType === "inter" && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-gray-300 text-xs mb-1.5 block">Register Number *</Label>
                  <Input value={registerNumber} onChange={e => setRegisterNumber(e.target.value)} placeholder="Register Number" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 text-xs mb-1.5 block">Year *</Label>
                    <select value={year} onChange={e => setYear(e.target.value)} className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm">
                      <option value="" className="bg-black">Select Year</option>
                      <option value="1" className="bg-black">1st Year</option>
                      <option value="2" className="bg-black">2nd Year</option>
                      <option value="3" className="bg-black">3rd Year</option>
                      <option value="4" className="bg-black">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs mb-1.5 block">Department *</Label>
                    <select value={department} onChange={e => setDepartment(e.target.value)} className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm">
                      <option value="" className="bg-black">Select Dept</option>
                      {departments.map(d => <option key={d} value={d} className="bg-black">{d}</option>)}
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Dept Fields */}
            {entryType === "dept" && (
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <Label className="text-gray-300 text-xs mb-1.5 block">Register Number *</Label>
                  <Input value={registerNumber} onChange={e => setRegisterNumber(e.target.value)} placeholder="Register Number" className="bg-white/5 border-white/10 text-white" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-300 text-xs mb-1.5 block">Year *</Label>
                    <select value={year} onChange={e => setYear(e.target.value)} className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm">
                      <option value="" className="bg-black">Select Year</option>
                      <option value="1" className="bg-black">1st Year</option>
                      <option value="2" className="bg-black">2nd Year</option>
                      <option value="3" className="bg-black">3rd Year</option>
                      <option value="4" className="bg-black">4th Year</option>
                    </select>
                  </div>
                  <div>
                    <Label className="text-gray-300 text-xs mb-1.5 block">Section *</Label>
                    <select value={section} onChange={e => setSection(e.target.value)} className="w-full h-10 px-3 rounded-md bg-white/5 border border-white/10 text-white text-sm">
                      <option value="" className="bg-black">Section</option>
                      <option value="A" className="bg-black">A</option>
                      <option value="B" className="bg-black">B</option>
                      <option value="C" className="bg-black">C</option>
                      <option value="D" className="bg-black">D</option>
                      <option value="E" className="bg-black">E</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Event Selection */}
            <div className="p-4 bg-white/5 rounded-xl border border-white/10">
              <UpdateEventSelector
                selectedEvents={selectedEvents}
                onChange={setSelectedEvents}
              />
            </div>

            {/* Submit */}
            <Button
              onClick={handleFormSubmit}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-bold py-3 hover:opacity-90"
            >
              {entryType === "dept" ? "Complete Registration (Free)" : `Proceed to Payment (₹${siteConfig.passPrice})`}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default ManualEntryDialog;
