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
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import "@/components/RegistrationForm.css";

const registrationSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^[0-9]{10}$/, "Phone number must be 10 digits"),
  collegeName: z.string().min(2, "College name is required").max(200),
  year: z.string().min(1, "Year is required"),
  department: z.string().min(2, "Department is required").max(100),
});

type RegistrationForm = z.infer<typeof registrationSchema>;

const Register = () => {
  const [selectedType, setSelectedType] = useState<"select" | "outer" | "inter">("select");
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<RegistrationForm | null>(null);
  const [outerCount, setOuterCount] = useState(0);
  const [interCount, setInterCount] = useState(0);
  const { settings, loading: settingsLoading } = useSettings();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationForm>({
    resolver: zodResolver(registrationSchema),
  });

  // Check registration limits
  useEffect(() => {
    const fetchCounts = async () => {
      const { count: outer } = await supabase
        .from("registrations")
        .select("*", { count: "exact", head: true });
      const { count: inter } = await supabase
        .from("intercollege_registrations")
        .select("*", { count: "exact", head: true });
      setOuterCount(outer || 0);
      setInterCount(inter || 0);
    };
    fetchCounts();
  }, []);

  const isOuterFull = outerCount >= settings.outer_college_limit;
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

  const onSubmitForm = async (data: RegistrationForm) => {
    if (isOuterFull) {
      toast.error("Outer college registration is full!");
      return;
    }
    setFormData(data);
    setStep("payment");
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !formData) return;

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
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("payment-screenshots")
        .getPublicUrl(fileName);

      const { error: dbError } = await supabase.from("registrations").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        college_name: formData.collegeName,
        year: parseInt(formData.year),
        department: formData.department,
        payment_screenshot_url: urlData.publicUrl,
      });

      if (dbError) throw dbError;

      toast.success("Registration successful!");
      setStep("success");
    } catch (error: any) {
      console.error("Error:", error);
      toast.error(error.message || "Failed to upload screenshot");
    } finally {
      setUploading(false);
    }
  };

  // Determine why registration is closed
  const getClosedReason = () => {
    if (!settings.registration_open) return "closed";
    if (new Date() > siteConfig.registrationCloseDateFull) return "deadline";
    return "closed";
  };

  // Type Selection Screen
  if (selectedType === "select") {
    // Show loading while settings are being fetched
    if (settingsLoading) {
      return (
        <div className="min-h-screen bg-transparent text-white flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      );
    }

    // Show closed screen if registration is fully closed
    if (isRegistrationClosed && isOuterFull && isInterFull) {
      return (
        <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
          </div>
          <Navbar />
          <main className="pt-32 pb-20 px-4 relative z-10">
            <RegistrationClosed reason={getClosedReason()} />
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
        </div>

        <Navbar />

        <main className="pt-32 pb-20 px-4 relative z-10">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h1 className="font-display text-3xl md:text-5xl font-bold text-white mb-4">
                Register for {siteConfig.eventName}
              </h1>
              <p className="text-gray-400 text-lg">
                Choose your registration type to continue
              </p>
              {/* Registration Info Banner */}
              {!isRegistrationClosed && (
                <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-sm">
                  <span>⏰</span>
                  Registration closes on <strong className="ml-1">{siteConfig.registrationCloseDate}</strong>
                </div>
              )}

              {/* Pre-Registration Info Section - High Visibility */}
              {!isRegistrationClosed && (
                <div className="mt-10 mb-8 relative group overflow-hidden rounded-xl border-2 border-uiverse-sky/50 bg-black/60 shadow-[0_0_30px_rgba(18,184,255,0.2)] animate-in fade-in slide-in-from-bottom-4">
                  {/* Pulsing Background Glow */}
                  <div className="absolute inset-0 bg-uiverse-sky/10 animate-pulse" />

                  <div className="relative p-6 text-left z-10">
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 flex items-center gap-3">
                      <span className="text-3xl animate-bounce">💡</span>
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-uiverse-sky to-white">
                        Ideathon & Startup Arena
                      </span>
                    </h3>

                    <div className="space-y-4">
                      <div className="flex flex-col gap-2 text-gray-200 text-lg font-medium">
                        <p>1. <strong>Submit PPT first</strong> (Free).</p>
                        <p>2. <strong>Wait</strong> for our selection message.</p>
                      </div>

                      <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-4 flex gap-3 items-center">
                        <span className="text-3xl">🛑</span>
                        <div>
                          <p className="text-red-200 font-bold text-xl leading-tight mb-1">
                            Do NOT Pay Now!
                          </p>
                          <p className="text-red-100/90 text-base">
                            Pay <strong>ONLY IF</strong> you get a <span className="underline font-bold text-white">"Selected"</span> message from us.
                          </p>
                        </div>
                      </div>

                      <p className="text-gray-400 text-sm border-t border-white/10 pt-3 mt-2">
                        For other events, you can register and pay now.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {isRegistrationClosed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center mb-8 p-6 bg-red-500/10 border border-red-500/30 rounded-2xl"
              >
                <p className="text-red-400 text-lg font-bold">Registration is now closed</p>
                <p className="text-gray-400 text-sm mt-2">Thank you for your interest in {siteConfig.eventName}</p>
              </motion.div>
            )}

            <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
              {/* Outer College Card */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                onClick={() => !isOuterFull && !isRegistrationClosed && setSelectedType("outer")}
                className={`group ${isOuterFull || isRegistrationClosed ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <div className={`relative bg-black/40 backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-300 ${isOuterFull || isRegistrationClosed
                  ? 'border-gray-600/30'
                  : 'border-uiverse-green/30 hover:border-uiverse-green/60 hover:shadow-[0_0_40px_rgba(1,220,3,0.2)]'
                  }`}>
                  <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-uiverse-green/20 border border-uiverse-green/40 text-uiverse-green text-xs font-bold">
                    ₹{siteConfig.passPrice}
                  </div>

                  {isOuterFull && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold">
                      FULL
                    </div>
                  )}

                  <div className="mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-uiverse-green/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">🏛️</span>
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">
                      Outer College
                    </h3>
                    <p className="text-gray-400 text-sm">
                      For students from other colleges and institutions
                    </p>
                    <p className="text-uiverse-green text-xs mt-2 font-medium">
                      {outerCount}/{settings.outer_college_limit} spots filled
                    </p>
                  </div>

                  <ul className="space-y-2 text-sm text-gray-300 mb-6">
                    <li className="flex items-center gap-2">
                      <span className="text-uiverse-green">✓</span> Full event access
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-uiverse-green">✓</span> Food & refreshments
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-uiverse-green">✓</span> Participation certificate
                    </li>
                  </ul>

                  <div className={`flex items-center justify-between font-medium transition-transform duration-300 ${isOuterFull || isRegistrationClosed ? 'text-gray-500' : 'text-uiverse-green group-hover:translate-x-2'
                    }`}>
                    <span>{isOuterFull ? 'Registration Full' : 'Continue Registration'}</span>
                    <span>→</span>
                  </div>
                </div>
              </motion.div>

              {/* Inter College Card */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className={`group ${isInterFull || isRegistrationClosed ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
              >
                <Link to={isInterFull || isRegistrationClosed ? "#" : "/register-intercollege"} onClick={(e) => (isInterFull || isRegistrationClosed) && e.preventDefault()}>
                  <div className={`relative bg-black/40 backdrop-blur-xl border-2 rounded-3xl p-8 transition-all duration-300 ${isInterFull || isRegistrationClosed
                    ? 'border-gray-600/30'
                    : 'border-uiverse-purple/30 hover:border-uiverse-purple/60 hover:shadow-[0_0_40px_rgba(223,25,251,0.2)]'
                    }`}>
                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-uiverse-purple/20 border border-uiverse-purple/40 text-uiverse-purple text-xs font-bold">
                      ₹{siteConfig.interCollegePassPrice}
                    </div>

                    {isInterFull && (
                      <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-bold">
                        FULL
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-uiverse-purple/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">🎓</span>
                      </div>
                      <h3 className="font-display text-2xl font-bold text-white mb-2">
                        Inter College
                      </h3>
                      <p className="text-gray-400 text-sm">
                        For students of VSB College of Engineering
                      </p>
                      <p className="text-uiverse-purple text-xs mt-2 font-medium">
                        {interCount}/{settings.inter_college_limit} spots filled
                      </p>
                    </div>

                    <ul className="space-y-2 text-sm text-gray-300 mb-6">
                      <li className="flex items-center gap-2">
                        <span className="text-uiverse-purple">✓</span> Full event access
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-uiverse-purple">✓</span> Food & refreshments
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-uiverse-purple">✓</span> Participation certificate
                      </li>
                    </ul>

                    <div className={`flex items-center justify-between font-medium transition-transform duration-300 ${isInterFull || isRegistrationClosed ? 'text-gray-500' : 'text-uiverse-purple group-hover:translate-x-2'
                      }`}>
                      <span>{isInterFull ? 'Registration Full' : 'Continue Registration'}</span>
                      <span>→</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            </div>
          </div>
        </main>

        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  // Show closed screen if outer college registration is closed or full
  if (isRegistrationClosed || isOuterFull) {
    return (
      <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
        </div>
        <Navbar />
        <main className="pt-32 pb-20 px-4 relative z-10">
          <RegistrationClosed reason={isOuterFull ? "full" : getClosedReason()} type="outer" />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
      </div>

      <Navbar />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Back Button & Badge */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setSelectedType("select")}
              className="text-gray-400 hover:text-white transition-colors flex items-center gap-2"
            >
              ← Back to selection
            </button>
            <div className="px-4 py-1.5 rounded-full bg-uiverse-green/20 border border-uiverse-green/40 text-uiverse-green text-sm font-bold tracking-wider">
              OUTER COLLEGE
            </div>
          </div>

          {/* Pre-Registration Info (Compact) */}
          <div className="mb-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4">
            <p className="text-gray-300 text-sm">
              <span className="text-blue-400 font-bold block mb-1">📢 Ideathon & Startup Arena:</span>
              Register here <strong>only if shortlisted</strong>. For other events, you can proceed.
            </p>
          </div>

          {/* Mandatory Requirements Warning */}
          <div className="mb-8 bg-red-900/20 border border-red-500/30 rounded-xl p-5 text-center shadow-[0_0_20px_rgba(239,68,68,0.1)]">
            <h3 className="font-display font-bold text-xl mb-3 animate-blink-text flex items-center justify-center gap-2">
              ⚠️ MANDATORY REQUIREMENTS ⚠️
            </h3>
            <ul className="text-sm md:text-base space-y-2 text-gray-300 font-medium text-left inline-block">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">➜</span>
                <span>Bring your <strong>College ID Card</strong> (Compulsory for entry).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">➜</span>
                <span>Keep a <strong>Payment Screenshot</strong> safe for verification.</span>
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
            {["Details", "Payment", "Done"].map((label, index) => {
              const stepIndex = step === "form" ? 0 : step === "payment" ? 1 : 2;
              return (
                <div key={label} className="flex items-center gap-2">
                  <motion.div
                    animate={{
                      backgroundColor: index <= stepIndex ? "#01DC03" : "rgba(255, 255, 255, 0.1)",
                      color: index <= stepIndex ? "#000" : "#888",
                      boxShadow: index <= stepIndex ? "0 0 15px rgba(1, 220, 3, 0.5)" : "none"
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
                  {index < 2 && (
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
                <div className="registration-container">
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
                      />
                      {errors.name && <span className="text-red-400 text-xs block mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="input-container">
                      <input
                        placeholder="Email Address"
                        type="email"
                        {...register("email")}
                        className={errors.email ? "border-red-500" : ""}
                      />
                      {errors.email && <span className="text-red-400 text-xs block mt-1">{errors.email.message}</span>}
                    </div>

                    <div className="input-container">
                      <input
                        placeholder="Phone Number"
                        type="tel"
                        {...register("phone")}
                        className={errors.phone ? "border-red-500" : ""}
                      />
                      {errors.phone && <span className="text-red-400 text-xs block mt-1">{errors.phone.message}</span>}
                    </div>

                    <div className="input-container">
                      <input
                        placeholder="College Name"
                        {...register("collegeName")}
                        className={errors.collegeName ? "border-red-500" : ""}
                      />
                      {errors.collegeName && <span className="text-red-400 text-xs block mt-1">{errors.collegeName.message}</span>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="input-container">
                        <select
                          {...register("year")}
                          className={errors.year ? "border-red-500" : ""}
                          defaultValue=""
                        >
                          <option value="" disabled>Select Year</option>
                          <option value="1">1st Year</option>
                          <option value="2">2nd Year</option>
                          <option value="3">3rd Year</option>
                          <option value="4">4th Year</option>
                        </select>
                        {errors.year && <span className="text-red-400 text-xs block mt-1">{errors.year.message}</span>}
                      </div>

                      <div className="input-container">
                        <input
                          placeholder="Department"
                          {...register("department")}
                          className={errors.department ? "border-red-500" : ""}
                        />
                        {errors.department && <span className="text-red-400 text-xs block mt-1">{errors.department.message}</span>}
                      </div>
                    </div>

                    <button className="submit-btn mt-6" type="submit" disabled={isSubmitting}>
                      <span className="sign-text">Continue to Payment</span>
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* Step 2: Payment */}
            {step === "payment" && (
              <motion.div
                key="payment"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.5)]"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-uiverse-sky/10 text-uiverse-sky mb-4 border border-uiverse-sky/20 shadow-[0_0_15px_rgba(18,184,255,0.2)]">
                    <span className="font-display font-bold text-xl">₹{siteConfig.passPrice}</span>
                    <span className="text-sm opacity-80">per person</span>
                  </div>
                  <p className="text-gray-400">
                    Scan the QR code or use UPI to make payment
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-6 mx-auto w-fit shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"
                      alt="Payment QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-center mb-8 bg-white/5 rounded-xl p-4 border border-white/10">
                  <p className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Or pay to this UPI ID</p>
                  <p className="font-mono text-xl font-bold text-uiverse-sky mb-2 copy-text select-all">{siteConfig.paymentUPI}</p>
                  <p className="text-sm text-gray-500">
                    📞 {siteConfig.paymentPhone}
                  </p>
                </div>

                <div className="border-t border-white/10 pt-6">
                  <label htmlFor="screenshot" className="block mb-4 text-center text-white">
                    Upload Payment Screenshot
                  </label>
                  <div className="relative group">
                    <input
                      type="file"
                      id="screenshot"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploading}
                    />
                    <label
                      htmlFor="screenshot"
                      className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-white/20 rounded-xl cursor-pointer group-hover:border-uiverse-green group-hover:bg-uiverse-green/5 transition-all duration-300 ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                    >
                      {uploading ? (
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-2 border-uiverse-green border-t-transparent rounded-full animate-spin mb-2" />
                          <span className="text-uiverse-green">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📤</span>
                          <span className="text-gray-400 group-hover:text-uiverse-green transition-colors">
                            Click to upload screenshot
                          </span>
                          <span className="text-xs text-gray-600 mt-1">
                            Max 5MB, Images only
                          </span>
                        </>
                      )}
                    </label>
                  </div>
                </div>

                <UiverseButton
                  variant="outline"
                  className="w-full mt-6 !border-white/20 !text-gray-400 hover:!text-white hover:!border-white"
                  onClick={() => setStep("form")}
                >
                  ← Back to Form
                </UiverseButton>
              </motion.div>
            )}

            {/* Step 3: Success */}
            {step === "success" && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-black/40 backdrop-blur-xl border border-uiverse-green/30 rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(1,220,3,0.2)]"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-uiverse-green/20 flex items-center justify-center mb-6 border border-uiverse-green/50 shadow-[0_0_20px_rgba(1,220,3,0.4)]">
                  <span className="text-5xl text-uiverse-green">✓</span>
                </div>
                <h2 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-green to-emerald-400 mb-4">
                  Registration Successful!
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Thank you for registering for {siteConfig.eventName}. Your payment is being verified.
                  You will receive a confirmation email once verified.
                </p>
                <div className="bg-white/5 rounded-xl p-4 mb-8 text-left border border-white/10 inline-block min-w-[300px]">
                  <p className="text-sm text-gray-500 mb-1">Registered as:</p>
                  <p className="text-white font-medium text-lg mb-4">{formData?.name}</p>
                  <p className="text-sm text-gray-500 mb-1">Email:</p>
                  <p className="text-white">{formData?.email}</p>
                </div>

                <div className="mb-8 p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400">
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
    </div>
  );
};

export default Register;
