"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Code2, Database, Cpu, Heart, Wrench, Globe, ExternalLink, Brain, Clock, Users, Lightbulb } from "lucide-react";
import Modal from "./Modal";

interface Skill {
  name: string;
  icon?: string;
  invert?: boolean;
  lucideIcon?: React.ReactNode;
}

interface Category {
  title: string;
  icon: React.ReactNode;
  skills: Skill[];
  tooltip: string;
}

const CATEGORIES: Category[] = [
  {
    title: "Languages",
    icon: <Code2 size={18} />,
    tooltip: "Core programming languages",
    skills: [
      { name: "C++", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
      { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
      { name: "PHP", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg" },
    ],
  },
  {
    title: "Frameworks",
    icon: <Globe size={18} />,
    tooltip: "Frontend & backend frameworks",
    skills: [
      { name: "React.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
      { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
      { name: "Express.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg", invert: true },
      { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg" },
    ],
  },
  {
    title: "Database",
    icon: <Database size={18} />,
    tooltip: "Database technologies",
    skills: [
      { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
      { name: "MySQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg" },
      { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    ],
  },
  {
    title: "Core CS",
    icon: <Cpu size={18} />,
    tooltip: "Computer Science fundamentals",
    skills: [
      { name: "DBMS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
      { name: "OS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
      { name: "OOPs", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg" },
      { name: "Networks", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
    ],
  },
  {
    title: "Soft Skills",
    icon: <Heart size={18} />,
    tooltip: "Professional & interpersonal skills",
    skills: [
      { name: "Critical Thinking", lucideIcon: <Brain size={13} /> },
      { name: "Time Management",   lucideIcon: <Clock size={13} /> },
      { name: "Leadership",        lucideIcon: <Users size={13} /> },
      { name: "Problem Solving",   lucideIcon: <Lightbulb size={13} /> },
    ],
  },
  {
    title: "Tools",
    icon: <Wrench size={18} />,
    tooltip: "Development tools & platforms",
    skills: [
      { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
      { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", invert: true },
      { name: "Postman", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" },
      { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
      { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    ],
  },
];

function CategoryCard({ cat, index, inView, className }: { cat: Category; index: number; inView: boolean; className?: string }) {
  const [tooltip, setTooltip] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className={`glass-card rounded-xl p-5 relative ${className ?? ""}`}
      onMouseEnter={() => setTooltip(true)}
      onMouseLeave={() => setTooltip(false)}
    >
          {tooltip && (
            <div className="absolute -top-9 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-lg text-xs text-white whitespace-nowrap z-10 pointer-events-none"
              style={{ background: "rgba(10,10,10,0.98)", border: "1px solid rgba(168,85,247,0.2)" }}>
              {cat.tooltip}
            </div>
          )}

      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center"
          style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
          {cat.icon}
        </div>
        <h3 className="text-sm font-bold text-white">{cat.title}</h3>
      </div>

      <div className="flex flex-wrap gap-2">
        {cat.skills.map((skill) => (
          <span key={skill.name} className="skill-badge">
            {skill.lucideIcon
              ? <span style={{ color: "#a855f7" }}>{skill.lucideIcon}</span>
              : skill.icon && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={skill.icon} alt={skill.name} width={14} height={14}
                  className={skill.invert ? "icon-invert" : ""}
                  style={{ width: 14, height: 14 }} />
              )
            }
            {skill.name}
          </span>
        ))}
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const [modalOpen, setModalOpen] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="skills" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white"><span className="color-cycle">Skills</span></h2>
        </motion.div>

        <div className="card-grid grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} index={i} inView={inView} className="card-item" />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
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
            View Detailed Skills
          </motion.button>
        </motion.div>
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Technical Skills">
        <div className="space-y-6">
          {CATEGORIES.map((cat) => (
            <div key={cat.title}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
                  {cat.icon}
                </div>
                <h3 className="text-sm font-bold text-white">{cat.title}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span key={skill.name} className="skill-badge">
                    {skill.lucideIcon
                      ? <span style={{ color: "#a855f7" }}>{skill.lucideIcon}</span>
                      : skill.icon && (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={skill.icon} alt={skill.name} width={14} height={14}
                          className={skill.invert ? "icon-invert" : ""}
                          style={{ width: 14, height: 14 }} />
                      )
                    }
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Modal>
    </section>
  );
}
