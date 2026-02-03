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
import { UiverseButton } from "@/components/ui/UiverseButton";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, GraduationCap } from "lucide-react";
import { Link } from "react-router-dom";

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

  const onSubmit = async (data: DepartmentRegistrationForm) => {
    if (isDeptFull) {
      toast.error("Department registration is full!");
      return;
    }

    try {
      // Check for duplicate register number
      const { data: existing } = await supabase
        .from("department_registrations")
        .select("id")
        .eq("register_number", data.registerNumber)
        .maybeSingle();

      if (existing) {
        toast.error("This register number is already registered!");
        return;
      }

      const { error } = await supabase.from("department_registrations").insert({
        name: data.name,
        email: data.email,
        phone: data.phone,
        year: parseInt(data.year),
        section: data.section.toUpperCase(),
        register_number: data.registerNumber,
      });

      if (error) throw error;

      toast.success("Registration successful!");
      setStep("success");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to register");
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
              AI&DS Department Only
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
              Department Registration
            </h1>
            <p className="text-gray-400">
              Free registration for AI&DS students • {deptCount}/{settings.department_limit} spots filled
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-3xl p-8 border-2 border-uiverse-sky/30"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("name")}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:border-uiverse-sky/50 focus:outline-none transition-colors"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Register Number */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Register Number <span className="text-red-400">*</span>
                </label>
                <input
                  {...register("registerNumber")}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:border-uiverse-sky/50 focus:outline-none transition-colors"
                  placeholder="Enter your register number"
                />
                {errors.registerNumber && (
                  <p className="text-red-400 text-sm mt-1">{errors.registerNumber.message}</p>
                )}
              </div>

              {/* Year & Section */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Year <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register("year")}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-uiverse-sky/50 focus:outline-none transition-colors"
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                  {errors.year && (
                    <p className="text-red-400 text-sm mt-1">{errors.year.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Section <span className="text-red-400">*</span>
                  </label>
                  <select
                    {...register("section")}
                    className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white focus:border-uiverse-sky/50 focus:outline-none transition-colors"
                  >
                    <option value="">Select</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="C">C</option>
                    <option value="D">D</option>
                    <option value="E">E</option>
                  </select>
                  {errors.section && (
                    <p className="text-red-400 text-sm mt-1">{errors.section.message}</p>
                  )}
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  {...register("email")}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:border-uiverse-sky/50 focus:outline-none transition-colors"
                  placeholder="your.email@example.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  {...register("phone")}
                  className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:border-uiverse-sky/50 focus:outline-none transition-colors"
                  placeholder="10-digit phone number"
                />
                {errors.phone && (
                  <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <UiverseButton
                type="submit"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Registering..." : "Complete Registration"}
              </UiverseButton>

              <p className="text-center text-gray-500 text-xs mt-4">
                By registering, you agree to our{" "}
                <Link to="/terms" className="text-uiverse-sky hover:underline">
                  Terms of Service
                </Link>
              </p>
            </form>
          </motion.div>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RegisterDepartment;
