import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "@/config/config";
import { Menu, X, ChevronRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Events", path: "/events" },
  { name: "Coordinators", path: "/coordinators" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact Us", path: "/contact" },
  { name: "About Us", path: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);

  // Continuous blur value based on scroll (max 16px blur)
  const blurAmount = useTransform(scrollY, [0, 100], ["blur(0px)", "blur(16px)"]);
  const bgOpacity = useTransform(scrollY, [0, 100], ["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.6)"]);
  const borderOpacity = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.05)", "rgba(255, 255, 255, 0.1)"]);
  const widthPercentage = useTransform(scrollY, [0, 100], ["95%", "80%"]);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      <motion.nav
        style={{ width: widthPercentage }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 max-w-4xl"
      >
        {/* Desktop Navigation */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.3 }}
          style={{
            backdropFilter: blurAmount,
            backgroundColor: bgOpacity,
            borderColor: borderOpacity
          }}
          className="hidden md:flex items-center justify-between border rounded-full px-2 py-2 shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300"
        >
          {/* Logo or Brand for Desktop if needed, simplified to just links and brand maybe? 
              The previous code didn't have a logo in desktop view, just links. 
              Refining to add a small brand indicator if scrolled, or just centering the links.
              I will stick to the previous layout but enhanced.
          */}

          <div className="flex items-center justify-center w-full relative">
            {/* Small Brand on Left if scrolled could be cool, keeping it simple for now */}

            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                title={link.name}
                className="relative px-6 py-2 rounded-full transition-colors group"
              >
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-r from-uiverse-purple/40 to-uiverse-sky/40 rounded-full box-border"
                    style={{
                      boxShadow: "0 0 20px rgba(139, 92, 246, 0.3)"
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className={`relative z-10 text-sm font-medium transition-colors duration-300 ${location.pathname === link.path ? "text-white" : "text-gray-400 group-hover:text-white"
                  }`}>
                  {link.name}
                </span>

                {/* Hover Scale & Glow Effect */}
                <motion.div
                  className="absolute inset-0 rounded-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  layoutId="hoverTab"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              </Link>
            ))}

            {/* Download Brochure Button */}
            <a
              href={siteConfig.brochureLink}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4"
              title="Download Event Brochure"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-5 py-2 bg-transparent text-white border border-uiverse-green/30 rounded-full font-bold text-sm group"
              >
                <span className="absolute inset-0 bg-uiverse-green/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 text-uiverse-green group-hover:text-white transition-colors duration-300">Brochure</span>
              </motion.button>
            </a>

            <Link to="/register" className="ml-2" title="Register for VYUGA 26">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative overflow-hidden px-6 py-2 bg-transparent text-white border border-uiverse-sky/30 rounded-full font-bold text-sm group"
              >
                <span className="absolute inset-0 bg-uiverse-sky/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative z-10 text-uiverse-sky group-hover:text-white transition-colors duration-300 shadow-[0_0_15px_rgba(18,184,255,0.2)]">Register</span>
              </motion.button>
            </Link>
          </div>
        </motion.div>

        {/* Mobile Navigation Header */}
        <motion.div
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          style={{
            backdropFilter: blurAmount,
            backgroundColor: bgOpacity,
            borderColor: borderOpacity
          }}
          className="md:hidden border rounded-full px-6 py-3 flex items-center justify-between overflow-hidden"
        >
          <span className="font-sync text-lg font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple to-uiverse-sky">VYUGA 26</span>
          <button
            onClick={() => setIsOpen(true)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors text-white relative active:scale-90 duration-200"
          >
            <Menu className="w-5 h-5" />
          </button>
        </motion.div>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-[#0a0a0a] border-l border-white/10 z-[70] p-6 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-10">
                <span className="font-sync text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-uiverse-purple to-uiverse-sky">Menu</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col space-y-2">
                {navLinks.map((link, index) => (
                  <motion.div
                    key={link.path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                  >
                    <Link
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`group flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${location.pathname === link.path
                        ? "bg-white/10 border border-white/10"
                        : "hover:bg-white/5 border border-transparent"
                        }`}
                    >
                      <span className={`text-lg font-medium ${location.pathname === link.path ? "text-white" : "text-gray-400 group-hover:text-white"
                        }`}>
                        {link.name}
                      </span>
                      <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${location.pathname === link.path ? "text-uiverse-sky translate-x-1" : "text-gray-600 group-hover:text-gray-300"
                        }`} />
                    </Link>
                  </motion.div>
                ))}

                {/* Download Brochure - Mobile */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + navLinks.length * 0.05 }}
                  className="pt-4"
                >
                  <a
                    href={siteConfig.brochureLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="w-full py-4 bg-uiverse-green/20 border border-uiverse-green/40 text-uiverse-green font-bold rounded-xl active:scale-95 transition-transform duration-200">
                      Download Brochure
                    </button>
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + navLinks.length * 0.05 }}
                  className="pt-2"
                >
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <button className="w-full py-4 bg-gradient-to-r from-uiverse-purple to-uiverse-sky text-white font-bold rounded-xl shadow-lg shadow-uiverse-purple/20 active:scale-95 transition-transform duration-200">
                      Register Now
                    </button>
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
