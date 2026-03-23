import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  const [isDark, setIsDark] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  useEffect(() => {
    const stored = localStorage.getItem('theme-mode');
    if (stored) setIsDark(stored === 'dark');
  }, []);

  const bgClass = isDark ? 'bg-black text-white' : 'bg-white text-black';
  const cardBgClass = isDark
    ? 'bg-slate-900/40 border border-slate-800/50 backdrop-blur-md'
    : 'bg-slate-50/40 border border-slate-200/50 backdrop-blur-md';
  const textMutedClass = isDark ? 'text-slate-500' : 'text-slate-600';
  const dividerClass = isDark ? 'border-slate-800/30' : 'border-slate-200/30';
  const inputClass = isDark
    ? 'bg-slate-900/50 border border-slate-700/50 text-white placeholder-slate-500'
    : 'bg-white/50 border border-slate-300/50 text-black placeholder-slate-400';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'support@explicitmarket.com',
      href: 'mailto:support@explicitmarket.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+1 (800) EXPLICIT',
      href: 'tel:+18003539443',
    },
    {
      icon: MapPin,
      label: 'Address',
      value: '123 Trading Hub, San Francisco, CA 94107',
      href: '#',
    },
  ];

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-500`}>
      <style>{`
        @keyframes glow {
          0%, 100% { text-shadow: 0 0 10px rgba(59,130,246,0.4), 0 0 20px rgba(59,130,246,0.2); }
          50% { text-shadow: 0 0 20px rgba(59,130,246,0.7), 0 0 40px rgba(59,130,246,0.5); }
        }
        .glow-text { animation: glow 3s ease-in-out infinite; }
        .cyber-pulse-light { 
          animation: cyberpulseLight 2.5s ease-in-out infinite;
        }
        @keyframes cyberpulseLight {
          0%, 100% { border-color: rgba(59,130,246,0.4); box-shadow: 0 0 10px rgba(59,130,246,0.25); }
          50% { border-color: rgba(59,130,246,0.9); box-shadow: 0 0 25px rgba(59,130,246,0.6), inset 0 0 15px rgba(59,130,246,0.15); }
        }
      `}</style>

      {/* Header */}
      <div
        className={`fixed w-full top-0 z-50 backdrop-blur-sm ${
          isDark ? 'bg-black/80' : 'bg-white/80'
        } border-b ${dividerClass} transition-all duration-300`}
      >
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center gap-4">
          <a href="/" className="flex items-center gap-2 hover:opacity-70 transition-opacity">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-xs font-light tracking-wide">Back</span>
          </a>
          <div className="flex-1" />
          <span className="font-light tracking-widest text-sm">EXPLICIT</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative w-full pt-32 pb-20 px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
              Get in
              <motion.span
                className={`block glow-text ${isDark ? 'text-white/40' : 'text-blue-600/60'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Touch
              </motion.span>
            </h1>
            <motion.p
              className={`text-lg font-light ${textMutedClass} max-w-2xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Have questions? We're here to help. Reach out and our team will get back to you as soon as possible.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Contact Info */}
      <section className="w-full py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {contactInfo.map((info, i) => {
              const Icon = info.icon;
              return (
                <motion.a
                  href={info.href}
                  key={i}
                  className={`p-8 border rounded-lg ${cardBgClass} hover-lift group relative overflow-hidden cyber-pulse-light`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg"
                    style={{
                      background: isDark
                        ? 'radial-gradient(circle at center, rgba(100,200,255,0.1) 0%, transparent 70%)'
                        : 'radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    }}
                    transition={{ duration: 0.3 }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={`w-8 h-8 ${isDark ? 'text-white/40' : 'text-blue-600/70'} mb-6`}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-lg font-light tracking-wide mb-2">{info.label}</h3>
                    <p className={`text-sm font-light leading-relaxed ${textMutedClass}`}>
                      {info.value}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>

          {/* Contact Form */}
          <motion.div
            className={`max-w-2xl mx-auto p-8 border rounded-lg ${cardBgClass}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-light tracking-tight mb-8">Send us a message</h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <label className={`block text-sm font-light mb-2 ${textMutedClass}`}>
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputClass}`}
                  placeholder="Your name"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <label className={`block text-sm font-light mb-2 ${textMutedClass}`}>
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${inputClass}`}
                  placeholder="your@email.com"
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <label className={`block text-sm font-light mb-2 ${textMutedClass}`}>
                  Message
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={6}
                  className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${inputClass}`}
                  placeholder="Tell us how we can help..."
                />
              </motion.div>

              <motion.button
                type="submit"
                className={`w-full px-6 py-3 text-sm font-light tracking-wide border-2 transition-all hover-lift cyber-pulse-light
                  ${isDark ? 'border-white text-white' : 'border-blue-600 text-blue-600'}`}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Response Time */}
      <section className="w-full py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-light tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            We're fast
          </motion.h2>
          <motion.p
            className={`text-base font-light ${textMutedClass} mb-8`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Expect a response within 24 hours. Our support team is available 24/7.
          </motion.p>
        </div>
      </section>
    </div>
  );
}
