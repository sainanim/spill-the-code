"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Code, Calculator, BookOpen, Cpu, Clock, Calendar, CalendarDays, Mail, Globe } from "lucide-react";

const subjects = [
  {
    icon: <Code className="w-7 h-7" />,
    title: "Coding & AI",
    description: "Build real projects and explore the future of technology. Students learn Python, web development, and dive into machine learning and AI applications.",
    color: "#1976D2",
    bg: "#E3F2FD",
  },
  {
    icon: <Cpu className="w-7 h-7" />,
    title: "Robotics",
    description: "Design, build, and program robots. From basic mechanics to autonomous systems, students bring their ideas to life.",
    color: "#E91E63",
    bg: "#FCE4EC",
  },
  {
    icon: <Globe className="w-7 h-7" />,
    title: "French",
    description: "Discover the French language through immersive activities, conversation practice, and cultural exploration in a fun, engaging environment.",
    color: "#0097A7",
    bg: "#E0F7FA",
  },
  {
    icon: <Calculator className="w-7 h-7" />,
    title: "Mathematics",
    description: "Strengthen core math skills through engaging, tech-integrated lessons that make numbers click.",
    color: "#F59E0B",
    bg: "#FEF3C7",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "English",
    description: "Sharpen reading, writing, and communication skills with creative projects that build real confidence.",
    color: "#10B981",
    bg: "#D1FAE5",
  },
];

const pricing = [
  {
    label: "Hourly",
    price: "$20",
    unit: "/ hour",
    description: "Pay as you go — perfect for trying us out.",
    highlight: false,
    halfDay: null as null | { price: string; detail: string },
    fullDay: null as null | { price: string; detail: string },
    promo: null as string | null,
  },
  {
    label: "Daily",
    price: "$75",
    unit: "/ day",
    description: "A full day of focused learning — 8 hours of hands-on instruction.",
    highlight: false,
    halfDay: null as null | { price: string; detail: string },
    fullDay: null as null | { price: string; detail: string },
    promo: null as string | null,
  },
  {
    label: "Weekly",
    price: null,
    unit: null,
    description: "5 days — the most popular choice for the summer.",
    highlight: false,
    halfDay: { price: "$200", detail: "Half Day" },
    fullDay: { price: "$300", detail: "Full Day" },
    promo: null as string | null,
  },
  {
    label: "Monthly",
    price: null,
    unit: null,
    description: "4 weeks of continuous growth, progress, and fun.",
    highlight: true,
    halfDay: { price: "$800", detail: "Half Day" },
    fullDay: { price: "$1,200", detail: "Full Day" },
    promo: "Get 10% off if you sign up for the monthly schedule today!",
  },
];

const scheduleFeatures = [
  { icon: <Clock className="w-4 h-4" />, text: "Morning & afternoon sessions available" },
  { icon: <Calendar className="w-4 h-4" />, text: "Drop-in hourly options for busy schedules" },
  { icon: <CalendarDays className="w-4 h-4" />, text: "Running all summer — enroll anytime" },
  { icon: <Mail className="w-4 h-4" />, text: "Email us to build a custom schedule" },
];

