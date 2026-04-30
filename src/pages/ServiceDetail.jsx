import React, { useLayoutEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { servicesData } from '../data/servicesData';
import { ArrowLeft } from 'lucide-react';

export default function ServiceDetail() {
  const { id } = useParams();
  const service = servicesData.find(s => s.id === id);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '50%']);

  // Scroll to top on mount (route change)
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!service) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', flexDirection: 'column', gap: '2rem' }}>
        <h1>Service not found</h1>
        <Link to="/" className="btn-primary">Return Home</Link>
      </div>
    );
  }

  return (
    <div style={{ paddingBottom: '10rem', minHeight: '100vh' }}>
      {/* Hero Banner with Image */}
      <div style={{ 
        position: 'relative', 
        height: '60vh', 
        minHeight: '400px',
        display: 'flex',
        alignItems: 'flex-end',
        padding: '5vw',
        overflow: 'hidden'
      }}>
        {/* Parallax Background */}
        <motion.div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: '-50%', // extra height for parallax scroll
          backgroundImage: `url('${service.image}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: backgroundY,
          zIndex: 0
        }} />

        {/* Gradient Overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(3,3,5,1) 0%, rgba(3,3,5,0.4) 50%, rgba(3,3,5,0.1) 100%)',
          zIndex: 1
        }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px' }}>
          <Link to="/" style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: '0.5rem', 
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '0.9rem',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          }}>
            <ArrowLeft size={16} /> Back to Home
          </Link>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', marginBottom: '0.5rem' }}
          >
            {service.title}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{ color: 'var(--text-accent)', fontSize: '1.2rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}
          >
            {service.subtitle}
          </motion.p>
        </div>
      </div>

      {/* Content Section */}
      <div className="container" style={{ marginTop: '5rem', maxWidth: '900px' }}>
        {service.description && (
          <p style={{ 
            fontSize: '1.25rem', 
            color: 'var(--text-primary)', 
            marginBottom: '4rem', 
            lineHeight: 1.6,
            fontWeight: 300,
            textAlign: 'center'
          }}>
            {service.description}
          </p>
        )}

        {service.extraImage && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            style={{ marginBottom: '4rem', textAlign: 'center' }}
          >
            <img 
              src={service.extraImage} 
              alt={`${service.title} Extra Showcase`} 
              style={{ width: '100%', maxWidth: '800px', borderRadius: '12px', border: '1px solid rgba(212, 197, 176, 0.2)' }}
            />
          </motion.div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem' }}>
          {service.content.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
              className="glass-panel"
              style={{
                padding: '3rem',
                borderRadius: '8px',
                border: '1px solid rgba(212, 197, 176, 0.1)'
              }}
            >
              <h3 style={{ 
                fontSize: '1.75rem', 
                color: 'var(--text-accent)', 
                marginBottom: '1.5rem',
                textTransform: 'capitalize'
              }}>
                {item.heading}
              </h3>
              <p style={{ 
                color: 'var(--text-secondary)', 
                lineHeight: 1.8, 
                fontSize: '1.05rem',
                fontWeight: 300 
              }}>
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>

        <div style={{ marginTop: '5rem', textAlign: 'center' }}>
          <a 
            href="https://booking.mangomint.com/latenightmedspachicago"
            target="_blank"
            rel="noreferrer"
            className="btn-primary"
            style={{ padding: '1.2rem 3rem', fontSize: '1rem' }}
          >
            Book Your Consultation
          </a>
        </div>
      </div>
    </div>
  );
}
