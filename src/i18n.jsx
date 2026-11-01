import { createContext, useContext, useEffect, useMemo, useState } from "react";

const translations = {
  en: {
    portal: "Opr eam Portal", subtitle: "Academic Placement", internships: "Internships",
    applications: "My Applications", exams: "My Exams", notifications: "Notifications", profile: "Profile",
    help: "Help & Support", logout: "Log Out", student: "Student", allTracks: "All Tracks",
    oldest: "Oldest", newest: "Newest", common: "The most common", details: "Details", apply: "Apply Now",
    track: "TRACK", location: "LOCATION", deadline: "APPLICATION DEADLINE", web: "Web Development",
    cairo: "Cairo / Hybrid", title: "Frontend Development Internship", organization: "Information Technology Institute",
    language: "Language", search: "Search internships...", noResults: "No internships found.",
  },
  ar: {
    portal: "بوابة أوبريم", subtitle: "التوظيف الأكاديمي", internships: "التدريبات", applications: "طلباتي",
    exams: "امتحاناتي", notifications: "الإشعارات", profile: "الملف الشخصي", help: "المساعدة والدعم",
    logout: "تسجيل الخروج", student: "طالب", allTracks: "كل المجالات", oldest: "الأقدم", newest: "الأحدث",
    common: "الأكثر شيوعًا", details: "التفاصيل", apply: "قدّم الآن", track: "المجال", location: "الموقع",
    deadline: "آخر موعد للتقديم", web: "تطوير الويب", cairo: "القاهرة / نظام هجين", title: "تدريب تطوير الواجهات الأمامية",
    organization: "معهد تكنولوجيا المعلومات", language: "اللغة", search: "ابحث عن تدريب...", noResults: "لا توجد تدريبات مطابقة.",
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
