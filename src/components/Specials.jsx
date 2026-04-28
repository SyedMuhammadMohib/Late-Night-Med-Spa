import { motion } from 'framer-motion';

const specials = [
  { title: "Unlimited Botox", desc: "Discover the freedom of one flat rate for however many units of Botox you need. Valid for forehead, crows feet, & elevens (between eyebrows) only.", price: "$399", tag: "Most Popular" },
  { title: "Model Makeover", desc: "Our popular flat rate unlimited units Botox service plus 2 full syringes of filler for your lips and face! Choose any filler from our wide selection of brands and products for your desired result.", price: "$1299", tag: "Full Transformation" },
  { title: "Fiber Lift", desc: "The Fiber Lift combines Radio frequency & Diode laser technology to tighten and instantly lift loose skin. Ideal for face, neck, and body. All treatments are done with new sterile single-use disposable fiber cables. Zero downtime, noticable long lasting results after just a single treatment.", price: "$799+" },
  { title: "Lip Fillers", desc: "Full syringe of Juvederm or Restylane fillers.", price: "$379" },
  { title: "Facial Fillers", desc: "Choose between a FULL syringe of Restylane, Belotero or Juvederm products. Juvederm Voluma $409.", price: "$389" },
  { title: "Ebrium C02 Laser", desc: "This comprehensive solution uses advanced laser technology to treat uneven pigmentation, enlarged pores, wrinkles, acne scars and various other skin concerns.", price: "$299+" },
  { title: "Diamond Cryo Fat Freezing", desc: "Our state-of-the-art Diamond Cryo technology freezes away unwanted fat cells resulting in up to a 25% reduction of stubborn fat in just one treatment.", price: "$119" },
  { title: "Diamond Cryo + EMS", desc: "Our advanced Diamond Cryo technology freezes away unwanted fat cells, while our innovative radio frequency muscle sculpting works to tone and tighten the muscles at the same time for truly transformative results.", price: "$189" },
  { title: "EMS Throne", desc: "BUY 3 SESSIONS GET 1 FREE! EMS Throne sessions can be done as soon as every other day. Unused sessions expire after 60 days.", price: "$79+" },
  { title: "EMS Pro", desc: "BUY 3 SESSIONS GET 1 FREE! ($299) Our latest upgraded powerful EMS Sculpting treatment just got even better boosting up to an insane 50% increase to your muscle definition.", price: "$79" }
];

export default function Specials() {
  return (
    <section id="specials" className="section-padding" style={{ background: 'var(--bg-tertiary)', position: 'relative' }}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
          className="gpu-accelerated"
        >
          <div style={{ color: 'var(--text-accent)', textTransform: 'uppercase', letterSpacing: '0.15em', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Exclusive Offers
          </div>
          <h2 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', marginBottom: '1.5rem' }}>
            Monthly <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Specials</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', fontWeight: 300, lineHeight: 1.6 }}>
            Premium aesthetic care should be accessible. Take advantage of our limited-time pricing on our most sought-after treatments.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '2rem'
        }}>
          {specials.map((special, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, transition: { duration: 0.3 } }}
              className="gpu-accelerated glass-panel"
              style={{
                padding: '2.5rem',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                border: '1px solid rgba(212, 197, 176, 0.1)',
                background: 'linear-gradient(145deg, rgba(10,10,14,0.8) 0%, rgba(5,5,8,0.9) 100%)'
              }}
            >
              {special.tag && (
                <div style={{
                  position: 'absolute',
                  top: '-12px',
                  right: '2rem',
                  background: 'var(--text-accent)',
                  color: '#030305',
                  padding: '0.3rem 1rem',
                  fontSize: '0.75rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontWeight: 600,
                  boxShadow: '0 4px 15px rgba(212, 197, 176, 0.2)'
                }}>
                  {special.tag}
                </div>
              )}

              <h3 style={{ fontSize: '1.4rem', marginBottom: '0.5rem', color: '#fff' }}>
                {special.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6, flexGrow: 1, fontWeight: 300, fontSize: '0.95rem', marginBottom: '2rem' }}>
                {special.desc}
              </p>

              <div style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '0.5rem',
                borderTop: '1px solid rgba(255,255,255,0.05)',
                paddingTop: '1.5rem'
              }}>
                <span style={{ fontSize: '2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-accent)' }}>
                  {special.price}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.8 }}
          style={{ textAlign: 'center', marginTop: '4rem' }}
        >
          <a href="https://booking.mangomint.com/latenightmedspachicago" target="_blank" rel="noreferrer" className="btn-primary">
            Claim Offer Now
          </a>
        </motion.div>
      </div>
    </section>
  );
}
