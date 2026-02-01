import { Link } from "react-router-dom";
import { siteConfig } from "@/config/config";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="py-12 px-4 border-t border-white/10 bg-black/80 backdrop-blur-md relative overflow-hidden">
      {/* Footer background glow */}
      <div className="absolute top-[-50%] left-1/2 -translate-x-1/2 w-full h-full bg-uiverse-purple/5 blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <h3 className="font-display text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple to-uiverse-pink mb-4">
              {siteConfig.eventName}
            </h3>
            <p className="text-gray-400 mb-6 leading-relaxed max-w-sm">
              A flagship technical symposium by the {siteConfig.departmentName}
            </p>
            <div className="text-gray-400 text-sm p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="font-bold text-white mb-1">{siteConfig.collegeName}</p>
              <p>{siteConfig.collegeLocation}</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-white text-lg">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "Events", path: "/events" },
                { name: "Coordinators", path: "/coordinators" },
                { name: "About Us", path: "/about" },
                { name: "Register", path: "/register" }
              ].map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="text-gray-400 hover:text-uiverse-sky transition-colors flex items-center gap-2 group">
                    <span className="w-1.5 h-1.5 rounded-full bg-uiverse-sky/50 group-hover:bg-uiverse-sky transition-colors" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-bold mb-6 text-white text-lg">Connect</h4>
            <ul className="space-y-3">
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href={siteConfig.instagramLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-uiverse-pink transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-uiverse-pink/50" />
                  Instagram
                </motion.a>
              </li>
              <li>
                <motion.a
                  whileHover={{ x: 5 }}
                  href={siteConfig.whatsappGroupLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-uiverse-green transition-colors flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-uiverse-green/50" />
                  WhatsApp Group
                </motion.a>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/50" />
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 text-center text-gray-500 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p>© {new Date().getFullYear()} {siteConfig.eventName}. All rights reserved.</p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-uiverse-green animate-pulse" />
            <p className="font-tech">{siteConfig.departmentName}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
