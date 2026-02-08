import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/config/config";
import { useSettings } from "@/hooks/useSettings";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import RegistrationClosed from "@/components/RegistrationClosed";
import EventSelector from "@/components/EventSelector";
import { UiverseButton } from "@/components/ui/UiverseButton";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, GraduationCap, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import "@/components/RegistrationForm.css";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const departmentRegistrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  year: z.string().min(1, "Year is required"),
  section: z.string().min(1, "Section is required"),
  registerNumber: z.string().min(2, "Register number is required").max(50),
});

type DepartmentRegistrationForm = z.infer<typeof departmentRegistrationSchema>;

const RegisterDepartment = () => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [deptCount, setDeptCount] = useState(0);
  const [countdown, setCountdown] = useState(3);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [eventError, setEventError] = useState("");
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<DepartmentRegistrationForm | null>(null);
  const { settings, loading: settingsLoading } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<DepartmentRegistrationForm>({
    resolver: zodResolver(departmentRegistrationSchema),
  });

  // Check registration count
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("department_registrations")
        .select("*", { count: "exact", head: true });
      setDeptCount(count || 0);
    };
    fetchCount();
  }, []);

  const isDeptFull = deptCount >= settings.department_limit;
  const isRegistrationClosed = !settings.registration_open || new Date() > siteConfig.registrationCloseDateFull;

  useEffect(() => {
    if (step === "success") {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            window.location.href = siteConfig.whatsappGroupLink;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [step]);

  const handleRegistration = async (data: DepartmentRegistrationForm) => {
    try {
      if (existingId) {
        // Update
        const { error } = await supabase.from("department_registrations").update({
          name: data.name,
          email: data.email,
          phone: data.phone,
          year: parseInt(data.year),
          section: data.section.toUpperCase(),
          register_number: data.registerNumber,
          selected_events: selectedEvents,
        }).eq("id", existingId);

        if (error) throw error;
      } else {
        // Insert
        const { error } = await supabase.from("department_registrations").insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          year: parseInt(data.year),
          section: data.section.toUpperCase(),
          register_number: data.registerNumber,
          selected_events: selectedEvents,
        });

        if (error) throw error;
      }

      toast.success("Registration successful!");
      setStep("success");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to register");
    }
  };

  const onSubmit = async (data: DepartmentRegistrationForm) => {
    if (isDeptFull) {
      toast.error("Department registration is full!");
      return;
    }

    if (selectedEvents.length === 0) {
      setEventError("Please select at least 1 event");
      toast.error("Please select at least 1 event");
      return;
    }
    setEventError("");

    try {
      // Check for duplicate register number
      const { data: existing } = await supabase
        .from("department_registrations")
        .select("id")
        .or(`register_number.eq.${data.registerNumber},email.eq.${data.email},phone.eq.${data.phone}`)
        .maybeSingle();

      if (existing) {
        setExistingId(existing.id);
        setFormData(data);
        setShowReplaceDialog(true);
        return;
      }

      await handleRegistration(data);
    } catch (error: any) {
      console.error("Error checking duplicates:", error);
      toast.error(error.message || "Failed to check duplicates");
    }
  };

  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show closed screen
  if (isRegistrationClosed || isDeptFull) {
    return (
      <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
        </div>
        <Navbar />
        <main className="pt-32 pb-20 px-4 relative z-10">
          <RegistrationClosed reason={isDeptFull ? "full" : "closed"} />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Success Screen
  if (step === "success") {
    return (
      <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
        </div>

        <Navbar />

        <main className="pt-32 pb-20 px-4 relative z-10 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg w-full text-center"
          >
            <div className="glass-card rounded-3xl p-8 border-2 border-uiverse-sky/30">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-uiverse-sky/20 flex items-center justify-center">
                <Sparkles className="w-10 h-10 text-uiverse-sky" />
              </div>

              <h2 className="font-display text-3xl font-bold text-white mb-4">
                Registration Successful!
              </h2>

              <p className="text-gray-400 mb-6">
                Welcome to {siteConfig.eventName}! Your registration is confirmed.
              </p>

              <div className="bg-uiverse-sky/10 rounded-xl p-4 mb-6 border border-uiverse-sky/30">
                <p className="text-uiverse-sky font-medium">
                  No payment required for AI&DS students
                </p>
              </div>

              <p className="text-gray-400 text-sm mb-4">
                Redirecting to WhatsApp group in{" "}
                <span className="text-uiverse-sky font-bold">{countdown}</span>s...
              </p>

              <a
                href={siteConfig.whatsappGroupLink}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-uiverse-sky/20 border border-uiverse-sky/50 text-uiverse-sky hover:bg-uiverse-sky/30 transition-colors"
              >
                Join WhatsApp Group Now →
              </a>
            </div>
          </motion.div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Registration Form
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-xl mx-auto">
          {/* Back Button */}
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Registration Types
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-uiverse-sky/20 border border-uiverse-sky/40 text-uiverse-sky text-sm font-bold mb-4">
              <GraduationCap className="w-4 h-4" />
              Intra College / AI&DS Dept Only
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Department Registration
            </h1>
            <p className="text-gray-400">
              Free registration for AI&DS students
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="registration-container">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="form-title"><span>Register for</span></div>
                <div className="title-2 font-display"><span>Department</span></div>

                <section className="bg-stars">
                  <span className="star" />
                  <span className="star" />
                  <span className="star" />
                  <span className="star" />
                </section>

                {/* Name */}
                <div className="input-container">
                  <input
                    {...register("name")}
                    placeholder="Full Name (Initial at back)"
                    aria-label="Full Name"
                    className={errors.name ? "border-red-500" : ""}
                  />
                  {errors.name && (
                    <span className="text-red-400 text-xs block mt-1">{errors.name.message}</span>
                  )}
                </div>

                {/* Register Number */}
                <div className="input-container">
                  <input
                    {...register("registerNumber")}
                    placeholder="Register Number"
                    aria-label="Register Number"
                    className={errors.registerNumber ? "border-red-500" : ""}
                  />
                  {errors.registerNumber && (
                    <span className="text-red-400 text-xs block mt-1">{errors.registerNumber.message}</span>
                  )}
                </div>

                {/* Year & Section */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="input-container">
                    <select
                      {...register("year")}
                      defaultValue=""
                      aria-label="Select Year"
                      className={errors.year ? "border-red-500" : ""}
                    >
                      <option value="" disabled className="bg-black text-white">Select Year</option>
                      <option value="1" className="bg-black text-white">1st Year</option>
                      <option value="2" className="bg-black text-white">2nd Year</option>
                      <option value="3" className="bg-black text-white">3rd Year</option>
                      <option value="4" className="bg-black text-white">4th Year</option>
                    </select>
                    {errors.year && (
                      <span className="text-red-400 text-xs block mt-1">{errors.year.message}</span>
                    )}
                  </div>

                  <div className="input-container">
                    <select
                      {...register("section")}
                      defaultValue=""
                      aria-label="Select Section"
                      className={errors.section ? "border-red-500" : ""}
                    >
                      <option value="" disabled className="bg-black text-white">Section</option>
                      <option value="A" className="bg-black text-white">A</option>
                      <option value="B" className="bg-black text-white">B</option>
                      <option value="C" className="bg-black text-white">C</option>
                      <option value="D" className="bg-black text-white">D</option>
                      <option value="E" className="bg-black text-white">E</option>
                    </select>
                    {errors.section && (
                      <span className="text-red-400 text-xs block mt-1">{errors.section.message}</span>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div className="input-container">
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email Address"
                    aria-label="Email Address"
                    className={errors.email ? "border-red-500" : ""}
                  />
                  {errors.email && (
                    <span className="text-red-400 text-xs block mt-1">{errors.email.message}</span>
                  )}
                </div>

                {/* Phone */}
                <div className="input-container">
                  <input
                    type="tel"
                    {...register("phone")}
                    placeholder="Phone Number"
                    aria-label="Phone Number"
                    className={errors.phone ? "border-red-500" : ""}
                  />
                  {errors.phone && (
                    <span className="text-red-400 text-xs block mt-1">{errors.phone.message}</span>
                  )}
                </div>

                {/* Event Selection */}
                <div className="mt-4 p-4 bg-black/30 rounded-xl border border-white/10">
                  <EventSelector
                    selectedEvents={selectedEvents}
                    onChange={setSelectedEvents}
                    maxEvents={4}
                    error={eventError}
                  />
                </div>

                {/* Submit Button */}
                <button
                  className="submit-btn mt-6"
                  type="submit"
                  disabled={isSubmitting}
                >
                  <span className="sign-text">{isSubmitting ? "Registering..." : "Complete Registration"}</span>
                </button>

                <p className="text-center text-gray-400 text-xs mt-4">
                  By registering, you agree to our{" "}
                  <Link to="/terms" className="text-uiverse-sky hover:underline">
                    Terms of Service
                  </Link>
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />

      <AlertDialog open={showReplaceDialog} onOpenChange={setShowReplaceDialog}>
        <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-xl font-bold text-red-500 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              Already Registered
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-400 text-base mt-2">
              You are already registered with this register number, email or phone.
              <br /><br />
              Proceeding will <strong className="text-white">REPLACE</strong> your existing registration details with these new ones.
              <br /><br />
              Do you want to continue?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="mt-4">
            <AlertDialogCancel
              onClick={() => setShowReplaceDialog(false)}
              className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowReplaceDialog(false);
                if (formData) {
                  handleRegistration(formData);
                }
              }}
              className="bg-red-600 text-white hover:bg-red-700 border-none"
            >
              Replace & Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default RegisterDepartment;
