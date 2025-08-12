import React, { useEffect, useRef } from 'react';
import './about.css';

function About() {
  const visionRef = useRef(null);
  const missionRef = useRef(null);
  const historyRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    const elements = [visionRef.current, missionRef.current, historyRef.current, timelineRef.current];
    elements.forEach(el => {
      if (el) observer.observe(el);
    });

    // Also observe timeline items for individual animations
    const timelineItems = document.querySelectorAll('.about-edu-timeline-item');
    timelineItems.forEach((item, index) => {
      if (item) {
        observer.observe(item);
        // Add delay for staggered animation
        item.style.animationDelay = `${index * 0.2}s`;
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="about-edu-page">
      {/* Hero Section */}
      <section className="about-edu-hero">
        <div className="about-edu-hero-content">
          <h1 className="about-edu-title">عن جامعة بورسعيد</h1>
          <p className="about-edu-subtitle">
            منارة العلم والمعرفة ونموذج ترسيخ القيم المجتمعية
          </p>
          <div className="about-edu-hero-decoration">
            <div className="about-edu-lighthouse"></div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="about-edu-vision-mission">
        <div className="about-edu-container">
          <div className="about-edu-section-header">
            <h2>الرؤية، الرسالة، والأهداف</h2>
          </div>
          
          <div className="about-edu-cards-grid">
            {/* Vision Card */}
            <div className="about-edu-card about-edu-vision-card" ref={visionRef}>
              <div className="about-edu-card-icon">🎯</div>
              <h3>الرؤية</h3>
              <p>
                ترغب جامعة بورسعيد أن تكون منارةً للعلم والمعرفة، ونموذجًا لترسيخ القيم المجتمعية، 
                رائدةً فى مواكبة التغيرات العالمية ذات تصنيف دولي متقدم
              </p>
            </div>

            {/* Mission Card */}
            <div className="about-edu-card about-edu-mission-card" ref={missionRef}>
              <div className="about-edu-card-icon">🚀</div>
              <h3>الرسالة</h3>
              <p>
                تسعى جامعة بورسعيد إلى تحقيق التنمية المستدامة والتميز في الأداء المؤسسي، 
                عبر تقديم أطر تعليمية متطورة، وفقا لمعايير الجودة، ومتطلبات سوق العمل، 
                وأبحاث علمية تسهم في بناء الاقتصاد المعرفي بشراكة مجتمعية وعالمية
              </p>
            </div>
          </div>

          {/* Goals Section */}
          <div className="about-edu-goals" ref={historyRef}>
            <h3>الأهداف</h3>
            <div className="about-edu-goals-grid">
              <div className="about-edu-goal-item">
                <span className="about-edu-goal-number">01</span>
                <p>التطوير المستمر لبرامج التعليم والدراسات العليا لضمان جودة الخريجين</p>
              </div>
              <div className="about-edu-goal-item">
                <span className="about-edu-goal-number">02</span>
                <p>تطوير برامج متعددة التخصصات تلبي متطلبات سوق العمل المحلي والإقليمي</p>
              </div>
              <div className="about-edu-goal-item">
                <span className="about-edu-goal-number">03</span>
                <p>زيادة التصنيف العالمي للجامعة</p>
              </div>
              <div className="about-edu-goal-item">
                <span className="about-edu-goal-number">04</span>
                <p>تطوير الخدمات الإلكترونية لتصبح جامعة ذكية</p>
              </div>
              <div className="about-edu-goal-item">
                <span className="about-edu-goal-number">05</span>
                <p>تطوير وزيادة الخدمات المجتمعية من خلال الاستخدام الفعال للإمكانيات المتوفرة</p>
              </div>
              <div className="about-edu-goal-item">
                <span className="about-edu-goal-number">06</span>
                <p>دعم ريادة الأعمال والابتكار والأنشطة الطلابية التي تحقق التميز للجامعة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="about-edu-history">
        <div className="about-edu-container">
          <div className="about-edu-section-header">
            <h2>تاريخ الجامعة</h2>
          </div>
          
          <div className="about-edu-history-content">
            <div className="about-edu-history-text">
              <p>
                أنشأت جامعة بورسعيد عام ۲۰۱۰ بعد ان كانت فرع من جامعة قناة السويس بمدينة بورسعيد 
                وتم انفصال الفرع بكلياته القائمة حينذاك ليصبح جامعة بورسعيد. وتاريخياً تم إنشاء أول 
                مؤسسات تعليمية عليا بالمدينة تمنح درجة البكالوريوس في عام ١٩٦١.
              </p>
              <p>
                في عام ١٩٧٦ عندما صدر القرار الجمهوري بإنشاء جامعة قناة السويس انضم المعهدين 
                لجامعة قناة السويس، وتغير أسم كل منهم ليصبح كلية، وهم كلية الهندسة ببورسعيد 
                وكلية التجارة ببورسعيد.
              </p>
              <p>
                وفي ٢٤ فبراير ۲۰۱۰م صدر قرار جمهوري بتحويل فرع جامعة قناة السويس ببورسعيد 
                إلى جامعة مستقلة، جامعة بورسعيد، وتزامن مع ميلاد الجامعة ميلاد كلية جديدة هي 
                كلية الآداب، حيث أنشئت في يوليو ۲۰۱۱م.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="about-edu-timeline" ref={timelineRef}>
        <div className="about-edu-container">
          <div className="about-edu-section-header">
            <h2>الخط الزمني للجامعة</h2>
          </div>
          
          <div className="about-edu-timeline-container">
            <div className="about-edu-timeline-item">
              <div className="about-edu-timeline-year">1975</div>
              <div className="about-edu-timeline-content">
                <h4>كلية واحدة</h4>
                <p>كلية الهندسة - انشئت عام 1961 تحت مسمى المعهد العالى الصناعى لتصبح كلية الهندسة عام 1975 وتتبع جامعة حلوان</p>
              </div>
            </div>

            <div className="about-edu-timeline-item">
              <div className="about-edu-timeline-year">1976</div>
              <div className="about-edu-timeline-content">
                <h4>كلية واحدة</h4>
                <p>كلية الهندسة - عام 1976 أصبحت الكلية تتبع جامعة قناة السويس</p>
              </div>
            </div>

            <div className="about-edu-timeline-item">
              <div className="about-edu-timeline-year">1998</div>
              <div className="about-edu-timeline-content">
                <h4>4 كليات</h4>
                <p>ارتفع عدد الكليات الى أربع كليات</p>
              </div>
            </div>

            <div className="about-edu-timeline-item">
              <div className="about-edu-timeline-year">2010</div>
              <div className="about-edu-timeline-content">
                <h4>9 كليات</h4>
                <p>انشئت جامعة بورسعيد عام 2010 بعد وصل عدد كلياتها الى 9 كليات</p>
              </div>
            </div>

            <div className="about-edu-timeline-item">
              <div className="about-edu-timeline-year">2022</div>
              <div className="about-edu-timeline-content">
                <h4>14 كلية</h4>
                <p>والآن، عدد كليات جامعة بورسعيد وصل الى 14 كلية</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Centers Section */}
      <section className="about-edu-centers">
        <div className="about-edu-container">
          <div className="about-edu-section-header">
            <h2>المراكز والوحدات</h2>
          </div>
          
          <div className="about-edu-centers-grid">
            <div className="about-edu-center-item">
              <h4>مركز نظم وتكنولوجيا المعلومات</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>مركز تنمية قدرات أعضاء هيئة التدريس والقيادات</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>مركز توكيد الجودة والاعتماد</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>مركز التخطيط الاستراتيجى</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>مركز القياس والتقويم</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>مركز ريادة الأعمال والابتكار</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>مركز محو الأمية وتعليم الكبار</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>مكتب دعم الابتكار ونقل وتسويق التكنولوجيا</h4>
            </div>
            <div className="about-edu-center-item">
              <h4>نادى ريادة الأعمال</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
