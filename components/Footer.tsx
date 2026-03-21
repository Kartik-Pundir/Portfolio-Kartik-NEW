"use client";

import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t py-8 px-4" style={{ borderColor: "rgba(168,85,247,0.08)" }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-slate-500">
          © {new Date().getFullYear()}{" "}
          <span className="font-mono" style={{ color: "#a855f7" }}>
            Kartik Pundir
          </span>
          . All rights reserved.
        </p>

        <div className="flex items-center gap-3">
          {[
            { href: "mailto:Kartikpundir231@gmail.com", icon: <Mail size={16} />, label: "Email" },
            { href: "https://github.com/Kartik-Pundir", icon: <Github size={16} />, label: "GitHub" },
            { href: "https://www.linkedin.com/in/kartik-pundir816/", icon: <Linkedin size={16} />, label: "LinkedIn" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={link.label}
              className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-500 hover:text-primary transition-colors"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              {link.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