export default function SummerCampsPage() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    try {
      const res = await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          message: formData.message || "I am interested in enrolling my child in Summer Camps.",
          course: "Summer Camps",
        }),
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="bg-[var(--background-primary)] min-h-screen">

      {/* Hero */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <span className="inline-block bg-[#FFC000]/20 text-[#1976D2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-[#FFC000]/40">
              Summer 2026
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-[#1976D2] mb-6 leading-tight">
              Summer Camps
            </h1>
            <p className="text-slate-600 text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed">
              Give your child an unforgettable summer filled with creativity, discovery, and real skills.
              Our camps blend technology, critical thinking, and hands-on learning in a fun,
              supportive environment where every student thrives.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subjects */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1976D2] mb-3">What We Offer</h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto">
              Five subjects, one goal — helping your child discover what they&apos;re capable of.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6">
            {subjects.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 cursor-default ${
                  i < 3
                    ? "lg:col-span-2"
                    : i === 3
                    ? "lg:col-start-2 lg:col-span-2"
                    : "lg:col-start-4 lg:col-span-2"
                }`}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ backgroundColor: s.bg, color: s.color }}
                >
                  {s.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-800 mb-2">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{s.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-3"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-[#1976D2] mb-3">Pricing</h2>
            <p className="text-slate-500 text-base sm:text-lg max-w-lg mx-auto">
              Flexible options to fit your schedule. The longer you commit, the more you save.
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-center text-slate-400 text-sm mb-10"
          >
            Half day = 4 hours, Full day = 8 hours
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {pricing.map((p, i) => (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * i }}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  p.highlight
                    ? "bg-[#1976D2] text-white shadow-xl ring-2 ring-[#1976D2]"
                    : "bg-white border border-slate-200 shadow-sm"
                }`}
              >
                {p.highlight && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FFC000] text-slate-900 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    Best Value
                  </span>
                )}
                <p className={`text-xs font-bold uppercase tracking-widest mb-3 ${p.highlight ? "text-blue-200" : "text-slate-400"}`}>
                  {p.label}
                </p>
                {p.halfDay ? (
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className={`rounded-xl p-3 text-center ${p.highlight ? "bg-white/15" : "bg-slate-50"}`}>
                      <p className={`text-2xl font-bold ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.halfDay.price}</p>
                      <p className={`text-xs mt-1 ${p.highlight ? "text-blue-200" : "text-slate-400"}`}>{p.halfDay.detail}</p>
                    </div>
                    <div className={`rounded-xl p-3 text-center ${p.highlight ? "bg-white/15" : "bg-slate-50"}`}>
                      <p className={`text-2xl font-bold ${p.highlight ? "text-white" : "text-slate-800"}`}>{p.fullDay?.price}</p>
                      <p className={`text-xs mt-1 ${p.highlight ? "text-blue-200" : "text-slate-400"}`}>{p.fullDay?.detail}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-end gap-1 mb-3">
                    <span className={`text-4xl font-bold ${p.highlight ? "text-white" : "text-slate-800"}`}>
                      {p.price}
                    </span>
                    <span className={`text-sm mb-1 ${p.highlight ? "text-blue-200" : "text-slate-400"}`}>
                      {p.unit}
                    </span>
                  </div>
                )}
                <p className={`text-sm leading-relaxed mb-4 flex-1 ${p.highlight ? "text-blue-100" : "text-slate-500"}`}>
                  {p.description}
                </p>
                {p.promo && (
                  <div className={`text-xs font-bold rounded-lg px-3 py-2 text-center ${
                    p.highlight ? "bg-[#FFC000] text-slate-900" : "bg-[#FFC000]/20 text-amber-700"
                  }`}>
                    {p.promo}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Flexible schedule + inquiry */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

            {/* Left — schedule info */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-[#1976D2] mb-4">
                Flexible Scheduling
              </h2>
              <p className="text-slate-600 text-base leading-relaxed mb-6">
                We know every family&apos;s summer looks different. Our camps run throughout the season with
                morning and afternoon sessions available. Whether your child can join for a full week
                or just a few hours here and there, we&apos;ll work with you to find the perfect fit.
              </p>
              <div className="flex flex-col gap-3">
                {scheduleFeatures.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    className="flex items-center gap-3 text-slate-600 text-sm"
                  >
                    <span className="text-[#1976D2] bg-[#E3F2FD] p-2 rounded-lg shrink-0">
                      {item.icon}
                    </span>
                    {item.text}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right — inquiry form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm"
            >
              <h3 className="text-xl font-bold text-[#1976D2] mb-1">Register Your Interest</h3>
              <p className="text-slate-500 text-sm mb-6">
                Tell us about your child and preferred schedule — we&apos;ll reach out to get them enrolled.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-4 text-center font-medium"
                >
                  Thanks for reaching out! We&apos;ll be in touch shortly to confirm your child&apos;s spot. 🎉
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.name}
                      onChange={e => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]/30 focus:border-[#1976D2] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={formData.email}
                      onChange={e => setFormData({ ...formData, email: e.target.value })}
                      required
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]/30 focus:border-[#1976D2] transition"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Message{" "}
                      <span className="text-slate-400 font-normal">(optional)</span>
                    </label>
                    <textarea
                      placeholder="Tell us about your child's interests and preferred schedule..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      rows={4}
                      className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]/30 focus:border-[#1976D2] transition resize-none"
                    />
                  </div>
                  {error && (
                    <p className="text-red-600 text-xs text-center">
                      Something went wrong. Please try again or email us directly.
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1976D2] text-white font-semibold text-sm py-3 rounded-lg hover:bg-[#1565C0] transition-colors duration-200 disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Send Enquiry"}
                  </button>
                </form>
              )}
            </motion.div>

          </div>
        </div>
      </section>

    </main>
  );
}
