import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { HelpCircle } from "lucide-react";

const faqs = [
    {
        question: "Who can participate in the symposium?",
        answer: "Any student from a recognized institution can participate. A valid student ID proof is mandatory during entry."
    },
    {
        question: "Is this a free or paid symposium?",
        answer: "This is a paid symposium. Participation requires a valid registration pass."
    },
    {
        question: "Is pre-submission required for all events?",
        answer: "No. Pre-submission is mandatory only for Ideathon and Startup Arena. Participants are required to pay the registration fee only if shortlisted."
    },
    {
        question: "How will shortlisted participants be informed?",
        answer: "Shortlisted participants will be contacted through the contact details provided during registration (email or phone)."
    },
    {
        question: "Is the registration fee per team or per individual?",
        answer: "Registration is per head and not per team. Each participant must have a separate valid registration pass."
    },
    {
        question: "How do I get my participation pass?",
        answer: "Visit the Register page, complete the online payment, and obtain your digital registration pass. Entries will be validated at the venue before participation."
    },
    {
        question: "Is food provided during the event?",
        answer: "Yes. Food will be provided to all valid registered participants."
    },
    {
        question: "Is on-spot registration available?",
        answer: "No. On-spot registration is strictly not available."
    },
    {
        question: "Is bulk registration allowed?",
        answer: "Yes. For bulk registration, participants must contact the event coordinators."
    },
    {
        question: "What payment methods are accepted?",
        answer: "Registration fees can be paid through online payment methods only."
    },
    {
        question: "Can I participate in multiple events?",
        answer: "Yes. Participants can take part in multiple events using one valid registration pass, provided event schedules do not overlap."
    },
    {
        question: "What are the team size rules?",
        answer: "Depending on the event rules, participants can register as Solo, Duo, Trio, or Squad."
    },
    {
        question: "Will participants receive certificates?",
        answer: "Yes. Participation certificates will be sent via email. Winners will receive physical certificates along with additional rewards."
    },
    {
        question: "Is accommodation provided?",
        answer: "No. Accommodation is not provided. Participants are requested to plan accordingly."
    },
    {
        question: "What happens if I arrive late to the event?",
        answer: "Late entries may not be allowed. Participants must report at least 30 minutes before the scheduled start time."
    },
    {
        question: "Can I edit my registration details after submission?",
        answer: "No. Ensure all details are correct before submitting the form. For corrections, contact the event coordinators."
    },
    {
        question: "Are the judges’ decisions final?",
        answer: "Yes. The decisions of the judges and organizing committee are final and binding."
    }
];

const FAQ = () => {
    return (
        <div className="min-h-screen bg-transparent relative overflow-hidden">
            <Navbar />

            <div className="container mx-auto px-4 pt-32 pb-20 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-16"
                >
                    <div className="inline-flex items-center justify-center p-3 mb-6 rounded-full bg-uiverse-purple/10 border border-uiverse-purple/20 backdrop-blur-sm">
                        <HelpCircle className="w-6 h-6 text-uiverse-purple mr-2" />
                        <span className="text-uiverse-purple font-semibold">Support & Help</span>
                    </div>
                    <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-uiverse-purple to-uiverse-sky mb-6">
                        Frequently Asked Questions
                    </h1>
                    <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                        Find answers to common questions about the symposium, registration, and events.
                    </p>
                </motion.div>

                <div className="grid gap-6 max-w-4xl mx-auto">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            className="group relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-uiverse-purple/20 to-uiverse-sky/20 rounded-2xl blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="relative glass-card bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-8 hover:border-uiverse-purple/50 transition-all duration-300">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-start gap-3">
                                    <span className="text-uiverse-purple text-2xl leading-none">Q.</span>
                                    {faq.question}
                                </h3>
                                <div className="pl-8 md:pl-9">
                                    <p className="text-gray-400 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default FAQ;
