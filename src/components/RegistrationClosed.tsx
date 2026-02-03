import { siteConfig } from "@/config/config";
import { motion } from "framer-motion";
import { Ban, ClipboardList, Clock, XCircle } from "lucide-react";

interface RegistrationClosedProps {
  reason: "closed" | "full" | "deadline";
  type?: "outer" | "inter";
}

const RegistrationClosed = ({ reason, type }: RegistrationClosedProps) => {
  const getMessage = () => {
    switch (reason) {
      case "closed":
        return {
          title: "Registration is Closed",
          description: "Registration has been temporarily closed by the administrator. Please check back later or follow us for updates.",
          icon: <Ban className="w-12 h-12 text-red-500" />,
        };
      case "full":
        return {
          title: `${type === "inter" ? "Inter" : "Outer"} College Registration Full`,
          description: `All ${type === "inter" ? "inter" : "outer"} college spots have been filled. Thank you for your interest!`,
          icon: <ClipboardList className="w-12 h-12 text-red-500" />,
        };
      case "deadline":
        return {
          title: "Registration Deadline Passed",
          description: `Registration closed on ${siteConfig.registrationCloseDate}. Thank you for your interest in ${siteConfig.eventName}.`,
          icon: <Clock className="w-12 h-12 text-red-500" />,
        };
      default:
        return {
          title: "Registration Unavailable",
          description: "Registration is currently not available.",
          icon: <XCircle className="w-12 h-12 text-red-500" />,
        };
    }
  };

  const { title, description, icon } = getMessage();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="max-w-lg mx-auto"
    >
      <div className="bg-black/40 backdrop-blur-xl border-2 border-red-500/30 rounded-3xl p-10 text-center shadow-[0_0_40px_rgba(239,68,68,0.15)]">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto rounded-full bg-red-500/20 flex items-center justify-center mb-6 border border-red-500/40">
          {icon}
        </div>

        {/* Title */}
        <h2 className="font-display text-2xl md:text-3xl font-bold text-white mb-4">
          {title}
        </h2>

        {/* Description */}
        <p className="text-gray-400 mb-8 leading-relaxed">
          {description}
        </p>

        {/* Social Links */}
        <div className="bg-white/5 rounded-xl p-5 border border-white/10">
          <p className="text-gray-400 text-sm mb-4">Stay updated for future events:</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={siteConfig.whatsappGroupLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-uiverse-green/20 hover:bg-uiverse-green/30 border border-uiverse-green/40 rounded-xl text-uiverse-green text-sm font-medium transition-all hover:scale-105 w-full sm:w-auto justify-center"
            >
              <span className="w-2 h-2 bg-uiverse-green rounded-full" />
              WhatsApp Group
            </a>
            <a
              href={siteConfig.instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 bg-uiverse-purple/20 hover:bg-uiverse-purple/30 border border-uiverse-purple/40 rounded-xl text-uiverse-purple text-sm font-medium transition-all hover:scale-105 w-full sm:w-auto justify-center"
            >
              <span className="w-2 h-2 bg-uiverse-purple rounded-full" />
              Instagram
            </a>
          </div>
        </div>

        {/* Back to Home */}
        <a
          href="/"
          className="inline-block mt-6 text-gray-400 hover:text-white transition-colors text-sm"
        >
          ← Back to Home
        </a>
      </div>
    </motion.div>
  );
};

export default RegistrationClosed;
