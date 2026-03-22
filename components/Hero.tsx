"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const TYPING_TEXTS = [
  "Full Stack Developer",
  "React.js Developer",
  "Node.js Developer",
  "Problem Solver",
  "Open to Work",
];

function TypingText() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = TYPING_TEXTS[index];
    let t: ReturnType<typeof setTimeout>;
    if (!deleting && displayed.length < current.length)
      t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    else if (!deleting && displayed.length === current.length)
      t = setTimeout(() => setDeleting(true), 1800);
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    else { setDeleting(false); setIndex(i => (i + 1) % TYPING_TEXTS.length); }
    return () => clearTimeout(t);
  }, [displayed, deleting, index]);

  return (
    <span className="font-mono typing-cursor" style={{ color: "#a855f7" }}>
      {displayed}
    </span>
  );
}

const scrollTo = (href: string) =>
  document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{ background: "#000" }}
    >
      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full">
        <div className="flex flex-col-reverse md:flex-row items-center gap-10 md:gap-16 -mt-10">

          {/* LEFT — text */}
          <div className="flex-1 text-left">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-sm font-mono mb-3 tracking-widest uppercase"
              style={{ color: "#a855f7" }}
            >
              Welcome !
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-2 leading-tight"
            >
              I AM{" "}
              <span className="color-cycle">KARTIK</span>{" "}
              <span className="text-white">PUNDIR</span>
            </motion.h1>

            {/* Available badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium mb-5"
              style={{
                border: "1px solid rgba(168,85,247,0.4)",
                background: "rgba(168,85,247,0.08)",
                color: "#c084fc",
              }}
            >
              <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#a855f7" }} />
              Available for Internships / Full-time
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-lg sm:text-xl font-semibold mb-4"
            >
              <TypingText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="text-sm sm:text-base max-w-lg mb-8 leading-relaxed" style={{ color: "#9d8faa" }}
            >
              Passionate about building scalable full-stack web applications with React.js,
              Node.js, and modern technologies. Currently pursuing B.Tech at LPU.
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 }}
              className="flex flex-wrap gap-3 mb-8"
            >
              <motion.a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2.5 rounded-full font-semibold text-sm flex items-center gap-2 transition-all"
                style={{ background: "#a855f7", color: "#000" }}
              >
                <Download size={15} />
                Resume
              </motion.a>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollTo("#projects")}
                className="px-6 py-2.5 rounded-full font-semibold text-sm border transition-all"
                style={{ borderColor: "rgba(168,85,247,0.4)", color: "#c084fc" }}
              >
                View Projects
              </motion.button>
            </motion.div>

            {/* Social icons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex items-center gap-5"
            >
              {[
                { href: "https://github.com/Kartik-Pundir", icon: <Github size={20} /> },
                { href: "https://www.linkedin.com/in/kartik-pundir816/", icon: <Linkedin size={20} /> },
                { href: "mailto:Kartikpundir231@gmail.com", icon: <Mail size={20} /> },
              ].map((s, i) => (
                <motion.a
                  key={i}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, color: "#a855f7" }}
                  className="text-slate-500 hover:text-purple-400 transition-colors"
                >
                  {s.icon}
                </motion.a>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — large photo, no border, fades into black at bottom */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="flex-shrink-0 relative"
            style={{ width: 340, height: 480 }}
          >
            <div
              className="profile-photo-wrap w-full h-full"
              style={{ borderRadius: 0, border: "none", boxShadow: "none" }}
            >
              <Image
                src="/images/profile.jpg"
                alt="Kartik Pundir"
                fill
                className="bw object-cover object-top"
                style={{ borderRadius: 0 }}
                priority
              />
              {/* Fade into black at bottom */}
              <div
                className="absolute bottom-0 left-0 right-0 pointer-events-none"
                style={{
                  height: "45%",
                  background: "linear-gradient(to top, #000 0%, transparent 100%)",
                }}
              />
              {/* Fade into black on sides */}
              <div
                className="absolute inset-y-0 left-0 pointer-events-none"
                style={{ width: "15%", background: "linear-gradient(to right, #000, transparent)" }}
              />
              <div
                className="absolute inset-y-0 right-0 pointer-events-none"
                style={{ width: "15%", background: "linear-gradient(to left, #000, transparent)" }}
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
