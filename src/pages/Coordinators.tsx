import { getEventCoordinators, getHODs, getStaffCoordinators, getChiefCoordinators, getAssociateCoordinators } from "@/config/coordinators";
import { events } from "@/config/events";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { UiverseCard } from "@/components/ui/UiverseCard";
import { motion } from "framer-motion";
import { Phone, Award, Users, GraduationCap, CheckCircle2 } from "lucide-react";

const Coordinators = () => {
  const hods = getHODs();
  const staffCoordinators = getStaffCoordinators();
  const chiefCoordinators = getChiefCoordinators();
  const associateCoordinators = getAssociateCoordinators();
  const eventCoordinators = getEventCoordinators();

  const getEventNames = (eventIds: string[]): string => {
    return eventIds
      .map((id) => events.find((e) => e.id === id)?.title)
      .filter(Boolean)
      .join(", ");
  };

  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
      {/* Background Effects */}

      <Navbar />

      <main className="pt-32 pb-20 px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-uiverse-purple text-sm tracking-[0.2em] uppercase mb-2 font-bold"
            >
              The Team
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-display text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple via-white to-uiverse-sky drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
            >
              Coordinators
            </motion.h1>
          </div>

          {/* HOD Section */}
          {hods.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-uiverse-purple/50" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Head of Departments</h2>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-uiverse-purple/50" />
              </div>

              <div className="flex flex-wrap gap-8 justify-center max-w-5xl mx-auto">
                {hods.map((hod, index) => (
                  <motion.div
                    key={hod.id}
                    className="w-full max-w-[350px]"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <UiverseCard className="p-8 text-center border-uiverse-purple/30 relative overflow-hidden group h-full">
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-uiverse-purple to-transparent opacity-50" />

                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-4 border-uiverse-purple/30 mb-6 bg-white/10">
                        <img
                          src={hod.image || "/images/hod1.jpeg"}
                          alt={hod.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <h3 className="font-display text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-white/70 mb-2">
                        {hod.name}
                      </h3>
                      <div className="flex items-center justify-center gap-2 text-uiverse-purple mb-4 font-medium tracking-wide text-sm">
                        <GraduationCap className="w-4 h-4" />
                        <span>HOD</span>
                      </div>

                      <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                        {hod.department}
                      </p>
                    </UiverseCard>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Staff Coordinators */}
          {staffCoordinators.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-uiverse-sky/50" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Staff Coordinators</h2>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-uiverse-sky/50" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {staffCoordinators.map((coordinator, index) => (
                  <UiverseCard
                    key={coordinator.id}
                    delay={index * 0.1}
                    className="p-6 border-white/5 hover:border-uiverse-sky/30 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-uiverse-sky/10 to-blue-500/10 flex items-center justify-center border border-uiverse-sky/20 group-hover:border-uiverse-sky/50 transition-colors">
                        <Award className="w-7 h-7 text-uiverse-sky group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-uiverse-sky transition-colors">
                          {coordinator.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3 font-medium">
                          {coordinator.department}
                        </p>
                        <a
                          href={`tel:${coordinator.phone}`}
                          className="text-xs inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          {coordinator.phone}
                        </a>
                      </div>
                    </div>
                  </UiverseCard>
                ))}
              </div>
            </section>
          )}

          {/* Chief Coordinators */}
          {chiefCoordinators.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-uiverse-green/50" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Chief Event Coordinators</h2>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-uiverse-green/50" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {chiefCoordinators.map((coordinator, index) => (
                  <UiverseCard
                    key={coordinator.id}
                    delay={index * 0.1}
                    className="p-6 border-white/5 hover:border-uiverse-green/30 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-uiverse-green/10 to-emerald-500/10 flex items-center justify-center border border-uiverse-green/20 group-hover:border-uiverse-green/50 transition-colors">
                        <Users className="w-7 h-7 text-uiverse-green group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-uiverse-green transition-colors">
                          {coordinator.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-3 font-medium">
                          {coordinator.department}
                        </p>
                        <a
                          href={`tel:${coordinator.phone}`}
                          className="text-xs inline-flex items-center gap-1.5 text-gray-500 hover:text-white transition-colors"
                        >
                          <Phone className="w-3 h-3" />
                          {coordinator.phone}
                        </a>
                      </div>
                    </div>
                  </UiverseCard>
                ))}
              </div>
            </section>
          )}

          {/* Associate Coordinators */}
          {associateCoordinators.length > 0 && (
            <section className="mb-20">
              <div className="flex items-center gap-4 mb-10 justify-center">
                <span className="h-px w-12 bg-gradient-to-r from-transparent to-white/50" />
                <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Associate Event Coordinators</h2>
                <span className="h-px w-12 bg-gradient-to-l from-transparent to-white/50" />
              </div>

              <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {associateCoordinators.map((coordinator, index) => (
                  <UiverseCard
                    key={coordinator.id}
                    delay={index * 0.1}
                    className="p-6 border-white/5 hover:border-white/30 group"
                  >
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/50 transition-colors">
                        <CheckCircle2 className="w-7 h-7 text-white group-hover:scale-110 transition-transform duration-300" />
                      </div>
                      <div className="flex-1 text-left">
                        <h3 className="font-display text-xl font-bold text-white mb-1 group-hover:text-gray-300 transition-colors">
                          {coordinator.name}
                        </h3>
                        <p className="text-sm text-gray-400 mb-1 font-medium">
                          {coordinator.department}
                        </p>
                      </div>
                    </div>
                  </UiverseCard>
                ))}
              </div>
            </section>
          )}

          {/* Event Coordinators */}
          <section>
            <div className="flex items-center gap-4 mb-10 justify-center">
              <span className="h-px w-12 bg-gradient-to-r from-transparent to-uiverse-green/50" />
              <h2 className="text-2xl font-bold text-white uppercase tracking-wider">Event Coordinators</h2>
              <span className="h-px w-12 bg-gradient-to-l from-transparent to-uiverse-green/50" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {eventCoordinators.map((coordinator, index) => (
                <UiverseCard
                  key={coordinator.id}
                  delay={index * 0.05}
                  className="p-6 border-white/5 hover:border-uiverse-green/30 group bg-black/20 text-center"
                >
                  <div className="flex justify-center mb-4">
                    {coordinator.year && (
                      <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/5 text-gray-400 border border-white/5">
                        {coordinator.year} Year
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-xl text-white mb-2">{coordinator.name}</h3>
                  <div className="text-sm text-gray-500 mb-6 flex items-center justify-center gap-2">
                    <span>{coordinator.department}</span>
                    {coordinator.section && (
                      <>
                        <span className="w-1 h-1 rounded-full bg-gray-600" />
                        <span>Sec {coordinator.section}</span>
                      </>
                    )}
                  </div>

                  <div className="pt-4 border-t border-white/5">
                    {coordinator.eventIds.length > 0 && (
                      <div className="mb-4">
                        <span className="text-uiverse-green text-xs font-bold block mb-1 uppercase tracking-wide">Event In-Charge</span>
                        <p className="text-sm text-gray-300">{getEventNames(coordinator.eventIds)}</p>
                      </div>
                    )}

                  </div>
                </UiverseCard>
              ))}
            </div>
          </section>
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Coordinators;
