import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { siteConfig } from "@/config/config";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import UpdateEventSelector from "@/components/UpdateEventSelector";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Mail, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
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

const UpdateEvents = () => {
    const [step, setStep] = useState<"email" | "select" | "success">("email");
    const [email, setEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
    const [eventError, setEventError] = useState("");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [registrationData, setRegistrationData] = useState<any>(null);
    const [registrationType, setRegistrationType] = useState<"department" | "intercollege" | "outer" | null>(null);

    const handleEmailSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Check in department_registrations
            const { data: deptData, error: deptError } = await supabase
                .from("department_registrations")
                .select("*")
                .eq("email", email.trim())
                .maybeSingle();

            if (deptData) {
                setRegistrationData(deptData);
                setRegistrationType("department");
                setSelectedEvents([]); // Start with empty selection
                setStep("select");
                toast.success("Registration found!");
                setIsLoading(false);
                return;
            }

            // Check in intercollege_registrations
            const { data: interData, error: interError } = await supabase
                .from("intercollege_registrations")
                .select("*")
                .eq("email", email.trim())
                .maybeSingle();

            if (interData) {
                setRegistrationData(interData);
                setRegistrationType("intercollege");
                setSelectedEvents([]); // Start with empty selection
                setStep("select");
                toast.success("Registration found!");
                setIsLoading(false);
                return;
            }

            // Check in registrations (outer college)
            const { data: outerData, error: outerError } = await supabase
                .from("registrations")
                .select("*")
                .eq("email", email.trim())
                .maybeSingle();

            if (outerData) {
                setRegistrationData(outerData);
                setRegistrationType("outer");
                setSelectedEvents([]); // Start with empty selection
                setStep("select");
                toast.success("Registration found!");
                setIsLoading(false);
                return;
            }

            // No registration found
            toast.error("No registration found with this email address.");
            setIsLoading(false);
        } catch (error: any) {
            console.error("Error:", error);
            toast.error(error.message || "Failed to find registration");
            setIsLoading(false);
        }
    };

    const handleUpdateEvents = async () => {
        if (!registrationData || !registrationType) return;

        setIsLoading(true);
        try {
            const tableName =
                registrationType === "department"
                    ? "department_registrations"
                    : registrationType === "intercollege"
                        ? "intercollege_registrations"
                        : "registrations";

            const { error } = await supabase
                .from(tableName)
                .update({ selected_events: selectedEvents })
                .eq("id", registrationData.id);

            if (error) throw error;

            toast.success("Events updated successfully!");
            setStep("success");
        } catch (error: any) {
            console.error("Error:", error);
            toast.error(error.message || "Failed to update events");
        } finally {
            setIsLoading(false);
            setShowConfirmDialog(false);
        }
    };

    const handleEventChange = (events: string[]) => {
        setSelectedEvents(events);
        setEventError("");
    };

    const handleSubmitSelection = () => {
        if (selectedEvents.length === 0) {
            setEventError("Please select at least 1 event");
            toast.error("Please select at least 1 event");
            return;
        }

        // Check if exactly one technical and one non-technical event is selected
        const technicalEvents = selectedEvents.filter(id => {
            const event = require("@/config/events").events.find((e: any) => e.id === id);
            return event?.category === "technical";
        });

        const nonTechnicalEvents = selectedEvents.filter(id => {
            const event = require("@/config/events").events.find((e: any) => e.id === id);
            return event?.category === "non-technical";
        });

        if (technicalEvents.length !== 1 || nonTechnicalEvents.length !== 1) {
            setEventError("Please select exactly 1 technical and 1 non-technical event");
            toast.error("Please select exactly 1 technical and 1 non-technical event");
            return;
        }

        setEventError("");
        setShowConfirmDialog(true);
    };

    // Email Input Screen
    if (step === "email") {
        return (
            <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
                </div>

                <Navbar />

                <main className="pt-32 pb-20 px-4 relative z-10">
                    <div className="max-w-xl mx-auto">
                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Home
                        </Link>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-uiverse-purple/20 border border-uiverse-purple/40 text-uiverse-purple text-sm font-bold mb-4">
                                <Sparkles className="w-4 h-4" />
                                Update Your Events
                            </div>
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                                Update Event Registration
                            </h1>
                            <p className="text-gray-400">
                                Enter your registered email to update your event selections
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card rounded-3xl p-8 border-2 border-white/10"
                        >
                            <form onSubmit={handleEmailSubmit} className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Registered Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="Enter your registered email"
                                            required
                                            className="w-full pl-12 pr-4 py-3 bg-black/30 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-uiverse-purple/50 focus:ring-2 focus:ring-uiverse-purple/20 transition-all"
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 bg-gradient-to-r from-uiverse-purple to-uiverse-sky text-white font-bold rounded-xl shadow-lg shadow-uiverse-purple/20 hover:shadow-uiverse-purple/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isLoading ? "Searching..." : "Find My Registration"}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </main>

                <Footer />
                <WhatsAppButton />
            </div>
        );
    }

    // Event Selection Screen
    if (step === "select") {
        return (
            <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-uiverse-sky/20 blur-[120px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-uiverse-purple/20 blur-[120px] rounded-full" />
                </div>

                <Navbar />

                <main className="pt-32 pb-20 px-4 relative z-10">
                    <div className="max-w-4xl mx-auto">
                        <button
                            onClick={() => {
                                setStep("email");
                                setEmail("");
                                setSelectedEvents([]);
                                setRegistrationData(null);
                                setRegistrationType(null);
                            }}
                            className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back to Email
                        </button>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <h1 className="font-display text-3xl md:text-4xl font-bold text-white mb-2">
                                Update Your Events
                            </h1>
                            <p className="text-gray-400">
                                Select exactly 1 technical and 1 non-technical event
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10">
                                <Mail className="w-4 h-4 text-uiverse-sky" />
                                <span className="text-sm text-gray-300">{email}</span>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="glass-card rounded-3xl p-6 border-2 border-white/10 mb-6"
                        >
                            <UpdateEventSelector
                                selectedEvents={selectedEvents}
                                onChange={handleEventChange}
                                error={eventError}
                            />
                        </motion.div>

                        <div className="flex justify-center">
                            <button
                                onClick={handleSubmitSelection}
                                disabled={isLoading || selectedEvents.length === 0}
                                className="px-8 py-3 bg-gradient-to-r from-uiverse-purple to-uiverse-sky text-white font-bold rounded-xl shadow-lg shadow-uiverse-purple/20 hover:shadow-uiverse-purple/40 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {isLoading ? "Updating..." : "Update Events"}
                            </button>
                        </div>
                    </div>
                </main>

                <Footer />
                <WhatsAppButton />

                <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
                    <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                        <AlertDialogHeader>
                            <AlertDialogTitle className="text-xl font-bold text-uiverse-sky flex items-center gap-2">
                                <AlertTriangle className="w-5 h-5" />
                                Confirm Event Update
                            </AlertDialogTitle>
                            <AlertDialogDescription className="text-gray-400 text-base mt-2">
                                You are about to update your event selections. This will replace your current event choices.
                                <br /><br />
                                <strong className="text-white">Selected Events: {selectedEvents.length}/2</strong>
                                <br /><br />
                                Do you want to continue?
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="mt-4">
                            <AlertDialogCancel
                                onClick={() => setShowConfirmDialog(false)}
                                className="bg-transparent border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
                            >
                                Cancel
                            </AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleUpdateEvents}
                                className="bg-gradient-to-r from-uiverse-purple to-uiverse-sky text-white hover:opacity-90 border-none"
                            >
                                Confirm Update
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        );
    }

    // Success Screen
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
                            <CheckCircle2 className="w-10 h-10 text-uiverse-sky" />
                        </div>

                        <h2 className="font-display text-3xl font-bold text-white mb-4">
                            Events Updated Successfully!
                        </h2>

                        <p className="text-gray-400 mb-6">
                            Your event selections have been updated. You're all set for {siteConfig.eventName}!
                        </p>

                        <div className="bg-uiverse-sky/10 rounded-xl p-4 mb-6 border border-uiverse-sky/30">
                            <p className="text-uiverse-sky font-medium">
                                Updated {selectedEvents.length} event{selectedEvents.length !== 1 ? 's' : ''}
                            </p>
                        </div>

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-uiverse-purple to-uiverse-sky text-white font-bold hover:opacity-90 transition-opacity"
                        >
                            Back to Home
                        </Link>
                    </div>
                </motion.div>
            </main>

            <Footer />
            <WhatsAppButton />
        </div>
    );
};

export default UpdateEvents;
