import { motion } from 'framer-motion';

const services = [
  { title: "GLP-1's AVAILABLE here", desc: "Medical weight loss program using compounded GLP-1 medications as prescribed by a licensed provider. *try home delivery* *requires single in-person visit." },
  { title: "Ultrasonic Cavitation body sculpting", desc: "This treatment is designed to improve overall skin texture and elasticity while promoting a more sculpted and toned appearance. It targets stubborn areas of fat, smooths uneven skin, and supports natural collagen production for long-lasting, visible results. Suitable for individuals seeking non-invasive solutions to enhance their silhouette or maintain post-procedural outcomes." },
  { title: "Cryo / Coolsculpting", desc: "Freeze away fat on the abdomen, legs, chin, arms & more! Reduces up to 25% of unwanted stubborn fat with just a single treatment. *upgrade to our Diamond cyro 360* for enhanced and even faster cryo results" },
  { title: "Lipo weight loss injections", desc: "FDA approved Deoxycholic acid safely and effectively breaks down cells in fatty tissue. 1-3 treatments recommended for best results." },
  { title: "Diamond Lipo Laser Max", desc: "Diamond Lipo Laser Max is a non-invasive body contouring treatment that utilizes advanced low-level laser technology to effectively and painlessly heat and melt stubborn fat deposits. This innovative procedure not only prevents the regeneration of fat cells but also eliminates the risk of bruising, swelling, or any downtime. Experience the ultimate solution for achieving your desired body shape with Diamond Lipo Laser Max." },
  { title: "Endosphere cellulite reduction", desc: "Endosphere cellulite reduction offers a safe and effective solution for reducing the appearance of cellulite without the need for surgery. Using non-invasive technology, this popular treatment tightens the skin and provides long-lasting results, making it an ideal choice for individuals seeking skin rejuvenation without downtime." },
  { title: "ems muscle sculpting", desc: "Dual purpose service that enhances muscle growth and reduces body fat using electromagnetic energy that engages the muscles in super maximal contractions while burning up local fat stores. *tRy EMS Diamond* optimize results & target stubborn fat with the added power of radio frequency" },
  { title: "Kybella", desc: "Prescription injection to reduce the appearance of moderate to severe fat below the chin. Also called submental fat or \"double chin.\"" }
];

export default function Services() {
  return (
    <section id="services" className="section-padding" style={{ background: 'var(--bg-secondary)', position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '6rem' }}
          className="gpu-accelerated"
        >
          <div style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', marginBottom: '1rem' }}>
            38+ Services Available
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Curated <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Treatments</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', fontWeight: 300, lineHeight: 1.6 }}>
            Bespoke aesthetic solutions designed to enhance your natural beauty with meticulous precision and care.
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 350px), 1fr))', 
          gap: '2.5rem' 
        }}>
          {services.map((service, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="gpu-accelerated glass-panel"
              style={{
                padding: '3rem 2.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(212, 197, 176, 0.05)',
                transition: 'border-color 0.4s ease, background 0.4s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 197, 176, 0.3)';
                e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(212, 197, 176, 0.05)';
                e.currentTarget.style.background = 'var(--bg-glass)';
              }}
            >
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-accent)' }}>
                {service.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, flexGrow: 1, fontWeight: 300, fontSize: '0.95rem' }}>
                {service.desc}
              </p>
              
              <a 
                href="https://booking.mangomint.com/latenightmedspachicago"
                target="_blank"
                rel="noreferrer"
                style={{ 
                  marginTop: '2rem', 
                  fontSize: '0.85rem', 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em',
                  color: 'var(--text-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none'
                }}>
                Book Service <span style={{ color: 'var(--text-accent)' }}>→</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

