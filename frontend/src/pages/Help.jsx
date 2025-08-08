import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/help.css";

function Help() {
	const { isAuthenticated, user } = useAuth();
	const [searchQuery, setSearchQuery] = useState("");
	const [searchResults, setSearchResults] = useState([]);
	const [activeCategory, setActiveCategory] = useState("all");
	const [isSearching, setIsSearching] = useState(false);

	// Comprehensive search data for the entire app
	const searchData = [
		// Navigation & General
		{
			id: 1,
			title: "كيفية تسجيل الدخول",
			content:
				"يمكنك تسجيل الدخول من خلال صفحة تسجيل الدخول باستخدام بريدك الإلكتروني وكلمة المرور",
			category: "account",
			keywords: ["تسجيل دخول", "login", "log in", "sign in", "account", "حساب"],
			link: "/login",
		},
		{
			id: 2,
			title: "كيفية إنشاء حساب جديد",
			content: "يمكنك إنشاء حساب جديد من صفحة التسجيل بملء البيانات المطلوبة",
			category: "account",
			keywords: ["إنشاء حساب", "register", "sign up", "حساب جديد", "تسجيل"],
			link: "/register",
		},
		{
			id: 3,
			title: "كيفية الوصول للوحة التحكم",
			content:
				"بعد تسجيل الدخول، يمكنك الوصول للوحة التحكم من القائمة الرئيسية",
			category: "dashboard",
			keywords: ["لوحة التحكم", "dashboard", "الرئيسية", "home", "main"],
			link: "/dashboard",
		},

		// Dashboard Features
		{
			id: 4,
			title: "كيفية عرض إحصائياتك الأكاديمية",
			content: "في لوحة التحكم ستجد إحصائيات مفصلة عن تقدمك الأكاديمي والدرجات",
			category: "dashboard",
			keywords: [
				"إحصائيات",
				"statistics",
				"تقدم",
				"progress",
				"درجات",
				"grades",
			],
			link: "/dashboard",
		},
		{
			id: 5,
			title: "كيفية تتبع المقررات الدراسية",
			content: "يمكنك إضافة وتتبع المقررات الدراسية من صفحة المقررات",
			category: "courses",
			keywords: ["مقررات", "courses", "مواد", "subjects", "دراسة"],
			link: "/courses",
		},

		// Schedule Management
		{
			id: 6,
			title: "كيفية إدارة الجدول الدراسي",
			content: "يمكنك إضافة وتعديل الجدول الدراسي من صفحة الجدول",
			category: "schedule",
			keywords: [
				"جدول",
				"schedule",
				"مواعيد",
				"appointments",
				"محاضرات",
				"lectures",
			],
			link: "/schedule",
		},
		{
			id: 7,
			title: "كيفية إضافة مواعيد مهمة",
			content: "في صفحة الجدول يمكنك إضافة مواعيد الامتحانات والواجبات",
			category: "schedule",
			keywords: [
				"مواعيد",
				"deadlines",
				"امتحانات",
				"exams",
				"واجبات",
				"assignments",
			],
			link: "/schedule",
		},

		// Faculty Management
		{
			id: 8,
			title: "كيفية إدارة المحاضرات (للأساتذة)",
			content: "يمكن للأساتذة إدارة محاضراتهم من صفحة إدارة المحاضرات",
			category: "faculty",
			keywords: [
				"محاضرات",
				"lectures",
				"أساتذة",
				"faculty",
				"teachers",
				"professors",
			],
			link: "/faculty-manage",
		},
		{
			id: 9,
			title: "كيفية إضافة محاضرة جديدة",
			content: "في صفحة إدارة المحاضرات يمكنك إضافة محاضرات جديدة مع التفاصيل",
			category: "faculty",
			keywords: ["إضافة محاضرة", "add lecture", "محاضرة جديدة", "new lecture"],
			link: "/faculty-manage",
		},

		// University Management
		{
			id: 10,
			title: "كيفية إدارة الجامعات",
			content: "يمكن إدارة معلومات الجامعات من صفحة إدارة الجامعات",
			category: "university",
			keywords: [
				"جامعات",
				"universities",
				"إدارة جامعات",
				"university management",
			],
			link: "/university-manage",
		},

		// Profile & Settings
		{
			id: 11,
			title: "كيفية تعديل الملف الشخصي",
			content: "يمكنك تعديل معلوماتك الشخصية من صفحة الملف الشخصي",
			category: "profile",
			keywords: [
				"ملف شخصي",
				"profile",
				"معلومات",
				"information",
				"تعديل",
				"edit",
			],
			link: "/profile",
		},
		{
			id: 12,
			title: "كيفية تغيير كلمة المرور",
			content: "يمكنك تغيير كلمة المرور من إعدادات الحساب",
			category: "account",
			keywords: [
				"كلمة مرور",
				"password",
				"تغيير",
				"change",
				"إعدادات",
				"settings",
			],
			link: "/profile",
		},

		// Contact & Support
		{
			id: 13,
			title: "كيفية التواصل مع الدعم الفني",
			content: "يمكنك التواصل مع فريق الدعم من صفحة الاتصال",
			category: "support",
			keywords: ["دعم", "support", "مساعدة", "help", "اتصال", "contact"],
			link: "/contact",
		},
		{
			id: 14,
			title: "كيفية الإبلاغ عن مشكلة",
			content: "يمكنك الإبلاغ عن أي مشكلة من صفحة الاتصال أو المساعدة",
			category: "support",
			keywords: ["مشكلة", "problem", "bug", "خطأ", "error", "إبلاغ", "report"],
			link: "/contact",
		},

		// Features
		{
			id: 15,
			title: "مميزات المنصة",
			content:
				"المنصة تتضمن إدارة المقررات، تتبع التقدم، إدارة الجدول، لوحة التحكم",
			category: "features",
			keywords: [
				"مميزات",
				"features",
				"وظائف",
				"functions",
				"قدرات",
				"capabilities",
			],
			link: "/features",
		},

		// Navigation
		{
			id: 16,
			title: "كيفية التنقل في الموقع",
			content: "استخدم القائمة العلوية للتنقل بين صفحات الموقع المختلفة",
			category: "navigation",
			keywords: ["تنقل", "navigation", "قائمة", "menu", "صفحات", "pages"],
			link: "/",
		},
	];

	const categories = [
		{ id: "all", name: "الكل", icon: "🔍" },
		{ id: "account", name: "الحساب", icon: "👤" },
		{ id: "dashboard", name: "لوحة التحكم", icon: "📊" },
		{ id: "courses", name: "المقررات", icon: "📚" },
		{ id: "schedule", name: "الجدول", icon: "📅" },
		{ id: "faculty", name: "المحاضرات", icon: "👨‍🏫" },
		{ id: "university", name: "الجامعات", icon: "🏛️" },
		{ id: "profile", name: "الملف الشخصي", icon: "⚙️" },
		{ id: "support", name: "الدعم", icon: "🆘" },
		{ id: "features", name: "المميزات", icon: "✨" },
		{ id: "navigation", name: "التنقل", icon: "🧭" },
	];

	// Search function
	const performSearch = (query) => {
		if (!query.trim()) {
			setSearchResults([]);
			return;
		}

		setIsSearching(true);

		// Simulate search delay for better UX
		setTimeout(() => {
			const filteredResults = searchData.filter((item) => {
				const searchLower = query.toLowerCase();
				const titleMatch = item.title.toLowerCase().includes(searchLower);
				const contentMatch = item.content.toLowerCase().includes(searchLower);
				const keywordMatch = item.keywords.some((keyword) =>
					keyword.toLowerCase().includes(searchLower)
				);
				const categoryMatch =
					activeCategory === "all" || item.category === activeCategory;

				return (titleMatch || contentMatch || keywordMatch) && categoryMatch;
			});

			setSearchResults(filteredResults);
			setIsSearching(false);
		}, 300);
	};

	// Handle search input
	const handleSearchChange = (e) => {
		const query = e.target.value;
		setSearchQuery(query);
		performSearch(query);
	};

	// Handle category filter
	const handleCategoryChange = (category) => {
		setActiveCategory(category);
		if (searchQuery) {
			performSearch(searchQuery);
		}
	};

	// Get filtered categories for display
	const getFilteredCategories = () => {
		if (activeCategory === "all") {
			return categories;
		}
		return categories.filter((cat) => cat.id === activeCategory);
	};

	return (
		<div className="help-page">
			<div className="help-header">
				<h1>مركز المساعدة</h1>
				<p>ابحث عن المساعدة التي تحتاجها أو تصفح الأقسام المختلفة</p>
			</div>

			{/* Search Section */}
			<div className="search-section">
				<div className="search-container">
					<div className="search-input-wrapper">
						<input
							type="text"
							placeholder="ابحث عن المساعدة التي تحتاجها..."
							value={searchQuery}
							onChange={handleSearchChange}
							className="search-input"
						/>
						<div className="search-icon">{isSearching ? "⏳" : "🔍"}</div>
					</div>
				</div>
			</div>

			{/* Categories */}
			<div className="categories-section">
				<h3>تصفح حسب الفئة</h3>
				<div className="categories-grid">
					{categories.map((category) => (
						<button
							key={category.id}
							className={`category-card ${
								activeCategory === category.id ? "active" : ""
							}`}
							onClick={() => handleCategoryChange(category.id)}>
							<span className="category-icon">{category.icon}</span>
							<span className="category-name">{category.name}</span>
						</button>
					))}
				</div>
			</div>

			{/* Search Results */}
			{searchQuery && (
				<div className="search-results">
					<h3>
						نتائج البحث: {searchResults.length} نتيجة
						{activeCategory !== "all" &&
							` في ${categories.find((c) => c.id === activeCategory)?.name}`}
					</h3>

					{searchResults.length === 0 && !isSearching && (
						<div className="no-results">
							<p>لم يتم العثور على نتائج لـ "{searchQuery}"</p>
							<p>جرب استخدام كلمات مختلفة أو تصفح الأقسام أعلاه</p>
						</div>
					)}

					<div className="results-grid">
						{searchResults.map((result) => (
							<div key={result.id} className="result-card">
								<div className="result-header">
									<h4>{result.title}</h4>
									<span className="result-category">
										{categories.find((c) => c.id === result.category)?.icon}
									</span>
								</div>
								<p className="result-content">{result.content}</p>
								{result.link && (
									<Link to={result.link} className="result-link">
										اذهب إلى الصفحة →
									</Link>
								)}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Quick Help Section */}
			{!searchQuery && (
				<div className="quick-help">
					<h3>مساعدة سريعة</h3>
					<div className="quick-help-grid">
						<div className="quick-help-card">
							<h4>🔐 تسجيل الدخول</h4>
							<p>استخدم بريدك الإلكتروني وكلمة المرور لتسجيل الدخول</p>
							<Link to="/login" className="quick-link">
								تسجيل الدخول
							</Link>
						</div>

						<div className="quick-help-card">
							<h4>📊 لوحة التحكم</h4>
							<p>عرض إحصائياتك الأكاديمية والتقدم الدراسي</p>
							<Link to="/dashboard" className="quick-link">
								لوحة التحكم
							</Link>
						</div>

						<div className="quick-help-card">
							<h4>📚 المقررات</h4>
							<p>إدارة مقرراتك الدراسية والواجبات</p>
							<br />
							<Link to="/courses" className="quick-link">
								المقررات
							</Link>

						</div>

						<div className="quick-help-card">
							<h4>📅 الجدول</h4>
							<p>إدارة الجدول الدراسي والمواعيد المهمة</p>
							<Link to="/schedule" className="quick-link">
								الجدول
							</Link>
						</div>

						<div className="quick-help-card">
							<h4>👨‍🏫 إدارة المحاضرات</h4>
							<p>للأساتذة: إدارة محاضرات وجداول التدريس</p>
							<Link to="/faculty-manage" className="quick-link">
								إدارة المحاضرات
							</Link>
						</div>

						<div className="quick-help-card">
							<h4>🏛️ إدارة الجامعات</h4>
							<p>إدارة معلومات الجامعات والكليات</p>
							<Link to="/university-manage" className="quick-link">
								إدارة الجامعات
							</Link>
						</div>
					</div>
				</div>
			)}

			{/* Contact Support */}
			<div className="contact-support">
				<h3>هل تحتاج مساعدة إضافية؟</h3>
				<p>إذا لم تجد ما تبحث عنه، يمكنك التواصل مع فريق الدعم الفني</p>
				<div className="support-buttons">
					<Link to="/contact" className="btn btn-primary">
						تواصل معنا
					</Link>
					<Link to="/features" className="btn btn-secondary">
						تعرف على المميزات
					</Link>
				</div>
			</div>
		</div>
	);
}

export default Help;
