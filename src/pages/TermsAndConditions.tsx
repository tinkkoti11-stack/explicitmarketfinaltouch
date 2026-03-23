import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

export function TermsAndConditions() {
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

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content:
        'By accessing and using Explicit Market, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.',
    },
    {
      title: '2. Use License',
      content:
        'Permission is granted to temporarily download one copy of the materials (information or software) on Explicit Market for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not: modify or copy the materials; use the materials for any commercial purpose or for any public display; attempt to decompile or reverse engineer any software contained on Explicit Market.',
    },
    {
      title: '3. Disclaimer',
      content:
        'The materials on Explicit Market are provided on an "as is" basis. Explicit Market makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.',
    },
    {
      title: '4. Limitations',
      content:
        'In no event shall Explicit Market or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Explicit Market.',
    },
    {
      title: '5. Accuracy of Materials',
      content:
        'The materials appearing on Explicit Market could include technical, typographical, or photographic errors. Explicit Market does not warrant that any of the materials on our website are accurate, complete, or current. Explicit Market may make changes to the materials contained on our website at any time without notice.',
    },
    {
      title: '6. Links',
      content:
        'Explicit Market has not reviewed all of the sites linked to our website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by Explicit Market of the site. Use of any such linked website is at the user\'s own risk.',
    },
    {
      title: '7. Modifications',
      content:
        'Explicit Market may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.',
    },
    {
      title: '8. Governing Law',
      content:
        'These terms and conditions are governed by and construed in accordance with the laws of the United States of America, and you irrevocably submit to the exclusive jurisdiction of the courts at that location.',
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
              Terms &
              <motion.span
                className={`block glow-text ${isDark ? 'text-white/40' : 'text-blue-600/60'}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                Conditions
              </motion.span>
            </h1>
            <motion.p
              className={`text-lg font-light ${textMutedClass} max-w-2xl mx-auto leading-relaxed`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              Please read these terms carefully before using our platform.
            </motion.p>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* Content */}
      <section className="w-full py-24 px-8">
        <div className="max-w-3xl mx-auto space-y-12">
          {sections.map((section, i) => (
            <motion.div
              key={i}
              className={`p-8 border rounded-lg ${cardBgClass}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              viewport={{ once: true }}
            >
              <h2 className="text-xl font-light tracking-wide mb-4">{section.title}</h2>
              <p className={`text-sm font-light leading-relaxed ${textMutedClass}`}>
                {section.content}
              </p>
            </motion.div>
          ))}

          <motion.div
            className={`p-8 border rounded-lg ${cardBgClass} bg-blue-500/5`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-xl font-light tracking-wide mb-4">Last Updated</h2>
            <p className={`text-sm font-light ${textMutedClass}`}>
              These terms were last updated on January 1, 2024. We reserve the right to update
              these terms at any time. Your continued use of the platform following the posting of
              revised terms means that you accept and agree to the changes.
            </p>
          </motion.div>
        </div>
      </section>

      <div className={`w-full h-px ${dividerClass}`}></div>

      {/* CTA */}
      <section className="w-full py-24 px-8">
        <div className="max-w-2xl mx-auto text-center">
          <motion.h2
            className="text-4xl font-light tracking-tight mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Questions?
          </motion.h2>
          <motion.p
            className={`text-base font-light ${textMutedClass} mb-8`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            If you have any questions about these Terms and Conditions, please contact our support team.
          </motion.p>
          <motion.a
            href="/contact"
            className={`inline-block px-10 py-3 text-sm font-light tracking-wide border-2 transition-all hover-lift
              ${isDark ? 'border-white text-white hover:bg-white/5' : 'border-blue-600 text-blue-600 hover:bg-blue-600/5'}`}
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Support
          </motion.a>
        </div>
      </section>
    </div>
  );
}
