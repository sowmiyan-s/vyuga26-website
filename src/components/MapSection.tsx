import { siteConfig } from "@/config/config";
import { UiverseCard } from "./ui/UiverseCard";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const MapSection = () => {
  return (
    <section className="py-20 px-4 relative">
      {/* Background Glow */}
      <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-uiverse-green/10 rounded-full blur-[100px] z-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-uiverse-green text-sm tracking-[0.2em] uppercase mb-2 font-bold font-tech"
          >
            Find Us
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="font-display text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-green to-uiverse-sky"
          >
            Location
          </motion.h2>
        </div>

        <UiverseCard className="p-0 overflow-hidden border-uiverse-green/30">
          <div className="grid md:grid-cols-3 relative">
            <div className="p-8 flex flex-col justify-center relative overflow-hidden bg-black/40 backdrop-blur-md">
              {/* Decorative background for text panel */}
              <div className="absolute inset-0 bg-gradient-to-br from-uiverse-green/5 to-transparent pointer-events-none" />

              <h3 className="font-display text-2xl font-bold mb-4 text-white relative z-10">{siteConfig.collegeName}</h3>
              <p className="text-gray-300 mb-6 relative z-10 leading-relaxed">{siteConfig.collegeAddress}</p>

              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href={`https://maps.google.com/?q=${encodeURIComponent(siteConfig.collegeName + " " + siteConfig.collegeLocation)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 text-uiverse-green font-bold bg-uiverse-green/10 px-6 py-3 rounded-xl border border-uiverse-green/20 hover:bg-uiverse-green hover:text-black transition-all duration-300 w-fit relative z-10 group shadow-[0_0_15px_rgba(1,220,3,0.1)] hover:shadow-[0_0_25px_rgba(1,220,3,0.4)]"
              >
                <MapPin className="w-5 h-5 group-hover:animate-bounce" />
                <span>Get Directions</span>
              </motion.a>
            </div>

            <div className="md:col-span-2 h-80 md:h-[400px] relative">
              <div className="absolute inset-0 bg-uiverse-green/10 z-10 pointer-events-none mix-blend-overlay" />
              <iframe
                src={siteConfig.googleMapsEmbed}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Event Location"
                className="w-full h-full filter grayscale-[0.5] contrast-[1.1] hover:grayscale-0 hover:contrast-100 transition-all duration-700 opacity-80 hover:opacity-100"
              />
              {/* Scanline effect */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(18,20,32,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 pointer-events-none bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20" />
            </div>
          </div>
        </UiverseCard>
      </div>
    </section>
  );
};

export default MapSection;
