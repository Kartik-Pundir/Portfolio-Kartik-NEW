"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { GraduationCap, Code2, BookOpen, Trophy, Briefcase, ExternalLink } from "lucide-react";
import Modal from "./Modal";

const TIMELINE = [
  {
    icon: <GraduationCap size={18} />,
    title: "Computer Science Student",
    org: "Lovely Professional University",
    period: "2023 – Present",
    desc: "Pursuing B.Tech in Computer Science with a CGPA of 6.9. Building a strong foundation in algorithms, data structures, operating systems, DBMS, and computer networks.",
    tags: ["B.Tech CSE", "CGPA: 6.9", "LPU"],
  },
  {
    icon: <Code2 size={18} />,
    title: "Full Stack Development",
    org: "Self Learning",
    period: "2023 – Present",
    desc: "Self-taught the MERN stack through projects, documentation, and online resources. Built multiple full-stack applications including a car loan system and data management platform.",
    tags: ["React.js", "Node.js", "MongoDB", "Express.js"],
  },
  {
    icon: <BookOpen size={18} />,
    title: "OOPs & DSA Training",
    org: "CSE Path Shala",
    period: "Jul – Aug 2025",
    desc: "Completed an intensive training program focused on Object-Oriented Programming concepts and Data Structures & Algorithms using C++. Strengthened problem-solving and coding interview skills.",
    tags: ["C++", "OOPs", "DSA", "Algorithms"],
  },
  {
    icon: <Trophy size={18} />,
    title: "LeetCode Achievements",
    org: "Competitive Programming",
    period: "2025",
    desc: "Achieved Global Rank 1021 in LeetCode Weekly Contest 464 among 10,000+ participants. Solved 100+ DSA problems. Ranked 13th out of 100 in Code-A-Haunt Hackathon.",
    tags: ["Global Rank 1021", "100+ Problems", "Hackathon"],
  },
  {
    icon: <Briefcase size={18} />,
    title: "Seeking Internship",
    org: "Open to Opportunities",
    period: "Now",
    desc: "Actively looking for internship roles in Full Stack Development, React.js, or Node.js. Ready to contribute to real-world projects and grow within a professional team.",
    tags: ["Full Stack", "React.js", "Node.js", "Open to Work"],
    highlight: true,
  },
];

export default function Experience() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="section-padding relative" style={{ background: 'transparent' }}>
      <div className="max-w-4xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white"><span className="color-cycle">Experience</span></h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px origin-top"
            style={{
              background: "linear-gradient(to bottom, #a855f7, rgba(168,85,247,0.1))",
            }}
          />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => {
              const isLeft = i % 2 === 0;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.15 * i, duration: 0.5 }}
                  className={`relative flex items-start gap-4 md:gap-0 ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 z-10 mt-5"
                    style={{
                      background: item.highlight ? "#a855f7" : "#0a0a0a",
                      borderColor: "#a855f7",
                      boxShadow: item.highlight ? "0 0 12px rgba(168,85,247,0.5)" : "none",
                    }}
                  >
                    {item.highlight && (
                      <span className="absolute inset-0 rounded-full animate-ping opacity-40"
                        style={{ background: "#a855f7" }} />
                    )}
                  </div>

                  {/* Card */}
                  <div className={`ml-10 md:ml-0 md:w-[calc(50%-2rem)] ${isLeft ? "md:mr-auto md:pr-8" : "md:ml-auto md:pl-8"}`}>
                    <div className={`glass-card hover-lift rounded-xl p-4 ${item.highlight ? "border-primary/30" : ""}`}
                      style={item.highlight ? { borderColor: "rgba(168,85,247,0.3)" } : {}}>
                      <div className="flex items-start gap-3 mb-2">
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                          style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">{item.title}</h3>
                          <p className="text-xs" style={{ color: "#6b5f75" }}>{item.org}</p>
                        </div>
                        <span className="ml-auto text-xs font-mono px-2 py-0.5 rounded-full flex-shrink-0"
                          style={{ background: "rgba(168,85,247,0.08)", color: "#a855f7" }}>
                          {item.period}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed mb-3" style={{ color: "#9d8faa" }}>{item.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {item.tags.map((t) => (
                          <span key={t} className="skill-badge">{t}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 mx-auto text-sm font-semibold px-5 py-2.5 rounded-full border transition-all"
            style={{ borderColor: "#a855f7", color: "#a855f7" }}
          >
            <ExternalLink size={15} />
            View Full Journey
          </motion.button>
        </motion.div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="My Journey">
        <div className="space-y-6">
          {TIMELINE.map((item) => (
            <div key={item.title} className="glass-card rounded-xl p-4 space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <p className="text-xs" style={{ color: "#6b5f75" }}>{item.org} · {item.period}</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#9d8faa" }}>{item.desc}</p>
              <div className="flex flex-wrap gap-1.5">
                {item.tags.map((t) => (
                  <span key={t} className="skill-badge">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </section>
  );
}
