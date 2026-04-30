import React from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { servicesData } from '../data/servicesData';

const ServiceCard = ({ service, index }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <Link to={`/service/${service.id}`} style={{ textDecoration: 'none', display: 'block', height: '100%' }}>
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: "easeOut" }}
          whileHover={{ y: -5, transition: { duration: 0.3 } }}
          className="gpu-accelerated glass-panel h-100"
          style={{
            padding: '3rem 2.5rem',
            display: 'flex',
            flexDirection: 'column',
            transition: 'background 0.4s ease',
            position: 'relative',
            overflow: 'hidden',
            cursor: 'pointer',
            background: 'var(--bg-glass)',
            border: 'none'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(20, 20, 20, 0.8)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'var(--bg-glass)';
          }}
        >
          {/* Background Image overlay on hover (subtle) */}
          <div style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${service.image}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: 0.15,
            zIndex: 0,
            pointerEvents: 'none',
          }} />

          <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-accent)' }}>
              {service.title}
            </h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, flexGrow: 1, fontWeight: 300, fontSize: '0.95rem' }}>
              {service.subtitle || service.description || "Discover more about this exclusive luxury treatment."}
            </p>
            
            <div style={{ 
                marginTop: '2rem', 
                fontSize: '0.85rem', 
                textTransform: 'uppercase', 
                letterSpacing: '0.1em',
                color: 'var(--text-primary)',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
              }}>
              View Details <span style={{ color: 'var(--text-accent)' }}>→</span>
            </div>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

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
            {servicesData.length} Signature Categories
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Curated <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Treatments</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', fontWeight: 300, lineHeight: 1.6 }}>
            Bespoke aesthetic solutions designed to enhance your natural beauty with meticulous precision and care.
          </p>
        </motion.div>

        <div className="row g-4">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

