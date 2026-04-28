import { motion } from 'framer-motion';
import clinicBg from '../assets/clinic_bg.png';

export default function PremiumExperience() {
  return (
    <section id="experience" className="section-padding" style={{ position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        <div style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden' }}>
          {/* Parallax Image Container */}
          <motion.div 
            initial={{ scale: 1.1 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="gpu-accelerated"
            style={{
              height: '70vh',
              minHeight: '600px',
              backgroundImage: `url(${clinicBg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(3,3,5,0.4)' }} />
          </motion.div>

          {/* Floating Content Box */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="gpu-accelerated glass-panel"
            style={{
              position: 'absolute',
              bottom: '5%',
              right: '5%',
              maxWidth: '500px',
              padding: '4rem 3rem'
            }}
          >
            <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem', color: '#fff' }}>
              A Safe, <br/> <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Welcoming Space.</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem', fontWeight: 300 }}>
              We proudly offer an LGBTQ-friendly, judgment-free environment where your comfort and satisfaction are our top priority. Every detail is designed to provide you with absolute privacy and medical excellence.
            </p>
            <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 400 }}>
              <strong>Host Your Next Event With Us!</strong> We offer VIP Botox Parties with exclusive spa access for your whole crew.
            </p>
            <div style={{ 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              fontSize: '0.85rem', 
              color: 'var(--text-accent)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <a href="tel:8723462590" className="btn-outline" style={{ display: 'inline-block', textDecoration: 'none' }}>Call to book a private event →</a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

