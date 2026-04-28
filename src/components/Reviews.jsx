import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const reviews = [
  { name: "Jamie G", text: "Joseph is incredible!! I got my lips done, and botox, and he did such a great job! He is super personable, professional, and very clean and sanitary. I am so impressed. I will definitely be going back! Highly recommend!!!" },
  { name: "Christian D", text: "I recently had Botox injections, and I must say, it was a fantastic experience. Joseph took the time to thoroughly explain the process, which I really appreciated. He's a sweet guy who knows exactly how to navigate the entire experience. I felt informed and comfortable throughout the procedure, and the results were exactly what I was hoping for. I highly recommend him for anyone considering Botox injections." },
  { name: "Caisey Morris", text: "Went here to get lip fillers because my friend recommended me and I was NOT disappointed! I loved my experience so much and can’t wait to go back. I was talked thru the entire experience and it made me feel so much better about what I was having done. Stress balls and ice packs were offered and they even allowed me to have my sister in the room. Highly recommend! Thank you guys so much" },
  { name: "Justin B", text: "I feel so lucky to have found this place, I wouldn't trust my face and body anywhere else. To date, I've received 2 cryolipolysis sessions on my abdomen, 3 EMS sessions on glutes, Daxxify, and 1 vial of RHA filler... I've finally found an affordable, comfortable, and effective way to regain my confidence before a big trip this summer." },
  { name: "Kimberly A", text: "I was so happy with my experience at Late Night Medspa Joesph was so welcoming i feel like knew him forever! The spa is beautiful and the treatments were amazing I was also blown away by the prices! I had the HIFU treatment and am in love with my results already. I’ll definitely be back for much more! Go see Joseph I promise you will not be disappointed. Thank you again for a great experience!!!" },
  { name: "Robinson S", text: "Joseph is the best! I love the way he explains each procedure, it makes you feel comfortable from start to finish. Definitely Late Night MedSpa is my new favorite place, I recommend it 100%." },
  { name: "Gio G", text: "This Med Spa is amazing! Joseph and his staff is very professional. Their work is at a great price! I will continue to refer him to all of my friends and clients. Great personality and clean. Host a party with him their so much fun" },
  { name: "Heath D", text: "I had an incredible experience at Late Night Medspa, and I can't rave enough about Joseph's expertise! My Botox treatment surpassed my expectations, responding quickly and effectively. Joseph's skill is evident as I requested minimal touch-ups, showcasing his ability to get it right the first time. My husband and I both admire his work... Highly recommend Late Night Medspa and Joseph for their exceptional services!" },
  { name: "Max X", text: "Affordability meets luxury! I'm a returning costumer! I love this place! Joseph is my aesthetician, he is the best. Very welcoming, accomodating and knowledgeable. By just talking to him, I am confident i am in the right place, he is veey passionate about helping people to be the best version looking of themselves. The spa ambiance is very calming, relaxing and looks so luxurious. Can't wait to do more treatment with this place and with Joseph!" },
  { name: "Jennifer M", text: "Joseph is AMAZING!!!!! If I could give him 10 stars, I would. He is professional and very thorough. He does not rush you and is very honest. He doesn't try to up-sell you... He is truly great at what he does. Also, his medspa space is beautiful and very clean." },
  { name: "Genevieve G", text: "I truly love my experience in each session I had. I had Hifu, kybella, and ems with great results and very reasonable pricing. Joseph is very knowledgeable and friendly. This is going to be my favorite clinic to achieve my goals." },
  { name: "Kyle H", text: "I cannot express how impressed I am with the entire experience. Joseph, the skilled practitioner, administered Voluma with an extraordinary level of expertise. The spa exuded cleanliness, creating a comfortable and hygienic environment. The attention to detail in maintaining a pristine space truly sets Late Night Med Spa apart... Joseph’s professionalism was evident throughout the entire process. His precision and skill in enhancing facial features were nothing short of remarkable." }
];

export default function Reviews() {
  return (
    <section id="reviews" className="section-padding" style={{ background: 'var(--bg-primary)', position: 'relative' }}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
          className="gpu-accelerated"
        >
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.25rem', marginBottom: '1.5rem', color: 'var(--text-accent)' }}>
            {[...Array(5)].map((_, i) => (
              <Star key={i} size={24} fill="currentColor" />
            ))}
          </div>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', marginBottom: '1rem' }}>
            The Five Star <span style={{ color: 'var(--text-accent)', fontStyle: 'italic' }}>Difference</span>
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', fontWeight: 300, lineHeight: 1.6 }}>
            We have over 70 five star reviews on Google. Here's what our clients are saying:
          </p>
        </motion.div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 300px), 1fr))', 
          gap: '2rem' 
        }}>
          {reviews.map((review, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              className="gpu-accelerated glass-panel"
              style={{
                padding: '2.5rem',
                border: '1px solid rgba(212, 197, 176, 0.05)',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.5rem', color: 'var(--text-accent)' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p style={{ color: 'var(--text-primary)', fontSize: '1.05rem', lineHeight: 1.6, fontWeight: 300, flexGrow: 1, fontStyle: 'italic', marginBottom: '2rem' }}>
                "{review.text}"
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <img 
                  src={`https://i.pravatar.cc/150?u=${index + 10}`} 
                  alt={review.name} 
                  style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }} 
                />
                <h4 style={{ fontFamily: 'var(--font-sans)', fontWeight: 500, fontSize: '1rem', color: '#fff', margin: 0 }}>{review.name}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
