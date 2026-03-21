"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle, AlertCircle, Zap } from "lucide-react";

const CONTACT_LINKS = [
  {
    icon: <Mail size={18} />,
    label: "Email",
    value: "Kartikpundir231@gmail.com",
    href: "mailto:Kartikpundir231@gmail.com",
  },
  {
    icon: <Github size={18} />,
    label: "GitHub",
    value: "github.com/Kartik-Pundir",
    href: "https://github.com/Kartik-Pundir",
  },
  {
    icon: <Linkedin size={18} />,
    label: "LinkedIn",
    value: "linkedin.com/in/kartik-pundir816",
    href: "https://www.linkedin.com/in/kartik-pundir816/",
  },
];

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className="section-padding relative">
      <div className="max-w-5xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white">Get In <span className="color-cycle">Touch</span></h2>
          <p className="text-slate-400 mt-3 text-sm max-w-md mx-auto">
            Have an opportunity or just want to say hi? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center p-8 rounded-2xl"
                style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.2)" }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{ background: "rgba(168,85,247,0.15)" }}>
                  <CheckCircle size={32} style={{ color: "#a855f7" }} />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Message Sent!</h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-1">
                  Thanks for reaching out, <span style={{ color: "#c084fc" }}>{form.name || "there"}</span>!
                </p>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">
                  I'll get back to you within 24 hours. Check your inbox — I've sent you a confirmation with my CV attached.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => { setStatus("idle"); setForm({ name: "", email: "", message: "" }); }}
                  className="px-5 py-2 rounded-full text-sm font-semibold border transition-all"
                  style={{ borderColor: "rgba(168,85,247,0.4)", color: "#a855f7" }}
                >
                  Send Another
                </motion.button>
              </motion.div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {[
                { id: "name", label: "Name", type: "text", placeholder: "Your name" },
                { id: "email", label: "Email", type: "email", placeholder: "your@email.com" },
              ].map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="block text-xs font-medium text-slate-400 mb-1.5">
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={form[field.id as "name" | "email"]}
                    onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all focus:ring-1"
                    style={{
                      background: "rgba(10,10,10,0.9)",
                      border: "1px solid rgba(168,85,247,0.15)",
                    }}
                    onFocus={(e) => (e.target.style.borderColor = "#a855f7")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(168,85,247,0.15)")}
                  />
                </div>
              ))}

              <div>
                <label htmlFor="message" className="block text-xs font-medium text-slate-400 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  placeholder="Tell me about the opportunity..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white placeholder-slate-600 outline-none transition-all resize-none"
                  style={{
                    background: "rgba(10,10,10,0.9)",
                    border: "1px solid rgba(168,85,247,0.15)",
                  }}
                  onFocus={(e) => (e.target.style.borderColor = "#a855f7")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(168,85,247,0.15)")}
                />
              </div>

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm p-3 rounded-xl text-red-400"
                  style={{ background: "rgba(239,68,68,0.1)" }}
                >
                  <AlertCircle size={16} />
                  {errorMsg}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={status === "loading"}
                whileHover={{ scale: status === "loading" ? 1 : 1.02 }}
                whileTap={{ scale: status === "loading" ? 1 : 0.98 }}
                className="w-full py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all disabled:opacity-60"
                style={{ background: "#a855f7", color: "#000" }}
              >
                {status === "loading" ? (
                  <>
                    <span className="w-4 h-4 border-2 border-[#000]/30 border-t-[#000] rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    Send Message
                  </>
                )}
              </motion.button>
            </form>
            )}
          </motion.div>

          {/* Right: links + quick response */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            {CONTACT_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 glass-card hover-lift rounded-xl group"
              >
                <div className="contact-icon w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors"
                  style={{ background: "rgba(168,85,247,0.1)", color: "#a855f7" }}>
                  {link.icon}
                </div>
                <div>
                  <p className="text-xs text-slate-500">{link.label}</p>
                  <p className="text-sm text-slate-300 group-hover:text-white transition-colors">{link.value}</p>
                </div>
              </motion.a>
            ))}

            {/* Quick response card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.6 }}
              className="p-4 rounded-xl"
              style={{ background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.15)" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} style={{ color: "#a855f7" }} />
                <span className="text-sm font-semibold text-white">Quick Response</span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                I typically respond within 24 hours. For urgent inquiries, feel free to reach out
                directly via email or LinkedIn.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
