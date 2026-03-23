import { useState, useEffect, useRef } from 'react';
import { 
  Shield, TrendingUp, Users, Moon, Sun, Menu, X,
  Cpu, Lock, CheckCircle2, LogIn, ChevronDown, ArrowRight, Star
} from 'lucide-react';
import { motion } from 'framer-motion';

export function Landing() {
  const [isDark, setIsDark] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [statsInView, setStatsInView] = useState(false);
  const statsRef = useRef(null);
  const countupStartedRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !countupStartedRef.current) {
        setStatsInView(true);
        countupStartedRef.current = true;
      }
    });
    if (statsRef.current) observer.observe(statsRef.current);
    return () => observer.disconnect();
  }, []);

  const bgClass = isDark 
    ? 'bg-black text-white' 
    : 'bg-white text-black';
  const cardBgClass = isDark 
    ? 'bg-slate-900/40 border border-slate-800/50 backdrop-blur-md' 
    : 'bg-slate-50/40 border border-slate-200/50 backdrop-blur-md';
  const textMutedClass = isDark ? 'text-slate-500' : 'text-slate-600';
  const dividerClass = isDark ? 'border-slate-800/30' : 'border-slate-200/30';

  // Countup Number Component
  const CountupNumber = ({ target, label, prefix = '', suffix = '' }) => {
    const [count, setCount] = useState(0);
    const [isFinished, setIsFinished] = useState(false);
    const countupRunRef = useRef(false);

    useEffect(() => {
      if (!statsInView || countupRunRef.current) return;
      countupRunRef.current = true;
      
      let start = 0;
      const end = typeof target === 'string' ? parseFloat(target) : target;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          setIsFinished(true);
          clearInterval(timer);
        } else {
          setCount(start);
        }
      }, 16);
      
      return () => clearInterval(timer);
    }, [statsInView, target]);

    const formatCount = () => {
      if (typeof target === 'string' && target.includes('%')) {
        return count.toFixed(2);
      }
      if (typeof target === 'string' && target.includes('T')) {
        return (count / 1000000000000).toFixed(1) + 'T';
      }
      if (typeof target === 'string' && target.includes('M')) {
        return (count / 1000000).toFixed(1) + 'M';
      }
      return Math.round(count).toLocaleString();
    };

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <motion.div
          className={`text-3xl font-light tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-black'}`}
          animate={isFinished ? {} : { scale: [1, 1.05, 1] }}
          transition={isFinished ? {} : { duration: 2, repeat: Infinity, repeatDelay: 1 }}
        >
          {prefix}{formatCount()}{suffix}
        </motion.div>
        <div className={`text-xs font-light tracking-widest ${textMutedClass}`}>{label}</div>
      </motion.div>
    );
  };

  return (
    <div className={`${bgClass} min-h-screen transition-colors duration-500`}>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes glowDark {
          0%, 100% { text-shadow: 0 0 10px rgba(100,200,255,0.5), 0 0 20px rgba(100,200,255,0.3); }
          50% { text-shadow: 0 0 20px rgba(100,200,255,0.8), 0 0 40px rgba(100,200,255,0.6); }
        }
        @keyframes glowLight {
          0%, 100% { text-shadow: 0 0 10px rgba(59,130,246,0.6), 0 0 20px rgba(59,130,246,0.4); }
          50% { text-shadow: 0 0 20px rgba(59,130,246,0.9), 0 0 40px rgba(59,130,246,0.7); }
        }
        @keyframes cyberpulseDark {
          0%, 100% { border-color: rgba(100,200,255,0.3); box-shadow: 0 0 10px rgba(100,200,255,0.2); }
          50% { border-color: rgba(100,200,255,0.8); box-shadow: 0 0 20px rgba(100,200,255,0.5), inset 0 0 10px rgba(100,200,255,0.1); }
        }
        @keyframes cyberpulseLight {
          0%, 100% { border-color: rgba(59,130,246,0.4); box-shadow: 0 0 10px rgba(59,130,246,0.25); }
          50% { border-color: rgba(59,130,246,0.9); box-shadow: 0 0 25px rgba(59,130,246,0.6), inset 0 0 15px rgba(59,130,246,0.15); }
        }
        @keyframes cyberpulseWhite {
          0%, 100% { border-color: rgba(200,200,200,0.3); box-shadow: 0 0 10px rgba(200,200,200,0.2); }
          50% { border-color: rgba(200,200,200,0.8); box-shadow: 0 0 20px rgba(200,200,200,0.5), inset 0 0 10px rgba(200,200,200,0.1); }
        }
        @keyframes scanlines {
          0% { transform: translateY(0); }
          100% { transform: translateY(10px); }
        }
        @keyframes floatingGrid {
          0% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
          100% { transform: translateY(0px); }
        }
        @keyframes cyberBorder {
          0% { border-color: rgba(100,200,255,0.2); }
          50% { border-color: rgba(100,200,255,0.8); }
          100% { border-color: rgba(100,200,255,0.2); }
        }
        .glow-text { 
          animation: glowDark 3s ease-in-out infinite;
        }
        .dark .glow-text {
          animation: glowDark 3s ease-in-out infinite;
        }
        .light .glow-text {
          animation: glowLight 3s ease-in-out infinite;
        }
        .cyber-pulse { animation: cyberpulseDark 2.5s ease-in-out infinite; }
        .cyber-pulse-light { animation: cyberpulseLight 2.5s ease-in-out infinite; }
        .cyber-pulse-white { animation: cyberpulseWhite 2.5s ease-in-out infinite; }
        .scanline { animation: scanlines 8s linear infinite; }
        .floating-grid { animation: floatingGrid 6s ease-in-out infinite; }
        .cyber-border { animation: cyberBorder 3s ease-in-out infinite; }
        .animate-fadeIn { animation: fadeIn 0.8s ease-out forwards; opacity: 0; }
        .animate-slideDown { animation: slideDown 0.6s ease-out forwards; }
        .animate-slideUp { animation: slideUp 0.6s ease-out forwards; }
        .cyber-line {
          position: relative;
        }
        .cyber-line::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, transparent, currentColor, transparent);
          opacity: 0.3;
        }
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-lift:hover {
          transform: translateY(-4px);
        }
        .gradient-line {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          height: 1px;
        }
        .cyber-grid {
          position: relative;
          background-image: 
            linear-gradient(0deg, transparent 24%, rgba(100,200,255,0.05) 25%, rgba(100,200,255,0.05) 26%, transparent 27%, transparent 74%, rgba(100,200,255,0.05) 75%, rgba(100,200,255,0.05) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, rgba(100,200,255,0.05) 25%, rgba(100,200,255,0.05) 26%, transparent 27%, transparent 74%, rgba(100,200,255,0.05) 75%, rgba(100,200,255,0.05) 76%, transparent 77%, transparent);
          background-size: 40px 40px;
        }
      `}</style>

      {/* Minimalist Navigation */}
      <nav className={`fixed w-full top-0 z-50 backdrop-blur-sm ${isDark ? 'bg-black/80' : 'bg-white/80'} border-b ${dividerClass} transition-all duration-300`}>
        <div className="max-w-6xl mx-auto px-8 py-5 flex items-center justify-between">
          {/* Logo - Ultra Minimal */}
          <div className="flex items-center gap-2">
            <div className={`w-2 h-6 ${isDark ? 'bg-white' : 'bg-black'}`}></div>
            <span className="font-light tracking-widest text-sm">EXPLICIT</span>
          </div>

          {/* Desktop Menu */}
          <div className={`hidden md:flex items-center gap-12 text-xs font-light tracking-wide`}>
            <a href="#features" className={`${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors duration-200`}>Features</a>
            <a href="#testimonials" className={`${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors duration-200`}>Testimonials</a>
            <a href="#security" className={`${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors duration-200`}>Security</a>
            <a href="/broker" className={`${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors duration-200`}>Broker</a>
            <a href="/about" className={`${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors duration-200`}>About</a>
            <a href="/contact" className={`${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors duration-200`}>Contact</a>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className={`p-2 transition-all ${isDark ? 'text-white/60 hover:text-white' : 'text-black/60 hover:text-black'}`}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button className={`hidden sm:flex px-6 py-2 text-xs font-light tracking-wide border transition-all hover-lift
              ${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/20 text-black hover:bg-black/5'}`}>
              Access Platform
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden border-t ${dividerClass} p-8 space-y-4 animate-slideDown`}>
            <a href="#features" className="block text-sm font-light">Features</a>
            <a href="#testimonials" className="block text-sm font-light">Testimonials</a>
            <a href="#security" className="block text-sm font-light">Security</a>
            <div className={`w-full h-px ${dividerClass}`}></div>
            <a href="/broker" className="block text-sm font-light">Broker</a>
            <a href="/about" className="block text-sm font-light">About</a>
            <a href="/contact" className="block text-sm font-light">Contact</a>
            <a href="/terms" className="block text-sm font-light">Terms & Conditions</a>
            <div className={`w-full h-px ${dividerClass}`}></div>
            <button className={`w-full px-6 py-2.5 text-xs font-light tracking-wide border transition-all
              ${isDark ? 'border-white/20 text-white hover:bg-white/5' : 'border-black/20 text-black hover:bg-black/5'}`}>
              Access Platform
            </button>
          </div>
        )}
      </nav>

      {/* Ultra-Minimal Hero Section */}
      <section className="relative w-full pt-32 pb-32 px-8 overflow-hidden">
        {/* Cyber Grid Pattern */}
        <div className={`absolute inset-0 -z-10 cyber-grid ${isDark ? 'opacity-[0.08]' : 'opacity-[0.04]'}`}></div>

        {/* Animated Scanlines */}
        <motion.div 
          className="absolute inset-0 -z-10 scanline pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, rgba(100,200,255,0.03) 0px, rgba(100,200,255,0.03) 1px, transparent 1px, transparent 2px)',
            opacity: 0.5,
          }}
        />

        <div className="max-w-5xl mx-auto">
          {/* Main Hero Text with Glow Effects */}
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <motion.h1 
              className="text-7xl md:text-8xl font-light tracking-tighter mb-8 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <span>Trade</span><br />
              <motion.span 
                className={`${isDark ? 'text-white/40' : 'text-black/40'} glow-text inline-block`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                at scale.
              </motion.span>
            </motion.h1>
            
            <motion.p 
              className={`text-lg font-light tracking-wide ${textMutedClass} max-w-2xl mx-auto mb-12 leading-relaxed`}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              Institutional infrastructure for professional traders. <motion.span className="glow-text">AI-powered execution</motion.span>, <br />real-time analytics, and proven signal sources.
            </motion.p>
            
            {/* CTA - Enhanced */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.button 
                className={`group px-8 py-3 text-sm font-light tracking-wide transition-all border-2 flex items-center gap-2 hover-lift ${isDark ? 'cyber-pulse-white' : 'cyber-pulse-light'}
                  ${isDark ? 'border-white text-white' : 'border-black text-black'}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                Start Trading
                <motion.div
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                >
                  <ArrowRight className="w-4 h-4" />
                </motion.div>
              </motion.button>
              <motion.button 
                className={`px-8 py-3 text-sm font-light tracking-wide transition-all hover-lift
                  ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-600 hover:text-black'}`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                View Demo → 
              </motion.button>
            </motion.div>
          </motion.div>

          {/* Hero Image Placeholder - Cyber Visual */}
          <motion.div 
            className={`mt-24 rounded-lg overflow-hidden border hover-lift ${isDark ? 'cyber-pulse' : 'cyber-pulse-light'} ${isDark ? 'border-slate-800/50' : 'border-slate-200/50'}`}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            <div className={`w-full aspect-video cyber-grid ${isDark ? 'bg-gradient-to-br from-slate-900/50 to-black' : 'bg-gradient-to-br from-slate-100 to-slate-50'} 
              flex items-center justify-center relative overflow-hidden`}>
              {/* Animated Cyber Grid Effect */}
              <motion.div 
                className="absolute inset-0 opacity-20 floating-grid"
                style={{
                  backgroundImage: 'linear-gradient(0deg, transparent 24%, rgba(100,200,255,0.1) 25%, rgba(100,200,255,0.1) 26%, transparent 27%, transparent 74%, rgba(100,200,255,0.1) 75%, rgba(100,200,255,0.1) 76%, transparent 77%, transparent), linear-gradient(90deg, transparent 24%, rgba(100,200,255,0.1) 25%, rgba(100,200,255,0.1) 26%, transparent 27%, transparent 74%, rgba(100,200,255,0.1) 75%, rgba(100,200,255,0.1) 76%, transparent 77%, transparent)',
                  backgroundSize: '40px 40px'
                }}
              />

              {/* Placeholder text */}
              <motion.div 
                className="text-center z-10"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity, repeatType: 'loop' }}
              >
                <motion.div 
                  className={`text-4xl font-light mb-4 glow-text ${isDark ? 'text-white/30' : 'text-black/20'}`}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  ∿ ∿ ∿
                </motion.div>
                <p className={`text-sm font-light ${textMutedClass}`}>Dashboard Preview</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Features Section - Minimal Grid */}
      <section id="features" className="w-full py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">The Platform</h2>
            <p className={`text-sm font-light ${textMutedClass} tracking-wide`}>Purpose-built for institutions and professional traders</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Cpu,
                title: 'AI Trading Engine',
                desc: 'Neural networks process real-time market data for autonomous execution with precision timing.',
              },
              {
                icon: TrendingUp,
                title: 'Signal Intelligence',
                desc: 'Access curated signals from institutional providers with 85%+ accuracy rates.',
              },
              {
                icon: Users,
                title: 'Copy Trading',
                desc: 'Mirror elite trader strategies with advanced position sizing and risk controls.',
              },
              {
                icon: Lock,
                title: 'Institutional Grade',
                desc: 'SOC 2 certified, regulatory compliant, AES-256 encryption across all operations.',
              },
            ].map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  className={`p-8 border rounded-lg ${cardBgClass} hover-lift group relative overflow-hidden ${isDark ? 'cyber-pulse' : 'cyber-pulse-light'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  {/* Hover Glow Effect */}
                  <motion.div
                    className={`absolute inset-0 opacity-0 group-hover:opacity-100 rounded-lg`}
                    style={{
                      background: isDark 
                        ? 'radial-gradient(circle at center, rgba(100,200,255,0.1) 0%, transparent 70%)'
                        : 'radial-gradient(circle at center, rgba(59,130,246,0.15) 0%, transparent 70%)',
                    }}
                    transition={{ duration: 0.3 }}
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      className={`w-8 h-8 ${isDark ? 'text-white/40 group-hover:text-white/80' : 'text-black/40 group-hover:text-black/80'} mb-6 transition-colors`}
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </motion.div>
                    <h3 className="text-lg font-light tracking-wide mb-3">{feature.title}</h3>
                    <p className={`text-sm font-light leading-relaxed ${textMutedClass}`}>{feature.desc}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Stats Section - Ultra Minimal with Counter Animation */}
      <section ref={statsRef} className="w-full py-20 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <CountupNumber target={2.5} label="Annual Volume" prefix="$" suffix="T" />
            <CountupNumber target={2500000} label="Active Traders" suffix="+" />
            <CountupNumber target={99.99} label="Uptime SLA" suffix="%" />
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <motion.div 
                className={`text-3xl font-light tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-black'}`}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
              >
                24/7
              </motion.div>
              <div className={`text-xs font-light tracking-widest ${textMutedClass}`}>Global Support</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Testimonials Section */}
      <section id="testimonials" className="w-full py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="mb-20"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-light tracking-tight mb-4">Trusted by Leaders</h2>
            <p className={`text-sm font-light ${textMutedClass} tracking-wide`}>Testimonials from institutional traders and hedge funds</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "The execution speed and accuracy is unmatched. We've increased our daily trading volume by 300%.",
                author: 'Marcus Chen',
                role: 'CTO, Sigma Hedge Fund',
                stars: 5,
              },
              {
                quote: "Finally, a platform built for professionals. The signal integration alone has improved our ROI by 45%.",
                author: 'Elena Rodriguez',
                role: 'Head of Trading, Vertex Capital',
                stars: 5,
              },
              {
                quote: "Infrastructure this solid is rare. 99.99% uptime is not a promise—it's a guarantee.",
                author: 'James Mitchell',
                role: 'Portfolio Manager, Titan Investments',
                stars: 5,
              },
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                className={`p-8 border rounded-lg ${cardBgClass} hover-lift`}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
              >
                {/* Stars with Stagger Animation */}
                <motion.div 
                  className="flex gap-1 mb-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                >
                  {[...Array(testimonial.stars)].map((_, j) => (
                    <motion.div
                      key={j}
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.4 + i * 0.15 + j * 0.05 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-4 h-4 fill-current" />
                    </motion.div>
                  ))}
                </motion.div>

                {/* Quote */}
                <motion.p 
                  className={`text-sm font-light leading-relaxed mb-8 ${textMutedClass}`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 + i * 0.15 }}
                  viewport={{ once: true }}
                >
                  "{testimonial.quote}"
                </motion.p>

                {/* Author */}
                <motion.div 
                  className="border-t border-slate-800/20 pt-6"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 + i * 0.15 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm font-light">{testimonial.author}</p>
                  <p className={`text-xs font-light ${textMutedClass} mt-1`}>{testimonial.role}</p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Security Section */}
      <section id="security" className="w-full py-24 px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-light tracking-tight mb-8">Enterprise Security</h2>
              <div className="space-y-6">
                {[
                  { title: 'AES 256-bit Encryption', desc: 'Military-grade data protection' },
                  { title: 'FINRA & SEC Compliant', desc: 'Full regulatory oversight' },
                  { title: 'SOC 2 Type II', desc: 'Annual third-party audited' },
                  { title: 'Cold Storage', desc: 'Offline asset protection' },
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <motion.p 
                      className="text-sm font-light mb-1"
                      whileHover={{ x: 4 }}
                    >
                      {item.title}
                    </motion.p>
                    <p className={`text-xs font-light ${textMutedClass}`}>{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Security Image Placeholder */}
            <motion.div 
              className={`rounded-lg border ${dividerClass} overflow-hidden hover-lift`}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <div className={`w-full aspect-square ${isDark ? 'bg-gradient-to-br from-slate-900/50 to-black' : 'bg-gradient-to-br from-slate-100 to-slate-50'} 
                flex items-center justify-center relative`}>
                {/* Lock Icon with Rotation Animation */}
                <motion.div
                  animate={{ rotate: [0, -5, 5, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
                >
                  <Lock className={`w-32 h-32 ${isDark ? 'text-white/20' : 'text-black/20'}`} strokeWidth={0.5} />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Final CTA */}
      <section className="w-full py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2 
            className="text-5xl md:text-6xl font-light tracking-tighter mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Ready to trade<br />
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              at scale?
            </motion.span>
          </motion.h2>
          
          <motion.p 
            className={`text-base font-light ${textMutedClass} mb-12 tracking-wide`}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            Access institutional-grade infrastructure in minutes
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <motion.button 
              className={`px-10 py-3 text-sm font-light tracking-wide border-2 transition-all hover-lift ${isDark ? 'cyber-pulse-white' : 'cyber-pulse-light'}
                ${isDark ? 'border-white text-white' : 'border-black text-black'}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Free Trial
            </motion.button>
            <motion.button 
              className={`px-10 py-3 text-sm font-light tracking-wide transition-all hover-lift
                ${isDark ? 'text-slate-500 hover:text-white' : 'text-slate-600 hover:text-black'}`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Schedule Demo
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Footer */}
      <footer className={`w-full py-16 px-8 ${isDark ? 'bg-slate-950/50' : 'bg-slate-50/50'}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
            {[
              { title: 'Product', links: ['Features', 'Security', 'Pricing', 'API Docs'] },
              { title: 'Company', links: ['About', 'Blog', 'Careers', 'Contact'] },
              { title: 'Legal', links: ['Terms', 'Privacy', 'Compliance', 'Disclosures'] },
              { title: 'Social', links: ['Twitter', 'Discord', 'LinkedIn', 'GitHub'] },
            ].map((col, i) => (
              <div key={i}>
                <p className="text-xs font-light tracking-widest mb-4 opacity-60">{col.title}</p>
                <ul className="space-y-2">
                  {col.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className={`text-xs font-light ${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className={`border-t ${dividerClass} pt-8 flex flex-col md:flex-row items-center justify-between`}>
            <p className={`text-xs font-light ${textMutedClass}`}>© 2025 Explicit Market. All rights reserved.</p>
            <div className="flex gap-8 mt-6 md:mt-0">
              <a href="#" className={`text-xs font-light ${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Security</a>
              <a href="#" className={`text-xs font-light ${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Compliance</a>
              <a href="#" className={`text-xs font-light ${textMutedClass} hover:${isDark ? 'text-white' : 'text-black'} transition-colors`}>Support</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
