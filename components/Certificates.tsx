"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

const CERTIFICATES = [
  {
    title: "The Bits and Bytes of Computer Networking",
    issuer: "Google",
    platform: "Coursera",
    date: "Sep 2024",
    link: "https://coursera.org/verify/QVGCMOEQFND1",
    color: "#4285F4",
    initial: "G",
  },
  {
    title: "Introduction to Hardware and Operating Systems",
    issuer: "IBM",
    platform: "Coursera",
    date: "Sep 2024",
    link: "https://coursera.org/verify/M98RPOBQLDSE",
    color: "#1F70C1",
    initial: "IBM",
  },
  {
    title: "Privacy and Security in Online Social Media",
    issuer: "NPTEL",
    platform: "SWAYAM · IIT Madras",
    date: "Jan–Apr 2025",
    link: "https://archive.nptel.ac.in/content/noc/NOC25/SEM1/Ecertificates/106/noc25-cs79/Course/NPTEL25CS79S24750148904482018.pdf",
    color: "#f59e0b",
    initial: "NP",
  },
  {
    title: "C++ Programming: OOPs and DSA",
    issuer: "CSE Pathshala",
    platform: "Live Summer Training · 35+ hrs",
    date: "Aug 2025",
    link: null,
    color: "#a855f7",
    initial: "CP",
  },
];

export default function Certificates() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="certificates" className="section-padding relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            <span className="color-cycle">Certificates</span>
          </h2>
          <p className="text-sm mt-2" style={{ color: "#6b5f75" }}>Verified learning achievements</p>
        </motion.div>

        <div className="card-grid grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {CERTIFICATES.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 * i, duration: 0.5 }}
              className="card-item glass-card rounded-xl p-5 flex flex-col gap-4 group"
            >
              {/* Icon */}
              <div className="flex items-start justify-between">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{ background: `${cert.color}18`, border: `1px solid ${cert.color}40`, color: cert.color }}
                >
                  {cert.initial}
                </div>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-600 hover:text-purple-400 transition-colors mt-1"
                    title="Verify Certificate"
                  >
                    <ExternalLink size={15} />
                  </a>
                ) : (
                  <Award size={15} className="text-slate-700 mt-1" />
                )}
              </div>

              {/* Content */}
              <div className="flex-1">
                <h3 className="text-sm font-semibold text-white leading-snug mb-1 group-hover:text-purple-400 transition-colors">
                  {cert.title}
                </h3>
                <p className="text-xs font-medium mb-0.5" style={{ color: cert.color }}>
                  {cert.issuer}
                </p>
                <p className="text-xs" style={{ color: "#6b5f75" }}>{cert.platform}</p>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "rgba(168,85,247,0.08)" }}>
                <span className="text-xs font-mono" style={{ color: "#4a4055" }}>{cert.date}</span>
                {cert.link ? (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold px-2.5 py-1 rounded-full transition-all"
                    style={{ background: "rgba(168,85,247,0.08)", color: "#a855f7", border: "1px solid rgba(168,85,247,0.2)" }}
                  >
                    Verify ↗
                  </a>
                ) : (
                  <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: "rgba(168,85,247,0.05)", color: "#64748b", border: "1px solid rgba(168,85,247,0.1)" }}>
                    Offline
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
