import { motion } from "framer-motion";

const EventPoster = () => {
  return (
    <section className="py-16 px-4 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gradient-to-r from-uiverse-purple/20 to-uiverse-sky/20 blur-[100px] rounded-full" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <p className="text-uiverse-purple text-sm tracking-[0.2em] uppercase mb-2 font-bold">
            Mark Your Calendar
          </p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-white">
            Event Poster
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(223,25,251,0.15)] bg-black/40 backdrop-blur-sm"
        >
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-uiverse-purple/50 rounded-tl-2xl" />
          <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-uiverse-sky/50 rounded-tr-2xl" />
          <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-uiverse-sky/50 rounded-bl-2xl" />
          <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-uiverse-purple/50 rounded-br-2xl" />

          <img
            src="/images/TECHNICAL EVENTS POSTER.png"
            alt="Vyuga' 26 Event Poster - Technical Symposium"
            className="w-full h-auto object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default EventPoster;
