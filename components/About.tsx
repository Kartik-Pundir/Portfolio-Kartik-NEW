"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Layers, TrendingUp, ExternalLink } from "lucide-react";
import Modal from "./Modal";

const HIGHLIGHTS = [
  {
    icon: <Layers size={20} />,
    title: "Frontend & Backend",
    desc: "Building end-to-end web apps with React, Node.js, and Express",
  },
  {
    icon: <Brain size={20} />,
    title: "DSA & C++",
    desc: "100+ LeetCode problems solved, strong algorithmic foundation",
  },
  {
    icon: <Code2 size={20} />,
    title: "Full Stack Apps",
    desc: "Real-world projects with MongoDB, MySQL, REST APIs",
  },
  {
    icon: <TrendingUp size={20} />,
    title: "Continuous Growth",
    desc: "Always learning — currently exploring cloud and DevOps",
  },
];

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">About <span className="color-cycle">Me</span></h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10 items-start">
          {/* Left: text */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-4 text-slate-400 leading-relaxed"
          >
            <p>
              Hey, I&apos;m <span className="text-white font-semibold">Kartik Pundir</span> — a
              passionate Full Stack Developer and Computer Science student at{" "}
              <span className="text-primary" style={{ color: "#a855f7" }}>
                Lovely Professional University
              </span>
              .
            </p>
            <p>
              I love building things for the web — from pixel-perfect UIs to robust backend APIs.
              My stack revolves around React.js, Node.js, Express, and MongoDB, and I&apos;m
              constantly expanding into new technologies.
            </p>
            <p>
              Beyond coding, I&apos;m deeply invested in Data Structures & Algorithms, having
              solved 100+ problems on LeetCode and achieved a{" "}
              <span className="text-white">Global Rank 1021</span> in LeetCode Weekly Contest 464.
            </p>
            <p>
              I&apos;m currently seeking internship opportunities where I can contribute, learn,
              and grow alongside a talented team.
            </p>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setModalOpen(true)}
              className="mt-2 flex items-center gap-2 text-sm font-semibold px-5 py-2.5 rounded-full border transition-all"
              style={{
                borderColor: "#a855f7",
                color: "#a855f7",
              }}
            >
              <ExternalLink size={15} />
              Learn More About Me
            </motion.button>
          </motion.div>

          {/* Right: highlight cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="card-grid grid grid-cols-2 gap-4"
          >
            {HIGHLIGHTS.map((h, i) => (
              <motion.div
                key={h.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="card-item glass-card rounded-xl p-4 space-y-2"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}
                >
                  {h.icon}
                </div>
                <h3 className="text-sm font-semibold text-white">{h.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{h.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* About Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="About Me">
        <div className="space-y-5 text-slate-400 leading-relaxed text-sm">
          <p>
            I&apos;m a Computer Science student at Lovely Professional University (2023–Present)
            with a CGPA of 6.9, passionate about building full-stack web applications that solve
            real problems.
          </p>
          <p>
            My journey into programming started with C++ and DSA, which gave me a strong
            algorithmic foundation. I then moved into web development, mastering the MERN stack
            (MongoDB, Express, React, Node.js) and building several production-ready projects.
          </p>
          <p>
            I completed an intensive OOPs & DSA training at CSE Path Shala (Jul–Aug 2025), which
            sharpened my problem-solving skills significantly. I&apos;ve solved 100+ problems on
            LeetCode and ranked 1021st globally in Weekly Contest 464 among 10,000+ participants.
          </p>
          <p>
            My goal is to join a forward-thinking team as an intern where I can apply my skills,
            contribute meaningfully, and continue growing as a developer. I&apos;m particularly
            interested in roles involving React, Node.js, or full-stack development.
          </p>
          <div className="grid grid-cols-2 gap-3 pt-2">
            {[
              ["University", "Lovely Professional University"],
              ["CGPA", "6.9"],
              ["Batch", "2023–Present"],
              ["Location", "India"],
              ["Email", "Kartikpundir231@gmail.com"],
              ["Status", "Open to Internships"],
            ].map(([k, v]) => (
              <div key={k} className="glass-card rounded-lg p-3">
                <p className="text-xs text-slate-500 mb-0.5">{k}</p>
                <p className="text-sm text-white font-medium">{v}</p>
              </div>
            ))}
          </div>
        </div>
      </Modal>
    </section>
  );
}
