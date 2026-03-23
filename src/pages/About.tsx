import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Users, TrendingUp, Zap, Award } from 'lucide-react';

export function About() {
  const [isDark, setIsDark] = useState(true);

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

  const values = [
    { icon: Users, title: 'Community First', desc: 'Empowering traders at every level' },
    { icon: TrendingUp, title: 'Growth Focused', desc: 'Your success is our mission' },
    { icon: Zap, title: 'Speed & Reliability', desc: 'Enterprise infrastructure for all' },
    { icon: Award, title: 'Excellence', desc: 'Building the future of trading' },
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
              About
              <motion.span
                className={`block glow-text ${isDark ? 'text-white/40' : 'text-blue-600/60'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Explicit Market
              </motion.span>
            </h1>
            <motion.p
              className={`text-lg font-light ${textMutedClass} max-w-2xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              We're building the future of trading. Our mission is to empower every trader with institutional-grade tools and infrastructure.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Mission & Vision */}
      <section className="w-full py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-light tracking-tight mb-6">Our Mission</h2>
              <p className={`text-base font-light leading-relaxed ${textMutedClass} mb-6`}>
                To democratize access to professional-grade trading infrastructure. We believe every trader deserves access to the tools and insights that were once exclusive to institutions.
              </p>
              <p className={`text-base font-light leading-relaxed ${textMutedClass}`}>
                By combining cutting-edge technology with user-centric design, we're making institutional-grade trading accessible to everyone.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className={`p-8 border rounded-lg ${cardBgClass}`}
            >
              <h2 className="text-4xl font-light tracking-tight mb-6">Our Vision</h2>
              <p className={`text-base font-light leading-relaxed ${textMutedClass} mb-6`}>
                A world where advanced trading tools and real-time market intelligence are available to everyone, regardless of their background or capital size.
              </p>
              <p className={`text-base font-light leading-relaxed ${textMutedClass}`}>
                We envision Explicit Market as the essential platform where traders of all levels can execute, learn, and grow together.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Core Values */}
      <section className="w-full py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light tracking-tight mb-4">Our Values</h2>
            <p className={`text-sm font-light ${textMutedClass} tracking-wide`}>
              Guiding every decision we make
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
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
                    <h3 className="text-lg font-light tracking-wide mb-3">{value.title}</h3>
                    <p className={`text-sm font-light leading-relaxed ${textMutedClass}`}>
                      {value.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Team Stats */}
      <section className="w-full py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light tracking-tight mb-12">By The Numbers</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: '500K+', label: 'Active Users' },
                { number: '50+', label: 'Team Members' },
                { number: '2024', label: 'Year Founded' },
                { number: '100%', label: 'Uptime' },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <p className={`text-3xl font-light tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-blue-600'}`}>
                    {stat.number}
                  </p>
                  <p className={`text-xs font-light tracking-widest ${textMutedClass}`}>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* CTA */}
      <section className="w-full py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-light tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Join our community
          </motion.h2>
          <motion.p
            className={`text-base font-light ${textMutedClass} mb-8`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Be part of the trading revolution
          </motion.p>
          <motion.a
            href="/auth/signup"
            className={`inline-block px-10 py-3 text-sm font-light tracking-wide border-2 transition-all hover-lift cyber-pulse-light
              ${isDark ? 'border-white text-white' : 'border-blue-600 text-blue-600'}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.a>
        </div>
      </section>
    </div>
  );
}
