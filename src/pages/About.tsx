import { aboutUs } from "@/config/aboutus";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { UiverseCard } from "@/components/ui/UiverseCard";
import { motion } from "framer-motion";
import { GraduationCap, Target, Lightbulb, University, MapPin, Calendar, Users, Trophy, Rocket, BookOpen } from "lucide-react";

// Placeholder images from Unsplash for realistic feel
const IMAGES = {
  campus: "/images/college.jpg", // College building
  lab: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?q=80&w=2070&auto=format&fit=crop", // Computer lab/Tech
  seminar: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=2070&auto=format&fit=crop", // Seminar hall
  library: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=2070&auto=format&fit=crop", // Library
  hod: "/images/hod1.jpeg", // HOD photo
};

const About = () => {
  return (
    <div className="min-h-screen bg-transparent relative overflow-x-hidden">
      <Navbar />

      {/* Hero Section with Parallax Feel */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={IMAGES.campus}
            alt="Campus"
            className="w-full h-full object-cover opacity-30 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="px-4 py-1.5 rounded-full border border-uiverse-sky/30 bg-uiverse-sky/10 text-uiverse-sky text-sm font-bold uppercase tracking-[0.2em] mb-6 inline-block backdrop-blur-md">
              Discover Excellence
            </span>
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-uiverse-purple to-uiverse-sky">Siragu 26</span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-light">
              Siragu 26 isn’t just another symposium—it’s a celebration of our students’ drive, curiosity, and the friendships that make our department unique. Every year, our campus comes alive with the energy of new ideas, late-night project sessions, and the laughter of friends working together. This is where future engineers, data scientists, and innovators find their voice and build memories that last a lifetime.
            </p>
          </motion.div>
        </div>
      </section>

      <main className="relative z-10">

        {/* Stats Grid */}
        <section className="py-12 -mt-20 relative z-20 px-4">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Established", value: aboutUs.department.established, icon: University, color: "text-uiverse-purple" },
              { label: "Students", value: aboutUs.department.students + "+", icon: Users, color: "text-uiverse-sky" },
              { label: "Faculty", value: aboutUs.department.faculty + "+", icon: GraduationCap, color: "text-uiverse-pink" },
              { label: "Events", value: "15+", icon: Trophy, color: "text-orange-400" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black/80 border border-white/10 backdrop-blur-xl p-6 rounded-2xl text-center hover:border-white/20 transition-all shadow-xl"
              >
                <stat.icon className={`w-8 h-8 mx-auto mb-3 ${stat.color}`} />
                <h3 className="text-3xl font-bold text-white font-display mb-1">{stat.value}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-widest">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Department Section - Zig Zag Layout */}
        <section className="py-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative"
              >
                <div className="absolute -inset-4 bg-gradient-to-r from-uiverse-purple to-uiverse-sky opacity-20 blur-2xl rounded-3xl" />
                <img
                  src={IMAGES.lab}
                  alt="AI Laboratory"
                  className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -right-6 bg-black border border-white/10 p-4 rounded-xl shadow-xl max-w-xs backdrop-blur-md">
                  <p className="text-uiverse-sky font-bold text-sm mb-1">State-of-the-Art Labs</p>
                  <p className="text-gray-400 text-xs">Equipped with high-performance computing clusters for Deep Learning research.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                    <Rocket className="w-5 h-5 text-orange-500" />
                  </div>
                  <span className="text-orange-500 font-bold uppercase tracking-widest text-sm">Our Department</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
                  Department of <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">AI & Data Science</span>
                </h2>
                <p className="text-gray-300 leading-relaxed text-lg">
                  Our department is a close-knit community where students and faculty work side by side—whether it’s for a challenging hackathon, a research paper, or a spontaneous cricket match after class. Since 2022, we’ve grown not just in numbers, but in spirit. Our labs are always buzzing, and our students are known for their hands-on approach, tackling real-world problems and collaborating on projects that matter. We believe in learning by doing, and our alumni often return to share their journeys, inspiring the next batch to aim higher.
                </p>
                <ul className="space-y-4 pt-4">
                  {[
                    "Industry-aligned curriculum",
                    "Hands-on project experience",
                    "Research and Innovation focus",
                    "Expert faculty mentorship"
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-300">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center shrink-0">
                        <span className="text-green-500 text-xs">✓</span>
                      </div>
                      {item}
                    </li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Vision & Mission - Horizontal Cards */}
        <section className="py-20 px-4 bg-black/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <UiverseCard className="p-10 border-uiverse-sky/20 hover:border-uiverse-sky/40 transition-all bg-gradient-to-b from-uiverse-sky/5 to-transparent">
                <Lightbulb className="w-12 h-12 text-uiverse-sky mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4 font-display">Our Vision</h3>
                <p className="text-gray-300 leading-relaxed text-lg opacity-90">
                  {aboutUs.vision}
                </p>
              </UiverseCard>

              <UiverseCard className="p-10 border-uiverse-pink/20 hover:border-uiverse-pink/40 transition-all bg-gradient-to-b from-uiverse-pink/5 to-transparent">
                <Target className="w-12 h-12 text-uiverse-pink mb-6" />
                <h3 className="text-3xl font-bold text-white mb-4 font-display">Our Mission</h3>
                <ul className="space-y-4">
                  {aboutUs.mission.slice(0, 4).map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-uiverse-pink shrink-0" />
                      <span className="opacity-90">{m}</span>
                    </li>
                  ))}
                </ul>
              </UiverseCard>
            </div>
          </div>
        </section>

        {/* HOD's Message - Adding Realism */}
        <section className="py-20 px-4">
          <div className="max-w-5xl mx-auto bg-gradient-to-r from-uiverse-purple/10 to-transparent border border-white/10 rounded-3xl p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 bg-uiverse-purple/20 blur-[100px] rounded-full -mr-20 -mt-20" />

            <div className="relative z-10 flex flex-col md:flex-row gap-10 items-center">
              <div className="shrink-0">
                <div className="w-48 h-48 rounded-full border-4 border-white/10 p-1 relative">
                  <img
                    src={IMAGES.hod}
                    alt="Head of Department"
                    className="w-full h-full rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />
                  <div className="absolute bottom-2 right-2 w-10 h-10 bg-uiverse-purple rounded-full flex items-center justify-center border-4 border-black">
                    <BookOpen className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-2xl font-bold text-white mb-1">From the HOD's Desk</h3>
                <p className="text-uiverse-purple font-bold text-sm uppercase tracking-wider mb-6">Dr. Expert Name, Ph.D.</p>
                <p className="text-gray-300 italic text-lg leading-relaxed">
                  "Every year, Siragu is a reminder of what our students can achieve when they work together. It’s not just about winning competitions—it’s about the friendships, the late-night brainstorming, and the pride we feel watching our students grow into confident, creative professionals. We look forward to welcoming you to our campus and sharing this experience with you."
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* College Section - Reverse Zig Zag */}
        <section className="py-20 px-4 mb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="space-y-6 order-2 lg:order-1"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <University className="w-5 h-5 text-green-500" />
                  </div>
                  <span className="text-green-500 font-bold uppercase tracking-widest text-sm">Our Campus</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold font-display text-white">
                  VSB College of <br />Engineering
                </h2>
                <div className="flex gap-4 mb-4">
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">{aboutUs.college.location}</span>
                  </div>
                  <div className="px-4 py-2 bg-white/5 rounded-lg border border-white/10 flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-yellow-400" />
                    <span className="text-sm text-gray-300">Est. {aboutUs.college.established}</span>
                  </div>
                </div>
                <p className="text-gray-300 leading-relaxed text-lg mb-6">
                  VSB College of Engineering Technical Campus is more than a collection of buildings—it’s a place where students from all backgrounds come together to learn, grow, and make lifelong friends. Our campus is always alive with activity, from technical fests to cultural nights, and our faculty are mentors who genuinely care about each student’s journey. We’re proud of our legacy, but even prouder of the community we’ve built together.
                </p>

                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-uiverse-sky font-bold uppercase text-xs tracking-wider mb-2">College Vision</h4>
                    <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-uiverse-sky/30 pl-3">
                      {aboutUs.college.vision}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-uiverse-pink font-bold uppercase text-xs tracking-wider mb-2">College Mission</h4>
                    <p className="text-gray-400 text-sm leading-relaxed border-l-2 border-uiverse-pink/30 pl-3">
                      {aboutUs.college.mission}
                    </p>
                  </div>
                </div>

                <p className="text-gray-300 leading-relaxed text-lg">
                  With accreditation from top bodies and a sprawling green campus, VSB offering a vibrant ecosystem for holistic development.
                </p>
                <div className="pt-4">
                  <a href="https://vsbcetc.edu.in" target="_blank" rel="noreferrer" className="text-white border-b border-white pb-1 hover:text-uiverse-sky hover:border-uiverse-sky transition-colors">
                    Visit Official Website &rarr;
                  </a>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                className="relative order-1 lg:order-2"
              >
                <div className="absolute -inset-4 bg-gradient-to-l from-green-500 to-blue-500 opacity-20 blur-2xl rounded-3xl" />
                <img
                  src={IMAGES.library}
                  alt="College Library"
                  className="relative rounded-3xl border border-white/10 shadow-2xl w-full h-[400px] object-cover"
                />
                <div className="absolute -bottom-6 -left-6 bg-black border border-white/10 p-4 rounded-xl shadow-xl max-w-xs backdrop-blur-md z-20">
                  <p className="text-green-400 font-bold text-sm mb-1">World-Class Infrastructure</p>
                  <p className="text-gray-400 text-xs">Library, Hostels, Sports Complex and more.</p>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default About;
