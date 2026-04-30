import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

const INITIAL_MESSAGES = [
  {
    id: 1,
    sender: 'bot',
    text: 'Welcome to Late Night Med Spa. I am Med Bot. Is there any way I can help you with your premium experience today?',
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
];

const SUGGESTED_QUESTIONS = [
  "What is Late Night Med Spa?",
  "Are you open every day?",
  "Do you offer evening appointments?",
  "Do you offer Botox?",
  "Do you offer lip fillers?",
  "Do you offer weight loss treatments?",
  "Do you offer fat-freezing or body sculpting?",
  "Do you run specials?",
  "Do you host Botox parties?",
  "How much does treatment X cost?"
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(!isOpen);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (text = inputValue) => {
    if (!text.trim()) return;

    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botResponse = generateBotResponse(text);
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: botResponse,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 1500);
  };

  const generateBotResponse = (input) => {
    const lowerInput = input.toLowerCase();
    
    // General
    if (lowerInput.match(/what is late night med spa|who are you/)) return "Late Night Med Spa describes itself as a Chicago med spa offering aesthetic treatments, extended and evening hours, and more than 38 services.";
    if (lowerInput.match(/open every day|everyday|weekend|sunday/)) return "Yes, the website says the spa is open seven days a week.";
    if (lowerInput.match(/evening|late|hours|when are you open/)) return "Yes, the spa specifically advertises extended and evening hours.";
    if (lowerInput.match(/how many services|lot of options/)) return "Yes, the homepage says there are 38+ services to choose from.";
    if (lowerInput.match(/lgbtq|friendly|inclusive/)) return "Yes, the homepage says the spa is LGBTQ-friendly and judgment-free.";
    if (lowerInput.match(/book online|online booking/)) return "Yes, the About page says the spa offers easy online booking.";
    if (lowerInput.match(/award|best medspa/)) return "The homepage says the spa was recently awarded three consecutive years of 'best Medspa,' and another public page says it was awarded number one in Chicago in 2024.";
    if (lowerInput.match(/where|location|located/)) return "The public site identifies the business as Chicago-based, and service pages describe it as being located in Lakeview.";

    // Injectables and face
    if (lowerInput.match(/botox/)) {
      if (lowerInput.match(/unlimited/)) return "Yes, the spa advertises a flat-rate unlimited Botox special, and the specials page says it applies to the forehead, crow's feet, and elevens.";
      if (lowerInput.match(/parties|party/)) return "Yes, the site says the spa offers Botox parties.";
      if (lowerInput.match(/more than just forehead|full face|tmj/)) return "Yes, the Botox page says the spa specializes in Botox for the full face, TMJ, and underarms.";
      return "Yes, Botox is one of the spa's highlighted services.";
    }
    if (lowerInput.match(/wrinkle relaxer/)) return "The Botox page lists Botox, Daxxify, Xeomin, and Dysport.";
    if (lowerInput.match(/alle|allē/)) return "Yes, the Botox page says Late Night Med Spa is an Allergan affiliate and that clients can use Allē Rewards there.";
    if (lowerInput.match(/lip filler/)) return "Yes, lip fillers are featured in the spa's monthly specials.";
    if (lowerInput.match(/filler brand/)) return "The filler page lists Juvederm, RHA, and Restylane.";
    if (lowerInput.match(/other injectable|sculptra|kybella|prp/)) return "Yes, the injectables page lists services such as Sculptra, Kybella, PRP hair restoration, penis fillers, Scrotox, and the P-shot.";

    // Body, laser, and weight loss
    if (lowerInput.match(/weight loss|semaglutide|tirzepatide|wegovy|ozempic/)) {
      if (lowerInput.match(/medication|what weight loss/)) return "The weight loss page mentions semaglutide, tirzepatide, Wegovy, Ozempic, and other tailored weight loss injections.";
      return "Yes, weight loss is one of the spa's advertised service categories.";
    }
    if (lowerInput.match(/fat freezing|body sculpting|cryo/)) return "Yes, the site promotes Diamond Cryo fat freezing and EMS-based body sculpting services.";
    if (lowerInput.match(/what area.*fat|target fat/)) return "The weight loss page says fat can be frozen away on the abdomen, legs, chin, arms, and more.";
    if (lowerInput.match(/how much fat|reduce fat/)) return "The weight loss page says the treatment can reduce up to 25% of stubborn fat with a single treatment.";
    if (lowerInput.match(/ems throne/)) {
      if (lowerInput.match(/how often|frequency/)) return "The specials page says EMS Throne sessions can be done as soon as every other day.";
      if (lowerInput.match(/expire/)) return "The specials page says unused EMS sessions expire after 60 days.";
      return "Yes, EMS Throne appears on the specials page and homepage promotions.";
    }
    if (lowerInput.match(/co2|laser resurfacing/)) {
      if (lowerInput.match(/help with|what does it do/)) return "The specials page says it can treat uneven pigmentation, enlarged pores, wrinkles, acne scars, and other skin concerns.";
      return "Yes, the spa has a dedicated CO2 ablative laser resurfacing service page and also features it in specials.";
    }
    if (lowerInput.match(/carbon laser/)) return "Yes, carbon laser facials are listed in the spa's monthly specials.";
    if (lowerInput.match(/laser hair removal/)) return "Yes, laser hair removal has its own service page on the website.";

    // Booking, specials, and events
    if (lowerInput.match(/special/)) {
      if (lowerInput.match(/quote|price|how much/)) return "We regularly run specials, and exact pricing can vary by service and current promotion. I can help you book or direct you to the latest offer page.";
      return "Yes, the spa has a dedicated Monthly Specials page and also highlights specials on the homepage.";
    }
    if (lowerInput.match(/makeover/)) return "Yes, the specials page advertises a 'Model Makeover' package that includes unlimited Botox plus two full filler syringes.";
    if (lowerInput.match(/event|party|bridal/)) {
      if (lowerInput.match(/discount/)) return "Yes, the private events page says there is discounted group pricing.";
      if (lowerInput.match(/bridal/)) return "Yes, the private events page says bridal parties are welcome.";
      if (lowerInput.match(/private access|exclusive/)) return "Yes, the homepage says Botox parties come with exclusive spa access and VIP treatment for the group.";
      return "Yes, the site says the spa offers Botox parties and hosts private events.";
    }
    if (lowerInput.match(/payment plan|finance/)) return "A public Allē listing for the spa says clients can book and view payment plans there.";

    // Safe fallbacks
    if (lowerInput.match(/cost|price|how much/)) return "We regularly run specials, and exact pricing can vary by service and current promotion. I can help you book or direct you to the latest offer page.";
    if (lowerInput.match(/candidate|am i a good fit/)) return "Candidacy depends on your goals and treatment area, and the team can guide you after booking.";
    if (lowerInput.match(/how many session/)) return "Session count varies by treatment and your goals, so the provider will confirm the right plan for you.";
    if (lowerInput.match(/downtime|recovery/)) return "Downtime depends on the service, and a provider will explain what to expect for your selected treatment.";
    if (lowerInput.match(/combine/)) return "Combination plans may be available depending on your goals, and the best next step is booking a consultation or asking the front desk.";
    
    return "No problem, we offer many options including injectables, fillers, lasers, weight loss, and body treatments. We can help point you to the best category for your goals. Feel free to ask about our specials or booking a consultation!";
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', alignItems: 'center', gap: '1rem', zIndex: 9999 }}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 1 }}
              style={{
                background: 'rgba(10, 10, 14, 0.85)',
                backdropFilter: 'blur(10px)',
                padding: '0.75rem 1.25rem',
                borderRadius: '1.5rem',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                fontSize: '0.9rem',
                boxShadow: '0 4px 20px rgba(0,0,0,0.5)',
                cursor: 'pointer'
              }}
              onClick={toggleChat}
            >
              How may I help you?
            </motion.div>
            <motion.button
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleChat}
              className="chatbot-fab"
              aria-label="Open chat"
              style={{ position: 'relative', bottom: 'auto', right: 'auto' }}
            >
              <MessageCircle size={28} />
              <motion.div
                className="fab-glow"
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              />
            </motion.button>
          </div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="chatbot-window"
          >
            {/* Header */}
            <div className="chatbot-header">
              <div className="chatbot-header-info">
                <div className="avatar-container">
                  <img src="/robot_chatbot_avatar.png" alt="Concierge" className="chatbot-avatar" />
                  <div className="status-dot"></div>
                </div>
                <div>
                  <h3 className="chatbot-title">Med Bot</h3>
                  <p className="chatbot-status">Typically replies instantly</p>
                </div>
              </div>
              <button onClick={toggleChat} className="chatbot-close-btn" aria-label="Close chat">
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="chatbot-messages">
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`message-wrapper ${msg.sender === 'user' ? 'user-message-wrapper' : 'bot-message-wrapper'}`}
                >
                  {msg.sender === 'bot' && (
                    <img src="/robot_chatbot_avatar.png" alt="Bot" className="message-avatar" />
                  )}
                  <div className={`message-bubble ${msg.sender === 'user' ? 'user-bubble' : 'bot-bubble'}`}>
                    <p className="message-text">{msg.text}</p>
                    <span className="message-time">{msg.time}</span>
                  </div>
                </motion.div>
              ))}
              
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="message-wrapper bot-message-wrapper"
                >
                  <img src="/robot_chatbot_avatar.png" alt="Bot" className="message-avatar" />
                  <div className="message-bubble bot-bubble typing-indicator">
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }}>.</motion.span>
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}>.</motion.span>
                    <motion.span animate={{ y: [0, -5, 0] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}>.</motion.span>
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions (acts as a dynamic menu and autocomplete) */}
            {!isTyping && (
              <div className="chatbot-suggestions" style={{ maxHeight: '120px', overflowY: 'auto' }}>
                {SUGGESTED_QUESTIONS.filter(q => {
                  const alreadyAsked = messages.some(m => m.sender === 'user' && m.text === q);
                  if (alreadyAsked) return false;
                  if (!inputValue.trim()) return true;
                  return q.toLowerCase().includes(inputValue.toLowerCase());
                }).map((q, idx) => (
                  <button key={idx} onClick={() => handleSend(q)} className="suggestion-chip">
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="chatbot-input-area">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="chatbot-input-form"
              >
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="chatbot-input"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim() || isTyping}
                  className="chatbot-send-btn"
                >
                  <Send size={18} />
                </button>
              </form>
              <div className="chatbot-footer-text">
                <Sparkles size={12} className="inline-icon" /> Powered by AI Concierge
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
