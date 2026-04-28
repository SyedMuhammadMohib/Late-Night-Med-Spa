import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const steps = [
  { num: "01", title: "Book Online", desc: "Easily secure your appointment through our seamless Mangomint booking portal." },
  { num: "02", title: "Private Consultation", desc: "A detailed discussion with our experts about your aesthetic goals and medical history." },
  { num: "03", title: "Precision Treatment", desc: "Experience your procedure in our luxury suites with maximum comfort and safety." },
  { num: "04", title: "Elevated Confidence", desc: "Step out with subtle, natural, and stunning enhancements that speak for themselves." }
];

export default function ConversionFlow() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0.2, 0.8], ["0%", "100%"]);

  return (
    <section className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
          className="gpu-accelerated"
        >
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
            The <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Journey.</span>
          </h2>
        </motion.div>

        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}>
          {/* Animated Line */}
          <div style={{ position: 'absolute', left: '50px', top: 0, bottom: 0, width: '1px', background: 'rgba(255,255,255,0.05)' }}>
            <motion.div style={{ width: '100%', height: lineHeight, background: 'var(--text-accent)' }} />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
                className="gpu-accelerated"
                style={{ display: 'flex', gap: '4rem', alignItems: 'flex-start', position: 'relative' }}
              >
                <div style={{ 
                  width: '100px', 
                  fontFamily: 'var(--font-serif)', 
                  fontSize: '3rem', 
                  color: 'var(--text-accent)',
                  lineHeight: 0.8,
                  opacity: 0.8
                }}>
                  {step.num}
                </div>
                <div>
                  <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>{step.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, fontWeight: 300 }}>{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

