"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Github, Trophy, Code2, ExternalLink } from "lucide-react";
import Image from "next/image";

const PROJECTS = [
  {
    title: "CS Smart",
    subtitle: "Web Based Car Loan System",
    desc: "A full-stack fintech platform to manage loan services, leads, applications, and appointments. Built with JWT authentication, admin dashboard, automated email notifications, and capable of handling 100+ concurrent users efficiently.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Kartik-Pundir/cs-smart-finserve",
    image: "/images/projects/cs-smart.png",
  },
  {
    title: "NextGen Code Analyzer",
    subtitle: "AI Code Analysis Platform",
    desc: "An AI-powered platform to review, optimize, and detect issues in source code. Built an AST-based analysis engine improving code efficiency by 20%. Integrated third-party API for AI-based real-time suggestions. Handles 30+ concurrent users.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS"],
    github: "https://github.com/Kartik-Pundir",
    image: "/images/projects/nextgen.svg",
  },
  {
    title: "Data Banker",
    subtitle: "Web Based Data Management System",
    desc: "A web-based system to manage structured market data, improving accessibility and reliability. Managed 50+ data records with full CRUD operations and validation checks. Implemented search and filtering features for faster data retrieval.",
    tech: ["HTML", "Tailwind CSS", "JavaScript", "PHP"],
    github: "https://github.com/Kartik-Pundir/Data-Bank-Manager",
    image: "/images/projects/data-banker.svg",
  },
];

const ACHIEVEMENTS = [
  { icon: <Trophy size={16} />, text: "Global Rank 1021 in LeetCode Weekly Contest 464 among 10,000+ participants" },
  { icon: <Code2 size={16} />, text: "Solved 100+ DSA problems on LeetCode" },
  { icon: <Trophy size={16} />, text: "13th rank out of 100 in Code-A-Haunt Hackathon" },
];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" className="section-padding relative" style={{ background: "transparent" }}>
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white"><span className="color-cycle">Projects</span></h2>
          <p className="text-sm mt-2" style={{ color: "#6b5f75" }}>Things I&apos;ve built</p>
        </motion.div>

        <div className="projects-grid grid md:grid-cols-3 gap-6 mb-8">
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="project-card glass-card rounded-xl overflow-hidden flex flex-col group relative"
            >
              {/* Project image — B&W to color on hover */}
              <div
                className="card-img-wrap h-44 relative flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #111, #1a0a2e)" }}
              >
                {/* Fallback label (behind image) */}
                <span className="font-mono text-2xl font-bold select-none" style={{ color: "rgba(168,85,247,0.3)" }}>
                  {p.title.slice(0, 2).toUpperCase()}
                </span>
                {/* Actual image on top */}
                <Image
                  src={p.image}
                  alt={p.title}
                  fill
                  className="object-cover absolute inset-0"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-all duration-500" />
                {/* GitHub button on hover */}
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white"
                    style={{ background: "rgba(168,85,247,0.8)" }}
                  >
                    <Github size={14} />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-1">
                  <h3 className="text-base font-bold text-white group-hover:text-purple-400 transition-colors">
                    {p.title}
                  </h3>
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-500 hover:text-purple-400 transition-colors ml-2 flex-shrink-0"
                  >
                    <ExternalLink size={15} />
                  </a>
                </div>
                <p className="text-xs mb-3" style={{ color: "#a855f7" }}>{p.subtitle}</p>
                <p className="text-xs leading-relaxed mb-4 flex-1" style={{ color: "#9d8faa" }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span key={t} className="skill-badge">{t}</span>
                  ))}
                </div>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-lg border transition-all w-fit"
                  style={{ borderColor: "rgba(168,85,247,0.3)", color: "#c084fc" }}
                >
                  <Github size={13} />
                  GitHub
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Achievements */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="glass-card rounded-xl p-6"
          style={{ borderColor: "rgba(168,85,247,0.2)" }}
        >
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center"
              style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
              <Trophy size={18} />
            </div>
            <h3 className="text-base font-bold text-white">DSA & Achievements</h3>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {ACHIEVEMENTS.map((a, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="flex items-start gap-3 p-3 rounded-lg"
                style={{ background: "rgba(168,85,247,0.05)", border: "1px solid rgba(168,85,247,0.1)" }}
              >
                <span style={{ color: "#a855f7" }} className="mt-0.5 flex-shrink-0">{a.icon}</span>
                <p className="text-xs leading-relaxed" style={{ color: "#c4b5d4" }}>{a.text}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
