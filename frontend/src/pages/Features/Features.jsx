import React from "react";
import { Link } from "react-router-dom";
import "./features.css";
import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion } from "motion/react";

// Minimal cn util (no Tailwind required here, kept for parity)
const cn = (...classes) => classes.filter(Boolean).join(" ");

function Timeline({ data }) {
  const railRef = useRef(null);
  const containerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (railRef.current) {
      const rect = railRef.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [railRef]);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start 10%", "end 50%"] });
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className={cn("tl-root")} ref={containerRef}>
      <div className="tl-inner" ref={railRef}>
        {data.map((item, idx) => (
          <div key={idx} className="tl-item">
            <div className="tl-sticky">
              <div className="tl-dot">
                <div className="tl-dot-inner" />
              </div>
              <h3 className="tl-title tl-title--desktop">{item.title}</h3>
            </div>
            <div className="tl-content">
              <h3 className="tl-title tl-title--mobile">{item.title}</h3>
              {item.content}
            </div>
          </div>
        ))}
        <div className="tl-rail" style={{ height: height + "px" }}>
          <motion.div style={{ height: heightTransform, opacity: opacityTransform }} className="tl-progress" />
        </div>
      </div>
    </div>
  );
}

function Features() {
	useEffect(() => {
		const sections = document.querySelectorAll(".ft-section");
		
		const reveal = () => {
			const windowHeight = window.innerHeight;
			sections.forEach((section) => {
				const rect = section.getBoundingClientRect();
				const revealPoint = 150; // Adjust this value to change when the animation triggers
				
				if (rect.top < windowHeight - revealPoint) {
					section.style.animationPlayState = "running";
					section.classList.add("animated");
				}
			});
		};

		// Initial check
		setTimeout(reveal, 100);

		// Add scroll listener
		window.addEventListener("scroll", reveal);
		
		// Cleanup
		return () => window.removeEventListener("scroll", reveal);
	}, []);

	const timelineData = [
		{
			title: " المميزات الرئيسية",
			content: (
				<section className="ft-section">
					<ul>
						<li><span className="feature-icon">🏛️</span>إدارة شاملة لبيانات الجامعات والكليات والبرامج الدراسية</li>
						<li><span className="feature-icon">📅</span>تنظيم وجدولة المحاضرات والمعامل بشكل تلقائي</li>
						<li><span className="feature-icon">🔄</span>نظام ذكي لمعالجة التعارضات في الجداول الدراسية</li>
					</ul>
				</section>
			),
		},
		{
			title: " واجهة الطالب",
			content: (
				<section className="ft-section">
					<ul>
						<li><span className="feature-icon">📊</span>عرض الجدول الدراسي وتفاصيل المقررات المسجلة</li>
						<li><span className="feature-icon">📱</span>تسجيل الحضور بسهولة عبر رموز QR</li>
						<li><span className="feature-icon">📈</span>متابعة الحضور والغياب والأداء الأكاديمي</li>
					</ul>
				</section>
			),
		},
		{
			title: "منصة الأساتذة",
			content: (
				<section className="ft-section">
					<ul>
						<li><span className="feature-icon">📚</span>إدارة المحاضرات والأنشطة التعليمية</li>
						<li><span className="feature-icon">🔲</span>توليد وإدارة رموز QR للحضور</li>
						<li><span className="feature-icon">🗓️</span>مزامنة الجداول مع التقويم الشخصي</li>
					</ul>
				</section>
			),
		},
		{
			title: " إدارة النظام",
			content: (
				<section className="ft-section">
					<ul>
						<li><span className="feature-icon">👥</span>تحكم كامل في صلاحيات المستخدمين والأدوار</li>
						<li><span className="feature-icon">🎯</span>إدارة القاعات وتوزيع الموارد بكفاءة</li>
						<li><span className="feature-icon">📊</span>تقارير تفصيلية وإحصائيات شاملة</li>
						<li><span className="feature-icon">🔒</span>واجهة سهلة الاستخدام مع أمان عالي للبيانات</li>
					</ul>
				</section>
			),
		},
	];

	return (
		<div className="ft-page" dir="rtl">
			<h1 className="ft-title">المميزات</h1>
			<p className="ft-intro">
				مرحبًا بك في منصة <strong>جامعة بورسعيد</strong> – حيث نمنحك السيطرة الكاملة على تنظيم الجدول الدراسي ومتابعة الأداء الأكاديمي بكل سهولة!
			</p>
			<div className="timeline-wrapper">
				<Timeline data={timelineData} />
			</div>
		</div>
	);
}

export default Features;
