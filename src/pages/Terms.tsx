import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UiverseCard } from "@/components/ui/UiverseCard";
import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-uiverse-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-uiverse-sky/10 rounded-full blur-[120px] pointer-events-none" />

      <Navbar />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple via-white to-uiverse-sky"
            >
              Terms of Service
            </motion.h1>
          </div>

          <UiverseCard className="p-8 md:p-12 prose prose-invert max-w-none border-white/10">
            <h2 className="text-xl font-bold mb-4 text-uiverse-sky">1. Acceptance of Terms</h2>
            <p className="text-gray-400 mb-6">
              By registering for VYUGA 26, you agree to abide by the rules and regulations
              set forth by the organizing committee.
            </p>

            <h2 className="text-xl font-bold mb-4 text-uiverse-purple">2. Registration & Payment</h2>
            <p className="text-gray-400 mb-6">
              Registration fees are non-refundable. Payment must be made through the
              official channels provided. Any disputes will be handled by the organizing
              committee.
            </p>

            <h2 className="text-xl font-bold mb-4 text-uiverse-pink">3. Event Participation</h2>
            <p className="text-gray-400 mb-6">
              Participants must follow the event-specific rules. Any form of malpractice
              will result in immediate disqualification.
            </p>

            <h2 className="text-xl font-bold mb-4 text-uiverse-orange">4. Code of Conduct</h2>
            <p className="text-gray-400 mb-6">
              All participants are expected to maintain decorum and respect fellow
              participants, coordinators, and faculty members.
            </p>

            <h2 className="text-xl font-bold mb-4 text-uiverse-green">5. Liability</h2>
            <p className="text-gray-400 mb-6">
              The organizing committee is not responsible for any personal loss or damage
              during the event.
            </p>

            <h2 className="text-xl font-bold mb-4 text-uiverse-sky">6. Media & Photography</h2>
            <p className="text-gray-400 mb-6">
              Photographs and videos taken during the event may be used for promotional
              purposes.
            </p>

            <h2 className="text-xl font-bold mb-4 text-uiverse-purple">7. Changes to Terms</h2>
            <p className="text-gray-400">
              The organizing committee reserves the right to modify these terms at any time
              without prior notice.
            </p>
          </UiverseCard>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
