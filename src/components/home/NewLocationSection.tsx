"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { MapPin, Bell, ArrowRight, Building2, BookOpen, Star } from "lucide-react";

interface NewLocationSectionProps {
  id?: string;
}

const features = [
  { icon: <Building2 className="w-4 h-4" />, label: "More Space" },
  { icon: <BookOpen className="w-4 h-4" />, label: "More Programs" },
  { icon: <Star className="w-4 h-4" />, label: "Same Attention to Detail" },
];

const NewLocationSection: React.FC<NewLocationSectionProps> = ({ id }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/api/send-enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          message: "Please notify me when the new Erin Mills Town Centre location opens.",
        }),
      });
      setSubmitted(true);
    } catch {
      // silently fail — user sees no broken state
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id} className="py-20 bg-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <span className="inline-block bg-[#FFC000]/20 text-[#1976D2] text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5 border border-[#FFC000]/40">
            Coming Soon
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#1976D2] mb-4 leading-tight">
            We're Opening a New Location!
          </h2>
          <p className="text-slate-500 text-lg sm:text-xl max-w-xl mx-auto mb-5">
            More space, more programs, same attention to detail.
          </p>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We're thrilled to be expanding! We're staying right here at Erin Mills Town Centre, but moving into a larger, upgraded space — designed from the ground up to give your child the most enriching learning experience possible.
          </p>
        </motion.div>

        {/* Two-column body */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">

          {/* Left — map + address */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="rounded-2xl overflow-hidden shadow-xl border border-slate-100">
              <iframe
                src="https://maps.google.com/maps?q=Erin+Mills+Town+Centre,+5100+Erin+Mills+Pkwy,+Mississauga,+ON&t=&z=15&ie=UTF8&iwloc=&output=embed"
                width="100%"
                height="380"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="New Location — Erin Mills Town Centre"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 flex items-start gap-3 bg-[#E3F2FD] rounded-xl px-5 py-4"
            >
              <MapPin className="w-5 h-5 text-[#1976D2] mt-0.5 shrink-0" />
              <div>
                <p className="text-[#1976D2] font-semibold">Erin Mills Town Centre</p>
                <p className="text-slate-500 text-sm">5100 Erin Mills Pkwy, Mississauga, ON L5M 4Z5</p>
              </div>
            </motion.div>

          </motion.div>

          {/* Right — features + summer camps CTA + notify form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="flex flex-col gap-6"
          >

            {/* Feature pills */}
            <div className="flex flex-wrap gap-3">
              {features.map((f, i) => (
                <motion.div
                  key={f.label}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * i }}
                  className="flex items-center gap-2 bg-[#FFC000]/10 border border-[#FFC000]/30 text-slate-700 text-sm font-medium px-4 py-2 rounded-full"
                >
                  <span className="text-[#1976D2]">{f.icon}</span>
                  {f.label}
                </motion.div>
              ))}
            </div>

            {/* Summer camps callout */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="bg-[#1976D2] rounded-2xl p-6 text-white"
            >
              <span className="inline-block bg-[#FFC000] text-slate-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Summer Camps
              </span>
              <p className="text-lg font-semibold mb-2">
                Just in time for summer camps!
              </p>
              <p className="text-blue-200 text-sm mb-5 leading-relaxed">
                Coding, robotics, AI — our summer camps are launching at the new location. Spots fill fast.
              </p>
              <Link
                href="/summer-camps"
                className="inline-flex items-center gap-2 bg-[#FFC000] text-slate-900 font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-yellow-400 transition-colors duration-200"
              >
                Learn More <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Notify me form */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-1">
                <Bell className="w-5 h-5 text-[#1976D2]" />
                <h3 className="text-[#1976D2] font-bold text-base">Get Notified</h3>
              </div>
              <p className="text-slate-500 text-sm mb-5">
                Be the first to know when we open our doors.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 text-center font-medium"
                >
                  You're on the list! We'll reach out when we open.
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  <input
                    type="text"
                    placeholder="Your name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]/30 focus:border-[#1976D2] transition"
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1976D2]/30 focus:border-[#1976D2] transition"
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#1976D2] text-white font-semibold text-sm py-2.5 rounded-lg hover:bg-[#1565C0] transition-colors duration-200 disabled:opacity-60"
                  >
                    {loading ? "Sending..." : "Notify Me"}
                  </button>
                </form>
              )}
            </motion.div>

          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default NewLocationSection;
