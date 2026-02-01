import { getHODs, getStaffCoordinators, getChiefCoordinators } from "@/config/coordinators";
import { motion } from "framer-motion";
import { User, Phone, Award } from "lucide-react";

const CoordinatorPreview = () => {
  const hods = getHODs();
  const staffCoordinators = getStaffCoordinators();
  const chiefCoordinators = getChiefCoordinators();

  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-uiverse-purple/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-block"
          >
            <span className="px-5 py-2 rounded-full border border-white/10 bg-white/5 text-white/80 text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              Leadership Board
            </span>
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white mt-6 drop-shadow-2xl"
          >
            Meet Our Team
          </motion.h2>
        </div>

        {/* HODs Section - Professional Cards */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {hods.map((hod, index) => (
            <motion.div
              key={hod.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.2 }}
              className="group relative"
            >
              {/* Glass Card */}
              <div className="relative h-full bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-uiverse-purple/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(124,58,237,0.1)] hover:-translate-y-1 p-8 flex flex-col items-center text-center">

                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-20 h-20 border-l border-t border-white/5 rounded-tl-2xl -translate-x-1 -translate-y-1" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-r border-b border-white/5 rounded-br-2xl translate-x-1 translate-y-1" />

                {/* Avatar with Ring */}
                <div className="relative mb-6">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1 bg-gradient-to-b from-white/20 to-transparent relative z-10">
                    <div className="w-full h-full rounded-full overflow-hidden bg-gray-900 border border-white/10">
                      <img
                        src={hod.image || `/images/hod1.jpeg`}
                        alt={hod.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                  {/* Glow behind avatar */}
                  <div className="absolute inset-0 bg-uiverse-purple/30 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
                </div>

                {/* Content */}
                <div className="relative z-10 w-full">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-uiverse-purple/10 border border-uiverse-purple/20 text-uiverse-purple text-[10px] font-bold uppercase tracking-widest mb-4">
                    Head of Department
                  </div>

                  <h3 className="font-display text-2xl md:text-3xl font-bold text-white mb-2 group-hover:text-uiverse-purple transition-colors duration-300">
                    {hod.name}
                  </h3>

                  <p className="text-gray-400 font-light tracking-wide text-sm md:text-base border-t border-white/5 pt-4 mt-2 w-full max-w-[200px] mx-auto">
                    {hod.department}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Staff Coordinators */}
        {staffCoordinators.length > 0 && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 w-fit mx-auto px-10"
            >
              Staff Coordinators
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {staffCoordinators.map((coordinator, index) => (
                <motion.div
                  key={coordinator.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + (index * 0.1) }}
                >
                  <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="w-14 h-14 rounded-full bg-uiverse-sky/10 flex items-center justify-center text-uiverse-sky group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-uiverse-sky transition-colors">{coordinator.name}</h4>
                      <p className="text-sm text-gray-400">{coordinator.phone}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Chief Event Coordinators */}
        {chiefCoordinators.length > 0 && (
          <div className="mb-16">
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center text-2xl font-bold text-white mb-8 border-b border-white/10 pb-4 w-fit mx-auto px-10"
            >
              Chief Event Coordinators
            </motion.h3>
            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {chiefCoordinators.map((coordinator, index) => (
                <motion.div
                  key={coordinator.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                >
                  <div className="flex items-center gap-4 p-6 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors group">
                    <div className="w-14 h-14 rounded-full bg-uiverse-green/10 flex items-center justify-center text-uiverse-green group-hover:scale-110 transition-transform">
                      <User className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-white group-hover:text-uiverse-green transition-colors">{coordinator.name}</h4>
                      <p className="text-sm text-gray-400">{coordinator.department}</p>
                      <a href={`tel:${coordinator.phone}`} className="text-sm text-gray-500 hover:text-white flex items-center gap-1 mt-1">
                        <Phone className="w-3 h-3" /> {coordinator.phone}
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default CoordinatorPreview;
