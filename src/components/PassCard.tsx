import { Link } from "react-router-dom";
import { siteConfig } from "@/config/config";
import { motion } from "framer-motion";
import "./PassCard.css";

interface SinglePassCardProps {
  type: "outer" | "inter";
  price: number;
  label: string;
  linkTo: string;
}

const SinglePassCard = ({ type, price, label, linkTo }: SinglePassCardProps) => {
  const isInter = type === "inter";
  
  return (
    <Link to={linkTo}>
      <div className="pass-card-container noselect">
        <div className="canvas">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`tracker tr-${i + 1}`} />
          ))}

          <div id="card" className={isInter ? "inter-college-card" : ""}>
            <div className="card-content">
              <div className="card-glare" />
              <div className="cyber-lines">
                <span /><span /><span /><span />
              </div>
              
              {/* College Type Badge */}
              <div className={`college-type-badge ${isInter ? 'inter' : 'outer'}`}>
                {label}
              </div>
              
              <div className="price-top">₹{price}</div>
              <p id="prompt">CLICK TO REGISTER</p>
              <div className={`title font-sync ${isInter ? 'inter-title' : ''}`}>
                ONE DAY<br />PASS
              </div>
              <div className="glowing-elements">
                <div className={`glow-1 ${isInter ? 'glow-inter' : ''}`} />
                <div className={`glow-2 ${isInter ? 'glow-inter' : ''}`} />
                <div className={`glow-3 ${isInter ? 'glow-inter' : ''}`} />
              </div>
              <div className="subtitle">
                <span className="font-bold text-white tracking-widest uppercase mb-1">Includes</span>
                <span className="text-gray-300">Food & Refreshments</span>
                <span className="text-gray-300">Access to All Events</span>
                <span className="text-[10px] text-white/50 mt-1">*One Pass Per Person</span>
              </div>
              <div className="card-particles">
                <span /><span /><span /> <span /><span /><span />
              </div>
              <div className="corner-elements">
                <span /><span /><span /><span />
              </div>
              <div className="scan-line" />
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const PassCard = () => {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gradient-to-r from-uiverse-purple/20 to-uiverse-sky/20 blur-[100px] rounded-full z-0" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-uiverse-green text-sm tracking-[0.2em] uppercase mb-2 font-bold"
          >
            Get Access
          </motion.p>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]"
          >
            Event Passes
          </motion.h2>
        </div>

        {/* Dual Cards Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Outer College Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col items-center"
          >
            <SinglePassCard
              type="outer"
              price={siteConfig.passPrice}
              label="OUTER COLLEGE"
              linkTo="/register"
            />
          </motion.div>

          {/* Divider */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="text-white/40 text-sm font-medium">OR</span>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>
          
          {/* Mobile Divider */}
          <div className="flex lg:hidden items-center gap-4 w-full max-w-xs">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            <span className="text-white/40 text-sm font-medium">OR</span>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          </div>

          {/* Inter College Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <SinglePassCard
              type="inter"
              price={siteConfig.interCollegePassPrice}
              label="INTER COLLEGE"
              linkTo="/register-intercollege"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PassCard;
