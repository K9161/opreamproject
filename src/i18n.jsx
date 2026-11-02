import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    portal: "Opream Portal", subtitle: "Academic Placement", internships: "Internships",
    applications: "My Applications", exams: "My Exams", notifications: "Notifications", profile: "Profile",
    help: "Help & Support", logout: "Log Out", student: "Student", allTracks: "All Tracks",
    oldest: "Oldest", newest: "Newest", common: "The most common", details: "Details", viewDetails: "View Details", apply: "Apply Now",
    track: "TRACK", location: "LOCATION", deadline: "APPLICATION DEADLINE", web: "Web Development",
    cairo: "Cairo / Hybrid", title: "Frontend Development Internship", organization: "Information Technology Institute",
    language: "Language", search: "Search internships...", noResults: "No internships found.",
    profileSettings: "Profile & Settings", registrarVerified: "Registrar Verified",
    faculty: "Faculty of Computer & Information Sciences", mainCampus: "Main Campus", admitted: "Admitted Fall 2026",
    gpa: "Cumulative GPA", progressStatus: "Current Placement Progress Status",
    internshipFrontend: "Frontend Development Internship", internshipBackend: "Backend Development Internship",
    stepApplication: "Application", stepApproval: "Faculty Approval", stepPlacement: "Placement",
    stepReports: "Weekly Reports", stepEvaluation: "Final Evaluation",
    verified: "Verified", approved: "Approved", completed: "Completed", inProgress: "In Progress",
    upcoming: "Upcoming", scheduled: "Scheduled",
    examsSubtitle: "Academic Assessments & Placement Testing", assignedTests: "Assigned Entrance Tests",
    assignedTestsDesc: "Review testing requirements, strict timelines, and launch verified assessments directly below.",
    availableNow: "Available Now", scheduledStatus: "Scheduled", completedUnderEval: "Completed - Under Evaluation",
    entranceAssessment: "Entrance Assessment", technicalScreening: "Technical Screening",
    startExam: "Start Exam", availableOn: "Available on", viewSubmission: "View Submission",
    duration: "Duration", mins: "Mins", questions: "Questions", windowUnlocks: "Window unlocks 15m prior",
    submitted: "Submitted", resultsExpected: "Results expected within 5 business days",
    backToInternships: "Back to Internships", backToDetails: "Back to Details of the internship",
    overview: "Overview", description: "Gain rigorous hands-on software development experience within high-impact engineering teams, refining scalable client-side architectures while satisfying your university placement criteria. You will collaborate directly with seasoned industry mentors to deliver production-ready interfaces adhering to robust software standards.",
    requirements: "Requirements & Eligibility", academicStanding: "Academic Standing", academicStandingDesc: "Senior CS / Engineering undergraduate students in good standing.", minimumGpa: "Minimum Cumulative GPA", minimumGpaDesc: "Minimum 3.0 / 4.0 or equivalent academic credential tier.", technicalFoundation: "Technical Foundation", technicalFoundationDesc: "Basic JavaScript (ES6+), HTML5/CSS3 semantics, and fundamental React component concepts.", entranceInfo: "Entrance Exam Information", mandatoryAssessment: "Mandatory Online Technical Assessment", assessmentDesc: "Automated screening testing foundational algorithms and frontend reasoning.", duration45: "45 minutes", timing: "Timing", afterReview: "After Application Review", officialNote: "Official ITI placement accredited under university internship standards.", applyFor: "Applying for Frontend Development Internship at ITI", verifiedPartner: "Verified Partner", term: "Term: Winter 2026", fullTime: "Full-time (12 Weeks)", deadlineDate: "November 30, 2026", daysRemaining: "28 days remaining", academicRecord: "Student Academic Record", sisSynced: "SIS Synced", retrievedInfo: "This information is retrieved directly from your university registrar profile and will accompany your credential file.", studentName: "Student Name", academicId: "Academic ID", currentGpa: "Current GPA", college: "College", candidateSubmissions: "Candidate Submissions", trackPreference: "Academic Track Preference", selectTrack: "Select your academic track", webTrack: "Web Development Track", mobileTrack: "Mobile Development Track", dataTrack: "Data Science Track", trackHelp: "Select the specialization track aligned with your department graduation requirement.", personalStatement: "Personal Statement / Statement of Interest", statementPlaceholder: "Summarize your interest in ITI’s frontend engineering program, highlight relevant projects, and clarify your technical goals...", evaluatedBy: "Evaluated by both the faculty supervisor and the ITI placement board.", certify: "I certify my academic eligibility and agree to take the required entrance exam if shortlisted.", cancelReturn: "Cancel / Return", submitApplication: "Submit Application", applicationSent: "Application submitted successfully", applicationSentDesc: "Your application has been saved on this device.", requiredField: "Please complete the required fields and accept the declaration.", alreadyApplied: "You have already submitted an application for this internship.", sampleStudent: "Student Name", sampleCollege: "Faculty of Computer & Information Sciences", applicationDeadline: "APPLICATION DEADLINE", share: "Share", copied: "Link copied" ,

  },
  ar: {
    portal: "بوابة أوبريم", subtitle: "التوظيف الأكاديمي", internships: "التدريبات", applications: "طلباتي",
    exams: "امتحاناتي", notifications: "الإشعارات", profile: "الملف الشخصي", help: "المساعدة والدعم",
    logout: "تسجيل الخروج", student: "طالب", allTracks: "كل المجالات", oldest: "الأقدم", newest: "الأحدث",
    common: "الأكثر شيوعًا", details: "التفاصيل", viewDetails: "عرض التفاصيل", apply: "قدّم الآن", track: "المجال", location: "الموقع",
    deadline: "آخر موعد للتقديم", web: "تطوير الويب", cairo: "القاهرة / نظام هجين", title: "تدريب تطوير الواجهات الأمامية",
    organization: "معهد تكنولوجيا المعلومات", language: "اللغة", search: "ابحث عن تدريب...", noResults: "لا توجد تدريبات مطابقة.",
    profileSettings: "الملف الشخصي والإعدادات", registrarVerified: "موثّق من شؤون الطلاب",
    faculty: "كلية الحاسبات وعلوم المعلومات", mainCampus: "الحرم الرئيسي", admitted: "التحاق خريف 2026",
    gpa: "المعدل التراكمي", progressStatus: "حالة تقدّم التدريب الحالية",
    internshipFrontend: "تدريب تطوير الواجهات الأمامية", internshipBackend: "تدريب تطوير الخوادم",
    stepApplication: "التقديم", stepApproval: "موافقة الكلية", stepPlacement: "التعيين",
    stepReports: "التقارير الأسبوعية", stepEvaluation: "التقييم النهائي",
    verified: "تم التحقق", approved: "تمت الموافقة", completed: "مكتمل", inProgress: "قيد التنفيذ",
    upcoming: "قادم", scheduled: "مجدول",
    examsSubtitle: "التقييمات الأكاديمية واختبارات التعيين", assignedTests: "اختبارات القبول المسندة",
    assignedTestsDesc: "راجع متطلبات الاختبارات والمواعيد الصارمة وابدأ التقييمات الموثّقة مباشرة من الأسفل.",
    availableNow: "متاح الآن", scheduledStatus: "مجدول", completedUnderEval: "مكتمل - قيد التقييم",
    entranceAssessment: "تقييم القبول", technicalScreening: "فحص تقني",
    startExam: "ابدأ الامتحان", availableOn: "متاح في", viewSubmission: "عرض التسليم",
    duration: "المدة", mins: "دقيقة", questions: "سؤال", windowUnlocks: "تُفتح النافذة قبل 15 دقيقة",
    submitted: "تم التسليم", resultsExpected: "النتائج متوقعة خلال 5 أيام عمل",
    backToInternships: "العودة إلى التدريبات", backToDetails: "العودة إلى تفاصيل التدريب",
    overview: "نظرة عامة", description: "اكتسب خبرة عملية مكثفة في تطوير البرمجيات ضمن فرق هندسية متميزة، وساهم في بناء واجهات قابلة للتوسع مع استيفاء متطلبات التدريب الجامعي. ستتعاون مباشرة مع خبراء من المجال لتطوير واجهات جاهزة للإنتاج وفق معايير برمجية قوية.",
    requirements: "المتطلبات وشروط الأهلية", academicStanding: "الحالة الأكاديمية", academicStandingDesc: "طلاب السنوات النهائية بكليات الحاسبات أو الهندسة، مع سجل أكاديمي جيد.", minimumGpa: "الحد الأدنى للمعدل التراكمي", minimumGpaDesc: "3.0 من 4.0 كحد أدنى أو ما يعادله.", technicalFoundation: "الأساسيات التقنية", technicalFoundationDesc: "معرفة أساسية بـ JavaScript وHTML5 وCSS3 ومفاهيم مكونات React.", entranceInfo: "معلومات اختبار القبول", mandatoryAssessment: "تقييم تقني إلزامي عبر الإنترنت", assessmentDesc: "اختبار مبدئي آلي لقياس أساسيات الخوارزميات والتفكير في تطوير الواجهات الأمامية.", duration45: "45 دقيقة", timing: "موعد الاختبار", afterReview: "بعد مراجعة الطلب", officialNote: "تدريب ITI معتمد وفق معايير التدريب الجامعي.", applyFor: "التقديم على تدريب تطوير الواجهات الأمامية في ITI", verifiedPartner: "شريك موثّق", term: "الفصل: شتاء 2026", fullTime: "دوام كامل (12 أسبوعًا)", deadlineDate: "30 نوفمبر 2026", daysRemaining: "28 يومًا متبقيًا", academicRecord: "السجل الأكاديمي للطالب", sisSynced: "متزامن مع نظام الجامعة", retrievedInfo: "يتم جلب هذه المعلومات مباشرة من ملفك لدى شؤون الطلاب وستُرفق بملف التقديم.", studentName: "اسم الطالب", academicId: "الرقم الأكاديمي", currentGpa: "المعدل الحالي", college: "الكلية", candidateSubmissions: "متطلبات المتقدم", trackPreference: "التخصص الأكاديمي المفضل", selectTrack: "اختر المسار الأكاديمي", webTrack: "مسار تطوير الويب", mobileTrack: "مسار تطبيقات الهاتف", dataTrack: "مسار علوم البيانات", trackHelp: "اختر التخصص المتوافق مع متطلبات التخرج في قسمك.", personalStatement: "البيان الشخصي / أسباب الاهتمام", statementPlaceholder: "لخّص اهتمامك ببرنامج تطوير الواجهات في ITI، واذكر المشروعات ذات الصلة وأهدافك التقنية...", evaluatedBy: "سيتم التقييم بواسطة المشرف الأكاديمي ولجنة التدريب في ITI.", certify: "أقر باستيفاء الشروط الأكاديمية وأوافق على أداء اختبار القبول المطلوب في حال اختياري.", cancelReturn: "إلغاء / رجوع", submitApplication: "إرسال طلب التقديم", applicationSent: "تم إرسال الطلب بنجاح", applicationSentDesc: "تم حفظ طلبك على هذا الجهاز.", requiredField: "يرجى استكمال الحقول المطلوبة والموافقة على الإقرار.", alreadyApplied: "سبق لك إرسال طلب لهذا التدريب.", sampleStudent: "اسم الطالب", sampleCollege: "كلية الحاسبات وعلوم المعلومات", applicationDeadline: "آخر موعد للتقديم", share: "مشاركة", copied: "تم نسخ الرابط",

  },
};

const I18nContext = createContext(null);
export function I18nProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem("opream-language") || "en");
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("opream-language", language);
  }, [language]);
  const value = useMemo(() => ({ language, setLanguage, t: (key) => translations[language][key] || key }), [language]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}
export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside I18nProvider");
  return context;
}
