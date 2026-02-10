import { Link } from "react-router-dom";
import { siteConfig } from "@/config/config";
import { motion } from "framer-motion";
import "./PassCard.css";
import { AlertTriangle } from "lucide-react";

interface SinglePassCardProps {
  type: "outer" | "inter" | "dept";
  price: number | string;
  label: string;
  linkTo: string;
}

const SinglePassCard = ({ type, price, label, linkTo }: SinglePassCardProps) => {
  const isInter = type === "inter";
  const isDept = type === "dept";

  return (
    <Link to={linkTo}>
      <div className="pass-card-container noselect">
        <div className="canvas">
          {[...Array(25)].map((_, i) => (
            <div key={i} className={`tracker tr-${i + 1}`} />
          ))}

          <div id="card" className={isInter ? "inter-college-card" : isDept ? "dept-college-card" : ""}>
            <div className="card-content">
              <div className="card-glare" />
              <div className="cyber-lines">
                <span /><span /><span /><span />
              </div>

              {/* College Type Badge */}
              <div className={`college-type-badge ${isInter ? 'inter' : isDept ? 'dept' : 'outer'}`}>
                {label}
              </div>

              <div className="price-top">{typeof price === 'number' ? `₹${price}` : price}</div>
              <p id="prompt">CLICK TO REGISTER</p>
              <div className={`title font-sync ${isInter ? 'inter-title' : isDept ? 'dept-title' : ''}`}>
                ONE DAY<br />PASS
              </div>
              <div className="glowing-elements">
                <div className={`glow-1 ${isInter ? 'glow-inter' : isDept ? 'glow-dept' : ''}`} />
                <div className={`glow-2 ${isInter ? 'glow-inter' : isDept ? 'glow-dept' : ''}`} />
                <div className={`glow-3 ${isInter ? 'glow-inter' : isDept ? 'glow-dept' : ''}`} />
              </div>
              <div className="subtitle">
                <span className="font-bold text-white tracking-widest uppercase mb-1">Includes</span>
                <span className="text-gray-300">Food & Hydrations</span>
                <span className="text-gray-300">{isDept ? "No Payment Required" : "Access to All Events"}</span>
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

      <div className="relative z-10 max-w-7xl mx-auto">
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

        {/* Triple Cards Container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-8 flex-wrap">
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

          {/* Divider 1 */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="text-white/40 text-sm font-medium">OR</span>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>

          {/* Inter College Card */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col items-center"
          >
            <SinglePassCard
              type="inter"
              price="FREE"
              label="OTHER DEPTS (Intra)"
              linkTo="/register-intercollege"
            />
          </motion.div>

          {/* Divider 2 */}
          <div className="hidden lg:flex flex-col items-center gap-4">
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <span className="text-white/40 text-sm font-medium">OR</span>
            <div className="w-px h-20 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
          </div>

          {/* Dept Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <SinglePassCard
              type="dept"
              price="FREE"
              label="AI&DS DEPT (Intra)"
              linkTo="/register-department"
            />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-center mt-12 bg-black/30 backdrop-blur-sm border border-white/5 rounded-xl p-6 max-w-3xl mx-auto"
      >
        <p className="text-xl md:text-2xl text-white font-bold mb-4 flex items-center justify-center gap-2">
          <span>⏰</span> Registration closes on <span className="text-uiverse-pink">{siteConfig.registrationCloseDate}</span>
        </p>

        <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4 text-left">
          <p className="text-gray-300 text-sm md:text-base leading-relaxed">
            <strong className="text-amber-400 block mb-1">📢 Ideathon, Startup Arena & ESPORTS (FREE FIRE):</strong>
            Submit PPT/register first → wait for "Selected" message → then pay & complete registration.
            <br />
            <span className="text-white/60 text-xs mt-2 block">
              (For all other events, you can register immediately using the passes above.)
            </span>
          </p>
        </div>

        {/* No Spot Registration Warning */}
        <div className="mt-4 bg-red-600/20 border border-red-500/50 rounded-lg p-3 text-center shadow-[0_0_20px_rgba(220,38,38,0.3)]">
          <p className="text-white font-bold text-lg tracking-wider uppercase flex items-center justify-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            NO ON-SPOT REGISTRATIONS
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </p>
        </div>
      </motion.div>
    </section>
  );
};


export default PassCard;
