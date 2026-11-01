import React from "react";
import { Outlet } from "react-router-dom";
import StudentSidebar from "./Sidebar";
import { Bell } from "lucide-react";
import { useI18n } from "../i18n";

export default function Layout({ userData, logOut }) {
  const { language, setLanguage, t } = useI18n();
  const userName = userData?.firstName || userData?.name || t("student");
  return <div className="min-h-screen bg-[#faf9ff] text-slate-800" dir={language === "ar" ? "rtl" : "ltr"}>
    <div className="flex min-h-screen"><StudentSidebar logOut={logOut}/><div className="min-w-0 flex-1">
      <header className="flex min-h-[68px] flex-wrap items-center justify-between gap-3 border-b border-slate-100 bg-white px-5 py-3 sm:px-8">
        <div className="text-sm font-semibold text-slate-700">{t("internships")}</div>
        <div className="flex items-center gap-3"><div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1"><button onClick={()=>setLanguage("en")} className={`rounded-lg px-3 py-1.5 text-xs ${language === "en" ? "bg-white font-semibold text-blue-700 shadow-sm" : "text-slate-500"}`}>EN</button><button onClick={()=>setLanguage("ar")} className={`rounded-lg px-3 py-1.5 text-xs ${language === "ar" ? "bg-white font-semibold text-blue-700 shadow-sm" : "text-slate-500"}`}>العربية</button></div><button aria-label={t("notifications")} className="text-slate-500"><Bell size={17}/></button><span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-[10px] font-bold text-blue-700">{String(userName).slice(0,2).toUpperCase()}</span><span className="hidden text-xs font-semibold sm:inline">{userName}</span></div>
      </header><main className="px-3 py-5 sm:px-5 lg:px-7"><Outlet/></main>
    </div></div>
  </div>;
}
