import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/config/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { UiverseButton } from "@/components/ui/UiverseButton";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import "@/components/RegistrationForm.css";

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
  const [step, setStep] = useState<"form" | "payment" | "success">("form");
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState<InterCollegeForm | null>(null);
  const [interCount, setInterCount] = useState(0);

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

  const isInterFull = interCount >= siteConfig.interCollegeLimit;
  const isRegistrationClosed = new Date() > new Date("2026-02-10T23:59:59");
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

  const onSubmitForm = async (data: InterCollegeForm) => {
    if (isInterFull) {
      toast.error("Inter college registration is full!");
      return;
    }
    if (isRegistrationClosed) {
      toast.error("Registration is closed!");
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
      const fileName = `intercollege-${Date.now()}-${Math.random().toString(36).substring(7)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("payment-screenshots")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("payment-screenshots")
        .getPublicUrl(fileName);

      // Save registration to intercollege_registrations table
      const { error: dbError } = await supabase.from("intercollege_registrations").insert({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        register_number: formData.registerNumber,
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
          {/* Inter College Badge */}
          <div className="flex justify-center mb-6">
            <div className="px-4 py-1.5 rounded-full bg-uiverse-purple/20 border border-uiverse-purple/40 text-uiverse-purple text-sm font-bold tracking-wider">
              INTER COLLEGE
            </div>
          </div>

          {/* Pre-Registration Info (Compact) */}
          <div className="mb-8 bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 text-center">
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
                      backgroundColor: index <= stepIndex ? "#DF19FB" : "rgba(255, 255, 255, 0.1)",
                      color: index <= stepIndex ? "#fff" : "#888",
                      boxShadow: index <= stepIndex ? "0 0 15px rgba(223, 25, 251, 0.5)" : "none"
                    }}
                    className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-colors duration-300"
                  >
                    {index + 1}
                  </motion.div>
                  <span
                    className={`hidden sm:block text-sm font-medium ${index <= stepIndex ? "text-white" : "text-white/40"
                      }`}
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
                      />
                      {errors.name && <span className="text-red-400 text-xs block mt-1">{errors.name.message}</span>}
                    </div>

                    <div className="input-container">
                      <input
                        placeholder="Register Number"
                        {...register("registerNumber")}
                        className={errors.registerNumber ? "border-red-500" : ""}
                      />
                      {errors.registerNumber && <span className="text-red-400 text-xs block mt-1">{errors.registerNumber.message}</span>}
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
                        <select
                          {...register("department")}
                          className={errors.department ? "border-red-500" : ""}
                          defaultValue=""
                        >
                          <option value="" disabled>Select Department</option>
                          {departments.map((dept) => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                        {errors.department && <span className="text-red-400 text-xs block mt-1">{errors.department.message}</span>}
                      </div>
                    </div>

                    <button className="submit-btn mt-6 inter-college-btn" type="submit" disabled={isSubmitting}>
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
                className="bg-black/40 backdrop-blur-xl border border-uiverse-purple/20 rounded-3xl p-8 shadow-[0_0_30px_rgba(223,25,251,0.2)]"
              >
                <div className="text-center mb-8">
                  <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-uiverse-purple/10 text-uiverse-purple mb-4 border border-uiverse-purple/20 shadow-[0_0_15px_rgba(223,25,251,0.2)]">
                    <span className="font-display font-bold text-xl">₹{siteConfig.interCollegePassPrice}</span>
                    <span className="text-sm opacity-80">per person</span>
                  </div>
                  <p className="text-gray-400">
                    Scan the QR code or use UPI to make payment
                  </p>
                </div>

                <div className="bg-white rounded-2xl p-6 mb-6 mx-auto w-fit shadow-[0_0_20px_rgba(223,25,251,0.3)]">
                  <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden relative">
                    <img
                      src={siteConfig.interCollegePaymentQR || "https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg"}
                      alt="Payment QR Code"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>

                <div className="text-center mb-8 bg-white/5 rounded-xl p-4 border border-uiverse-purple/20">
                  <p className="text-gray-400 mb-2 text-sm uppercase tracking-wider">Or pay to this UPI ID</p>
                  <p className="font-mono text-xl font-bold text-uiverse-purple mb-2 copy-text select-all">
                    {siteConfig.interCollegePaymentUPI || siteConfig.paymentUPI}
                  </p>
                  <p className="text-sm text-gray-500">
                    📞 {siteConfig.interCollegePaymentPhone || siteConfig.paymentPhone}
                  </p>
                </div>

                <div className="border-t border-uiverse-purple/20 pt-6">
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
                      className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-uiverse-purple/30 rounded-xl cursor-pointer group-hover:border-uiverse-purple group-hover:bg-uiverse-purple/5 transition-all duration-300 ${uploading ? "opacity-50 cursor-not-allowed" : ""
                        }`}
                    >
                      {uploading ? (
                        <div className="flex flex-col items-center">
                          <div className="w-8 h-8 border-2 border-uiverse-purple border-t-transparent rounded-full animate-spin mb-2" />
                          <span className="text-uiverse-purple">Uploading...</span>
                        </div>
                      ) : (
                        <>
                          <span className="text-3xl mb-2 group-hover:scale-110 transition-transform">📤</span>
                          <span className="text-gray-400 group-hover:text-uiverse-purple transition-colors">
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
                  className="w-full mt-6 !border-uiverse-purple/20 !text-gray-400 hover:!text-uiverse-purple hover:!border-uiverse-purple"
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
                className="bg-black/40 backdrop-blur-xl border border-uiverse-purple/30 rounded-3xl p-12 text-center shadow-[0_0_50px_rgba(223,25,251,0.2)]"
              >
                <div className="w-24 h-24 mx-auto rounded-full bg-uiverse-purple/20 flex items-center justify-center mb-6 border border-uiverse-purple/50 shadow-[0_0_20px_rgba(223,25,251,0.4)]">
                  <span className="text-5xl text-uiverse-purple">✓</span>
                </div>
                <h2 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple to-primary mb-4">
                  Registration Successful!
                </h2>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  Thank you for registering for {siteConfig.eventName}. Your payment is being verified.
                  You will receive a confirmation email once verified.
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
    </div>
  );
};

export default RegisterInterCollege;
