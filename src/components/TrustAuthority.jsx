import { useRef } from 'react';
import { Heart, Sparkles, Clock, Trophy } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function TrustAuthority() {
  const containerRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    // Awwwards-style text reveal
    gsap.fromTo(headerRef.current, 
      { opacity: 0, y: 50 },
      { 
        opacity: 1, 
        y: 0, 
        duration: 1.2, 
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );

    // Staggered premium card reveal
    gsap.fromTo(cardsRef.current,
      { opacity: 0, y: 80, scale: 0.95, rotationX: -15 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        rotationX: 0,
        duration: 1.2,
        ease: "expo.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%",
        }
      }
    );
  }, { scope: containerRef });

  const pillars = [
    {
      title: "Your local lakeview medspa",
      subtitle: "LGBQT Friendly",
      desc: "Late Night Medspa is a LGBTQ and veteran-owned business! We pride ourselves on providing a comfortable environment where all feel welcome.",
      icon: Heart,
      image: "/assets/lgbtq.jpg"
    },
    {
      title: "38+ Exceptional Services",
      subtitle: "Head to Toe Care",
      desc: "We offer a wide variety of aesthetic services for the face and body- including glp-1 weight loss injections. Look to us for the latest technology & results you'll love.",
      icon: Sparkles,
      image: "/assets/38+services.jpg"
    },
    {
      title: "Ultimate Convenience",
      subtitle: "On Your Time",
      desc: "Open seven days a week with extended hours for aesthetic treatments on your time. Easy online booking and available for private parties.",
      icon: Clock,
      image: "/assets/ultimateConvenience.jpg"
    },
    {
      title: "Award Winning",
      subtitle: "Chicago's #1 Medspa",
      desc: "Awarded for: customer satisfaction, outstanding service, business leadership, and strong vision.",
      icon: Trophy,
      image: "/assets/Award Winning.jpg"
    }
  ];

  return (
    <section ref={containerRef} className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', perspective: '1000px' }}>
      
      {/* Decorative background glow */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '80%', height: '80%', background: 'radial-gradient(circle, rgba(212,197,176,0.03) 0%, transparent 70%)', zIndex: 0, pointerEvents: 'none' }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div 
          ref={headerRef}
          style={{ textAlign: 'center', marginBottom: '5rem', opacity: 0 }}
          className="gpu-accelerated"
        >
          <div style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Welcome to the Best
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)', lineHeight: 1.1 }}>
            Recently awarded with 3 consecutive years of <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>best Medspa.</span>
          </h2>
        </div>

        <div className="row g-4">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div className="col-12 col-md-6" key={idx}>
                <div 
                  ref={el => cardsRef.current[idx] = el}
                  className="gpu-accelerated glass-panel h-100"
                  style={{
                    opacity: 0,
                    padding: '3rem 2rem',
                    display: 'flex',
                    flexDirection: 'column',
                    background: 'var(--bg-glass)',
                    position: 'relative',
                    overflow: 'hidden',
                    border: 'none',
                    transition: 'transform 0.4s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Background Image */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url('${pillar.image}')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: 0.15,
                    zIndex: 0,
                    pointerEvents: 'none',
                    transition: 'opacity 0.4s ease'
                  }} className="feature-bg" />

                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
                    <div style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '12px', 
                      background: 'rgba(255,255,255,0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '2rem',
                    }}>
                      <Icon size={32} color="var(--text-accent)" />
                    </div>
                    
                    <h3 style={{ fontSize: '1.6rem', color: '#fff', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>
                      {pillar.title}
                    </h3>
                    <div style={{ 
                      color: 'var(--text-accent)', 
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
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
