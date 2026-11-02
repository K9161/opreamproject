import React from "react";
import { CheckCheck, ChevronRight, CircleHelp, Clock, Lock, Timer } from "lucide-react";
import { useI18n } from "../i18n";

// Static data until the exams API is connected.
const EXAMS = [
  {
    id: 1,
    status: "available",
    type: "entranceAssessment",
    title: "Frontend Engineering Entrance Assessment",
    subtitle: "Frontend Development Internship — ITI",
    date: "Nov 12, 2024 • 10:00 AM",
    duration: 45,
    questions: 30,
  },
  {
    id: 2,
    status: "scheduled",
    type: "technicalScreening",
    title: "Data Fundamentals Test",
    subtitle: "Data Analysis Internship — NTI",
    date: "Nov 20, 2024 • 02:00 PM",
    duration: 60,
    unlockDate: "Nov 20",
  },
  {
    id: 3,
    status: "completed",
    type: "entranceAssessment",
    title: "General Aptitude Test",
    subtitle: "Faculty Placement Requirement — Term 1",
    submitted: "Oct 28, 2024",
  },
];

const BADGES = {
  available: { label: "availableNow", cls: "bg-teal-100 text-teal-800" },
  scheduled: { label: "scheduledStatus", cls: "bg-sky-100 text-blue-800" },
  completed: { label: "completedUnderEval", cls: "bg-amber-50 text-amber-800" },
};

function Meta({ icon: Icon, children, muted }) {
  return (
    <span className={`flex items-center gap-2 text-sm ${muted ? "text-slate-500" : "text-slate-700"}`}>
      <Icon size={15} />
      {children}
    </span>
  );
}

function ExamCard({ exam, t }) {
  const badge = BADGES[exam.status];
  const isAvailable = exam.status === "available";
  const isScheduled = exam.status === "scheduled";
  const isCompleted = exam.status === "completed";

  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-start sm:justify-between ${
        isAvailable ? "border-s-4 border-s-blue-800" : ""
      }`}
    >
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-4">
          <span className={`rounded-full px-5 py-1.5 text-sm font-semibold ${badge.cls}`}>{t(badge.label)}</span>
          <span className="text-sm text-slate-500">{t(exam.type)}</span>
        </div>

        <h2 className="mt-4 text-lg font-semibold text-slate-900">{exam.title}</h2>
        <p className="mt-3 text-sm text-slate-600">{exam.subtitle}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-8 gap-y-2">
          {!isCompleted && <Meta icon={Clock} muted={isScheduled}>{exam.date}</Meta>}
          {!isCompleted && (
            <Meta icon={Timer} muted={isScheduled}>
              {t("duration")}: {exam.duration} {t("mins")}
            </Meta>
          )}
          {isAvailable && <Meta icon={CircleHelp}>{exam.questions} {t("questions")}</Meta>}
          {isScheduled && <Meta icon={CircleHelp} muted>{t("windowUnlocks")}</Meta>}
          {isCompleted && <Meta icon={CheckCheck} muted>{t("submitted")} {exam.submitted}</Meta>}
          {isCompleted && <span className="text-sm text-slate-500">{t("resultsExpected")}</span>}
        </div>
      </div>

      <div className="shrink-0">
        {isAvailable && (
          <button type="button" className="rounded-lg bg-blue-700 px-10 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-800">
            {t("startExam")}
          </button>
        )}
        {isScheduled && (
          <button type="button" disabled className="flex cursor-not-allowed items-center gap-3 rounded-xl bg-indigo-50 px-6 py-3 text-sm font-semibold text-slate-500">
            <Lock size={16} />
            {t("availableOn")} {exam.unlockDate}
          </button>
        )}
        {isCompleted && (
          <button type="button" className="flex items-center gap-3 rounded-xl bg-indigo-50 px-6 py-3 text-sm font-semibold text-slate-800 transition-colors hover:bg-indigo-100">
            {t("viewSubmission")}
            <ChevronRight size={16} className="rtl:rotate-180" />
          </button>
        )}
      </div>
    </article>
  );
}

export default function Exams() {
  const { t } = useI18n();
  return (
    <div className="mx-auto max-w-5xl">
      <h1 className="text-2xl font-bold text-slate-900">{t("assignedTests")}</h1>
      <p className="mt-4 text-sm text-slate-600">{t("assignedTestsDesc")}</p>
      <div className="mt-6 space-y-5">
        {EXAMS.map((exam) => (
          <ExamCard key={exam.id} exam={exam} t={t} />
        ))}
      </div>
    </div>
  );
}
