import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Code2, MapPin, CalendarDays, Share2, Search } from "lucide-react";
import { useI18n } from "../i18n";

const internships = [1, 2, 3, 4].map((id) => ({ id, organization: "Information Technology Institute", shortName: "ITI", title: "Frontend Development Internship", track: "Web Development", location: "Cairo / Hybrid", deadline: "November 30, 2026" }));

export default function Internship() {
  const { t, language } = useI18n();
  const [activeFilter, setActiveFilter] = useState("allTracks");
  const [search, setSearch] = useState("");
  const [copiedId, setCopiedId] = useState(null);
  const filters = [{key:"allTracks",label:t("allTracks")},{key:"oldest",label:t("oldest")},{key:"newest",label:t("newest")},{key:"common",label:t("common")}];
  const visibleInternships = useMemo(() => {
    const result = internships.filter(item => `${t("title")} ${t("organization")} ${t("web")}`.toLowerCase().includes(search.toLowerCase()));
    if (activeFilter === "oldest") return [...result].reverse();
    return result;
  }, [activeFilter, search, language, t]);

  async function shareInternship(id) {
    const url = `${window.location.origin}/internship/${id}`;
    try { await navigator.clipboard.writeText(url); setCopiedId(id); setTimeout(() => setCopiedId(null), 1800); }
    catch { window.prompt(language === "ar" ? "انسخي رابط التدريب:" : "Copy internship link:", url); }
  }

  return <section className="mx-auto w-full max-w-6xl">
    <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl font-bold tracking-tight text-slate-800">{t("internships")}</h1>
      <div className="flex flex-wrap items-center gap-2">{filters.map(filter => <button key={filter.key} onClick={()=>setActiveFilter(filter.key)} className={`rounded-full px-4 py-2 text-xs transition ${activeFilter===filter.key ? "bg-blue-100 font-semibold text-blue-700" : "text-slate-500 hover:bg-white"}`}>{filter.label}</button>)}</div>
    </div>
    <label className="mb-4 flex max-w-sm items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-slate-400 focus-within:border-blue-400"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t("search")} className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"/></label>
    <div className="space-y-3">{visibleInternships.map(item => <article key={item.id} className="rounded-xl border border-slate-100 bg-white p-4 transition hover:border-blue-100 hover:shadow-sm sm:p-5">
      <div className="mb-4 flex flex-wrap items-center gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{item.shortName}</span><span className="text-xs font-semibold text-slate-600">{t("organization")}</span><div className="ms-auto flex items-center gap-2"><button onClick={()=>shareInternship(item.id)} aria-label="Share internship" title={copiedId===item.id ? (language === "ar" ? "تم نسخ الرابط" : "Link copied") : (language === "ar" ? "مشاركة" : "Share")} className="flex h-9 w-10 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50"><Share2 size={15}/></button><Link to={`/internship/${item.id}`} className="rounded-lg bg-blue-600 px-5 py-2.5 text-center text-xs font-semibold text-white no-underline hover:bg-blue-700">{t("viewDetails")}</Link></div></div>
      <Link to={`/internship/${item.id}`} className="text-slate-800 no-underline hover:text-blue-700"><h2 className="mb-4 text-lg font-bold">{t("title")}</h2></Link>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3"><div><p className="mb-1.5 text-[10px] font-medium text-slate-400">{t("track")}</p><p className="flex items-center gap-2 text-xs font-semibold text-slate-800"><Code2 size={13} className="text-blue-600"/>{t("web")}</p></div><div><p className="mb-1.5 text-[10px] font-medium text-slate-400">{t("location")}</p><p className="flex items-center gap-2 text-xs font-semibold text-slate-800"><MapPin size={13} className="text-blue-600"/>{t("cairo")}</p></div><div><p className="mb-1.5 text-[10px] font-medium text-slate-400">{t("deadline")}</p><p className="flex items-center gap-2 text-xs font-semibold text-slate-800"><CalendarDays size={13} className="text-blue-600"/>{item.deadline}</p></div></div>
    </article>)}{visibleInternships.length===0 && <div className="rounded-xl bg-white p-10 text-center text-sm text-slate-500">{t("noResults")}</div>}</div>
  </section>;
}
