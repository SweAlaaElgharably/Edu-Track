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

  // Handle pagination change with animation
  const handlePageChange = (nextPage) => {
    if (nextPage === currentPage) return;
    setFaqFade(false);
    setTimeout(() => {
      setCurrentPage(nextPage);
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
          <h2>الأسئلة الشائعة</h2>
          <div className={`faq-grid ${faqFade ? 'fade-in' : 'fade-out'}`}>
            {displayFaqs.map(faq => (
              <div key={faq.id} className="faq-item">
                <h3>{faq.question}</h3>
                <p >{faq.answer}</p>
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
            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className={`page-nav prev${currentPage === 1 ? ' disabled' : ''}`}
              >السابق</button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => {
                const active = page === currentPage;
                return (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`page-btn ${active ? 'active' : ''}`}
                  >{page}</button>
                );
              })}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`page-nav next${currentPage === totalPages ? ' disabled' : ''}`}
              >التالي</button>
            </div>
          )}
        </section>

      </main>
    </div>
  );
}

export default HelpCenter;
