import React, { useEffect, useState } from 'react';
import Chatbot from '../components/Chatbot';
import '../styles/help.css';
import { helpCategories, helpFaqs } from './HelpCenterFaqData';

function HelpCenter() {
  const [visible, setVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [faqFade, setFaqFade] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  // Handle category change with animation
  const handleCategoryChange = (catId) => {
    if (catId === activeCategory) return;
    setFaqFade(false);
    setTimeout(() => {
      setActiveCategory(catId);
      setCurrentPage(1);
      setFaqFade(true);
    }, 180);
  };

  // Filtered FAQs
  const filteredFaqs = activeCategory === 'all'
    ? helpFaqs
    : helpFaqs.filter(faq => faq.category === activeCategory);

  // Pagination only for 'all' category
  const totalPages = activeCategory === 'all' ? Math.ceil(filteredFaqs.length / itemsPerPage) : 1;
  const startIdx = (currentPage - 1) * itemsPerPage;
  const endIdx = startIdx + itemsPerPage;
  const displayFaqs = activeCategory === 'all' ? filteredFaqs.slice(startIdx, endIdx) : filteredFaqs;


  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className={`help-center-page ${visible ? 'fade-in' : ''}`}>
      <header className="help-header">
        <h1>مركز المساعدة</h1>
        <p>كيف يمكننا مساعدتك اليوم؟</p>
      </header>
      {/* Category Icons Row */}
      <div className="helpcenter-category-row modern">
        {helpCategories.map(cat => (
          <button
            key={cat.id}
            onClick={() => handleCategoryChange(cat.id)}
            className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onMouseMove={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const y = e.clientY - rect.top;
              e.currentTarget.style.setProperty('--mx', `${x}px`);
              e.currentTarget.style.setProperty('--my', `${y}px`);
            }}
            aria-pressed={activeCategory === cat.id}
            aria-label={cat.name}
          >
            <span className="category-pill-icon" aria-hidden="true">{cat.icon}</span>
            <span className="category-pill-label">{cat.name}</span>
          </button>
        ))}
      </div>
  
      <main className="help-main-grid">
        <section className="chatbot-section">
          <h2> المساعد الذكي</h2>
          <div className="chatbot-container chatbot-card fade-in-up">
            <Chatbot />
          </div>
        </section>

        <section className="faq-section">
          <h2 style={{ color: '#0f172a', fontWeight: 800, marginBottom: '1.5rem' }}>الأسئلة الشائعة</h2>
          <div className={`faq-grid ${faqFade ? 'fade-in' : 'fade-out'}`}>
            {displayFaqs.map(faq => (
              <div key={faq.id} className="faq-item">
                <h3 style={{ color: '#0f172a', fontWeight: 800, fontSize: 18 }}>{faq.question}</h3>
                <p style={{ color: '#334155', fontWeight: 500, fontSize: 14, marginTop: 10 }}>{faq.answer}</p>
              </div>
            ))}
            {displayFaqs.length === 0 && (
              <div className="faq-item" style={{ color: '#0f172a', background: '#ffffff', border: '1px solid #e5e7eb', borderRadius: 16, padding: '2rem', gridColumn: '1 / -1', textAlign: 'center', fontWeight: 700 }}>
                لا توجد أسئلة شائعة لهذه الفئة حاليًا.
              </div>
            )}
          </div>

          {/* Pagination controls for 'all' */}
          {activeCategory === 'all' && totalPages > 1 && (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem', marginTop: '1rem' }}>
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: 9999,
                  border: '1px solid #e5e7eb',
                  background: currentPage === 1 ? '#f1f5f9' : 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)',
                  color: currentPage === 1 ? '#94a3b8' : '#ffffff',
                  fontWeight: 700,
                  boxShadow: '0 10px 30px rgba(2, 6, 23, 0.06)',
                  cursor: currentPage === 1 ? 'not-allowed' : 'pointer'
                }}
              >السابق</button>
              {Array.from({ length: totalPages }).map((_, i) => {
                const page = i + 1;
                const active = page === currentPage;
                return (
                  <button key={page} onClick={() => setCurrentPage(page)}
                    style={{
                      width: 36, height: 36, borderRadius: 8,
                      border: '1px solid #e5e7eb',
                      background: active ? 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)' : '#ffffff',
                      color: active ? '#ffffff' : '#0f172a',
                      fontWeight: 800,
                      boxShadow: '0 10px 30px rgba(2, 6, 23, 0.06)'
                    }}
                  >{page}</button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                style={{
                  padding: '0.5rem 0.9rem',
                  borderRadius: 9999,
                  border: '1px solid #e5e7eb',
                  background: currentPage === totalPages ? '#f1f5f9' : 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)',
                  color: currentPage === totalPages ? '#94a3b8' : '#ffffff',
                  fontWeight: 700,
                  boxShadow: '0 10px 30px rgba(2, 6, 23, 0.06)',
                  cursor: currentPage === totalPages ? 'not-allowed' : 'pointer'
                }}
              >التالي</button>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default HelpCenter;
