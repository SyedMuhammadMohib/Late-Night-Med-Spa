import { motion } from 'framer-motion';
import { Heart, Sparkles, Clock, Trophy } from 'lucide-react';

export default function TrustAuthority() {
  const pillars = [
    {
      title: "Your local lakeview medspa",
      subtitle: "LGBQT Friendly",
      desc: "Late Night Medspa is a LGBTQ and veteran-owned business! We pride ourselves on providing a comfortable environment where all feel welcome.",
      icon: Heart,
      color: "linear-gradient(135deg, #FF0018, #FFA52C, #FFFF41, #008018, #0000F9, #86007D)",
      glow: "rgba(255, 0, 0, 0.2)"
    },
    {
      title: "38+ Exceptional Services",
      subtitle: "Head to Toe Care",
      desc: "We offer a wide variety of aesthetic services for the face and body- including glp-1 weight loss injections. Look to us for the latest technology & results you'll love.",
      icon: Sparkles,
      color: "var(--text-accent)",
      glow: "rgba(212, 197, 176, 0.15)"
    },
    {
      title: "Ultimate Convenience",
      subtitle: "On Your Time",
      desc: "Open seven days a week with extended hours for aesthetic treatments on your time. Easy online booking and available for private parties.",
      icon: Clock,
      color: "#4facfe",
      glow: "rgba(79, 172, 254, 0.15)"
    },
    {
      title: "Award Winning",
      subtitle: "Chicago's #1 Medspa",
      desc: "Awarded for: customer satisfaction, outstanding service, business leadership, and strong vision.",
      icon: Trophy,
      color: "#ffd700",
      glow: "rgba(255, 215, 0, 0.15)"
    }
  ];

  return (
    <section className="section-padding" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden' }}>
      
      {/* Decorative background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(212,197,176,0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
          className="gpu-accelerated"
        >
          <div style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Welcome to the Best
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Recently awarded with 3 consecutive years of <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>best Medspa.</span>
          </h2>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
          gap: '2.5rem' 
        }}>
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="gpu-accelerated glass-panel"
                style={{
                  padding: '3rem 2rem',
                  border: '1px solid rgba(255, 255, 255, 0.05)',
                  borderTop: `2px solid ${pillar.color.includes('gradient') ? 'transparent' : pillar.color}`,
                  borderImage: pillar.color.includes('gradient') ? `${pillar.color} 1` : 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'linear-gradient(145deg, rgba(10,10,14,0.7) 0%, rgba(5,5,8,0.9) 100%)',
                  boxShadow: `0 10px 30px ${pillar.glow}`,
                  position: 'relative'
                }}
              >
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  borderRadius: '12px', 
                  background: pillar.color.includes('gradient') ? pillar.color : `rgba(255,255,255,0.05)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '2rem',
                  boxShadow: `0 0 20px ${pillar.glow}`
                }}>
                  <Icon size={32} color={pillar.color.includes('gradient') ? '#fff' : pillar.color} />
                </div>
                
                <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                  {pillar.title}
                </h3>
                <div style={{ 
                  color: pillar.color.includes('gradient') ? 'var(--text-accent)' : pillar.color, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.1em', 
                  fontSize: '0.8rem', 
                  marginBottom: '1.5rem',
                  fontWeight: 600
                }}>
                  {pillar.subtitle}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 300 }}>
                  {pillar.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
