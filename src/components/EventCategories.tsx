import { Link } from "react-router-dom";
import { UiverseButton } from "./ui/UiverseButton";
import { motion } from "framer-motion";
import { siteConfig } from "@/config/config";

const EventCategories = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Ambient Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-uiverse-purple/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-uiverse-sky/20 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-uiverse-sky text-sm tracking-[0.3em] uppercase mb-4 font-bold border border-uiverse-sky/20 py-1 px-4 rounded-full inline-block backdrop-blur-sm"
          >
            Explore Domains
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]"
          >
            Event Categories
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-8 px-4 max-w-5xl mx-auto">
          {siteConfig.eventCategories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[450px] w-full cursor-pointer"
            >
              {/* Card Container */}
              <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-black/40 backdrop-blur-md transition-all duration-500 group-hover:border-uiverse-sky/50 group-hover:shadow-[0_0_30px_rgba(18,184,255,0.3)] group-hover:scale-[1.02]">

                {/* Background Image with Zoom Effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.title}
                    className="w-full h-full object-cover opacity-60 transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                {/* Looping Shining Effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none overflow-hidden rounded-3xl">
                  <div className="absolute top-0 -inset-full h-full w-1/2 z-5 bg-gradient-to-r from-transparent to-white/10 skew-x-12 animate-shine" />
                </div>

                {/* Content - Centered */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-20">

                  {/* Floating Icon/Badge Removed */}

                  <h3 className="font-display text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-md group-hover:text-uiverse-sky transition-colors">
                    {category.title}
                  </h3>

                  <p className="text-gray-300 text-sm md:text-base mb-8 max-w-[80%] leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">
                    {category.description}
                  </p>

                  <Link to={`/events?category=${category.id}`}>
                    <UiverseButton
                      variant="outline"
                      className="min-w-[160px] border-white/30 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 uppercase tracking-widest text-xs font-bold"
                    >
                      View Events
                    </UiverseButton>
                  </Link>
                </div>
              </div>

              {/* External Glow */}
              <div className={`absolute -inset-1 rounded-3xl bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10`} />

            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes shine {
            100% {
                left: 125%;
            }
        }
        .animate-shine {
            animation: shine 2s infinite;
        }
      `}</style>
    </section>
  );
};

export default EventCategories;
