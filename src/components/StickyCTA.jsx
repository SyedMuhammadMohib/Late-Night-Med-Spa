import { motion } from 'framer-motion';

export default function StickyCTA() {
  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="gpu-accelerated"
          style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}
        >
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
            Ready to <br/>
            <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Transform?</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', marginBottom: '3rem', fontWeight: 300, lineHeight: 1.6 }}>
            Book your consultation today and discover why we are Chicago's top-rated Med Spa. We are open 7 days a week with extended evening hours for your convenience.
          </p>
          
          <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.a 
              href="https://booking.mangomint.com/latenightmedspachicago"
              target="_blank"
              rel="noreferrer"
              className="btn-primary"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Book Online Now
            </motion.a>
            <motion.a 
              href="tel:8723462590"
              className="btn-outline"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Call (872) 346-2590
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
