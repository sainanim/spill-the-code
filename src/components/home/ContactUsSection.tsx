"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaInstagram, FaFacebook, FaLinkedin, FaWhatsapp } from 'react-icons/fa';

interface ContactUsSectionProps {
  id?: string;
}

const ContactUsSection: React.FC<ContactUsSectionProps> = ({ id }) => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const inputClasses = "w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Thank you for your enquiry!');
        setFormData({ name: '', email: '', message: '' }); // clear form
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id={id} className="py-16 bg-[var(--background-primary)]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-primary)] text-center mb-4">
            Contact Us
          </h2>
          <p className="text-[var(--text-secondary)] text-lg text-center mb-8">
            Have questions or want to learn more? We'd love to hear from you!
          </p>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            <div>
              <label htmlFor="name" className="block text-[var(--text-primary)] mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={inputClasses}
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-[var(--text-primary)] mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={inputClasses}
                placeholder="Your email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-[var(--text-primary)] mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className={inputClasses}
                placeholder="How can we help you?"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="px-8 py-3 bg-[var(--color-accent)] text-white font-semibold rounded-full hover:bg-opacity-90 transition-colors duration-300 shadow-md"
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
            </div>
          </motion.form>
        </motion.div>
      </div>
      <motion.div
            className="flex justify-center space-x-8 mt-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >
            <a href="https://wa.me/16475643126?text=Hello%2C%20I%20am%20interested%20in%20your%20courses%20and%20would%20like%20to%20know%20more." target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition duration-300">
                <FaWhatsapp className="w-10 h-10" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition duration-300">
                <FaInstagram className="w-10 h-10" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition duration-300">
                <FaFacebook className="w-10 h-10" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-indigo-600 transition duration-300">
                <FaLinkedin className="w-10 h-10" />
            </a>
        </motion.div>
    </section>
  );
};

export default ContactUsSection;
