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
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft, Megaphone, AlertTriangle, ArrowRight, CheckCircle2 } from "lucide-react";
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

const interCollegeSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  registerNumber: z.string().min(3, "Register number is required").max(50),
  year: z.string().min(1, "Year is required"),
  department: z.string().min(1, "Department is required"),
});

type InterCollegeForm = z.infer<typeof interCollegeSchema>;

const departments = siteConfig.interCollegeDepartments || ["AGRI", "AIDS", "CIVIL", "CSC", "ECE", "EEE", "MECH", "IT", "AIML"];

const RegisterInterCollege = () => {
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState<InterCollegeForm | null>(null);
  const [interCount, setInterCount] = useState(0);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
  const [eventError, setEventError] = useState("");
  const [showReplaceDialog, setShowReplaceDialog] = useState(false);
  const [existingId, setExistingId] = useState<string | null>(null);
  const { settings, loading: settingsLoading } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InterCollegeForm>({
    resolver: zodResolver(interCollegeSchema),
  });

  // Check registration limit
  useEffect(() => {
    const fetchCount = async () => {
      const { count } = await supabase
        .from("intercollege_registrations")
        .select("*", { count: "exact", head: true });
      setInterCount(count || 0);
    };
    fetchCount();
  }, []);

  const isInterFull = interCount >= settings.inter_college_limit;
  const isRegistrationClosed = !settings.registration_open || new Date() > siteConfig.registrationCloseDateFull;
  const [countdown, setCountdown] = useState(3);

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

  const handleRegistration = async (data: InterCollegeForm) => {
    try {
      if (existingId) {
        // Update existing registration
        const { error: dbError } = await supabase
          .from("intercollege_registrations")
          .update({
            name: data.name,
            email: data.email,
            phone: data.phone,
            register_number: data.registerNumber,
            year: parseInt(data.year),
            department: data.department,
            selected_events: selectedEvents,
          })
          .eq("id", existingId);

        if (dbError) throw dbError;
      } else {
        // Insert new registration
        const { error: dbError } = await supabase.from("intercollege_registrations").insert({
          name: data.name,
          email: data.email,
          phone: data.phone,
          register_number: data.registerNumber,
          year: parseInt(data.year),
          department: data.department,
          selected_events: selectedEvents,
        });

        if (dbError) throw dbError;
      }

      setFormData(data);
      toast.success("Registration successful!");
      setStep("success");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to register");
    }
  };

  const onSubmitForm = async (data: InterCollegeForm) => {
    if (isInterFull) {
      toast.error("Intra college registration is full!");
      return;
    }
    if (isRegistrationClosed) {
      toast.error("Registration is closed!");
      return;
    }

    if (selectedEvents.length === 0) {
      setEventError("Please select at least 1 event");
      toast.error("Please select at least 1 event");
      return;
    }
    setEventError("");

    // Check for duplicates
    try {
      const { data: existing } = await supabase
        .from("intercollege_registrations")
        .select("id")
        .or(`email.eq.${data.email},phone.eq.${data.phone},register_number.eq.${data.registerNumber}`)
        .maybeSingle();

      if (existing) {
        setExistingId(existing.id);
        setFormData(data);
        setShowReplaceDialog(true);
        return;
      }
    } catch (error) {
      console.error("Error checking duplicates:", error);
    }

    handleRegistration(data);
  };

  // Determine why registration is closed
  const getClosedReason = (): "closed" | "full" | "deadline" => {
    if (isInterFull) return "full";
    if (!settings.registration_open) return "closed";
    if (new Date() > siteConfig.registrationCloseDateFull) return "deadline";
    return "closed";
  };

  // Show loading while settings are being fetched
  if (settingsLoading) {
    return (
      <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Show closed screen if registration is closed
  if (isRegistrationClosed || isInterFull) {
    return (
      <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-purple/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
        </div>
        <Navbar />
        <main className="pt-32 pb-20 px-4 relative z-10">
          <RegistrationClosed reason={getClosedReason()} type="inter" />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background Ambience - Purple theme for inter-college */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-purple/30 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Link
            to="/register"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Registration Types
          </Link>

          <div className="flex justify-center mb-6">
            <div className="px-4 py-1.5 rounded-full bg-uiverse-purple/20 border border-uiverse-purple/40 text-uiverse-purple text-sm font-bold tracking-wider flex items-center gap-2">
              <span>OTHER DEPARTMENTS</span>
              <span className="px-2 py-0.5 rounded-full bg-uiverse-green/20 text-uiverse-green text-xs">FREE</span>
            </div>
          </div>

          {/* AI&DS Warning */}
          <div className="flex justify-center mb-6">
            <Link to="/register-department" className="text-center group block w-full max-w-md">
              <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3 hover:bg-red-500/20 transition-all cursor-pointer">
                <p className="text-red-300 text-sm font-semibold flex items-center justify-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500" />
                  AI&DS Students: Register Here As VSB Student
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </p>
                <p className="text-xs text-red-400/70 mt-1">intra college other department form is NOT for AI&DS</p>
              </div>
            </Link>
          </div>

          {/* Pre-Registration Info (Compact) */}
          <div className="mb-6 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
            <p className="text-gray-300 text-sm">
              <span className="text-blue-400 font-bold mb-1 flex items-center justify-center gap-2"><Megaphone className="w-4 h-4" /> Ideathon, Startup & ESPORTS:</span>
              Register here <strong>only if shortlisted</strong>. For other events, you can proceed.
            </p>
          </div>

          {/* Mandatory Requirements Warning */}
          <div className="mb-8 bg-red-900/20 border border-red-500/30 rounded-xl p-5 text-center shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <h3 className="font-display font-bold text-xl mb-3 animate-blink-text flex items-center justify-center gap-2">
              <AlertTriangle className="w-6 h-6" /> MANDATORY REQUIREMENTS <AlertTriangle className="w-6 h-6" />
            </h3>
            <ul className="text-sm md:text-base space-y-2 text-gray-300 font-medium text-left inline-block">
              <li className="flex items-start gap-2">
                <ArrowRight className="w-4 h-4 text-red-400 mt-1" />
                <span>Bring your <strong>College ID Card</strong> (Compulsory for entry).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">➜</span>
                <span>Bring <strong>Laptop</strong> for Codathon / PPT submission events.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">➜</span>
                <span>Carry <strong>Pendrives</strong> if required for your event.</span>
              </li>
            </ul>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-8">
            {["Details", "Done"].map((label, index) => {
              const stepIndex = step === "form" ? 0 : 1;
              return (
                <div key={label} className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      backgroundColor: index <= stepIndex ? "#DF19FB" : "rgba(255, 255, 255, 0.1)",
                      color: index <= stepIndex ? "#fff" : "#888",
                      boxShadow: index <= stepIndex ? "0 0 15px rgba(223, 25, 251, 0.5)" : "none"
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300"
                  >
                    {index + 1}
                  </motion.div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${index <= stepIndex ? "text-white" : "text-white/40"}`}
                  >
                    {label}
                  </span>
                  {index < 1 && (
                    <div className="w-8 h-0.5 bg-white/10 mx-2" />
                  )}
                </div>
              );
            })}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Form */}
            {step === "form" && (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.05 }}
              >
                <div className="registration-container inter-college-theme">
                  <form onSubmit={handleSubmit(onSubmitForm)} className="space-y-4">
                    <div className="form-title"><span>Register for</span></div>
                    <div className="title-2 font-display"><span>{siteConfig.eventName}</span></div>

                    <section className="bg-stars">
                      <span className="star" />
                      <span className="star" />
                      <span className="star" />
                      <span className="star" />
                    </section>

                    <div className="input-container">
                      <input
                        placeholder="Full Name (Initial at back)"
                        {...register("name")}
                        className={errors.name ? "border-red-500" : ""}
                        aria-label="Full Name"
                      />
                      {errors.name && <span className="text-red-400 text-xs block mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="input-container">
                      <input
                        placeholder="Register Number"
                        {...register("registerNumber")}
                        className={errors.registerNumber ? "border-red-500" : ""}
                        aria-label="Register Number"
                      />
                      {errors.registerNumber && <span className="text-red-400 text-xs block mt-1">{errors.registerNumber.message}</span>}
                    </div>

                    <div className="input-container">
                      <input
                        placeholder="Email Address"
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                        aria-label="Email Address"
                      />
                      {errors.email && <span className="text-red-400 text-xs block mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="input-container">
                      <input
                        placeholder="Phone Number"
                        type="tel"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                        aria-label="Phone Number"
                      />
                      {errors.phone && <span className="text-red-400 text-xs block mt-1">{errors.phone.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="input-container">
                        <select
                          {...register("year")}
                          className={errors.year ? "border-red-500" : ""}
                          defaultValue=""
                          aria-label="Select Year"
                        >
                          <option value="" disabled className="bg-black text-white">Select Year</option>
                          <option value="1" className="bg-black text-white">1st Year</option>
                          <option value="2" className="bg-black text-white">2nd Year</option>
                          <option value="3" className="bg-black text-white">3rd Year</option>
                          <option value="4" className="bg-black text-white">4th Year</option>
                        </select>
                        {errors.year && <span className="text-red-400 text-xs block mt-1">{errors.year.message}</span>}
                      </div>

                      <div className="input-container">
                        <select
                          {...register("department")}
                          className={errors.department ? "border-red-500" : ""}
                          defaultValue=""
                          aria-label="Select Department"
                        >
                          <option value="" disabled className="bg-black text-white">Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept} className="bg-black text-white">{dept}</option>
                          ))}
                        </select>
                        {errors.department && <span className="text-red-400 text-xs block mt-1">{errors.department.message}</span>}
                      </div>
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

                    <button className="submit-btn mt-6 inter-college-btn" type="submit" disabled={isSubmitting}>
                      <span className="sign-text">{isSubmitting ? "Registering..." : "Complete Registration"}</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/40 backdrop-blur-xl border border-uiverse-purple/30 rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(223,25,251,0.2)]"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-uiverse-purple/20 flex items-center justify-center mb-6 border border-uiverse-purple/50 shadow-[0_0_20px_rgba(223,25,251,0.4)]">
                  <CheckCircle2 className="w-16 h-16 text-uiverse-purple" />
                </div>
                <h2 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple to-primary mb-4">
                  Registration Successful!
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Thank you for registering for {siteConfig.eventName}. See you at the event!
                </p>
                <div className="bg-white/5 rounded-xl p-4 mb-8 text-left border border-uiverse-purple/20 inline-block min-w-[300px]">
                  <p className="text-sm text-gray-500 mb-1">Registered as:</p>
                  <p className="text-white font-medium text-lg mb-4">{formData?.name}</p>
                  <p className="text-sm text-gray-500 mb-1">Register Number:</p>
                  <p className="text-white mb-4">{formData?.registerNumber}</p>
                  <p className="text-sm text-gray-500 mb-1">Email:</p>
                  <p className="text-white">{formData?.email}</p>
                </div>

                <div className="mb-8 p-4 bg-uiverse-purple/10 border border-uiverse-purple/20 rounded-xl text-uiverse-purple">
                  <p className="font-semibold flex items-center justify-center gap-2">
                    <span className="w-5 h-5 rounded-full border-2 border-current border-t-transparent animate-spin" />
                    Redirecting to WhatsApp Group in {countdown}s...
                  </p>
                </div>

                <div className="flex flex-col gap-4">
                  <UiverseButton
                    variant="primary"
                    onClick={() => window.location.href = siteConfig.whatsappGroupLink}
                  >
                    Join Group Now
                  </UiverseButton>
                  <UiverseButton
                    variant="secondary"
                    onClick={() => window.location.href = "/"}
                  >
                    Back to Home
                  </UiverseButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
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
              You are already registered with this email, phone, or register number.
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
    </div >
  );
};

export default RegisterInterCollege;
