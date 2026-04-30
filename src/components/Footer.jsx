export default function Footer() {
  return (
    <footer id="contact" style={{ background: 'var(--bg-secondary)', padding: '5vw', borderTop: '1px solid rgba(255,255,255,0.02)' }}>
      <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '4rem', marginBottom: '4rem' }}>

        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <img src="/favicon.png" alt="LNMS Logo" style={{ width: '45px', height: 'auto', objectFit: 'contain' }} />
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', color: 'var(--text-primary)', letterSpacing: '0.05em' }}>
              LATE NIGHT <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>MED SPA</span>
            </div>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px', marginBottom: '1rem' }}>
            Chicago's #1 Medspa. Awarded for: customer satisfaction, outstanding service, business leadership, and strong vision.
          </p>
          <p style={{ color: 'var(--text-accent)', fontSize: '0.9rem', lineHeight: 1.6, maxWidth: '300px', fontWeight: 500 }}>
            LGBQT Friendly & Veteran-Owned
          </p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.6, maxWidth: '300px', marginTop: '0.5rem' }}>
            We pride ourselves on providing a comfortable environment where all feel welcome.
          </p>
        </div>

        <div>
          <h4 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Contact & Location
          </h4>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 2 }}>
            <p>3741 N Halsted St</p>
            <p>Chicago, IL 60613</p>
            <p><a href="tel:8723462590" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>(872) 346-2590</a></p>
            <p><a href="mailto:info@latenightmedspa.com" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = 'var(--text-accent)'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>info@latenightmedspa.com</a></p>

            <div className="glass-panel" style={{ marginTop: '1.5rem', width: '100%', height: '220px', borderRadius: '12px', overflow: 'hidden', padding: '0.25rem' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2968.428383864074!2d-87.65171732386295!3d41.94828696238699!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x880fd3aa9b33a59d%3A0xc66c10eb305c4538!2s3741%20N%20Halsted%20St%2C%20Chicago%2C%20IL%2060613!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '8px', filter: 'invert(90%) hue-rotate(180deg) grayscale(80%) contrast(1.2)' }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Late Night Med Spa Location"
              />
            </div>
          </div>
        </div>

        <div>
          <h4 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '0.1em', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Hours & Info
          </h4>
          <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 2 }}>
            <p>Open 7 days a week</p>
            <p>2:00pm - 8:00pm</p>
            <p style={{ color: 'var(--text-accent)', marginBottom: '1rem' }}>by appointment</p>

            <h5 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Payment Methods Accepted:</h5>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>Cash, Debit card, American Express, Discover, Visa and MasterCard.</p>

            <h5 style={{ color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', fontSize: '0.8rem', marginTop: '1.5rem', marginBottom: '0.5rem' }}>Parking:</h5>
            <p style={{ fontSize: '0.85rem', lineHeight: 1.6 }}>Metered & Free Street Parking Available</p>
          </div>
        </div>

      </div>

      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.05)', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
        <div>&copy; {new Date().getFullYear()} Late Night Med Spa. All rights reserved.</div>
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          <a href="#" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Privacy Policy</a>
          <a href="#" style={{ transition: 'color 0.3s' }} onMouseEnter={(e) => e.target.style.color = '#fff'} onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}>Terms of Service</a>
        </div>
      </div>
    </footer>
  );
}
