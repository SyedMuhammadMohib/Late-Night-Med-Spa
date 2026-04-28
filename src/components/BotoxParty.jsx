import { motion } from 'framer-motion';

export default function BotoxParty() {
  return (
    <section id="parties" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <div className="container">
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))',
          gap: '4rem',
          alignItems: 'center'
        }}>
          {/* Content Column */}
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="gpu-accelerated"
          >
            <div style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', marginBottom: '1rem' }}>
              Award-Winning Med Spa Service
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              Host Your Next <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Event</span> with Us!
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.6, marginBottom: '2.5rem', fontWeight: 300 }}>
              We Offer Botox Parties with Exclusive Spa Access & VIP Treatment for your Whole Crew!
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '3rem' }}>
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Special Pricing</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  We offer exclusive party pricing for you and your guests! Contact us today to learn more about our discounted group pricing.
                </p>
              </div>
              
              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Certified and Licensed Staff</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  It's your party- we are just here to provide our services in a professional manner with the best customer service.
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '8px' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Great For...</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
                  Brides (or Grooms) to be, Milestone Birthdays, Girls/Guys Night, Reunions, Just Because, and More!
                </p>
              </div>

              <div className="glass-panel" style={{ padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--text-accent)' }}>
                <h3 style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '0.5rem' }}>Inquire About Hosting</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1.5rem' }}>
                  Contact us today to start planning your perfect spa event with Late Night Med Spa.
                </p>
                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <a href="mailto:info@latenightmedspa.com" className="btn-primary" style={{ flex: '1 1 auto', textAlign: 'center', textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem', textTransform: 'lowercase' }}>
                    info@latenightmedspa.com
                  </a>
                  <a href="tel:8723462590" className="btn-outline" style={{ flex: '1 1 auto', textAlign: 'center', textDecoration: 'none', padding: '0.5rem 1rem', fontSize: '0.9rem' }}>
                    (872) 346-2590
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Party Image Column */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{ width: '100%', position: 'relative', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ 
              position: 'relative',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4), 0 0 40px rgba(212,197,176,0.1)',
              border: '1px solid rgba(255,255,255,0.05)'
            }}>
              <img 
                src="/party2.jpg" 
                alt="Friends enjoying a spa party" 
                style={{ 
                  width: '100%', 
                  height: 'auto', 
                  objectFit: 'cover',
                  display: 'block'
                }} 
              />
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
