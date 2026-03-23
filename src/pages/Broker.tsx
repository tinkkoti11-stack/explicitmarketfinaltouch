import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, CheckCircle2, Shield, Zap, Globe } from 'lucide-react';

export function Broker() {
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

  const features = [
    {
      icon: Shield,
      title: 'Regulated & Compliant',
      desc: 'Full FINRA & SEC compliance with regular audits',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'Sub-millisecond execution with 99.99% uptime SLA',
    },
    {
      icon: Globe,
      title: 'Global Coverage',
      desc: 'Access 150+ trading pairs across 24/7 markets',
    },
    {
      icon: CheckCircle2,
      title: 'Zero Hidden Fees',
      desc: 'Transparent pricing with no surprise charges',
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

      {/* Header with Back Button */}
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

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 px-8 overflow-hidden">
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-6xl md:text-7xl font-light tracking-tight mb-6 leading-tight">
              Enterprise-Grade
              <motion.span
                className={`block glow-text ${isDark ? 'text-white/40' : 'text-blue-600/60'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Broker Solutions
              </motion.span>
            </h1>
            <motion.p
              className={`text-lg font-light ${textMutedClass} max-w-2xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Institutional infrastructure built for professional traders. Leverage our cutting-edge technology platform with zero compromises.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Features Grid */}
      <section className="w-full py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light tracking-tight mb-4">Why Choose Us</h2>
            <p className={`text-sm font-light ${textMutedClass} tracking-wide`}>
              Built for traders who demand excellence
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  className={`p-8 border rounded-lg ${cardBgClass} hover-lift group relative overflow-hidden ${
                    isDark ? 'cyber-pulse-light' : 'cyber-pulse-light'
                  }`}
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
                    <h3 className="text-lg font-light tracking-wide mb-3">{feature.title}</h3>
                    <p className={`text-sm font-light leading-relaxed ${textMutedClass}`}>
                      {feature.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Specifications Section */}
      <section className="w-full py-24 px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-light tracking-tight mb-12">Key Specifications</h2>

            <div className="space-y-8">
              {[
                {
                  label: 'Execution Speed',
                  value: 'Sub-1ms',
                  details: 'Lightning-fast order execution with minimal latency',
                },
                {
                  label: 'Liquidity',
                  value: '$500B+',
                  details: 'Access deeper pools and better pricing across all assets',
                },
                {
                  label: 'Trading Pairs',
                  value: '150+',
                  details: 'Cryptocurrencies, forex, commodities, and more',
                },
                {
                  label: 'API Limits',
                  value: '100K+',
                  details: 'Enterprise-tier API rate limits with unlimited scalability',
                },
              ].map((spec, i) => (
                <motion.div
                  key={i}
                  className={`p-6 border rounded-lg ${cardBgClass}`}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="text-sm font-light">{spec.label}</p>
                    <p className={`text-2xl font-light ${isDark ? 'text-white' : 'text-blue-600'}`}>
                      {spec.value}
                    </p>
                  </div>
                  <p className={`text-xs font-light ${textMutedClass}`}>{spec.details}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* CTA Section */}
      <section className="w-full py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-5xl font-light tracking-tighter mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to get started?
          </motion.h2>
          <motion.p
            className={`text-base font-light ${textMutedClass} mb-8`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Join thousands of professional traders using Explicit Market
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.a
              href="/auth/signup"
              className={`px-10 py-3 text-sm font-light tracking-wide border-2 transition-all hover-lift cyber-pulse-light
                ${isDark ? 'border-white text-white' : 'border-blue-600 text-blue-600'}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Create Account
            </motion.a>
            <motion.a
              href="/"
              className={`px-10 py-3 text-sm font-light tracking-wide transition-all hover-lift
                ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-600 hover:text-black'}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Learn More
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
